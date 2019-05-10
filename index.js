const appConfig = require('./config');
const report = require('./report');
const log = require('./dist').log.app;
const osu = require('node-os-utils');
const uuidv4 = require('uuid/v4');
const fs = require('fs');



log.info('Config file at: ', `${__dirname}/config.js`);

if (appConfig.reportData.process_id) {

} else {
	//1.生成uuid;2.写入配置文件config.js
	let uuid = uuidv4();
	appConfig.reportData.process_id = uuid;
	let uuid2f = `config.reportData.process_id = '${uuid}';\n`;
	fs.appendFileSync(`${__dirname}/config.js`, uuid2f);
}

log.info('Current active config is: \n', appConfig);

class Main {
	constructor(props) {
		/**
		 * 需要采集的硬件信息
		 */
		this.hwInfo = {
			cpu: {
				usage: 0,
				count: 0
			},
			mem: {
				total: 0, //--内存总大小KB
				used: 0, //--使用大小KB
				free: 0, //--剩余大小KB
			},
			disk: {},
			disk_usage: 0
		}

		/**
		* 采集器的timer id
		*/
		this.timerIdOfCollector = null;


		/**
		 * 配置文件变化监听器，由timer实现
		 *
		 */
		this.configMonitor = null;

		this.workerStatus = {
			worker_process_id: null,
			worker_process_start_time: null,
			worker_process_end_time: null,
			status: 'stop',
			exit_code: null
		}
	}

	/**
	 * 启动
	 */
	start() {

		Object.assign(this.workerStatus, {
			worker_process_id: '',
			worker_process_start_time: new Date().getTime(),
			status: 'starting'
		});
		report.setStatus({
			worker_status: this.workerStatus
		});


		//启动采集timer
		this.timerIdOfCollector = setInterval(this.gatherOsInfo, appConfig.reportIntervals, this);


		// 启动 app 工作进程
		//this.startApp();

		// 监听配置文件变化
		this.startConfigChangeMonitor();
	}

	gatherOsInfo(mthis) {
		//采集
		log.debug('gatherOsInfo============================');
		osu.drive.info()
			.then(info => {
				log.debug(info);
				mthis.hwInfo.disk_usage = info.usedPercentage;
				Object.assign(mthis.hwInfo.disk, info);
			});
		osu.cpu.usage()
			.then(cpuPercentage => {
				mthis.hwInfo.cpu.usage = cpuPercentage;
			});
		mthis.hwInfo.cpu.count = osu.cpu.count();
		osu.mem.info()
			.then(info => {
				log.debug('mem:', info);
				mthis.hwInfo.mem.free = info.freeMemMb * 1024;
				mthis.hwInfo.mem.total = info.totalMemMb * 1024;
				mthis.hwInfo.mem.used = info.usedMemMb * 1024;
				Object.assign(mthis.hwInfo.mem, info);
			});
		// //上报
		report.setStatus({ info: mthis.hwInfo });

	}

	/**
	 * 停止
	 */
	stop() {

		if (this.configMonitor) {
			this.configMonitor.stop();
			log.info('configMonitor process exited.');
		}
	}

	/**
	 * 配置文件发生变化
	 */
	startConfigChangeMonitor() {

		this.configMonitor = require('./monitor');

		this.configMonitor.on('message', (event) => {
			if (event && event.type === 'changed') {

				log.info('config is changed ...')

				const config = event.data;

				//无论什么变化，我都认为是采集间隔时间变化了，接下来：
				//重启timer，采集上报

				log.debug("what's this?", config);
				let newInterval = config.value * 1000;

				if (Number.isNaN(newInterval) || newInterval < 0) {
					log.warn("Tapdata give me a invalid report intervals, discard, give up resetting the timer (ms): ", appConfig.reportIntervals);

				} else {
					log.info("Reset garther and report timer...");
					clearInterval(this.timerIdOfCollector);
					log.info("old appConfig.reportIntervals:", appConfig.reportIntervals);
					appConfig.reportIntervals = newInterval;
					log.info("new appConfig.reportIntervals:", appConfig.reportIntervals);
					this.timerIdOfCollector = setInterval(this.gatherOsInfo, appConfig.reportIntervals, this);

					report.resetTimer();

				}

			}
		});

		this.configMonitor.start();
	}

}

const main = new Main();
main.start();

const exitHandler = function () {
	log.info("Stoping api gateway...");
	main.stop();
	log.info("api gateway stoped.");
};
process.on('exit', exitHandler);
//process.on('SIGKILL', exitHandler);
require('fs').writeFileSync(`${__dirname}/server.pid`, `${process.pid}\n`, { encoding: 'utf-8' });

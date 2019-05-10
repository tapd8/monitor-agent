//<Config at here>
const tapdata_port = process.env['TAPDATA_PORT'] || '3030';  //tapdata server port
const tapdata_host = process.env['TAPDATA_HOST'] || '127.0.0.1';  //tapdata server ip
const tapdata_origin = process.env['TAPDATA_ORIGIN'] || `http://${tapdata_host}:${tapdata_port}`;
//</Config at here>


const config = {
	'version': 'v1.0.0-0-gd48b0c9',
	'intervalsDesc': 'How often to get reportIntervals that is defined by tapdata manager users',
	/**
	 * @intervals How often to get reportIntervals that is defined by tapdata manager users;
	 * in other words,
	 * when user modify the reportIntervals,the reportIntervals will take up to @intervals ms to take effect
	 */
	'intervals': 5 * 1000, //ms
	'tapDataServer': {
		'url': `${tapdata_origin}/api/Settings?filter=` + encodeURIComponent('{"where":{"id":"49"}}'),
		'tokenUrl': `${tapdata_origin}/api/users/generatetoken`, // url to get token by accessCode
		'reportUrl': `${tapdata_origin}/api/Workers`,
		'logUrl': `${tapdata_origin}/api/Logs`,
		'accessCode': 'bd16c77a-2111-499c-b2ae-a35c587ea83a',
	},
	/**
	 * @reportIntervals Gather and report initial start intervals
	 * this value can be modified by tapdatamanager users within Setting menu;
	 */
	'reportIntervals': 30 * 1000, // milliseconds
	'reportData': {
		'worker_type': 'system'
	},

	'cacheDir': 'cache',
	'logDir': 'logs',

	//'jwtSecretKey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};

module.exports = config;

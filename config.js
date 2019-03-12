const env = process.argv[2] || process.env['API_SERVER_ENV'];

const config = {
	dev: {
		'welcome': 'Welcome to use API Server. Current run as dev mode.',
		'intervalsDesc': '检查配置文件更新间隔时间，单位为毫秒',
		'intervals': 5000,
		'host': '0.0.0.0',
		'port': 3080,
		'tapDataServer': {
			'url': 'http://127.0.0.1:3030/api/apiModules',
			'tokenUrl': 'http://localhost:3030/api/users/generatetoken',
			'accessCode': 'bd16c77a-2111-499c-b2ae-a35c587ea83a',
		},

		'reportServer': {
			'url': 'http://127.0.0.1:3030/api/Workers',
		},
		'reportIntervals': 5000,
		'reportData': {
			'worker_type': 'api-server',
		},

		'cacheDir': 'cache',
		'logDir': 'logs',

		'jwtSecretKey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
	},
	test: {
		'welcome': 'Welcome to use API Server. Current run as test mode.',
		'intervalsDesc': '检查配置文件更新间隔时间，单位为毫秒',
		'intervals': 5000,
		'host': '0.0.0.0',
		'port': 3080,
		'tapDataServer': {
			'url': 'http://127.0.0.1:3030/api/apiModules',
			'tokenUrl': 'http://localhost:3030/api/users/generatetoken',
			'accessCode': 'bd16c77a-2111-499c-b2ae-a35c587ea83a',
		},

		'reportServer': {
			'url': 'http://127.0.0.1:3030/api/Workers',
		},
		'reportIntervals': 5000,
		'reportData': {
			'worker_type': 'api-server',
		},

		'cacheDir': 'cache',
		'logDir': 'logs',

		'jwtSecretKey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
	},
};

module.exports = config[env] || config['dev']
console.log(module.exports.welcome);
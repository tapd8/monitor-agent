# os-monitor

os-monitor，操作系统硬件信息监控上报服务，根据 tapdata-manager 用户定义的监控频率，收集上报本服务所在服务器的CPU，MEM，DISK等信息。

#### 如何运行?

##### 运行环境：
1. 暂不支持Windows OS。请使用Linux，如debian，ubuntu。
2. node 10 LTS+

##### 运行步骤：
1. 检出代码
	```shell
	git clone https://github.com/AndrewGoal/apig.git
	```

2. 安装依赖
	```shell
	cd apig
	npm install
	```
3. 设置参数：config.js
4. 启动
	```shell

	# 运行环境可以通过命令行参数指定

	npm start [dev|test]

	# 或者

	./start.sh [dev|test]
	```

#### 如何打包

```shell

# 1. 安装依赖
npm install

# 2. 打包
./pkg.sh

```

#### 部署及调试

参见 deploy/howtoRunTpl.md

####  Tapdata Server 采集频率设置

```javascript
{
  "category": "System",
  "key": "collectSystemInfo",
  "value": "15", //单位秒
  "default_value": "30", //单位秒
  "documentation": "Interval to collect system info(cpu,mem,disk).",
  "scope": "global",
  "category_sort": 2,
  "key_label": "Collect system info interval",
  "user_visible": true,
  "hot_reloading": true,
  "id": "49"
}

```

#### JWT token payload 格式
```javascript
let payload = {
	"expiredate": 156435432,                  // 必填,过期时间戳，与当前系统时间比较，小于系统时间时，认定为过期
	"roles": ['role id 1', 'role id 2',],      // 必填,当前用户角色列表
	"user_id": "1",								// 必填,用户id
	"name":"Jack",								// 可空,用户名
	"email": "jack@gmail.com"					// 可空,用户邮箱
 }
```

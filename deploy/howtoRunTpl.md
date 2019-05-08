## 如何部署和启动停止服务

### 1、将部署压缩包解压
将部署压缩包文件apig-v*.tar.gz拷贝或下载到需要部署的目标机器上，在目标机器上解包：

```shell

tar -xf apig-v*.tar.gz
cd apig-v*/

```

### 2、参数设置

参数设置有两种方式，任选其一即可，一般正式部署采用第一种，部署调试采用第二种

#### 2.1、修改配置文件方式

修改config.js

```shell
nano config.js
```
修改调整以下参数：

```javascript
//<请在这里配置参数>
const tapdata_port = process.env['TAPDATA_PORT'] || '3030';  //tapdata服务器监听端口
const tapdata_host = process.env['TAPDATA_HOST'] || '127.0.0.1';  //tapdata服务器监听IP地址
const process_id = process.env['THIS_MONITOR_UUID'] || 'd2f1cc40-552a-11e9-8ff4-059b83989412';
//</请在这里配置参数>
```
对于THIS_MONITOR_UUID，可以使用 https://www.uuidgenerator.net/ 生成获取Version 4 UUID
每部署一个MONITOR必须生成设置一个全新的version4 UUID


#### 2.2、设置环境变量的方式

```shell
export TAPDATA_HOST=192.168.0.30
export TAPDATA_PORT=3030
export THIS_MONITOR_UUID= a091e414-83f2-4730-b7c2-312bb170505c # 必须生成设置一个全新的version4 UUID，参2.1
...

```

### 3、启动停止服务

```shell
sh start.sh
sh stop.sh
```

### 4、如何升级部署

先停止服务，然后删除旧版本目录，如上步骤部署新版本。


## 如何部署和启动停止服务

### 1、将待部署的压缩包解压
将待部署的压缩包文件os-monitor-v*.tar.gz拷贝或下载到需要部署的目标机器上，在目标机器上解包：

```shell

tar -xf os-monitor-v*.tar.gz
cd os-monitor-v*/

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
//</请在这里配置参数>
```

#### 2.2、设置环境变量的方式

```shell
export TAPDATA_HOST=192.168.0.30
export TAPDATA_PORT=3030

```

### 3、启动停止服务

```shell
sh start.sh
sh stop.sh
```

### 4、如何升级部署

1. 停止服务
2. 备份config.js文件
3. 删除旧版本目录
4. 如上步骤部署新版本
5. 将步骤2备份的文件中的最后一行，写入新部署的config.js文件

说明：步骤5是为了保持本服务的uuid不变，否则全新的uuid会使tapdata用户界面产生新的折线图和健康服务条目，不过即使如此，随着对过期数据的清理，旧版本的痕迹会从用户界面彻底消失，即，如果用户不介意，步骤5可省略。

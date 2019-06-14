#!/bin/bash

if [ "$BUILD_PLATFORM" == "arm64" ]; then
		NDK_ARC=arm64
else
		NDK_ARC=x64
fi

WORK_DIR="`pwd`"
APP_HOME="$(cd `dirname $0`; pwd)"
CACHE_DID=${TAPDATA_WORK_DIR:=~/.tapdata}/os-monitor

export PATH=$APP_HOME/NDK/$NDK_ARC/node/bin:$PATH

echo
echo
echo "Shell PATH: "$PATH
echo
echo "Path of node: `which node`"
echo "Version of node: `node -v`"
# echo "Version of npm: "
# npm version
# echo "Version of npx: `npx -v`"
echo
echo "Start OS-MONITOR service..."
echo
echo "APP_HOME: $APP_HOME"
echo "WORK_DIR: $WORK_DIR"
echo "CACHE_DID: $CACHE_DID"
echo
echo "Watch logs with:"
echo "tail -f $APP_HOME/logs/app.log"
echo
echo "Config file at:"
echo "$APP_HOME/config.js"
echo
echo "Stop OS-MONITOR service with:"
echo "$APP_HOME/stop.sh"
echo

if [ -f "$CACHE_DID/server.pid" ]; then
	echo "OS-MONITOR service pid is `cat $CACHE_DID/server.pid`, kill it."
  kill -9 `cat $CACHE_DID/server.pid` > /dev/null 2>&1
fi

if [ -d "$APP_HOME/dist" ]; then
	node $APP_HOME/index.js > /dev/null 2>&1 &
	echo "OS-MONITOR service started."
else
	cd $APP_HOME
	npm run build
	cd $WORK_DIR
	node $APP_HOME/index.js > /dev/null 2>&1 &
	echo "OS-MONITOR service started."
fi

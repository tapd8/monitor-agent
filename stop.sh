#!/bin/bash

WORK_DIR="`pwd`"
APP_HOME="$(cd `dirname $0`; pwd)"
CACHE_DID=${TAPDATA_WORK_DIR:=~/.tapdata}/os-monitor

echo
echo "Stop OS-MONITOR service..."
echo
echo "APP_HOME: $APP_HOME"
echo "WORK_DIR: $WORK_DIR"
echo "CACHE_DID: $CACHE_DID"
echo
# for pid in $( find $APP_HOME -name '*.pid' ); do
# 	kill -9 `cat $pid`
# done

# kill `ps x | grep "$APP_HOME/index.js" | grep -v grep | awk '{print $1}'` > /dev/null 2>&1
if [ -f "$CACHE_DID/server.pid" ]; then
  echo "OS-MONITOR service process id is `cat $CACHE_DID/server.pid`"
  kill -9 `cat $CACHE_DID/server.pid` > /dev/null 2>&1
  rm $CACHE_DID/server.pid
fi

echo
echo "Stop OS-MONITOR service successful."
echo

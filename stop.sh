#!/bin/sh

WORK_DIR="`pwd`"
APP_HOME="$(cd `dirname $0`; pwd)"
echo
echo "Stop OS-MONITOR service..."
echo
echo "APP_HOME: $APP_HOME"
echo "WORK_DIR: $WORK_DIR"
echo
# for pid in $( find $APP_HOME -name '*.pid' ); do
# 	kill -9 `cat $pid`
# done

kill `ps x | grep "$APP_HOME/index.js" | grep -v grep | awk '{print $1}'` > /dev/null 2>&1

echo
echo "Stop OS-MONITOR service successful."
echo

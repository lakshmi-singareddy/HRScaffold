#!/bin/bash

app=$1
env=$2
url=`hyscalectl get svc -a $app -e $env | awk -v service=hrms-frontend 'match($0, service) { print $5 }'`
echo "$url"
echo "starting the test"
attempt=0
maximum_attempts=6

  while [ $attempt -lt $maximum_attempts ];
    do
      code=`curl -k -sL --connect-timeout 20 --max-time 30 -w "%{http_code}\\n" "$url" -o /dev/null`
      if [ "$code" = "200" ]; then
        echo "TEST SUCCESSFULL , $url is UP and running"
        break
      else
        echo "$url is down. Waiting for the start up..."
        sleep 30
        attempt=$[attempt+1]
        continue
      fi
  done
if [ $attempt = 6 ]
then
      echo "TEST FAILED. $url is not accessible, giving up !!"
      exit 1
fi

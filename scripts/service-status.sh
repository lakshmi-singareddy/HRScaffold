#!/bin/bash

app=$1
env=$2
sleep 3
echo "Deployment Started...."
attempt=0
maximum_attempts=20

  while [ $attempt -lt $maximum_attempts ];
    do
       code=`hyscalectl get env $env -a $app | awk  -v env=$env '{if($2==env) print $3}'`
      if [ "$code" = "DEPLOYABLE" ]; then
        echo "Deployment SUCCESSFULL, `hyscalectl get svc -a $app -e $env | awk -v service=hrms-frontend 'match($0, service) { print $5 }'` is running"
        break
      else
        echo "Waiting for the deployment..."
        sleep 10
        attempt=$[attempt+1]
        continue
      fi
  done
if [ $attempt = 20 ]
then
      echo "Deployment FAILED, giving up !!"
      exit 1
fi

#!/bin/bash

docker network inspect unihub-network 1>/dev/null 2>/dev/null
if [ $? -ne 0 ]; then
     docker network create --subnet 172.0.0.0/16   unihub-network
fi

if [[ "$(docker images -q unihub-frontend 2> /dev/null)" == "" ]]; then
 	docker build -t unihub-frontend .
fi

docker run --ip=172.0.0.5 --net=unihub-network -d -p 8080:8080 -v "/opt/docker-frontend-deploy:/home/node/dist/:rw" unihub-frontend

#!/bin/sh
curl -H "Content-Type: application/json" -b cookie -c cookie -X POST -d '{"email":"vito.dinovi@gmail.com", "password": "vwd"}' http://node-express-env.pa3ymamyp6.us-east-1.elasticbeanstalk.com/users/delete

#!/bin/sh
curl -H "Content-Type: application/json" -b cookie -c cookie -X GET http://node-express-env.pa3ymamyp6.us-east-1.elasticbeanstalk.com/listings/$1

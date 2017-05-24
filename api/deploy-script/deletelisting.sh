#!/bin/sh
curl -H "Content-Type: application/json" -b cookie -c cookie -X DELETE http://node-express-env.pa3ymamyp6.us-east-1.elasticbeanstalk.com/listings/$1

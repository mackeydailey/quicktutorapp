#!/bin/sh
curl -H "Content-Type: application/json" -b cookie -c cookie -X POST -d '{"title":"Help", "description": "my listing", "duration": "1"}' http://node-express-env.pa3ymamyp6.us-east-1.elasticbeanstalk.com/listings/new

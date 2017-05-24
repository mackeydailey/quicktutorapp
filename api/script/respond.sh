#!/bin/sh
curl -H "Content-Type: application/json" -b cookie -c cookie -X POST -d '{"message": "Hi"}' localhost:3000/listings/$1/respond

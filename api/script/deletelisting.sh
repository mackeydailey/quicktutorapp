#!/bin/sh
curl -H "Content-Type: application/json" -b cookie -c cookie -X DELETE localhost:3000/listings/$1

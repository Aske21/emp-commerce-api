#!/bin/bash
echo -e "\e[92mWelcome to the simple migrations creator"
echo -e "\e[1mEnter migration name: "
read migrationName;

echo -e "\e[1mEnter description?: "
read description

echo "Migration name: " migrationName
echo "Description: " description

echo "Migration generated successfully "
#/ts-node ./node_modules/typeorm/cli.js migration:generate -n
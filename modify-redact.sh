#!/bin/bash

if [ $# -lt 1 ]; then
    printf "Please provide a path to your project directory.\n"
    printf "Usage: ./test.sh <path-to-project-directory>\n"
    exit 1
fi

if [[ $1 == *\/ ]]; then
    printf "The path should't end with a slash!\n"
    printf "Usage: ./test.sh <path-to-project-directory>\n"
    exit 1
fi

cp ./plugin-modified.js "$1/node_modules/compromise/src/3-three/redact/plugin.js"

# Prints in green 
printf '\e[92m%b\e[0m' "Success!"
printf "\nplugin-modified.js copied to $1/node_modules/compromise/src/3-three/redact/plugin.js\n"

#!/bin/zsh
FILESLUG=$1
TESTSPATH="./src/tests/"
FILENAME="${TESTSPATH}${FILESLUG}.js"

if [ -z "$1" ]
  then
    echo "No filename slug supplied"
	exit 1
fi

NODE_ENV=dev node $FILENAME

exit 0

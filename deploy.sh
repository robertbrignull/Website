#!/bin/bash

BIN=`npm bin`

$BIN/harp compile src build

gsutil -m rsync -r -d build gs://www.brignull.co.uk/

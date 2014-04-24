#!/bin/bash
PATHTOBLENO=/Users/RobertFinze/Developer/xCode\ Stuffs/ble00/bleno-cardService
export ALLOWED_FILE=$PATHTOBLENO/allowed.json
export DOOR_OPEN_COMMAND=$PATHTOBLENO/allowed.json
export DEBUG=door,bleno,hci-ble,l2cap-ble

node bePeripheral.js

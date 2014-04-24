#!/usr/bin/env node

/**
 * Copyright (c), Klass&Ihlenfeld Verlag GmbH
 * All rights reserved.
 * Author: Alexander Merz, am@golem.de
 * http://www.golem.de/projekte/btle/bt_peripheral.js
 */
 
var bleno = require('bleno');
var util = require('util');

var BlenoPrimaryService = bleno.PrimaryService;
var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

var buttonValue = null;				// THIS IS THE ONE
var lastButtonState = '';			// don't care 'bout this one
var onButtonStateCallback = null;


// LED Read Characteristic
function LedReadCharacteristic() {
	console.log('new led characteristic');
	LedReadCharacteristic.super_.call(this, {
		uuid: '3446E9E560FD43BBBF24168BB831B63B',
		properties: ['read'],
		descriptors: [
			new BlenoDescriptor({
				uuid: '6544B89360FD43BBBF24168BB831B63B',
				value: 'value read'
			})
		]
	});
}
util.inherits(LedReadCharacteristic, BlenoCharacteristic);

LedReadCharacteristic.prototype.onReadRequest = function(offset, callback) {
	console.log('got read request');
	if (offset) {
		callback(BlenoCharacteristic.RESULT_ATTR_NOT_LONG, null);
	} else {
		callback(BlenoCharacteristic.RESULT_SUCCESS, 15);
	}
};


// LED Service
function LedService() {
	console.log('new led service');
	LedService.super_.call(this, {
	uuid: 'E0AE021360FD43BBBF24168BB831B63B',
	characteristics: [
		new LedReadCharacteristic()
	]
	});
}
util.inherits(LedService, BlenoPrimaryService);


// Bleno init
bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('led', []);

  } else {
//    bleno.startAdvertising('led', []);
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
  
  if (!error) {
    bleno.setServices([
		new LedService()
    ]);
  }
});

function buttonStateChanged() {
	console.log('buttonStateChanged');
}

function logError(err, stdout, stderr) {
	if(err) {
		console.log('oopsy: ' + err);
	}
}

function switchLed(value, done) {
	console.log('switchLED');
}
function getButtonState() {
	console.log('getButtonState');
	return 10;
}
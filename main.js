#!/usr/bin/env node

var bleno = require('bleno');

bleno.on('stateChange', function(state) {
	if (state == 'poweredOn') {
		bleno.startAdvertising('card', []);	
	} else {
		bleno.stopAdvertising();	
	}
});	

bleno.on('advertisingStart', function(error) {
	if (!error) {
		bleno.setServices ([
			new CardService()
		]);	
	}
});
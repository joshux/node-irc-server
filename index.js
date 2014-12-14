var util = require('util');
var net = require('net'); 
var fs = require('fs');
var events = require('events');
var Server = function(){
  events.EventEmitter.call(this);
};

util.inherits(Server, events.EventEmitter);

var nodeID = process.argv[2];
var configFile = process.argv[3] || 'default.conf';

var buf = fs.readFileSync(configFile);
console.log(buf.toString());

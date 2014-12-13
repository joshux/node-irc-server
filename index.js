var net = require('net'); 

var Server = function(){
  events.EventEmitter.call(this);
};

utils.inherit(Server, events.EventEmitter);


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
var conf = JSON.parse(buf.toString());

var nodeIDconf = conf.nodeID;
if(nodeIDconf !== parseInt(nodeID))
  throw new Error('error nodeID');

var ircPort = conf['irc-port'];

var clients = [];


function Server(){
  if(!(this instanceof Server))
    return new Server();
  net.Server.call(this, {allowHalfOpen: true});

  this.on('connection',connectionListner); // net event: connectionListner(socket)
  this.on('clientError', function(err, conn){ // orig http event , conn is the [socket] connection
    conn.destroy(err);
  });
};
util.inherits(Server, net.Server);
exports.Server = Server;

function connectionListner(socket){

}

exports.createServer = function(){
  return new Server();
};

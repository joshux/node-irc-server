var util = require('util');
var net = require('net');
var fs = require('fs');

function Server(nodeID, configFile){
  if(!(this instanceof Server)){
    return new Server(nodeID, configFile);
  }
  net.Server.call(this, {allowHalfOpen: true});

  var buf = fs.readFileSync(configFile); // should we put config/parameters inside server ?
  var conf = JSON.parse(buf.toString());
  var nodeIDconf = conf.nodeID;
  if(nodeIDconf !== nodeID)
    throw new Error('error nodeID');
  var ircPort = conf['irc-port'];

  this.on('connection',connectionListner); // net event: connectionListner(socket)
  this.on('clientError', function(err, conn){ // orig http event , conn is the [socket] connection
    conn.destroy(err);
  });
};
util.inherits(Server, net.Server);
exports.Server = Server;

exports.createServer = function(nodeID,configFile){
  return new Server(nodeID,configFile);
};
function connectionListner(socket){

}

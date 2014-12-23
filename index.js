var util = require('util');
var net = require('net');
var fs = require('fs');

function Server(nodeID, configJSON){
  if(!(this instanceof Server)){
    return new Server(nodeID, configJSON, requestListner);
  }
  net.Server.call(this, {allowHalfOpen: true});

  var nodeIDconf = configJSON.nodeID;
  if(nodeIDconf !== nodeID)
    throw new Error('error nodeID');

  this.on('connection',connectionListner); // net event: connectionListner(socket)
  this.on('clientError', function(err, conn){ // orig http event , conn is the [socket] connection
    conn.destroy(err);
  });
}
util.inherits(Server, net.Server);
exports.Server = Server;

exports.createServer = function(nodeID,configJSON){
  return new Server(nodeID,configJSON);
};
function connectionListner(socket){
  socket.write('joshux2');
}

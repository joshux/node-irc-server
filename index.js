var util = require('util');
var net = require('net');
var fs = require('fs');
var stream = require('stream');
var events = require('events');

var clientControllers = []; // populate clientController s ?
var nicknames = {}; // {username,hostname,realname}
var channels = [];
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

function IrcState(){
  this.initState = true;
}

function IrcParser(parseStream){
  events.EventEmitter.call(this);

  var self = this;
  self.buffer = '';

  parseStream.on('readable', function(){
    var chunk = this.read(); // null or buffer
    chunk = chunk || '';
    chunk = chunk.toString();
    
    var lineEndPos;
    while( (lineEndPos = chunk.search(/\r\n/)) !== -1) 
      self.parseLine( self.buffer + chunk.slice(0,lineEndPos) ); // string + buffer = string
      chunk = chunk.slice(lineEndPos+2);
      
      self.buffer = chunk;
    }
    self.buffer += chunk;
    
    
  });
}
var COMMANDS = [{
  regex: /NICK/,
  value: 'NICK'
},{
  regex: /USER/,
  value: 'USER'
},{
  regex: /QUIT/,
  value: 'QUIT'
},{
  regex: /JOIN/,
  value: 'JOIN'
},{
  regex: /PART/,
  value: 'PART'
},{
  regex: /LIST/,
  value: 'LIST'
},{
  regex: /PRIVMSG/,
  value: 'PRIVMSG'
},{
  regex: /WHO/,
  value: 'WHO'
}];
IrcParser.prototype.parseLine = function(msgLine){
  var self = this;
  
  var command;
  command = 
  
  //self.emit('command',command,params)
  //self.emit('parseError',..)
};

util.inherits(IrcParser,events.EventEmitter);

function ClientController(state){
  this.state = state;
}
ClientController.prototype.runCommand = function(command, params){
  switch(command){
    case 'NICK':
      break;
    case 'USER':
      break;
    case 'QUIT':
      break;
      
    case 'JOIN':
      break;
    case 'PART':
      break;
    case 'LIST':
      break;

    case 'PRIVMSG':
      break;
    case 'WHO':
      break;
      
    default: // error
    
  }
}
util.inherits(ClientController, events.EventEmitter);

function connectionListner(socket){
  var state = new IrcState();
  //var executor = new Executor(state);
  var clientController = new ClientController(state);
  clientController.on('error', function(){
    //socket.write(error)
  });
  clientControllers.push(client); // do we need this?
  socket.on('end',function(){
    console.log('client end');
  });
  var parser = new IrcParser(socket);
  parser.on('command',function(command,params){
    client.runCommand(command,params);
  });
  parser.on('parseError', function(){
    //socket.write(error)
  });
}

var NODE_ID = 1;
var CONFIG_FILE = '../default.conf';
var fs = require('fs');
var buf = fs.readFileSync(CONFIG_FILE);
var CONFIG_JSON = JSON.parse(buf.toString());

var assert = require('assert');
var irc = require('../index');

var net = require('net');



var server = irc.createServer(NODE_ID, CONFIG_JSON);
server.listen(CONFIG_JSON['irc-port'],function(){
  /*var conn = net.connect({port: CONFIG_JSON['irc-port']});
  conn.on('data',function(buf){
    assert.ok('joshux2'===buf.toString());
    conn.destroy();
    server.close();
  });*/
});

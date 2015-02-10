var NODE_ID = 1;
var CONFIG_FILE = 'default.conf';
var fs = require('fs');
var buf = fs.readFileSync(CONFIG_FILE);
var CONFIG_JSON = JSON.parse(buf.toString());

var irc = require('../index');

var net = require('net');
exports.test_initServer = function(test){
  var server = irc.createServer(NODE_ID, CONFIG_JSON);
  test.ok(server);
  test.done();
};

exports.test_ServerEchos = function(test){

  var server = irc.createServer(NODE_ID, CONFIG_JSON);

  server.listen(CONFIG_JSON['irc-port'],function(){

    /*var conn = net.connect({port: CONFIG_JSON['irc-port']});
    conn.write('aaa');
    conn.on('data',function(buf){
      test.equal('joshux',buf.toString());
      conn.destroy();
      server.close();
      test.done();
    });*/

  });
};

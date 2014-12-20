var NODE_ID = 1;
var CONFIG_FILE = 'default.conf';

var assert = require('assert');
var irc = require('../index');

exports.test_initServer = function(test){
  var server = irc.createServer(NODE_ID, CONFIG_FILE);
  test.done();
};

var net = require('net');

var server = net.createServer(function(client){
  client.on('readable',function(){
    console.log('readable');
  });

});

server.listen(3000);

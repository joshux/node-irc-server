process.stdin.on('readable', function(){
  var data = process.stdin.read(); // returns all the data
  console.log(data);
});

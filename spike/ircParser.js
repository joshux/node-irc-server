var COMMANDS = [
  'NICK',
  'USER',
  'QUIT',
  'JOIN',
  'PART',
  'LIST',
  'PRIVMSG',
  'WHO'
];
var PARAMS = '((?: +[^:\\0\\r\\n ][^\\0\\r\\n ]*)*)( +\\:[^\\0\\r\\n]*)?';
var CRLF = '\\r\\n';

var ircRegexString = '(?:' + COMMANDS.join('|') + ')' + PARAMS + CRLF;
var ircRegex = new RegExp(ircRegexString);
console.log(ircRegex.toString());
var IrcParser = function(str){
  
  var match2 = ircRegex.exec(str);
  console.log(match2[1]+ 'end');
  console.log(match2[2]+ 'end');
  //return message;// command, params []  
};

IrcParser('NICK   joshux   joshux2   :d dd \r\n');

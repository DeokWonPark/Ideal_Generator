var http = require('http');
var fs = require('fs');

function Error404(response) {
  console.log("Error2");
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.write("404 Error...");
  //response.end();
}

var app = http.createServer(function (request, response) {
  var url = request.url;
  if (request.url == '/') {
    url = '/Worldcup.html';
  }
  // if (request.url == '/favicon.ico') {
  //   console.log("Error1");
  //   Error404(response);
  // }
  response.writeHead(200);
  console.log(__dirname + url);
  response.end(fs.readFileSync(__dirname + url));

});
app.listen(80);

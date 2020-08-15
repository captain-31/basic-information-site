var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (request, response) {

  if (request.url == '/') {
  	//redirect to index page when localhost is opened
    response.writeHead(301, { "Location": "http://" + request.headers['host'] + '/index.html' });
	return response.end();
  }

  var q = url.parse(request.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      //redirect to 404 page when wrong URL is loaded
      response.writeHead(301, {'Location': 'http://' + request.headers['host'] + '/404.html' });
      return response.end();
    } 
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    return response.end();
  });
}).listen(8080);
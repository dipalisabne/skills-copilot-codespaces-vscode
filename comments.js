// Purpose: To create a simple server that allows users to post comments and view all comments.
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var comments = [];

http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
      }
    });
  } else if (pathname === '/comment') {
    var comment = urlObj.query;
    comments.push(comment);
    res.end();
  } else if (pathname === '/getComments') {
    var data = querystring.stringify({
      comments: comments
    });
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write(data);
    res.end();
  }
}).listen(3000);

console.log('Server is running at http://
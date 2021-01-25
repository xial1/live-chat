const fs = require ('fs');
const http = require('http');
const https = require('https');

const server = http.createServer();
server.on("listening", listen_handler);
server.on("request", request_handler);

const port = 3000;
server.listen(port);

function listen_handler() {
  console.log(`Now listening on Port ${port}`);
}

function request_handler(req, res) {
  console.log(`New Request from ${req.socket.remoteAddress} for ${req.url}`);
  if(req.url === "/") {
    const html_page = fs.createReadStream("html/index.html");
    res.writeHead(200, {"Content-Type": "text/html"});
    html_page.pipe(res);
  } else if(req.url === '/favicon.ico') {
    res.setHeader('Content-Type', 'image/x-icon');
    fs.createReadStream('img/favicon.ico').pipe(res);
  } else {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.end(`<h1>404 Not Found</h1>`);
  }
}
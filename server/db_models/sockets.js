var WebSocketServer = require('websocket').server,
    http = require('http'),
    express = require('express'),
    app = express();

wsServer = new WebSockerServer({
  httpServer: app,
  autoAcceptConnections: false
});

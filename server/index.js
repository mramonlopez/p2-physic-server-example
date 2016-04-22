'use strict';

var SocketServer = require('websocket').server, 
    Http = require('http'),
    Game = require('./modules/game');

var server = new SocketServer({
    httpServer: Http.createServer().listen(1337)
});

var connections = [],
    game = undefined;

var sendBallPosition = function(position) {
    var message = JSON.stringify({
            x: position[0],
            y: position[1]
        });

    console.log('Sending position: ', message);

    connections.forEach(function(conn) {
        conn.send(message);
    });
};


server.on('request', function(request) {
    var newConnection = request.accept(null, request.origin);
    connections.push(newConnection);

    if (!game) {
        game = new Game(sendBallPosition);
        game.init();
    }
}); 
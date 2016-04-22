'use strict';

var Comm = function (onPositionUpdated) {
	var socket = new WebSocket("ws://localhost:1337");

 	socket.onmessage = function (event) {
 		// Check message type!
 		var ballPosition = JSON.parse(event.data);
 		onPositionUpdated && onPositionUpdated(ballPosition);
	}
};

module.exports = Comm;	
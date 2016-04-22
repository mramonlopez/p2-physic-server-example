'use strict';

var p2 = require('p2');

// To get the trajectories of the bodies, 
// we must step the world forward in time. 
// This is done using a fixed time step size. 
var TIME_STEP = 1 / 30; // seconds 

// Hold this reference
var game;

var Game = function(loopCallback) {
	game = this;

	this.loopCallback = loopCallback;

	// Create a physics world, where bodies and constraints live 
	this._world = new p2.World({
	    gravity:[0, -9.82]
	});
	 
	// Create an empty dynamic body 
	this._ball = new p2.Body({
	    mass: 5,
	    position: [0, 10]
	});

	// Add a circle shape to the body. 
	var circleShape = new p2.Circle({ radius: 1 });
	this._ball.addShape(circleShape);

	// ...and add the body to the world. 
	// If we don't add it to the world, it won't be simulated. 
	this._world.addBody(this._ball);

	// Create an infinite ground plane. 
	var groundBody = new p2.Body({
	    mass: 0 // Setting mass to 0 makes the body static 
	})

	var groundShape = new p2.Plane();
	
	groundBody.addShape(groundShape);
	this._world.addBody(groundBody);
};

Game.prototype.init = function() {
	setInterval(this.gameLoop, 1000 * TIME_STEP);
};

Game.prototype.gameLoop = function() {
	// The step method moves the bodies forward in time. 
	game._world.step(TIME_STEP);

    game.loopCallback && game.loopCallback(game._ball.position);
};

module.exports = Game;
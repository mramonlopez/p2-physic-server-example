
  'use strict'
  var Comm = require('../modules/comm');

  var ball = undefined;

  function Play() {}
  Play.prototype = {
     create: function() {
      ball = this.game.add.sprite(this.game.width/2, this.game.height/2, 'ball');
      ball.inputEnabled = true;
      ball.events.onInputDown.add(this.clickListener, this);

      this.comm = new Comm(this.updateBallPosition);
    },

    update: function() {

    },

    clickListener: function() {
      this.game.state.start('menu');
    },

    updateBallPosition: function(position) {
      ball.x = position.x * 50;
      ball.y = 550 - position.y * 50;
    }
  };
  
  module.exports = Play;
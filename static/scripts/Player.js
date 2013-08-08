function Player() {
  // The player's location, relative to the starting position of the upper
  // right corner of the screen. Start it in the middle of the screen.
  this.loc = new Pair(Frame.WIDTH / 2, Frame.HEIGHT/2);

  this.initKeyResponses_();
}

/*
 * Initializes a map from keycodes which the player cares about to functions
 * which should be called if the keys which thoses keycodes are pressed.
 */
Player.prototype.initKeyResponses_ = function() {
  // TODO
  this.keyResponses = {
    1234: function() {
      this.move_(new Pair(1, 0));
    }.bind(this),
    1235: function() {
      this.move_(new Pair(0, 1));
    }.bind(this)
  };
};

Player.prototype.draw = function() {
  // TODO
};


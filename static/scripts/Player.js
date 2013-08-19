/*
 * Constructor for the Player class. A Player contains all information about
 * the third-person character which the user will play.
 *
 * Params:
 *   - ctx: The context onto which all pieces of the Game will draw themselves.
 */
function Player(ctx) {
  this.ctx_ = ctx;

  // The player's location, relative to the starting position of the upper
  // right corner of the screen. Start it in the middle of the screen.
  this.loc = new Pair(Frame.COLS * Block.WIDTH / 2,
      Frame.ROWS * Block.HEIGHT / 2);
}

/*
 * Takes the action within the Player object corresponding to a given key code,
 * if any.
 * 
 * Params:
 *   - keyCode
 */
Player.prototype.respondToPress = function(keyCode) {
  switch (keyCode) {
    case '37':  // left arrow
      this.move_(new Pair(-1 * Block.WIDTH, 0));
      return;
    case '38':  // up arrow
      // TODO: change to jump
      this.move_(new Pair(0, -1 * Block.HEIGHT));
      return;
    case '39':  // right arrow
      this.move_(new Pair(Block.WIDTH, 0));
      return;
    case '40':  // down arrow
      this.move_(new Pair(0, Block.HEIGHT));
      return;
  }
};

/*
 * Moves the Player by a given distance.
 * 
 * Params:
 *   - distance: A Pair giving the x and y distance by which to move the Player.
 */
Player.prototype.move_ = function(distance) {
  this.loc = Pair.add(this.loc, distance);
};

/* Draws the Player. */
Player.prototype.draw = function() {
  // TODO
};

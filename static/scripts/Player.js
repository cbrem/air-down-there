/*
 * Constructor for the Player class. A Player contains all information about
 * the third-person character which the user will play.
 *
 * Params:
 *   - ctx: The context onto which all pieces of the Game will draw themselves.
 */
function Player(ctx) {
  this.ctx_ = ctx;
  this.spriteSeries_ = new SpriteSeries(Player.PLAYER_SPRITE_SERIES, ctx);

  // The player's location, in pixels, relative to the Environment's origin.
  // Start it at the center of the origin Frame.
  this.location = Coords.getFramePixelCenter();
}

/* Player sprite dimensions, in pixels. */
Player.HEIGHT = 32;
Player.WIDTH = 32;

/* Name of the series of sprites to be drawn at the player's location. */
Player.PLAYER_SPRITE_SERIES = 'mech';

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
      this.move_(new Pair(-1 * Block.SIDE, 0));
      return;
    case '38':  // up arrow
      // TODO: change to jump
      this.move_(new Pair(0, -1 * Block.SIDE));
      return;
    case '39':  // right arrow
      this.move_(new Pair(Block.SIDE, 0));
      return;
    case '40':  // down arrow
      this.move_(new Pair(0, Block.SIDE));
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
  this.location = Pair.add(this.location, distance);
};

/* Draws the Player. */
Player.prototype.draw = function() {
  var dimensions = new Pair(2 * Block.SIDE, 2 * Block.SIDE);
  this.spriteSeries_.draw(this.location, dimensions);
};

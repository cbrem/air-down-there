/*
 * Constructor for the Player class. A Player contains all information about
 * the third-person character which the user will play.
 *
 * Params:
 *   - ctx: The context onto which all pieces of the Game will draw themselves.
 *   - environement: The Environment in which the Player moves.
 */
function Player(ctx, environment) {
  this.ctx_ = ctx;
  this.environment_ = environment;
  this.spriteSeries_ = new SpriteSeries(Player.PLAYER_SPRITE_SERIES, ctx);

  // The player's location, in pixels, relative to the Environment's origin.
  // Start it at the center of the origin Frame.
  this.location = Coords.getFramePixelCenter();
}

/* Player sprite dimensions, as multiples of Block.SIDE. */
Player.HEIGHT = 2;
Player.WIDTH = 2;

/*
 * The maximum number of blocks by which the player can move per cycle. This
 * applies to horizontal movement and vertical movement independently.
 */
Player.BLOCKS_PER_CYCLE = 0.5;

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
      this.move_(new Pair(-1 * Player.BLOCKS_PER_CYCLE * Block.SIDE, 0));
      return;
    case '38':  // up arrow
      // TODO: change to jump
      this.move_(new Pair(0, -1 * Player.BLOCKS_PER_CYCLE * Block.SIDE));
      return;
    case '39':  // right arrow
      this.move_(new Pair(Player.BLOCKS_PER_CYCLE * Block.SIDE, 0));
      return;
    case '40':  // down arrow
      this.move_(new Pair(0, Player.BLOCKS_PER_CYCLE * Block.SIDE));
      return;
  }
};

/*
 * Moves the Player at most by a given distance. Actual movement may be less if
 * there are obstacles in the way.
 * 
 * Params:
 *   - distance: A Pair giving the x and y distance by which to move the Player.
 */
Player.prototype.move_ = function(distance) {
  var targetLocation = Pair.add(this.location, distance);
  this.location = this.environment_.getFurthestPossibleMovement(
      this.location, targetLocation);
};

/* Draws the Player. */
Player.prototype.draw = function() {
  var location = Coords.getFramePixelCenter();
  var dimensions =
      new Pair(Player.WIDTH * Block.SIDE, Player.HEIGHT * Block.SIDE);
  this.spriteSeries_.draw(location, dimensions);
};

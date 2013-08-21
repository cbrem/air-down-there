// TODO: Abstract 2D, infinite array out into Grid class.

/*
 * Constructor for the environment module. An enviroment contains information
 * about object in the Game which are not the Player.
 *
 * Params:
 *   - ctx: The context onto which all pieces of the Game will be drawn.
 */
function Environment(ctx) {
  this.ctx_ = ctx;
  this.tunnelStartArrays_ = new Grid();
  this.frames_ = new Grid();
  this.background_ =
      new SpriteSeries(Environment.BACKGROUND_SPRITE_SERIES, ctx);
}

/* Name of the series of sprites to be drawn behind the blocks. */
Environment.BACKGROUND_SPRITE_SERIES = 'background';

/*
 * Takes the action within the Player object corresponding to a given key code,
 * if any.
 * 
 * Params:
 *   - keyCode
 */
Environment.prototype.respondToPress = function(keyCode) {
  // TODO
};

/*
 * Draws the environment. Note that this draws each Frame in which a corner of
 * the canvas falls. Since the width of the canvas and the width of any Frame
 * are equal, this is sufficient.
 *
 * Params:
 *  - upperLeft: a Pair expressing the offset between the current and initial
 *      positions of the canvas's upper-left corner.
 */
Environment.prototype.draw = function(upperLeft) {
  // Draw the background.
  var location = new Pair(0, 0);
  var dimensions = new Pair(Frame.COLS * Block.SIDE, Frame.ROWS * Block.SIDE);
  this.background_.draw(location, dimensions);

  // Iterate over all four corners of the canvas, and draw the Frame which
  // contains each corner.
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      var screenCorner = Pair.add(upperLeft,
          Coords.envPixelsFromEnvIndices(new Pair(i, j)));
      var frameIndices = Coords.envIndicesFromEnvPixels(screenCorner);
      var frame = this.frames_.get(frameIndices);
      Asserts.assert(frame !== undefined, Strings.format(
          'Environment.prototype.draw got undefined Frame at: %s.',
              frameIndices));

      // Note that frameUpperLeft is not necessarily the same as
      // screenCorner, as frameUpperLeft is rounded to an upper-left corner,
      // while screenCornerCords is not.
      var frameUpperLeft = Coords.envPixelsFromEnvIndices(frameIndices);
      var frameOffset = Pair.sub(frameUpperLeft, upperLeft);
      frame.draw(frameOffset);
    }
  }
};

/*
 * TODO: abstract some of this logic out into a 'for each corner' method?
 *
 * Adds enough Frames to ensure that all of the canvas will be covered with
 * Frames when the Environment is next drawn.
 *
 * Params:
 *   - upperLeft: The offset between the current and initial positons of the
 *       upper-left corner of the canvas.
 */
 Environment.prototype.addFrames = function(upperLeft) {
  // Iterate over all four corners of the canvas.
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      var coords = Pair.add(upperLeft,
          Coords.envPixelsFromEnvIndices(new Pair(i, j)));
      var indices = Coords.envIndicesFromEnvPixels(coords);
      if (this.frames_.get(indices) === undefined) {
        // There is no Frame covering this corner, so create one.
        this.addFrame_(indices);
      }
    }
  }
 };

/*
 * Create a new Frame at a given row and col in the Environment. Seed it with
 * the tunnel starting points which adjacent Frames have left for it, if any.
 *
 * Params:
 *   - indices: The Frame's location, as a (col, row) Pair.
 */
Environment.prototype.addFrame_ = function(indices) {
  var tunnelStartArray = this.tunnelStartArrays_.get(indices);
  var newFrame = new Frame(this.ctx_, indices, this, tunnelStartArray)
  this.frames_.set(indices, newFrame);
};

/*
 * Gets the block at a pixel location in the Environment. Returns undefined if
 * there is now block at this location.
 *
 * Params:
 *   - envPixels: An (x, y) Pair giving the block's location, measured relative
 *       to the Environment's origin.
 */
Environment.prototype.getBlock = function(envPixels) {
  // Get the Frame which contains pixels. If there is no such Frame, return
  // undefined.
  var envIndices = Coords.envIndicesFromEnvPixels(envPixels);
  var frame = this.frames_.get(envIndices);
  if (frame === undefined) {
    return undefined;
  }

  // If a Frame does contain pixels, return the particular block inside this
  // Frame which contains pixels.
  var framePixels = Coords.framePixelsFromEnvPixels(envPixels);
  var frameIndices = Coords.frameIndicesFromFramePixels(framePixels);
  return frame.blocks.get(frameIndices);
};

/*
 * Add a TunnelStart struct to the Array of TunnelStarts associated with
 * indices. This Array will be used to seed a Frame's tunnels when it is placed
 * at these same indices in this.frames_.
 *
 * Params:
 *   - indices: A (col, row) Pair giving the location in this.tunnelStartArrays_
 *       of the TunnelStart Array to modify.
 *   - tunnelStart: A TunnelStart struct to add to this Array.
 */
Environment.prototype.addTunnelStart = function(indices, tunnelStart) {
  if (this.tunnelStartArrays_.get(indices) === undefined) {
    this.tunnelStartArrays_.set(indices, []);
  }
  this.tunnelStartArrays_.get(indices).push(tunnelStart);
};

/*
 * Given a current and target position, Returns a pixel coordinate Pair giving
 * the furthest point between these positions to which the Player can move
 * without colliding with Blocks.
 *
 * Params:
 *   - current: The Player's current location, as an (x, y) pair of pixel
 *       distances from the Environment's origin.
 *   - target: The Player's target location, as an (x, y) pair of pixel
 *       distances from the Environment's origin.
 */
Environment.prototype.getFurthestPossibleMovement = function(current, target) {
  // TODO: this may need to be updated to ensure that it will work with
  // non-square object. Specifically, it isn't enough to default back to current
  // if target is occupied. We must go somewhere in the middle.

  // Check whether any Blocks are blocking any point on the Player from moving
  // to the target location. We only need to check a grid of points on the
  // Player which are seperated by distances equal to the smallest possible
  // unit of movement.
  var blocked = false;
  for (var i = 0; i < Player.WIDTH; i += Player.BLOCKS_PER_CYCLE) {
    for (var j = 0; j < Player.HEIGHT; j += Player.BLOCKS_PER_CYCLE) {
      var targetPixels =
          Pair.add(target, new Pair(i * Block.SIDE, j * Block.SIDE));
      var blockAtPixels = this.getBlock(targetPixels);
      console.log(blockAtPixels);
      if (blockAtPixels !== undefined) {
        blocked = true;
      }
    }
  }
  return blocked ? current : target;
};

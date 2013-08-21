/*
 * Constructor for the Frame class. A Frame is composed of Blocks. A Frame is a
 * unit of the Environment; the Environment is generated Frame by Frame.
 *
 * In the constructor, a Frame is first randomly filled with Blocks. Then,
 * tunnels are randomly cut through these blocks.
 *
 * A Frame is exactly screen-sized. This allows us to safely draw at most 4
 * Frames every time that we draw the environment.
 * 
 * Params:
 *  - ctx: The context onto which all pieces of the Game will be drawn.
 *  - indices: A (col, row) Pair giving the Frame's indices into the
 *      Environment's this.frames_ object.
 *  - environment: The Environment of which this Frame is a part.
 *  - tunnelStartArray: Locations where this Frame must begin tunnels to pick up
 *      where adjacent Frames left off. This may be undefined.
 */
function Frame(ctx, indices, environment, tunnelStartArray) {
  this.ctx_ = ctx;
  this.indices_ = indices;
  this.environment_ = environment;
  this.blocks_ = new Grid();

  this.fillWithBlocks_();
  this.makeTunnels_(tunnelStartArray);
}

/* Rows of Blocks in a Frame. */
Frame.ROWS = 25;

/* Columns of Blocks in a Frame. */
Frame.COLS = 40;

// TODO: why does this have to be so high to get results?
/* Chance continue after a step in its carving. */
Frame.TUNNEL_CONTINUE_CHANCE = 0.999;

/* The length of each tunnel-carving step, as a multiple of Block.SIDE. */
Frame.TUNNEL_STEP_LENGTH = 3;

/* The value of the dimension of a tunnel perpendicular to its length. */
Frame.TUNNEL_DIAMETER = 3;

/*
 * Maximum number of new tunnels (i.e. tunnels which did not come from a
 * neighbor's tunnelEdges) which will be placed when a Frame is created.
 */
Frame.MAX_NEW_TUNNELS = 6;

/* Minimum number of new tunnels to place when a Frame is created. */
Frame.MIN_NEW_TUNNELS = 3;

/*
 * Maximum absolute-value of the amount by which a tunnel's direction can change
 * in a tunnel-carving step.
 */
Frame.MAX_DIRECTION_CHANGE = Math.PI/2;

/*
 * Draw all Blocks in a Frame.
 *
 * Params:
 *  - frameOffset: A Pair giving the number of pixels by which the upper-left
 *      corner of this Frame is offset from the upper-left corner of the canvas.
 */
Frame.prototype.draw = function(frameOffset) {
  for (var row = 0; row < Frame.ROWS; row++) {
    for (var col = 0; col < Frame.COLS; col++) {
      var indices = new Pair(col, row);
      var block = this.blocks_.get(indices);

      // TODO: move this conversion to Coords?
      var blockOffset = Pair.add(
        new Pair(col * Block.SIDE, row * Block.SIDE), frameOffset);
      if (block !== undefined) {
        // If the block was not carved out to create a tunnel, draw it.
        block.draw(blockOffset);
      }
    }
  }
};

/* Randomly fills a Frame with Blocks. Fills every index. */
Frame.prototype.fillWithBlocks_ = function() {
  for (var row = 0; row < Frame.ROWS; row++) {
    for (var col = 0; col < Frame.COLS; col++) {
      var indices = new Pair(col, row);
      var block = Block.randomBlock(this.ctx_);
      this.blocks_.set(indices, block);
    }
  }
};

/*
 * Randomly carves tunnels into a Frame which is fully filled with Blocks.
 * 
 * Params:
 *   - tunnelStartArray: An Array of TunnelPoints when this Frame should start
         its tunnels in order to pick up where adjacent Frames left off. This
         may be undefined.
 */
Frame.prototype.makeTunnels_ = function(tunnelStartArray) {
  tunnelStartArray = tunnelStartArray || [];

  // Pad tunnelStarts with TunnelsPoints which originate from within this Frame
  // (as opposed to TunnelPoints when pick up tunnels started in other Frames).
  var newTunnels = Random.integer(Frame.MIN_NEW_TUNNELS, Frame.MAX_NEW_TUNNELS);
  for (var i = 0; i < newTunnels; i++) {
    var tunnelPoint = TunnelPoint.randomTunnelPoint();
    tunnelStartArray.push(tunnelPoint);
  };

  for (var i = 0; i < tunnelStartArray.length; i++) {
    var tunnelStart = tunnelStartArray[i];
    this.makeOneTunnel_(tunnelStart);
  }
};

/*
 * Determines whether the given (x, y) Pair of pixel coordinates is inside the
 * Frame.
 *
 * Params:
 *   - pixels: A (x, y) coordinate Pair, where coordinates are pixel distances
 *       from this Frame's upper-left corner.
 */
Frame.prototype.inBounds_ = function(pixels) {
  return (0 <= pixels.x && pixels.x < Frame.COLS * Block.SIDE
    && 0 <= pixels.y && pixels.y < Frame.ROWS * Block.SIDE);
};

/*
 * Makes a tunnel through the Frame, given starting pixel coordinates and a
 * starting direction.
 *
 * Params:
 *   - tunnelStart: A TunnelPoint containing information about the pixel
 *       coordinates within the Frame and the direction with which the tunnel
 *       should start.
 */
Frame.prototype.makeOneTunnel_ = function(tunnelStart) {
  Asserts.assert(this.inBounds_(tunnelStart.location),
      Strings.format('makeOneTunnel_ got bad start location: %s.',
          tunnelStart.loc));

  var location = tunnelStart.location;
  var direction = tunnelStart.direction;
  while (Random.chance(Frame.TUNNEL_CONTINUE_CHANCE)) {
    // Carve a square at the current position in the tunnel.
    this.carveSquare_(location);

    // Randomly determine next location and direction of the tunnel.
    var directionChangeSign = Random.equalChange() ? -1 : 1;
    var directionChangeMagnitude =
      Random.loBiasedReal(0, Frame.MAX_DIRECTION_CHANGE);
    var direction = direction + directionChangeSign * directionChangeMagnitude;
    var locationChange = Pair.fromPolar(Frame.TUNNEL_STEP_LENGTH, direction);
    var location = Pair.add(location, locationChange);

    // If the next location is out of this Frame, determine which Frame it has
    // spilled over into an save it to use as a seed for tunnels in that Frame.
    if (!this.inBounds_(location)) {
      var wrappedTunnelPoint =
          new TunnelPoint(this.wrapPixels_(location), direction);
      var envPixels = Coords.envPixelsFromEnvIndicesAndFramePixels(
          this.indices_, location);
      var envIndices = Coords.envIndicesFromEnvPixels(envPixels);
      this.environment_.addTunnelStart(envIndices, wrappedTunnelPoint);
      return;
    }
  }
};

/*
 * Given a pixel coordinate Pair, creates another Pair with x and y components
 * equal to the original x component mod the pixel width of a Frame and the
 * original y component mod the pixel height of the Frame, respectively.
 *
 * Both components of the new Pair are between 0 and their respective dimension.
 *
 * Params:
 *   - pixels: An (x, y) Pair of pixel coordinates.
 */
Frame.prototype.wrapPixels_ = function(pixels) {
  var wrappedX = pixels.x % (Frame.COLS * Block.SIDE);
  if (wrappedX < 0) {
    wrappedX += Frame.COLS * Block.SIDE;
  }

  var wrappedY = pixels.y % (Frame.ROWS * Block.SIDE);
  if (wrappedY < 0) {
    wrappedY += Frame.ROWS * Block.SIDE;
  }

  var wrappedPixels = new Pair(wrappedX, wrappedY);
  Asserts.assert(this.inBounds_(wrappedPixels),
      Strings.format('wrapPixels_ produced bad Pair: %s.', wrappedPixels));
  return wrappedPixels;
};

/*
 * Carves a square centered at coords into the Frame.
 *
 * Params:
 *   - center: An (x, y) pair giving the center of the square.
 */
Frame.prototype.carveSquare_ = function(center) {
  var startX = center.x - Frame.TUNNEL_DIAMETER * Block.SIDE / 2;
  var startY = center.y - Frame.TUNNEL_DIAMETER * Block.SIDE / 2;

  for (var i = 0; i < Frame.TUNNEL_DIAMETER; i++) {
    for (var j = 0; j < Frame.TUNNEL_DIAMETER; j++) {
      var x = startX + i * Block.SIDE;
      var y = startY + j * Block.SIDE;
      var coords = new Pair(x, y);
      var indices = Coords.frameIndicesFromFramePixels(coords);
      this.clearBlock_(indices);
    }
  }
};

/*
 * Set the Block with the given (col, row) in this Frame to undefined.
 *
 * Params:
 *   - indices: The position of the Block in the Frame as a (col, row) Pair.
 */
Frame.prototype.clearBlock_ = function(indices) {
  this.blocks_.set(indices, undefined);
};

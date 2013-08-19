/*
 * Constructor for the environment module. An enviroment contains information
 * about object in the Game which are not the Player.
 *
 * Params:
 *   - ctx: The context onto which all pieces of the Game will be drawn.
 */
function Environment(ctx) {
  this.ctx_ = ctx;
  this.frames_ = {};
}

/* The image with this name will be drawn under the Blocks every cycle. */
Environment.BACKGROUND_IMAGE_NAME = 'background';

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
  var img = Images[Environment.BACKGROUND_IMAGE_NAME];
  this.ctx_.drawImage(img, img.snipX, img.snipY, img.snipWidth, img.snipHeight,
      0, 0, Frame.COLS * Block.WIDTH, Frame.ROWS * Block.HEIGHT);

  // Iterate over all four corners of the canvas, and draw the Frame which
  // contains each corner.
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      var screenCorner =
          Pair.add(upperLeft, this.coordsFromIndices_(new Pair(i, j)));
      var frameIndices = this.indicesFromCoords_(screenCorner);
      var frame = this.getFrame_(frameIndices);
      Asserts.assert(frame !== undefined, Strings.format(
          'Environment.prototype.draw got undefined Frame at: %s.',
              frameIndices));

      // Note that frameUpperLeft is not necessarily the same as
      // screenCorner, as frameUpperLeft is rounded to an upper-left corner,
      // while screenCornerCords is not.
      var frameUpperLeft = this.coordsFromIndices_(frameIndices);
      var frameOffset = Pair.sub(frameUpperLeft, upperLeft);
      frame.draw(frameOffset);
    }
  }
};

// TODO: definitely abstract this out into a library.
/*
 * Gets the indices in this.frames_ of the frame which contains the given pixel
 * coords.
 *
 * Params:
 *   - coords: The pixel coordinates, as an (x, y) Pair.
 */
Environment.prototype.indicesFromCoords_ = function(coords) {
  var col = Math.floor(coords.x / (Frame.COLS * Block.WIDTH));
  var row = Math.floor(coords.y / (Frame.ROWS * Block.HEIGHT));
  return new Pair(col, row);
};

/*
 * Gets the pixel coordinates of the upper-left corner of a Frame at given
 * indices in this.frames_.
 *
 * Params:
 *   - indices: The Frame's location in this.frames_, as a (col, row) pair.
 */
Environment.prototype.coordsFromIndices_ = function(indices) {
  var col = indices.x;
  var row = indices.y;
  var x = col * Frame.COLS * Block.WIDTH;
  var y = row * Frame.ROWS * Block.HEIGHT;
  return new Pair(x, y);
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
      var coords = Pair.add(upperLeft, this.coordsFromIndices_(new Pair(i, j)));
      var indices = this.indicesFromCoords_(coords);
      if (this.getFrame_(indices) === undefined) {
        // There is no Frame covering this corner, so create one.
        this.addFrame_(indices);
      }
    }
  }
 };

/*
 * Create a new Frame at a given row and col in the Environment.
 *
 * Params:
 *   - indices: The Frame's location, as a (col, row) Pair.
 */
Environment.prototype.addFrame_ = function(indices) {
  var col = indices.x;
  var row = indices.y;

  // Generate a new, empty row if necessary.
  if (this.frames_[row] === undefined) {
    this.frames_[row] = {};
  }
   
  // Place a new cell in the given col number at the given row number.
  this.frames_[row][col] = new Frame(this.ctx_, indices);
};

/*
 * Gets the Frame at a given location from this.frames_.
 *
 * Params:
 *   - indices: The Frame's location in this.frames_ as a (col, row) Pair.
 */
Environment.prototype.getFrame_ = function(indices) {
  var col = indices.x;
  var row = indices.y;

  // Ensure that undefined is returned if either the row or column is invalid.
  if (this.frames_[row] === undefined) {
    return undefined;
  }
  return this.frames_[row][col];
};

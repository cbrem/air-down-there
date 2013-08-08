/* constructor for the environment module */
function Environment(ctx) {
  this.ctx_ = ctx;
  this.frames_ = {};

  // TODO: create initial frame?
}

/*
 * Draws the environment.
 *
 * Params:
 *  - upperLeftCorner: a Pair expressing the distance from the initial position
 *      of the screen's upper left corner to its current position.
 */
Environment.prototype.draw = function(upperLeftCorner) {
  // The location in this.frames_ of the Frame in which the upper left corner
  // of the screen falls.
  var upperLeftFrameIndex = this.getUpperLeftFrame_();
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      var frameIndex = Pair.add(upperLeftFrameIndex, new Pair(i, j));

    }
  }
};

Environment.prototype.frameByPair_ = function

Environment.prototype.addFrame_ = function(row, col) {
  /* generate a new, empty row if necessary */
  if (this.frames[row] === undefined) {
    this.frames[row] = {};
  }
   
  /* place a new cell in the given col number at the given row number */
  this.frames[row][col] = new Frame(row, col);
};

/*
 * Gets the Frame in which the upper-left corner of the screen is located.
 * Whenever we draw the Environment, we need to draw only this Frame, the
 * Frame directly below it, the frame directly to its right, and the Frame
 * dirctely to its bottom-right.
 */
Environment.prototype.getUpperLeftFrame_ = function() {
  // TODO
};


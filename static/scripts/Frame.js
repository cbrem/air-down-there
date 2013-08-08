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
 *  - environment is the Environment that this Frame is a part of.
 *  - loc is a Pair given the Frame's location in the Environment.
 */
function Frame(environment, ctx, loc) {
  // TODO: do we actually need environment here?
  this.environment_ = environment;
  this.ctx_ = ctx;
  this.loc_ = loc;
  this.blocks_ = [];

  this.fillWithBlocks_();
  this.makeTunnels_();
}

/* Rows of Blocks in a Frame. */
Frame.ROWS = 8;

/* Columns of Blocks in a Frame. */
Frame.COLS = 12;

// TODO: Width and height in pixels shouldn't be defined here. Find a way to get
// these from blocks, maybe in the constructor.

/*
 * Draw all Blocks in a Frame.
 *
 * Params:
 *  - offset: A Pair giving the number of pixels by which the upper-left corner
 *            of this Frame is offset from the upper-left corner of the canvas.
 */
Frame.prototype.draw = function(offset) {
  for (var row = 0; row < Frame.ROWS; row++) {
    for (var col = 0; col < Frame.COLS; col++) {
      var block = this.blocks_[row][col];
      Asserts.assert(block !== undefined,
          Strings.format('Tried to draw undefined block at row=%s, col=%s.',
              row, col));
      black.draw();
    }
  }
};

/* Randomly fill the frame with Blocks. Fill every index. */
Frame.prototype.fillWithBlocks_ = function() {
  for (var row = 0; row < Frame.ROWS; row++) {
    this.blocks_[row] = [];
    for (var col = 0; col < Frame.COLS; col++) {
      this.blocks_[row][col] = Block.randomBlock();
    }
  }
};

/* Randomly carve tunnels into a Frame which is fully filled with Blocks. */
Frame.prototype.makeTunnels_ = function() {
  // TODO
};


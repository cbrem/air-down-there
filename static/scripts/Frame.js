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
 *  - indices: a (col, row) Pair giving the Frame's indices into the
 *      Environment's this.frames_ object.
 */
function Frame(ctx, indices) {
  this.ctx_ = ctx;
  this.indices_ = indices;
  this.blocks_ = [];

  this.fillWithBlocks_();
  this.makeTunnels_();
}

/* Rows of Blocks in a Frame. */
Frame.ROWS = 25;

/* Columns of Blocks in a Frame. */
Frame.COLS = 40;

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
      var block = this.blocks_[row][col];
      Asserts.assert(block !== undefined,
          Strings.format('Tried to draw undefined block at row=%s, col=%s.',
              row, col));
      var blockOffset = Pair.add(
        new Pair(col * Block.WIDTH, row * Block.HEIGHT), frameOffset);
      block.draw(blockOffset);
    }
  }
};

/* Randomly fill the frame with Blocks. Fill every index. */
Frame.prototype.fillWithBlocks_ = function() {
  for (var row = 0; row < Frame.ROWS; row++) {
    this.blocks_[row] = [];
    for (var col = 0; col < Frame.COLS; col++) {
      this.blocks_[row][col] = Block.randomBlock(this.ctx_);
    }
  }
};

/* Randomly carve tunnels into a Frame which is fully filled with Blocks. */
Frame.prototype.makeTunnels_ = function() {
  // TODO
};

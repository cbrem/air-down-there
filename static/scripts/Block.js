/*
 * Constructor for the Block class. Frames are made of Blocks.
 *
 * Params:
 *   - ctx: The context onto which all game components draw.
 *   - type: The type of the Block to create, from Block.
 */
function Block(ctx, type) {
  Asserts.assert(type in Block.TYPES,
      Strings.format('Block constructor given bad type: %s.', type));

  this.ctx_ = ctx;
  this.spriteSeries_;

  // Create a block with all the properties listed for the given type.
  var properties = Block.TYPES[type];
  for (var property in properties) {
    if (property === 'spriteSeriesType') {
      var spriteSeriesType = properties['spriteSeriesType'];
      this.spriteSeries_ = new SpriteSeries(spriteSeriesType, ctx);
    } else {
      this[property] = properties[property];
    }
  }
}

/* The length of one side of a Block, in pixels. Blocks must be square. */
Block.SIDE = 16;

/*
 * Draws a block at a given position.
 *
 * Params:
 *   - blockOffset: A Pair which gives the distance between the upper-left
 *       corner of the Block and that of the canvas.
 */
Block.prototype.draw = function(blockOffset) {
  this.spriteSeries_.draw(blockOffset, new Pair(Block.SIDE, Block.SIDE));
};

Block.MIXINS = {
  'nothing': function () {},
}

Block.TYPES = {
  stone: {
    onCollide: Block.MIXINS.nothing,
    spriteSeriesType: 'stone'
  },
  dirt: {
    onCollide: Block.MIXINS.nothing,
    spriteSeriesType: 'dirt'
  },
  gold: {
    onCollide: Block.MIXINS.nothing,
    spriteSeriesType: 'gold'
  }
};

/*
 * Creates a Block with a randomly-chosen type.
 *
 * Params:
 *   - ctx: The context onto which all Game components draw.
 */
Block.randomBlock = function (ctx) {
  // Will not work on legacy browsers. TODO: make a shim for this?
  var types = Object.keys(Block.TYPES);
  var randType = Random.choice(types);
  return new Block(ctx, randType);
};

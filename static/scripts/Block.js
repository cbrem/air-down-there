/*
 * Constructor for the Block class. Frames are made of Blocks.
 *
 * Params:
 *   - ctx: The context onto which all game components draw.
 *   - type: The type of the Block to create, from Block.
 */
function Block(ctx, type) {
  Asserts.assert(type in Block.TYPES,
      Strings.format("Block constructor given bad type: %s.", type));

  this.ctx_ = ctx;

  // Create a block with all the properties listed for the given type.
  var properties = Block.TYPES[type];
  for (property in properties) {
    if (property === "imgName") {
      var name = properties["imgName"];
      this.img = Images[name];
    } else {
      this[property] = properties[property];
    }
  }
}

/* The width and height of one Block, in pixels. */
Block.WIDTH = 16;
Block.HEIGHT = 16;

/*
 * Draws a block at a given position.
 *
 * Params:
 *   - blockOffset: A Pair which gives the distance between the upper-left
 *       corner of the Block and that of the canvas.
 */
Block.prototype.draw = function(blockOffset) {
  this.ctx_.drawImage(this.img, this.img.snipX, this.img.snipY,
      this.img.snipWidth, this.img.snipHeight, blockOffset.x, blockOffset.y,
      Block.WIDTH, Block.HEIGHT);
};

Block.MIXINS = {
  "nothing": function () {},
}

Block.TYPES = {
  "stone": {
    "onCollide": Block.MIXINS.nothing,
    "imgName": "stone"
  },
  "dirt": {
    "onCollide": Block.MIXINS.nothing,
    "imgName": "dirt"
  }
}

/*
 * Creates a Block with a randomly-chosen type.
 *
 * Params:
 *   - ctx: The context onto which all Game components draw.
 */
Block.randomBlock = function (ctx) {
  var types = Object.keys(Block.TYPES); //will not work on legacy browsers
  var randType = Random.choice(types);
  return new Block(ctx, randType);
}

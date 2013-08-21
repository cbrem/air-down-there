/*
 * Constructor for the SpriteSeries class. A SpriteSeries will cycle between a
 * group of sprite images when its draw() method is called repeatedly.
 * 
 * Params:
 *   - type: An identifier for the group of sprites that this SpriteSeries will
 *       draw. This must be a key from SpriteSeries.TYPES.
 *   - ctx: The context onto which the sprites will be drawn.
 */
function SpriteSeries(type, ctx) {
  Asserts.assert(type in SpriteSeries.TYPES,
      Strings.format('%s is not a valid SpriteSeries type.', type));
  this.cycleCounter_ = 0;
  this.series_ = SpriteSeries.TYPES[type];
  this.ctx_ = ctx;
}

/*
 * The number of cycles for which a SpriteSeries will stay on one Sprite in the
 * series before changing to the next.
 */
SpriteSeries.CYCLES_PER_SPRITE = 3;

/*
 * Draws an image based on a sprite in the series, and advances a counter so
 * later called to draw() will draw different sprites.
 *
 * Params:
 *   - location: An (x, y) Pair giving the pixel coordinates on the screen at
 *       which the upper-left corner of the sprite should be drawn.
 *   - dimensions: A (width, height) Pair giving the pixel dimensions with which
 *       the sprite should be drawn.
 */
SpriteSeries.prototype.draw = function(location, dimensions) {
  // Choose which sprite to extract form this SpriteSeries' this.series_ Array
  // based on the value of its cycle counter.
  var seriesIndex =
      Math.floor(this.cycleCounter_ / SpriteSeries.CYCLES_PER_SPRITE);
  var sprite = this.series_[seriesIndex];
  Asserts.assert(sprite.src in Images.IMAGES,
    Strings.format('%s is not a valid image source.', sprite.src));
  var img = Images.IMAGES[sprite.src];

  // Draw the sprite.
  this.ctx_.drawImage(img, sprite.snipX, sprite.snipY, sprite.snipWidth,
      sprite.snipHeight, location.x, location.y, dimensions.x, dimensions.y);

  // Move the cycle counter forward so that later calls to draw() will draw
  // different sprites in the series.
  var cyclesPerSeries = SpriteSeries.CYCLES_PER_SPRITE * this.series_.length;
  this.cycleCounter_ = (this.cycleCounter_ + 1) % cyclesPerSeries;
};


/*
 * A map from SpriteSeries types to their associated series of sprites (i.e.
 * series of objects, each of which gives an image source and dimensions for
 * snipping the image.
 */
SpriteSeries.TYPES = {
  stone: [
    {
      src: 'minecraft_terrain.png',
      snipX: 10,
      snipY: 10,
      snipWidth: 16,
      snipHeight: 16
    }
  ],
  dirt: [
    {
      src: 'minecraft_terrain.png',
      snipX: 42,
      snipY: 10,
      snipWidth: 16,
      snipHeight: 16
    }
  ],
  gold: [
    {
      src: 'minecraft_terrain.png',
      snipX: 26,
      snipY: 10,
      snipWidth: 16,
      snipHeight: 16
    },
    {
      src: 'minecraft_terrain.png',
      snipX: 26,
      snipY: 42,
      snipWidth: 16,
      snipHeight: 16
    },
    {
      src: 'minecraft_terrain.png',
      snipX: 10,
      snipY: 42,
      snipWidth: 16,
      snipHeight: 16
    },
    {
      src: 'minecraft_terrain.png',
      snipX: 26,
      snipY: 42,
      snipWidth: 16,
      snipHeight: 16
    }
  ],
  background: [
    {
      src: 'minecraft_environment.png',
      snipX: 10,
      snipY: 10,
      snipWidth: 160,
      snipHeight: 160
    }
  ],
  mech: [
    {
      src: 'Ganbare_Goemon_3_mech.png',
      snipX: 9,
      snipY: 105,
      snipWidth: 32,
      snipHeight: 32,
    },
    {
      src: 'Ganbare_Goemon_3_mech.png',
      snipX: 51,
      snipY: 105,
      snipWidth: 32,
      snipHeight: 32,
    },
    {
      src: 'Ganbare_Goemon_3_mech.png',
      snipX: 96,
      snipY: 105,
      snipWidth: 32,
      snipHeight: 32,
    },
    {
      src: 'Ganbare_Goemon_3_mech.png',
      snipX: 138,
      snipY: 105,
      snipWidth: 32,
      snipHeight: 32,
    },
    {
      src: 'Ganbare_Goemon_3_mech.png',
      snipX: 178,
      snipY: 105,
      snipWidth: 32,
      snipHeight: 32,
    },
    {
      src: 'Ganbare_Goemon_3_mech.png',
      snipX: 218,
      snipY: 105,
      snipWidth: 32,
      snipHeight: 32,
    },
    {
      src: 'Ganbare_Goemon_3_mech.png',
      snipX: 263,
      snipY: 105,
      snipWidth: 32,
      snipHeight: 32,
    },
    {
      src: 'Ganbare_Goemon_3_mech.png',
      snipX: 309,
      snipY: 105,
      snipWidth: 32,
      snipHeight: 32,
    }
  ]
};
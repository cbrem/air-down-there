/* constructor for the Block class. Frames are made of Blocks. */
function Block(type) {
  assert(type in Block.types, "Block constructor given bad type " + type);

  /* create a block with all the properties listed for the given type */
  var properties = Block.types[type];
  for (property in properties) {
    if (property === "imgName") {
      var name = properties["imgName"];
      this.img = Images[name];
    } else {
      this[property] = properties[property];
    }
  }
}

Block.mixins = {
  "nothing": function () {},
  "draw": function (ctx, x, y) {
    ctx.drawImage(this.img, x, y, this.img.width, this.img.height);
  },
}

Block.types = {
  "stone": {
    "draw": Block.mixins.draw,
    "onCollide": Block.mixins.nothing,
    "imgName": "mage"
  },
  "lava": {
    "draw": Block.mixins.draw,
    "onCollide": Block.mixins.nothing,
    "imgName": "spaceman"
  },
  "water": {
    "draw": Block.mixins.draw,
    "onCollide": Block.mixins.nothing,
    "imgName": "earth"
  }
}

Block.randomBlock = function () {
  var types = Object.keys(Block.types); //will not work on legacy browsers
  var randType = Random.choice(types);
  return new Block(randType);
}

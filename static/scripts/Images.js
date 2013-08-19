var Images = {};

/* Preload all images. */
Images.preload = function (callback) {
    Images.preloadOne(0, callback);
};

/* Preload one image, set onload for the next. */
Images.preloadOne = function(index, callback) {
  if (index >= Images.DATA.length) {
    callback();
    return;
  }
    
  // As soon as this image loads, begin loading the next one.
  var nextData = Images.DATA[index];
  var nextImg = new Image();
  for (var property in nextData) {
    nextImg[property] = nextData[property];
  }
  nextImg.onload = function () {
    Images.preloadOne(index + 1, callback);
  };
  Images[nextData.name] = nextImg;
};

/* Data about all images to be preloaded. */
// TODO: change this into a class? maybe SpriteImage?
Images.DATA = [
  {
    name: "stone",
    src: "images/minecraft_terrain.png",
    snipX: 10,
    snipY: 10,
    snipWidth: 16,
    snipHeight: 16
  },
  {
    name: "dirt",
    src: "images/minecraft_terrain.png",
    snipX: 42,
    snipY: 10,
    snipWidth: 16,
    snipHeight: 16
  },
  {
    name: "background",
    src: "images/minecraft_environment.png",
    snipX: 10,
    snipY: 10,
    snipWidth: 160,
    snipHeight: 160
  }
];

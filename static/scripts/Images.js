// TODO: this is loading sprite sheets multiple times. This defeats the purpose
// of using sprites. 

var Images = {};

/* Preload all images. */
Images.preload = function (callback) {
    var srcs = Object.keys(Images.IMAGES);
    Images.preloadOne(srcs, callback);
};

/* Preload one image, set onload for the next. */
Images.preloadOne = function(srcs, callback) {
  if (srcs.length === 0) {
    callback();
    return;
  }
    
  // As soon as this image loads, begin loading the next one.
  var nextSrc = srcs.shift();
  var nextImg = Images.IMAGES[nextSrc];
  nextImg.src = Images.ROOT + nextSrc;
  nextImg.onload = function() {
    Images.preloadOne(srcs, callback);
  };
};

/* String which must be prepended to image filenames to get full paths. */
Images.ROOT = 'images/';

/* Pairs from image sources to the images associated with these filenames. */
Images.IMAGES = {
  'minecraft_terrain.png': new Image(),
  'minecraft_environment.png': new Image(),
  'Ganbare_Goemon_3_mech.png': new Image(),
};

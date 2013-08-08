var Images = {
  /* preload all images */
  "preload": function (callback) {
    Images.preloadOne(0, callback);
  },
  /* preload one image, set onload for the next */
  "preloadOne": function (index, callback) {
    if (index >= Images.data.length) {
      callback();
      return;
    }
    
    /* as soon as this image loads, begin loading the next one */
    var nextData = Images.data[index];
    var nextImg = new Image();
    for (property in nextData) {
      nextImg[property] = nextData[property];
    }
    nextImg.onload = function () {
      Images.preloadOne(index + 1, callback);
    };
    Images[nextData.name] = nextImg;
  },
  /* data about all images to be preloaded. */
  "data": [
    {
      "name": "mage",
      "src": "images/mage.png",
      "width": 50,
      "height": 50,
    },
    {
      "name": "spaceman",
      "src": "images/spaceman.png",
      "width": 50,
      "height": 50,
    },
    {
      "name": "earth",
      "src": "images/earth.png",
      "width": 50,
      "height": 50,
    }
  ]
};


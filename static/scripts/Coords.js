/* Static methods for transforming between coordinate systems. */
var Coords = {};

/* Gets pixel coordinates for the point directly at the center of a Frame. */
Coords.getFramePixelCenter = function() {
  return new Pair(Frame.COLS * Block.SIDE / 2, Frame.ROWS * Block.SIDE / 2);
};

/*
 * Gets the indices in the Environment of the Frame which contains the given
 * pixel coordinates (measured relative to the upper-left corner of the origin
 * Frame).
 *
 * Params:
 *   - pixels: The pixel coordinates, as an (x, y) Pair.
 */
Coords.envIndicesFromEnvPixels = function(pixels) {
  var col = Math.floor(pixels.x / (Frame.COLS * Block.SIDE));
  var row = Math.floor(pixels.y / (Frame.ROWS * Block.SIDE));
  return new Pair(col, row);
};

/*
 * Gets the pixel location of a point within the Frame in which that point
 * falls (measured relative to the upper-left corner of the Frame).
 *
 * Params:
 *   - pixels: The pixel coordinates, as an (x, y) Pair.
 */
Coords.framePixelsFromEnvPixels = function(pixels) {
  var envIndices = Coords.envIndicesFromEnvPixels(pixels);
  var frameUpperLeft = Coords.envPixelsFromEnvIndices(envIndices);
  return Pair.sub(pixels, frameUpperLeft);
};

/*
 * Gets the pixel coordinates (relative to the upper-left corner of the origin
 * Frame) of the upper-left corner of the Frame at the given indices in the
 * Environment.
 *
 * Params:
 *   - indices: The Frame's location in the Environment, as a (col, row) pair.
 */
Coords.envPixelsFromEnvIndices = function(indices) {
  var col = indices.x;
  var row = indices.y;
  var x = col * Frame.COLS * Block.SIDE;
  var y = row * Frame.ROWS * Block.SIDE;
  return new Pair(x, y);
};

/*
 * Gets the indices of the Block in a Frame which contains the point at given
 * pixel coordinates (measured relative to that Frame's upper-left corner).
 *
 * Params:
 *   - pixels: The pixel coordinates, as an (x, y) Pair.
 */
Coords.frameIndicesFromFramePixels = function(pixels) {
  var col = Math.floor(pixels.x / Block.SIDE);
  var row = Math.floor(pixels.y / Block.SIDE);
  return new Pair(col, row);
};

/*
 * Given the indices in the Environment of a point's Frame and that point's 
 * pixel coordinates within that Frame, gets the point's pixel coordinates
 * relative to the Environment's origin,
 *
 * Params:
 *   - indices: A (col, row) Pair giving the point's Frame's location in the
 *       Environment.
 *   - pixels: An (x, y) Pair giving the point's pixel coordinates within its
 *       Frame.
 */
Coords.envPixelsFromEnvIndicesAndFramePixels = function(indices, pixels) {
  return Pair.add(Coords.envPixelsFromEnvIndices(indices), pixels);
};

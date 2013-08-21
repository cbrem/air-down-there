/*
 * Constructor for the TunnelPoint class. A TunnelPoint is a struct which stores
 * information about the location and direction of a tunnel at a point along its
 * length.
 *
 * Params:
 *   - location: The pixel location of the TunnelPoint relative to the upper-left
 *       corner of its own Frame.
 *   - direction: The direction in which the tunnel is traveling at the
 *       TunnelPoint.
 */
function TunnelPoint(location, direction) {
  this.location = location;
  this.direction = direction;
}

/*
 * Creates a TunnelPoint with a random direction and a random location within
 * the Frame.
 */
TunnelPoint.randomTunnelPoint = function() {
  var location = new Pair(Random.integer(0, Frame.COLS * Block.SIDE),
      Random.integer(0, Frame.ROWS * Block.SIDE));
  var direction = Random.real(0, 2 * Math.PI);
  return new TunnelPoint(location, direction);
};

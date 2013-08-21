/* Constructor for the Pair class. A Pair has x and y properties and can be
 * added, subtracted, etc. */
function Pair(x, y) {
  this.x = x;
  this.y = y;
}

/*
 * Adds two pairs together. Will not affect original pairs.
 *
 * Params:
 *  - pair1
 *  - pair2
 */
Pair.add = function(pair1, pair2) {
  Asserts.assert(pair1 !== undefined && pair2 !== undefined,
      Strings.format('Pair.add received pairs %s and %s.', pair1, pair2));
  return new Pair(pair1.x + pair2.x, pair1.y + pair2.y);
};

/*
 * Subtracts one pair from another. Will not affect original pairs.
 *
 * Params:
 *  - pair1: The pair to subtract from.
 *  - pair2: The pair to subtract.
 */
Pair.sub = function(pair1, pair2) {
  Asserts.assert(pair1 !== undefined && pair2 !== undefined,
      Strings.format('Pair.add received pairs %s and %s.', pair1, pair2));
  return new Pair(pair1.x - pair2.x, pair1.y - pair2.y);
};

/*
 * Multiplies a pair by a constant. Will not affect original pair.
 *
 * Params:
 *  - pair
 *  - constant
 */
Pair.mult = function(pair, constant) {
  Asserts.assert(pair !== undefined,
      Strings.format('Pair.add received pairs %s.', pair));
  return new Pair(pair.x * constant, pair.y * constant);
};

/*
 * Creates a Pair vector from polar coordinates.
 *
 * Params:
 *   - r: The radius of the vector.
 *   - theta: The direction of the vector.
 */
Pair.fromPolar = function(r, theta) {
  var x = r * Math.cos(theta);
  var y = r * Math.sin(theta);
  return new Pair(x, y);
};

/* Returns a new Pair identical to this one. */
Pair.prototype.clone = function() {
  return new Pair(this.x, this.y); 
};

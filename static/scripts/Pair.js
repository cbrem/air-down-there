// TODO: Other methods? Maybe 'clone'?

/* Constructor for the Pair class. A Pair has x and y properties and can be
 * added, subtracted, etc. */
function Pair(x, y) {
  this.x = x;
  this.y = y;
}

/*
 * Add two pairs together. Will not affect original pairs.
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
 * Subtract one pair from another. Will not affect original pairs.
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
 * Multiply a pair by a constant. Will not affect original pair.
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


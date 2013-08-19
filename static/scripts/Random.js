// TODO: better comments in this file.

var Random = {};

/* Generates a random integer between hi (exclusive) and lo (inclusive). */
Random.integer = function(lo, hi) {
  Asserts.assert(lo < hi, "Random.integer given lo >= hi.")

  var range = hi - lo;
  var offset = Math.floor(Math.random() * range);

  // In case Math.random() somehow returns 1.0.
  if (offset === range) {
    return Random.integer(lo, hi);
  } else {
    return lo + offset;
  }
};

/* Randomly chooses an element from a given array. */
Random.choice = function(choices) {
  var index = Random.integer(0, choices.length);
  return choices[index];
};

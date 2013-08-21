// TODO: better comments in this file.

var Random = {};

/* Generates a random real two bounds.
 *
 * Params:
 *   - lo: lower bound (inclusive)
 *   - hi: upper bound (inclusive)
 */
Random.real = function(lo, hi) {
  Asserts.assert(lo <= hi, "Random.real given lo > hi.")
  var range = hi - lo;
  var offset = Math.random() * range;
  return lo + offset;
};

/*
 * Generates a random integer between two bounds.
 *
 * Params:
 *   - lo: lower bound (inclusive)
 *   - hi: upper bound (exclusive)
 */
Random.integer = function(lo, hi) {
  Asserts.assert(lo < hi, "Random.integer given lo >= hi.");
  var real = Random.real(lo, hi);
  if (real === hi) {
    // Random.real returned the maximum value. This is unlikely/impossible.
    // Just try again.
    return Random.integer(lo, hi);
  } else {
    return Math.floor(real);
  }
};

/*
 * Randomly chooses an element from a given array.
 *
 * Params:
 *   - choices: An array of elements to choose from.
 */
Random.choice = function(choices) {
  var index = Random.integer(0, choices.length);
  return choices[index];
};

/*
 * Returns true with the given probability, false otherwise.
 *
 * Params:
 *   - chance: The probablity that this method will return true. Must be between
 *       0 and 1, inclusive.
 */
Random.chance = function(chance) {
  Asserts.assert(0 <= chance && chance <= 1,
      Strings.format('Random.chance got chance = %s. Must be between 0 and 1.',
          chance));
  return Math.random() <= chance;
};

/* Returns either true or false with equal probablility. */
Random.equalChange = function() {
  return Random.chance(0.5);
};

/*
 * Returns a number between two bounds, biased towards lo.
 *
 * Params:
 *   - lo: lower bound (inclusive)
 *   - hi: upper bound (inclusive)
 */
Random.loBiasedReal = function(lo, hi) {
  Asserts.assert(lo <= hi, "Random.lowBiasedReal given lo > hi.")
  var range = hi - lo;
  var offset = Math.pow(Math.random() * Math.sqrt(range), 2);
  return lo + offset;
};

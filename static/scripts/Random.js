var Random = {
  /* generate a random integer between hi (exclusive) and lo (inclusive) */
  "integer": function (lo, hi) {
    assert(lo < hi, "Random.integer given lo >= hi.")

    var range = hi - lo;
    var offset = Math.floor(Math.random() * range);

    /* in case Math.random() somehow returns 1.0 */
    if (offset === range) {
      return Random.integer(lo, hi);
    } else {
      return lo + offset;
    }
  },
  /* randomly choose an element from a given array */
  "choice": function (choices) {
    var index = Random.integer(0, choices.length);
    return choices[index];
  }
}

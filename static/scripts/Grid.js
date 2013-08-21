/* Constructor for the Grid data structure.
 * 
 * A Grid stores values at locations addressed by (col, row) Pairs, where col
 * and row may be negative.
 */
function Grid() {
  this.rows_ = {};	
};

/*
 * Gets the value stored in the Grid at the given indices. Returns undefined if
 * there is no value at these indices.
 *
 * Params:
 *   - indices: A (col, row) Pair.
 */
Grid.prototype.get = function(indices) {
  var col = indices.x;
	var row = indices.y;

	if (this.rows_[row] === undefined) {
		return undefined;
	}
	return this.rows_[row][col];
};

/*
 * Stores a value in the Grid at given indices.
 *
 * Params:
 *   - indices: A (col, row) Pair given the location where the value should be
 *       stored.
 */
Grid.prototype.set = function(indices, value) {
	var col = indices.x;
  var row = indices.y;

  if (this.rows_[row] === undefined) {
    this.rows_[row] = {};
  }
  this.rows_[row][col] = value;
};
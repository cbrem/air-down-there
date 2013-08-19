/*
 * Constructor for the StickySet data structure. Users can add() and remove()
 * keys from the StickySet. However, keys removed with remove() only leave the
 * StickySet after clear() is called.
 */
function StickySet() {
  // A map from keys in the set to a boolean which is true if they were removed
  // since the last call to clear(), false otherwise.
  this.map_ = {};
}

/*
 * Adds a key to the StickySet.
 *
 * Params:
 *   - key
 */
StickySet.prototype.add = function(key) {
  this.map_[key] = false;
};

/*
 * Stages a key in the StickySet for removal. It will be removed the next time
 * that clear() is called.
 *
 * Params:
 *   - key
 */
StickySet.prototype.remove = function(key) {
  this.map_[key] = true;
};

/* Deletes all keys staged for removal with remove() from the StickySet. */
StickySet.prototype.clear = function() {
  for (var key in this.map_) {
    var wasRemoved = this.map_[key];
    if (wasRemoved) {
      delete this.map_[key];
    }
  }
};

/* Returns an Array of all keys from the StickySet. */
StickySet.prototype.toArray = function() {
  var keys = [];
  var i = 0; 
  for (var key in this.map_) {
    keys[i++] = key;
  }
  return keys;
};

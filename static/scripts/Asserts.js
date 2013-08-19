/* Utility methods for failing if the app reaches an invalid state. */
var Asserts = {};

/* Asserts will only throw errors if this value is set to true. */
Asserts.DEBUG = false;

/* 
 * Throw an error if a condition is not true.
 *
 * Params:
 *  - cond: The condition which must be true. This must be a boolean.
 *  - err: A message for the error to throw if the condition is false.
 */
Asserts.assert = function(cond, err) {
  if (Asserts.DEBUG) {
	if (cond === false) 	{
	  Asserts.fail(err);
	} else if (cond !== true) {
	  Asserts.fail(
	      Strings.format('Asserts.assert got nonboolean condition: %s.', cond));
	}
  }
};

/*
 * Throw an error.
 *
 * Params:
 *  - err: The error message to use.
 */
Asserts.fail = function(err) {
  if (Asserts.DEBUG) {
  	throw new Error(err);
  }
};

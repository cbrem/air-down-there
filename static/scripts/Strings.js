/*
 * Utility methods for strings.
 *
 * TODO: use regex for Strings.format?
 */
var Strings = {};

/*
 * Insert parameters into a format string.
 *
 * Params:
 *  - formatString: the string into which we will insert parameters.
 *      Any '%s' will be replaced with a parameter.
 *  - ...: the parameters to insert. Each parameter will be encoded as JSON
 *      before insertion.
 */
Strings.format = function(formatString) {
  // Isolate all formatting parameters, and start at counter to track which
  // parameter to insert next.
  var parameters = Array.prototype.slice.call(arguments);
  parameters.shift();
  var paramIndex = 0;

  var resultString = '';
  for (var i = 0; i < formatString.length; i++) {
    var character = formatString[i];
    if (character === '%') {
      // Found either a '%%' or a '%s'.
      i++;
      var nextCharacter = formatString[i];
      if (nextCharacter === 's') {
        // Insert a format parameter.
        var parameter = parameters[paramIndex++];
        resultString += JSON.stringify(parameter);
      } else if (nextCharacter === '%') {
        // We found an escaped '%', so add it to the result string.
        resultString += '%';
      } else {
        // We found an invalid character after a '%'.
        Asserts.fail(
            Strings.format('Strings.format got invalid format string %s.',
                formatString));
      }
    } else {
      // Found a normal character.
      resultString += character;
    }
  }

  if (parameters.length !== paramIndex) {
    // Note that we just use Asserts.assert with a formatted string here, as
    // this would cause infinite recursion.
    Asserts.fail(Strings.format('String.format got %s parameters but used %s.',
        parameters.length, paramIndex));
  }
  return resultString;
};


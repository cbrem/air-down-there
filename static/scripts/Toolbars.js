/*
 * Constructor for the Toolbars class. A Toolbars object provides information
 * about a Game's state to users via the .
 */
function Toolbars() {
  // TODO
}


/* ID of the div which contains the top toolbar. */
Toolbars.TOP_TOOLBAR_DIV = 'top-toolbar';

/* ID of the div which contains the bottom toolbar. */
Toolbars.BOTTOM_TOOLBAR_DIV = 'bottom-toolbar';

/* Refresh the DOM toolbars. */
Toolbars.prototype.draw = function() {
  this.drawTopToolbar_();
  this.drawBottomToolbar_();
};

Toolbars.prototype.drawTopToolbar_ = function() {
  // TODO
  var $topToolbar = $('#' + Toolbars.TOP_TOOLBAR_DIV);
  $topToolbar.html('This is the top toolbar.');
};

Toolbars.prototype.drawBottomToolbar_ = function() {
  // TODO
  // TODO: can I start a variable name with a $?

  var $bottomToolbar = $('#' + Toolbars.BOTTOM_TOOLBAR_DIV);
  $bottomToolbar.html('This is the bottom toolbar.');
};

/*
 * Takes the action within the Toolbars object corresponding to a given key
 * code, if any.
 * 
 * Params:
 *   - keyCode
 */
Toolbars.prototype.respondToPress = function(keyCode) {
  // TODO
};
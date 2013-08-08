/*
 * Constructor for the Game class. A Game is the top-level class. When its
 * constructor is called, we create and run a new Game.
 */
function Game() {
  var $canvas = $('#canvas');
  var ctx = $canvas[0].getContext('2d');

  // Map from the keycodes of currently pressed keys to true.
  this.presses_ = {};

  this.environment_ = new Environment(ctx);
  this.player_ = new Player(ctx);

  this.initListeners_();
  this.initKeyResponses_();
}

/* Time between cycles, in ms. */
Game.CYCLE_LENGTH = 100;

/* Refreshes the Game's model and view. */ 
Game.prototype.cycle = function() {
  this.processPresses_();
  this.draw_();

  setTimeout(function() {
    this.cycle();
  }.bind(this), Game.CYCLE_LENGTH);
};

/* Main draw method. */
Game.prototype.draw_ = function() {
  this.environment_.draw(this.loc);
  this.player_.draw(this.loc);
};

/* Initializes all event listeners. */
Game.prototype.initListeners_ = function() {
  // If a key is pressed, add it to this.presses_.
  // TODO: is this the right syntax?
  $.on('keyPressed', function(e) {
    var keyCode = e.code;
    this.presses_[keyCode] = true;
  }.bind(this));

  // If a key is released, remove it from this.presses_.
  $.on('keyReleased', function(e) {
    var keyCode = e.code;
    delete this.presses_[keyCode];
  }.bind(this));
};

/* Leaves a currently running game. */
Game.prototype.leave_ = function() {
  // TODO: unbind event listeners, etc.
  // TODO: is this the right syntax?
  $.off('keyPressed');
  $.off('keyReleased');
};

/*
 * Initializes a map from keycodes which the top-level Game class cares about
 * to functions which should be called if the keys with these keycodes are
 * pressed.
 */
Game.prototype.initKeyResponses_ = function() {
  this.keyResponses_ = {
    // TODO
  };
};

/* Synchronously acts on every key that is current pressed. */
Game.prototype.processPresses_ = function() {
  for (var keyCode in this.presses_) {
    if (keyCode in this.player_.keyResponses) {
      this.player_.keyResponses[keyCode]();
    } else {
      // TODO
    }
  }
};

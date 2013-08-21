// TODO: how do we lead into the Game from the splash screen? maybe make a
// seperate object?

/*
 * Constructor for the Game class. A Game is the top-level object which runs
 * "Air Down There" for a user.
 */
function Game() {
  var $canvas = $('#canvas');
  this.ctx_ = $canvas[0].getContext('2d');

  // Set of the key codes of keys that are currently pressed or released within
  // the most recent timestep.
  this.keyCodes_ = new StickySet();

  // Offset between the current and initial positions of the canvas's upper-left
  // corner.
  this.upperLeft_ = new Pair(0, 0);

  this.paused_ = false;
  this.shouldQuit_ = false;
  this.toolbars_ = new Toolbars(this.ctx_);
}

/* Time between cycles, in ms. */
Game.CYCLE_LENGTH = 0;

/*
 * Begins running the Game, and peforms modifications which affect the entire
 * DOM (e.g. binding events to handlers).
 */
Game.prototype.init = function() {
  this.initListeners_();
  this.loadGame_();

  // Begin the first cycle.
  this.cycle_();
};

/* Leaves a currently running game. */
Game.prototype.quit_ = function() {
  // TODO: save scores, etc.
  // TODO: should these be bound to document or window?
  $(document).off('keydown');
  $(document).off('keyup');
};

/* Refreshes the Game's model and view. */ 
Game.prototype.cycle_ = function() {
  this.processPresses_();
  if (!this.paused_) {
    this.updateModel_();
  }
  this.draw_();

  if (this.shouldQuit_) {
    // Quit the game if necessary.
    this.quit_();
  } else {
    // Otherwise, keep the game running.
    setTimeout(function() {
        this.cycle_();
    }.bind(this), Game.CYCLE_LENGTH);
  }
};

/* 
 * Attempts to fetch and load information about the last Game's Environment and
 * Player. If no information exists, loads default information.
 */
Game.prototype.loadGame_ = function() {
  // TODO: actually try and fetch old player and environment
  this.player_ = new Player(this.ctx_);
  this.environment_ = new Environment(this.ctx_);
};

/* Update the Game's internal representation of its state. */
Game.prototype.updateModel_ = function() {
  // TODO: maybe upgrade this so that the player can drift to the side of the
  // screen when it gets too high, etc.
  this.upperLeft_ =
      Pair.sub(this.player_.location, Coords.getFramePixelCenter());
  this.environment_.addFrames(this.upperLeft_);
};

/* Main draw method. */
Game.prototype.draw_ = function() {
  // Clear everything.
  // TODO: make this less hard-coded?
  this.ctx_.clearRect(0, 0, 640, 400);

  this.environment_.draw(this.upperLeft_);
  this.player_.draw();
  this.toolbars_.draw();
};

/* Initializes all event listeners. */
Game.prototype.initListeners_ = function() {
  // TODO: should these be bound to document or window?

  // If a key is pressed, add it to this.keyCodes_.
  $(document).on('keydown', function(e) {
    var keyCode = e.which;
    this.keyCodes_.add(keyCode);
  }.bind(this));

  // If a key is released, remove it from this.keyCodes_.
  $(document).on('keyup', function(e) {
    var keyCode = e.which;
    this.keyCodes_.remove(keyCode);
  }.bind(this));
};

/*
 * Takes the action within the Game object corresponding to a given key code, if
 * any.
 * 
 * Params:
 *   - keyCode
 */
Game.prototype.respondToPress = function(keyCode) {
  switch (keyCode) {
    case 32:  // space
    case 80:  // 'p'
      this.paused_ = !this.paused_;
      return;
    case 27:  // escape
    case 81:  // 'q'
      this.confirmQuit_();
      return;
  }
};

/* Synchronously acts on every key that is currently pressed. */
Game.prototype.processPresses_ = function() {
  var keyCodeArray = this.keyCodes_.toArray();  
  for (var i = 0; i < keyCodeArray.length; i++) {
    var keyCode = keyCodeArray[i];
    this.respondToPress(keyCode);
    this.player_.respondToPress(keyCode);
    this.toolbars_.respondToPress(keyCode);
  }
  this.keyCodes_.clear();
};

/* Asks the user to confirm a desire to quit. */
Game.prototype.confirmQuit_ = function() {
  if (prompt('Do you really want to quit?')) {
    this.shouldQuit_ = true;
  }
};

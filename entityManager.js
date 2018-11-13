/** Entity manager for Bomberman **/

"use strict";

var entityManager = {

  // PRIVATE DATA

  _player: [],
  _bomb: [],
  _pickup: [],
  _enemy: [],

  // PRIVATE METHODS

  generatePlayer: function (descr) {
    this._player.push(new Player(descr));
  },

  generateEnemy: function (descr) {
    this._enemy.push(new Enemy(descr));
  },

  generateBomb: function (cx, cy) {
    this._bomb.push(new Bomb({
      cx: cx,
      cy: cy
    }));
  },

  generatePickup: function (cx, cy) {
    this._pickup.push(new Entity());
  },

  _forEachOf: function (aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
      fn.call(aCategory[i]);
    }
  },

  // PUBLIC METHODS

  // A special return value, used by other objects,
  // to request the blessed release of death!

  KILL_ME_NOW: -1,

  // Some things must be deferred until after initial construction
  // i.e. thing which need `this` to be defined.
  //
  deferredSetup: function () {
    this._categories = [this._player, this._bomb, this._enemy];
  },

  init: function () {
    this.generatePlayer();
    this.generateEnemy();
  },

  update: function (du) {

    // Update player entities
    for (var i = 0; i < this._player.length; i++) {
      this._player[i].update(du);
    }

    // Update enemy entities
    for (var i = 0; i < this._enemy.length; i++) {
      this._enemy[i].update(du);
    }

    // Update bomb entities
    for (var i = 0; i < this._bomb.length; i++) {
      var status = this._bomb[i].update(du);

      if (status === this.KILL_ME_NOW) {
        this._bomb.splice(i, 1);
      }
    }
  },

  render: function (ctx) {
    // Render player entities
    for (var i = 0; i < this._player.length; i++) {
      this._player[i].render(ctx);
    }

    // Render enemy entities
    for (var i = 0; i < this._enemy.length; i++) {
      this._enemy[i].render(ctx);
    }

    // Render bomb entities
    for (var i = 0; i < this._bomb.length; i++) {
      var bomb = this._bomb[i];
      bomb.render(ctx);
    }

  },

};

entityManager.deferredSetup();
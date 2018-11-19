/** Entity manager for Bomberman **/

"use strict";

var entityManager = {

  // PRIVATE DATA

  _start: [],
  _player: [],
  _bomb: [],
  _pickup: [],
  _enemy: [],

  _startGame: false,

  // PRIVATE METHODS

  generateStart: function (descr) {
    this._start.push(new Start(descr));
  },

  generatePlayer: function (descr) {
    this._player.push(new Player(descr));
  },

  generateEnemy: function (descr) {
    this._enemy.push(new Enemy(descr));
  },

  generateBomb: function (cx, cy, range, owner) {
    for (let i = 0; i < this._bomb.length; i++) {
      if (this._bomb[i].cx === cx && this._bomb[i].cy === cy) {
        console.log(`cant place bomb, tile occupied`);
        return false;
      }
    }
    let bomb = new Bomb({
      cx: cx,
      cy: cy,
      range: range,
      owner: owner
    });
    bomb.owner.addBomb();
    this._bomb.push(bomb);
    return true;
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
    this.generateStart();
    this.generatePlayer();
    this.generateEnemy();
  },

  gameStart: function () {
    this._startGame = !this._startGame;
    g_sounds.playSelect2();
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
    // Render start entities
    this._start[0].render(ctx);

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
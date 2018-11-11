/** Entity manager for Bomberman **/

"use strict";

var entityManager = {

    // PRIVATE DATA

    _player : [],
    _bomb : [],

    // PRIVATE METHODS

    _generatePlayer : function () {
        this.generatePlayer();
    },

    generateBomb : function (cx, cy) {
        this._bomb.push(new Bomb({
            cx : cx,
            cy : cy
        }));
    },

    _forEachOf: function (aCategory, fn) {
        for (var i = 0; i < aCategory.length; ++i) {
            fn.call(aCategory[i]);
        }
    },

    // PUBLIC METHODS

    // A special return value, used by other objects,
    // to request the blessed release of death!

    KILL_ME_NOW : -1,
    
    // Some things must be deferred until after initial construction
    // i.e. thing which need `this` to be defined.
    //
    deferredSetup : function () {
        this._categories = [this._player, this._bomb];
    },

    init: function() {
        this._generatePlayer();
    },

    generatePlayer : function (descr) {
        this._player.push(new Player(descr));
    },

    update : function(du) {

        for (var i = 0; i < this._player.length; i++) {
            this._player[i].update(du);
        }
        
        for (var i = 0; i < this._bomb.length; i++) {
            var status = this._bomb[i].update(du);
            
            if(status ===  this.KILL_ME_NOW) {
                this._bomb.splice(i, 1);
            }
        }
    },

    render : function(ctx) {
        for (var i = 0; i < this._player.length; i++) {
            this._player[i].render(ctx);
        }
        
        for (var i = 0; i < this._bomb.length; i++) {
            var bomb = this._bomb[i];
            bomb.render(ctx);
        }
        
    },

    camera: function(ctx) {
        var pl = this._player[0];
        ctx.save();
        ctx.translate(-pl.cx+g_canvas.width/2,-pl.cy+g_canvas.height/2);
    }

};

entityManager.deferredSetup();
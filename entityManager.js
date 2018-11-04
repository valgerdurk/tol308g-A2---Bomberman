/** Entity manager for Bomberman **/

"use strict";

var entityManager = {

    _player : [],
    _bomb : [],

    generatePlayer : function (descr) {
        this._player.push(new Player(descr));
    },

    generateBomb : function (cx, cy) {
        this._bomb.push(new Bomb({
            cx : cx,
            cy : cy
        }));
    },

    // PUBLIC METHODS

    // A special return value, used by other objects,
    // to request the blessed release of death!

    KILL_ME_NOW : -1,

    init : function() {
        this.generatePlayer();
    },

    update : function(du) {
        this._player[0].update(du); // Since we only have one player for now
        this.generatePlayer();
        
        for (var i = 0; i < this._bomb.length; i++) {
            var status = this._bomb[i].update(du);
            
            if(status ===  this.KILL_ME_NOW) {
                this._bomb.splice(i, 1);
            }
        }
    },

    render : function(ctx) {
        this._player[0].render(ctx);
        
        for (var i = 0; i < this._bomb.length; i++) {
            var bomb = this._bomb[i];
            bomb.render(ctx);
        }
        
    },

};
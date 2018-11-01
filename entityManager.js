/** Entity manager for Bomberman **/

"use strict";

var entityManager = {

    _player : [], 

    generatePlayer : function (descr) {
        this._player.push(new Player(descr));
    },

    init : function() {
        this.generatePlayer();
    },

    update : function(du) {
        this._player[0].update(du); // Since we only have one player for now
        this.generatePlayer();
    },

    render : function(ctx) {
        this._player[0].render(ctx);
    },

}
/** Game menu stuff **/

"use strict";

// We use generic contructor which accepts an arbitrary descriptor object 
function Game(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

     // Sprites
    this.sprite = this.sprite 
    || g_sprites[55]
    || g_sprites[56]
    || g_sprites[57];
};

Game.prototype = new Entity();

// Initial values
Game.prototype.cx = 320;
Game.prototype.cy = 320;

Game.prototype.KEY_RESTART = '\r\n'.charCodeAt(0);
Game.prototype.KEY_WIN = 'L'.charCodeAt(0);

Game.prototype.render = function (ctx) {
    if(eatKey(this.KEY_WIN)){
        g_winGame = !g_winGame;
    }

        if(g_isUpdatePaused){ 
            this.sprite = g_sprites[55]
            this.sprite.drawCentredAt(ctx,this.cx,this.cy);
        }
        if(g_winGame){
            g_sounds.playWin();
            this.sprite = g_sprites[57]
            this.sprite.drawCentredAt(ctx,this.cx,this.cy);
            if(eatKey(this.KEY_RESTART)){
                g_sounds.playSelect2();

                //Slight delay on the restart so the select sound can play.
                var delayInMilliseconds = 300;
                setTimeout(function() {
                    document.location.reload(true);
                }, 
                delayInMilliseconds);
               
        }
    }
};
/** Start menu stuff **/

"use strict";

// We use generic contructor which accepts an arbitrary descriptor object 
function Start(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

     // Sprites
    this.sprite = this.sprite 
    || g_sprites[43]
    || g_sprites[44];
};

Start.prototype = new Entity();


// Initial values
Start.prototype.cx = 320;
Start.prototype.cy = 320;

// Menu keys
Start.prototype.KEY_UP = 'W'.charCodeAt(0);
Start.prototype.KEY_DOWN = 'S'.charCodeAt(0);


Start.prototype.render = function (ctx) {
if(entityManager._startGame == false){
    if(eatKey(this.KEY_DOWN)){
        util.playSelect();
        this.sprite = g_sprites[44]
    }
    if(eatKey(this.KEY_UP)){ 
        util.playSelect();
        this.sprite = g_sprites[43]
    }
}

    // An if statement to prevent drawing of the menu sprite in the background.
    if(!entityManager._startGame){
        this.sprite.drawCentredAt(ctx,this.cx,this.cy);
    }
};
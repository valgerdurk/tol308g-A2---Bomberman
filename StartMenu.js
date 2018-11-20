/** Start menu stuff **/

"use strict";

// We use generic contructor which accepts an arbitrary descriptor object 
function Start(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

     // Sprites
    this.sprite = this.sprite 
    || g_sprites[43]
    || g_sprites[44]
    || g_sprites[54];
};

Start.prototype = new Entity();

//Flag variable
Start.prototype.return = false;

// Initial values
Start.prototype.cx = 320;
Start.prototype.cy = 320;

// Menu keys
Start.prototype.KEY_UP = 'W'.charCodeAt(0);
Start.prototype.KEY_DOWN = 'S'.charCodeAt(0);
Start.prototype.KEY_ENTER = '\r\n'.charCodeAt(0);
Start.prototype.KEY_PAUSE = 'P'.charCodeAt(0);

Start.prototype.render = function (ctx) {

//An if statement to disable the menu keys once a game has been started. 
if(entityManager._startGame == false){
    if(eatKey(this.KEY_DOWN)){
        g_sounds.playSelect();
        this.sprite = g_sprites[44]
        entityManager._selection = true;
    }
    if(eatKey(this.KEY_UP)){ 
        g_sounds.playSelect();
        entityManager._selection = false;
        this.sprite = g_sprites[43]
    }
    //Return is a flag so you can return to the main menu using the enter key from the versus mode.
    if(this.return == false){ 
        if(entityManager._selection == true){
            if(eatKey(this.KEY_ENTER)){
                g_sounds.playSelect2();
                this.sprite = g_sprites[54]
                this.return = !this.return;
            }
        } 
    }
    //Return is a flag so you can return to the main menu using the enter key from the versus mode.
    if(this.return == true){
        if(eatKey(this.KEY_ENTER)){
            g_sounds.playSelect2();
            this.sprite = g_sprites[44]
            this.return = !this.return;
        }
    }
}

    // An if statement to prevent drawing of the menu sprite in the background.
    if(!entityManager._startGame){
        this.sprite.drawCentredAt(ctx,this.cx,this.cy);
       }   
};
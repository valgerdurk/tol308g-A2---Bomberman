/** Player stuff **/

"use strict";

// We use generic contructor which accepts an arbitrary descriptor object 
// So it's possible to create more players if needed
function Player(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Sprites
    this.sprite = this.sprite 
    || g_sprites.playerRight 
    || g_sprites.playerRightStep
    || g_sprites.playerLeft
    || g_sprites.playerLeftStep
    || g_sprites.playerBack
    || g_sprites.playerBackStep
    || g_sprites.playerFront
    || g_sprites.playerFrontStep;

};

Player.prototype = new Entity();

// Movement keys
Player.prototype.KEY_LEFT = 'A'.charCodeAt(0);
Player.prototype.KEY_RIGHT = 'D'.charCodeAt(0);
Player.prototype.KEY_UP = 'W'.charCodeAt(0);
Player.prototype.KEY_DOWN = 'S'.charCodeAt(0);

// Drop bomb key
Player.prototype.KEY_DROP_BOMB = ' '.charCodeAt();

// Initial values
Player.prototype.cx = 100;
Player.prototype.cy = 100;

// Interval for steps when player walks
// The sprite is changed every 150 ms so it appears he is walking
var stepInterval = setInterval(setStep, 150);
var g_step;

function setStep() {
    g_step = g_step == true ? false : true;
}

Player.prototype.update = function () {

    // Movement stuff 
    // The Player changes sprites depending on the direction he is going 

    if (keys[this.KEY_LEFT]) {
        if (g_step) {
            this.sprite = g_sprites.playerLeftStep;
        } else if (!g_step) {
            this.sprite = g_sprites.playerLeft;
        }
        this.cx -= 4;
    }

    if(keys[this.KEY_RIGHT]) {
        if (g_step) {
            this.sprite = g_sprites.playerRightStep;
        } else if (!g_step) {
            this.sprite = g_sprites.playerRight;
        }
        this.cx += 4;
    }
    
    if(keys[this.KEY_UP]) {
        if (g_step) {
            this.sprite = g_sprites.playerBackStep;
        } else if (!g_step) {
            this.sprite = g_sprites.playerBack;
        }
        this.cy -= 4;
    }

    if(keys[this.KEY_DOWN]) {
        if (g_step) {
            this.sprite = g_sprites.playerFrontStep;
        } else if (!g_step) {
            this.sprite = g_sprites.playerFront;
        }
        this.cy += 4;
    }
};

Player.prototype.render = function (ctx) {

    this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};
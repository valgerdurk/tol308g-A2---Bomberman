/** Player stuff **/

"use strict";

// We use generic contructor which accepts an arbitrary descriptor object 
// So it's possible to create more players if needed
function Player(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

     // Sprites
    this.sprite = this.sprite 
    || g_sprites[0]
    || g_sprites[1]
    || g_sprites[2]
    || g_sprites[3]
    || g_sprites[4]
    || g_sprites[5]
    || g_sprites[6]
    || g_sprites[7];
};

Player.prototype = new Entity();

// Movement keys
Player.prototype.KEY_RIGHT = 'D'.charCodeAt(0);
Player.prototype.KEY_LEFT = 'A'.charCodeAt(0);
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

    if(keys[this.KEY_RIGHT]) {
        if (g_step) {
            this.sprite = g_sprites[0];
        } else if (!g_step) {
            this.sprite = g_sprites[1];
        }
        this.cx += 4;
    }

    if (keys[this.KEY_LEFT]) {
        if (g_step) {
            this.sprite = g_sprites[2];
        } else if (!g_step) {
            this.sprite = g_sprites[3];
        }
        this.cx -= 4;
    }

    if(keys[this.KEY_UP]) {
        if (g_step) {
            this.sprite = g_sprites[4];
        } else if (!g_step) {
            this.sprite = g_sprites[5];
        }
        this.cy -= 4;
    }

    if(keys[this.KEY_DOWN]) {
        if (g_step) {
            this.sprite = g_sprites[6];
        } else if (!g_step) {
            this.sprite = g_sprites[7];
        }
        this.cy += 4;
    }
};

Player.prototype.render = function (ctx) {

    this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};
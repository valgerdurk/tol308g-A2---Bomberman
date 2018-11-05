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

// player step
Player.prototype.step = 4;

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

    //collision check
    
    // Movement stuff
    this.mapCollision();
    this.playerMovement();
    // The Player changes sprites depending on the direction he is going 

    // Drop bomb
    if(eatKey(this.KEY_DROP_BOMB)) {
        entityManager.generateBomb(this.cx, this.cy);
    }
};

Player.prototype.playerMovement = function(){

    if(keys[this.KEY_RIGHT]) {
        if (g_step) {
            this.sprite = g_sprites[0];
        } else if (!g_step) {
            this.sprite = g_sprites[1];
        }
        this.cx += this.step;
    }

    if (keys[this.KEY_LEFT]) {
        if (g_step) {
            this.sprite = g_sprites[2];
        } else if (!g_step) {
            this.sprite = g_sprites[3];
        }
        this.cx -= this.step;
    }

    if(keys[this.KEY_UP]) {
        if (g_step) {
            this.sprite = g_sprites[4];
        } else if (!g_step) {
            this.sprite = g_sprites[5];
        }
        this.cy -= this.step;
    }

    if(keys[this.KEY_DOWN]) {
        if (g_step) {
            this.sprite = g_sprites[6];
        } else if (!g_step) {
            this.sprite = g_sprites[7];
        }
        this.cy += this.step;
    }
}

// collision with map objects
Player.prototype.mapCollision = function () {




    //halfwidth and height
    var hw = this.sprite.width/2;
    var hh = this.sprite.height/2;
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    //convert player cords to map cords
    var prevMapX = Math.floor(prevX / 64);
    var prevMapY = Math.floor(prevY / 64);
    //next stuff
    var nextX = this.cx+this.step+hw;
    var nextY = this.cy+this.step+hh;
    //convert player cords to map cords
    var nextMapX = Math.floor(nextX / 64);
    var nextMapY = Math.floor(nextY / 64);
    //player checked against map
    var nextPos = g_map.mapTiles[nextMapX][nextMapY];
    //collision with map objects
    if(nextPos === 1) {
        console.log("collision");
        return true;
    }else{
        return false;
    }
    //if(g_map.collidesWith(prevX,prevY,nextX,nextY))
    // Bounce off top and bottom edges
    /*
    if (nextY < 64+hh)
    this.cy += 4;
    if(nextY > g_canvas.height-64-hh)
    this.cy -= 4;

    // bounce off left and right
    // relics from scoreboard maybe use again
    if (nextX < 64+hw) {
    this.cx += 4;
    }
    if(nextX > g_canvas.width-64-hw){
    this.cx -= 4;
    }
    */
};

Player.prototype.render = function (ctx) {

    this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};
/** Player stuff **/

"use strict";

// We use generic contructor which accepts an arbitrary descriptor object 
// So it's possible to create more players if needed
function Player(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  // Sprites
  this.sprite = this.sprite ||
    g_sprites[0] ||
    g_sprites[1] ||
    g_sprites[2] ||
    g_sprites[3] ||
    g_sprites[4] ||
    g_sprites[5] ||
    g_sprites[6] ||
    g_sprites[7];

  this.nextSprite = g_playerExplOffset;
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

Player.prototype.update = function (du) {

  // Unregister
  spatialManager.unregister(this);

  // Kill (Remove) if is dead
  if (this._isDeadNow) {
    return entityManager.KILL_ME_NOW;
  }

  //collision check
  this.mapCollision();

  // Movement stuff
  this.playerMovement(du);

  // Drop bomb
  if (eatKey(this.KEY_DROP_BOMB)) {
    var placeInGrid = g_map.tileMapLocation(this.cx, this.cy);
    var findCenter = g_map.tileCenter(placeInGrid.row, placeInGrid.column);
    entityManager.generateBomb(findCenter.x, findCenter.y);
    //console.log(placeInGrid);
    //console.log(g_map.tileCenter(placeInGrid.row, placeInGrid.column));
  }

  // (Re-) register
  spatialManager.register(this);
};

Player.prototype.getRadius = function () {
  return 20;
};

Player.prototype.playerMovement = function (du) {

  // The Player changes sprites depending on the direction he is going 
  if (keys[this.KEY_RIGHT]) {
    if (g_step) {
      this.sprite = g_sprites[0];
    } else if (!g_step) {
      this.sprite = g_sprites[1];
    }
    this.cx += this.step*du;
    if (this.mapCollision())
      this.cx -= this.step*du;
  }

  if (keys[this.KEY_LEFT]) {
    if (g_step) {
      this.sprite = g_sprites[2];
    } else if (!g_step) {
      this.sprite = g_sprites[3];
    }
    this.cx -= this.step*du;
    if (this.mapCollision())
      this.cx += this.step*du;
  }

  if (keys[this.KEY_UP]) {
    if (g_step) {
      this.sprite = g_sprites[4];
    } else if (!g_step) {
      this.sprite = g_sprites[5];
    }
    this.cy -= this.step*du;
    if (this.mapCollision())
      this.cy += this.step*du;
  }

  if (keys[this.KEY_DOWN]) {
    if (g_step) {
      this.sprite = g_sprites[6];
    } else if (!g_step) {
      this.sprite = g_sprites[7];
    }
    this.cy += this.step*du;
    if (this.mapCollision())
      this.cy -= this.step*du;
  }
};

//create bounding around sprite, takes in player
//x,y cords and halfwith/halfheight
//and returns an array x,y map cords
Player.prototype.bounding = function (ax, dx, wy, sy, sw, sh) {

  //messy can probably done in a more efficent and tidy way
  //shift xy of sprite by height and width

  var topLeftX = Math.floor((ax - (sw / 2)) / 64);
  var topLeftY = Math.floor((wy - (sh / 2)) / 64);
  //shift x by width
  var botLeftX = Math.floor((ax - (sw / 2)) / 64);
  var botLeftY = Math.floor((sy + (sh / 2)) / 64);
  // shift x and y bu
  var botRightX = Math.floor((dx + (sw / 2)) / 64);
  var botRightY = Math.floor((sy + (sh / 2)) / 64);
  //shift y by height
  var topRightX = Math.floor((dx + (sw / 2)) / 64);
  var topRightY = Math.floor((wy - (sh / 2)) / 64);

  var topL = [topLeftX, topLeftY];
  var botL = [botLeftX, botLeftY];
  var botR = [botRightX, botRightY];
  var topR = [topRightX, topRightY];

  var boundingBox = [topL, topR, botR, botL];
  // this is the x and y cords of the sprite's corners
  // they are used to check the map array
  return boundingBox;

};

// collision with map objects
Player.prototype.mapCollision = function () {

  //Remember previous position
  var prevX = this.cx;
  var prevY = this.cy;
  //next stuff
  var nextXA = this.cx - this.step; //move right
  var nextXD = this.cx + this.step; //move left
  var nextYW = this.cy - 5; //move up
  var nextYS = this.cy + 5; //move down
  // original next
  var nextX = this.cx;
  var nextY = this.cy;
  //width and height
  var width = this.sprite.width;
  var height = this.sprite.height;
  //get bounding vectors
  //var playerBound = this.bounding(nextX,nextY,width,height);
  var playerBound = this.bounding(nextXA, nextXD, nextYW, nextYS, width, height);
  //cycle through the bounding values and compare with map coords
  for (var x = 0; x < playerBound.length; x++) {
    //get the x'th vector of the bounding values
    var nPos = playerBound[x];

    for (var y = 0; y < nPos.length; y++) {
      //grab the value from maptiles
      var nextPos = g_map.tilePassable(nPos[1], nPos[0]);
      //check if position is a key
      g_map.collectKey(nPos[1], nPos[0]);
      //console.log(nextPos +":"+ nPos[x] +":"+ nPos[y]);
      //if (nextPos === 1 || nextPos === 2 || nextPos === 4) {
      if (!nextPos) {
        //console.log(x + "'th vector collision");
        return true;
      }
    }
  }

};



// Player collision with explosion

// Player explosion lifespan
Player.prototype.ctdTimer = (500 / NOMINAL_UPDATE_INTERVAL);
Player.prototype.playerExplTime = (1500 / NOMINAL_UPDATE_INTERVAL);
Player.prototype.explTimer = Player.prototype.playerExplTime;

Player.prototype.takeExplosionHit = function (du) {

  this.ctdTimer -= du;

  if (this.ctdTimer < 0) {
    this.explTimer -= du;
    this.sprite = g_sprites[this.nextSprite];

    this.nextSprite = g_playerExplOffset + (Math.floor(g_playerExplSprites -
        this.explTimer / this.playerExplTime * g_playerExplSprites) %
      g_playerExplSprites);
  }

  if (this.explTimer <= 0) {
    this.kill();
  }

  //this.newLife();

};

// Resets the player and starts a new life
Player.prototype.newLife = function () {

}

Player.prototype.render = function (ctx) {

  this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};
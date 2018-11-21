/** Player stuff **/

"use strict";

var g_scale = 1;

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

//Interact with gate
Player.prototype.KEY_USE = 'E'.charCodeAt(0);

 // Select answer
Player.prototype.KEY_ONE = '1'.charCodeAt(0);
Player.prototype.KEY_TWO = '2'.charCodeAt(0);
Player.prototype.KEY_THREE = '3'.charCodeAt(0);
Player.prototype.KEY_FOUR = '4'.charCodeAt(0);

// player step
Player.prototype.step = 4;

// Initial values
Player.prototype.cx;
Player.prototype.cy;

 // Player explosion lifespan
Player.prototype.ctdTimer = (500 / NOMINAL_UPDATE_INTERVAL);
Player.prototype.playerExplTime = (1500 / NOMINAL_UPDATE_INTERVAL);
Player.prototype.explTimer = Player.prototype.playerExplTime;
Player.prototype.isDying = false;

// Sound
//Player.prototype.bombTime = new Audio("Sound effects/bombtime.mp3");

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
    if (this._ownedBombsCount < this._maxBombCount) {
      var placeInGrid = g_map.tileMapLocation(this.cx, this.cy);
      var findCenter = g_map.tileCenter(placeInGrid.row, placeInGrid.column);
      entityManager.generateBomb(findCenter.x, findCenter.y, 1, this);
      g_sounds.playFuse();
    }
  }

  // Handle death
  if(this.isDying) {
    this.step = 0;
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
      this.newLife();
      this.isDying = false;
    }

  }

   if(eatKey(this.KEY_USE)){
    this.checkGate(this.cx,this.cy);
  }

  // Let the enemy know of my position
  Enemy.prototype.setPlayerX(this.cx);
  Enemy.prototype.setPlayerY(this.cy);

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
    this.cx += this.step * du;
    if (this.mapCollision())
      this.cx -= this.step * du;
  }

  if (keys[this.KEY_LEFT]) {
    if (g_step) {
      this.sprite = g_sprites[2];
    } else if (!g_step) {
      this.sprite = g_sprites[3];
    }
    this.cx -= this.step * du;
    if (this.mapCollision())
      this.cx += this.step * du;
  }

  if (keys[this.KEY_UP]) {
    if (g_step) {
      this.sprite = g_sprites[4];
    } else if (!g_step) {
      this.sprite = g_sprites[5];
    }
    this.cy -= this.step * du;
    if (this.mapCollision())
      this.cy += this.step * du;
  }

  if (keys[this.KEY_DOWN]) {
    if (g_step) {
      this.sprite = g_sprites[6];
    } else if (!g_step) {
      this.sprite = g_sprites[7];
    }
    this.cy += this.step * du;
    if (this.mapCollision())
      this.cy -= this.step * du;
  }
};

//create bounding around sprite, takes in player
//x,y cords and halfwith/halfheight
//and returns an array x,y map cords
Player.prototype.bounding = function (ax, dx, wy, sy, sw, sh) {

  //messy can probably done in a more efficent and tidy way
  //shift xy of sprite by height and width

  var topLeftX = Math.floor((ax - sw) / 64);
  var topLeftY = Math.floor((wy - sh) / 64);
  //shift x by width
  var botLeftX = Math.floor((ax - sw) / 64);
  var botLeftY = Math.floor((sy + sh) / 64);
  // shift x and y bu
  var botRightX = Math.floor((dx + sw) / 64);
  var botRightY = Math.floor((sy + sh) / 64);
  //shift y by height
  var topRightX = Math.floor((dx + sw) / 64);
  var topRightY = Math.floor((wy - sh) / 64);

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
  var nextYW = this.cy - 6; //move up
  var nextYS = this.cy + 6; //move down
  // original next
  var nextX = this.cx;
  var nextY = this.cy;
  //width and height
  var width = this.sprite.width/2;
  var height = this.sprite.height/2;
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
      if (!nextPos) {
        return true;
      }
    }
  }

};

Player.prototype.takeExplosionHit = function () {
  this.isDying = true;
  g_lives -= 1;
};

// Resets the player and starts a new life
Player.prototype.newLife = function () {
  if (g_lives >= 0) {
    entityManager.generatePlayer(this.cx, this.cy);
    console.log("Now there are " + g_lives + " lives left");
  } else {
    console.log("Game over");
  }
};

Player.prototype.render = function (ctx) {

  this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};


// controles the number
Player.prototype._ownedBombsCount = 0;
Player.prototype._maxBombCount = 3;

// increases the number of bombs a player owns
Player.prototype.addBomb = function () {
  if (this._ownedBombsCount >= this._maxBombCount) {
    // returns false if there are to many bombs
    return false;
  }
  this._ownedBombsCount++;
  return true;
};

// decreses the number of bombs a player owns
Player.prototype.removeBomb = function () {
  if (this._ownedBombsCount <= 0) {
    // returns false if there are no bombs
    return false;
  }
  this._ownedBombsCount--;
  return true;
};

// get the number of owned bombs
Player.prototype.getOwnedBombsCount = function () {
  return this._ownedBombsCount;
};

// sets the number of owned bombs
Player.prototype.setMaxBombCount = function (count) {
  this._maxBombCount = count;
  return this._maxBombCount;
};

// decreses the number of owned bombs
Player.prototype.getMaxBombCount = function () {
  return this._maxBombCount;
};

// increments the number of bombs a player can have by 'incrAmount'
// 'incrAmount' cen be negative to decrement
Player.prototype.incrMaxBombCount = function (incrAmount) {
  if (incrAmount === undefined)
    incrAmount = 1;
  this._maxBombCount = this._maxBombCount + incrAmount;
  return this._maxBombCount;
};

Player.prototype.getFourDirections = function (x,y) {
  var tileUP = g_map.mapTiles[x][y-1];
  var tileLEFT = g_map.mapTiles[x-1][y];
  var tileRIGHT = g_map.mapTiles[x+1][y];
  var tileDOWN = g_map.mapTiles[x][y+1];
  return {
    up: tileUP,
    down: tileDOWN,
    left: tileLEFT,
    right: tileRIGHT,
  }
};


 Player.prototype.checkGate = function (x,y) {
  var ps = g_map.tileMapLocation(x,y);
  var dir = this.getFourDirections(ps.row,ps.column);
  //check if interactable
   if(dir.up === 3){
     g_map.mapTiles[ps.row][ps.column-1] = 0;
  }
   if(dir.down === 3){
    g_map.mapTiles[ps.row][ps.column+1] = 0;
  }
     
  if(dir.left === 3) {
    g_map.mapTiles[ps.row-1][ps.column] = 0;
  }
     
  if(dir.right === 3) {
    g_map.mapTiles[ps.row+1][ps.column] = 0;
    g_sounds.playDamage();
  }

 };
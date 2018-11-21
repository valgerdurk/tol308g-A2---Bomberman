/** Enemy **/ 

/** A pac-man ghost like enemy that goes around the map
* Player is killed on collision with it
* Can be blown up with bomb
*/

"use strict";

// We use generic contructor which accepts an arbitrary descriptor object 
// So it's possible to create more players if needed
function Enemy(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
  
    // Sprites 
    this.sprite = this.sprite || g_sprites[g_playerSprites];

    this.nextSprite = g_enemyExplOffset;
};
  
Enemy.prototype = new Entity();

// Initial values
Enemy.prototype.cx = 100;
Enemy.prototype.cy = 860;

Enemy.prototype.ctdTimer = (500 / NOMINAL_UPDATE_INTERVAL);
Enemy.prototype.enemyExplTime = (1500 / NOMINAL_UPDATE_INTERVAL);
Enemy.prototype.explTimer = Enemy.prototype.enemyExplTime;
Enemy.prototype.isDying = false;

Enemy.prototype.update = function (du) {
    // Unregister
    spatialManager.unregister(this);
  
    // Kill (Remove) if is dead
    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }
  
    // Movement stuff
    this.path(du);

     // Handle death
    if(this.isDying) {
        this.xVel = 0;
        this.yVel = 0;
        this.ctdTimer -= du;

        if (this.ctdTimer < 0) {
            this.explTimer -= du;
            this.sprite = g_sprites[this.nextSprite];

            this.nextSprite = g_enemyExplOffset + (Math.floor(g_enemyExplSprites -
                this.explTimer / this.enemyExplTime * g_enemyExplSprites) %
                g_enemyExplSprites);
        }

        if (this.explTimer <= 0) {
            this.kill();
            //this.isDying = false;
        }
    }

    // Handle collisions with player
    /*var _hitEntities = this.findHitEntities(this.range);
    if (_hitEntities != []) {
      for (var i = 0; i < _hitEntities.length; i++) {
        var hitEntity = _hitEntities[i];
        var canTakeHit = hitEntity.takeExplosionHit;
        if (canTakeHit) {
          canTakeHit.call(hitEntity, du)
          // Stop if player is hit
          this.xVel = 0;
          this.yVel = 0;
        }
      }
    }*/
    
    // (Re-) register
    spatialManager.register(this);
};

// Initial velocity
Enemy.prototype.xVel = 4;
Enemy.prototype.yVel = 4;

// Player position
Enemy.prototype.playerX;
Enemy.prototype.playerY;

// Interval stuff for direction changes in path
var verticalSwitchInterval = setInterval(setStep, 1100);
var verticalSwitch;

var horizontalSwitchInterval = setInterval(setHorizontalStep, 2200);
var horizontalSwitch;

var ultimateSwitchInterval = setInterval(setUltimateStep, 4400);
var ultimateSwitch;

function setStep() {
    verticalSwitch = verticalSwitch == true ? false : true;
} 

function setHorizontalStep() {
    horizontalSwitch = horizontalSwitch == true ? false : true;
}

function setUltimateStep() {
    ultimateSwitch = ultimateSwitch == true ? false : true;
}

// Set player position
// Updated in Player update routine
Enemy.prototype.setPlayerX = function(xPos) {
    this.playerX = xPos;
}

Enemy.prototype.setPlayerY = function(yPos) {
    this.playerY = yPos;
}

// The enemy path 
Enemy.prototype.path = function (du) {

    var halfWidth = g_map.tileWidth*35 / 2;
    var enemyRange = 300; // To-do: Follow player when in range?

    // To-do: Stop if collides with player 
    // Blow up if collides with bombs

    if (ultimateSwitch) {
        if (horizontalSwitch) {
            if (verticalSwitch) {
                // Left
                this.cx -= this.xVel*du;
            } else if (!verticalSwitch) {
                // Right
                this.cx += this.xVel*du;
            } 
            if (this.mapCollision()) {
                // On map collision - go back
                if (verticalSwitch) {
                    this.cx += this.xVel*du;
                } else if (!verticalSwitch) {
                    this.cx -= this.xVel*du;
                }
            }

        } else if (!horizontalSwitch) {
            if (verticalSwitch) {
                // Up
                this.cy -= this.yVel*du;
            } else if (!verticalSwitch) {
                // Down
                this.cy += this.yVel*du;
            } 
            if (this.mapCollision()) {
                // On map collision - go back
                if (verticalSwitch) {
                    this.cy += this.yVel*du;
                } else if (!verticalSwitch) {
                    this.cy -= this.yVel*du;
                }
            }
        }

    } else if (!ultimateSwitch) {
        if (horizontalSwitch) {
            if (verticalSwitch) {
                // Down
                this.cy += this.yVel*du;
            } else if (!verticalSwitch) {
                // Up
                this.cy -= this.yVel*du;
            } 
            if (this.mapCollision()) {
                // On map collision - go back
                if (verticalSwitch) {
                    this.cy -= this.yVel*du;
                } else if (!verticalSwitch) {
                    this.cy += this.yVel*du;
                }
            }

        } else if (!horizontalSwitch) {
            if (verticalSwitch) {
                // Right
                this.cx += this.xVel*du;
            } else if (!verticalSwitch) {
                // Left
                this.cx -= this.xVel*du;
            } 
            if (this.mapCollision()) {
                // On map collision - go back
                if (verticalSwitch) {
                    this.cx -= this.xVel*du;
                } else if (!verticalSwitch) {
                    this.cx += this.xVel*du;
                }
            }
        }
    }
        
    /*if (this.mapCollision()) {
        this.isColliding = true;
    }
        if (this.mapCollision() && rand <= 0.25) {
            console.log("hit a wall, going down");
            this.cy += this.yVel*du;
        } 
        
        if (this.mapCollision() && rand <= 0.5 && rand > 0.25) {
            console.log("hit a wall, going right");
            this.cx += this.xVel*du;
        } 
        
        if (this.mapCollision() && rand <= 0.75 && rand > 0.5) {
            console.log("hit a wall, going up");
            this.cy -= this.yVel*du;
        } 
        
        if (this.mapCollision() && rand <= 1 && rand > 0.75) {
            console.log("hit a wall, going left");
            this.cx -= this.xVel*du; 
        }*/
    
};

//create bounding around sprite, takes in sprite
//x,y cords and halfwith/halfheight
//and returns an array x,y map cords
Enemy.prototype.bounding = function (ax, dx, wy, sy, sw, sh) {

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
  Enemy.prototype.mapCollision = function () {
  
    //Remember previous position
    var prevX = this.cx;
    var prevY = this.cy;
    //next stuff
    var nextXA = this.cx - this.xVel; //move right
    var nextXD = this.cx + this.xVel; //move left
    var nextYW = this.cy - this.yVel; //move up         
    var nextYS = this.cy + this.yVel; //move down       
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

        // Enemy does not collect pick-ups

        //check if position is a key 
        //g_map.collectKey(nPos[1], nPos[0]); 
        //console.log(nextPos +":"+ nPos[x] +":"+ nPos[y]);
        //if (nextPos === 1 || nextPos === 2 || nextPos === 4) {
        if (!nextPos) {
          //console.log(x + "'th vector collision");
          return true;
        }
      }
    }
  
  };

Enemy.prototype.getRadius = function () {
    return 17;
};

// Enemy collision with explosion
Enemy.prototype.takeExplosionHit = function () {
    this.isDying = true;
    console.log("enemy killed");
};

Enemy.prototype.render = function (ctx) {

    this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};
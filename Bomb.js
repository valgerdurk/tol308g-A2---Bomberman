//========
// Bomb
//========

"use strict";

function Bomb(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  this.sprite = g_sprites[g_playerSprites + g_enemySprites];
  this.nextSprite = g_playerSprites + g_enemySprites + 1;

  this.scale = this.scale || 1;
};

Bomb.prototype = new Entity();

// Initial, inheritable, default values
Bomb.prototype.cx;
Bomb.prototype.cy;
Bomb.prototype.range = 1;

// lifespan of explosion
Bomb.prototype.ctdTimer = (2000 / NOMINAL_UPDATE_INTERVAL);
Bomb.prototype.explosionTime = (2000 / NOMINAL_UPDATE_INTERVAL);
Bomb.prototype.soundTimer = (100 / NOMINAL_UPDATE_INTERVAL);
Bomb.prototype.explTimer = Bomb.prototype.explosionTime;
Bomb.prototype.exploded = false;

// Sound
Bomb.prototype.bombExplosion = new Audio("Sound effects/bombexplosion.mp3");

Bomb.prototype.update = function (du) {

  // Unregister
  spatialManager.unregister(this);

  // Draw explosion
  this.ctdTimer -= du;

  if (this.ctdTimer < 0) {

    this.soundTimer -= du;
    if (this.soundTimer > 0) {
      this.bombExplosion.play();
    }

    this.explTimer -= du;
    this.sprite = g_sprites[this.nextSprite];
    this.nextSprite = g_explOffset + (Math.floor(
      g_explSprites - this.explTimer / this.explosionTime * g_explSprites
    ) % g_explSprites);


    // events inside here will only haoen ONCE when the bomb explodes
    if (!this.exploded) {

      // Handle collisions with the explosion
      var _hitEntities = this.findHitEntities(this.range);
      if (_hitEntities != []) {
        //todo add findHitEntities
        for (var i = 0; i < _hitEntities.length; i++) {
          var hitEntity = _hitEntities[i];
          var canTakeHit = hitEntity.takeExplosionHit;
          if (canTakeHit) {
            canTakeHit.call(hitEntity, du)
          }
        }
      }

      console.log(`bombEXPLODE- x: ${this.cx}, y: ${this.cy}`);
      var placeInGrid = g_map.tileMapLocation(this.cy, this.cx);

      //todo add animation to afected squares
      //todo decide where range is selected
      g_map.breakBlocks(placeInGrid, this.range);

      this.owner.removeBomb();

      this.exploded = true;
    }
  }

  if (this.explTimer <= 0) {
    return entityManager.KILL_ME_NOW;
  }

  // (Re-) register
  spatialManager.register(this);
};

Bomb.prototype.takeExplosionHit = function () {
  this.ctdTimer = 0;
}

Bomb.prototype.render = function (ctx) {
  var placeInGrid = g_map.tileMapLocation(this.cx, this.cy);
  for (var i = 0; i <= this.range; i++) {
    if (this.ctdTimer <= 0) {
      var findCenterUp = g_map.tileCenter(placeInGrid.row + i, placeInGrid.column);
      this.sprite.drawCentredAt(ctx, findCenterUp.x, findCenterUp.y);
    }
    if (this.ctdTimer <= 0) {
      var findCenterLeft = g_map.tileCenter(placeInGrid.row, placeInGrid.column - i);
      this.sprite.drawCentredAt(ctx, findCenterLeft.x, findCenterLeft.y);
    }
    if (this.ctdTimer <= 0) {
      var findCenterRight = g_map.tileCenter(placeInGrid.row, placeInGrid.column + i);
      this.sprite.drawCentredAt(ctx, findCenterRight.x, findCenterRight.y);
    }
    if (this.ctdTimer <= 0) {
      var findCenterDown = g_map.tileCenter(placeInGrid.row - i, placeInGrid.column);
      this.sprite.drawCentredAt(ctx, findCenterDown.x, findCenterDown.y);
    }
  }
  this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};
/** AI enemy **/ 

"use strict";

// We use generic contructor which accepts an arbitrary descriptor object 
// So it's possible to create more players if needed
function Enemy(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
  
    // Sprites
    this.sprite = this.sprite || g_sprites[g_playerSprites];
};
  
Enemy.prototype = new Entity();

// Initial values
Enemy.prototype.cx = 610;
Enemy.prototype.cy = 610;

Enemy.prototype.update = function (du) {

    // Unregister
    spatialManager.unregister(this);
  
    // Kill (Remove) if is dead
    if (this._isDeadNow) {
      return entityManager.KILL_ME_NOW;
    }
  
    //collision check
    //this.mapCollision();
  
    // Movement stuff
    this.path();
  
    // (Re-) register
    spatialManager.register(this);
};

Enemy.prototype.path = function () {

};



Enemy.prototype.render = function (ctx) {

    this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};
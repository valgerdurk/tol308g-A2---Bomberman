<<<<<<< HEAD
/** Entity manager for Bomberman **/

"use strict";

var entityManager = {

    // PRIVATE DATA

    _player : [],
    _bomb : [],

    // PRIVATE METHODS

    _generatePlayer : function () {
        this.generatePlayer();
    },

    generateBomb : function (cx, cy) {
        this._bomb.push(new Bomb({
            cx : cx,
            cy : cy
        }));
    },

    _forEachOf: function (aCategory, fn) {
        for (var i = 0; i < aCategory.length; ++i) {
            fn.call(aCategory[i]);
        }
    },

    // PUBLIC METHODS

    // A special return value, used by other objects,
    // to request the blessed release of death!

    KILL_ME_NOW : -1,
    
    // Some things must be deferred until after initial construction
    // i.e. thing which need `this` to be defined.
    //
    deferredSetup : function () {
        this._categories = [this._player, this._bomb];
    },

    init: function() {
        this._generatePlayer();
    },

    generatePlayer : function (descr) {
        this._player.push(new Player(descr));
    },

    update : function(du) {

        for (var i = 0; i < this._player.length; i++) {
            this._player[i].update(du);
        }
        
        for (var i = 0; i < this._bomb.length; i++) {
            var status = this._bomb[i].update(du);
            
            if(status ===  this.KILL_ME_NOW) {
                this._bomb.splice(i, 1);
            }
        }
    },

    render : function(ctx) {
        for (var i = 0; i < this._player.length; i++) {
            this._player[i].render(ctx);
        }
        
        for (var i = 0; i < this._bomb.length; i++) {
            var bomb = this._bomb[i];
            bomb.render(ctx);
        }
        
    },

    camera: function(ctx) {
        //grab the player object
        var pl = this._player[0];
        // halfwith of the canvas
        var hw = g_canvas.width/2;
        var hh = g_canvas.height/2;
        // negative player position and halfwidth of canvas
        var xEdge = (-pl.cx+hw);
        var yEdge = (-pl.cy+hh);
        // these prob wont change but now they scale properly
        var Wmargin = (g_map.tileWidth * 3) - g_canvas.width;
        var Hmargin = (g_map.tileHeight * 3) - g_canvas.height;
        ctx.save();
        
        //far left edge of screen
        if(xEdge >= 0){
            //top edge
            if(yEdge >= 0){
                //top left corner 
                //lock both x and y axix
                ctx.translate(0,0);
            }
            else if(yEdge <= Hmargin) {
                // in this case the -448 needs be something else
                //lock in both x and y axis
                ctx.translate(0, Hmargin);
            }
            else {
                //continue moving up or down
                //but lock in x axis
                ctx.translate(0, yEdge);
            }
        } //check other x border
        else if (xEdge <= Wmargin) {
            //far most right edge
            if(yEdge >= 0) {
                //lock x and y axis
                ctx.translate(Wmargin,0);
            }
            else if(yEdge <= Hmargin) {
                //in this case the -448 needs be something else
                //lock in both x and y axis
                ctx.translate(Wmargin, Hmargin);
            } 
            else {
                    //locks in x margin, free y edge
                    ctx.translate(Wmargin, yEdge);
            }
        } // both x borders accounted for, just 2 y borders left
        else {
            if(yEdge >= 0){
                // lock y axix top
                ctx.translate(xEdge, 0);
            } 
            else if (yEdge <= Hmargin) {
                // lock y axix bot
                ctx.translate(xEdge, Hmargin);
            }
            else {
                // all other conditions met, move up n down
                ctx.translate(xEdge, yEdge);
            }
        }
    }
};

=======
/** Entity manager for Bomberman **/

"use strict";

var entityManager = {

  // PRIVATE DATA

  _player: [],
  _bomb: [],
  _pickup: [],

  // PRIVATE METHODS

  _generatePlayer: function () {
    this.generatePlayer();
  },

  generateBomb: function (cx, cy) {
    this._bomb.push(new Bomb({
      cx: cx,
      cy: cy
    }));
  },

  _forEachOf: function (aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
      fn.call(aCategory[i]);
    }
  },

  // PUBLIC METHODS

  // A special return value, used by other objects,
  // to request the blessed release of death!

  KILL_ME_NOW: -1,

  // Some things must be deferred until after initial construction
  // i.e. thing which need `this` to be defined.
  //
  deferredSetup: function () {
    this._categories = [this._player, this._bomb];
  },

  init: function () {
    this._generatePlayer();
  },

  generatePlayer: function (descr) {
    this._player.push(new Player(descr));
  },

  update: function (du) {

    for (var i = 0; i < this._player.length; i++) {
      this._player[i].update(du);
    }

    for (var i = 0; i < this._bomb.length; i++) {
      var status = this._bomb[i].update(du);

      if (status === this.KILL_ME_NOW) {
        this._bomb.splice(i, 1);
      }
    }
  },

  render: function (ctx) {
    for (var i = 0; i < this._player.length; i++) {
      this._player[i].render(ctx);
    }

    for (var i = 0; i < this._bomb.length; i++) {
      var bomb = this._bomb[i];
      bomb.render(ctx);
    }

  },

};

>>>>>>> master
entityManager.deferredSetup();
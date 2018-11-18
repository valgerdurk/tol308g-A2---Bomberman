// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {


  // RANGES
  // ======

  clampRange: function (value, lowBound, highBound) {
    if (value < lowBound) {
      value = lowBound;
    } else if (value > highBound) {
      value = highBound;
    }
    return value;
  },

  wrapRange: function (value, lowBound, highBound) {
    while (value < lowBound) {
      value += (highBound - lowBound);
    }
    while (value > highBound) {
      value -= (highBound - lowBound);
    }
    return value;
  },

  isBetween: function (value, lowBound, highBound) {
    if (value < lowBound) {
      return false;
    }
    if (value > highBound) {
      return false;
    }
    return true;
  },


  // RANDOMNESS
  // ==========

  randRange: function (min, max) {
    return (min + Math.random() * (max - min));
  },


  // MISC
  // ====

  square: function (x) {
    return x * x;
  },


  // DISTANCES
  // =========

  distSq: function (x1, y1, x2, y2) {
    return this.square(x2 - x1) + this.square(y2 - y1);
  },

  wrappedDistSq: function (x1, y1, x2, y2, xWrap, yWrap) {
    var dx = Math.abs(x2 - x1),
      dy = Math.abs(y2 - y1);
    if (dx > xWrap / 2) {
      dx = xWrap - dx;
    };
    if (dy > yWrap / 2) {
      dy = yWrap - dy;
    }
    return this.square(dx) + this.square(dy);
  },


  // CANVAS OPS
  // ==========

  clearCanvas: function (ctx) {
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
  },

  strokeCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  },

  fillCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  },

  fillBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
  },

      //Sound effects
      playSelect: function() {
        var audio = new Audio('Sound effects/select.mp3');
        audio.play();
        },

    playSelect2: function() {
        var audio = new Audio('Sound effects/select2.mp3');
        audio.play();
        },

    playExplosion: function() {
        var audio = new Audio('Sound effects/bombexplosion.mp3');
        audio.play();
        },

    playBurn: function() {
        var audio = new Audio('Sound effects/bombtime.mp3');
        audio.play();
        },

    playBoxBreak: function() {
        var audio = new Audio('Sound effects/boxbreak.mp3');
        audio.play();
        },

    playRockBreak: function() {
        var audio = new Audio('Sound effects/rockbreak.mp3');
        audio.play();
        },
    
    playDamage: function() {
        var audio = new Audio('Sound effects/damage.mp3');
        audio.play();
        },
    
    playSteps: function() {
        var random = [
        'Sound effects/step1.mp3',
        'Sound effects/step2.mp3',
        'Sound effects/step3.mp3',
        'Sound effects/step4.mp3',];
            
        var randomSound = random[Math.floor(Math.random() * random.length)];
        
    var audio = new Audio();
    audio.src = randomSound;
    audio.play();
 }
};
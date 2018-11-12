/** Utility functions **/

"use strict";


var util =  {

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
        var audio = new Audio('https://notendur.hi.is/ema22/tolvuleikjaforritun/sound/Soundeffects2/select.mp3');
        audio.play();
        },

    playSelect2: function() {
        var audio = new Audio('https://notendur.hi.is/ema22/tolvuleikjaforritun/sound/Soundeffects2/select2.mp3');
        audio.play();
        },

    playExplosion: function() {
        var audio = new Audio('https://notendur.hi.is/ema22/tolvuleikjaforritun/sound/Soundeffects2/bombexplosion.mp3');
        audio.play();
        },

    playBurn: function() {
        var audio = new Audio('https://notendur.hi.is/ema22/tolvuleikjaforritun/sound/Soundeffects2/bombtime.mp3');
        audio.play();
        },

    playBoxBreak: function() {
        var audio = new Audio('https://notendur.hi.is/ema22/tolvuleikjaforritun/sound/Soundeffects2/boxbreak.mp3');
        audio.play();
        },

    playRockBreak: function() {
        var audio = new Audio('https://notendur.hi.is/ema22/tolvuleikjaforritun/sound/Soundeffects2/rockbreak.mp3');
        audio.play();
        },
    
    playDamage: function() {
        var audio = new Audio('https://notendur.hi.is/ema22/tolvuleikjaforritun/sound/Soundeffects2/damage.mp3');
        audio.play();
        },
    
    playSteps: function() {
        var random = [
        'https://notendur.hi.is/ema22/tolvuleikjaforritun/sound/Soundeffects2/step1.mp3',
        'https://notendur.hi.is/ema22/tolvuleikjaforritun/sound/Soundeffects2/step2.mp3',
        'https://notendur.hi.is/ema22/tolvuleikjaforritun/sound/Soundeffects2/step3.mp3',
        'https://notendur.hi.is/ema22/tolvuleikjaforritun/sound/Soundeffects2/step4.mp3',];
            
        var randomSound = random[Math.floor(Math.random() * random.length)];
        
    var audio = new Audio();
    audio.src = randomSound;
    audio.play();
}
    
};
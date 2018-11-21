// sounds

var hasPlayed = false;

var g_sounds = {

	// counter for the sounds
	// this assume there are limited quoates
	// and will play in rigid sequence.
	bid:0,
	baneArr: [
	    'Sound effects/Bane/games.mp3',
	    'Sound effects/Bane/incharge.mp3',
	    'Sound effects/Bane/die.wav'
	],
	sid:0,
	sawArr: [
	    'Sound effects/Saw/game_Jigsaw.mp3',
	    'Sound effects/Saw/blood_Jigsaw.mp3',
	    'Sound effects/Saw/alive_Jigsaw.mp3',
	    'Sound effects/Saw/tested_Jigsaw.mp3',
	    'Sound effects/Saw/gameover_Det.mp3'
	],
	vid:0,
	vArr: [
	    'Sound effects/VforVendetta/itstime_Portman.mp3',
	    'Sound effects/VforVendetta/stage_hugo.mp3',
	    'Sound effects/VforVendetta/perfectstage_Hugo.wav',
	    'Sound effects/VforVendetta/serveyouwell_Hugo.wav',
	    'Sound effects/VforVendetta/quiteenough_Portman.mp3'
	],
	gid:0,
	gArr: [
	    'Sound effects/gladiator/alreadydead.mp3',
	    'Sound effects/gladiator/dream.mp3',
	    'Sound effects/gladiator/entertain.mp3',
	    'Sound effects/gladiator/whatwedo.wav'
	],

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

    playFuse: function() {
    	var audio= new Audio("Sound effects/bombtime.mp3");
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
	
	playWin: function() {
		if(!hasPlayed){ 
		var audio = new Audio('Sound effects/win.mp3');		
		audio.play();
		hasPlayed = !hasPlayed;
		}
	},

	playGameOver: function() {
		var audio = new Audio('Sound effects/gameover.mp3');
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
	},

	playBane: function(id){
		if(!id) {
			var baneSound = new Audio(this.baneArr[this.bid]);
			baneSound.play();
			this.bid++;
		} else  {

		}
	},

	playSaw: function(id){
		if(!id) {
			var sawSound = new Audio(this.sawArr[this.sid]);
			sawSound.play();
			this.sid++;
		} else  {
			
		}
	},

	playV: function(id){
		if(!id) {
			var vSound = new Audio(this.vArr[this.vid]);
			vSound.play();
			this.vid++;
		} else  {
			var vSound = new Audio(this.vArr[id]);+
			vSound.play();
		}
	},

	playGlad: function(id){
		if(!id) {
			var gSound = new Audio(this.gArr[this.vid]);
			gSound.play();
			this.vid++;
		} else  {
			var gSound = new Audio(this.gArr[id]);+
			gSound.play();
		}
	}


}

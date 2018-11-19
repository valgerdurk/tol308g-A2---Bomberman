// UI stuff

"use strict";

var g_ui = {

	//variables to be displaed
	_life: "",
	_bomb: "",
	_key1: "",
	_key2: "",
	_key3: "",
	_key4: "",
	_enemies: "",
	_bricks: "",
	_time: "",
	_inMenu: false,
	
	getLife: function() {
		
	},

	getBomb: function(player) {
		this._bomb = player._maxBombCount;
	},

	setFont: function(ctx,font) {
		ctx.font = font;
	},

	turnOn: function() {
		this._inMenu = entityManager._startGame;
	},

	getPlayerPos: function(player){
		var px = player.cx,
			py = player.cy;
		return {
			posX: px,
			posY: py,
		}
	},

	render: function (ctx) {
		//this.turnOn();

		//if(!this._inMenu) return;

		var pl = entityManager._player[0];
		//get player position
		var pos = this.getPlayerPos(pl);
		//get updated variabls
		this.getBomb(pl);
		//set the font
		this.setFont(ctx,"30px Arial");
		//begin drawing
		ctx.fillText("Max bomb! " + this._bomb,
					100,
					50);
	},
};
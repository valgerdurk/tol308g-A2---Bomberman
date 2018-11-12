// general map stuff

//this is a scale-able map generator, just change the maptileX and Y's
/*
var	mapTileWidth = 16,
	mapTileHeight = 16,


	mapWidth = g_canvas.width,
	mapHeight = g_canvas.height,
	// map size in tiles
	mapTilesX = 215,
	mapTilesY = 215,
	
	//var GenMap = new Array(mapTilesX); // create column of in map of x height
	genMap = new Array(mapTilesX);

	for(var i = 0; i < mapTilesX; i++) {
		genMap[i] = new Array(mapTilesY);	// create row in map of y length
		for(var j = 0; j < mapTilesY; j++) {
			// check first and last layer
			// then check second and secnd last layers
			// then you check for odd/even numbers
			// for each condition you throw a value into the array
			if(i == 0 || i == mapTilesX-1)
				genMap[i][j] = 1;
			else if (i == 1 || i == mapTilesX-2)
				if(j == 0 || j == mapTilesX-1)
					genMap[i][j] = 1;
				else
					genMap[i][j] = 0;
			else if (i%2)
				if(j == 0 || j == mapTilesX-1)
					genMap[i][j] = 1;
				else
					genMap[i][j] = 0;
			else
				if(j == 0 || j == mapTilesX-1)
					genMap[i][j] = 1;
				else if (j%2)
					genMap[i][j] = 0;
				else
					genMap[i][j] = 1;
			//GenMap[i][j] = i%2;
		}
	}
	console.dir(genMap);

// note //
// create a randomizer that checks for 0's and replaces with a number
// to create breakable objects or enemies.
*/




var g_map = {
	tileWidth : 64,
	tileHeight : 64,

	mapTiles : [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	],

	colours : [
		"purple", //this one never gets selected
		"grey",
		"yellow",
		"white"
	]
};

g_map.drawRect = function(i, j, color, ctx) {
	var xPos = this.tileWidth*i,
		yPos = this.tileHeight*j,
		width = this.tileWidth,
		height = this.tileHeight;
	//draw rectactle at [i][j] in map array
	ctx.fillStyle = color;
	ctx.fillRect(xPos,yPos,width,height);
};

g_map.update = function(du) {
	//no updates
};

g_map.render = function(ctx) {
	if(entityManager._startGame == true){ 
	var WIDTH = this.tileWidth,
		HEIGHT = this.tileHeight;

	for (var i = 0; i < 17; ++i) {
		for (var j = 0; j < 17; j++){
			var id = this.mapTiles[i][j];
			//if u want to color the 0, condition for (!id)
			if (id) {
				this.drawRect(i,j,this.colours[id],ctx);
			}
		}
	}
}

};
// not actually used right
g_map.collidesWith = function (prevX, prevY, nextX, nextY) {

	var width = this.tileWidth,
		height = this.tileHeight,

		tileX = Math.floor(nextX/width),
		tileY = Math.floor(nextY/height);

		if(!this.mapTiles[tileY]) { return false }
			
		if(this.mapTiles[tileY,tileX]) {
			//hit
			console.log("hit: " + this.mapTiles[tileY,tileX]);
			return true;
		}else {
			//missed
			console.log("missed " + this.mapTiles[tileY,tileX]);
			return false;
		}
}
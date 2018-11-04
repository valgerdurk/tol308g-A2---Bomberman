
/*
var map =
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
	[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

*/
/*
var	mapTileWidth = 16,
	mapTileHeight = 16,


	mapWidth = g_canvas.width,
	mapHeight = g_canvas.height,

	mapTilesX = 15,
	mapTilesY = 15,
	
	//var GenMap = new Array(mapTilesX); // create column of in map of x height
	genMap = new Array(mapTilesX);

	for(var i = 0; i < mapTilesX; i++) {
		genMap[i] = new Array(mapTilesY);	// create row in map of y length
		for(var j = 0; j < mapTilesY; j++) {
			// check first and last layer
			// then check second and secnd last layers
			// then you check for odd/even numbers
			// for each condition you throw a value into the array
			if(i == 0 || i == 14)
				genMap[i][j] = 1;
			else if (i == 1 || i == 13)
				if(j == 0 || j == 14)
					genMap[i][j] = 1;
				else
					genMap[i][j] = 0;
			else if (i%2)
				if(j == 0 || j == 14)
					genMap[i][j] = 1;
				else
					genMap[i][j] = 0;
			else
				if(j == 0 || j == 14)
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


//support function for drawpMap.
function drawRect(i,j,color,ctx) {
	//draw rectactle at [i][j] in map array
	ctx.fillStyle = color;
	ctx.fillRect(i,j,mapWidth,mapHeight);
}


function drawGenMap (ctx) {
	for (var i = 0; i < mapTilesX; i++){
		
		
		for(var j = 0; j < mapTilesY; j++) {
			
			//begin checking map array
			switch(map[i][j]) {
				case 1:
					console.log("drawing unbreakable blocks, grey");
					drawRect(mapWidth*i,mapHeight*j,'grey',ctx);
					break;
				case 2:
					console.log("drawing basic ground blocks, white");
					drawRect(mapWidth*i,mapHeight*j,'white',ctx);
					break;
				case 3:
					console.log("drawing breakable blocks, yellow");
					drawRect(mapWidth*i,mapHeight*j,'yellow',ctx);
					break;
			}
					

		}
	}
}

*/



var g_map = {
	yBase : 80,

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
		"purpe", //this one never gets selected
		"grey",
		"yellow",
		"white"
	]
};

g_map.drawRect = function(i,j,color,ctx) {
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
	var WIDTH = this.tileWidth,
		HEIGHT = this.tileHeight,

		YBASE = this.yBase;

	for (var i = 0; i < 17; ++i) {
		for (var j = 0; j < 17; j++){
			var id = this.mapTiles[i][j];
			//if u want to color the 0, condition for (!id)
			if (id) {
				this.drawRect(i,j,this.colours[id],ctx);
			}
		}
	}

};

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
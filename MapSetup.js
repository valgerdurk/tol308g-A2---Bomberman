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
  tileWidth: 64,
  tileHeight: 64,

  mapTiles: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 4, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 5, 0, 5, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 4, 1, 0, 1, 0, 1, 0, 1],
    [1, 6, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 4, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  //we need to change this into sprites later
  colours: [
    "purple", //this one never gets selected
    "grey", //1
    "yellow", //2
    "white", //3
    "red", //4
    "green",
    "orange",
  ]
};

const g_mapColumns = g_map.mapTiles[0].length;
const g_mapRows = g_map.mapTiles.length;

g_map.drawRect = function (i, j, colour, ctx) {
  var xPos = this.tileWidth * i,
    yPos = this.tileHeight * j,
    width = this.tileWidth,
    height = this.tileHeight;
  //draw rectactle at [i][j] in map array
  ctx.fillStyle = colour;
  ctx.fillRect(xPos, yPos, width, height);
};

g_map.update = function (du) {
  //no updates
};

g_map.render = function (ctx) {
if(entityManager._startGame == true){ 
  var WIDTH = this.tileWidth,
    HEIGHT = this.tileHeight;

  for (var i = 0; i < 17; ++i) {
    for (var j = 0; j < 17; j++) {
      var id = this.mapTiles[i][j];
      //if u want to colour the 0, condition for (!id)
      if (id) {
        this.drawRect(j, i,
          this.tileTypes[id].colour,
          ctx);

      }
    }
  }
}

};

// not actually used right
g_map.collidesWith = function (prevX, prevY, nextX, nextY) {

  var width = this.tileWidth,
    height = this.tileHeight,

    tileX = Math.floor(nextX / width),
    tileY = Math.floor(nextY / height);

  if (!this.mapTiles[tileY]) {
    return false
  }

  if (this.mapTiles[tileY, tileX]) {
    //hit
    console.log("hit: " + this.mapTiles[tileY, tileX]);
    return true;
  } else {
    //missed
    console.log("missed " + this.mapTiles[tileY, tileX]);
    return false;
  }
}

g_map.tileMapLocation = function (x, y) {
  /*
  // Out of bounds calc - do we need this?
  if (x < 0 || x > g_mapColumns * g_map.tileWidth ||
  	y < 0 || y > g_mapRows * g_map.tileHeight) {
  	
  }
  */
  let rowLocation = Math.floor(y / g_map.tileHeight);
  let columnLocation = Math.floor(x / g_map.tileWidth);
  return {
    row: rowLocation,
    column: columnLocation,
  }
};

g_map.tileCenter = function (row, column) {
  /*
  // Out of bounds calc - do we need this?
  if (row < 0 || row > g_mapRows ||
  	column < 0 || column > g_mapColumns) {
  }
  */
  let xPos = column * g_map.tileWidth + g_map.tileWidth / 2;
  let yPos = row * g_map.tileHeight + g_map.tileHeight / 2;
  return {
    x: xPos,
    y: yPos,
  }
};

//todo improve for more tile types
g_map.tilePassable = function (col, row) {
  const tile = this.mapTiles[col][row];
  if (tile === undefined) {
    //console.log("coords: " + col + " " + row);
    // makes sure the player can always get out of a bad situation
    return true;
  }
  return this.tileTypes[tile].passable;
  //return this.nextIn(tile);
};
g_map.breakBlocks = function (loc, range) {
  let r = 0;
  let //todo, find better names
    top = true,
    bottom = true,
    left = true,
    right = true;


  while (r <= range) {
    if (left)
      left = this._breakBlock(loc.column - r, loc.row);
    if (right)
      right = this._breakBlock(loc.column + r, loc.row);
    if (top)
      top = this._breakBlock(loc.column, loc.row - r);
    if (bottom)
      bottom = this._breakBlock(loc.column, loc.row + r);
    r++;
  }
}
g_map._breakBlock = function (col, row) {
  //todo addd bounds
  /*if (col < 0 || col > g_map.length ||
    row < 0 || row > g_map.width) {}*/
  if (this.tileTypes[this.mapTiles[col][row]].breakeable) {
    this.mapTiles[col][row] = 0;
    this.mapTiles[col][row] = 7;
    //todo make posible to take multiple hits
    //var findCenter = this.tileCenter(row, col);
    //entityManager.generatePickup(?);
    //todo spawn object
    // if true the explotion has not stopped, and will continue to the next tile
    return false;
  }
  if (this.tileTypes[this.mapTiles[col][row]].passable) {
    //todo, decide if and how invisable walls / hidden path should block 
    return true;
  }
  return false;

}

//todo decide how to format this
g_map.tileTypes = [{
    id: 0,
    title: 'floor',
    passable: true,
    breakeable: false,
    ineractable: false,
    colour: 'black'
  }, {
    id: 1,
    title: 'wall1',
    passable: false,
    breakeable: false,
    ineractable: false,
    colour: 'grey'
  }, {
    id: 2,
    title: 'wall2',
    passable: false,
    breakeable: false,
    ineractable: false,
    colour: 'yellow'
  }, {
    id: 3,
    title: 'wall3',
    passable: false,
    breakeable: false,
    ineractable: false,
    colour: 'white'
  },
  {
    id: 4,
    title: 'brick',
    passable: false,
    breakeable: true,
    ineractable: false,
    colour: 'red'
  },
  {
    id: 5,
    title: 'hiddenBrick',
    passable: false,
    breakeable: true,
    ineractable: false,
    colour: 'grey'
  },
  {
    id: 6,
    title: 'hiddenPath',
    passable: true,
    breakeable: false,
    ineractable: false,
    colour: 'grey'
  }, {
    id: 7,
    title: 'pickup01',
    passable: true,
    breakeable: false,
    ineractable: false,
    pickup: true,
    colour: 'orange'
  }, {
    id: 8,
    title: 'pickup02',
    passable: true,
    breakeable: false,
    ineractable: false,
    pickup: true,
    colour: 'purple'
  }, {
    id: 9,
    title: 'pickup03',
    passable: true,
    breakeable: false,
    ineractable: false,
    pickup: true,
    colour: 'blue'
  }
];

//map tiles
g_map.passableTileTypes = [1, 2, 3, 4];
g_map.nextIn = function (val) {
  //todo move this
  for (let i = 0; i < this.passableTileTypes.length; i++) {
    if (this.passableTileTypes[i] === val) {
      return true;
    }
  }
  return false;
}
//imagine different sprites for each key

g_map.collectKey = function (col, row) {

  // i think pickups should be an entity
  var tile = this.mapTiles[col][row];
  if (tile === undefined) {
    return false;
  }
  var pickup = this.tileTypes[tile].pickup;
  if (pickup === undefined) {
    return false;
  }
  //return this.tileTypes[tile].passable;
  //console.log(pickup);
  if (pickup) {
    this.mapTiles[col][row] = 0;
    return true;
  }
  return false;

}
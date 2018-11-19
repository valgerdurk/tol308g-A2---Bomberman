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
    [1, 0, 0, 9, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 10, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 12, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
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
  sprites: [
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

g_map.drawSprites = function (id,i,j,ctx) {

  //
  var xPos = this.tileWidth * i,
    yPos = this.tileHeight * j,
    mSprite = g_sprites[id],
    image = mSprite.image,
    width = this.tileWidth,
    height = this.tileHeight;
  ctx.drawImage(image,
                xPos,
                yPos,
                width,
                height);
};


g_map.update = function (du) {
  //no updates
};

g_map.render = function (ctx) {

  for (var i = 0; i < g_mapRows; ++i) {
    for (var j = 0; j < g_mapColumns; j++) {
      var id = this.mapTiles[i][j];
      //if u want to color the 0, condition for (!id)
      if (id) {
        this.drawSprites(this.tileTypes[id].imgID,
          j,i,ctx);
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
    util.playRockBreak();
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
    pickup: false,
    key: false,
    imgID: 50
  }, {
    id: 1,
    title: 'wall1',
    passable: false,
    breakeable: false,
    ineractable: false,
    pickup: false,
    key: false,
    imgID: 49
  }, {
    id: 2,
    title: 'wall2',
    passable: false,
    breakeable: false,
    ineractable: false,
    pickup: false,
    key: false,
    imgID: 2
  }, {
    id: 3,
    title: 'gate',
    passable: false,
    breakeable: false,
    ineractable: true,
    pickup: false,
    key: false,
    imgID: 3
  },
  {
    id: 4,
    title: 'brick',
    passable: false,
    breakeable: true,
    ineractable: false,
    pickup: false,
    key: false,
    imgID: 50
  },
  {
    id: 5,
    title: 'hiddenBrick',
    passable: false,
    breakeable: true,
    ineractable: false,
    pickup: false,
    key: false,
    imgID: 5
  },
  {
    id: 6,
    title: 'hiddenPath',
    passable: true,
    breakeable: false,
    ineractable: false,
    pickup: false,
    key: false,
    imgID: 6
  }, {
    id: 7,
    title: 'pickup01',
    passable: true,
    breakeable: false,
    ineractable: false,
    pickup: true,
    key: false,
    imgID: 7
  }, {
    id: 8,
    title: 'pickup02',
    passable: true,
    breakeable: false,
    ineractable: false,
    pickup: true,
    key: false,
    imgID: 8
  }, {
    id: 9,
    title: 'banemask',
    passable: true,
    breakeable: false,
    ineractable: false,
    pickup: true,
    key: true,
    imgID: 45
  }
  , {
    id: 10,
    title: 'gladmask',
    passable: true,
    breakeable: false,
    ineractable: false,
    pickup: true,
    key: true,
    imgID: 46
  }
  , {
    id: 11,
    title: 'sawmask',
    passable: true,
    breakeable: false,
    ineractable: false,
    pickup: true,
    key: true,
    imgID: 47
  }, {
    id: 12,
    title: 'vmask',
    passable: true,
    breakeable: false,
    ineractable: false,
    pickup: true,
    key: true,
    imgID: 48
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
    //check what the pick up is
    var key = this.tileTypes[tile].key;
    if(key){
      //found key
      //check what key it is
      this.collectable(this.tileTypes[tile].title)
    }
    return true;
  }
  return false;

}

g_map.collectable = function(keyID) {
  //got keyID as a string
  switch(keyID){
    case "banemask":
      // 
      console.log("found a key! It was a : " + keyID);
      break;
    case "gladmask":
      console.log("found a key! It was a : " + keyID);
      //code
      break;
    case "sawmask":
      console.log("found a key! It was a : " + keyID);
      //code
      break;
    case "vmask":
      console.log("found a key! It was a : " + keyID);
      //code
      break;
    default:
      //no code
      console.log("oh no! this key is unknown: "+ keyID);
      break;
  }

}
// general map stuff

//this is a scale-able map generator, just change the maptileX and Y's
var mapTileWidth = 64,
  mapTileHeight = 64,

  mapTileHalfWidth = mapTileWidth / 2,
  mapTileHalfHeigth = mapTileHeight / 2,

  // Number of enemies that will spawn on map
  maxEnemies = 8;
enemiesOnMap = 0;

mapWidth = g_canvas.width,
  mapHeight = g_canvas.height,
  // map size in tiles
  // needs to be an odd number
  mapTilesX = 31,
  mapTilesY = 31,

  genMap = new Array(mapTilesX);

for (var i = 0; i < mapTilesX; i++) {
  // create row in map of y length
  genMap[i] = new Array(mapTilesY);

  for (var j = 0; j < mapTilesY; j++) {
    // check first and last layer
    // then check second and secnd last layers
    // then you check for odd/even numbers
    // for each condition you throw a value into the array
    if (i == 0 || i == mapTilesX - 1)
      genMap[i][j] = 1;
    else if (i == 1 || i == mapTilesX - 2)
      if (j == 0 || j == mapTilesX - 1)
        genMap[i][j] = 1;
      else
        genMap[i][j] = 0;
    else if (i % 2)
      if (j == 0 || j == mapTilesX - 1)
        genMap[i][j] = 1;
      else
        genMap[i][j] = 0;
    else
    if (j == 0 || j == mapTilesX - 1)
      genMap[i][j] = 1;
    else if (j % 2)
      genMap[i][j] = 0;
    else
      genMap[i][j] = 1;
  }
}


//console.dir(genMap);


// note //
// create a randomizer that checks for 0's and replaces with a number
// to create breakable objects or enemies.


var g_map = {
  tileWidth: 64,
  tileHeight: 64,
  mapTilesX: mapTilesX,
  mapTilesY: mapTilesY,
  breakableDensity: 0.7,
  mapTiles: genMap,

  colors: [
    "purple", //this one never gets selected
    "grey", //1
    "yellow", //2
    "white", //3
    "red", //4
    "green",
    "orange",
  ]
};

//constants
const g_mapColumns = g_map.mapTiles[0].length;
const g_mapRows = g_map.mapTiles.length;

g_map.drawSprites = function (id, i, j, ctx) {

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

//called when game preloaded, with sprites
g_map.generateMap = function () {
  //how many keys
  var bCount = 0,
    sCount = 0,
    vCount = 0,
    gCount = 0,
    roomCount = 0,
    //flags to check if all keys are placed
    bd = true,
    sd = true,
    vd = true,
    gd = true,
    roomD = true;



  //generate breakable blocks
  for (var i = 0; i < g_mapRows; ++i) {
    for (var j = 0; j < g_mapColumns; j++) {

      if (i > 0 && j > 0) {
        if ((i === 1 && j === 1) ||
          (i === 2 && j === 2) ||
          (i === 1 && j === 2) ||
          (i === 2 && j === 1)) {
          //nothing
        } else {
          var id = this.mapTiles[i][j];

          if (!id) {
            var rn = Math.random();
            if (rn > this.breakableDensity)
              this.mapTiles[i][j] = 4;
          }
        }


      }
    }
  }

  //smallst room possible
  /*
    1,1,1
    3,0,1
    1,1,1
  */
  while (roomD) {
    var smallRoom = [
      [4, 2, 2, 2],
      [0, 3, 15, 2],
      [4, 2, 2, 2]
    ];
    sLength = smallRoom.length;
    sHeight = smallRoom[0].length;
    var rx = Math.floor(util.randRange(5, this.mapTilesX - 5));
    var ry = Math.floor(util.randRange(5, this.mapTilesY - 5));

    if (g_gates.totalGates - 1 >= roomCount) {
      for (var i = 0; i < sLength; i++) {
        for (var j = 0; j < sHeight; j++) {
          //prevent rooms from overlapping
          if ((this.mapTiles[rx + 2][ry + 1] == 14) ||
            (this.mapTiles[rx + 3][ry + 1] == 14) ||
            (this.mapTiles[rx + 2][ry + 2] == 14)) {
            //key found we can't build here
          } else {
            this.mapTiles[rx + i][ry + j] = smallRoom[i][j];
          }
        }
      }
      roomCount++;
    } else {
      roomD = false;
    }

  }
  // generate keys on the map
  while (bd || sd || vd || gd) {
    var rx = Math.floor(util.randRange(3, this.mapTilesX - 3));
    var ry = Math.floor(util.randRange(3, this.mapTilesY - 3));
    var rs = Math.floor(util.randRange(9, 15));

    if (!(this.mapTiles[rx][ry] === 15) && !(this.mapTiles[rx][ry] === 2)) {
      switch (rs) {
        case 10:
          if (bCount >= g_sounds.baneArr.length) {
            bd = false;
            break;
          }
          this.mapTiles[rx][ry] = rs;
          bCount++;
          break;
        case 11:
          if (sCount >= g_sounds.sawArr.length) {
            sd = false;
            break;
          }
          this.mapTiles[rx][ry] = rs;
          sCount++;
          break;
        case 12:
          if (vCount >= g_sounds.vArr.length) {
            vd = false;
            break;
          }
          this.mapTiles[rx][ry] = rs;
          vCount++;
          break;
        case 13:
          if (gCount >= g_sounds.gArr.length) {
            gd = false;
            break;
          }
          this.mapTiles[rx][ry] = rs;
          gCount++;
          break;
        default:
          console.log("defaulted map generation");

      }
    }
  }

  // Enemies generated
  for (var i = 6; i < g_mapRows; ++i) {
    for (var j = 1; j < g_mapColumns; j++) {
      var rand = Math.random();
      var id = this.mapTiles[j][i];
      // Enemies have a 5% chance of appearing at an empty tile
      if (enemiesOnMap < maxEnemies && rand < 0.05) {
        if (id === 0) {
          entityManager.generateEnemy(i * mapTileWidth + mapTileHalfWidth,
            j * mapTileHeight + mapTileHalfHeigth);
          enemiesOnMap++;
        }
      }
    }
  }
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
          j, i, ctx);
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
};

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

// gets if a tyle type is passable
g_map.tileTypePassable = function (type) {
  if (type === undefined) {
    // makes sure the player can always get out of a bad situation
    return true;
  }
  return this.tileTypes[type].passable;
}

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
    // Spawn powerups, 50% chance.
    var rn = Math.floor(Math.random() * (10 - 4) + 4);
    if (rn > 3 && rn < 7) {
      // Nothing found.
    }
    if (rn == 7) {
      this.mapTiles[col][row] = 7;
    }
    if (rn == 8) {
      this.mapTiles[col][row] = 8;
    }
    if (rn == 9) {
      this.mapTiles[col][row] = 9;
    }
    g_sounds.playRockBreak();
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
    interactable: false,
    pickup: false,
    key: false,
    imgID: 50
  }, {
    id: 1,
    title: 'wall1',
    passable: false,
    breakeable: false,
    interactable: false,
    pickup: false,
    key: false,
    imgID: 49
  }, {
    id: 2,
    title: 'wall2',
    passable: false,
    breakeable: false,
    interactable: false,
    pickup: false,
    key: false,
    imgID: 49
  }, {
    id: 3,
    title: 'gate',
    passable: false,
    breakeable: false,
    interactable: true,
    pickup: false,
    key: false,
    imgID: 53
  },
  {
    id: 4,
    title: 'brick',
    passable: false,
    breakeable: true,
    interactable: false,
    pickup: false,
    key: false,
    imgID: 50
  },
  {
    id: 5,
    title: 'hiddenBrick',
    passable: false,
    breakeable: true,
    interactable: false,
    pickup: false,
    key: false,
    imgID: 5
  },
  {
    id: 6,
    title: 'hiddenPath',
    passable: true,
    breakeable: false,
    interactable: false,
    pickup: false,
    key: false,
    imgID: 6
  }, {
    id: 7,
    title: 'extraLife',
    passable: true,
    breakeable: false,
    interactable: false,
    pickup: true,
    key: false,
    imgID: 58
  }, {
    id: 8,
    title: 'extraBomb',
    passable: true,
    breakeable: false,
    interactable: false,
    pickup: true,
    key: false,
    imgID: 59
  }, {
    id: 9,
    title: 'speed',
    passable: true,
    breakeable: false,
    interactable: false,
    pickup: true,
    key: false,
    imgID: 60
  }, {
    id: 10,
    title: 'banemask',
    passable: true,
    breakeable: false,
    interactable: false,
    pickup: true,
    key: true,
    imgID: 45
  }, {
    id: 11,
    title: 'gladmask',
    passable: true,
    breakeable: false,
    interactable: false,
    pickup: true,
    key: true,
    imgID: 46
  }, {
    id: 12,
    title: 'sawmask',
    passable: true,
    breakeable: false,
    interactable: false,
    pickup: true,
    key: true,
    imgID: 47
  }, {
    id: 13,
    title: 'vmask',
    passable: true,
    breakeable: false,
    interactable: false,
    pickup: true,
    key: true,
    imgID: 48
  }, {
    id: 14,
    title: 'finish',
    passable: true,
    breakeable: false,
    interactable: false,
    pickup: true,
    key: true,
    imgID: 48
  }, {
    id: 15,
    title: 'key',
    passable: true,
    breakeable: false,
    interactable: false,
    pickup: true,
    key: true,
    imgID: 52
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

  var tile = this.mapTiles[col][row];
  if (tile === undefined) {
    return false;
  }
  var pickup = this.tileTypes[tile].pickup;
  if (pickup === undefined) {
    return false;
  }
  //return this.tileTypes[tile].passable;
  if (pickup) {
    var powerUp = this.tileTypes[tile].id;
    var player = entityManager._player[0];
    if (powerUp == 7) {
      g_lives++;
    }
    if (powerUp == 8) {
      player.incrMaxBombCount(1);
    }
    if (powerUp == 9) {
      player.incrSpeed();
    }

    this.mapTiles[col][row] = 0;
    g_sounds.playSelect();
    //check what the pick up is
    var key = this.tileTypes[tile].key;
    if (key) {
      //found key
      //check what key it is
      this.collectable(this.tileTypes[tile].title)
    }
    return true;
  }
  return false;

}

g_map.collectable = function (keyID) {
  //got keyID as a string
  switch (keyID) {
    case "banemask":
      g_sounds.playBane();
      g_ui._collectables++;
      console.log("found a key! It was a : " + keyID);
      break;
    case "gladmask":
      g_sounds.playGlad();
      console.log("found a key! It was a : " + keyID);
      g_ui._collectables++;
      //code
      break;
    case "sawmask":
      console.log("found a key! It was a : " + keyID);
      g_sounds.playSaw();
      g_ui._collectables++;
      //code
      break;
    case "vmask":
      console.log("found a key! It was a : " + keyID);
      g_sounds.playV();
      g_ui._collectables++;
      //code
      break;
    case "key":
      g_sounds.playSelect();
      console.log("found a key! It was a : " + keyID);
      g_ui._key++;
      break;
    default:
      //no code
      console.log("oh no! this key is unknown: " + keyID);
      break;
  }

}

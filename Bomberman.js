/** BOMBERMAN **/

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

function createPlayers() {
    
    entityManager.generatePlayer({
        cx : 100,
        cy : 100
    });
}

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    processDiagnostics();

    entityManager.update(du);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;

var KEY_SPATIAL = keyCode('X');

function processDiagnostics() {
    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;
}

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    entityManager.camera(ctx);
    entityManager.render(ctx);
    //added g_map to render
    g_map.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);

    ctx.restore();
}

// Preload images

var g_images = {};

function requestPreloads() {

    var requiredImages = {

        // Player sprite images
        0 : "assets/playerwalkright.png", 1 : "assets/playerwalkright2.png",
        2 : "assets/playerwalkleft.png", 3 : "assets/playerwalkleft2.png",
        4 : "assets/playerwalkup.png", 5 : "assets/playerwalkup2.png",
        6 : "assets/playerwalkdown.png", 7 : "assets/playerwalkdown2.png",

        // Bomb image
        8 : "assets/bomb.png",

        // Explosion sprite
        9 : "assets/explosion.png",

        // Player explosion sprite sheet
        10 : "assets/playerexplode.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

/**
 * Player sprites: 0-7
 * Bomb sprite: 8
 * Explosion sprites: 9 - 31
 * Player Explosion sprites: 32 - 41
 */
var g_sprites = [];
var g_playerSprites = 8;
var g_explOffset = g_playerSprites + 1;
var g_explSprites = 22;
var g_playerExplOffset = g_explOffset + g_explSprites;
var g_playerExplSprites = 9;

function preloadDone() {

    // Player sprites
    for (var i = 0; i < g_playerSprites; i++) {
        g_sprites[i] = new Sprite(g_images[i]);
    }

    // Player sprite images scaled
    for (var i = 0; i < g_playerSprites; i++) {
        g_sprites[i].scale = 2;
    }

    // Bomb sprite
    g_sprites[g_playerSprites] = new Sprite(g_images[8]);

    // Explosion sprite
    var celWidth  = 32;
    var celHeight = 32;
    var numCols = 8;
    var numRows = 3;
    var numCels = 22;
    
    var sprite;
    
    for (var row = 0; row < numRows; ++row) {
        for (var col = 0; col < numCols; ++col) {
            sprite = new AnimatingSprite(col * celWidth, row * celHeight,
                                celWidth, celHeight, g_images[9]) 
            g_sprites.push(sprite);
        }
    }

    // Remove any superfluous ones from the end
    g_sprites.splice(numCels + g_playerSprites + 1);

    // Player explosion sprite
    var playerCelWidth = 31;
    var playerCelHeight = 27.3;
    var playerNumCols = 3;
    var playerNumRows = 3;
    //var playerNumCells = 9;

    var explPlayerSprite;
    
    for (var i = 0; i < playerNumRows; ++i) {
        for (var j = 0; j < playerNumCols; ++j) {
            explPlayerSprite = new AnimatingSprite(j * playerCelWidth, 
                i * playerCelHeight, 
                playerCelWidth, playerCelHeight, g_images[10])
            g_sprites.push(explPlayerSprite);
        }
    }

    entityManager.init();
    createPlayers();

    main.init();
}

// Kick it off
requestPreloads();

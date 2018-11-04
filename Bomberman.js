/** BOMBERMAN **/

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

function createPlayers() {
    
    entityManager.generatePlayer({
        cx : 100,
        cy : 100
    });
}

function updateSimulation(du) {

    entityManager.update(du);
}

function renderSimulation(ctx) {
    
    entityManager.render(ctx);
}

// Preload images

var g_images = {};

function requestPreloads() {

    var requiredImages = {

        // Player sprite images
        0 : "https://notendur.hi.is/vak9/images/playerwalkright.png", 1 : "https://notendur.hi.is/vak9/images/playerwalkright2.png",
        2 : "https://notendur.hi.is/vak9/images/playerwalkleft.png", 3 : "https://notendur.hi.is/vak9/images/playerwalkleft2.png",
        4 : "https://notendur.hi.is/vak9/images/playerwalkup.png", 5 : "https://notendur.hi.is/vak9/images/playerwalkup2.png",
        6 : "https://notendur.hi.is/vak9/images/playerwalkdown.png", 7 : "https://notendur.hi.is/vak9/images/playerwalkdown2.png",

        // Bomb image
        8 : "https://notendur.hi.is/~thp44/tolvuleikjaforritun/Images/bomb.png",

        // Explosion sprite
        9 : "https://notendur.hi.is/~thp44/tolvuleikjaforritun/Images/explosion.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

/**
 * Player sprites: 0-7
 * Bomb sprite: 8
 * Explosion sprites: 9 - 31
 */
var g_sprites = [];
var g_playerSprites = 8;
var g_explOffset = g_playerSprites + 1;
var g_explSprites = 22;

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

    entityManager.init();

    main.init();
}

requestPreloads();

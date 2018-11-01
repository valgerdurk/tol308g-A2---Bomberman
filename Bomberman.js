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
        playerRight : "playerwalkright.png", playerRightStep : "playerwalkright2.png",
        playerLeft : "playerwalkleft.png", playerLeftStep : "playerwalkleft2.png",
        playerBack : "playerwalkup.png", playerBackStep : "playerwalkup2.png",
        playerFront : "playerwalkdown.png", playerFrontStep : "playerwalkdown2.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    // Player sprites
    g_sprites.playerRight = new Sprite(g_images.playerRight);
    g_sprites.playerRightStep = new Sprite(g_images.playerRightStep);
    g_sprites.playerLeft = new Sprite(g_images.playerLeft);
    g_sprites.playerLeftStep = new Sprite(g_images.playerLeftStep);
    g_sprites.playerBack = new Sprite(g_images.playerBack);
    g_sprites.playerBackStep = new Sprite(g_images.playerBackStep);
    g_sprites.playerFront = new Sprite(g_images.playerFront);
    g_sprites.playerFrontStep = new Sprite(g_images.playerFrontStep);

    g_sprites.playerRight.scale = 2;
    g_sprites.playerRightStep.scale = 2;
    g_sprites.playerLeft.scale = 2;
    g_sprites.playerLeftStep.scale = 2;
    g_sprites.playerBack.scale = 2;
    g_sprites.playerBackStep.scale = 2;
    g_sprites.playerFront.scale = 2;
    g_sprites.playerFrontStep.scale = 2;

    entityManager.init();

    main.init();
}

requestPreloads();

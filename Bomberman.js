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
    //added g_map to render
    g_map.render(ctx);
}

// Preload images

var g_images = {};

function requestPreloads() {

    var requiredImages = {

        // Player sprite images
        0 : "https://notendur.hi.is/vak9/images/playerwalkright.png", 1 : "https://notendur.hi.is/vak9/images/playerwalkright2.png",
        2 : "https://notendur.hi.is/vak9/images/playerwalkleft.png", 3 : "https://notendur.hi.is/vak9/images/playerwalkleft2.png",
        4 : "https://notendur.hi.is/vak9/images/playerwalkup.png", 5 : "https://notendur.hi.is/vak9/images/playerwalkup2.png",
        6 : "https://notendur.hi.is/vak9/images/playerwalkdown.png", 7 : "https://notendur.hi.is/vak9/images/playerwalkdown2.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};
var g_playerSprites = 8;

function preloadDone() {

    // Player sprites
    for (var i = 0; i < g_playerSprites; i++) {
        g_sprites[i] = new Sprite(g_images[i]);
    }

    // Player sprite images scaled
    for (var i = 0; i < g_playerSprites; i++) {
        g_sprites[i].scale = 2;
    }

    entityManager.init();

    main.init();
}

requestPreloads();

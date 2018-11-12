/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {
    // Generates new Spatial Id for an entity and sets the next Id
    return this._nextSpatialID++;
},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();

    // The entity is created as an object with positional variables
    var Entity = {
        posX : pos.posX,
        posY : pos.posY,
        radius : entity.getRadius(),
        entity : entity
    };

    // The entity is then added to the array of entites by its spatial id
    this._entities[spatialID] = Entity;
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    // The entity is deleted from the array, leaving a "hole"
    delete this._entities[spatialID];
},

findEntityInRange: function(posX, posY, radius) {
    var entities = this._entities;
    
    // Lets compute the squared distance between our entity and the others
    // We go through the array of entites and find the one that is closest to us

    // To begin with we set the Id of the closest entity to 0 
    // and the min squared distance to infinity
    var entID = 0;
    var minDistance = Infinity; 
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        if (entity != undefined) {
            var dist = util.wrappedDistSq(posX, posY, entity.posX, entity.posY, 
                g_canvas.width, g_canvas.height);
            if (dist < minDistance) {
                minDistance = dist; 
                entID = i; 
            }
        }
    }
    // Lets check for collision by checking if this entity's radius + our entity's radius ^ 2 
    // is greater than the squared distance
    if ((entities[entID].radius + radius)**2 > minDistance) {
        return entities[entID].entity;
        // It's a hit!
    }
    return false;
    // No hit!
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }
    ctx.strokeStyle = oldStyle;
}

}
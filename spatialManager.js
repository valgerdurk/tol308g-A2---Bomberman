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

findEntitiesRange: function(posX, posY, range) {
    var entities = this._entities;

    var _entitiesInRange = [];
    var placeInGrid = g_map.tileMapLocation(posX, posY);
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        if (entity != undefined) {
            var entityInGrid = g_map.tileMapLocation(entity.posX, entity.posY);
            for (var j = 0; j <= range; j++) {                
                // Up
                if ((entityInGrid.column == placeInGrid.column) && (entityInGrid.row == placeInGrid.row - j)) {
                    _entitiesInRange.push(entity.entity);
                    break;
                }
                // Down
                if ((entityInGrid.column == placeInGrid.column) && (entityInGrid.row == placeInGrid.row + j)) {
                    _entitiesInRange.push(entity.entity);
                    break;
                }
                // Left
                if ((entityInGrid.column == placeInGrid.column - j) && (entityInGrid.row == placeInGrid.row)) {
                    _entitiesInRange.push(entity.entity);
                    break;
                }
                // Right
                if ((entityInGrid.column == placeInGrid.column + j) && (entityInGrid.row == placeInGrid.row)) {
                    _entitiesInRange.push(entity.entity);
                    break;
                }
            }
        }
    }
    return _entitiesInRange;
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
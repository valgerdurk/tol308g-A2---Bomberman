//Camera


g_camera = {


	camera: function(ctx) {
        
        
    	//grab the player object
		var pl = entityManager._player[0];
		// halfwith of the canvas
		var hw = g_canvas.width/2;
		var hh = g_canvas.height/2;

		// negative player position and halfwidth of canvas
		var xEdge = (-pl.cx+hw);
		var yEdge = (-pl.cy+hh);
		// these prob wont change but now they scale properly
		var Wmargin = -(g_map.mapTilesX * g_map.tileWidth) + (g_canvas.width);
		var Hmargin = -(g_map.mapTilesY * g_map.tileHeight) - (g_canvas.height);
        //far left edge of screen
        if(xEdge >= 0){
            //top edge
            if(yEdge >= 0){
                //top left corner 
                //lock both x and y axix
                ctx.translate(0,0);
            }
            else if(yEdge <= Hmargin) {
                // in this case the -448 needs be something else
                //lock in both x and y axis
                ctx.translate(0, Hmargin);
            }
            else {
                //continue moving up or down
                //but lock in x axis
                ctx.translate(0, yEdge);
            }
        } //check other x border
        else if (xEdge <= Wmargin) {
            //far most right edge
            if(yEdge >= 0) {
                //lock x and y axis
                ctx.translate(Wmargin,0);
            }
            else if(yEdge <= Hmargin) {
                //in this case the -448 needs be something else
                //lock in both x and y axis
                ctx.translate(Wmargin, Hmargin);
            } 
            else {
                    //locks in x margin, free y edge
                    ctx.translate(Wmargin, yEdge);
            }
        } // both x borders accounted for, just 2 y borders left
        else {
            if(yEdge >= 0){
                // lock y axix top
                ctx.translate(xEdge, 0);
            } 
            else if (yEdge <= Hmargin) {
                // lock y axix bot
                ctx.translate(xEdge, Hmargin);
            }
            else {
                // all other conditions met, move up n down
                ctx.translate(xEdge, yEdge);
            }
        }
    }
};

//Struct used to save locations alongside their graphics
function Location(xCoord, yCoord, imgElement, squareElement, line){
	this.coordinateX = xCoord;
	this.coordinateY = yCoord;
	this.imgElement = imgElement;
	this.squareElement = squareElement;
	this.line=line;
}

function doLayout(overhowimage){
	 $(this).css('background-image','url(resources/images/'+overhowimage+'.png)');
}


/**
 * Define the function, which is able to be used for resize the framework.
 * 
 */
var framework_Do_Layout = function(){
	
};

/**
 * Define the Left position of centerColumn
 * Default is 480
 */
var centerColumnlleft = function() {
	return 480;
};
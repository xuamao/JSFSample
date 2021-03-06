var LOCATION_MARKER_OFFSET_X = 8 /2; // x-offset for locationMarker (widht/2) (full bodymap view)
var LOCATION_MARKER_OFFSET_Y = 8 /2; // y-offset for locationMarker (height/2) (full bodymap view)
var BM_LEFT_WIDTH = 269; // width of left bodymap image 
var BM_FRONT_WIDTH = 235; // width of front bodymap image
var BM_RIGHT_WIDTH = 269; // width of right bodymap image
var BM_BACK_WIDTH = 235; // width of back bodymap image
var BM_LEFT_DETAIL_WIDTH = 1607; // width of left bodymap detail image 
var BM_FRONT_DETAIL_WIDTH = 1402; // width of front bodymap detail image
var BM_RIGHT_DETAIL_WIDTH = 1607; // width of right bodymap detail image
var BM_BACK_DETAIL_WIDTH = 1402; // width of back bodymap detail image

var LOCATION_SPACE = 35; // width reserved for displaying location info
var BETWEEN_LOCATION_SPACE = 5; // width reserved for space between location info
var BM_HEIGHT = 719; // height of the bodymap images
var bodymapRatio = 1; // current active ratio (zoomfactor) for full bodymap
var offsetLeft = 0;
var offsetTop = 0;
var locations = [];

/**
 * javascript Function for HomepageResize
 */
var home_do_layout = function(){
	framework_Do_Layout();
	/**
	 * Page oriented function
	 */
	if( $(".patientlistButton").position().left==0){
		$("#patientlistLayer").offset({left: 140});
	}else{
		$(".patientlistButton").offset({left: window.innerWidth-140});
		$("#patientlistLayer").offset({left: window.innerWidth});
	}
	bodymap_with_leftColumn_do_layout();	
	
	console.info("Home_do_layout fucntion: "+window.innerWidth);
	
	$("#closeAction").offset({left: window.innerWidth-60});
	$("#patienteditLayer").width(window.innerWidth);
	bodymap_with_leftColumn_do_layout();
	
};

/**
 * calculate LeftColumnwidth
 */
var leftColumnwidth = function(){
	return Math.round((window.innerHeight/6-20)/3*8+22);
};

/**
 * do_layout function 
 */
var bodymap_with_leftColumn_do_layout = function(){
	$('.imageThumbnailNormal').height(Math.round(window.innerHeight/6-20));
	console.info(leftColumnwidth());
	bodymap_do_layout();
	layoutLocationMarkers();
};

var leftColumnImageHeight = function(){
	return Math.round(window.innerHeight/6-20);
};

/**
 * calculate rightColumnwidth
 */
var rightColumnwidth = function(){
	return 240;
};

function toggleLocation(params){
	var div = document.getElementById(params.data.param1);
	if(div.className === "locationSquare"){
		div.className = "locationSquareSelected";
	} else if(div.className === "locationSquareDisabled"){
		div.className = "locationSquareDisabledSelected";
	}else if(div.className === "locationSquareSelected"){
		div.className = "locationSquare";
	}else{
		div.className = "locationSquareDisabled";
	}
}

$(function() {
	$('.disableButton').click( function(){
		var selectedLocs = document.getElementsByClassName("locationSquareSelected");
		while(selectedLocs.length > 0){
			loc = selectedLocs[0];
			loc.className = "locationSquareDisabled";
		}
		var selectedDisabledLocs = document.getElementsByClassName("locationSquareDisabledSelected");
		while(selectedDisabledLocs.length > 0){
			loc = selectedDisabledLocs[0];
			loc.className = "locationSquare";
		}	
	});
});

function ableLocation(){
	var selectedLocs = document.getElementsByClassName("locationSquareSelected");
	while(selectedLocs.length > 0){
		loc = selectedLocs[0];
		loc.className = "locationSquareDisabled";
	}
	var selectedDisabledLocs = document.getElementsByClassName("locationSquareDisabledSelected");
	while(selectedDisabledLocs.length > 0){
		loc = selectedDisabledLocs[0];
		loc.className = "locationSquare";
	}
}

function createLocations() {
	for (var i = 0; i<locations.length; i++) {
		var facing = locations[i].facing;
		$("#fullBodymap").append("<img src='resources/images/positionMarker.png' id='marker"+i+facing+"' />");
		var img = $("#marker"+i+facing);
		$("#fullBodymap").append("<div id='square"+i+facing+"' class='locationSquare'/>");
		var square = $("#square"+i+facing);
		$("#fullBodymap").append("<div id='line"+i+facing+"' class='locationConnectorLine' />");
		var line = $("#line"+i+facing);
		$("#square"+i+facing).css('position','absolute');
		$("#marker"+i+facing).css('position','absolute');
		var loc = new Location(locations[i].x, locations[i].y, img, square, line);
		locations[i].element = loc;
		square.click({param1: "square"+i+facing}, toggleLocation);
	}
}

//Places the location markers at the right coordinates
function layoutLocationMarkers(){
	for(var i =0; i<locations.length; i++){
		var loc = locations[i].element;
		var offsetSide = 0;
		var bodymapWidth = 0; // width of the bodymap image depending of facing		
		switch (locations[i].facing) {
		case "\"right\"":
			alert("\"right\"");
		case "left":
			offsetSide = offsetLeft + LOCATION_SPACE;
			bodymapWidth = BM_LEFT_WIDTH;
			fullToDetailRatio = BM_LEFT_WIDTH / BM_LEFT_DETAIL_WIDTH;
			break;
		case "front":
			offsetSide = offsetLeft + BM_LEFT_WIDTH * bodymapRatio + 3 * LOCATION_SPACE + BETWEEN_LOCATION_SPACE;
			bodymapWidth = BM_FRONT_WIDTH;
			fullToDetailRatio = BM_FRONT_WIDTH / BM_FRONT_DETAIL_WIDTH;
			break;
		case "right":
			offsetSide = offsetLeft + (BM_LEFT_WIDTH + BM_FRONT_WIDTH) * bodymapRatio + 5 * LOCATION_SPACE + 2 * BETWEEN_LOCATION_SPACE;
			bodymapWidth = BM_RIGHT_WIDTH;
			fullToDetailRatio = BM_RIGHT_WIDTH / BM_RIGHT_DETAIL_WIDTH;
			break;
		case "back":
			offsetSide = offsetLeft + (BM_LEFT_WIDTH + BM_FRONT_WIDTH + BM_RIGHT_WIDTH)* bodymapRatio + 7 * LOCATION_SPACE + 3 * BETWEEN_LOCATION_SPACE;
			bodymapWidth = BM_BACK_WIDTH;
			fullToDetailRatio = BM_BACK_WIDTH / BM_BACK_DETAIL_WIDTH;
			break;

		default:
			break;
		}
		
		if(loc !== null){
			var coordinateX = loc.coordinateX;
			var realX = bodymapRatio * coordinateX * fullToDetailRatio;
			loc.imgElement.css("left", offsetSide + realX - LOCATION_MARKER_OFFSET_X);
			var coordinateY = loc.coordinateY;
			var realY = bodymapRatio * coordinateY * fullToDetailRatio;
			loc.imgElement.css("top", offsetTop + realY - LOCATION_MARKER_OFFSET_Y);
			if(coordinateX * fullToDetailRatio > (bodymapWidth / 2)){
				loc.squareElement.css("left", offsetSide+(bodymapWidth * bodymapRatio));
				loc.line.css("left", offsetSide+realX);
				loc.line.css("width", (bodymapWidth * bodymapRatio) - realX);
			} else {
				loc.squareElement.css("left", offsetSide-LOCATION_SPACE);
				loc.line.css("left", offsetSide);
				loc.line.css("width", realX);
			}
			loc.squareElement.css("top", offsetTop+realY);
			loc.line.css("top", offsetTop+realY);
		}
	}
}
/**
 * Home bodymap_do_layout
 */
var bodymap_do_layout = function(){
	var innerWidth = window.innerWidth;
	var innerHeight = window.innerHeight;
	
	// calculate available space for centerPane
	// LeftColumnwidth and rightColumnwidth can differ from page to page
	var centerWidth = innerWidth - leftColumnwidth()-rightColumnwidth();
	var centerHeight = innerHeight - 120;
	
	console.info("CenterWidth:"+centerWidth+" CenterHeight:"+centerHeight);
	
	$("#centercolumn").width(centerWidth);
	$("#centercolumn").height(centerHeight);
	$("#centercolumn").css("top", 0);
	$("#centercolumn").css("left", leftColumnwidth);
	
	$("#leftcolumn").width(leftColumnwidth);
	
	// bodymap in 4 parts must be arranged in center with space in between
	// left + front + right + back; + (8*space for locations) + 3*space between locations
	var originalBodymapWidth = BM_LEFT_WIDTH + BM_FRONT_WIDTH + BM_RIGHT_WIDTH + BM_BACK_WIDTH;
	var availableWidthForBodymap = centerWidth - 8 * LOCATION_SPACE - 3 * BETWEEN_LOCATION_SPACE;
	var originalBodymapHeight = BM_HEIGHT;
	var bodymapWidthRatio = availableWidthForBodymap / originalBodymapWidth;
	var bodymapHeightRatio =  centerHeight / originalBodymapHeight;
	bodymapRatio = Math.min(bodymapWidthRatio, bodymapHeightRatio);
	// offset for centering
	offsetTop = (centerHeight - bodymapRatio * BM_HEIGHT) / 2;
	offsetLeft = (availableWidthForBodymap - bodymapRatio * originalBodymapWidth) / 2;
	$("#bodymapLeft").width(BM_LEFT_WIDTH * bodymapRatio);
	$("#bodymapLeft").height(BM_HEIGHT * bodymapRatio);
	$("#bodymapLeft").css("top", offsetTop);
	$("#bodymapLeft").css("left", offsetLeft + LOCATION_SPACE);
	$("#bodymapFront").width(BM_FRONT_WIDTH * bodymapRatio);
	$("#bodymapFront").height(BM_HEIGHT * bodymapRatio);
	$("#bodymapFront").css("top", offsetTop);
	$("#bodymapFront").css("left", offsetLeft + BM_LEFT_WIDTH * bodymapRatio + 3 * LOCATION_SPACE + BETWEEN_LOCATION_SPACE);
	$("#bodymapRight").width(BM_RIGHT_WIDTH * bodymapRatio);
	$("#bodymapRight").height(BM_HEIGHT * bodymapRatio);
	$("#bodymapRight").css("top", offsetTop);
	$("#bodymapRight").css("left", offsetLeft + BM_LEFT_WIDTH * bodymapRatio + BM_FRONT_WIDTH * bodymapRatio + 5 * LOCATION_SPACE + 2 * BETWEEN_LOCATION_SPACE);
	$("#bodymapBack").width(BM_BACK_WIDTH * bodymapRatio);
	$("#bodymapBack").height(BM_HEIGHT * bodymapRatio);
	$("#bodymapBack").css("top", offsetTop);
	$("#bodymapBack").css("left", offsetLeft + BM_LEFT_WIDTH * bodymapRatio + BM_FRONT_WIDTH * bodymapRatio + BM_RIGHT_WIDTH * bodymapRatio + 7 * LOCATION_SPACE + 3 * BETWEEN_LOCATION_SPACE);
	
};


$(function() {
	$('.patientlistText').hover(
				function(){
					 $('.patientlistButton').css('background-image','url(resources/images/btnPatientlistHover.png)');
				 }
				 ,
				 function(){
				  $('.patientlistButton').css('background-image','url(resources/images/btnPatientlistNormal.png)');
				  }
	 );

	 $('#addPatientButton').click( function (){
		 $('#layerContainer').css('display','none');
		 $('#layerContainer2').css('display','inline');
	 });

	 $('.patientlistText').click( function (){
		 	console.info("0px + 140px");
			if( $(".patientlistButton").position().left !=0){

				 console.info("0px + 140px");
				 $(".patientlistButton").animate({
			    	 left: '0px'
			    	 }, 500 );
 	 		 $("#patientlistLayer").animate({
			    	 left: '140px'
			    	 }, 500 );
				}else{

				console.info((window.innerWidth-140)+"px + "+ window.innerWidth+"px");
				$(".patientlistButton").animate({
			    	 left: (window.innerWidth-140)+'px'
			    	 }, 500 );

 	 		 $("#patientlistLayer").animate({
			    	 left: window.innerWidth+'px'
			    	 }, 500 );
				}

	 	   }
	  );
	  

	 /**
	  * Image enlargen function:
	  * 
	  */
	 $('.imageThumbnailNormal').click( function (){
		
		 /**
		  * Image is not enlarged.
		  */
		 if($('.imageFlyout').css('display')=='block'){
			 
			 $(this).animate({
				 height: Math.round(window.innerHeight/6-20)
	    	 }, 500, function (){
	    		 $(this).css('z-index','auto');
				 $(this).css('position','');
				 $(this).removeAttr('left');
				 $(this).css('top','0px');
		     });
			 $('.imageFlyout').css('display','none');
			 $('.imageFlyout').css('left','0px');
			 
 		 }else{
 			var bigImageHeight = Math.round(window.innerHeight/5*3-120);
 			var bigImagewidth = Math.round((window.innerHeight/5-40)*4);
				 $(this).css('position','fixed');
	    		 $(this).css('left','0px');
	    		 $(this).css('top','60px');
	    		 $(this).css('z-index','10');
		    		 $(this).animate({
			    	 height: bigImageHeight
			    	 }, 500 ,function() {
			    		 $('.imageFlyout').css('top','60px');
			    		 $('.imageFlyout').css('height',bigImageHeight);
			    		 $('.imageFlyout').css('width',bigImagewidth);
			    		 $('.imageFlyout').css('display','inline');
			    		 $('.imageFlyout').animate({
			    			 left: $(this).width()
					    	 }, 500);

			    		tempImagewidth= bigImagewidth;
			    	 });
		 }
	 });

	 $('.iconTurn').click( function (){
		 if( $('.imageFlyout').position().left !=60){
 		 $('.imageFlyout').animate({
	    	 left: '60px'
	    	 }, 500);
 		 $('.iconTurn').css('background-image','url(resources/images/iconTurnRight.png)');
		 }else{
			 $('.imageFlyout').animate({
		    	 left: tempImagewidth+'px'
		    	 }, 500);
			 $('.iconTurn').css('background-image','url(resources/images/iconTurnLeft.png)');
 	  }
	 });

	 $('.compareSmallNormal').click( function (){
		 window.location.href='/cube-online-module-0.0.1-SNAPSHOT/compare.xhtml';
	 });

	 $('.editPatient').click( function(){
			$('#patienteditLayer').css('display','inline');
			console.info("Edit Patient Button"+window.innerWidth);
 	 });
	 
	 $('#closeAction').click(function(){
		 $('#layerContainer2').css('display','none');
		 $('#layerContainer').css('display','inline');
	 });
	 
	 $('.closePatientEditPanel').click(function(){
		 $('#patienteditLayer').css('display','none');
	 });
	 

});
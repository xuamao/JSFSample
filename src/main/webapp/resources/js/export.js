var imageRatioWidth = 4;
var imageRatioHeight = 3;
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
var SPACER_BETWEEN_IMAGE_COLUMN_AND_BODYMAP = 40;
var SCROLL_BAR_WIDTH = 25;
var widgetVars = [];
var exportBodyMapRatio;
var exportLocations = [];

function showExportLayer(){
	window.onresize = doExportLayout;
	doExportLayout();
	 $('#dimmer').css('display','inline');
	 $('#exportFrame').css('display','inline');
	 $('#exportBottomButton').css('display','inline');
}

function hideExportLayer(){
	 $('#dimmer').css('display','none');
	 $('#exportFrame').css('display','none');
	 $('#exportBottomButton').css('display','none');
}

function layoutExportLocationMarkers(){
	for(var i =0; i<exportLocations.length; i++){
		var loc = exportLocations[i];
		var offsetSide = 0;
		var bodymapWidth = 0; // width of the bodymap image depending of facing		
		switch (loc.facing) {
		case "left":
			offsetSide = LOCATION_SPACE;
			bodymapWidth = BM_LEFT_WIDTH;
			fullToDetailRatio = BM_LEFT_WIDTH / BM_LEFT_DETAIL_WIDTH;
			break;
		case "front":
			offsetSide = BM_LEFT_WIDTH * exportBodymapRatio + 3 * LOCATION_SPACE + BETWEEN_LOCATION_SPACE;
			bodymapWidth = BM_FRONT_WIDTH;
			fullToDetailRatio = BM_FRONT_WIDTH / BM_FRONT_DETAIL_WIDTH;
			break;
		case "right":
			offsetSide = (BM_LEFT_WIDTH + BM_FRONT_WIDTH) * exportBodymapRatio + 5 * LOCATION_SPACE + 2 * BETWEEN_LOCATION_SPACE;
			bodymapWidth = BM_RIGHT_WIDTH;
			fullToDetailRatio = BM_RIGHT_WIDTH / BM_RIGHT_DETAIL_WIDTH;
			break;
		case "back":
			offsetSide = (BM_LEFT_WIDTH + BM_FRONT_WIDTH + BM_RIGHT_WIDTH)* exportBodymapRatio + 7 * LOCATION_SPACE + 3 * BETWEEN_LOCATION_SPACE;
			bodymapWidth = BM_BACK_WIDTH;
			fullToDetailRatio = BM_BACK_WIDTH / BM_BACK_DETAIL_WIDTH;
			break;

		default:
			break;
		}
		
		if(loc !== null){
			var coordinateX = loc.coordinateX;
			var realX = exportBodymapRatio * coordinateX * fullToDetailRatio;
			loc.imgElement.css("left", offsetSide + realX - LOCATION_MARKER_OFFSET_X);
			var coordinateY = loc.coordinateY;
			var realY = exportBodymapRatio * coordinateY * fullToDetailRatio;
			loc.imgElement.css("top", realY - LOCATION_MARKER_OFFSET_Y);
			if(coordinateX * fullToDetailRatio > (bodymapWidth / 2)){
				loc.squareElement.css("left", offsetSide+(bodymapWidth * exportBodymapRatio));
				loc.wrapDiv.style.left=offsetSide+(bodymapWidth * exportBodymapRatio);				
				loc.line.css("left", offsetSide+realX);
				loc.line.css("width", (bodymapWidth * exportBodymapRatio) - realX);
			} else {
				loc.squareElement.css("left", offsetSide-LOCATION_SPACE);
				loc.wrapDiv.style.left=offsetSide-LOCATION_SPACE;
				loc.line.css("left", offsetSide);
				loc.line.css("width", realX);
			}
			loc.squareElement.css("top", realY);
			loc.wrapDiv.style.top = realY;
			loc.line.css("top", realY);
		}
	}
}

function doExportLayout(){
	var innerColumnHeight = window.innerHeight - 120;
	var rowHeight = innerColumnHeight/6;
	$('.checkBoxWrapper').css("margin-bottom", rowHeight-35);

	
	$('.imageThumbnailExport').css("height", (innerColumnHeight/6)-2);
	var imageWidth = (innerColumnHeight/6) * 4 /3;
	$('#exportBottomButton').css("left", (window.innerWidth/2)-80);
	$('#exportCenterBottomButtons').css("left", (window.innerWidth/2)-300);
	$('#exportCenterTopButtons').css("left", (window.innerWidth/2)-140);
	$('#exportCenterImageColumn').css("width", 2*imageWidth+70+SCROLL_BAR_WIDTH);	
	$('#exportCenterBodyMap').css("left", 2*imageWidth+70+SPACER_BETWEEN_IMAGE_COLUMN_AND_BODYMAP);
	
	var maxCenterWidth = window.innerWidth - 120 - 2*imageWidth - 70 - SPACER_BETWEEN_IMAGE_COLUMN_AND_BODYMAP;
	var maxCenterHeight = window.innerHeight - 240;
	var originalBodymapWidth = BM_LEFT_WIDTH + BM_FRONT_WIDTH + BM_RIGHT_WIDTH + BM_BACK_WIDTH;
	var availableWidthForBodymap = maxCenterWidth - 8 * LOCATION_SPACE - 3 * BETWEEN_LOCATION_SPACE;
	var originalBodymapHeight = BM_HEIGHT;
	var bodymapWidthRatio = availableWidthForBodymap / originalBodymapWidth;
	var bodymapHeightRatio =  maxCenterHeight / originalBodymapHeight;
	exportBodymapRatio = Math.min(bodymapWidthRatio, bodymapHeightRatio);
	$("[id='exportForm:exportBodymapLeft']").width(BM_LEFT_WIDTH * exportBodymapRatio);
	$("[id='exportForm:exportBodymapLeft']").height(BM_HEIGHT * exportBodymapRatio);
	$("[id='exportForm:exportBodymapLeft']").css("left", LOCATION_SPACE);
	$("[id='exportForm:exportBodymapFront']").width(BM_FRONT_WIDTH * exportBodymapRatio);
	$("[id='exportForm:exportBodymapFront']").height(BM_HEIGHT * exportBodymapRatio);
	$("[id='exportForm:exportBodymapFront']").css("left", BM_LEFT_WIDTH * exportBodymapRatio + 3 * LOCATION_SPACE + BETWEEN_LOCATION_SPACE);
	$("[id='exportForm:exportBodymapRight']").width(BM_RIGHT_WIDTH * exportBodymapRatio);
	$("[id='exportForm:exportBodymapRight']").height(BM_HEIGHT * exportBodymapRatio);
	$("[id='exportForm:exportBodymapRight']").css("left", BM_LEFT_WIDTH * exportBodymapRatio + BM_FRONT_WIDTH * exportBodymapRatio + 5 * LOCATION_SPACE + 2 * BETWEEN_LOCATION_SPACE);
	$("[id='exportForm:exportBodymapBack']").width(BM_BACK_WIDTH * exportBodymapRatio);
	$("[id='exportForm:exportBodymapBack']").height(BM_HEIGHT * exportBodymapRatio);	
	$("[id='exportForm:exportBodymapBack']").css("left", BM_LEFT_WIDTH * exportBodymapRatio + BM_FRONT_WIDTH * exportBodymapRatio + BM_RIGHT_WIDTH * exportBodymapRatio + 7 * LOCATION_SPACE + 3 * BETWEEN_LOCATION_SPACE);
	layoutExportLocationMarkers();
}

function selectAll(){
	for(var i = 0; i< widgetVars.length; i++){
		window[widgetVars[i]].check();
	}
}

function deselectAll(){
	for(var i = 0; i< widgetVars.length; i++){
		window[widgetVars[i]].uncheck();
	}
}
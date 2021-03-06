// Constants (technically they are global variables)
var RIGHT_BUTTON_WIDTH = 240; 
var HEADER_HEIGHT = 60;
var FOOTER_HEIGHT = 60;
var CAMERA_IMAGE_RATIO = 4 / 3;
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
var BM_DETAIL_HEIGHT = 4310; // height of the bodymap detail images
var TURN_BTN_WIDTH = 60; // with of the turnLeft and turnRight-Buttons
var ZOOM_OUT_BTN_WIDTH = 80; // with of the 100% (zoomOut)-Button
var ALLOCATION_MARKER_OFFSET_X = 45 /2; // x-offset for allocationMarker (widht/2) (detail view)
var ALLOCATION_MARKER_OFFSET_Y = 45 /2; // y-offset for allocationMarker (height/2) (detail view)
var LOCATION_MARKER_OFFSET_X = 8 /2; // x-offset for locationMarker (widht/2) (full bodymap view)
var LOCATION_MARKER_OFFSET_Y = 8 /2; // y-offset for locationMarker (height/2) (full bodymap view)
var ICON_TURN_HEIGHT = 60; // height of the turn left and turn right icons
var LEFT_IMAGE_BORDER = 1; // thickness of border of leftImage

// global variables
var bodymapRatio = 1; // current active ratio (zoomfactor) for full bodymap
var detailRatio = 1; // current active ratio (zoomfactor) for detail (zoomed) bodymap
var facing; // which facing of the bodymap is shown in detail (left, front, right, back)
var offsetLeft;
var offsetTop;
var newLocationX;
var newLocationY;

/*
 * when page ready or when resized the layout must be (re)calculated dynamically analyzing the available space
 */
function doLayout() {
	var innerWidth = window.innerWidth;
	var innerHeight = window.innerHeight;
	
	// LogoutButton in the top right corner
	document.getElementById('logoutButton').style.left = innerWidth - RIGHT_BUTTON_WIDTH;
	
	// images on the left side must fill the available space between header an footer
	var leftImageHeight = (innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT) / 4;
	var leftImageWidth = leftImageHeight * CAMERA_IMAGE_RATIO;
	$(".leftImage").height(leftImageHeight - 2 * LEFT_IMAGE_BORDER);
	$(".leftImage").width(leftImageWidth - 2 * LEFT_IMAGE_BORDER);
	
	// calculate available space for centerPane
	var maxCenterWidth = innerWidth - leftImageWidth;
	var maxCenterHeight = innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT;
	$("#leftColumn").width(leftImageWidth);
	$("#leftColumn").height(maxCenterHeight);
	$("#centerPane").width(maxCenterWidth);
	$("#centerPane").height(maxCenterHeight);
	$("#centerPane").css("top", 0);
	$("#centerPane").css("left", leftImageWidth);
	$("#rightColumn").height(maxCenterHeight);
	$("#rightColumn").css("left", innerWidth - RIGHT_BUTTON_WIDTH);
	$("#footer").css("top", innerHeight - FOOTER_HEIGHT);
	
	// bodymap in 4 parts must be arranged in center with space in between
	// left + front + right + back; + (8*space for locations) + 3*space between locations
	var originalBodymapWidth = BM_LEFT_WIDTH + BM_FRONT_WIDTH + BM_RIGHT_WIDTH + BM_BACK_WIDTH;
	var availableWidthForBodymap = maxCenterWidth - 8 * LOCATION_SPACE - 3 * BETWEEN_LOCATION_SPACE;
	var originalBodymapHeight = BM_HEIGHT;
	var bodymapWidthRatio = availableWidthForBodymap / originalBodymapWidth;
	var bodymapHeightRatio =  maxCenterHeight / originalBodymapHeight;
	bodymapRatio = Math.min(bodymapWidthRatio, bodymapHeightRatio);
	// offset for centering
	offsetTop = (maxCenterHeight - bodymapRatio * BM_HEIGHT) / 2;
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
	
	// bodymapDetail
	$("#turnLeftButton").height(maxCenterHeight);
	$("#turnRightButton").height(maxCenterHeight);
	$("#turnRightButton").css("left", maxCenterWidth - TURN_BTN_WIDTH);
	$("#iconTurnRightButton").css("top", maxCenterHeight / 2 - ICON_TURN_HEIGHT / 2);
	$("#iconTurnLeftButton").css("top", maxCenterHeight / 2 - ICON_TURN_HEIGHT / 2);
	$("#bodymapDetailClip").css("left" , TURN_BTN_WIDTH);
	$("#bodymapDetailClip").height(maxCenterHeight);
	$("#bodymapDetailClip").width(maxCenterWidth - 2 * TURN_BTN_WIDTH);
	$("#zoomOutButton").css("left", maxCenterWidth / 2 - ZOOM_OUT_BTN_WIDTH / 2);
	
	layoutLocationMarkers();
}

// should be called before the new position is given to backend to get the current position of the draggable
function fillParameters() {
	// save facing in form-parameter and surround it with "
	document.getElementById("allocationForm:paramFacing").value = "\"" + facing + "\"";
	// get Position of marker
	var x = Math.round($("#pin").position().left);
	var y = Math.round($("#pin").position().top);
	// adjust offset to get middle of marker
	x = x + ALLOCATION_MARKER_OFFSET_X;
	y = y + ALLOCATION_MARKER_OFFSET_Y;
	// adjust offset of detail image
	x = x - $("#bodymapDetailImage").position().left;
	y = y - $("#bodymapDetailImage").position().top;
	// adjust ratio ( zoomfactor)
	x = x / detailRatio;
	y = y / detailRatio;
	// round
	x = Math.round(x);
	y = Math.round(y);
	// save parameters in form
	document.getElementById("allocationForm:paramX").value = x;
	document.getElementById("allocationForm:paramY").value = y;
	// save the parameters in global variables
	newLocationX = x;
	newLocationY = y;
}

function createLocations() {
	for (var i = 0; i<locations.length; i++) {
		var facing = locations[i].facing;
		$("#fullBodymap").append("<img src='resources/images/positionMarker.png' id='marker"+i+facing+"' />");
		var img = $("#marker"+i+facing);
		$("#fullBodymap").append("<img src='resources/images/markerButtonNormal.png' id='square"+i+facing+"' />");
		var square = $("#square"+i+facing);
		$("#fullBodymap").append("<div id='line"+i+facing+"' class='locationConnectorLine' />");
		var line = $("#line"+i+facing);
		$("#square"+i+facing).css('position','absolute');
		$("#marker"+i+facing).css('position','absolute');
		var loc = new Location(locations[i].x, locations[i].y, img, square, line);
		locations[i].element = loc;
	}
}

// add a newly allocated location to the list
function addLocation() {
	var i = locations.length;
	var location = new Object();
	location.x = newLocationX;
	location.y = newLocationY;
	location.facing = facing;
	$("#fullBodymap").append("<img src='resources/images/positionMarker.png' id='marker"+i+facing+"' />");
	var img = $("#marker"+i+facing);
	$("#fullBodymap").append("<img src='resources/images/markerButtonNormal.png' id='square"+i+facing+"' />");
	var square = $("#square"+i+facing);
	$("#fullBodymap").append("<div id='line"+i+facing+"' class='locationConnectorLine' />");
	var line = $("#line"+i+facing);
	$("#square"+i+facing).css('position','absolute');
	$("#marker"+i+facing).css('position','absolute');
	var loc = new Location(location.x, location.y, img, square, line);
	location.element = loc;
	locations.push(location);
}


// Places the location markers at the right coordinates
function layoutLocationMarkers(){
	for(var i =0; i<locations.length; i++){
		var loc = locations[i].element;
		var offsetSide = 0;
		var bodymapWidth = 0; // width of the bodymap image depending of facing
		var fullToDetailRatio = 1; // ratio of zoomed detail image to normalscale full bodymap image
		switch (locations[i].facing) {
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

// 
function animateLatestLocation() {
	var marker = locations[locations.length - 1].element.squareElement;
	marker.animate({opacity:0.2}, 500);
	marker.animate({opacity:1.0}, 500);
	marker.animate({opacity:0.2}, 500);
	marker.animate({opacity:1.0}, 500);
}

// TODO old version -> must be adapted to new version
function turnPreviousBodymapDetail() {
	var detailImg = $("#centerBackground").attr("src");
	switch (detailImg) {
	case "images/bodymapHeadBack.png":
		$("#centerBackground").attr("src", "images/bodymapHeadLeft.png");
		break;
	case "images/bodymapHeadLeft.png":
		$("#centerBackground").attr("src", "images/bodymapHeadFront.png");
		break;
	case "images/bodymapHeadFront.png":
		$("#centerBackground").attr("src", "images/bodymapHeadRight.png");
		break;
	case "images/bodymapHeadRight.png":
		$("#centerBackground").attr("src", "images/bodymapHeadBack.png");
		break;
	case "images/bodymapTorsoBack.png":
		$("#centerBackground").attr("src", "images/bodymapTorsoLeft.png");
		break;
	case "images/bodymapTorsoLeft.png":
		$("#centerBackground").attr("src", "images/bodymapTorsoFront.png");
		break;
	case "images/bodymapTorsoFront.png":
		$("#centerBackground").attr("src", "images/bodymapTorsoRight.png");
		break;
	case "images/bodymapTorsoRight.png":
		$("#centerBackground").attr("src", "images/bodymapTorsoBack.png");
		break;
	case "images/bodymapHipBack.png":
		$("#centerBackground").attr("src", "images/bodymapHipLeft.png");
		break;
	case "images/bodymapHipLeft.png":
		$("#centerBackground").attr("src", "images/bodymapHipFront.png");
		break;
	case "images/bodymapHipFront.png":
		$("#centerBackground").attr("src", "images/bodymapHipRight.png");
		break;
	case "images/bodymapHipRight.png":
		$("#centerBackground").attr("src", "images/bodymapHipBack.png");
		break;
	case "images/bodymapLegsBack.png":
		$("#centerBackground").attr("src", "images/bodymapLegsLeft.png");
		break;
	case "images/bodymapLegsLeft.png":
		$("#centerBackground").attr("src", "images/bodymapLegsFront.png");
		break;
	case "images/bodymapLegsFront.png":
		$("#centerBackground").attr("src", "images/bodymapLegsRight.png");
		break;
	case "images/bodymapLegsRight.png":
		$("#centerBackground").attr("src", "images/bodymapLegsBack.png");
		break;

	default:
		break;
	}
}

function showBodymapDetail(face, e, offset) {
	var orgDetailWidth = 0; // original width of the image part of the detail/zoomed bodymap
	var orgFullPartWidth = 0; // original width of the image part of the full bodymap
	facing = face;
	// FIXME Gender must be dynamic according to current patient
	switch (face) {
	case "left":
		$("#bodymapDetailImage").attr("src", "resources/images/bodymapFemaleLeftLarge.png");
		orgDetailWidth = BM_LEFT_DETAIL_WIDTH;
		orgFullPartWidth = BM_LEFT_WIDTH;
		break;
	case "front":
		$("#bodymapDetailImage").attr("src", "resources/images/bodymapFemaleFrontLarge.png");
		orgDetailWidth = BM_FRONT_DETAIL_WIDTH;
		orgFullPartWidth = BM_FRONT_WIDTH;
		break;
	case "right":
		$("#bodymapDetailImage").attr("src", "resources/images/bodymapFemaleRightLarge.png");
		orgDetailWidth = BM_RIGHT_DETAIL_WIDTH;
		orgFullPartWidth = BM_RIGHT_WIDTH;
		break;
	case "back":
		$("#bodymapDetailImage").attr("src", "resources/images/bodymapFemaleBackLarge.png");
		orgDetailWidth = BM_BACK_DETAIL_WIDTH;
		orgFullPartWidth = BM_BACK_WIDTH;
		break;
	default:
	}
	
	// calculate zoomfactor of detail
	// fixed version according to Styleguide = 650% of fullBodymap
	detailRatio = bodymapRatio * 6.5 * .2; // factor to adjust already zoomed detail images
	var detailWidth = orgDetailWidth * detailRatio;
	var detailHeight = BM_DETAIL_HEIGHT * detailRatio;
	$("#bodymapDetailImage").width(detailWidth);
	$("#bodymapDetailImage").height(detailHeight);
	// Click Position coming from fullBodymap
	var x = e.clientX - offset.left;
	var y = e.clientY - offset.top;
	// x,y relative (center of image would be 0.5, 0.5)
	var relX = x / (orgFullPartWidth * bodymapRatio);
	var relY = y / (BM_HEIGHT * bodymapRatio);
	// point to become new center
	var centerX = (relX * orgDetailWidth) * detailRatio;
	var centerY = (relY * BM_DETAIL_HEIGHT) * detailRatio;
	// offset for image
	var offsetX = $("#bodymapDetailClip").width() / 2 - centerX;
	var offsetY = $("#bodymapDetailClip").height() / 2 - centerY;
	// set offset
	$("#bodymapDetailImage").css("left", offsetX);
	$("#bodymapDetailImage").css("top", offsetY);
	// setting draggable in center with offste-adjustment
	$("#pin").css("left", $("#bodymapDetailClip").width() / 2 - ALLOCATION_MARKER_OFFSET_X);
	$("#pin").css("top", $("#bodymapDetailClip").height() / 2 - ALLOCATION_MARKER_OFFSET_Y);

	// switching from full bodymap to detail view
	$("#bodymapDetail").show();
	$("#fullBodymap").hide();
}

// switching back from detail view to full bodymap view (100%)
function showFullBodymap() {
	$("#bodymapDetail").hide();
	$("#fullBodymap").show();
}

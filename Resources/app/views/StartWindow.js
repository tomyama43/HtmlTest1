var _callbacks;

function StartWindow(callback) {
	_callbacks = callback;
	
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	if(winWidth > 728){
		winWidth = 728;
	}

	var win = Ti.UI.createWindow({
		fullscreen: true
		, width: winWidth
		// exitOnClose:false
	});
	var container = Ti.UI.createView({
		backgroundImage: '/images/top.png'
	});
	
	win.add(container);
	return win;
}

module.exports = StartWindow;

var _callbacks, _dynoIndex, _win, _container, _buttonList, _baseSeq = [];
var _cnt;
var nextButton;

function AnswerWindow(callback, dynoIndex, cnt, baseSeq) {
	_callbacks = callback;
	_dynoIndex = dynoIndex;
	_baseSeq = baseSeq;
	_cnt = cnt;
	
	var dynoList = require('/data/data').data.dynos;
	var q_num = dynoList.length; //問題数
	//var useDyno = dynoList[_dynoIndex];
	var _questionNo = _baseSeq[_dynoIndex];
	var useDyno = dynoList[_questionNo];
	
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	if(winWidth > 728){
		winWidth = 728;
	}
	
	//解像度によって、フォントサイズを変更する
	var questionFontNum;
	if(winWidth > 640){
		questionFontNum = 30;
	} else if(winWidth > 480){
		questionFontNum = 24;
	} else{
		questionFontNum = 20;
	}
	
	_win = Ti.UI.createWindow({
		fullscreen: true
		, width: winWidth
		// exitOnClose:false
	});
	_container = Ti.UI.createScrollView({
		backgroundColor: '#ffdfcc',
		layout: 'vertical',
		contentWidth: 'auto',
		contentHeight: 'auto',
		width: winWidth
	});
	
	var dynoNameLabel = Ti.UI.createLabel({
		text: useDyno.name,
		backgroundColor: '#444',
		color: '#FFF',
		width: Ti.UI.FILL,
		height: '50dp',
		textAlign: 'center',
		font: {fontSize:questionFontNum ,fontWeight:'bold'},
	});
	_container.add(dynoNameLabel);
	/*
	var dynoImage = Ti.UI.createImageView({
		image: useDyno.image,
		width: '90%',
		top: '2dp'
	});
	_container.add(dynoImage);
	*/
	var seNameTitleLabel = Ti.UI.createLabel({
		text: 'タイプ',
		backgroundColor: '#444',
		color: '#FFF',
		width: '90%',
		font: {fontSize:questionFontNum },
		top: '2dp'
	});
	_container.add(seNameTitleLabel);
	var seNameLabel = Ti.UI.createLabel({
		text: useDyno.sename,
		color: '#000',
		width: '90%',
		font: {fontSize:questionFontNum },
		top: '2dp'
	});
	_container.add(seNameLabel);
	
	var descTitleLabel = Ti.UI.createLabel({
		text: '概説',
		backgroundColor: '#444',
		color: '#FFF',
		width: '90%',
		font: {fontSize:questionFontNum },
		top: '8dp'
	});
	_container.add(descTitleLabel);
	var descLabel = Ti.UI.createLabel({
		text: useDyno.description,
		color: '#000',
		width: '90%',
		height: Ti.UI.SIZE,
		font: {fontSize:questionFontNum },
		top: '2dp'
	});
	_container.add(descLabel);
	/*
	var mapLabel = Ti.UI.createLabel({
		text: 'マップ',
		backgroundColor: '#444',
		color: '#FFF',
		width: '85%',
		top: '8dp'
	});
	_container.add(mapLabel);
	var mapImage = Ti.UI.createImageView({
		image: useDyno.map_image,
		width: '90%',
		top: '2dp'
	});
	_container.add(mapImage);
	*/
	if((q_num - 1) > dynoIndex){
		btnName = '次のタグへ';
	} else{
		btnName = '結果表示';
	}
	nextButton = Ti.UI.createButton({
		title: btnName,
		width: '90%',
		height: '50dp',
		top: '10dp',
		bottom: '10dp',
		font: {fontSize:questionFontNum },
//		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius:6,
		/*
		backgroundGradient:{
			type:'linear',
			colors:['#444','#555'],
			startPoint:{x:0,y:0},
			endPoint:{x:2,y:50},
			backFillStart:false
		},
		*/
		backgroundColor:'#aaa',
		borderWidth:1,
		borderColor:'#666'
	});
		
	nextButton.addEventListener('click', _nextButtonClickHandler);
	_container.add(nextButton);

// admob by mz 2013-04-10 広告枠定義
//	Ti.Admob = require('ti.admob');
//	var adview = Ti.Admob.createView({ ...
	var ad;
	if(Ti.Platform.osname == "mobileweb"){
		ad = Ti.UI.createWebView({
		    backgroundColor: '#fff',
		    width: 728,
		    height: 90
		});
//		ad.html = '<html><body><div style="margin:0;padding:0"><script type="text/javascript">google_ad_client = "ca-pub-3229884950606426";google_ad_slot = "3928170414";google_ad_width=728;google_ad_height=90;</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script></div></body></html>';
	}else{
		ad = Ti.UI.createLabel({
			width:320,
			height:50,
			top: 1,
	//		text: '広告',
			backgroundColor: "#ffdfcc"
	//		, adBackgroundColor:'black',
	//	    publisherId:'hogehoge'          // API key wo ireru.
		});
	}
	_container.add(ad);
// end of admob
	_win.add(_container);
	return _win;
}

function _nextButtonClickHandler(e) {
	nextButton.backgroundColor='#666';
	_callbacks.next(_dynoIndex, _cnt, _baseSeq);
}

module.exports = AnswerWindow;

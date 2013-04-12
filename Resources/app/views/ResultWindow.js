var _callbacks, _dynoIndex, _win, _container, _buttonList = [];
var _cnt;
var nextButton, fbButton;

//function ResultWindow(callback, dynoIndex) {
function ResultWindow(callback, dynoIndex, cnt) {
	
	_callbacks = callback;
	_dynoIndex = dynoIndex;
	_cnt = cnt;
	//Ti.API.info('Result:'+_cnt);
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
		backgroundColor: '#FF6600',
		layout: 'vertical',
		contentWidth: 'auto',
		contentHeight: 'auto',
		width: winWidth
	});

	//正解数の表示
	var scoreLabel = Ti.UI.createLabel({
		text: parseInt(_dynoIndex) + '問中' + parseInt(_cnt) + '問正解です',
		width: '90%',
		height: Ti.UI.SIZE,
		font: {fontSize:questionFontNum},
		top: '2dp'
	});
	_container.add(scoreLabel);
	
	var rate = _cnt / _dynoIndex; //正解率の計算
	
	//成績別メッセージの作成
	var rank;
	if(rate >= 0.8){
		rank = 'よく出来ました！';
	} else if (rate >= 0.6) {
		rank = 'まあまあです';
	} else {
		rank = 'もっと頑張りましょう';
	}
	
	//成績別メッセージの表示
	var rankLabel = Ti.UI.createLabel({
		text: rank,
		width: '90%',
		height: Ti.UI.SIZE,
		font: {fontSize:questionFontNum},
		top: '2dp'
	});
	_container.add(rankLabel);
	
	nextButton = Ti.UI.createButton({
		title: 'もう一度挑戦する',
		width: '90%',
		height: '50dp',
		top: '10dp',
		bottom: '10dp',
		
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
	
	Ti.Facebook.appid = '365516906890628';
	Ti.Facebook.permissions = ['publish_stream'];
	
	fbButton = Ti.Facebook.createLoginButton();
	_container.add(fbButton);
	
	fbPostButton = Ti.UI.createButton({
		title: 'facebookへ投稿',
		width: '90%',
		height: '50dp',
		top: '10dp',
		bottom: '10dp',
		
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
	
	fbPostButton.addEventListener('click', _fbPostButtonClickHandler);
	_container.add(fbPostButton);

	_win.add(_container);
	return _win;
}

function _nextButtonClickHandler(e) {
	nextButton.backgroundColor='#666';
	_callbacks.result();
}

function _fbPostButtonClickHandler(e) {
	fbPostButton.backgroundColor='#666';
	Ti.Facebook.requestWithGraphPath(
		'me/feed',
		{
			message: "HtmlTest1からPOSTしてみました"
		},
		"POST",
		function(e){
			if(e.success){
				alert("Success" + e.result);
			}
		}
	);
}
module.exports = ResultWindow;

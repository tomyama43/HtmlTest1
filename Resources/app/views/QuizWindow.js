var _callbacks, _dynoIndex, _win, _container, _buttonList, _cnt, _baseSeq, _questionNo;
var cnt;
var button0, button1, button2;
var baseSeq;

function QuizWindow(callback, dynoIndex, cnt, baseSeq) {
	_callbacks = callback;
	_dynoIndex = dynoIndex; //現在の問題数
	_buttonList = [];
	_cnt = cnt; //正解数
	_baseSeq = baseSeq; //出題順の配列
	
	_questionNo = _baseSeq[_dynoIndex]; //問題番号の取得
	
	var dynoList = require('/data/data').data.dynos; //問題文の配列を取得
	//var useDyno = dynoList[_dynoIndex];
	var useDyno = dynoList[_questionNo]; //問題文の配列から、指定の問題を取得
	/*
	if(_dynoIndex == 0){
		cnt = 0;
	}
	*/
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	if(winWidth > 728){
		winWidth = 728;
	}
	_win = Ti.UI.createWindow({
		fullscreen: true
		, width: winWidth
		// exitOnClose:false
	});
	_container = Ti.UI.createView({
		backgroundColor: '#ffefe5'
//mz
		, layout:'vertical'
		, width: winWidth
	});
	
//mz	var top = 5;
	/*
	var dynoImage = Ti.UI.createImageView({
		image: useDyno.image,
		width: '90%',
		top: top + 'dp'
	});
	_container.add(dynoImage);
	*/
	/*
	var questionTitleLabel = Ti.UI.createLabel({
		text: '問題',
		backgroundColor: '#444',
		color: '#FFF',
		width: '90%',
		top: '2dp'
	});
	_container.add(questionTitleLabel);
	*/
	
	//解像度によって、フォントサイズを変更する
	var questionFontNum;
	if(winWidth > 640){
		questionFontNum = 30;
	} else if(winWidth > 480){
		questionFontNum = 24;
	} else{
		questionFontNum = 20;
	}
	
	var numberLabel = Ti.UI.createLabel({
		// id: 'numberLabel',
		text: '第' + (_dynoIndex + 1) + '問　（'+ dynoList.length + '問中)' ,
		color: '#000',
		width: '90%',
		font: {fontSize:questionFontNum}
		
//mz		,top: '2dp'
	});
	_container.add(numberLabel);
	
	var questionLabel = Ti.UI.createLabel({
		text: '問題：' + useDyno.question,
		color: '#000',
		width: '90%',
		font: {fontSize:questionFontNum}
//mz		,top: '2dp'
	});
	_container.add(questionLabel);
	
	//top += 250 + 25;
//mz	top += 70;

	var candidateIndex, candidateIndexList = [];
	for (var i = 0; i < 3; i++) {
		while (true) {
			candidateIndex = Math.floor(Math.random() * dynoList.length);
			// if (candidateIndexList.indexOf(candidateIndex) === -1 && candidateIndex !== _dynoIndex) {
			if (candidateIndexList.indexOf(candidateIndex) === -1 && candidateIndex !== _questionNo) {	
				candidateIndexList.push(candidateIndex);
				break;
			}
		}
	}
	
	// candidateIndexList[Math.floor(Math.random() * candidateIndexList.length)] = _dynoIndex;
	candidateIndexList[Math.floor(Math.random() * candidateIndexList.length)] = _questionNo;
	/*
	var button;
	for (var i = 0; i < candidateIndexList.length; i++) {
		button = Ti.UI.createButton({
			title: dynoList[candidateIndexList[i]].name,
			width: '90%',
			height: '40dp',
			top: top + 'dp',
			
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius:6,
			font:{fontSize:20},
			backgroundGradient:{
				type:'linear',
				colors:['#444','#455'],
				startPoint:{x:0,y:0},
				endPoint:{x:2,y:50},
				backFillStart:false
			},
			borderWidth:1,
			borderColor:'#666'
		});
		button.addEventListener('click', _buttonClickHandler);
		_container.add(button);
		_buttonList.push(button);
		
		top += 50;
	}
	*/
	button0 = Ti.UI.createButton({
			title: dynoList[candidateIndexList[0]].name,
			width: '90%',
			height: '40dp',
//mz			top: top + 'dp',
			top:'5dp',
//			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius:6,
			font:{fontSize:questionFontNum},
			/*
			backgroundGradient:{
				type:'linear',
				colors:['#444','#455'],
				startPoint:{x:0,y:0},
				endPoint:{x:2,y:50},
				backFillStart:false
			},
			*/
			backgroundColor:'#aaa',
			borderWidth:1,
			borderColor:'#666'
		});
		button0.addEventListener('click', _buttonClickHandler0);
		_container.add(button0);
		_buttonList.push(button0);
		
//mz		top += 50;
		
	button1 = Ti.UI.createButton({
			title: dynoList[candidateIndexList[1]].name,
			width: '90%',
			height: '40dp',
//mz			top: top + 'dp',
			top:'5dp',
			
//			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius:6,
			font:{fontSize:questionFontNum},
			/*
			backgroundGradient:{
				type:'linear',
				colors:['#444','#455'],
				startPoint:{x:0,y:0},
				endPoint:{x:2,y:50},
				backFillStart:false
			},
			*/
			backgroundColor:'#aaa',
			borderWidth:1,
			borderColor:'#666'
		});
		button1.addEventListener('click', _buttonClickHandler1);
		_container.add(button1);
		_buttonList.push(button1);
		
//mz		top += 50;
		
	button2 = Ti.UI.createButton({
			title: dynoList[candidateIndexList[2]].name,
			width: '90%',
			height: '40dp',
//mz			top: top + 'dp',
			top: '5dp',
			
//			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius:6,
			font:{fontSize:questionFontNum},
			/*
			backgroundGradient:{
				type:'linear',
				colors:['#444','#455'],
				startPoint:{x:0,y:0},
				endPoint:{x:2,y:50},
				backFillStart:false
			},
			*/
			backgroundColor:'#aaa',
			borderWidth:1,
			borderColor:'#666'
		});
		button2.addEventListener('click', _buttonClickHandler2);
		_container.add(button2);
		_buttonList.push(button2);
		
//mz		top += 50;
	
	_win.add(_container);
	return _win;
}
/*
function _buttonClickHandler(e) {
	var dynoList = require('/data/data').data.dynos;
	var correct = dynoList[_dynoIndex].name;
	var imageFile, imageView;
	Ti.API.info(e.);
	for (var i = 0; i < _buttonList.length; i++) {
		if (correct === _buttonList[i].title) {
			imageFile = '/images/ok.png';
		} else {
			imageFile = '/images/ng.png';
		}
		imageView = Ti.UI.createImageView({
			image: imageFile,
			top: _buttonList[i].top,
			left: _buttonList[i].left,
			height: '40dp'
		});
		_container.add(imageView);
	}
	
	_callbacks.answer(_dynoIndex);
}
*/
function _buttonClickHandler0(e) {
	var dynoList = require('/data/data').data.dynos;
	//var correct = dynoList[_dynoIndex].name;
	var correct = dynoList[_questionNo].name;
	var imageFile, imageView;
	if(correct === _buttonList[0].title) {
		_cnt++;
		//正解だったら、バイブレーター起動
    	onVibrater();
	}
	var topPosition = ['-130dp','5dp','5dp'];
	for (var i = 0; i < _buttonList.length; i++) {
		if (correct === _buttonList[i].title) {
			imageFile = '/images/ok.png';
		} else {
			imageFile = '/images/ng.png';
		}
		imageView = Ti.UI.createImageView({
			image: imageFile,
//			top: _buttonList[i].top,
			top: topPosition[i],
			left: _buttonList[i].left,
			height: '40dp'
		});
		_container.add(imageView);
	}
	button0.backgroundColor='#666';
	
	// _callbacks.answer(_dynoIndex, cnt, );
	_callbacks.answer(_dynoIndex, _cnt, _baseSeq);
}

function _buttonClickHandler1(e) {
	var dynoList = require('/data/data').data.dynos;
	//var correct = dynoList[_dynoIndex].name;
	var correct = dynoList[_questionNo].name;
	var imageFile, imageView;
	if(correct === _buttonList[1].title) {
		_cnt++;
		//正解だったら、バイブレーター起動
    	onVibrater();
	}
	var topPosition = ['-130dp','5dp','5dp'];
	for (var i = 0; i < _buttonList.length; i++) {
		if (correct === _buttonList[i].title) {
			imageFile = '/images/ok.png';
		} else {
			imageFile = '/images/ng.png';
		}
		imageView = Ti.UI.createImageView({
			image: imageFile,
//			top: _buttonList[i].top,
			top: topPosition[i],
			left: _buttonList[i].left,
			height: '40dp'
		});
		_container.add(imageView);
	}
	button1.backgroundColor='#666';
	
	// _callbacks.answer(_dynoIndex, cnt, );
	_callbacks.answer(_dynoIndex, _cnt, _baseSeq);
}

function _buttonClickHandler2(e) {
	var dynoList = require('/data/data').data.dynos;
	//var correct = dynoList[_dynoIndex].name;
	var correct = dynoList[_questionNo].name;
	var imageFile, imageView;
	if(correct === _buttonList[2].title) {
		_cnt++;
		//正解だったら、バイブレーター起動
    	onVibrater();
	}
	var topPosition = ['-130dp','5dp','5dp'];
	for (var i = 0; i < _buttonList.length; i++) {
		if (correct === _buttonList[i].title) {
			imageFile = '/images/ok.png';
		} else {
			imageFile = '/images/ng.png';
		}
		imageView = Ti.UI.createImageView({
			image: imageFile,
//			top: _buttonList[i].top,
			top: topPosition[i],
			left: _buttonList[i].left,
			height: '40dp'
		});
		_container.add(imageView);
	}
	button2.backgroundColor='#666';
	
	// _callbacks.answer(_dynoIndex, cnt, );
	_callbacks.answer(_dynoIndex, _cnt, _baseSeq);
}

function onVibrater(){
	vibtimer = setTimeout(function(){
        	Titanium.Media.vibrate();    
    }, 200);
}

module.exports = QuizWindow;

/**
 * MAIN
 */
var _startWin, _quizWin, _answerWin, _resurtWin;

function main() {
	Ti.UI.setBackgroundColor('#000');
	require('/app/globals').init();
	
	_startWin = new (require('/app/views/StartWindow'))({
		start: _startQuiz
	});
	_startWin.open();
	setTimeout(_startQuiz, 5000);
}

function _startQuiz() {
	var callbacks = {
		answer: _showAnswer
	};
	
	var dynoList = require('/data/data').data.dynos;
	var q_num = dynoList.length; //問題数
	var baseSeq = [];  //出題順を格納する配列
	for(i = 0; i < q_num; i++){
		baseSeq[i] = i;
	}
	
	//配列の大きさに合わせて適当な回数繰り返す
	for ( i = 0 ; i < 50 ; i++ )
	{
  		//0～問題数までの乱数を作成し、変数Rndに格納する
  		var rnd = Math.floor(Math.random()*q_num);
  
 	 	var str1 = baseSeq[0];    //配列baseSeqの最初の要素
		var str2 = baseSeq[rnd];  //配列baseSeqの乱数で決定した要素

  		//配列の各要素を入れ替え、出題順をランダムにする
  		baseSeq[rnd] = str1;
  		baseSeq[0]   = str2;
	}
	
	//_quizWin = new (require('/app/views/QuizWindow'))(callbacks, 0, baseSeq);
	_quizWin = new (require('/app/views/QuizWindow'))(callbacks, 0, 0, baseSeq);
	if(Ti.Platform.osname == 'iPhone'){
		_quizWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	} else{
		_quizWin.open();
	}
	_startWin.close();
}

//function _showAnswer(dynoIndex, cnt) {
function _showAnswer(dynoIndex, cnt, baseSeq) {
	setTimeout(function() {
		var callbacks = {
			next: _nextQuiz
		};
		_answerWin = new (require('/app/views/AnswerWindow'))(callbacks, dynoIndex, cnt, baseSeq);
		if(Ti.Platform.osname == 'iPhone'){
			_answerWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		} else{
			_answerWin.open();
		}
		_quizWin.close();
	}, 1000);
}

function _nextQuiz(dynoIndex, cnt, baseSeq) {
	var callbacks = {
		answer: _showAnswer
	};
	
	dynoIndex++;
	
	if (require('/data/data').data.dynos.length > dynoIndex) {
		_quizWin = new (require('/app/views/QuizWindow'))(callbacks, dynoIndex, cnt, baseSeq);
		if(Ti.Platform.osname == 'iPhone'){
			_quizWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		} else{
			_quizWin.open();
		}
		_answerWin.close();
	}
	/*
	else {
		_startWin = new (require('/app/views/StartWindow'))({
			start: _startQuiz
		});
		_startWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		setTimeout(_startQuiz, 1500);
	}*/
	else {
		var callbacks = {
			result: _showResult
		};
		_resultWin = new (require('/app/views/ResultWindow'))(callbacks, dynoIndex, cnt);
		if(Ti.Platform.osname == 'iPhone'){
			_resultWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		} else{
			_resultWin.open();
		}
		_answerWin.close();
	}
}

function _showResult(){
	_startWin = new (require('/app/views/StartWindow'))({
		start: _startQuiz
	});
	if(Ti.Platform.osname == 'iPhone'){
		_startWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	} else{
		_startWin.open();
	}
	setTimeout(_startQuiz, 1500);
}

/**
 * Exports
 */
exports.main = main;

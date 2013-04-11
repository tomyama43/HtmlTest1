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
	_quizWin = new (require('/app/views/QuizWindow'))(callbacks, 0);
	if(Ti.Platform.osname == 'iPhone'){
		_quizWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	} else{
		_quizWin.open();
	}
	_startWin.close();
}

function _showAnswer(dynoIndex, cnt) {
	setTimeout(function() {
		var callbacks = {
			next: _nextQuiz
		};
		_answerWin = new (require('/app/views/AnswerWindow'))(callbacks, dynoIndex, cnt);
		if(Ti.Platform.osname == 'iPhone'){
			_answerWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		} else{
			_answerWin.open();
		}
		_quizWin.close();
	}, 1000);
}

function _nextQuiz(dynoIndex, cnt) {
	var callbacks = {
		answer: _showAnswer
	};
	
	dynoIndex++;
	
	if (require('/data/data').data.dynos.length > dynoIndex) {
		_quizWin = new (require('/app/views/QuizWindow'))(callbacks, dynoIndex, cnt);
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

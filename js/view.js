var render = {

	// THIS FUNCTION IS FOR RENDERING THE HOMEPAGE
	homeView: function() {

		var homeElement = '';
			homeElement += '<div class="container-fluid intro-header visible-xs">';
			homeElement += '<div class="container">';
			homeElement += '<div class="row">';
			homeElement += '<div class="col-xs-12">';
			homeElement += '<div class="intro-message">';
			homeElement += '<h1>Find New Hobby Friends</h1>';
			homeElement += '<h3>This app lists a series of local meetup groups in your area based on your personality type.</h3>';
			homeElement += '<div class="form-group">';
  			homeElement += '<label for="zip">Enter your zip code</label>';
  			homeElement += '<input type="text" class="form-control" id="user-zip">';
  			homeElement += '<button class="btn btn-default btn-lg start-btn">Start Now</button></div>';
			homeElement += '</div></div></div></div></div>';

			homeElement += '<div class="container-fluid intro-header hidden-xs">';
			homeElement += '<div class="container">';
			homeElement += '<div class="row">';
			homeElement += '<div class="col-xs-12">';
			homeElement += '<div class="intro-message">';
			homeElement += '<h1>Find New Hobby Friends</h1>';
			homeElement += '<h3>This app lists a series of local meetup groups in your area based on your personality type.</h3>';
			homeElement += '<div class="form-group">';
  			homeElement += '<label for="zip">Enter your zip code</label>';
  			homeElement += '<input type="text" class="form-control" id="user-zip">';
  			homeElement += '<button class="btn btn-default btn-lg start-btn">Start Now</button></div>';
			homeElement += '</div></div></div></div></div>';
		$('.homepage').html(homeElement);

		$('.start-btn').on('click', function(e) {
			e.preventDefault();
			state.initializeZip();
			$('.homepage').empty();
			state.startCount();
			render.quizView( state.count() );
		});
	}, 

	// THIS FUNCTION IS FOR RENDERING THE QUIZ
	quizView: function( count ) {
		var quizElement = '';
		switch( true ) {
			case ( count < 4 ):
				quizElement += '<p>' + model.quizObj["EQ" + count] + '</p>';
				quizElement += '<button class="quiz-btn" question-set="E">' + model.quizObj["EA" + count][0] + '</button>';
				quizElement += '<button class="quiz-btn" question-set="I">' + model.quizObj["EA" + count][1] + '</button>';
			break;
			case ( count < 7 ):
				quizElement += '<p>' + model.quizObj["SQ" + count] + '</p>';
				quizElement += '<button class="quiz-btn" question-set="S">' + model.quizObj["SA" + count][0] + '</button>';
				quizElement += '<button class="quiz-btn" question-set="N">' + model.quizObj["SA" + count][1] + '</button>';
			break;
			case ( count < 10 ):
				quizElement += '<p>' + model.quizObj["FQ" + count] + '</p>';
				quizElement += '<button class="quiz-btn" question-set="F">' + model.quizObj["FA" + count][0] + '</button>';
				quizElement += '<button class="quiz-btn" question-set="T">' + model.quizObj["FA" + count][1] + '</button>';
			break;
			case ( count < 13 ):
				quizElement += '<p>' + model.quizObj["PQ" + count] + '</p>';
				quizElement += '<button class="quiz-btn" question-set="P">' + model.quizObj["PA" + count][0] + '</button>';
				quizElement += '<button class="quiz-btn" question-set="J">' + model.quizObj["PA" + count][1] + '</button>';
			break;
			default:
			app.setMBPT( state.mbtiObj() );
		}
		$('.quizpage').html(quizElement);

		$('.quiz-btn').on('click', function(e) {
			e.preventDefault();

			var answerType = $(this).attr('question-set');
			app.passQuizValues( answerType );

			state.incrementCount();
			render.quizView( state.count() );
		});
	}, 

	meetupData: function( data, mbti ) {
		var resultElement = '';

		if ( typeof(data)=="object" && typeof(data.message)=="undefined" && typeof(data.error)=="undefined") { 
			resultElement += '<div class="results-header">';
			resultElement += '<p>Based on your personality type of '+ mbti;
			resultElement += ', a good hobby for you may be ' + model.categories[mbti][1] + '.';
			resultElement += ' Below, we&#039;ve included groups in your local area related to your hobby. Enjoy!</p></div>';
			resultElement += '<button class="reset">Start Over</button>';
			if( data.results.length === 0 ) { 
				resultElement += '<p>Right now, no hobby groups for ' + model.categories[mbti][1] + ' are set up in your area.</p>';
			} else {
				for (var i = 0; i < data.results.length; i++) {
					resultElement += '<h3>' + data.results[i].group.name + '</h3>';
					resultElement += '<div class="results-descriptions">' + data.results[i].description + '</div>';
					resultElement += '<p><a target="_blank" href="'+ data.results[i].event_url +'">Click Here</a> to to this event&#039;s page</p>'
					resultElement += '<hr>';
				}
			}
		}
	    else {
	      resultElement += '<p>We were unable to get any data results based on your search criteria.</p>';
		}
		$('.resultspage').html(resultElement);
		$('.reset').on('click',function(e) {
			e.preventDefault();
			app.resetApp();
		});
	}

};
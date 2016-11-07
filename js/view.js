var render = {

	// THIS FUNCTION IS FOR RENDERING THE HOMEPAGE
	homeView: function() {

		var homeElement = '';
			homeElement += '<div class="home-text">';
			homeElement += '<h1>Find New Hobby Friends</h1>';
			homeElement += '<h3>This app lists a series of local meetup groups in your area based on your personality type.</h3>';
			homeElement += '<div class="form-group">';
			homeElement += '<label for="zip" class="zip-label">Enter your zip code</label>';
			homeElement += '<input type="text" class="form-control" id="user-zip">';
			homeElement += '<button class="start-btn">Start Now</button>';
			homeElement += '</div></div>';
		$('.homepage').html(homeElement);

		$('.start-btn').on('click', function(e) {
			e.preventDefault();
			state.initializeZip();
		});
		$( "#user-zip" ).keypress(function( event ) {
			if ( event.which == 13 ) {
 				event.preventDefault();
 				state.initializeZip();
			}
		});
	}, 

	// THIS FUNCTION IS FOR RENDERING THE QUIZ
	quizView: function( count ) {
		$('body').css({'background-image': 'none', 'margin-top': '7vh', 'background-color': '#5ec4c2'});
		var quizElement = '';
		switch( true ) {
			case ( count < 4 ):
				quizElement += '<main class="row">';
				quizElement += '<div class="col main-question">' + model.quizObj["EQ" + count] + '</div></main>';
				quizElement += '<section class="row">';
				quizElement += '<div class="col section-answers">';
				quizElement += '<button class="quiz-btn" question-set="E">' + model.quizObj["EA" + count][0] + '</button></div>';
				quizElement += '<div class="col section-answers">';
				quizElement += '<button class="quiz-btn" question-set="I">' + model.quizObj["EA" + count][1] + '</button></div>';
			break;
			case ( count < 7 ):
				quizElement += '<main class="row">';
				quizElement += '<div class="col main-question">' + model.quizObj["SQ" + count] + '</div></main>';
				quizElement += '<section class="row">';
				quizElement += '<div class="col section-answers">';
				quizElement += '<button class="quiz-btn" question-set="S">' + model.quizObj["SA" + count][0] + '</button></div>';
				quizElement += '<div class="col section-answers">';
				quizElement += '<button class="quiz-btn" question-set="N">' + model.quizObj["SA" + count][1] + '</button></div>';
			break;
			case ( count < 10 ):
				quizElement += '<main class="row">';
				quizElement += '<div class="col main-question">' + model.quizObj["FQ" + count] + '</div></main>';
				quizElement += '<section class="row">';
				quizElement += '<div class="col section-answers">';
				quizElement += '<button class="quiz-btn" question-set="F">' + model.quizObj["FA" + count][0] + '</button></div>';
				quizElement += '<div class="col section-answers">';
				quizElement += '<button class="quiz-btn" question-set="T">' + model.quizObj["FA" + count][1] + '</button></div>';
			break;
			case ( count < 13 ):
				quizElement += '<main class="row">';
				quizElement += '<div class="col main-question">' + model.quizObj["PQ" + count] + '</div></main>';
				quizElement += '<section class="row">';
				quizElement += '<div class="col section-answers">';
				quizElement += '<button class="quiz-btn" question-set="P">' + model.quizObj["PA" + count][0] + '</button></div>';
				quizElement += '<div class="col section-answers">';
				quizElement += '<button class="quiz-btn" question-set="J">' + model.quizObj["PA" + count][1] + '</button></div>';
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
		$('body').css('background-color', '#FCFCFC');
		var resultElement = '';

		if ( typeof(data)=="object" && typeof(data.message)=="undefined" && typeof(data.error)=="undefined") { 
			resultElement += '<div class="results-header">';
			resultElement += '<p>Based on your personality type of '+ mbti;
			resultElement += ', a good hobby for you may be ' + model.categories[mbti][1] + '.';
			resultElement += ' Below, we&#039;ve included groups in your local area related to your hobby. Enjoy!</p></div>';
			resultElement += '<div class="results-btn"><button class="reset">Start Over</button></div>';
			if( data.results.length === 0 ) { 
				resultElement += '<p>Right now, no hobby groups for ' + model.categories[mbti][1] + ' are set up in your area.</p>';
			} else {
				for (var i = 0; i < data.results.length; i++) {
					resultElement += '<h3 class="description-titles">' + data.results[i].group.name + '</h3>';
					if ( data.results[i].description !== undefined ) {
						resultElement += '<div class="results-descriptions">' + data.results[i].description + '</div>';
					}
					resultElement += '<p class="result-link"><a target="_blank" href="'+ data.results[i].event_url +'">Click Here</a> to to this event&#039;s page</p>';
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
	},

	feedbackModal: function (title, bodyText, btnText ) {
			var modalHtml = '';
			modalHtml += '<div class="modal modal--active">';
			modalHtml += '<div class="modal__content">';
			modalHtml += '<a href="#" class="modal__close--js">';
			modalHtml += '<i class="icon icon-cross"></i></a>';
			modalHtml += '<h3 class="modal__title">'+title+'</h3>';
			modalHtml += '<p class="modal__text">'+bodyText+'</p>';
			modalHtml += '<button class="close-modal btn btn-primary">'+btnText+'</div></div></div>';
			modalHtml += '<div class="modal__overlay"></div>';
			$('div.modal-pop').append(modalHtml);

			$('.close-modal').on('click', function( ){
				$('.modal').remove();
		    	$('.modal__overlay').remove();
			});
		}

};
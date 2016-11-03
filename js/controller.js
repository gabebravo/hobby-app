var app = ( function () {


	function publicStartApp() {
		render.homeView();
	}

	// ALL THESE FUNCTIONS ARE FOR RENDERING AND PROCESSING THE QUIZ
	function assignSetValues( type ) {
		state.incrementMbti( type );
	}

	function assignMBPT( obj ) {
		var mbtiResult = '';
		( obj["E"] > obj["I"] ) ? mbtiResult += "E" : mbtiResult += "I";
		( obj["S"] > obj["N"] ) ? mbtiResult += "S" : mbtiResult += "N";
		( obj["F"] > obj["T"] ) ? mbtiResult += "F" : mbtiResult += "T";
		( obj["P"] > obj["J"] ) ? mbtiResult += "P" : mbtiResult += "J";
		app.meetupApiCall(state.zip(), model.categories[mbtiResult][0], mbtiResult);
	}

	// THESE FUNCTIONS WILL MAKE THE API CALL AND RENDER THE MEETUP RESULTS ON THE PAGE
	function meetupApiCall( zip, category, mbti, callback ) {
		$('.quizpage').empty();
		$.ajax({
		    type:"GET",
		    url: state.url() + "zip=" + zip + "&category=" + category + "&time=,1w&key=" + state.key(),
		    success: function(data) {
		      render.meetupData( data, mbti );
		    },
		    dataType: 'jsonp',
  		});
	}

	function resetApp() {
		window.location.reload();
	}

	return {
			// publicly accessable function names 
            startApp: publicStartApp,
            passQuizValues: assignSetValues,
            setMBPT: assignMBPT,
            meetupApiCall: meetupApiCall, 
            resetApp: resetApp
        };

})();

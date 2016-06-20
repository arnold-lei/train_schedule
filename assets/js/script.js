$('document').ready(function(){
	var FIRE_BASE_URL = new Firebase("https://arnoldlei-train.firebaseio.com/");

	function clock(){

		var minutes = 90;
		var now = moment();
		var future = moment().add(minutes, 'minutes');
		var time = moment().format('MMMM Do YYYY, h:mm:ss a');

		var test = moment.duration(future.diff(now)).asMinutes();

		$('.clock').html('<h2>'+time+'</h2>');
		$('.test').html('<h2>'+future+'</h2>');
		$('.test2').html('<h2>'+test+'</h2>');
		setTimeout(clock, 1000);
	}

	clock();
	    
	// $('#frequency').datepicker({
	//     format: "hh:mm:ss"
	// });  

	$('#submit').on('click', function(){
		var minutesAway;
		//the frequency and next arrival must be times
		trainName = $('#trainName').val().trim();
	  	destination = $('#destination').val().trim();
	  	nextArrival = ($('#nextArrival').val().trim());
	  	frequency = $('#frequency').val().trim();
	  	minutesAway = (Number(frequency) - Number(nextArrival)).toString();
	  	
		
		FIRE_BASE_URL.push({
			trainName: trainName,
			destination: destination,
			nextArrival: minutesAway,
			frequency: frequency,
			time: Firebase.ServerValue.TIMESTAMP,
		});

		//resets the value fields of the submit form 
		$('input').val('');
		return false;
	});


	FIRE_BASE_URL.on('child_added', function(child){


		var now = moment();
		var frequency = Number(child.val().frequency);
		var duration = moment.duration(frequency, 'minutes');
		var minutesAway = Number(child.val().nextArrival);
		var start = moment(Number(child.val().time));
		var timeTill = frequency - (now.diff(start.add(minutesAway, 'm'), 'minutes') % frequency);
		var nextTrain = moment().add(timeTill, 'minutes').format('hh:mm:ss');


    	row = $('<tr>');
	    tTrainName = $('<td>'+ child.val().trainName +'</td>');
	    tDestination = $('<td>'+ child.val().destination+'</td>');
	   	tFrequency = $('<td>'+ child.val().frequency+ '</td>');
	    tNextArrival = $('<td id="nextTrain">'+ nextTrain +'</td>');
	    tMinutesAway = $('<td id="timeTill">'+ timeTill +'</td>');
	    row.append(tTrainName, tDestination, tFrequency, tNextArrival, tMinutesAway);
	    $('tbody').append(row)

	    function update(){
		    var now = moment();
			var frequency = Number(child.val().frequency);
			var duration = moment.duration(frequency, 'minutes');
			var minutesAway = Number(child.val().nextArrival);
			var start = moment(Number(child.val().time));
			var timeTill = frequency - (now.diff(start.add(minutesAway, 'm'), 'minutes') % frequency);
			var nextTrain = moment().add(timeTill, 'minutes').format('hh:mm:ss');
		    
		    $('#nextTrain').text(nextTrain);
	    	$('#timeTill').text(timeTill);
	    	setTimeout(update, 1000);
	    };
	    update();

	});

    // $('#frequency').datepicker({
    //     format: "dd/mm/yyyy"
    // });
	
});
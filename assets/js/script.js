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

	FIRE_BASE_URL.on('child_added', function(child, prevChild){
		// var minutesAway = moment().add(child.val().minutesAway, 'minutes');
		//moment.duration(future.diff(now)).asMinutes();
		var minutesAway = moment().add(child.val().minutesAway, 'minutes');
		var now = moment();
		var timeOfArrival = moment.duration(minutesAway.diff(now));

		row = $('<tr>');
	    tTrainName = $('<td>'+ child.val().trainName +'</td>');
	    tDestination = $('<td>'+ child.val().destination+'</td>');
	    tNextArrival = $('<td>'+child.val().nextArrival +'</td>');
	    tFrequency = $('<td>'+ child.val().frequency+'</td>');
	    tMinutesAway = $('<td>'+ timeOfArrival.asMinutes() +'</td>');
	    row.append(tTrainName, tDestination, tFrequency, tNextArrival, tMinutesAway);
	    $('tbody').append(row)
	});

    // $('#frequency').datepicker({
    //     format: "dd/mm/yyyy"
    // });
	
});
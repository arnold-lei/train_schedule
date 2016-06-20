$('document').ready(function(){
	var train = new Firebase("https://arnoldlei-train.firebaseio.com/");

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

	$('#submit').on('click', function(event){
		//the frequency and next arrival must be times
		trainName = $('#trainName').val().trim();
	  	destination = $('#destination').val().trim();
	  	nextArrival = ($('#nextArrival').val().trim());
	  	frequency = $('#frequency').val().trim();
	  	var minutesAway = number(frequency) - number(nextArrival);
		
		train.push({
			trainName: trainName,
			destination: destination,
			nextArrival: minutesAway,
			frequency: frequency,
			now: moment(),
		});

		//resets the value fields of the submit form 
		$('input').val('');
		event.preventDefault();
		return false;
	});

	// train.on('child_added', function(child, prevChild){
	// 	row = $('<tr>');
	//     tTrainName = $('<td>'+ child.val().trainName +'</td>');
	//     tDestination = $('<td>'+ child.val().destination+'</td>');
	//     tNextArrival = $('<td>'+child.val().nextArrival +'</td>');
	//     tFrequency = $('<td>'+ child.val().frequency+'</td>');
	//     tMinutesAway = $('<td>'+ child.val().minutesAway+'</td>');
	//     row.append(tTrainName, tDestination, tNextArrival, tFrequency, tMinutesAway);
	//     $('tbody').append(row)
	// });

    // $('#frequency').datepicker({
    //     format: "dd/mm/yyyy"
    // });
	
});
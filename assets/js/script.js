$('document').ready(function(){
	var train = new Firebase("https://arnoldlei-train.firebaseio.com/");

	function clock(){
		var time = moment().format('MMMM Do YYYY, h:mm:ss a');
		$('.clock').html('<h2>'+time+'</h2>');
		setTimeout(clock, 1000);
	}

	clock();
	    
	// $('#frequency').datepicker({
	//     format: "hh:mm:ss"
	// });  

	$('#submit').on('click', function(){
		//the frequency and next arrival must be times
		trainName = $('#trainName').val().trim();
	  	destination = $('#destination').val().trim();
	  	nextArrival = $('#nextArrival').val().trim();
	  	if(number($('#frequency').val().trim()) > number(nextArrival)){
	  		frequency = $('#frequency').val().trim();
	  	} else {
	  		alert('the frequency must be greater than the next arrival');
	  		return;
	  	}
	  	var minutesAway = number(nextArrival) - number(frequency);
		
		train.push({
			trainName: trainName,
			destination: destination,
			nextArrival: nextArrival,
			frequency: frequency,
			minutesAway: minutesAway,
			dateAdded: Firebase.ServiceValue.TIMESTAMP,
		});

		//resets the value fields of the submit form 
		$('input').val('');

		return false;
	});

	train.on('child_added', function(child, prevChild){
		row = $('<tr>');
	    tTrainName = $('<td>'+ child.val().trainName +'</td>');
	    tDestination = $('<td>'+ child.val().destination+'</td>');
	    tNextArrival = $('<td>'+ child.val().nextArrival+'</td>');
	    tFrequency = $('<td>'+ child.val().frequency+'</td>');
	    tMinutesAway = $('<td>'+ child.val().minutesAway+'</td>');
	    row.append(tTrainName, tDestination, tNextArrival, tFrequency, tMinutesAway);
	    $('tbody').append(row)
	});

    // $('#frequency').datepicker({
    //     format: "dd/mm/yyyy"
    // });
	
});
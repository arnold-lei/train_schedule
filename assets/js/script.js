$('document').ready(function(){
	var train = new Firebase("https://arnoldlei-train.firebaseio.com/");
	    
	// $('#frequency').datepicker({
	//     format: "hh:mm:ss"
	// });  

	$('#submit').on('click', function(){
		console.log('something');
		trainName = $('#trainName').val().trim();
	  	destination = $('#destination').val().trim();
	  	nextArrival = $('#nextArrival').val().trim();
	  	frequency = $('#frequency').val().trim();
		
		train.push({
			trainName: trainName,
			destination: destination,
			nextArrival: nextArrival,
			frequency: frequency,
			// dateAdded: Firebase.ServiceValue.TIMESTAMP,
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
	    tRate = $('<td>'+ child.val().frequency+'</td>');
	    row.append(tTrainName, tDestination, tNextArrival, tFrequency, tRate);
	    $('tbody').append(row)

	});


	
});
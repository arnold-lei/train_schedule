$('document').ready(function(){
	var train = new Firebase("https://arnoldlei-train.firebaseio.com/");

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
	})
	
});
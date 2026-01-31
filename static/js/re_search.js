// This function executes our search via an AJAX call
function runSearch() {
	// Hide and clear the previous results, if any
	$('#search_results').hide();
	$('tbody').empty();
    
	// Transforms all the form parameters into a string we can send to the server
	var frmStr = $('#search_re').serialize();
    
	$.ajax({
		url: '/process_form',
		type: 'POST',
		dataType: 'json',
		data: frmStr,
		success: function(data, textStatus, jqXHR) {
			processJSON(data);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Failed to perform restriction enzyme search! textStatus: (" + textStatus +
				") and errorThrown: (" + errorThrown + ")");
		}
	});
}


// This processes a passed JSON structure representing matches and draws it to the result table
function processJSON( data ) {
	// Set the span that lists the match count
	$('#num_matches').text( data.num_matches );
	// Informing user that their search was empty
	if ( data.matches == 0) {
		$('#no_matches').show();
	
	// Creating custom table headers based on which search type was chosen
	} else { $('#no_matches').hide(); 
		if ( $('#search_types').val() == 'enzyme_name' ) {
			$('<tr/>', { 'id' : 'header' } ).appendTo('tbody');
				$('<td/>', { 'text' : 'Enzyme name' } ).appendTo('#header');
				$('<td/>', { 'text' : 'Prototype' } ).appendTo('#header');
				$('<td/>', { 'text' : 'Microorganism' } ).appendTo('#header');
				$('<td/>', { 'text' : 'Source of microorganism' } ).appendTo('#header');
				$('<td/>', { 'text' : 'Recognition sequence' } ).appendTo('#header');
				$('<td/>', { 'text' : 'Methylation site and type' } ).appendTo('#header');
				$('<td/>', { 'text' : 'Commercial source' } ).appendTo('#header');
				$('<td/>', { 'text' : 'Reference numbers' } ).appendTo('#header');

		} else if ( $('#search_types').val() == 'prototype' ) {
			$('<tr/>', { 'id' : 'header' } ).appendTo('tbody');
				$('<td/>', { 'text' : 'Enzyme name' } ).appendTo('#header');

		} else if ( $('#search_types').val() == 'microorganism' ) {
         $('<tr/>', { 'id' : 'header' } ).appendTo('tbody');
				$('<td/>', { 'text' : 'Enzyme name' } ).appendTo('#header');
				$('<td/>', { 'text' : 'Microorganism' } ).appendTo('#header');
	
		} else if ( $('#search_types').val() == 'source_of_microorganism' ) {
         $('<tr/>', { 'id' : 'header' } ).appendTo('tbody');
            $('<td/>', { 'text' : 'Enzyme name' } ).appendTo('#header');

		} else if ( $('#search_types').val() == 'recognition_sequence' ) {
			$('<tr/>', { 'id' : 'header' } ).appendTo('tbody');
				$('<td/>', { 'text' : 'Enzyme name' } ).appendTo('#header');
	
		} else if ( $('#search_types').val() == 'meth_site_type' ) {
			$('<tr/>', { 'id' : 'header' } ).appendTo('tbody');
				$('<td/>', { 'text' : 'Enzyme name' } ).appendTo('#header');

		} else if ( $('#search_types').val() == 'commercial_source' ) {
			$('<tr/>', { 'id' : 'header' } ).appendTo('tbody');
				$('<td/>', { 'text' : 'Enzyme name' } ).appendTo('#header');

		} else if ( $('#search_types').val() == 'reference_number' ) {
			$('<tr/>', { 'id' : 'header' } ).appendTo('tbody');
				$('<td/>', { 'text' : 'Reference number' } ).appendTo('#header');
				$('<td/>', { 'text' : 'Full reference' } ).appendTo('#header');
		}
	}

	// This will be used to keep track of row identifiers
	var next_row_num = 1;
	   
	// Iterate over each match and add a row to the result table for each
	$.each( data.matches, function(i, item) {
		var this_row_id = 'result_row_' + next_row_num++;
    
		// Create a row and append it to the body of the table
        	$('<tr/>', { "id" : this_row_id } ).appendTo('tbody');
    	
		// Creating custom table output based on which search type was chosen
		if ( $('#search_types').val() == 'enzyme_name' ) {    
        	$('<td/>', { "text" : item.enzyme_name } ).appendTo('#' + this_row_id);
			$('<td/>', { "text" : item.prototype } ).appendTo('#' + this_row_id);
			$('<td/>', { "text" : item.microorganism } ).appendTo('#' + this_row_id);
			$('<td/>', { "text" : item.source_of_microorganism } ).appendTo('#' + this_row_id);
			$('<td/>', { "text" : item.recognition_sequence } ).appendTo('#' + this_row_id);
			$('<td/>', { "text" : item.meth_site_type } ).appendTo('#' + this_row_id);
			$('<td/>', { "text" : item.commercial_source } ).appendTo('#' + this_row_id);
			$('<td/>', { "text" : item.reference_number } ).appendTo('#' + this_row_id);
	
		} else if ( $('#search_types').val() == 'prototype' ) {	
			$('<td/>', { "text" : item.enzyme_name } ).appendTo('#' + this_row_id);
	
		} else if ( $('#search_types').val() == 'microorganism' ) {
			$('<td/>', { "text" : item.enzyme_name } ).appendTo('#' + this_row_id);
 			$('<td/>', { "text" : item.microorganism } ).appendTo('#' + this_row_id);

		} else if ( $('#search_types').val() == 'source_of_microorganism' ) {
         $('<td/>', { "text" : item.enzyme_name } ).appendTo('#' + this_row_id);

		} else if ( $('#search_types').val() == 'recognition_sequence' ) {
			$('<td/>', { "text" : item.enzyme_name } ).appendTo('#' + this_row_id);
	
		} else if ( $('#search_types').val() == 'meth_site_type' ) {
			$('<td/>', { "text" : item.enzyme_name } ).appendTo('#' + this_row_id);

		} else if ( $('#search_types').val() == 'commercial_source' ) {
			$('<td/>', { "text" : item.enzyme_name } ).appendTo('#' + this_row_id);

		} else if ( $('#search_types').val() == 'reference_number' ) {
			$('<td/>', { "text" : item.reference_number } ).appendTo('#' + this_row_id);
			$('<td/>', { "text" : item.full_reference } ).appendTo('#' + this_row_id);

		}
	});
    
	// Now show the result section that was previously hidden
	$('#search_results').show();
}

// Custom placeholder for each search type
// Code adapted from http://jsfiddle.net/sW6QP/7/
function placeholder() {
	// Create key-value pairs 
	var placeholderText = {
		'Enzyme name': 'ex. EcoRI',
		'Prototype': 'ex. HindIII',
		'Microorganism': 'ex. Pseudomonas aeruginosa',
		'Source of microorganism': 'ex. S.K. Degtyarev',
		'Recognition sequence with cleavage site': 'ex. CTGCA^G',
		'Methylation site and type': 'ex. 6(N6-methyladenosine)',
		'Commercial source': 'ex. N',
		'Reference number': 'ex. 2934'
	};
	// This will search for the currently selected option in the dropdown
	$('#search_types').on('change', function() {
		if (this.value != 'null') {
			$('#query').attr('placeholder', placeholderText[$('#search_types option:selected').text()]);
		} else {
			$('#query').attr('placeholder', ''); 
		}
	});
}

function autocomplete() {
	$('#search_types').on('change', function() {
		$('#query').autocomplete({
			source: function(request, response) {
				var searchType = $('#search_types').val();
				$.ajax({
					url: '/autocomplete',
					data: {query: request.term, type: searchType},
					dataType: 'json',
					success: function(data) {
						response(data);
					}
				})
			},
		});
	})
}

// Run javascript once the page is ready
$(document).ready( function() {
	// Define what should happen when a user clicks submit on our search form
	$('#submit').click( function() {
        	runSearch();
		return false;  // Prevents 'normal' form submission
	});
	$('#open_pop_up').click(function() {
      $('#pop_up').fadeIn(); 
   });
	$('#close_pop_up').click(function() {
      $('#pop_up').fadeOut(); 
   });
	placeholder();
	autocomplete();		 
});			
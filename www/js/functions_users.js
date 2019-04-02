function loginPage () {

	$.ui.launch();
	nextPage('loginPage');
	$.ui.clearHistory();
	
	custom_alert (global_uuid);

}


function loginSet () {
	
	var login_data = getCookie("login_data");
	if (login_data) global_login_data = $.parseJSON(login_data);
	
	if (parseInt (global_login_data['ID_users']) > 0) {
		
		$('.login_remove').hide();
		$('.login_show').show();
		
		var html = '';
		html += '<a href="javascript: void(0);" onClick="homePage();">';
			html += '<div class="title">'+global_login_data['l_name']+' '+global_login_data['f_name']+'</div>';
		html += '</a>';
		$('#login_user_box').html(html);
		
	} else {
		
		global_login_data = '';
		$('.login_remove').show();
		$('.login_show').hide();
		
	}
	
}



function loginSend () {

	if (jQuery("#login_form").valid() == true) {

		$.ui.showMask();
		
		var serializeForm = jQuery("#login_form").serializeArray();
		
		jQuery.ajax({
			url: global_host + '/action_mobile.php',
			dataType: 'jsonp',
			data: {page: 'login', serializeForm: serializeForm, uuid: global_uuid},
			timeout: global_ajax_timeout,
			success: function(dataReceived) {
				
				$.ui.hideMask();

				var data = dataReceived;
				if (data['action'] == 'ok') {
					
					if (data['message']) custom_alert (data['message']);
					
					setCookie ('login_data', JSON.stringify(dataReceived), 3650);
					loginSet();
					homePage();
					
					clear_form_elements ('#login_form');
					
				} else if (data['action'] == 'error') custom_alert (data['message']);
				
			},
			error : function() {
				$.ui.hideMask();
				custom_alert ("Nemožemo da uspostavimo vezu sa serverom. Probajte ponovo.");
			}
		});
		
	}
	
}




function logout () {
	
	removeCookie ('login_data');
	global_login_data = '';
	loginSet();
	homePage();
	
}

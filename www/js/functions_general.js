function nextPage (idHash) {
	
	$.ui.loadContent(idHash,false,false,'slide');
	$.ui.disableSideMenu();
	
	//pages to remove from history
	//$.ui.clearHistoryLast('#TaskVideoConvertPage');
	
	//skida iz histroy onoliko zadnjih koliko mu damo
	//$.ui.clearBackCustom(2);
	
	//setTimeout(function(){ $.ui.toggleSideMenu(!1) }, 1000);
	//$.ui.toggleSideMenu(1);
	//$("#content,  #header, #navbar, #top_menu_page").vendorCss("Transition","");
	//$("#content,  #header, #navbar, #top_menu_page").vendorCss("Transform","");
	//$.ui.toggleSideMenu=!1;;
	//$('.afui_panel_mask').hide();
	
}


function GoBack () {
	
	//$.ui.clearHistoryLast('#TaskVideoConvertPage');
	$.ui.goBack();
	//$.ui.disableSideMenu();
	
}


function OpenSideMenu () {

	$.ui.enableSideMenu();
	$.ui.toggleSideMenu();
	
}



function CloseSideMenu () {

	$.ui.disableSideMenu();
	$.ui.toggleSideMenu();
	
}


function custom_alert (text) {
	
	$("#afui").popup({ 
					title:global_app_title,
					message:text,
					cancelText:"OK", 
					cancelOnly:true
					});
	
}


function ScrollTop (holder) {
	
	$(holder + ' .afScrollPanel').attr('style', '-webkit-transform: matrix3d( 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 )');	
	
}


function OpenDB () {

	var db = openDatabase('mydb', '1.0', 'Bamas DB', 5 * 1024 * 1024);	
	return db;
	
}



function sizeIt () {
	$('#afui, #content').css({'height': global_height+'px'});
}


function getNetChk () {
	
	if (navigator.connection.type=="none") {
		$.ui.hideMask();
		custom_alert("Nemate internet konekciju. Konektujte se na internet i probajte ponovo.");
	}

}


function clear_form_elements(ele) {

    jQuery(ele).find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
			case 'tel':
			case 'email':
			case 'number':
            case 'textarea':
                jQuery(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });

}


function randomPassword (length) {
  chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  pass = "";
  for(x=0;x<length;x++)
  {
    i = Math.floor(Math.random() * 62);
    pass += chars.charAt(i);
  }
  return pass;
}


function htmlspecialchars (unsafe) {
  return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}


function htmlspecialchars_custom (unsafe) {
  return unsafe
      .replace(/&/g, "")
	  .replace(/&amp;/g,"")
	  .replace(/amp;/g,"")
      .replace(/</g, "")
	  .replace(/&lt;/g,"")
	  .replace(/lt;/g,"")
      .replace(/>/g, "")
	  .replace(/&gt;/g,"")
	  .replace(/gt;/g,"")
      .replace(/"/g, "")
	  .replace(/&quot;/g,"")
	  .replace(/quot;/g,"")
      .replace(/'/g, "")
	  .replace(/&#039;/g,"")
	  .replace(/#039;/g,"");
}


function addslashes(str) {
	str=str.replace(/\\/g,'\\\\');
	str=str.replace(/\'/g,'\\\'');
	str=str.replace(/\"/g,'\\"');
	str=str.replace(/\0/g,'\\0');
	return str;
}



function stripslashes(str) {
	str=str.replace(/\\'/g,'\'');
	str=str.replace(/\\&quot;/g,'\&quot;');
	str=str.replace(/\\"/g,'"');
	str=str.replace(/\\0/g,'\0');
	str=str.replace(/\\\\/g,'\\');
	return str;
}


function rand (min, max) {
	
    return Math.floor(Math.random() * (max - min + 1)) + min;

}


function number_format (number, decimals, dec_point, thousands_sep) {

    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');    }
    return s.join(dec);
}


//izbacuje odredjeni value iz niza
function removeItem(array, item){
	for(var i in array){
		if(array[i]==item){
			array.splice(i,1);
			break;
			}
	}
}


function fromJSDateToDate (type, date) {
	
	var new_date;
	var d = new Date(date);
	var day = d.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
		
	switch(type) {
		case 'usaDate':
			new_date = month + '/' + day + '/' + year;
		break;
		case 'dbDate':
			new_date = year + '-' + month + '-' + day;
		break;
	}
	
	return new_date;
	
}


function setCookie(cname, cvalue, exdays) {
	
	localStorage.setItem(cname, cvalue);

}


function getCookie(cname) {
	
	return localStorage.getItem(cname);
	
}


function removeCookie (cname) {
	
	localStorage.setItem(cname, '');
	
}


function WhichBrowser () {
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    //M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    //if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    //return M.join(' ');
	return M[1];
}




function capturePhoto(callback) {
	if (local_chk == 10) {
		global_fileURL = global_host + '/images/nature135_1024.jpg';
		setTimeout(callback, 0);
	} else {
		$.ui.showMask();
		global_photo_callback = callback;
		navigator.camera.getPicture(onSuccessPhoto, onFailPhoto, { quality: 30, destinationType: Camera.DestinationType.FILE_URI });
	}
}

function onSuccessPhoto(imageURI) {
	$.ui.hideMask();
	global_fileURL = imageURI;
	setTimeout(global_photo_callback, 0);
}

function onFailPhoto(message) {
	$.ui.hideMask();
	setTimeout(function() {
    	//custom_alert(JSON.stringify(message));
	}, 0);
    
}


function CameraCleanup () {
	navigator.camera.cleanup(Cleanup_onSuccess, Cleanup_onFail);
}
 
function Cleanup_onSuccess() {
    //console.log("Camera cleanup success.")
}
 
function Cleanup_onFail(message) {
    //custom_alert(JSON.stringify(message));
}


function PhotoPreView (PhotoURI) {

	photoview.StartPhotoView(PhotoPreView_ok, PhotoPreView_error, {PhotoURI:PhotoURI});	
	
}

function PhotoPreView_ok (data) {
	
	//custom_alert('ok-' + JSON.stringify(data));
	
}

function PhotoPreView_error (data) {
	
	//custom_alert('error-' + JSON.stringify(data));
	
}



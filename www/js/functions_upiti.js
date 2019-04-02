function UpitLista () {
	
	$.ui.showMask();
	var db = OpenDB();
	
	db.transaction(function (tx) {
	   tx.executeSql('SELECT * FROM sales_leads order by id desc', [], function (tx, results) {
		   
			//console.log (results);
			
			var len = results.rows.length, i;
			var html = '';
			
			if (len > 0) {
			
				for (i = 0; i < len; i++){
					
					var lk_photo = results.rows.item(i)['lk_photo'];
					if (!lk_photo || typeof(lk_photo) == 'undefined') lk_photo = './images/noavatar.jpg';
					var ime = results.rows.item(i)['ime'];
					if (!ime || typeof(ime) == 'undefined') ime = ' / ';
					var prezime = results.rows.item(i)['prezime'];
					if (!prezime || typeof(prezime) == 'undefined') prezime = ' / ';
					var mob_tel = results.rows.item(i)['mob_tel'];
					if (!mob_tel || typeof(mob_tel) == 'undefined') mob_tel = ' / ';
					var telefon = results.rows.item(i)['telefon'];
					if (!telefon || typeof(telefon) == 'undefined') telefon = ' / ';
					var email = results.rows.item(i)['email'];
					if (!email || typeof(email) == 'undefined') email = ' / ';
					var adresa_prebivalista = results.rows.item(i)['adresa_prebivalista'];
					if (!adresa_prebivalista || typeof(adresa_prebivalista) == 'undefined') adresa_prebivalista = ' / ';
					
					html += '<li class="content upit_hold_'+results.rows.item(i)['id']+'">';
						html += '<a href="javascript: void(0);" onClick="UpitSelect('+results.rows.item(i)['id']+');">';
							html += '<div class="title">'+ime+' '+prezime+'</div>';
							html += '<img src="'+lk_photo+'" style="height: 80px; width: 80px;" />';
							html += '<div class="hold">';
								html += '<div class="subtext"><b>Mob:</b> '+mob_tel+'</div>';
								html += '<div class="subtext"><b>Tel:</b> '+telefon+'</div>';
								html += '<div class="subtext"><b>Email:</b> '+email+'</div>';
								html += '<div class="subtext"><b>Adresa:</b> '+adresa_prebivalista+'</div>';
							html += '</div>';
						html += '</a>';
					html += '</li>';
				}
				
				//$('#navbar footer .tab_sync').show();
				
			} else {
				
				html += '<div class="text_box_white">Nema Upita</div>';
				html += '<div class="buttons_hold"><a href="javascript: void(0);" onClick="UpitForma();" class="button_regular">Dodaj Novi Upit</a></div>';
				//$('#navbar footer .tab_sync').hide();
				
			}
			
			$('#UpitLista .search_results_hold').html(html);
			nextPage('UpitLista');
			ScrollTop ('#UpitLista');
			$.ui.clearHistory();
			$.ui.hideMask();
			
	   }, null);
	});

}



function UpitSelect (id) {

	var db = OpenDB();
	
	db.transaction(function (tx) {
	   tx.executeSql('SELECT * FROM sales_leads where id='+id+' ', [], function (tx, results) {	
	   		
			UpitForma (results);
			
	   }, null);
	});
	
}



function UpitForma (results) {
	
	//console.log (results);
	var db = OpenDB();
	
	if (typeof(results) !== 'undefined') var data = results.rows.item(0);
	if (typeof(data) == 'undefined') data = new Array();
	
	if (typeof(data['id']) == 'undefined' || data['id'] == null) data['id'] = 0;
	global_upit_edit_id = data['id'];
	
	if (typeof(data['ID_proizvod']) == 'undefined' || data['ID_proizvod'] == null) data['ID_proizvod'] = 0;
	if (typeof(data['ime']) == 'undefined' || data['ime'] == null) data['ime'] = '';
	if (typeof(data['prezime']) == 'undefined' || data['prezime'] == null) data['prezime'] = '';
	if (typeof(data['nosilac_kredita']) == 'undefined' || data['nosilac_kredita'] == null) data['nosilac_kredita'] = '';
	if (typeof(data['jmbg']) == 'undefined' || data['jmbg'] == null) data['jmbg'] = '';
	if (typeof(data['mob_tel']) == 'undefined' || data['mob_tel'] == null) data['mob_tel'] = '';
	if (typeof(data['telefon']) == 'undefined' || data['telefon'] == null) data['telefon'] = '';
	if (typeof(data['tel_ostalo']) == 'undefined' || data['tel_ostalo'] == null) data['tel_ostalo'] = '';
	if (typeof(data['email']) == 'undefined' || data['email'] == null) data['email'] = '';
	if (typeof(data['adresa_prebivalista']) == 'undefined' || data['adresa_prebivalista'] == null) data['adresa_prebivalista'] = '';
	if (typeof(data['tip_stanovanja']) == 'undefined' || data['tip_stanovanja'] == null) data['tip_stanovanja'] = '';
	if (typeof(data['na_adresi_prebivalista_od']) == 'undefined' || data['na_adresi_prebivalista_od'] == null) data['na_adresi_prebivalista_od'] = '';
	if (typeof(data['bracno_stanje']) == 'undefined' || data['bracno_stanje'] == null) data['bracno_stanje'] = '';
	if (typeof(data['broj_dece']) == 'undefined' || data['broj_dece'] == null) data['broj_dece'] = '';
	if (typeof(data['broj_clanova_porodice']) == 'undefined' || data['broj_clanova_porodice'] == null) data['broj_clanova_porodice'] = '';
	if (typeof(data['obrazovanje']) == 'undefined' || data['obrazovanje'] == null) data['obrazovanje'] = '';
	
	if (typeof(data['mesecni_neto_prihodi']) == 'undefined' || data['mesecni_neto_prihodi'] == null) data['mesecni_neto_prihodi'] = '';
	if (typeof(data['mesecne_obaveze_po_pitanju_kredita']) == 'undefined' || data['mesecne_obaveze_po_pitanju_kredita'] == null) data['mesecne_obaveze_po_pitanju_kredita'] = '';
	if (typeof(data['broj_izdrzavanih']) == 'undefined' || data['broj_izdrzavanih'] == null) data['broj_izdrzavanih'] = '';
	if (typeof(data['izvor_prihoda']) == 'undefined' || data['izvor_prihoda'] == null) data['izvor_prihoda'] = '';
	if (typeof(data['broj_zaposlenih_lica']) == 'undefined' || data['broj_zaposlenih_lica'] == null) data['broj_zaposlenih_lica'] = '';
	if (typeof(data['naziv_poslodavca']) == 'undefined' || data['naziv_poslodavca'] == null) data['naziv_poslodavca'] = '';
	if (typeof(data['adresa_poslodavca']) == 'undefined' || data['adresa_poslodavca'] == null) data['adresa_poslodavca'] = '';
	if (typeof(data['tip_zaposlenja']) == 'undefined' || data['tip_zaposlenja'] == null) data['tip_zaposlenja'] = '';
	if (typeof(data['radni_staz_kod_trenutnog_poslodavca']) == 'undefined' || data['radni_staz_kod_trenutnog_poslodavca'] == null) data['radni_staz_kod_trenutnog_poslodavca'] = '';
	if (typeof(data['radni_staz_meseci_godina']) == 'undefined' || data['radni_staz_meseci_godina'] == null) data['radni_staz_meseci_godina'] = '';
	if (typeof(data['ukupan_radni_staz_godine']) == 'undefined' || data['ukupan_radni_staz_godine'] == null) data['ukupan_radni_staz_godine'] = '';
	if (typeof(data['kredit_kasnjenje']) == 'undefined' || data['kredit_kasnjenje'] == null) data['kredit_kasnjenje'] = '';
	
	if (typeof(data['file_administrativna_zabrana_path']) == 'undefined' || data['file_administrativna_zabrana_path'] == null) data['file_administrativna_zabrana_path'] = '';
	if (typeof(data['file_administrativna_zabrana_width']) == 'undefined' || data['file_administrativna_zabrana_width'] == null) data['file_administrativna_zabrana_width'] = '';
	if (typeof(data['file_administrativna_zabrana_height']) == 'undefined' || data['file_administrativna_zabrana_height'] == null) data['file_administrativna_zabrana_height'] = '';
	if (typeof(data['file_administrativna_zabrana_rotate']) == 'undefined' || data['file_administrativna_zabrana_rotate'] == null) data['file_administrativna_zabrana_rotate'] = 0;
	if (typeof(data['file_potvrda_visini_primanja_path']) == 'undefined' || data['file_potvrda_visini_primanja_path'] == null) data['file_potvrda_visini_primanja_path'] = '';
	if (typeof(data['file_potvrda_visini_primanja_width']) == 'undefined' || data['file_potvrda_visini_primanja_width'] == null) data['file_potvrda_visini_primanja_width'] = '';
	if (typeof(data['file_potvrda_visini_primanja_height']) == 'undefined' || data['file_potvrda_visini_primanja_height'] == null) data['file_potvrda_visini_primanja_height'] = '';
	if (typeof(data['file_potvrda_visini_primanja_rotate']) == 'undefined' || data['file_potvrda_visini_primanja_rotate'] == null) data['file_potvrda_visini_primanja_rotate'] = 0;
	if (typeof(data['file_zahtev_kredit_path']) == 'undefined' || data['file_zahtev_kredit_path'] == null) data['file_zahtev_kredit_path'] = '';
	if (typeof(data['file_zahtev_kredit_width']) == 'undefined' || data['file_zahtev_kredit_width'] == null) data['file_zahtev_kredit_width'] = '';
	if (typeof(data['file_zahtev_kredit_height']) == 'undefined' || data['file_zahtev_kredit_height'] == null) data['file_zahtev_kredit_height'] = '';
	if (typeof(data['file_zahtev_kredit_rotate']) == 'undefined' || data['file_zahtev_kredit_rotate'] == null) data['file_zahtev_kredit_rotate'] = 0;
	
	if (typeof(data['licna_kart_chk']) == 'undefined' || data['licna_kart_chk'] == null) data['licna_kart_chk'] = 0;
	if (typeof(data['lk_photo']) == 'undefined' || !data['lk_photo'] || data['lk_photo'] == null) data['lk_photo'] = './images/noavatar.jpg';
	if (typeof(data['lk_data']) == 'undefined' || !data['lk_data'] || data['lk_data'] == null) data['lk_data'] = '';

	var html = '';
	
	//osnovni podaci
	html += '<div class="form-title">Osnovni podaci</div>';
	html += '<div class="buttons_hold"><a href="javascript: void(0);" onClick="LKLoad();" class="button_regular" style="margin-top:5px; margin-bottom:15px;"><span class="icon fa-download big"></span> Učitaj Ličnu Kartu</a></div>';
	html += '<div class="form-group"><div class="label">Vrsta proizvoda</div><div class="input">';
		html += '<select name="proizvod_select" class="" onchange="$(\'#UpitForma [name=ID_proizvod]\').val($(this).val());"><option value="0"> -- </option>';
			var product_len = 0;
			if (typeof(global_proizvodi_select) !== 'undefined' && (global_proizvodi_select.length > 0 || typeof(global_proizvodi_select.length) == 'undefined')) {
				product_len = global_proizvodi_select.rows.length;
				if (product_len > 0) {
					var i;
					for (i = 0; i < product_len; i++){
						html += '<option value="'+global_proizvodi_select.rows.item(i)['ID_proizvod']+'"';
						if (global_proizvodi_select.rows.item(i)['ID_proizvod'] == data['ID_proizvod']) html += ' selected ';
						html += '>'+global_proizvodi_select.rows.item(i)['title']+'</option>';
					}
				}
			}
		html += '</select>';
		html += '<input name="ID_proizvod" type="hidden" value="'+data['ID_proizvod']+'" />';
	html += '</div></div>';
	html += '<div class="form-group"><div class="label">Ime</div><div class="input"><input name="ime" class="required" type="text" value="'+htmlspecialchars (data['ime'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Prezime</div><div class="input"><input name="prezime" class="required" type="text" value="'+htmlspecialchars (data['prezime'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Nosilac kredita</div><div class="input"><input name="nosilac_kredita" class="" type="text" value="'+htmlspecialchars (data['nosilac_kredita'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">JMBG</div><div class="input"><input name="jmbg" class="" type="number" value="'+htmlspecialchars (data['jmbg'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Mobilni telefon</div><div class="input"><input name="mob_tel" class="" type="number" value="'+htmlspecialchars (data['mob_tel'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Fiksni telefon</div><div class="input"><input name="telefon" class="" type="number" value="'+htmlspecialchars (data['telefon'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Ostalo</div><div class="input"><input name="tel_ostalo" class="" type="number" value="'+htmlspecialchars (data['tel_ostalo'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Email</div><div class="input"><input name="email" class="" type="email" value="'+htmlspecialchars (data['email'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Adresa prebivališta</div><div class="input"><input name="adresa_prebivalista" class="" type="text" value="'+htmlspecialchars (data['adresa_prebivalista'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Tip stanovanja</div><div class="input"><input name="tip_stanovanja" class="" type="text" value="'+htmlspecialchars (data['tip_stanovanja'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Na adresi od</div><div class="input"><input name="na_adresi_prebivalista_od" class="" type="text" value="'+htmlspecialchars (data['na_adresi_prebivalista_od'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Bračno stanje</div><div class="input"><input name="bracno_stanje" class="" type="text" value="'+htmlspecialchars (data['bracno_stanje'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Broj dece</div><div class="input"><input name="broj_dece" class="" type="number" value="'+htmlspecialchars (data['broj_dece'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Broj članova porodice</div><div class="input"><input name="broj_clanova_porodice" class="" type="number" value="'+htmlspecialchars (data['broj_clanova_porodice'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Obrazovanje</div><div class="input"><input name="obrazovanje" class="" type="text" value="'+htmlspecialchars (data['obrazovanje'])+'" /></div></div>';
	
	//Kreditna slika
	html += '<div class="form-title" style="margin-top: 30px;">Kreditna slika</div>';
	html += '<div class="form-group"><div class="label">Mesečni neto prihodi</div><div class="input"><input name="mesecni_neto_prihodi" class="" type="number" value="'+htmlspecialchars (data['mesecni_neto_prihodi'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Мesečne obaveze po pitanju kredita</div><div class="input"><input name="mesecne_obaveze_po_pitanju_kredita" class="" type="number" value="'+htmlspecialchars (data['mesecne_obaveze_po_pitanju_kredita'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Broj izdržavanih</div><div class="input"><input name="broj_izdrzavanih" class="" type="number" value="'+htmlspecialchars (data['broj_izdrzavanih'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Izvor prihoda</div><div class="input"><input name="izvor_prihoda" class="" type="text" value="'+htmlspecialchars (data['izvor_prihoda'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Broj zaposlenih lica</div><div class="input"><input name="broj_zaposlenih_lica" class="" type="number" value="'+htmlspecialchars (data['broj_zaposlenih_lica'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Naziv poslodavca</div><div class="input"><input name="naziv_poslodavca" class="" type="text" value="'+htmlspecialchars (data['naziv_poslodavca'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Adresa poslodavca</div><div class="input"><input name="adresa_poslodavca" class="" type="text" value="'+htmlspecialchars (data['adresa_poslodavca'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Tip zaposlenja</div><div class="input"><input name="tip_zaposlenja" class="" type="text" value="'+htmlspecialchars (data['tip_zaposlenja'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Radni staž kod trenutnog poslodavca</div><div class="input"><input name="radni_staz_kod_trenutnog_poslodavca" class="" type="text" value="'+htmlspecialchars (data['radni_staz_kod_trenutnog_poslodavca'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Radni staž (meseci godina)</div><div class="input"><input name="radni_staz_meseci_godina" class="" type="text" value="'+htmlspecialchars (data['radni_staz_meseci_godina'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Ukupan radni staž (godine)</div><div class="input"><input name="ukupan_radni_staz_godine" class="" type="number" value="'+htmlspecialchars (data['ukupan_radni_staz_godine'])+'" /></div></div>';
	html += '<div class="form-group"><div class="label">Kašnjenje u kreditnom birou duže od 60 dana</div><div class="input"><input name="kredit_kasnjenje" class="" type="text" value="'+htmlspecialchars (data['kredit_kasnjenje'])+'" /></div></div>';
	
	//Dokumentacija
	html += '<div class="form-title" style="margin-top: 30px;">Dokumentacija</div>';
	
	html += '<div class="form-group photo_hold file_administrativna_zabrana_hold"><div class="title">Administrativna zabrana</div>';
		html += '<div class="photo_box hide"><a href="javascript: void(0);" onClick="PhotoPreView(\''+data['file_administrativna_zabrana_path']+'\');" class="img_link"><img src="'+data['file_administrativna_zabrana_path']+'" class="img_hold"';
		if (data['file_administrativna_zabrana_path']) html += ' style="-moz-opacity: 1; -khtml-opacity: 1; opacity: 1;" ';
		html += '/></a><a href="javascript: void(0);" onClick="UpitPhotoDel(\'.file_administrativna_zabrana_hold\');" class="icon fa-minus-circle big rotate_button"></a><a href="javascript: void(0);" onClick="UpitPhotoRotate(\'.file_administrativna_zabrana_hold\');" class="icon fa-rotate-right big rotate_button"></a></div>';
		html += '<input name="file_path" class="" type="hidden" value="'+data['file_administrativna_zabrana_path']+'" />';
		html += '<input name="file_width" class="" type="hidden" value="'+data['file_administrativna_zabrana_width']+'" />';
		html += '<input name="file_height" class="" type="hidden" value="'+data['file_administrativna_zabrana_height']+'" />';
		html += '<input name="file_rotate" class="" type="hidden" value="'+data['file_administrativna_zabrana_rotate']+'" />';
	var file_administrativna_zabrana = '.file_administrativna_zabrana_hold';
	html += '<a href="javascript: void(0);" onClick="capturePhoto(\'UpitSetPhoto(\\\''+file_administrativna_zabrana+'\\\');\');" class="button_regular">Slikaj</a></div>';
	
	html += '<div class="form-group photo_hold file_potvrda_visini_primanja_hold"><div class="title">Potvrda o visini primanja</div>';
		html += '<div class="photo_box hide"><a href="javascript: void(0);" onClick="PhotoPreView(\''+data['file_potvrda_visini_primanja_path']+'\');" class="img_link"><img src="'+data['file_potvrda_visini_primanja_path']+'" class="img_hold"';
		if (data['file_potvrda_visini_primanja_path']) html += ' style="-moz-opacity: 1; -khtml-opacity: 1; opacity: 1;" ';
		html += '/></a><a href="javascript: void(0);" onClick="UpitPhotoDel(\'.file_potvrda_visini_primanja_hold\');" class="icon fa-minus-circle big rotate_button"></a><a href="javascript: void(0);" onClick="UpitPhotoRotate(\'.file_potvrda_visini_primanja_hold\');" class="icon fa-rotate-right big rotate_button"></a></div>';
		html += '<input name="file_path" class="" type="hidden" value="'+data['file_potvrda_visini_primanja_path']+'" />';
		html += '<input name="file_width" class="" type="hidden" value="'+data['file_potvrda_visini_primanja_width']+'" />';
		html += '<input name="file_height" class="" type="hidden" value="'+data['file_potvrda_visini_primanja_height']+'" />';
		html += '<input name="file_rotate" class="" type="hidden" value="'+data['file_potvrda_visini_primanja_rotate']+'" />';
	var file_potvrda_visini_primanja = '.file_potvrda_visini_primanja_hold';
	html += '<a href="javascript: void(0);" onClick="capturePhoto(\'UpitSetPhoto(\\\''+file_potvrda_visini_primanja+'\\\');\');" class="button_regular">Slikaj</a></div>';
	
	html += '<div class="form-group photo_hold file_zahtev_kredit_hold"><div class="title">Zahtev za kredit</div>';
		html += '<div class="photo_box hide"><a href="javascript: void(0);" onClick="PhotoPreView(\''+data['file_zahtev_kredit_path']+'\');" class="img_link"><img src="'+data['file_zahtev_kredit_path']+'" class="img_hold"';
		if (data['file_zahtev_kredit_path']) html += ' style="-moz-opacity: 1; -khtml-opacity: 1; opacity: 1;" ';
		html += '/></a><a href="javascript: void(0);" onClick="UpitPhotoDel(\'.file_zahtev_kredit_hold\');" class="icon fa-minus-circle big rotate_button"></a><a href="javascript: void(0);" onClick="UpitPhotoRotate(\'.file_zahtev_kredit_hold\');" class="icon fa-rotate-right big rotate_button"></a></div>';
		html += '<input name="file_path" class="" type="hidden" value="'+data['file_zahtev_kredit_path']+'" />';
		html += '<input name="file_width" class="" type="hidden" value="'+data['file_zahtev_kredit_width']+'" />';
		html += '<input name="file_height" class="" type="hidden" value="'+data['file_zahtev_kredit_height']+'" />';
		html += '<input name="file_rotate" class="" type="hidden" value="'+data['file_zahtev_kredit_rotate']+'" />';
	var file_zahtev_kredit = '.file_zahtev_kredit_hold';
	html += '<a href="javascript: void(0);" onClick="capturePhoto(\'UpitSetPhoto(\\\''+file_zahtev_kredit+'\\\');\');" class="button_regular">Slikaj</a></div>';
	
	html += '<div class="form-group photo_hold licna_karta_hold"><div class="title">Lična karta</div>';
		html += '<div class="photo_box hide"><a href="javascript: void(0);" onClick=""><img src="'+data['lk_photo']+'" class="img_hold" /></a><div class="title" style="font-weight:bold; padding-top:10px;"><img src="./images/ok_check.png" />Lična karta učitana</div></div>';
		html += '<input name="licna_kart_chk" class="" type="hidden" value="'+data['licna_kart_chk']+'" />';
		html += '<input name="lk_photo" class="" type="hidden" value="'+data['lk_photo']+'" />';
		html += '<input name="lk_data" class="" type="hidden" value="'+data['lk_data']+'" />';
	html += '<a href="javascript: void(0);" onClick="LKLoad();" class="button_regular">Učitaj Ličnu Kartu</a></div>';
	
	$('#UpitForma #upit_form').html(html);
	nextPage('UpitForma');
	ScrollTop ('#UpitForma');
	
	if (product_len == 0) {
	
		$("#afui").popup({
			title:global_app_title,
			message:"Nemate učitane proizvode. Dali želite da ih učitate?",
			cancelText:"NE",
			cancelCallback: function(){
				//	
			},
			doneText:"DA",
			doneCallback: function(){
			
				ProizvodiSync();
				
			},
			cancelOnly:false,
		});
		
	}
	
	if (typeof(results) == 'undefined') {
		
		$('#header header h1').html('Novi Upit');
		$('#header header #backButton, #navbar footer .tab_del, #navbar footer .tab_update').hide();
		$('#navbar footer .tab_save').show();
		$('#navbar footer .tab_save').css({'width':'100%'});
		$.ui.clearHistory();
		
	} else {
		
		$('#header header h1').html('Izmeni Upit');
		$('#header header #backButton, #navbar footer .tab_del, #navbar footer .tab_update').show();
		$('#navbar footer .tab_save').hide();
		$('#navbar footer .tab_update, #navbar footer .tab_del').css({'width':'50%'});
		
		if (data['file_administrativna_zabrana_path']) {
			$('#UpitForma .file_administrativna_zabrana_hold .photo_box').show();	
			$('#UpitForma .file_administrativna_zabrana_hold .img_hold').css({'max-height': '200px', 'max-width': '200px'});
			UpitPhotoRotate_2 ('.file_administrativna_zabrana_hold', data['file_administrativna_zabrana_rotate']);
		}
		if (data['file_potvrda_visini_primanja_path']) {
			$('#UpitForma .file_potvrda_visini_primanja_hold .photo_box').show();	
			$('#UpitForma .file_potvrda_visini_primanja_hold .img_hold').css({'max-height': '200px', 'max-width': '200px'});
			UpitPhotoRotate_2 ('.file_potvrda_visini_primanja_hold', data['file_potvrda_visini_primanja_rotate']);
		}
		if (data['file_zahtev_kredit_path']) {
			$('#UpitForma .file_zahtev_kredit_hold .photo_box').show();	
			$('#UpitForma .file_zahtev_kredit_hold .img_hold').css({'max-height': '200px', 'max-width': '200px'});
			UpitPhotoRotate_2 ('.file_zahtev_kredit_hold', data['file_zahtev_kredit_rotate']);
		}
		if (data['licna_kart_chk'] == 1) {
			$('#UpitForma .licna_karta_hold .photo_box').show();	
			$('#UpitForma .licna_karta_hold .img_hold').css({'max-height': '200px', 'max-width': '200px'});
		}
		
	}
	
}



function UpitSnimi (type) {
	
	if (jQuery("#UpitForma #upit_form").valid() == true) {
		
		$.ui.showMask();
		
		var ID_proizvod = $('#UpitForma [name=ID_proizvod]').val();
		var ime = $('#UpitForma [name=ime]').val();
		var prezime = $('#UpitForma [name=prezime]').val();
		var nosilac_kredita = $('#UpitForma [name=nosilac_kredita]').val();
		var jmbg = $('#UpitForma [name=jmbg]').val();
		var mob_tel = $('#UpitForma [name=mob_tel]').val();
		var telefon = $('#UpitForma [name=telefon]').val();
		var tel_ostalo = $('#UpitForma [name=tel_ostalo]').val();
		var email = $('#UpitForma [name=email]').val();
		var adresa_prebivalista = $('#UpitForma [name=adresa_prebivalista]').val();
		var tip_stanovanja = $('#UpitForma [name=tip_stanovanja]').val();
		var na_adresi_prebivalista_od = $('#UpitForma [name=na_adresi_prebivalista_od]').val();
		var bracno_stanje = $('#UpitForma [name=bracno_stanje]').val();
		var broj_dece = $('#UpitForma [name=broj_dece]').val();
		var broj_clanova_porodice = $('#UpitForma [name=broj_clanova_porodice]').val();
		var obrazovanje = $('#UpitForma [name=obrazovanje]').val();
		var mesecni_neto_prihodi = $('#UpitForma [name=mesecni_neto_prihodi]').val();
		var mesecne_obaveze_po_pitanju_kredita = $('#UpitForma [name=mesecne_obaveze_po_pitanju_kredita]').val();
		var broj_izdrzavanih = $('#UpitForma [name=broj_izdrzavanih]').val();
		var izvor_prihoda = $('#UpitForma [name=izvor_prihoda]').val();
		var broj_zaposlenih_lica = $('#UpitForma [name=broj_zaposlenih_lica]').val();
		var naziv_poslodavca = $('#UpitForma [name=naziv_poslodavca]').val();
		var adresa_poslodavca = $('#UpitForma [name=adresa_poslodavca]').val();
		var tip_zaposlenja = $('#UpitForma [name=tip_zaposlenja]').val();
		var radni_staz_kod_trenutnog_poslodavca = $('#UpitForma [name=radni_staz_kod_trenutnog_poslodavca]').val();
		var radni_staz_meseci_godina = $('#UpitForma [name=radni_staz_meseci_godina]').val();
		var ukupan_radni_staz_godine = $('#UpitForma [name=ukupan_radni_staz_godine]').val();
		var kredit_kasnjenje = $('#UpitForma [name=kredit_kasnjenje]').val();
		
		var file_administrativna_zabrana_path = $('#UpitForma .file_administrativna_zabrana_hold [name=file_path]').val();
		var file_administrativna_zabrana_width = $('#UpitForma .file_administrativna_zabrana_hold [name=file_width]').val();
		var file_administrativna_zabrana_height = $('#UpitForma .file_administrativna_zabrana_hold [name=file_height]').val();
		var file_administrativna_zabrana_rotate = $('#UpitForma .file_administrativna_zabrana_hold [name=file_rotate]').val();
		
		var file_potvrda_visini_primanja_path = $('#UpitForma .file_potvrda_visini_primanja_hold [name=file_path]').val();
		var file_potvrda_visini_primanja_width = $('#UpitForma .file_potvrda_visini_primanja_hold [name=file_width]').val();
		var file_potvrda_visini_primanja_height = $('#UpitForma .file_potvrda_visini_primanja_hold [name=file_height]').val();
		var file_potvrda_visini_primanja_rotate = $('#UpitForma .file_potvrda_visini_primanja_hold [name=file_rotate]').val();
		
		var file_zahtev_kredit_path = $('#UpitForma .file_zahtev_kredit_hold [name=file_path]').val();
		var file_zahtev_kredit_width = $('#UpitForma .file_zahtev_kredit_hold [name=file_width]').val();
		var file_zahtev_kredit_height = $('#UpitForma .file_zahtev_kredit_hold [name=file_height]').val();
		var file_zahtev_kredit_rotate = $('#UpitForma .file_zahtev_kredit_hold [name=file_rotate]').val();
		
		var licna_kart_chk = $('#UpitForma [name=licna_kart_chk]').val();
		var lk_photo = $('#UpitForma [name=lk_photo]').val();
		var lk_data = htmlspecialchars ($('#UpitForma [name=lk_data]').val());
	
		var db = OpenDB();

		if (type == 'add') {
			
			var next_id = 1;
			
			db.transaction(function (tx) {  
			   tx.executeSql('SELECT id FROM sales_leads order by id desc limit 1', [], function (tx, results) {
					var len = results.rows.length;
					if (len > 0) next_id = results.rows.item(0)['id'] + 1;
			   }, null);
			});	
		
			db.transaction(function (tx) {  
				
				tx.executeSql("INSERT INTO sales_leads (id) VALUES (?)", [ next_id ]);
				global_upit_edit_id = next_id;
			   
			});	
			
		}
		
		
		db.transaction(function (tx) {  
			
			tx.executeSql('UPDATE sales_leads SET ime = ?, prezime = ?, nosilac_kredita = ?, jmbg = ?, telefon = ?, mob_tel = ?, tel_ostalo = ?, email = ?, adresa_prebivalista = ?, na_adresi_prebivalista_od = ?, tip_stanovanja = ?, bracno_stanje = ?, broj_dece = ?, broj_clanova_porodice = ?, broj_zaposlenih_lica = ?, broj_izdrzavanih = ?, izvor_prihoda = ?, obrazovanje = ?, naziv_poslodavca = ?, adresa_poslodavca = ?, tip_zaposlenja = ?, radni_staz_kod_trenutnog_poslodavca = ?, radni_staz_meseci_godina = ?, ukupan_radni_staz_godine = ?, mesecni_neto_prihodi = ?, mesecne_obaveze_po_pitanju_kredita = ?, kredit_kasnjenje = ?, ID_proizvod = ?, file_administrativna_zabrana_path = ?, file_administrativna_zabrana_width = ?, file_administrativna_zabrana_height = ?, file_administrativna_zabrana_rotate = ?, file_potvrda_visini_primanja_path = ?, file_potvrda_visini_primanja_width = ?, file_potvrda_visini_primanja_height = ?, file_potvrda_visini_primanja_rotate = ?, file_zahtev_kredit_path = ?, file_zahtev_kredit_width = ?, file_zahtev_kredit_height = ?, file_zahtev_kredit_rotate = ?, licna_kart_chk = ?, lk_photo = ?, lk_data = ? WHERE id = ?', [ime, prezime, nosilac_kredita, jmbg, telefon, mob_tel, tel_ostalo, email, adresa_prebivalista, na_adresi_prebivalista_od, tip_stanovanja, bracno_stanje, broj_dece, broj_clanova_porodice, broj_zaposlenih_lica, broj_izdrzavanih, izvor_prihoda, obrazovanje, naziv_poslodavca, adresa_poslodavca, tip_zaposlenja, radni_staz_kod_trenutnog_poslodavca, radni_staz_meseci_godina, ukupan_radni_staz_godine, mesecni_neto_prihodi, mesecne_obaveze_po_pitanju_kredita, kredit_kasnjenje, ID_proizvod, file_administrativna_zabrana_path, file_administrativna_zabrana_width, file_administrativna_zabrana_height, file_administrativna_zabrana_rotate, file_potvrda_visini_primanja_path, file_potvrda_visini_primanja_width, file_potvrda_visini_primanja_height, file_potvrda_visini_primanja_rotate, file_zahtev_kredit_path, file_zahtev_kredit_width, file_zahtev_kredit_height, file_zahtev_kredit_rotate, licna_kart_chk, lk_photo, lk_data, global_upit_edit_id]);
		   
		   	UpitLista ();
			$.ui.hideMask();
			custom_alert("Upit je uspešno snimnjen.");
		   
		});
		
	}
	
}



function LKLoad () {
	
	$.ui.showMask();
	serbianeid.StartSerbianeIDwImg(LKLoad_ok, LKLoad_error, {});
	
	/*
	$('#UpitForma .licna_karta_hold .photo_box').show();
	$('#UpitForma [name=licna_kart_chk]').val('1');
	
	$('#UpitForma [name=ime]').val('Dex');
	$('#UpitForma [name=prezime]').val('Dexter');
	$('#UpitForma [name=jmbg]').val('123456789');
	$('#UpitForma [name=adresa_prebivalista]').val('adresa 12');

	//slika
	var img_path = './images/noavatar.jpg';
	img_path = img_base64;
	$('#UpitForma .licna_karta_hold [name=lk_photo]').val(img_path);
	$('#UpitForma .licna_karta_hold .img_hold').attr('src', img_path);
	$('#UpitForma .licna_karta_hold .img_hold').css({'max-height': '200px', 'max-width': '200px'});
	*/
}


function LKLoad_ok (data) {
	
	/*
	success:true/false
	
	last_state:
	1000; // No reader connected
	1001; // Reader is connected
	1002; // No card in the reader
	1003; // Known card inserted in the reader
	1004; // Unknown card inserted in the reader
	
	result:
	.put("surname", result.evI.getSurname())        
	.put("given_name", result.evI.getGivenName())        
	.put("parent_given_name", result.evI.getParentGivenName())        
	.put("date_of_birth", result.evI.getDateOfBirth())        
	.put("place_of_birth_full", result.evI.getPlaceOfBirthFull())        
	.put("place", result.evI.getPlace())        
	.put("place_full", result.evI.getPlaceFull("ulaz %s", "%s. sprat", "br. %s"))        
	.put("personal_number", result.evI.getPersonalNumber())        
	.put("sex", result.evI.getSex())        
	.put("issuing_authority", result.evI.getIssuingAuthority())        
	.put("document_reg_num", result.evI.getDocRegNo())        
	.put("issuing_date", result.evI.getIssuingDate())        
	.put("expiry_date", result.evI.getExpiryDate())
	*/
	
	$.ui.hideMask();
	
	//custom_alert(JSON.stringify(data));

	if (data['success'] == true && data['last_state'] == 1003) {

		$('#UpitForma .licna_karta_hold .photo_box').show();
		$('#UpitForma [name=licna_kart_chk]').val('1');
		$('#UpitForma [name=lk_data]').val(JSON.stringify(data['result']));
		
		$('#UpitForma [name=ime]').val(data['result']['given_name']);
		$('#UpitForma [name=prezime]').val(data['result']['surname']);
		$('#UpitForma [name=jmbg]').val(data['result']['personal_number']);
		$('#UpitForma [name=adresa_prebivalista]').val(data['result']['place_full']);
	
		//slika
		var img_path = './images/noavatar.jpg';
		//img_path = img_base64;
		if (data['result']['img_base64'] && typeof(data['result']['img_base64']) !== 'undefined') img_path = "data:image/jpeg;base64," + data['result']['img_base64'];
		$('#UpitForma .licna_karta_hold [name=lk_photo]').val(img_path);
		$('#UpitForma .licna_karta_hold .img_hold').attr('src', img_path);
		$('#UpitForma .licna_karta_hold .img_hold').css({'max-height': '200px', 'max-width': '200px'});
	
	} else if (data['last_state'] == 1000) {
		custom_alert('Čitač kartice nije priključen za uređaj.');
	} else if (data['last_state'] == 1001) {
		custom_alert('Ubacite karticu u čitač kartica.');
	} else if (data['last_state'] == 1002) {
		custom_alert('Kartica nije ubačena u čitač kartica.');
	} else if (data['last_state'] == 1004) {
		custom_alert('Kartica koja je ubačena u čitač kartica nije odgovarajućeg formata.');
	}
	
}

function LKLoad_error (data) {
	
	$.ui.hideMask();
	custom_alert('Greška: ' + JSON.stringify(data));
	
}



function UpitSetPhoto (holder) {
	
	$('#UpitForma '+holder+' [name=file_path]').val(global_fileURL);
	$('#UpitForma '+holder+' .img_link').html('<img src="'+global_fileURL+'" class="img_hold" />');
	$('#UpitForma '+holder+' .photo_box').show();
	$('#UpitForma '+holder+' .img_link').attr("onclick", "PhotoPreView('"+global_fileURL+"');");
	
	$('#UpitForma '+holder+' .img_hold').load(function(){
		if ($(this).height() > 0) {
			$('#UpitForma '+holder+' [name=file_width]').val(parseInt ($(this).width()));
			$('#UpitForma '+holder+' [name=file_height]').val(parseInt ($(this).height()));
			$('#UpitForma '+holder+' .img_hold').css({'max-height': '200px', 'max-width': '200px', 'opacity': '1'});
		}		
	});
	
}


function UpitPhotoDel (holder) {

	$('#UpitForma '+holder+' input').val('');	
	$('#UpitForma '+holder+' .photo_box').hide();
	
}


function UpitPhotoRotate (holder) {
	
	var rotate = parseInt ($('#UpitForma '+holder+' [name=file_rotate]').val());
	rotate = rotate + 90;
	if (rotate >= 360) rotate = 0;
	$('#UpitForma '+holder+' .photo_box img').css({'transform':'rotate('+rotate+'deg)', '-ms-transform':'rotate('+rotate+'deg)', '-webkit-transform':'rotate('+rotate+'deg)'});
	$('#UpitForma '+holder+' [name=file_rotate]').val(rotate);
	
}


function UpitPhotoRotate_2 (holder, rotate) {
	
	$('#UpitForma '+holder+' .photo_box img').css({'transform':'rotate('+rotate+'deg)', '-ms-transform':'rotate('+rotate+'deg)', '-webkit-transform':'rotate('+rotate+'deg)'});
	
}


function UpitCreateTable () {

	var db = OpenDB();
	/*
	//ovo se pusti kada se nesto menja u tabeli
	db.transaction(function (tx) {
	  tx.executeSql('DROP TABLE sales_leads');
	});
	*/
	db.transaction(function (tx) {  
	   tx.executeSql('CREATE TABLE IF NOT EXISTS sales_leads (id unique, ime, prezime, nosilac_kredita, jmbg, telefon, mob_tel, tel_ostalo, email, adresa_prebivalista, na_adresi_prebivalista_od, tip_stanovanja, bracno_stanje, broj_dece, broj_clanova_porodice, broj_zaposlenih_lica, broj_izdrzavanih, izvor_prihoda, obrazovanje, naziv_poslodavca, adresa_poslodavca, tip_zaposlenja, radni_staz_kod_trenutnog_poslodavca, radni_staz_meseci_godina, ukupan_radni_staz_godine, mesecni_neto_prihodi, mesecne_obaveze_po_pitanju_kredita, kredit_kasnjenje, ID_proizvod, file_administrativna_zabrana_path, file_administrativna_zabrana_width, file_administrativna_zabrana_height, file_administrativna_zabrana_rotate, file_potvrda_visini_primanja_path, file_potvrda_visini_primanja_width, file_potvrda_visini_primanja_height, file_potvrda_visini_primanja_rotate, file_zahtev_kredit_path, file_zahtev_kredit_width, file_zahtev_kredit_height, file_zahtev_kredit_rotate, licna_kart_chk, lk_photo, lk_data)');
	});		
	
}


function UpitDel () {
	
	$("#afui").popup({
		title:global_app_title,
		message:"Dali ste sigurni da želite da obrišete?",
		cancelText:"NE",
		cancelCallback: function(){
			//	
		},
		doneText:"DA",
		doneCallback: function(){
		
			$.ui.showMask();
			var db = OpenDB();
			
			db.transaction(function (tx) {  
				
				tx.executeSql('delete from sales_leads where id=?', [global_upit_edit_id]);
			   
				UpitLista ();
				$.ui.hideMask();
				custom_alert("Upit je uspešno obrisan.");
			   
			});	
			
		},
		cancelOnly:false,
	});

}



function UpitSync (type) {

	var db = OpenDB();
	global_upit_upload_type = 1;
	global_upit_upload_id = 0;
	
	var networkState;
	if (local_chk == 1 || local_chk == 2 || local_chk == 3 || local_chk == 20) {
		networkState = navigator.connection.type;
	} else {
		networkState = "wifi";
	}

	if (networkState == '4g' || networkState == '3g' || networkState == 'wifi') {
		
		db.transaction(function (tx) {
		   tx.executeSql('SELECT * FROM sales_leads order by id desc limit 1', [], function (tx, results) {
			   
				//console.log (results);
				
				var len = results.rows.length, i;
				var html = '';
				
				if (len > 0) {
				
					for (i = 0; i < len; i++){
						
						global_upit_upload_results = results;
						var upit_id = results.rows.item(i)['id'];
						$('#UpitLista .upit_hold_' + upit_id).prepend('<div class="upit_percentage_hold"><div class="percentage_hold"><div class="percentage"></div></div></div>');
						$('#UpitLista .upit_hold_' + upit_id + ' .percentage').css({'width':'5%'});
	
						var post_data = JSON.stringify (results.rows.item(i));
	
						jQuery.ajax({
							url: global_host + '/action_mobile.php',
							//dataType: 'jsonp', //zbog POST ovde nemoze da ide JSONP
							method: 'POST',
							data: {page: 'UpitSync', js_data_array: post_data, uuid: global_uuid, ID_users: global_login_data['ID_users'], kanal_id: global_login_data['kanal_id']},
							timeout: global_ajax_timeout,
							success: function(dataReceived) {
								
								var data = JSON.parse (dataReceived);
								//console.log (data);
								
								if (data['message']) custom_alert(data['message']);	
								
								if (data['action'] == 'ok' && data['id'] > 0) {
									
									global_upit_upload_id = data['id'];
									$('#UpitLista .upit_hold_' + upit_id + ' .percentage').css({'width':'25%'});
									UpitUplodFile();
									
								} else {
									
									jQuery('#UpitLista .upit_hold_' + upit_id + ' .upit_percentage_hold').remove();
										
								}
								
							},
							error : function() {
								jQuery('#UpitLista .upit_hold_' + upit_id + ' .upit_percentage_hold').remove();
								custom_alert ("Nemožemo da uspostavimo vezu sa serverom. Probajte ponovo.");
							}
						});
						
					}
					
				} else {
					
					if (type == 1) {
						custom_alert('Nema upita za slanje.');
					} else if (type == 2) {
						custom_alert('Upiti su uspešno poslati.');	
						CameraCleanup ();
						UpitLista();
					}
					
				}
				
		   }, null);
		});	
		
	} else {
	
		custom_alert('Internet konekcija mora da bude najmanje 3G.');	
		
	}
	
}



function UpitUplodFile () {
	
	var promenjive;
	var fileURL;
	
	switch(global_upit_upload_type) {
		case 1:
			if (global_upit_upload_results.rows.item(0)['file_administrativna_zabrana_path'] && typeof(global_upit_upload_results.rows.item(0)['file_administrativna_zabrana_path']) !== 'undefined' && global_upit_upload_results.rows.item(0)['file_administrativna_zabrana_path'] !== null) {
				promenjive = "page=UpitUplodFile&id="+global_upit_upload_id+"&upit_upload_type="+global_upit_upload_type+"&width="+global_upit_upload_results.rows.item(0)['file_administrativna_zabrana_width']+"&height="+global_upit_upload_results.rows.item(0)['file_administrativna_zabrana_height']+"&rotate="+global_upit_upload_results.rows.item(0)['file_administrativna_zabrana_rotate']+"&platform="+global_platform;
				fileURL = global_upit_upload_results.rows.item(0)['file_administrativna_zabrana_path'];
			}
		break;
		case 2:
			if (global_upit_upload_results.rows.item(0)['file_potvrda_visini_primanja_path'] && typeof(global_upit_upload_results.rows.item(0)['file_potvrda_visini_primanja_path']) !== 'undefined' && global_upit_upload_results.rows.item(0)['file_potvrda_visini_primanja_path'] !== null) {
				promenjive = "page=UpitUplodFile&id="+global_upit_upload_id+"&upit_upload_type="+global_upit_upload_type+"&width="+global_upit_upload_results.rows.item(0)['file_potvrda_visini_primanja_width']+"&height="+global_upit_upload_results.rows.item(0)['file_potvrda_visini_primanja_height']+"&rotate="+global_upit_upload_results.rows.item(0)['file_potvrda_visini_primanja_rotate']+"&platform="+global_platform;
				fileURL = global_upit_upload_results.rows.item(0)['file_potvrda_visini_primanja_path'];
			}
		break;
		case 3:
			if (global_upit_upload_results.rows.item(0)['file_zahtev_kredit_path'] && typeof(global_upit_upload_results.rows.item(0)['file_zahtev_kredit_path']) !== 'undefined' && global_upit_upload_results.rows.item(0)['file_zahtev_kredit_path'] !== null) {
				promenjive = "page=UpitUplodFile&id="+global_upit_upload_id+"&upit_upload_type="+global_upit_upload_type+"&width="+global_upit_upload_results.rows.item(0)['file_zahtev_kredit_width']+"&height="+global_upit_upload_results.rows.item(0)['file_zahtev_kredit_height']+"&rotate="+global_upit_upload_results.rows.item(0)['file_zahtev_kredit_rotate']+"&platform="+global_platform;
				fileURL = global_upit_upload_results.rows.item(0)['file_zahtev_kredit_path'];
			}
		break;
	}
	
	global_upit_upload_type = global_upit_upload_type + 1;
	
	if (typeof(promenjive) !== 'undefined' && typeof(fileURL) !== 'undefined') {
	
		var url_post = encodeURI (global_host + "/action_mobile.php?uuid="+global_uuid+"&ID_users="+global_login_data['ID_users']+"&" + promenjive);

		var options = new FileUploadOptions();
		options.fileKey = "Filedata";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
		
		var ft = new FileTransfer();
		ft.onprogress = function(progressEvent) {
			UpitUplodFile_Progress (progressEvent.lengthComputable, progressEvent.loaded, progressEvent.total);
		};
		ft.upload(fileURL, url_post, UpitUplodFile_Win, UpitUplodFile_Fail, options);
		
	} else {
		
		UpitUplodFile_Win (true);
			
	}
	
}



function UpitUplodFile_Win(r) {
	
	var percentage = parseInt (global_upit_upload_type * 25);
	$('#UpitLista .upit_hold_' + global_upit_upload_results.rows.item(0)['id'] + ' .percentage').css({'width':percentage+'%'});
	
	if (global_upit_upload_type <= 3) {
		
		UpitUplodFile ();
		
	} else {
		
		var db = OpenDB();
		jQuery.ajax({
			url: global_host + '/action_mobile.php',
			dataType: 'jsonp',
			data: {page: 'UpitSyncPublish', id: global_upit_upload_id, uuid: global_uuid, ID_users: global_login_data['ID_users'], kanal_id: global_login_data['kanal_id']},
			timeout: global_ajax_timeout,
			success: function(dataReceived) {
				
				if (dataReceived['action'] == 'ok') {
					db.transaction(function (tx) {  
						tx.executeSql('delete from sales_leads where id=?', [global_upit_upload_results.rows.item(0)['id']]);
						jQuery('#UpitLista .upit_hold_' + global_upit_upload_results.rows.item(0)['id']).fadeOut('slow');
						UpitSync(2);
					});	
				} else {
					UpitUplodFile_Fail(true);
				}
				
			},
			error : function() {
				UpitUplodFile_Fail(true);
			}
		});				
		
	}
	
}

function UpitUplodFile_Fail(error) {
	jQuery('#UpitLista .upit_hold_' + global_upit_upload_results.rows.item(0)['id'] + ' .upit_percentage_hold').remove();
	custom_alert("Prebacivanje upita nije uspelo. Probajte ponovo.");
}


function UpitUplodFile_Progress (lengthComputable, bytesSent, totalBytes) {

	if (bytesSent > 0 && lengthComputable==true) {
		
		var percentage = parseInt ( ((global_upit_upload_type-1) * 25) + (Math.ceil (bytesSent * 100 / totalBytes) / 4) );
		$('#UpitLista .upit_hold_' + global_upit_upload_results.rows.item(0)['id'] + ' .percentage').css({'width':percentage+'%'});
		
	} else {
		
		//
		
	}
	
}




function ProizvodiSync () {

	var db = OpenDB();

	$.ui.showMask();
	
	jQuery.ajax({
		url: global_host + '/action_mobile.php',
		dataType: 'jsonp',
		data: {page: 'ProizvodiSync', uuid: global_uuid, ID_users: global_login_data['ID_users'], kanal_id: global_login_data['kanal_id']},
		timeout: global_ajax_timeout,
		success: function(dataReceived) {
			
			//console.log (dataReceived);
			
			$.ui.hideMask();
			
			if (dataReceived['action'] == 'ok') {
				
				var proizvodi = dataReceived['proizvodi'];
				
				if (proizvodi.length > 0) {
					
					db.transaction(function (tx) {  
						
						tx.executeSql('delete from sifarnik_proizvoda');
					   
					});	

					db.transaction(function (tx) {  
					
						for (i = 0; i < proizvodi.length; i++){
							tx.executeSql("INSERT INTO sifarnik_proizvoda (ID_proizvod, title, type) VALUES (?,?,?)", [ proizvodi[i]['ID_proizvod'], proizvodi[i]['title'], proizvodi[i]['type'] ]);
					   }
					   
					   SetProizvodi (true);
					   custom_alert('Uspešno učitani proizvodi.');
					   
					});	
					
				} else {
				
					custom_alert('Nema proizvoda u bazi.');	
					
				}

			} else {
			
				custom_alert('Proizvodi nisu učitani. Probajte ponovo');	
				
			}
			
		},
		error : function() {
			$.ui.hideMask();
			custom_alert ("Nemožemo da uspostavimo vezu sa serverom. Probajte ponovo.");
		}
	});		
	
}


function SetProizvodi (redirect) {

	var db = OpenDB();
	global_proizvodi_select = new Array();
	
	/*
	//ovo se pusti kada se nesto menja u tabeli
	db.transaction(function (tx) {
	  tx.executeSql('DROP TABLE sifarnik_proizvoda');
	});
	*/
	
	db.transaction(function (tx) {  
	   tx.executeSql('CREATE TABLE IF NOT EXISTS sifarnik_proizvoda (ID_proizvod unique, title, type)');
	});	
	
	
	db.transaction(function (tx) {
	   tx.executeSql('SELECT * FROM sifarnik_proizvoda order by title', [], function (tx, results) {	
			var len = results.rows.length, i;
			if (len > 0) {
				global_proizvodi_select = results;
			}
			if (redirect == true) UpitForma();
	   }, null );

	});
	
}
































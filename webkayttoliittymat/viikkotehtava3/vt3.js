"use strict";  // pidä tämä ensimmäisenä rivinä

console.log(data);
//var joukkueenJasenet = [];
var muokattavanJoukkueenNimi = "";
var muokattavanJoukkueenSarja = "";
var leimausTavat = new Set();
window.onload = function(){
	
	lomake();
	sarjaLomake();
	joukkueidenTulostus();
	
};

function lomake(){
	leimaus();
	sarja();
	nappula();
	document.getElementById('lomake').addEventListener("submit",tallenna);
	
	var nimi = document.getElementById('nimiInput');
	nimi.addEventListener('input',nimiTarkistin);
	jasenetLomake();
	
}

function sarjaLomake(){
	document.getElementById('sarjaLomake').addEventListener("submit",tallennaSarja);
	tarkistimet();
}

function leimaus(){
	var leimausCheckBox = document.getElementsByClassName('box');
	var tavat = [];
	var onko = false;
	//var br = document.createElement('br');
	//document.getElementsByClassName('box')[0].appendChild(br);
	for(let i in data){
		for(let j in data[i]['leimaustapa']){
			for(let k = 0; k < tavat.length;k++){
				if(tavat[k] == data[i]['leimaustapa'][j]){
					onko = true;
				}
			}
			if(!onko){
				tavat.push(data[i]['leimaustapa'][j]);
			}
			onko = false;
		}
	}
	
	for(let i = 0; i < tavat.length;i++){
		var div = document.createElement('div');
		div.setAttribute('class','leima');
		var input = document.createElement('input');
		input.setAttribute('type','checkbox');
		input.setAttribute('name','leimaus');
		input.setAttribute('value',tavat[i]);
		input.addEventListener('change',checkBoxLisäysJaPoisto);
		input.setCustomValidity("valitse ainakin yksi leimautapa");
		var label = document.createElement('label');
		label.setAttribute('class','tavatnimet');
		label.textContent = tavat[i];
		label.appendChild(input);
		div.appendChild(label);
		
		leimausCheckBox[1].appendChild(div);
		
	}
	
}
//luo sarja osion lomakkeeseen
function sarja(){
	var leimausCheckBox = document.getElementsByClassName('box');
	leimausCheckBox[3].textContent = "";
	var sarjat = [];
	var onko = false;
	for(let i in data){
		for(let j in data[i]['sarjat']){
			for(let k = 0; k < sarjat.length;k++){
				if(sarjat[k] == data[i]['sarjat'][j].nimi){
					onko = true;
				}
			}
			if(!onko){
				sarjat.push(data[i]['sarjat'][j].nimi);
				
			}
			onko = false;
		}
	}
	sarjat.sort(nimi);
	var div = document.createElement('div');
		//div.setAttribute('class','box');
		var input = document.createElement('input');
		input.setAttribute('type','radio');
		input.setAttribute('name','sarja');
		input.setAttribute('checked','true');
		input.setAttribute('value',sarjat[0]);
		var label = document.createElement('label');
		label.setAttribute('class','tavatnimet');
		label.textContent = sarjat[0];
		label.appendChild(input);
		div.appendChild(label);
		leimausCheckBox[3].appendChild(div);
	
	
	
	for(let i = 1; i < sarjat.length;i++){
		div = document.createElement('div');
		//div.setAttribute('class','box');
		input = document.createElement('input');
		input.setAttribute('type','radio');
		input.setAttribute('name','sarja');
		input.setAttribute('required','True');
		input.setAttribute('value',sarjat[i]);
		label = document.createElement('label');
		label.setAttribute('class','tavatnimet');
		label.textContent = sarjat[i];
		label.appendChild(input);
		div.appendChild(label);
		leimausCheckBox[3].appendChild(div);
	}
}
//luo tallennus napin lomakkeelle
function nappula(){
	var lomake = document.getElementById('lomake');
	var tallennusNappi = document.createElement('button');
	//tallennusNappi.setAttribute('type','submit');
	//tallennusNappi.addEventListener("submit", tallenna);
	//tallennusNappi.value = "tallenna";
	tallennusNappi.textContent = "tallenna";
	lomake.appendChild(tallennusNappi);
}




//tallentaa lomakkeella tehdyn joukkueen dataan
function tallenna(e){
	e.preventDefault();
	document.getElementsByTagName('h3')[0].textContent = "";
	
	var radio = document.getElementsByName('sarja');
	
	for(let i = 0; i < radio.length;i++){
		if(radio[i].checked){
			var sarja = radio[i].parentElement.textContent;
			break;
		}
	}
	var tavat = [];
	
	for(let i of leimausTavat){
		tavat.push(i);
	}
	var id = 0;
	var onko = true;
	while(onko){
		onko  = false; 
		id = Math.floor(Math.random() * Math.floor(1000000000000000));
		for (let i in data) {
			for(let j in data[i]['sarjat']){
				for(let k in data[i]['sarjat'][j]['joukkueet']){
				
					if(id == data[i]['sarjat'][j]['joukkueet'][k].id){
						onko = true;
					}
				}
	
			}
			
		}
	
	}
	var jasenInputit = document.getElementsByClassName('jasenInput');
	var joukkueenJasenet = [];
	for(let i of jasenInputit){
		if(i.value != ""){
		joukkueenJasenet.push(i.value);
		
		}
	}		
	
	
	var joukkue = {
		'nimi': document.getElementById('nimiInput').value,
		'id': id,
		'rastit':[],
		'jasenet': joukkueenJasenet,
		'leimaustapa': tavat
	};
	var kilpailu = "Jäärogaining";
	
	
	
	if(muokattavanJoukkueenNimi != ""){
		poistaJoukkue(kilpailu,muokattavanJoukkueenSarja,muokattavanJoukkueenNimi);
	}
	
	lisaaJoukkue(kilpailu,joukkue,sarja);
	
	document.getElementById('nimiInput').value = "";
	leimausTavat = new Set();
	var leimaukset = document.getElementsByName('leimaus');
	for(let i = 0; i < leimaukset.length;i++){
		leimaukset[i].checked = "";
	}
	var sarjat = document.getElementsByName('sarja');
	for(let i = 0; i < sarjat.length;i++){
		sarjat[i].checked = "";
	}
	sarjat[0].checked = 'checked';
	var i = 0;
	while(i < jasenInputit.length){
		jasenInputit[i].value = "";
		if(jasenInputit.length > 5){
			jasenInputit[i].parentNode.parentNode.parentNode.removeChild(jasenInputit[i].parentNode.parentNode);
			continue;
		}
		i++;
	}
	
	
	document.getElementsByTagName('h3')[0].textContent = "Joukkue "+ joukkue.nimi + " on lisätty";
	muokattavanJoukkueenNimi = "";
	muokattavanJoukkueenSarja = "";
	
	joukkueidenTulostus();
	
	
}
//lisää uuden joukkueen dataan
function lisaaJoukkue(kilpailu, joukkue, sarja){
	
	for (let i in data) {
		if(data[i].nimi == kilpailu){
			for(let j in data[i]['sarjat']){
			
				if(data[i]['sarjat'][j].nimi == sarja){
					
					data[i]['sarjat'][j]['joukkueet'].push(joukkue);
					
				}
			}
		}
	}
	
}


//funktio, joka osaa poistaa tietorakenteesta kilpailun nimen, sarjan nimen ja joukkueen nimen perusteella joukkueen
function poistaJoukkue(kilpailu, sarja, joukkue) {
	
	for (let i in data) {
		if(data[i].nimi == kilpailu){
			for(let j in data[i]['sarjat']){
			
				if(data[i]['sarjat'][j].nimi == sarja){
					for(let k in data[i]['sarjat'][j]['joukkueet']){
						
						if(data[i]['sarjat'][j]['joukkueet'][k].nimi == joukkue){
							data[i]['sarjat'][j]['joukkueet'].splice(k,1);
						}
					}
				}
			}
		}
	}
	

}


// asettaa sarja lomakkeen elementtaihin rajoittimet
function tarkistimet(){
	document.getElementById('sarjaNimi').addEventListener('blur',sarjaNimiTarkistus);
	document.getElementById('kesto').addEventListener('blur',kestoTarkistus);
	document.getElementById('alku').addEventListener('blur',alkuJaLoppuTarkistus);
	//aikaero tunteina
	var aikaero = new Date(0).getTimezoneOffset() / 60;
	aikaero = Math.abs(aikaero);
	var alkuaika = new Date(data[2].alkuaika);
	alkuaika.setHours(alkuaika.getHours() + aikaero);
	var loppuaika = new Date(data[2].loppuaika);
	loppuaika.setHours(loppuaika.getHours() + aikaero);
	
	document.getElementById('alku').setAttribute('min', alkuaika.toISOString().substr(0, 16));
	document.getElementById('alku').setAttribute('max', loppuaika.toISOString().substr(0, 16));
	document.getElementById('loppu').addEventListener('blur',alkuJaLoppuTarkistus);
	document.getElementById('loppu').setAttribute('min', alkuaika.toISOString().substr(0, 16));
	document.getElementById('loppu').setAttribute('max', loppuaika.toISOString().substr(0, 16));
	
}

function sarjaNimiTarkistus(e){
	e.preventDefault();
	if(e.target.validity.valueMissing){
		e.target.setCustomValidity("sarjalle pitää antaa nimi");
		return undefined;
	} 
	
	var kilpailu = "Jäärogaining";
	for (let i in data) {
		if(data[i].nimi == kilpailu){
			for(let j in data[i]['sarjat']){
				if(data[i]['sarjat'][j].nimi == e.target.value){
				e.target.setCustomValidity("tämän niminen sarja on jo olemassa");
				return undefined;
				}
			}
		}
	}
	e.target.setCustomValidity("");
	
	
}

function kestoTarkistus(e){
	e.preventDefault();
	if(e.target.validity.valueMissing){
		e.target.setCustomValidity("sarjalla pitää olla kesto");
		return undefined;
	} 
	if(e.target.validity.rangeUnderflow){
		e.target.setCustomValidity("sarjan kesto on liian lyhyt");
		return undefined;
	}
	e.target.setCustomValidity("");
}

function alkuJaLoppuTarkistus(e){
	e.preventDefault();
	var alku = document.getElementById('alku');
	var loppu = document.getElementById('loppu');
	var kesto = document.getElementById('kesto');
	if(alku.validity.rangeUnderflow){
		alku.setCustomValidity("alkuaika liian aikaisin");
		return undefined;
	}
	if(alku.validity.badInput){
		alku.setCustomValidity("anna oikeanlainen aika");
		return undefined;
	}
	if(loppu.validity.badInput){
		alku.setCustomValidity("anna oikeanlainen aika");
		return undefined;
	}
	
	if(loppu.validity.rangeOverflow){
		loppu.setCustomValidity("loppuaika liian myöhään");
		return undefined;
	}
	if(new Date(loppu.value) - new Date(alku.value) < 0){
		loppu.setCustomValidity("loppuaika ei voi olla pienempi kuin alkuaika");
		return undefined;
	}
	var aika = new Date(loppu.value) - new Date(alku.value);
	if( aika < kesto.value * 60*60*1000){
		loppu.setCustomValidity("loppuaika ei voi olla pienempi kuin alkuaika plus kesto");
		return undefined;
	}
	
	alku.setCustomValidity("");
	loppu.setCustomValidity("");
}

//tallentaa ja poistaa globaalista listasta leimaustapoja
function checkBoxLisäysJaPoisto(e){
	if(leimausTavat.has(e.target.value)){
		leimausTavat.delete(e.target.value);
	}else{
		leimausTavat.add(e.target.value);
	}
	
	var checkBox = document.getElementsByName('leimaus');
	if(leimausTavat.size > 0){
		for(let i = 0;i < checkBox.length;i++){
		checkBox[i].setCustomValidity("");
		}
	} else {
		for(let i = 0;i < checkBox.length;i++){
		checkBox[i].setCustomValidity("valitse ainakin yksi leimautapa");
		}
		
	} 
	
	
}

//tarkistaa että joukkueen nimi on oikeanlainen
function nimiTarkistin(e){
	var nimi = document.getElementById('nimiInput');
	if(nimi.validity.tooShort){
		nimi.setCustomValidity("nimi ei ole tarpeeksi pitkä");
		return undefined;
	} else if(nimi.validity.valueMissing){
		nimi.setCustomValidity("joukkueelle pitää antaa nimi");
		return undefined;
	} 
	
	var kilpailu = "Jäärogaining";
	for (let i in data) {
		if(data[i].nimi == kilpailu){
			for(let j in data[i]['sarjat']){
				for(let k in data[i]['sarjat'][j]['joukkueet']){
					if(data[i]['sarjat'][j]['joukkueet'][k].nimi.trim() == nimi.value.trim() && data[i]['sarjat'][j]['joukkueet'][k].nimi != muokattavanJoukkueenNimi ){
					
						nimi.setCustomValidity("tämän niminen joukkue on jo olemassa");
						return undefined;
					}
				}
			}
		}
	}
	
	nimi.setCustomValidity("");
}

//tuo kaikkien datassa olevien joukkueiden kaikki tiedot
function tuoKaikkiTiedot(){
	var rastit  = [];
	var joukkueet = [];
	
	for (let i in data) {
		for(let j in data[i]['rastit']){
			let pisteet = 0;
			if(Number.isInteger(parseInt(data[i]['rastit'][j].koodi.charAt(0)))) {
			pisteet = parseInt(data[i]['rastit'][j].koodi.charAt(0));
			}
			else{
				pisteet = 0;
			}
			let alkuloppu = false;
			if(data[i]['rastit'][j].koodi == "LAHTO" || data[i]['rastit'][j].koodi == "MAALI"){
				alkuloppu = true;
			}
			let rasti = {
				"id": data[i]['rastit'][j].id,
				"koodi": data[i]['rastit'][j].koodi,
				"pisteet": pisteet,
				"lon": data[i]['rastit'][j].lon,
				"lat": data[i]['rastit'][j].lat,
				"aika": new Date(0,0,0,0,0,0),
				"alkuloppu": alkuloppu
				
			};
			rastit.push(rasti);
		}
	}
	for (let i in data) {
		for(let j in data[i]['sarjat']){
			for(let k in data[i]['sarjat'][j]['joukkueet']){
				var rastit2 = [];
				var temp = [];
				for(let l in data[i]['sarjat'][j]['joukkueet'][k]['rastit']){
					
					for(let m = 0; m < rastit.length;m++){
						if(rastit[m].id == data[i]['sarjat'][j]['joukkueet'][k]['rastit'][l].rasti){
								
							let temprasti ={};
							Object.assign(temprasti,rastit[m]);
							temprasti.aika = new Date(data[i]['sarjat'][j]['joukkueet'][k]['rastit'][l].aika);
							temp.push(temprasti);
							break;
						}
						
					}
					
					
				}
				//etsitään lähdön id
				let viimeinenLahtoId =0;
				let maaliId = 0;
				for(let l = 0;l < rastit.length;l++){
					if(rastit[l].koodi == "LAHTO"){
						viimeinenLahtoId = rastit[l].id;
					}
				}
				let viimeinen;
				let loytyi;
				//etsitään indeksi jossa lähtö on
				for(let l = temp.length-1;l >= 0;l--){
					if(temp[l].id == viimeinenLahtoId){
						viimeinen = l;
						loytyi = true;
						break;
					}
				}
				//jos joukkue ei ole käynyt aloituksessa eivät he voi saada pisteitä
				if(!loytyi){
					let joukkue = {
					"nimi": data[i]['sarjat'][j]['joukkueet'][k].nimi,
					"rastit": rastit2,
					"pisteet": 0,
					"aika": new Date(0),//"00:00:00"
					"matka": 0,
					"sarja": data[i]['sarjat'][j].nimi,
					"jasenet":data[i]['sarjat'][j]['joukkueet'][k].jasenet,
					"id": data[i]['sarjat'][j]['joukkueet'][k].id,
					"leimaustapa": data[i]['sarjat'][j]['joukkueet'][k].leimaustapa
					};
					joukkueet.push(joukkue);
					continue;
				}
				loytyi = false;
				//poistetaan rastit jotka tulivat ennen viimeistä lähtöä
				temp = temp.splice(viimeinen,temp.length);
				viimeinen = 0;
				//etsitään maalin id
				for(let l = 0;l < rastit.length;l++){
					if(rastit[l].koodi == "MAALI"){
						maaliId = rastit[l].id;
						break;
					}
				}
				// etsitään ensimmäisen maalin indeksi
				for(let l = 0;l < temp.length;l++){
					if(temp[l].id == maaliId){
						viimeinen = l;
						loytyi = true;
						break;
					}
				}
				
				if(loytyi){
					temp = temp.splice(0,viimeinen+1);
				}
				else{
					temp = temp.splice(0,temp.length);
				}
				let onko;
				for(let l = 0; l < temp.length;l++){
					
					for(let m = 0; m < rastit2.length;m++){
						if( rastit2[m].id == temp[l].id){
							onko = true;
							break;
						}
					}
					if(!onko){
						rastit2.push(temp[l]);
					}
					onko = false;
				}
				
				let s = rastit2[rastit2.length-1].aika - rastit2[0].aika;
				var ms = s % 1000;
				s = (s - ms) / 1000;
				var secs = s % 60;
				s = (s - secs) / 60;
				var mins = s % 60;
				var hrs = (s - mins) / 60;
				let suoritusAika = new Date(0);
				
				//jostain syystä setHours pudottaa tunnista 2 pois joten tunteihin pitää lisätä +2
				suoritusAika.setHours(hrs+2,mins,secs);
				let joukkue = {
					"nimi": data[i]['sarjat'][j]['joukkueet'][k].nimi,
					"rastit": rastit2,
					"pisteet": 0,
					"matka": 0,
					"aika": suoritusAika, 
					"sarja": data[i]['sarjat'][j].nimi,
					"jasenet": data[i]['sarjat'][j]['joukkueet'][k].jasenet,
					"id": data[i]['sarjat'][j]['joukkueet'][k].id,
					"leimaustapa": data[i]['sarjat'][j]['joukkueet'][k].leimaustapa
				};
				joukkueet.push(joukkue);
			}
		}
	}
	
	
	
	for(let i = 0; i < joukkueet.length;i++){
		for(let j = 0;j < joukkueet[i].rastit.length;j++){
			joukkueet[i].pisteet += joukkueet[i].rastit[j].pisteet;
		}
	}
	for(let i = 0; i < joukkueet.length;i++){
		for(let j = 0;j < joukkueet[i].rastit.length-1;j++){
			joukkueet[i].matka += getDistanceFromLatLonInKm(joukkueet[i].rastit[j].lat,joukkueet[i].rastit[j].lon,joukkueet[i].rastit[j+1].lat,joukkueet[i].rastit[j+1].lon);
		}
	}
	
	
	return joukkueet;
	
}

//tulostaa joukkueet ja jäsenet listana
function joukkueidenTulostus(){
	var lista = document.getElementById('joukkueet');
	lista.textContent = "";
	var joukkueet = tuoKaikkiTiedot();
	joukkueet.sort(nimiVertaus);
	for(let i = 0;i < joukkueet.length;i++){
		var li = document.createElement('li');
		var a = document.createElement('a');
		a.textContent = joukkueet[i].nimi;
		a.setAttribute("href","#Tulospalvelu");
		a.addEventListener("click", muokkaaJoukkuetta);
		a.joukkue = joukkueet[i];
		//lista.appendChild(li);
		li.appendChild(a);
		joukkueet[i].jasenet.sort(vertailia);
		var jasenLista = document.createElement('ul');
		for(let j = 0; j < joukkueet[i].jasenet.length;j++){
			var jasen = document.createElement('li');
			jasen.textContent = joukkueet[i].jasenet[j];
			jasenLista.appendChild(jasen);
			
		}
		li.appendChild(jasenLista);
		lista.appendChild(li);
	}
	
}


//opettajan matkalaskin
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}



function jasenetLomake(){
	var lomake = document.getElementById('jasenet');
	for(let i = 0; i < 5; i++){
		var p = document.createElement('p');
		p.setAttribute('class','jasen');
		var label = document.createElement('label');
		label.textContent = "jäsen";
		var input = document.createElement('input');
		input.setAttribute('type','text');
		input.setAttribute('class','jasenInput');
		input.addEventListener('blur',jasenTarkastus);
		input.uniikkiNimi = Math.floor(Math.random() * Math.floor(1000000000000000));
		input.setCustomValidity("joukkueessa pitää olla ainakin kaksi jäsentä");
		label.appendChild(input);
		p.appendChild(label);
		lomake.appendChild(p);
	}
	
	
}
//tarkistaa onko jäsen osio lomakkeeesta täytetty oikein ja lisää tai poistaa tarpeen mukaan inputteja
function jasenTarkastus(e){
	e.preventDefault();
	var jasenet = document.getElementsByClassName('jasenInput');
	if(e.target.value == "" && jasenet.length > 5){
		e.target.setCustomValidity("");
		e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
		return undefined;
	}
	
	
	
	for(let i of jasenet){
		
		if(i.value == e.target.value && i.uniikkiNimi != e.target.uniikkiNimi && e.target.value != "") {
			e.target.setCustomValidity("joukkueella ei voi olla kahta saman nimistä jäsentä");
			return undefined;
		}
	}
	
	var onko = false;
	for(let i = 0;i < jasenet.length;i++){
		if(jasenet[i].value == ""){
			onko = true;
		}
	}
	if(!onko){
		var lomake = document.getElementById('jasenet');
		var p = document.createElement('p');
		p.setAttribute('class','jasen');
		var label = document.createElement('label');
		label.textContent = "jäsen";
		var input = document.createElement('input');
		input.setAttribute('type','text');
		input.setAttribute('class','jasenInput');
		input.addEventListener('blur',jasenTarkastus);
		input.uniikkiNimi = Math.floor(Math.random() * Math.floor(1000000000000000));
		label.appendChild(input);
		p.appendChild(label);
		lomake.appendChild(p);
	}


	onko = false;
	for(let i = 0; i < jasenet.length;i++){
		if(jasenet[i].value != ""){
			for(let j = i+1; j < jasenet.length;j++){
				if(jasenet[j].value != ""){
					for(let k = 0; k < jasenet.length;k++){
						jasenet[k].setCustomValidity("");
						onko = true;
					}
				}
			}
		}
	}
	if(onko){
		return undefined;
	}
	for(let i = 0; i < jasenet.length;i++){
		jasenet[i].setCustomValidity("joukkueessa pitää olla ainakin kaksi jäsentä");
	}
	
	
	//e.target.setCustomValidity("");
	
}

function muokkaaJoukkuetta(e){
	e.preventDefault();
	var joukkue = e.target.joukkue;
	muokattavanJoukkueenNimi = joukkue.nimi;
	muokattavanJoukkueenSarja = joukkue.sarja;
	document.getElementById('nimiInput').value = joukkue.nimi;
	document.getElementById('nimiInput').setCustomValidity("");
	leimausTavat = new Set();
	var checkBox = document.getElementsByName('leimaus');
	for(let i = 0; i < checkBox.length;i++){
		checkBox[i].checked = false;
		checkBox[i].setCustomValidity("");
	}
	for(let i = 0; i < joukkue.leimaustapa.length;i++){
		leimausTavat.add(joukkue.leimaustapa[i]);
	}
	for(let i of leimausTavat){
		for(let j = 0; j < checkBox.length;j++){
			if(i == checkBox[j].value){
				checkBox[j].checked = true;
			}
		
		}
	}
	var sarjat = document.getElementsByName('sarja');
	for(let i = 0;i < sarjat.length;i++){
		sarjat[i].checked = false;
	}
	for(let i = 0;i < sarjat.length;i++){
		if(sarjat[i].value == joukkue.sarja ){
			sarjat[i].checked = true;
		}
	}
	
	var lomake = document.getElementById('jasenet');
	while (lomake.firstChild) {
		lomake.removeChild(lomake.firstChild);
	}
	
	
	for(let i = 0; i < joukkue.jasenet.length; i++){
		var p = document.createElement('p');
		p.setAttribute('class','jasen');
		var label = document.createElement('label');
		label.textContent = "jäsen";
		var input = document.createElement('input');
		input.setAttribute('type','text');
		input.setAttribute('class','jasenInput');
		input.value = joukkue.jasenet[i];
		input.addEventListener('blur',jasenTarkastus);
		input.uniikkiNimi = Math.floor(Math.random() * Math.floor(1000000000000000));
		label.appendChild(input);
		p.appendChild(label);
		lomake.appendChild(p);
	}
	var jasenInputit = document.getElementsByClassName('jasen');
	while(jasenInputit.length < 5){
		p = document.createElement('p');
		p.setAttribute('class','jasen');
		label = document.createElement('label');
		label.textContent = "jäsen";
		input = document.createElement('input');
		input.setAttribute('type','text');
		input.setAttribute('class','jasenInput');
		input.addEventListener('blur',jasenTarkastus);
		input.uniikkiNimi = Math.floor(Math.random() * Math.floor(1000000000000000));
		label.appendChild(input);
		p.appendChild(label);
		lomake.appendChild(p);
	}
	
}

function tallennaSarja(e){
	e.preventDefault();
	
	var nimi = document.getElementById('sarjaNimi');
	var kesto = document.getElementById('kesto');
	var alku = document.getElementById('alku');
	var loppu = document.getElementById('loppu');
	
	
	
	var sarja2 = {
		'nimi': nimi.value,
		'kesto': parseInt(kesto.value),
		'alkuaika': "",
		'loppuaika':"",
		'joukkueet':[]
	};
	if(alku.value == ""){
		sarja2.alkuaika = null;
	}else {
		var temp = alku.value.slice(0,10);
		var temp2 = alku.value.slice(11,16);
		sarja2.alkuaika = temp + " " + temp2;
	}
	if(loppu.value == ""){
		sarja2.loppuaika = null;
	}else {
		temp = loppu.value.slice(0,10);
		temp2 = loppu.value.slice(11,16);
		sarja2.loppuaika = temp + " " + temp2;
	}
	var kilpailu = "Jäärogaining";
	lisaaSarja(sarja2,kilpailu);
	document.getElementsByTagName('h4')[0].textContent = "sarja " + nimi.value + " lisätty";
	var sarjat = document.getElementsByClassName('box');
	var x = sarjat[3];
	while (x.firstChild) {
    
    x.removeChild(x.firstChild);
}	

	nimi.value = "";
	kesto.value = "";
	alku.value = "";
	loppu.value = "";
	sarja();
	
}

function lisaaSarja(sarja,kilpailu){
	
	for (let i in data) {
		if(data[i].nimi == kilpailu){
			data[i].sarjat.push(sarja);
			
		}
	}
	
	
}




function nimiVertaus(a,b){
	if(a.nimi.toUpperCase() > b.nimi.toUpperCase()){
	return 1;}
	if(a.nimi.toUpperCase() < b.nimi.toUpperCase()) {
	return -1;}
	
	return 0;
}

function nimi(a,b){
	if(a.toUpperCase() > b.toUpperCase()){
	return 1;}
	if(a.toUpperCase() < b.toUpperCase()) {
	return -1;}
	
	return 0;
}

function vertailia(a,b){
	if(a.toUpperCase() > b.toUpperCase()){
	return 1;}
	if(a.toUpperCase() < b.toUpperCase()) {
	return -1;}
	
	return 0;
}







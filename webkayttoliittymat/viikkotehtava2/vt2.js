// data-muuttuja on sama kuin viikkotehtävässä 1.
//

"use strict";

console.log(data);
//tämä funktion vain että javascript tulee htmllän jälkeen
window.onload  = function(){
var divElementti = document.getElementById('tupa');
var table = document.createElement('table');
table.setAttribute('id','table');
divElementti.appendChild(table);

joukkueidenTulostus();
rastiLomake();
lisaajoukkueForm();

}



function rastiLomake(){
	

var lomakkeet = document.getElementsByTagName('form');

var fieldset = document.createElement('fieldset');
//var teksti = document.createTextNode("Rastin tiedot");
var legend = document.createElement('legend');
legend.textContent = "Rastin tiedot";
fieldset.appendChild(legend);
var p = document.createElement('p');
var label = document.createElement('label');
var teksti = document.createTextNode("koodi");
var input  = document.createElement('input');
input.setAttribute("type","text");
input.setAttribute("id","koodi");
label.appendChild(teksti);
label.appendChild(input);
p.appendChild(label);
fieldset.appendChild(p);
//
input  = document.createElement('input');
input.setAttribute("type","text");
input.setAttribute("id","lon");
p = document.createElement('p');
teksti = document.createTextNode("lon");
label = document.createElement('label');
label.appendChild(teksti);
label.appendChild(input);
p.appendChild(label);
fieldset.appendChild(p);
//
input  = document.createElement('input');
input.setAttribute("type","text");
input.setAttribute("id","lat");
p = document.createElement('p');
teksti = document.createTextNode("lat");
label = document.createElement('label');
label.appendChild(teksti);
label.appendChild(input);
p.appendChild(label);
fieldset.appendChild(p);
//
input = document.createElement('input');
input.setAttribute("type","submit");
input.addEventListener("click", lisaaRasti);
input.setAttribute("value","lisää rasti");
p = document.createElement('p');
p.appendChild(input);
fieldset.appendChild(p);
lomakkeet[0].appendChild(fieldset);
//

	
}




// tulostaa joukkueiden tiedot
function joukkueidenTulostus(){
	
	var table = document.getElementById('table');
	//table.setAttribute('id','joukkuetable');
	table.textContent = "";
	
	var cap = document.createElement('caption');
	var capText = document.createTextNode("tulokset"); 
	cap.appendChild(capText);
	table.appendChild(cap);	
	
	var a = document.createElement('a');
	a.setAttribute("href","sarja");
	a.addEventListener("click", joukkueidenTulostus2);
	
	var eka = document.createElement('tr');
	
	var paikka = document.createElement('th');
	var paikka2 = document.createElement('th');
	var paikka3 = document.createElement('th');
	var teksti = document.createTextNode("sarjat");
	a.textContent = "sarjat";
	paikka.appendChild(a);
	eka.appendChild(paikka);
	//teksti = document.createTextNode("joukkueet");
	a = document.createElement('a');
	a.setAttribute("href","joukkueet");
	a.textContent = "joukkueet";
	a.addEventListener("click", joukkueidenTulostus2);
	paikka2.appendChild(a);
	eka.appendChild(paikka2);
	//teksti = document.createTextNode("pisteet");
	a = document.createElement('a');
	a.setAttribute("href","joukkueet");
	a.textContent = "pisteet";
	a.addEventListener("click", joukkueidenTulostus2);
	paikka3.appendChild(a);
	eka.appendChild(paikka3);
	
	
	paikka = document.createElement('th');
	a = document.createElement('a');
	a.setAttribute("href","matka");
	a.textContent = "matka";
	a.addEventListener("click", joukkueidenTulostus2);
	paikka.appendChild(a);
	eka.appendChild(paikka);
	table.appendChild(eka);
	
	paikka = document.createElement('th');
	a = document.createElement('a');
	a.setAttribute("href","aika");
	a.textContent = "aika";
	a.addEventListener("click", joukkueidenTulostus2);
	paikka.appendChild(a);
	eka.appendChild(paikka);
	table.appendChild(eka);
	
	var joukkueet = tulostakaikkitiedot();
	joukkueet.sort(sarjaPisteetNimi);
	
	for(let i = 0;i < joukkueet.length;i++){
		var tiedot = document.createElement('tr');
		var sarja = document.createElement('td');
		paikka2 = document.createElement('td');
		var a = document.createElement('a');
		a.setAttribute("href","#Joukkue");
		a.textContent =joukkueet[i].nimi;
		a.joukkue = joukkueet[i];
		a.addEventListener("click", tuoJoukkue);
		teksti = document.createTextNode(joukkueet[i].sarja);
		sarja.appendChild(teksti);
		//teksti.textContent(joukkueet[i].nimi);
		paikka2.appendChild(a);
		tiedot.appendChild(sarja);
		tiedot.appendChild(paikka2);
		
		var br = document.createElement('br');
		paikka2.appendChild(br);
		for(let j = 0; j < joukkueet[i].jasenet.length;j++){
			let nimi = document.createTextNode(joukkueet[i].jasenet[j] + ", ");
			paikka2.appendChild(nimi);
		
		}
		
		
		teksti = document.createTextNode(joukkueet[i].pisteet);
		var paikka3 = document.createElement('td');
		paikka3.appendChild(teksti);
		tiedot.appendChild(paikka3);
		
		paikka2 = document.createElement('td');
		teksti = document.createTextNode(Math.round(joukkueet[i].matka) + " km");
		paikka2.appendChild(teksti);
		tiedot.appendChild(paikka2);
		
		paikka2 = document.createElement('td');
		teksti = document.createTextNode(joukkueet[i].aika.toISOString().substr(11, 8));
		paikka2.appendChild(teksti);
		tiedot.appendChild(paikka2);
		
		table.appendChild(tiedot);
	}
	
	


}


function joukkueidenTulostus2(e){
	e.preventDefault();
	var sortehto = e.target.textContent;
	var table = document.getElementById('table');
	//table.setAttribute('id','joukkuetable');
	table.textContent = "";
	
	var cap = document.createElement('caption');
	var capText = document.createTextNode("tulokset"); 
	cap.appendChild(capText);
	table.appendChild(cap);	
	
	var a = document.createElement('a');
	a.setAttribute("href","sarja");
	a.addEventListener("click", joukkueidenTulostus2);
	
	var eka = document.createElement('tr');
	
	var paikka = document.createElement('th');
	var paikka2 = document.createElement('th');
	var paikka3 = document.createElement('th');
	var teksti = document.createTextNode("sarjat");
	a.textContent = "sarjat";
	paikka.appendChild(a);
	eka.appendChild(paikka);
	//teksti = document.createTextNode("joukkueet");
	a = document.createElement('a');
	a.setAttribute("href","joukkueet");
	a.textContent = "joukkueet";
	a.addEventListener("click", joukkueidenTulostus2);
	paikka2.appendChild(a);
	eka.appendChild(paikka2);
	//teksti = document.createTextNode("pisteet");
	a = document.createElement('a');
	a.setAttribute("href","joukkueet");
	a.textContent = "pisteet";
	a.addEventListener("click", joukkueidenTulostus2);
	paikka3.appendChild(a);
	eka.appendChild(paikka3);
	
	
	paikka = document.createElement('th');
	a = document.createElement('a');
	a.setAttribute("href","matka");
	a.textContent = "matka";
	a.addEventListener("click", joukkueidenTulostus2);
	paikka.appendChild(a);
	eka.appendChild(paikka);
	table.appendChild(eka);
	
	paikka = document.createElement('th');
	a = document.createElement('a');
	a.setAttribute("href","aika");
	a.textContent = "aika";
	a.addEventListener("click", joukkueidenTulostus2);
	paikka.appendChild(a);
	eka.appendChild(paikka);
	table.appendChild(eka);
	
	var joukkueet = tulostakaikkitiedot();
	
	
	if(sortehto == "sarjat"){
	joukkueet.sort(sarjaPisteetNimi);
	}else if(sortehto == "joukkueet"){
	joukkueet.sort(nimet);
	}else if(sortehto == "pisteet"){
	joukkueet.sort(pisteet);
	}else if(sortehto == "matka"){
	joukkueet.sort(matka);
	}else if(sortehto == "aika"){
	joukkueet.sort(aika);
	}
	
	for(let i = 0;i < joukkueet.length;i++){
		var tiedot = document.createElement('tr');
		var sarja = document.createElement('td');
		paikka2 = document.createElement('td');
		var a = document.createElement('a');
		a.setAttribute("href","#Joukkue");
		a.textContent =joukkueet[i].nimi;
		a.joukkue = joukkueet[i];
		a.addEventListener("click", tuoJoukkue);
		teksti = document.createTextNode(joukkueet[i].sarja);
		sarja.appendChild(teksti);
		//teksti.textContent(joukkueet[i].nimi);
		paikka2.appendChild(a);
		tiedot.appendChild(sarja);
		tiedot.appendChild(paikka2);
		
		var br = document.createElement('br');
		paikka2.appendChild(br);
		for(let j = 0; j < joukkueet[i].jasenet.length;j++){
			let nimi = document.createTextNode(joukkueet[i].jasenet[j] + ", ");
			paikka2.appendChild(nimi);
		
		}
		
		
		teksti = document.createTextNode(joukkueet[i].pisteet);
		var paikka3 = document.createElement('td');
		paikka3.appendChild(teksti);
		tiedot.appendChild(paikka3);
		
		paikka2 = document.createElement('td');
		teksti = document.createTextNode(Math.round(joukkueet[i].matka) + " km");
		paikka2.appendChild(teksti);
		tiedot.appendChild(paikka2);
		
		paikka2 = document.createElement('td');
		teksti = document.createTextNode(joukkueet[i].aika.toISOString().substr(11, 8));
		paikka2.appendChild(teksti);
		tiedot.appendChild(paikka2);
		
		table.appendChild(tiedot);
	}
	
	
	
}




//funktio palauttaa joukkueen nimet, pisteet, id:n, jäsenet, matkan ja ajan
function tulostakaikkitiedot(){
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
				
			}
			rastit.push(rasti);
		}
	}
	for (let i in data) {
		for(let j in data[i]['sarjat']){
			for(let k in data[i]['sarjat'][j]['joukkueet']){
				var rastit2 = [];
				var temp = [];
				for(let l in data[i]['sarjat'][j]['joukkueet'][k]['rastit']){
					//if(data[i]['sarjat'][j]['joukkueet'][k]['rastit'][l].aika >= data[i].alkuaika && data[i]['sarjat'][j]['joukkueet'][k]['rastit'][l].aika <= data[i].loppuaika){
						for(let m = 0; m < rastit.length;m++){
							if(rastit[m].id == data[i]['sarjat'][j]['joukkueet'][k]['rastit'][l].rasti){
								
								let temprasti ={};
								Object.assign(temprasti,rastit[m]);
								temprasti.aika = new Date(data[i]['sarjat'][j]['joukkueet'][k]['rastit'][l].aika);
								temp.push(temprasti);
								break;
							}
						
						}
						
						
						
					//}
					
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
					"id": data[i]['sarjat'][j]['joukkueet'][k].id
					
					}
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
					"id": data[i]['sarjat'][j]['joukkueet'][k].id
				}
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

//vertaus fuktio sarjan,pisteen ja nimen perusteella tuossa järjestyksessä
function sarjaPisteetNimi(a,b){
	
	if(a.sarja > b.sarja){return 1}
	if(a.sarja < b.sarja){return -1}
	if(a.pisteet > b.pisteet){return -1}
	if(a.pisteet < b.pisteet){return 1}
	if(a.nimi.toUpperCase() < b.nimi.toUpperCase()){return -1}
	if(a.nimi.toUpperCase() > b.nimi.toUpperCase()){return 1}
	return 0;
}
//vertaa joukueiden pisteitä
function pisteet(a,b){
	
	
	if(a.pisteet > b.pisteet){return -1}
	if(a.pisteet < b.pisteet){return 1}
	
	return 0;
}
//vertaa joukkueiden nimiä
function nimet(a,b){
	
	
	if(a.nimi.toUpperCase() < b.nimi.toUpperCase()){return -1}
	if(a.nimi.toUpperCase() > b.nimi.toUpperCase()){return 1}
	
	return 0;
}
//vertaa joukkueiden matkoja
function matka(a,b){
	
	
	if(a.matka < b.matka){return -1}
	if(a.matka > b.matka){return 1}
	
	return 0;
}
//vertaa joukkueiden aikoja
function aika(a,b){
	
	
	if(a.aika < b.aika){return -1}
	if(a.aika > b.aika){return 1}
	
	return 0;
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
  return deg * (Math.PI/180)
}




//luo joukkueenlisäys lomakkeen
function lisaajoukkueForm(){
	
	
var lomakkeet = document.getElementsByTagName('form');
var fieldset = document.createElement('fieldset');

var legend = document.createElement('legend');
legend.textContent = "joukkueen tiedot";
fieldset.appendChild(legend);



var input  = document.createElement('input');
input.setAttribute("type","text");
input.addEventListener("change", lisaaInput);
input.setAttribute("id","joukkueenimi");
var p = document.createElement('p');
var teksti = document.createTextNode("joukkueen nimi:");
var label = document.createElement('label');
label.appendChild(teksti);
p.appendChild(label);
p.appendChild(input);
//joukkueLomakkeenInputit.push(p);
fieldset.appendChild(p);
//

input  = document.createElement('input');
input.setAttribute("type","text");
input.addEventListener("change", lisaaInput);
input.setAttribute("id","jasennimi1");
p = document.createElement('p');
teksti = document.createTextNode("jäsenen nimi:");
label = document.createElement('label');
label.appendChild(teksti);
p.appendChild(label);
p.appendChild(input);
//joukkueLomakkeenInputit.push(p);
fieldset.appendChild(p);
//
input  = document.createElement('input');
input.setAttribute("type","text");
input.addEventListener("change", lisaaInput);
input.setAttribute("id","jasennimi2");
p = document.createElement('p');
teksti = document.createTextNode("jäsenen nimi:");
label = document.createElement('label');
label.appendChild(teksti);
p.appendChild(label);
p.appendChild(input);
//joukkueLomakkeenInputit.push(p);
fieldset.appendChild(p);
//
input = document.createElement('input');
input.setAttribute("type","submit");
input.addEventListener("click", lisaaJoukkueDataan);
input.setAttribute("value","lisää joukkue");
input.setAttribute("id","lisaajoukkuenappi");
input.disabled = true;
p = document.createElement('p');
p.setAttribute("id","lisaajoukkue");
p.appendChild(input);
fieldset.appendChild(p);
lomakkeet[1].appendChild(fieldset);

}
// lisää tai poistaa rivin uuden joukkueen lomakkeesta jos on tarpeen
//lisäksi tarkistaa täyttyykö lisäys ehto
function lisaaInput(e){
	e.preventDefault();
	var lomakkeet = document.getElementsByTagName('form');
	var fieldset = lomakkeet[1].getElementsByTagName('fieldset');
	var lapset = fieldset[0].getElementsByTagName('p');
	if(e.target.value == "" && !(e.target.id == "joukkueenimi") && lapset.length > 4 ){
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);
		if(lapset[1].lastChild.value == "" || lapset[2].lastChild.value == ""){
			document.getElementById("lisaajoukkuenappi").disabled = true;
		}
		
		return undefined;
		
	}
	if(document.getElementsByTagName('joukkueenimi').value != "" && lapset.length > 4){
			for(let i  = 1;i < lapset.length-1;i++){
			document.getElementById("lisaajoukkuenappi").disabled = false;
			}
	}
	else{
		document.getElementById("lisaajoukkuenappi").disabled = true;
	}
	//var lapset = lomakkeet[1].getElementsByTagName("p");
	for(let i = 0; i < lapset.length-1;i++){
		if(lapset[i].lastChild.value == ""){
			return undefined;
		}
	}
	
	
	
	var input = document.createElement('input');
	input.setAttribute("type","text");
	input.addEventListener("change", lisaaInput);
	var p = document.createElement('p');
	var teksti = document.createTextNode("jäsenen nimi:");
	var label = document.createElement('label');
	label.appendChild(teksti);
	p.appendChild(label);
	p.appendChild(input);
	//joukkueLomakkeenInputit.push(p);
	fieldset[0].insertBefore(p,document.getElementById("lisaajoukkue"));
	
	if(document.getElementsByTagName('joukkueenimi').value != "" && lapset.length > 4){
			document.getElementById("lisaajoukkuenappi").disabled = false;
	}
	else{
		document.getElementById("lisaajoukkuenappi").disabled = true;
	}
	
	
	
}

//luo joukkue objektin joka lisätään dataan sekä alustaa lomakkeen lisäyken jälkeen
function lisaaJoukkueDataan(e){
	e.preventDefault();
	
	var onko = true;
	while(onko){
	onko  = false; 
	
	for (let i in data) {
		var id = Math.floor(Math.random() * Math.floor(1000000000000000));
			for(let j in data[i]['sarjat']){
				for(let k in data[i]['sarjat'][j]['joukkueet']){
				
					if(id == data[i]['sarjat'][j]['joukkueet'][k].id){
						onko = true;
					}
				}

			}
		
	}
	
	}
	var lomakkeet = document.getElementsByTagName('form');
	var lapset = lomakkeet[1].getElementsByTagName('p');
	let joukkue = {
	"nimi": lapset[0].lastChild.value,
	"jasenet": [],
	"id": id,
	"rastit":[],
	"leimaustapa":["GPS"]
	}
	for(let i = 1; i < lapset.length-1;i++){
		if(!lapset[i].lastChild.value == ""){
		joukkue.jasenet.push(lapset[i].lastChild.value);
		}
	
	}
	
	lisaaJoukkue2("Jäärogaining",joukkue,"2h");
	
	joukkueidenTulostus();
	
	//joukkueLomakkeenInputit = [];
	var x = document.getElementById("joukkue");
	while (x.firstChild) {
    
    x.removeChild(x.firstChild);
}	
	lisaajoukkueForm();
	
}
//lisää uuden joukkueen dataan
function lisaaJoukkue2( kilpailu, joukkue, sarja){
	
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




//luo lomakkeen johon tuodaan valmiin joukueen jäsenet
function tuoJoukkue(e){
	e.preventDefault();
	var joukkue = e.target.joukkue;
	var x = document.getElementById("joukkue");
	while (x.firstChild) {
    
    x.removeChild(x.firstChild);
	}	
	
var fieldset = document.createElement('fieldset');

var legend = document.createElement('legend');
legend.textContent = "joukkueen tiedot";
fieldset.appendChild(legend);
var lomakkeet = document.getElementsByTagName('form');
//joukkueLomakkeenInputit = [];
var input  = document.createElement('input');
input.setAttribute("type","text");
input.addEventListener("change", lisaaInput2);
input.setAttribute("id","ensimmainennimi");
input.value = joukkue.jasenet[0];
var p = document.createElement('p');
var teksti = document.createTextNode("jäsenen nimi:");
var label = document.createElement('label');
label.appendChild(teksti);
p.appendChild(label);
p.appendChild(input);
//joukkueLomakkeenInputit.push(p);
fieldset.appendChild(p);

for(let i = 1; i < joukkue.jasenet.length;i++){

input  = document.createElement('input');
input.setAttribute("type","text");
input.addEventListener("change", lisaaInput2);
//input.setAttribute("id","joukkuenimi");
input.value = joukkue.jasenet[i];
p = document.createElement('p');
teksti = document.createTextNode("jäsenen nimi:");
label = document.createElement('label');
label.appendChild(teksti);
p.appendChild(label);
p.appendChild(input);
//joukkueLomakkeenInputit.push(p);
fieldset.appendChild(p);

}

var input  = document.createElement('input');
input.setAttribute("type","text");
input.addEventListener("change", lisaaInput2);
var p = document.createElement('p');
var teksti = document.createTextNode("jäsenen nimi:");
var label = document.createElement('label');
label.appendChild(teksti);
p.appendChild(label);
p.appendChild(input);
//joukkueLomakkeenInputit.push(p);
fieldset.appendChild(p);



input = document.createElement('input');
input.setAttribute("type","submit");
input.addEventListener("click", muokkaaJoukkue);
input.setAttribute("value","muokkaa");

input.joukkue = joukkue;
p = document.createElement('p');
p.setAttribute("id","muokkaajoukkuenappi");
p.appendChild(input);
fieldset.appendChild(p);
lomakkeet[1].appendChild(fieldset);


}
//luo uuden kentän joukkueen moukkaus funktioon
function lisaaInput2(e){
	e.preventDefault();
	
	var lomakkeet = document.getElementsByTagName('form');
	var fieldset = lomakkeet[1].getElementsByTagName('fieldset');
	var lapset = fieldset[0].childNodes;
	if(e.target.value == "" && !(e.target.id == "ensimmainennimi")){
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);
		return undefined;
	}
	
	
	for(let i = 0; i < lapset.length;i++){
		if(lapset[i].lastChild.value == ""){
			return undefined;
		}
	}
	var input = document.createElement('input');
	input.setAttribute("type","text");
	input.addEventListener("change", lisaaInput2);
	var p = document.createElement('p');
	var teksti = document.createTextNode("jäsenen nimi:");
	var label = document.createElement('label');
	label.appendChild(teksti);
	p.appendChild(label);
	p.appendChild(input);
	//joukkueLomakkeenInputit.push(p);
	fieldset[0].insertBefore(p,document.getElementById("muokkaajoukkuenappi"));
	
}


//lisää muokatun joukkueen dataan
function muokkaaJoukkue(e){
e.preventDefault();
var joukkue = e.target.joukkue;
var jasenet = [];
var lomakkeet = document.getElementsByTagName('form');
var fieldset = lomakkeet[1].getElementsByTagName('fieldset');
var lapset = fieldset[0].childNodes;
	for(let i = 0; i < lapset.length-1;i++){
		if(!lapset[i].lastChild.value == ""){
		jasenet.push(lapset[i].lastChild.value);
		}
	
	}
	joukkue.jasenet = jasenet;
	
	for (let i in data) {
		for(let j in data[i]['sarjat']){
			for(let k in data[i]['sarjat'][j]['joukkueet']){
				if(data[i]['sarjat'][j]['joukkueet'][k].id == joukkue.id){
						data[i]['sarjat'][j]['joukkueet'][k].jasenet = joukkue.jasenet;
					}
				}	
					
				
			}
		
	}
	
	
	var x = document.getElementById("joukkue");
	while (x.firstChild) {
		x.removeChild(x.firstChild);
	}	
	//joukkueLomakkeenInputit = [];
	lisaajoukkueForm();
	joukkueidenTulostus();
	
}



//lisää rastin jos se on oikeanlainen dataan
function lisaaRasti(e) {
	e.preventDefault();
	
	var koodi = document.getElementById("koodi");
	var lon = document.getElementById("lon");
	var lat = document.getElementById("lat");
	var kisa = "Jäärogaining"
	if(koodi.value == "" || isNaN(parseInt(lon.value)) || lon.value == ""  || isNaN(parseInt(lat.value)) || lat.value == ""){
		lon.value = "";
		koodi.value = "";
		lat.value = "";
		return undefined;
	}
	while(onko){
		var onko  = false; 
		var id = Math.floor(Math.random() * Math.floor(1000000000000000));
		for (let i in data) {
			for(j in data[i]['rastit']){
				if(id == data[i]['rastit'][j].id){
				onko = true;
				}
			}
	
		}
	}
	
	
	let rasti = {
		"lon": lon.value,
		"koodi": koodi.value,
		"lat": lat.value,
		"id":  id

	}		
	
	for (let i in data) {
		if(data[i].nimi == kisa){
			data[i].rastit.push(rasti);
		}
	}
	
		lon.value = "";
		koodi.value = "";
		lat.value = "";
	
	tulostaRastit();
	
}	

//tulostaa rastit
function tulostaRastit(){
	var rastit = [];
	//rastien nimet otetaan talteen json tiedostosta
	for (let i in data) {
		for(let j in data[i]['rastit']){
			rastit.push(data[i]['rastit'][j]);
		}
	}
	
	//tarkistetaan onko listassa yhtään rastia
	if(rastit.length == 0){
		return undefined;
	
	}
	
	for(let i = 1;i < rastit.length;i++){
		console.log(rastit[i].koodi + " " + rastit[i].lon + " " + rastit[i].lat);
	}
	
	
}
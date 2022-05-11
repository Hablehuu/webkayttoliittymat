// voit tutkia tarkemmin käsiteltäviä tietorakenteita konsolin kautta 
// tai json-editorin kautta osoitteessa http://jsoneditoronline.org/
// Jos käytät json-editoria niin avaa data osoitteesta:
// http://appro.mit.jyu.fi/tiea2120/vt/vt1/2019/data.json


// Kirjoita tästä eteenpäin oma ohjelmakoodisi

"use strict";

//funktio tulostaa joukkueiden nimet aakkosjärjestyksessä
//funtiolle annetaan data joka on tiedosto josta nimet halutaan tulostaa
function tulostaJoukkueet(data) {
	var nimet = [];
	//var jarjestetty = [];
	var lisatty = false;
	//joukkueiden nimet otetaan talteen json tiedostosta
	for (let i in data) {
		for(let j in data[i]['sarjat']){
			for(let k in data[i]['sarjat'][j]['joukkueet']){
				nimet.push(data[i]['sarjat'][j]['joukkueet'][k]['nimi']);
			}
		}
	}
	//tarkistetaan onko listassa yhtään nimeä
	if(nimet.length == 0){
		return undefined;
	
	}
	//nimet asetetaan aakkosjärjestykseen
	nimet.sort();
	//nimet tulostetaan
	for(let i in nimet) {
		console.log(nimet[i]);
	}
	return undefined;
}
//funktio jolla lisätään joukkue valitun kilpailun sarjaan
//funtiolle annetaan data joka on tiedosto johon halutaan lisätä joukkue
//kilpailu on kilpailun nimi jonka sarjaan joukkue lisätään
//joukkue on objekti joka lisätään joukkueena tiedostoon
//sarja on sarjan nimi johon joukkue lisätään
function lisaaJoukkue(data, kilpailu, joukkue, sarja){
	
	for (let i in data) {
		if(data[i].nimi == kilpailu){
			for(let j in data[i]['sarjat']){
			
				if(data[i]['sarjat'][j].nimi == sarja){
					
					data[i]['sarjat'][j]['joukkueet'].push(joukkue);
					
				}
			}
		}
	}
	return undefined;
}



//tulostaa rastit jotka alkavat kokonaisluvulla aakkosjärjestyksessä
//funtiolle annetaan data joka on tiedosto josta nimet halutaan tulostaa
function tulostaRastit(data){
	var rastit = [];
	var jarjestetty = [];
	var lisatty = false;
	//rastien nimet otetaan talteen json tiedostosta
	for (let i in data) {
		for(let j in data[i]['rastit']){
			rastit.push(data[i]['rastit'][j].koodi);
		}
	}
	
	//tarkistetaan onko listassa yhtään rastia
	if(rastit.length == 0){
		return undefined;
	
	}
	
	//rasteista poistetaan rastit joiden koodi ei ala kokonaisluvulla
	for(let i = 0;i <rastit.length;i++){
		if(!Number.isInteger(parseInt(rastit[i].charAt(0)))) {
			rastit.splice(i,1);
			
		}
	}
	rastit.sort();
	
	var rastityhdessa = rastit[0];
	for(let i = 1;i < rastit.length;i++){
		rastityhdessa = rastityhdessa + ';' +  rastit[i];
	}
	rastityhdessa += ';';
	console.log(rastityhdessa);
	return undefined;
}	
//funktio, joka osaa poistaa tietorakenteesta kilpailun nimen, sarjan nimen ja joukkueen nimen perusteella joukkueen
function poistaJoukkue(data, kilpailu, sarja, joukkue) {
	
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
	return undefined;
	

}
//laskee joukkueiden pisteet ja tulostaa ne
function laskeJaTulostaPisteet(data){
	var rastit  = [];
	var joukkueet = [];
	
	for (let i in data) {
		for(let j in data[i]['rastit']){
			let pisteet = 0;
			if(Number.isInteger(parseInt(data[i]['rastit'][j].koodi.charAt(0)))) {
			pisteet = parseInt(data[i]['rastit'][j].koodi.charAt(0));
			}
			
			let rasti = {
				"id": data[i]['rastit'][j].id,
				"koodi": data[i]['rastit'][j].koodi,
				"pisteet": pisteet
				
			}
			rastit.push(rasti);
		}
	}
	for (let i in data) {
		for(let j in data[i]['sarjat']){
			for(let k in data[i]['sarjat'][j]['joukkueet']){
				var rastit2 = new Set();
				var temp = [];
				for(let l in data[i]['sarjat'][j]['joukkueet'][k]['rastit']){
					if(data[i]['sarjat'][j]['joukkueet'][k]['rastit'][l].aika >= data[i].alkuaika && data[i]['sarjat'][j]['joukkueet'][k]['rastit'][l].aika <= data[i].loppuaika){
						
						temp.push(data[i]['sarjat'][j]['joukkueet'][k]['rastit'][l]);
						
						
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
					if(temp[l].rasti == viimeinenLahtoId){
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
					"pisteet": 0
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
					if(temp[l].rasti == maaliId){
						viimeinen = l;
						loytyi = true;
						break;
					}
				}
				
				if(loytyi){
					temp = temp.splice(0,viimeinen);
				}
				else{
					temp = temp.splice(0,temp.length);
				}
				let onko;
				for(let l = 0; l < temp.length;l++){
					
					for(let m of rastit2){
						if( m.rasti == temp[l].rasti){
								onko = true;
								break;
						}
					}
					if(!onko){
						rastit2.add(temp[l]);
					}
					onko = false;
				}
				let joukkue = {
					"nimi": data[i]['sarjat'][j]['joukkueet'][k].nimi,
					"rastit": rastit2,
					"pisteet": 0
				}
				joukkueet.push(joukkue);
			}
		}
	}
	//pisteet lasketaan
	for(let i in joukkueet){
		for(let j of joukkueet[i]['rastit']){
			for(let k = 0;k < rastit.length;k++){
				if(rastit[k].id == j.rasti){
					joukkueet[i].pisteet += rastit[k].pisteet;
				}
			}
		}
	}
	//joukkueet järjestetään ensiksi pisteiden ja sitten nimen perusteella
	joukkueet.sort(vertaaPisteNimi );
	//tiedot tulostetaan
	for(let i = 0;i < joukkueet.length;i++){
		console.log(joukkueet[i].nimi + " " + '(' + joukkueet[i].pisteet + " p)"); 
	}
	return undefined;
	
}
//funktio tulostaa joukkueen nimet, pisteet, matkan ja ajan
function tulostakaikkitiedot(data){
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
					"aika": new Date(0),//"00:00:00",
					"matka": 0
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
					"aika": suoritusAika           //hrs + ':' + mins + ':' + secs
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
	
	joukkueet.sort(vertaaPisteAika);
	
	for(let i = 0;i < joukkueet.length;i++){
		
		console.log(joukkueet[i].nimi + ", " + joukkueet[i].pisteet + " p, " + Math.round(joukkueet[i].matka) + " km, "+ joukkueet[i].aika.toISOString().substr(11, 8)); 
		
	}
return undefined;
		
}


//vertaa ensin pisteiden mukaan ja jos pisteet on samat niin nimen mukaan
function vertaaPisteNimi(a,b){

	if (a.pisteet > b.pisteet) {
		return -1;
	}
	if (a.pisteet < b.pisteet) {
		return 1;
	}
	if(a.nimi < b.nimi){
		return -1;
	}
	if(a.nimi > b.nimi){
		return 1;
	}
  
  return 0;


}

//vertaa ensin pisteitä ja hos ne on samat niin aikaa ja jos aika on sama niin nimeä
function vertaaPisteAika(a,b){

	if (a.pisteet > b.pisteet) {
		return -1;
	}
	if (a.pisteet < b.pisteet) {
		return 1;
	}
	if(a.aika < b.aika){
		return -1;
	}
	if(a.aika > b.aika){
		return 1;
	}
	if(a.nimi < b.nimi){
		return -1;
	}
	if(a.nimi > b.nimi){
		return 1;
	}
  
	
  return 0;


}

	


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


// muodostetaan testi joukkue
var joukkue = { 
      "nimi": "Mallijoukkue",
      "jasenet": [
        "Tommi Lahtonen",
        "Matti Meikäläinen"
      ],
      "id": 99999
}


//taso 1
console.log("----------------");
console.log("      TASO1     ");
console.log("----------------");
lisaaJoukkue(data, "Jäärogaining", joukkue, "8h");

tulostaJoukkueet(data);

tulostaRastit(data);
//taso 3
console.log("----------------");
console.log("      TASO3     ");
console.log("----------------");
poistaJoukkue(data, "Jäärogaining", "4h", "Vapaat");
poistaJoukkue(data, "Jäärogaining", "8h", "Vara 1");
poistaJoukkue(data, "Jäärogaining", "8h", "Vara 2");
laskeJaTulostaPisteet(data);
console.log("----------------");
console.log("      TASO5     ");
console.log("----------------");
tulostakaikkitiedot(data)


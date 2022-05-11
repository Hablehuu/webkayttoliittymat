"use strict";

//kuinka monta palkkia sivulle tulee
var maara = 15;
//määrää suunnan
var suunta = true;
//teksti joka skrollaa ruudun läpi
var skrolleriTeksti = "TIEA2120 Web-käyttöliittymien ohjelmointi -kurssin viikkotehtävä 4 taso 3 edellyttää skrollerin toteuttamista. Tämä skrolleri toimii tekstin määrästä riippumatta";
var askel = 0;
window.onload = function() {
   
   janis();
   moire();
   nappi();
   //window.innerHeight and window.innerWidth
   let leveys = window.innerWidth *1.5;
   askel = leveys;
   document.getElementById('skrolleri').setAttribute('width',leveys.toString());
   window.requestAnimationFrame(skrolleri);
   
   
   
   
}

// etsii jänis kuvan canvaksiin ja asettaa oikeat asetukset
function janis(){
	
	// http://appro.mit.jyu.fi/tiea2120/vt/vt4/bunny.png
	var img1 = new Image(); 
	img1.addEventListener('load',function() {
		let canvas = document.getElementById('janispaa');
		let ctx = canvas.getContext('2d');
		ctx.drawImage(img1, 0, 0 );
	}, false);
	
	var img2 = new Image(); 
	img2.addEventListener('load',function() {
		let canvas = document.getElementById('janisruumis');
		let ctx = canvas.getContext('2d');
		ctx.drawImage(img2, 0, 300,383,300,0,0,383,300);
	}, false);
	
	img1.src = 'http://appro.mit.jyu.fi/tiea2120/vt/vt4/bunny.png';
	img2.src = 'http://appro.mit.jyu.fi/tiea2120/vt/vt4/bunny.png';
	
}

//luo palkkeja niin monta kuin on määrätty
function moire(){
	
	for(let i = 0; i < maara;i++){
	let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	let rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
	let defs = document.createElementNS("http://www.w3.org/2000/svg","defs");
	let stop1 = document.createElementNS("http://www.w3.org/2000/svg","stop");
	let stop2 = document.createElementNS("http://www.w3.org/2000/svg","stop");
	let stop3 = document.createElementNS("http://www.w3.org/2000/svg","stop");
	let gradient = document.createElementNS("http://www.w3.org/2000/svg","linearGradient");
	
	stop1.setAttribute("class","vari1");
	stop1.setAttribute("offset","0%");
	
	stop2.setAttribute("class","vari2");
	stop2.setAttribute("offset","50%");
	
	stop3.setAttribute("class","vari3");
	stop3.setAttribute("offset","100%");
	gradient.setAttribute("id","gradientti");
	gradient.setAttribute("gradientTransform","rotate(90)");
	gradient.appendChild(stop1);
	gradient.appendChild(stop2);
	gradient.appendChild(stop3);
	defs.appendChild(gradient);
	
	
	svg.appendChild(defs);
	svg.appendChild(rect);
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.setAttribute("class", "moire");
	svg.setAttribute("version", "1.1");
	svg.setAttribute("width", "100%");
	svg.setAttribute("height", "40");
	let aika = 250 + 100 * i;
	let viive = aika +"ms";
	svg.style.animationDelay = viive;
	//aika = 8 + (maara / 2);
	//viive = aika + "s"
	//svg.style.animationDuration = viive;
	rect.setAttribute("x", "0");
	rect.setAttribute("y", "0");
	rect.setAttribute("width", "100%");
	rect.setAttribute("height", "100%");
	rect.setAttribute("fill","url(#gradientti)");
	document.body.appendChild(svg);
	}
}
//asettaa sivun lisää pöllö napin toiminnot
function nappi(){
	let nappi = document.getElementById('lisays');
	nappi.addEventListener('click',lisaa);
	
	
}

//lisää pöllön näytölle
function lisaa(e){
	e.preventDefault();
	if(suunta){
		let p = document.createElement('p');
		p.setAttribute('class','pollo');
		var funktiot = ["ease","ease-in","ease-out","ease-in-out","linear","step-start","step-end"];
		let numero = Math.round( (Math.random() * 10) % 6);
		p.style.animationTimingFunction = funktiot[numero];
		let kuva = document.createElement('img');
		kuva.src = "http://appro.mit.jyu.fi/tiea2120/vt/vt4/owl.svg";
		p.appendChild(kuva);
		document.body.appendChild(p);
		suunta = false;
	}else{
		let p = document.createElement('p');
		p.setAttribute('class','pollo');
		var funktiot = ["ease","ease-in","ease-out","ease-in-out","linear","step-start","step-end"];
		let numero = Math.round( (Math.random() * 10) % 6);
		p.style.animationTimingFunction = funktiot[numero];
		let kuva = document.createElement('img');
		kuva.src = "http://appro.mit.jyu.fi/tiea2120/vt/vt4/owl.svg";
		p.appendChild(kuva);
		document.body.appendChild(p);
		p.style.animationDirection = "reverse";
		suunta = true;
	}
}


function skrolleri(timestamp){
	let canvas = document.getElementById('skrolleri');
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let leveys = window.innerWidth * 1.5;
	document.getElementById('skrolleri').setAttribute('width',leveys.toString());
	ctx.font = "100px Verdana";
	var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
	gradient.addColorStop("0", "black");
	gradient.addColorStop("0.5", "yellow");
	gradient.addColorStop("1.0", "black");
	ctx.fillStyle = gradient;
	let pituus = ctx.measureText(skrolleriTeksti);
	ctx.fillText(skrolleriTeksti,askel, 100);
	askel-=4;
	window.requestAnimationFrame(skrolleri);
	
}






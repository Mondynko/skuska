checktutorial();
var pocetR;
var pocetS;
var tajmer;
var CisloHra = 0;
var dvojky = new Array();
var trojky = new Array();
var stvorky = new Array();
var petky = new Array();
var oznacene = new Array();
var krokyspat = new Array();
var krok = 0;
var skore = [];
var bolinCas = true;
var TIMER = document.createElement("p1");
var aktHra = document.createElement('p1');
	document.body.appendChild(aktHra);	
uudaje = document.getElementById("uudaje");
document.body.appendChild(TIMER);
var startTime = 0;



function NacitajXML()
{
	
	VytvorTabulkuScore();
	checkCookie();
	setCookie("tutorial", 1, 30);
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
xhttp.open("GET", "shikaku.xml", false);
xhttp.send();
}
/* Ziska udaje z XML */
function myFunction(xml) {
	
	
	
    var xmlDoc = xml.responseXML;	
	var nHra = xmlDoc.getElementsByTagName('game')[CisloHra];
    var ObjPocR = nHra.getElementsByTagName('width')[0];
    pocetR = ObjPocR.childNodes[0];
    var ObjPocS = nHra.getElementsByTagName('height')[0];
    pocetS = ObjPocS.childNodes[0];
	for (var i=0; i< nHra.getElementsByTagName('n2').length; i++){
		dvojky[i]=new Array();
		var Objekt = nHra.getElementsByTagName('n2')[i].childNodes[0];
		var dvojka = Objekt.nodeValue;
		var res = dvojka.split(",");
		dvojky[i][0] = res[0];
		dvojky[i][1] = res[1];		
	}
	
	for (var i=0; i< nHra.getElementsByTagName('n3').length; i++){
		trojky[i]=new Array();
		var Objekt = nHra.getElementsByTagName('n3')[i].childNodes[0];
		var trojka = Objekt.nodeValue;
		var res = trojka.split(",");
		trojky[i][0] = res[0];
		trojky[i][1] = res[1];		
	}
	
	for (var i=0; i< nHra.getElementsByTagName('n4').length; i++){
		stvorky[i]=new Array();
		var Objekt = nHra.getElementsByTagName('n4')[i].childNodes[0];
		var stvorka = Objekt.nodeValue;
		var res = stvorka.split(",");
		stvorky[i][0] = res[0];
		stvorky[i][1] = res[1];		
	}
	
	for (var i=0; i< nHra.getElementsByTagName('n5').length; i++){
		petky[i]=new Array();
		var Objekt = nHra.getElementsByTagName('n5')[i].childNodes[0];
		var petka = Objekt.nodeValue;
		var res = petka.split(",");
		petky[i][0] = res[0];
		petky[i][1] = res[1];		
	}
	
	VytvorHru();
}


/* Vytvori tabulku podla rozmerov z XML */
function VytvorHru(){
var table = document.createElement('table');
table.setAttribute("id", "selectable");

AktualnaHra();

var riadok = [];
var stlpec = new Array();
var idcko = 1;
for (var i=1; i<=pocetR.nodeValue ; i++){
	riadok[i] = document.createElement('tr'); 
	riadok[i].style.border = "1px solid #000" ;
	stlpec[i]=new Array();
	for (var j=1; j<=pocetS.nodeValue; j++,idcko++){
		stlpec[i][j] = document.createElement('td');
		stlpec[i][j].style.border = "1px solid #000" ;
		riadok[i].appendChild(stlpec[i][j]);		
		stlpec[i][j].style.width = "100px" ;
	    stlpec[i][j].style.height = "100px" ;		
		stlpec[i][j].id = 'bunka-' + idcko;
	}
	table.appendChild(riadok[i]);
	
}
table.style.border = "1px solid #000" ;
table.style.borderCollapse = "collapse";

  

document.body.appendChild(table);
NaplnTabulku(stlpec);
tajmer = setInterval(startCas, 1000);

checkRozohrataHra();

var oznac = '';
var vymazat = false;

$("#selectable").selectable({
				filter: "td",
	
	start: function( event, ui ) {
		
			
		},
	/* tahanie zapisuje do stringu */
	selected: function(event, ui) {
		
		oznac = oznac.concat((','),$(ui.selected).attr('id'));
	   
    }, /* Pri prestani tahani zapise bloky do Stringu */ /* Pri tahani overuje ci uz su bunky v stringu ak nie vymaze ich a vybieli tabullu */
	stop: function( event, ui ) {
		oznacene.push(oznac) ;
		
		
		
	
	krok = 0;
	var res = oznacene[oznacene.length-1].split(",");
		for (var i = oznacene.length-1 ; i > 0 ; i--) {			
			
			var porovnaj = oznacene[i-1].split(",");
				
				for(var j = 1 ; j<res.length; j++) {	
					
					for(var k = 1 ; k<porovnaj.length; k++) {
					
				
						if(res[j] == porovnaj[k]) {

						for(var jj = 1 ; jj<porovnaj.length; jj++) {			
							document.getElementById(porovnaj[jj]).style.backgroundColor =  "";
						}
											
						oznacene.splice(i-1,1);										
						vymazat = true;
																
						if (res.length == 2){
							
							oznacene.splice(oznacene.length-1,1);
													
	
						}
						
						else {
							
						var farba = getRandomColor ();
						var res = oznacene[oznacene.length-1].split(",");
						for(var jjj = 1 ; jjj<res.length; jjj++) {			
							document.getElementById(res[jjj]).style.backgroundColor =  farba;
						}
						}
						j = res.length;
						k = porovnaj.length;
						
						
						}
				}	
					}
						
		}
		
		
		krokyspat[krokyspat.length] = oznacene.slice(0);
		if (krokyspat.length==4) krokyspat.splice(0,1);
		
		if(!vymazat){
		
		
		var farba = getRandomColor ();
		for(j = 1 ; j<res.length; j++) {			
			document.getElementById(res[j]).style.backgroundColor =  farba;
		}
		
		}
		vymazat = false;
		
		oznac = '';
		
		OtestujWin();

		
		
	},
   		
			});
	
	
	

}


function OtestujWin(){
	var counter = 0 ;
	for (var i = 0 ; i < oznacene.length; i++) {			
			var res = oznacene[i].split(",");
			for(var j = 1 ; j<res.length; j++) {	
			if (document.getElementById(res[j]).style.backgroundColor !=  "")
			{
			counter++;
			
		}
						
		}
	
	
	}
	
	if (counter == (pocetR.nodeValue*pocetS.nodeValue)){
		var winCondition = 0;
		for (var i = 0 ; i < oznacene.length; i++) {
			var PocetCisel = 0;				
			var res = oznacene[i].split(",");
			for(var j = 1 ; j<res.length; j++) {
						
			if (document.getElementById(res[j]).hasChildNodes()){
				PocetCisel++;	
				
				
			}	
	
		}	
		if(PocetCisel == 1){
			for(var j = 1 ; j<res.length; j++) {
						
			if (document.getElementById(res[j]).hasChildNodes()){
				if (document.getElementById(res[j]).childNodes[0].nodeValue==(res.length-1)){
						winCondition++;
						
				}				
				else { return alert("Zle to mas"); }
				
			}	
			
	
		}	
				
				
			
			
		}
		else { return alert("Zle to mas"); }
	}
		if(winCondition == oznacene.length) {  
			alert("Vyhral si s casom: " + startTime + " sekúnd");
			skore[CisloHra] = startTime;
			var HighSc=getCookie("skore["+CisloHra+"]");
			if ((startTime < HighSc)|| (HighSc== "")){
			setCookie("skore["+CisloHra+"]", skore[CisloHra], 30);
			}
			if (CisloHra == 9){
			alert("Gratulujem presli ste vsetky levely, idete odznova");
			}
			else{ 
			alert("Pokracuj na dalsi level");
			}
			bolinCas = false;
			DalsiaHra();
			
			}
	}
}


function getRandomColor () {
  var hex = Math.floor(Math.random() * 0xFFFFFF);
  return "#" + ("000000" + hex.toString(16)).substr(-6);
}

/* NAPLNENIE CISLAMI Z XML */
function NaplnTabulku(stlpec){
	var dva = document.createTextNode("2");
	var tri = document.createTextNode("3");
	var styri = document.createTextNode("4");
	var pet = document.createTextNode("5");
for (var i=0; i<dvojky.length; i++){
	stlpec[dvojky[i][0]][dvojky[i][1]].appendChild(dva.cloneNode());
	stlpec[dvojky[i][0]][dvojky[i][1]].style.textAlign = "center";
	
}

for (var i=0; i<trojky.length; i++){
	stlpec[trojky[i][0]][trojky[i][1]].appendChild(tri.cloneNode());
	stlpec[trojky[i][0]][trojky[i][1]].style.textAlign = "center";
}

for (var i=0; i<stvorky.length; i++){
	stlpec[stvorky[i][0]][stvorky[i][1]].appendChild(styri.cloneNode());
	stlpec[stvorky[i][0]][stvorky[i][1]].style.textAlign = "center";
}

for (var i=0; i<petky.length; i++){
	stlpec[petky[i][0]][petky[i][1]].appendChild(pet.cloneNode());
	stlpec[petky[i][0]][petky[i][1]].style.textAlign = "center";
}



}


function Reset(){
	for (var i = 0; i< oznacene.length; i++){
	var res = oznacene[i].split(",");
	for(var j = 1 ; j<res.length; j++) {			
			document.getElementById(res[j]).style.backgroundColor =  "";
		}
	}
	oznacene = new Array();
	startTime = 0;	
	startCas();	
}

function DalsiaHra(){
	
	var tbl = document.getElementById('selectable');
        if(tbl) tbl.parentNode.removeChild(tbl);
		CisloHra++;
		if (CisloHra == 10) CisloHra = 0;
		dvojky = new Array();
		trojky = new Array();
		stvorky = new Array();
		petky = new Array();
		bolinCas = true;
		startTime = 0;
		clearInterval(tajmer);
		setCookie("hra", CisloHra, 30);
		setCookie("rozohranahra", "", 30);
		NacitajXML();
	
}

function UlozHru(){
	setCookie("rozohranahra", oznacene, 30);
	
	
	
}



function krokspat(){
	
if (oznacene.length > 0 && krok < 3){	
	var res = oznacene[oznacene.length-1].split(",");
	for(var j = 1 ; j<res.length; j++) {			
			document.getElementById(res[j]).style.backgroundColor =  "";
		}
	
	krok++;
	oznacene.splice(oznacene.length-1);
	}
else if (krok==3){ alert("Uz ste sli 3 kroky späť"); }
	else alert("Krok späť neexistuje");
}


function startCas() {
  
  if(bolinCas) { startTime++; }
  
  
	TIMER.innerHTML = "Váš čas je "+ startTime +" sekúnd"+"\n";
	uudaje.appendChild(TIMER);
    
};


function VytvorTabulkuScore(){
	var riadokHS ;
	var bunkaHS;
	var headerHS;
	var tabulka = document.createElement("TABLE");
	tabulka.setAttribute("id", "tabulkaHS");
	
	riadokHS = document.createElement('tr'); 
	riadokHS.style.border = "1px solid #000" ;
	headerHS = document.createElement('th');
	riadokHS.appendChild(headerHS);
	headerHS.innerHTML = "HIGH SCORE";
	
	
		bunkaHS = document.createElement('td');
		bunkaHS.style.border = "1px solid #000" ;
		riadokHS.appendChild(bunkaHS);		
		bunkaHS.style.width = "100px" ;
	    bunkaHS.style.height = "50px" ;		
		bunkaHS.style.textAlign = "center";
		bunkaHS.id = 'HS';
	tabulka.appendChild(riadokHS);

tabulka.style.border = "1px solid #000" ;
tabulka.style.borderCollapse = "collapse";
tabulka.style.position = "absolute" ;
tabulka.style.left = "400px" ;

document.body.appendChild(tabulka);	
	
}

function AktualnaHra(){
	aktHra.style.display = "block" ;
	var zobrazakthru = parseInt(CisloHra)+1;
	aktHra.innerHTML = "Práve hráte hru "+ zobrazakthru +"/10";
	uudaje.appendChild(aktHra);
	
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
   
	var hra=getCookie("hra");
	if (hra != "") {
        CisloHra = hra;
    }
	var HighSc=getCookie("skore["+CisloHra+"]");
	if (HighSc != "") {
        document.getElementById('HS').innerHTML = HighSc + " sekúnd" ;
    }
	
	
	
}

function checkRozohrataHra(){
	var rozohrane=getCookie("rozohranahra");
	if (rozohrane!=""){
		oznacene = rozohrane.split(",,");
		
		vykreslirozohraturhru();
	}
	
	
	
}

function checktutorial(){
	 var tutorial=getCookie("tutorial");
	if (tutorial== ""){
		openNavod();
	}
}

function vykreslirozohraturhru(){
	for (var i =0; i<oznacene.length; i++){
	var farba = getRandomColor ();
	if ((oznacene[i][0])!= ",") oznacene[i] = ","+oznacene[i];
	
	var res = oznacene[i].split(",");
	for(var j = 1 ; j<res.length; j++) {
		
			document.getElementById(res[j]).style.backgroundColor =  farba;
		}
	}
	
}
var datumm = new Date();
var pridajdatum = document.getElementById("datum") ;
pridajdatum.innerHTML = datumm.toDateString();
uudaje.appendChild(pridajdatum);


function openNavod() {
  document.getElementById('myModal').style.display = "block";
  closeScore();
}

function closeNavod() {
  document.getElementById('myModal').style.display = "none";
}



function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

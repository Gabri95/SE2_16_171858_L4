
/**
 * Metodo che legge i paramentri passati nell'url della richiesta (con metodo GET) che descrivono un employee
 * e li utilizzano per creare un'istanza di Employee.
 *  
 * @request l'oggetto che rappresenta la richiesta HTTP arrivata al server
 * 
 * @return un'istanza di Employee
 */
function getEmployee(request){
	
	//Uso il modulo "url" per analizzare l'url della richiesta ed estrarne i parametri
	var url_parts = url.parse(request.url, true);
	//variabile che conterrà i parametri
	var getVar = url_parts.query;
	
	//Inizializzo le variabili che conterranno i valori dei campi dell'oggetto Employee
	var id;
	if(getVar.id !== 'undefined')
		id = getVar.id;
	else 
		id = '';
		
	var name;
	if(getVar.name !== 'undefined')
		name = getVar.name;
	else 
		name = '';
	
	var surname;
	if(typeof getVar.surname !== 'undefined')
		surname = getVar.surname;
	else 
		surname
	
	var level;
	if(typeof getVar.level !== 'undefined')
		level = getVar.level;
	else 
		level = '';
	
	var salary;
	if(typeof getVar.salary !== 'undefined')
		salary = getVar.salary;
	else 
		salary = '';
		
	//Ritorno un oggetto Employee inizializzato con tali valori
	return new data.Employee(id, name, surname, level, salary);
}

//parse URL
var url = require('url');

//express lib
var express = require('express');

//for templates
var bind = require('bind');

//per la gestione dei dati (la parte Model del modello MVC)
var data = require('./data_module.js');

//instantiate express
var app = express();


//Imposto la porta su cui il server ascolterà le richieste
app.set('port', (process.env.PORT || 1337));


//Mappo la cartella contenente gli scripts JS utilizzati nel client su un percorso diverso per mascherare la struttura interna del server
app.use('/scripts', express.static(__dirname + '/scripts/'));



app.use('/', function(request, response){
	
	
    //Imposto l'header della risposta
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*"; //for cross enviroment request
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";//methods allowed to responce
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"; //type of headers
    //answer
    headers["Content-Type"] = "text/html";//format response
    
    
    
    //Uso il modulo "url" per analizzare l'url della richiesta ed estrarne i parametri
	var url_parts = url.parse(request.url, true);
	//variabile che conterrà i parametri
	var getVar = url_parts.query;
		
	//Prendo il valore del parametro "submit" che corrisponde ai tre diversi pulsanti presenti sulla pagina inviata la client
	//con cui è possibile inviare una richiesta al server
	var submit = getVar.submit;
	
	//Variabili utilizzate per la compilazione del Template che devono essere impostate
	
	//Questa variabile contiene i dati con cui riempire il form dell'employee nella pagina
	var employee = null;
	
	//Questa variabile indica se mostrare o meno all'inizio il form con i dati dell'employee
	var v = false;
	
	
	switch(submit){
		
		//Caso in cui è stato premuto il pulsante Insert
		case "Insert":			
			//Prendo l'oggetto Employee inviato nella request
			var e = getEmployee(request);
			
			//Se l'oggetto è valido (ogni campo, eccetto l'ID, è compilato ed è nel formato giusto) lo salvo
			if(	(e.id === "" || data.checkIfNormalInteger(e.id))
				&& data.checkIfNormalInteger(e.level)
				&& data.checkIfNormalInteger(e.salary)
				&& e.name !== ''
				&& e.surname !== '' ){
				
				//Converto gli attributi che devono contenere degli interi in degli interi,
				//in modo da evitare problemi derivati dalla loro interpretazione come stringhe
				//(es. se scrivo come ID '01' voglio che venga interpretato come '1')
				
				e.id = parseInt(e.id);
				e.salary = parseInt(e.salary);
				e.level = parseInt(e.level);
				
				//Nel form, mostro i dati dell'employee appena inserito
				employee = data.insertEmployee(e);
			}
			
			//Mostro il form nella pagina (eventualmente anche vuoto)
			v = true;
			
			break;
			
		//Caso in cui è stato premuto il pulsante Search	
		case "Search":
			
			//Recupero il valore del parametro input_id, contenente l'id dell'employee da cercare
			var id = getVar.input_id;
			
			//Cerco l'employee con questo id (l'eventuale ID non valido è gestito all'interno di questo metodo)
			employee = data.getEmployee(id);
			
			//Mostro il form nella pagina (eventualmente anche vuoto)
			v = true;
			
			break;
			
		//Caso in cui è stato premuto il pulsante Delete	
		case "Delete":
		
			//Recupero il valore del parametro input_id, contenente l'id dell'employee da eliminare
			var id = getVar.input_id;
			
			//Elimino l'employee con questo id (l'eventuale ID non valido è gestito all'interno di questo metodo)
			data.deleteEmployee(id);
			
			break;
			
			
		default:
			//Nel caso nella richiesta inviata non sia presente nessun pulsante premuto non si fa niente
			//La pagina ritornata sarà conterrà il form vuoto e nascosto
			break;
		
	}
	
	
	
	//Compilo e inserisco nella risposta il template
	bind.toFile(
		'tpl/home.tpl',
		{
			visualize: v,
			emp: employee
		}, 
		function(d){
			//write response
			response.writeHead(200, headers);
			response.end(d);
		}
	);


	

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

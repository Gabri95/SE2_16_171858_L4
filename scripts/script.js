/**
 * Funzione che fa nascondere il form e svuota i suoi campi o la fa riapparire.
 * 
 */
function changeVisibility(){
	//recupero il form utilizzando il suo ID
	var form = document.getElementById("employee");
	
	//accedo alla campo "display" del suo stile
	var display = form.style.display;
	
	//In base al suo stato attuale ne cambio la visibilità
	switch(display){
		
		//nel caso sia nascosto, lo rendo visibile
		case 'none':
			form.style.display = 'block';
			break;
		
		//in ogni altro caso lo nascondo e ne cancello il contenuto
		default:
			
			//nascondo il form
			form.style.display = 'none';
			
			//svuota il contenuto dei campi nel form
			document.getElementById("id").value = "";
			document.getElementById("name").value = "";
			document.getElementById("surname").value = "";
			document.getElementById("level").value = "";
			document.getElementById("salary").value = "";
			
			break;
	}
}



/**
 * Funzione che controlla se la stringa "str" può rappresentare un intero non negativo (un numero naturale)
 * utilizzando le Espressioni Regolari
 * 
 * @str stringa di cui controllare il contenuto
 * @return un valore booleano che indica se la stringa è o meno un numero naturale
 */
function checkIfNormalInteger(str) {
    return /^\d+$/.test(str);
}

/**
 * Metodo che controlla che il valore inserito nel campo di testo per la ricerca/eliminazione di un employee sia valido (un intero non negativo)
 * In caso contrario mostra un messaggio di allerta.
 * Il valore booleano di ritorno è utilizzato per annullare nel caso il submit del form.
 * 
 * 
 * @return un valore booleano che indica che il valore è valido o no
 * 
 */
function checkInputID(){
	//Recupero il valore da controllare
	var val = document.getElementById("input_id").value;
	
	//Controllo che sia valido
	if(!checkIfNormalInteger(val)){
		alert("Il campo deve contenere un ID numerico!");
		return false;
	}else{
		return true;
	}
}


/**
 * Metodo che controlla che i valori inseriti nel form per l'employee siano validi.
 * In caso contrario mostra un messaggio di allerta, indicando cosa è sbagliato.
 * Il valore booleano di ritorno è utilizzato per annullare nel caso il submit del form.
 * 
 * 
 * Più precisamente:
 * 		- il campo ID può essere vuoto o contenere un intero non negativo
 * 		- il campo NAME non può essere vuoto
 * 		- il campo SURNAME non può essere vuoto
 * 		- il campo LEVEL deve contenere un intero non negativo
 * 		- il campo SALARY deve contenere un intero non negativo
 * 
 * 
 * @return un valore booleano che indica che il valore è valido o no
 * 
 */
function checkEmployeeForm(){
	
	//Recupero i valori di tutti i campi del form
	var id = document.getElementById("id").value;
	var name = document.getElementById("name").value;
	var surname = document.getElementById("surname").value;
	var level = document.getElementById("level").value;
	var salary = document.getElementById("salary").value;
	
	//Controllo, in ordine, che ogni campo contenga un valore valido
	if(id !== "" && !checkIfNormalInteger(id)){
		alert("Il campo 'ID' deve essere vuoto o contenere un intero!");
		return false;
	}else if(name === '' ){
		alert("Il campo 'name' non può essere vuoto!");
		return false;
	}else if(surname === '' ){
		alert("Il campo 'surname' non può essere vuoto!");
		return false;
	}else if(!checkIfNormalInteger(level)){
		alert("Il campo 'level' deve contenere un intero!");
		return false;
	}else if(!checkIfNormalInteger(salary)){
		alert("Il campo 'salary' deve contenere un intero!");
		return false;
	}else{
		return true;
	}
}

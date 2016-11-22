
/**
 * Metodo per creare una nuova istanza di un Employee passandogli come parametro i valori dei suoi campi
 */
function Employee(id, name, surname, level, salary){
	this.id = id;
	this.name = name;
	this.surname = surname;
	this.level = level;
	this.salary = salary;
};

/**
 * Lista di Employee contenente gli employee salvati al momento.
 * È stata inizializzata con alcuni valori
 */
var employees = [
	new Employee(0, "Mario", "Rossi", 1, 1000),
	new Employee(1, "Luigi", "Bianchi", 2, 3000),
	new Employee(2, "Giuseppe", "Verdi", 3, 10000)
];

/**
 * Cerca nella lista degli employee quello identificato dall'ID passato come parametro
 * Se non è stato trovato nessun employee con questo ID viene ritornato un nuovo Employee con tutti i campi vuoti.
 * 
 * @id l'identificativo dell'employee che vogliamo cercare
 * 
 * @return l'oggetto Employee identificato da tale ID se trovato, un oggetto con tutti i campi vuoti altrimenti
 * 
 */
function getEmployee(id){
	
	var emp = null;
	//Controllo che l'ID sia un intero non negativo e che quindi sia un ID che può esistere davvero nella lista
	if(checkIfNormalInteger(id)){
		
		//in caso affermativo, scorro la lista in cerca di un employee con tale ID
		for(var i=0; i< employees.length; i++){
			if(employees[i].id == id){
				emp = employees[i];
				break;
			}
		}
	}
	
	//Se non è stato trovato nessun Employee, ne ritorno uno con tutti i campi vuoti
	if(emp == null){
		emp = new Employee("", "", "", "", "");
	}
	
	//ritorno l'oggetto Employee
	return emp;
}


/**
 * Metodo che inserisce un nuovo employee nella lista salvata
 * Se il campo ID dell'oggetto Employee passato come parametro non è un numero naturale
 * si genera un nuovo identificativo ottenuto dall'ID massimo nella lista sommato a 1
 * 
 * @emp l'oggetto Employee da salvare
 * 
 * @return l'oggetto Employee passato come parametro, con il campo ID eventualmente modificato
 * 
 */
function insertEmployee(emp){
	
	//Controllo se il campo ID è davvero un intero non negativo
	if(!checkIfNormalInteger(emp.id)){
		//in caso contrario genero un nuovo ID valido
		
		//cerco perciò l'ID più alto presente al momento
		var id = 0;
		for(var i=0; i < employees.length; i++){
			if(employees[i].id > id){
				id = parseInt(employees[i].id);
			}
		}
		//il nuovo ID sarà il numero successivo
		id += 1;
		
		//imposto il nuovo ID
		emp.id = id;
		
		//inserisco il nuovo employee
		employees.push(emp);
	}else{
		//In tal caso l'id è corretto
		
		//Controllo se esiste già un employee con questo ID
		var idx = -1;
		for(var i=0; i < employees.length; i++){
			if(employees[i].id === emp.id){
				idx = i;
				break;
			}
		}
		
		
		if(idx < 0){
			//Nel caso non esista inserisco direttamente il nuovo employee
			employees.push(emp);
		}else{
			//Se ne ho trovato uno con lo stesso ID, aggiorno tale employee
			employees[idx] = emp;
		}
	}
	
	//Alla fine ritorno l'employee passato come parametro con eventualmente l'ID modificato
	return emp;
}


/**
 * Metodo che cancella dalla lista degli employee salvata quello identificato dall'ID passato come parametro
 * Nel caso l'ID non sia valido (non corrisponde a nessun employee) non succede niente.
 * 
 * @id l'intero che identifica l'employee da eliminare
 */
function deleteEmployee(id){
	
	//Controllo che l'ID sia un intero non negativo e che quindi sia un ID che può esistere davvero nella lista
	if(checkIfNormalInteger(id)){
		
		//Cerco nella lista di employee se ne trovo uno con l'ID specificato
		var idx = -1;
		for(var i=0; i < employees.length; i++){
			if(employees[i].id == id){
				idx = i;
				break;
			}
		}
		//Se è stato trovato, lo elimino dalla lista
		if(idx >= 0){
			//elimino dalla lista un elemento a partire dalla posizione in cui ho trovato l'employee
			employees.splice(idx, 1);
		}
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
 * Esporto i metodi che devono essere pubblici
 */

exports.Employee = Employee;
exports.getEmployee = getEmployee;
exports.insertEmployee = insertEmployee;
exports.deleteEmployee = deleteEmployee;
exports.checkIfNormalInteger = checkIfNormalInteger;

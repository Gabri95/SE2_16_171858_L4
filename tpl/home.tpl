<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title> Es Lab 4 </title>
	</head>
	<body>
		
		<!-- Form per la ricerca/eliminazione di un employee-->
		<form method="GET" action ="http://127.0.0.1:1337/" onsubmit="return checkInputID();">
			<!-- La richiesta viene inviata in GET -->
			<!-- Al submit del form viene invocato il metodo "checkInputID()" che controlla che il valore contenuto nel campo di testo
				 sia valido. Ritornando il valore restituito da questo metodo, nel caso il valore non sia valido, il submit viene annullato.-->
			
			Insert ID employee:
			
			<!-- Campo di testo in cui inserire l'ID dell'employee desiderato-->
			<input type="text" name ="input_id" id ="input_id">
			
			<!-- Pulsante per cercare l'employee con tale ID-->
			<input type ="submit" value="Search" name = "submit">
			
			<!-- Pulsante per eliminare l'employee con tale ID-->
			<input type ="submit" value="Delete" name = "submit">
		</form>
		
		<br>
		<!-- Pulsante per mostrare/nascondere il form sottostante, invocando il metodo "changeVisibility()" -->
		<input type = "button" id = "show" value = "Show/hide the new employee form" onclick = "changeVisibility();">
		
		<br>
	
		
		<!-- Form per visualizzare i risultati di una ricerca o per inserire/modificare un employee-->
		<form id = "employee" method = "GET" action ="http://127.0.0.1:1337/"
			onsubmit="return checkEmployeeForm();"
			style ="display: (: if[visualize] ~
									[: then ~ block :]
									[: else ~ none :]:)">
							
			<!-- La richiesta viene inviata in GET -->
			<!-- Al submit del form viene invocato il metodo "checkEmployeeForm()" che controlla che i valori contenuti nei campi siano validi.
				 Ritornando il valore restituito da questo metodo, nel caso i valore non siano validi, il submit viene annullato.-->
			<!-- La visibilità di questo form è impostata dal parametro "visualize" del template-->
																								
																								
			<!-- Di seguito i campi del form corrispondenti agli attributi che descrivono un employee-->		
			<!-- Ogni campo è inizializzato all'attributo corrispondente del parametro "emp" (che descrive un Employee) del template-->
			<label for="id">ID</label>
			<input type ="text" name = "id" id = "id" value ="(: emp ~ [: id :] :)"><br>
			<label for="name">Name</label>
			<input type ="text" name = "name" id = "name" value = "(: emp ~ [: name :] :)"><br>
			<label for="surname">Surname</label>
			<input type ="text" name = "surname" id = "surname" value = "(: emp ~ [: surname :] :)"><br>
			<label for="level">Level</label>
			<input type ="text" name = "level" id = "level" value = "(: emp ~ [: level :] :)"><br>
			<label for="salary">Salary</label>
			<input type ="text" name = "salary" id = "salary" value = "(: emp ~ [: salary :] :)"><br>
			
			<!-- Pulsante per inserire l'employee con le caratteristiche scelte. Se esiste già un employee con l'id selezionato allora verrà modificato -->
			<input type ="submit" id ="insert" value ="Insert" name ="submit">
		</form>
		
		<!-- Inclusione dello script JavaScript che implementa le funzionalità necessarie al funzionamento della pagina-->
		<script src = "/scripts/script.js" type = "text/javascript"></script>

	</body>
</html>

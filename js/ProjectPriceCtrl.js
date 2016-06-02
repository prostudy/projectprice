app.controller("ProjectPriceCtrl", function($scope,$sce,$firebaseObject) {
	var ref = firebase.database().ref();
	
	
	$scope.init = function(){
		$scope.user = null;
		//$scope.quatations =[ { "id": 434, "name": "-Cotizacion 1", "description": "-Descripción de la cotización", "status": "close", "likes": 1000, "public": true, "tags": [ "tag", "tag2" ], "clients": [ { "clientId": 1 }, { "clientId": 3 } ], "etapas": [ { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true }, { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "fix", "accept": true } ] }, { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true } ] } ] } ,{ "id": 434, "name": "-Cotizacion 1", "description": "-Descripción de la cotización", "status": "close", "likes": 1000, "public": true, "tags": [ "tag", "tag2" ], "clients": [ { "clientId": 1 }, { "clientId": 3 } ], "etapas": [ { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true }, { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "fix", "accept": true } ] }, { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true } ] } ] } ,{ "id": 434, "name": "-Cotizacion 1", "description": "-Descripción de la cotización", "status": "close", "likes": 1000, "public": true, "tags": [ "tag", "tag2" ], "clients": [ { "clientId": 1 }, { "clientId": 3 } ], "etapas": [ { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true }, { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "fix", "accept": true } ] }, { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true } ] } ] } ];		
		//TODO:Revisar la estructura de datos json
		//https://firebase.google.com/docs/database/web/structure-data#flatten_data_structures
	};
	
	
	/**
	 * Registra un usuario con email y password
	 * */
	$scope.registerUserEmail = function(email, password){
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
			$scope.user = user;
			$scope.$apply();
			$scope.writeNewQuatation('Título de la cotización...','Descripción de la cotización','open',$scope.user.email,$scope.user.uid,null);
		}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(errorMessage);
			  // ...
			});
	};
	
	/**
	 * Realiza el login con email y password
	 */
	$scope.loginEmail = function(email, password){
		firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
			$scope.user = user;
			$scope.$apply();
			$scope.getcurrenUser();
		}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(errorMessage);
			  // ...
			});
	};
	
	/**
	 * Obtiene el usuario actual
	 * */
	$scope.getcurrenUser = function(){
		firebase.auth().onAuthStateChanged(function(user) {
			  if (user) {
				$scope.user = user;
				$scope.user.quatationData  = $firebaseObject(ref.child('user-quatations/' + $scope.user.uid));
				$scope.$apply();
			    console.log(user.uid);
			  } else {
			    console.log("Not user logged-");
			  }
			});
	};
	
	/**
	 * Cierra la sesion del usuario
	 */
	$scope.signOut = function(){
		firebase.auth().signOut().then(function() {
			$scope.user = null;
			$scope.$apply();
			  console.log("Sign-out successful.");
			}, function(error) {
				console.log("An error happened.");
			});
	};
	
	
	$scope.writeNewQuatation = function(title,description,status,author,uid,tags) {

		var quatationData = {
		    title: title,
		    description: description,
		    status : status,
		    starCount: 0,
		    ispublic :  true,
		    author: author,
		    uid: uid,
		    tags : tags,
		    etapas : false
		  };

		  // Get a key for a new Quatation.
		  var newQuatationKey = firebase.database().ref().child('quatations').push().key;

		  // Write the new quatation's data simultaneously in the quatations list and the user's quatations list.
		  var updates = {};
		  updates['/quatations/' + newQuatationKey] = quatationData;
		  updates['/user-quatations/' + uid + '/' + newQuatationKey] = quatationData;

		  return firebase.database().ref().update(updates);
	};
		
	
	
	
	
	
	$scope.addQuatation = function(quatationName){
		var Quatations = ref.child('Quatations');
		Quatations.push({ 'uid': $scope.user.uid, 'quatationName': quatationName });
	};
	
	
	
	$scope.addUser = function(userId){
		var usersRef = ref.child('users');
		usersRef.push({ userId : {'quatations':{'12345':true} } });
	};
	
	$scope.addStage = function(quatation){
		var etapa = {
			    name: "",
			    costHour: "", 
			    "tareas":[]
			  };
		quatation.etapas = etapa
		quatation.push(etapa);
	};
	
	$scope.addTask = function(etapa){
		etapa.tareas.push({ "name": "", "deliverable": "", "description": "", "hours": 5, "cost": 0, "type": "time", "accept": true });
	};
	
	$scope.changeModel = function(){
		$scope.user.quatationData.$save();
		//console.log($scope.quatations);
	};
	
	
	$scope.init();
	
});
app.controller("ProjectPriceCtrl", function($scope,$sce,$firebaseObject) {
	var ref = firebase.database().ref();
	
	
	$scope.stageId = 0;
	$scope.init = function(){
		//$scope.quatations =[ { "id": 434, "name": "-Cotizacion 1", "description": "-Descripción de la cotización", "status": "close", "likes": 1000, "public": true, "tags": [ "tag", "tag2" ], "clients": [ { "clientId": 1 }, { "clientId": 3 } ], "etapas": [ { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true }, { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "fix", "accept": true } ] }, { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true } ] } ] } ,{ "id": 434, "name": "-Cotizacion 1", "description": "-Descripción de la cotización", "status": "close", "likes": 1000, "public": true, "tags": [ "tag", "tag2" ], "clients": [ { "clientId": 1 }, { "clientId": 3 } ], "etapas": [ { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true }, { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "fix", "accept": true } ] }, { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true } ] } ] } ,{ "id": 434, "name": "-Cotizacion 1", "description": "-Descripción de la cotización", "status": "close", "likes": 1000, "public": true, "tags": [ "tag", "tag2" ], "clients": [ { "clientId": 1 }, { "clientId": 3 } ], "etapas": [ { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true }, { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "fix", "accept": true } ] }, { "name": "-Nombre de la etapa", "cost-hour": "$450", "tareas": [ { "name": "Tarea especial 1", "deliverable": "Nombre del entregable", "description": "Esta es una descripción", "hours": 5, "cost": 0, "type": "time", "accept": true } ] } ] } ];
		$scope.quatations = $firebaseObject(ref.child('quatations'));
		
		//TODO:Revisar la estructura de datos json
		//https://firebase.google.com/docs/database/web/structure-data#flatten_data_structures
	};
	
	$scope.addStage = function(quatation){
		quatation.etapas.push({"name": "", "cost-hour": "", "tareas":[]});
	};
	
	$scope.addTask = function(etapa){
		etapa.tareas.push({ "name": "", "deliverable": "", "description": "", "hours": 5, "cost": 0, "type": "time", "accept": true });
	};
	
	$scope.changeModel = function(){
		//$scope.quatations.$save();
		//console.log($scope.quatations);
	};
	
	
	$scope.init();
	
});
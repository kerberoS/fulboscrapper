var app = angular.module('app', ['controllers']);

var controllers = angular.module('controllers', []);

controllers.controller('AppController', ['$scope', '$http', function($scope, $http) {
    // FT Client
    var ftClient = new FTClient('AIzaSyCemMVmLwJUJlriy4zSsXcQuMJNBZJQnrQ');
    $scope.ftTable = '1idEJ_VNZaBtRx7VZIfcYSTk_OGJ3fBy2GKVQ6ac';

    // Tournaments
    $scope.tournaments = ["Apertura 90","Clausura 91","Apertura 91","Clausura 92","Apertura 92","Clausura 93","Apertura 93","Clausura 94","Apertura 94","Clausura 95","Apertura 95","Clausura 96","Apertura 96","Clausura 97","Apertura 97","Clausura 98","Apertura 98","Clausura 99","Apertura 99","Clausura 00","Apertura 00","Clausura 01","Apertura 01","Clausura 02","Apertura 02","Clausura 03","Apertura 03","Clausura 04","Apertura 04","Clausura 05","Apertura 05","Clausura 06","Apertura 06","Clausura 07","Apertura 07","Clausura 08","Apertura 08","Clausura 09","Apertura 09","Clausura 10","Apertura 10","Clausura 11","Apertura 11","Clausura 12","Inicial 12"];

    // Fechas
    $scope.fechas = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

    // Initial state
    $scope.search = { torneo: "Apertura 90", fecha: 1 };

    // Update
    $scope.update = function() {
        var query = {
            fields: ['date','local','visitante','resultado'],
            table: $scope.ftTable,
            tail: "WHERE torneo = '" + $scope.search.torneo + "' AND fecha = '" + $scope.search.fecha + "'"
        }

        ftClient.query(query, function(rows) {
            var games = [];
            // process data
            rows.map(function(row) {
                games.push({
                    date: row[0],
                    local: row[1],
                    visitante: row[2],
                    resultado: row[3]
                })
            })
            $scope.games = games;
            $scope.$apply();
        })
    }

    // Next
    $scope.next = function() {
        $scope.search.fecha = $scope.search.fecha < 19 ? $scope.search.fecha + 1 : $scope.search.fecha;
        $scope.update();
    }

    // Prev
    $scope.prev = function() {
        $scope.search.fecha = $scope.search.fecha > 1 ? $scope.search.fecha - 1 : $scope.search.fecha;
        $scope.update();
    }

    // Select tournament
    $scope.selectTournament = function() {
        $scope.search.fecha = 1;
        $scope.update();
    }
}])
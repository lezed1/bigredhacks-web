"use strict";
var app = angular.module('brh.controllers', []);


app.controller('checkin.ctrl', ['$scope', '$http', function ($scope, $http) {
    $scope.users = [];
    $scope.inputSearch = "";

    //For QR scanning
    var qr = new QCodeDecoder;
    var video = document.getElementById('camera');
    if (!qr.isCanvasSupported() || !qr.hasGetUserMedia()){
        throw alert("Your browser doesn't match the required specs."),
        new Error("Canvas and getUserMedia are required");
    }
    var elems = [{
        target: document.querySelector("#camera video"),
        activator: document.querySelector("#camera button"),
        decoder: qr.decodeFromCamera
    }];
    elems.forEach(function(e) {
        e.activator.onclick = function(r) {
            r && r.preventDefault(),
            e.decoder.call(qr, e.target, function(e, r) {
            if (e){
                throw e;
            }
            alert("Just decoded: " + r);
            location.reload();
            }, true)
        }   
    });

    $scope.filterSearch = function (user) {
        var input = $scope.inputSearch.toLowerCase();
        var name = (user.name.first + " " + user.name.last).toLowerCase();
        return (input == "" || name.indexOf(input) != -1);
    };

    $scope.filterCheckedIn = function (user) {
        return !user.internal.checkedin;
    };

    $scope.loadUsers = function () {
        $http.get('/api/admin/users/checkin')
            .success(function (data, status, headers, config) {
                $scope.users = data;
                console.log("Got users", data);
            })
            .error(function (data, status, headers, config) {
                console.log("Failed getting users", data, status, headers);
            });
    };

    $scope.checkinUser = function (pubid) {
        $http({
            method: 'PATCH',
            url: '/api/admin/user/' + pubid + '/checkin',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                checkedin: true
            }
        }).success(function (data) {
            $scope.loadUsers();
        }).error(function () {
            console.log("Error checking user in");
        });
    };

    $scope.loadUsers();

}]);
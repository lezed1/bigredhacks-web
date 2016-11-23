"use strict";
var app = angular.module('brh.controllers', []);


app.controller('checkin.ctrl', ['$scope', '$http', function ($scope, $http) {
    $scope.users = [];
    $scope.inputSearch = "";

    //For QR scanning
    //Creates QRCodeDecoder Object
    var qr = new QCodeDecoder;
    var video = document.getElementById('camera');

    //Ensures that Canvas is supported in the browser
    if (!qr.isCanvasSupported() || !qr.hasGetUserMedia()){
        alert("Your browser doesn't match the required specs.");
        throw new Error("Canvas and getUserMedia are required");
    }
    //Specifies where to put the stream and what triggers the video
    //decodeFromCamera is the object that starts scanning every frame of the camera stream
    var elems = [{
        target: document.querySelector("#camera video"),
        activator: document.querySelector("#camera button"),
        decoder: qr.decodeFromCamera
    }];

    //In case we have more than one stream
    elems.forEach(function(e) {
        e.activator.onclick = function(r) {
            //Stop any default behavior associated with buttons
            r && r.preventDefault();
            //Attempt to decode
            e.decoder.call(qr, e.target, function(e, r) {
            if (e){
                throw e;
            }

            //If decode works, then this will alert.
            //Change this check-in logic later
            alert("Just decoded: " + r);

            //Reload to kill the stream
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
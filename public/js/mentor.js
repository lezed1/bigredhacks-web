'use strict';
$(document).ready(function () {

    var socket = io(); //client-side Socket.IO object

    socket.on('request update', function (newRequestList) {
        console.log(newRequestList);
    });
});


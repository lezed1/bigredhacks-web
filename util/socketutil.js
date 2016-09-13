"use strict";

var io = null;

module.exports.activateIo = function(newIo) {
    io = newIo;

    // Server Listens
    // On Connections stays alive for the duration of a user's connection.
    io.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('disconnect', function () {
            console.log('disconnected');
        });
    });

};
// Mentorship

// Server Broadcasts
module.exports.updateRequests = function(newRequestList) {
    io.emit('request update', newRequestList);
};

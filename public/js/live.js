$(function() {
    var socket = io();

    

    socket.on('announcement', function(data) {
        console.log('Announcement received');
        window.alert(data.message);
    });

    console.log('live init');
});

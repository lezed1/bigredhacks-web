//send email when click checkout hardware button
$("#checkout-hardware-btn").on('click', function (){
    var name = $('#name').val();
    var email = $('#email').val();
    if (name == '' || email == '') {
        return false;
    }
});
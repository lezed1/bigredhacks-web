var _0110_ = false;
var qwerty = false;
var ________________ = 0;

$('.whale').hover(
    function() {
        _0110_ = !!1;
    },
    function() {
        _0110_ = !!!1;
    }
);

function d() {
    var _ = $("<div>", {class: "wat1"});
    $('.whale').append(_);
    _.css({left: 75});
    _.animate({
        'top' : "-1000px"
    }, 5000);
}

function dd() {
    var ___ = $("<div>", {class: "wat2"});
    $('.whale').append(___);
    ___.css({left: 75});
    ___.animate({
        'top' : "-1000px"
    }, 10000)
}

setInterval(function() {
    if (!qwerty) {
        if (_0110_) {
            ________________++;
            if (________________ >= 7) {
                qwerty = !qwerty;
                $('.whale').css('z-index',9999);
                $('.whale-happy').css('z-index',9999);
                $(".c").css("opacity",1).fadeIn(300, function () {
                    setTimeout( d, 1000);
                    setTimeout( dd, 2000);
                    setTimeout( dd, 3000);
                    setTimeout( d, 5000);
                    setTimeout( dd, 6000);
                    setTimeout( dd, 8000);
                    setTimeout( d, 9000);
                    setTimeout( dd, 10000);
                    setTimeout( dd, 11000);
                    setTimeout( d, 13000);
                    setTimeout( d, 15000);
                    setTimeout( dd, 16000);
                    setTimeout( d, 17000);
                    setTimeout( d, 18000);
                });
            }
        } else {
            ________________ = 0;
        }
    }
},1000);
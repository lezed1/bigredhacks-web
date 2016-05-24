/**
 * pad a number with leading 0's
 * @param num
 * @param size
 * @returns {string}
 */
function pad(num, size) {
    var s = "000" + num; //assume never need more than 3 digits
    return s.substr(s.length - size);
}

(function ($) {

    //jQuery to collapse the navbar on scroll
    /*$(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });*/

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        var padding = 30;
        $('.navbar-nav li a').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - padding
            }, 1000, 'easeInOutExpo');
            $(".navbar-main-collapse").collapse('hide');
            event.preventDefault();
        });
        $('.page-scroll a').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - padding
            }, 1000, 'easeInOutExpo');
            $(".navbar-main-collapse").collapse('hide');
            event.preventDefault();
        });
    });


    //registration modal stuff
    var footer, title;
    var reg = $("#regModal");
    $("#regCornell").on("click", function (e) {
        e.preventDefault();
        footer = reg.find(".modal-footer").html();
        reg.find(".modal-footer .reg-select").addClass("hidden");
        title = reg.find(".modal-title").text();
        reg.find(".modal-title").text("Cornell/Ithaca Registration");
        reg.find(".modal-body").removeClass("hidden");
        $("#cornell-submit").removeClass("hidden");
    });

    reg.on('hidden.bs.modal', function (e) {
        reg.find(".modal-footer .reg-select").removeClass("hidden");
        reg.find(".modal-title").text(title);
        reg.find(".modal-body").addClass("hidden");
        $("#cornell-submit").addClass("hidden");
    });

    //fade out things that have fadeOut class
    $(".fadeOut").delay(2000).fadeOut(2000, "easeInCubic");


    /**
     * validator
     */

    $.validator.addMethod("checkCornellEmail", function (val, elem, params) {
        return /^[^@]+@cornell\.edu$/i.test(val) || val === "";
    }, 'Please enter a cornell.edu email.');


    $('#subscribeEmail').validate({
        onfocusout: function (e, event) {
            this.element(e); //validate field immediately
        },
        onkeyup: false,
        rules: {
            cornellEmail: {
                required: true,
                email: true
            }
        }
    })


})(jQuery);

(function($){
$(window).trigger('resize'); })(jQuery);

function generateRainDrops($) {
    const barHeight = $('.top-nav-collapse').height();
    const introHeight = $('.transparent').offset().top;
    const sustainableHeight = $('#sustainable').offset().top;
    const whaleHeight = $('#whaleDiv').offset().top;
    const faqHeight = $('#faq').offset().top;
    const sponsorHeight = $('#sponsors').offset().top;
    const actualSponsorHeight = $('#sponsors').height() + sponsorHeight;
    const footerHeight = $('footer').offset().top;
    const docHeight =  $(document).height();
    const cloudHeight = $('.rainClouds').offset().top;

    console.log(introHeight);

    console.log(cloudHeight);

    // Raincloud width: 25%
    const cloudRight = $( window ).width() * .25;
    const cloudRealHeight = $( window ).height() * .15;
    const cloudBottom = cloudRealHeight + 65;

    //  .raindrop(style="left:20%;" data-top="top:100%; opacity:!1" data--200-bottom-top="top:-10%; opacity:!1;" data--130-bottom-top="top:-10%; opacity:!0;")
    var height = 65;
    var $div = $("<div>", {class: "raindrop"})
        .offset({left: 9 * cloudRight / 13})
        .attr("data-0", "top:" + (cloudHeight + cloudBottom) + "px; opacity:0;")
        .attr("data-" + cloudHeight, "top: " + (cloudHeight + cloudRealHeight + cloudRealHeight/3) +"px; opacity:0;")
        .attr("data-" + sustainableHeight, "top:" + (sustainableHeight  + 70) + "px; background:rgb(212,239,253); opacity:1; height: 65px;")
        .attr("data-" + faqHeight, "top:"+ (faqHeight + height + 500) + "px; background:rgb(255,255,255); height: 125px; width: 9px;")
        .attr("data-" + sponsorHeight, "top:"+ (sponsorHeight + height + 100) + "px; background:rgb(212,239,253); opacity: 0; width: 15px;");
        $("#intro").append($div);

    var $div2 = $("<div>", {class: "raindrop"})
        .offset({left: 8*cloudRight / 13})
        .attr("data-0", "top:" + (cloudHeight + cloudBottom) + "px; opacity:0;")
        .attr("data-" + cloudHeight, "top: " + (cloudHeight + cloudRealHeight + cloudRealHeight/2) +"px; opacity:0;")
        .attr("data-" + sustainableHeight, "top:" + (sustainableHeight  + 140) + "px; background:rgb(212,239,253); opacity:1; height: 120px;")
        .attr("data-" + faqHeight, "top:"+ (faqHeight + height + 500) + "px; background:rgb(255,255,255); height: 100px; width: 9px;")
        .attr("data-" + (sponsorHeight - 25), "top:"+ (sponsorHeight + height + 100) + "px; background:rgb(212,239,253); opacity: 0; width: 15px;");
    $("#intro").append($div2);

    var $div3 = $("<div>", {class: "raindrop"})
        .offset({left: 7*cloudRight / 13})
        .attr("data-0", "top:" + (cloudHeight + cloudBottom) + "px; opacity:0;")
        .attr("data-" + cloudHeight, "top: " + (cloudHeight + cloudRealHeight + cloudRealHeight/5) +"px; opacity:0;")
        .attr("data-" + sustainableHeight, "top:" + (sustainableHeight  + 150) + "px; background:rgb(212,239,253); opacity:1; height: 75px;")
        .attr("data-" + faqHeight, "top:"+ (faqHeight + height + 500) + "px; background:rgb(255,255,255); height: 75px; width: 9px;")
        .attr("data-" + (sponsorHeight - 50), "top:"+ (sponsorHeight + height + 100) + "px; background:rgb(212,239,253); opacity: 0; width: 15px;");
    $("#intro").append($div3);

    var $div4 = $("<div>", {class: "raindrop"})
        .offset({left: 6*cloudRight / 13})
        .attr("data-0", "top:" + (cloudHeight + cloudBottom) + "px; opacity:0;")
        .attr("data-" + cloudHeight, "top: " + (cloudHeight + cloudRealHeight + cloudRealHeight/6) +"px; opacity:0;")
        .attr("data-" + sustainableHeight, "top:" + (sustainableHeight  + 75) + "px; background:rgb(212,239,253); opacity:1; height: 45px;")
        .attr("data-" + faqHeight, "top:"+ (faqHeight + height + 500 ) + "px; background:rgb(255,255,255); height: 50px; width: 9px;")
        .attr("data-" + (sponsorHeight - 75), "top:"+ (sponsorHeight + height + 100) + "px; background:rgb(212,239,253); opacity: 0; width: 15px;");
    $("#intro").append($div4);

    var $div5 = $("<div>", {class: "raindrop"})
        .offset({left: 5*cloudRight / 13})
        .attr("data-0", "top:" + (cloudHeight + cloudBottom) + "px; opacity:0;")
        .attr("data-" + cloudHeight, "top: " + (cloudHeight + cloudRealHeight + cloudRealHeight/4) +"px; opacity:0;")
        .attr("data-" + sustainableHeight, "top:" + (sustainableHeight  + 190) + "px; background:rgb(212,239,253); opacity:1; height: 135px;")
        .attr("data-" + faqHeight, "top:"+ (faqHeight + height + 500 ) + "px; background:rgb(255,255,255); height: 25px; width: 9px;")
        .attr("data-" + (sponsorHeight - 100), "top:"+ (sponsorHeight + height + 100) + "px; background:rgb(212,239,253); opacity: 0; width: 15px;");
    $("#intro").append($div5);
}

// Clocktower timer
(function ($) {
    const SEP_SIXTEEN = 1473984000;
    $timer = $('.counter');
    console.log(Date.now());
    daysLeft = Math.floor( Math.abs( Date.now() / 1000 - SEP_SIXTEEN ) / 86400) + 1;
    $timer.text(daysLeft + '');
})(jQuery);


jQuery( document ).ready(function() {
    generateRainDrops($);
    
    skrollr.init({
        forceHeight: false,
        smoothScrollingDuration: 250,
        smoothScrolling: true,
        mobileCheck: function() {return false;}
    });
});

jQuery( window ).resize(function() {
    // Raindrops won't match proportions. TODO: Realign drops
    $('.raindrop').remove();

});
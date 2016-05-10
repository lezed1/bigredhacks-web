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

var $fishSchool;
(function ($) {
    $fishSchool = $('<div>', {class : "fishSchool"});
    $(".faq").append($fishSchool);
    return $fishSchool;
})(jQuery);


const cloudHeight = 40;
var introHeight;
var sustHeight;
var aboutHeight;

function resizes($) {
    $(".cloud1").remove();
    $(".cloud2").remove();
    $(".cloud3").remove();
    $(".cloud4").remove();

    introHeight =$(".intro").height();
    sustHeight = $("#sustainable").height() + introHeight + cloudHeight;
    aboutHeight = $("#about").height() + sustHeight;

    createCloud($, -325, sustHeight, "cloud1", ".intro");
    createCloud($, -325, introHeight, "cloud3", ".intro");
    createCloud($, -300, introHeight- 250, "cloud4", ".intro");
    createCloud($, -325, aboutHeight, "cloud2", ".intro");

    createSchool($);
}

resizes(jQuery);

// Create cloud
function createCloud($, xPos, yPos, cloudClass, appendee) {
    var $cloud = $('<div>', {class : cloudClass});
    $cloud.offset({top: yPos, left: xPos});

    $(appendee).append($cloud);
}

(function($){
$(window).resize(function() { resizes(jQuery) });
$(window).trigger('resize'); })(jQuery);

// Fish
function createSchool($) {
    // A school of fish managed by the first fish
    // Clear old school if it exists
    $(".fish-1").remove();
    $(".fish-2").remove();
    $(".fish-3").remove();

    createFish($, -300, 0, "fish-"+ Math.floor(Math.random() * 3), ".fishSchool");
    createFish($, 100, 200, "fish-"+ Math.floor(Math.random() * 3), ".fishSchool");
    createFish($, -300, 0, "fish-"+ Math.floor(Math.random() * 3), ".fishSchool").offset({top: 50, left: 50});

    $fishSchool.one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
        console.log('dead');
        createSchool($); // Refresh fish
    });
}

function createFish($, xPos, yPos, fishClass, appendee) {
    var $fish = $('<div>', {class : fishClass});
    $(appendee).append($fish);
    return $fish;
}

jQuery( document ).ready(function() {console.log("rdy"); skrollr.init({forceHeight: false});});
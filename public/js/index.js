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
    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

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

    // Clouds

})(jQuery);
// Clouds
var clouds = [];
var rainDrops = [];
const RAIN_VELOCITY = 25;
var swapHeights = []; // Heights when drops switch color

// // Populate swap heights
// (function populateSwaps($) {
//     var $sections = $("section");
//     for (var i in $sections) {
//         console.log($sections[i]);
//         swapHeights.push($sections[i].position().top);
//         console.log(swapHeights[i]);
//     }
// })(jQuery);

// Create cloud
function createCloud($, velocity, xPos, yPos, cloudClass) {
    var cloudHolder = {};
    var cloud = $("<div>", {class : cloudClass});
    for (i = 0; i < 5; i++) {
        cloud.append($("<div>", {class : "triangle"}));
    }
    cloudHolder.cloud = cloud;
    cloudHolder.posX = xPos;
    cloudHolder.posY = yPos;
    cloudHolder.velocity = velocity;
    $(".intro").append(cloud);
    clouds.push(cloudHolder);
}

function cloudUpdate($) {
    // Move clouds
    for (var x in clouds) {
        if (clouds[x].posX > $(window).width()) {
            clouds[x].posX =-100;
        }
        clouds[x].posX += clouds[x].velocity;
        clouds[x].cloud.css({top: clouds[x].posY, left: clouds[x].posX, position:'absolute'});

        // Drop rain
        if (Math.random() > .97) {
            var rainDropHolder = {};
            var rainDrop = $("<div>", {class : "raindrop"});
            rainDrop.css({height: Math.floor(Math.random() * 75 + 25 )});
            $(".intro").append(rainDrop);
            rainDropHolder.posY = clouds[x].posY + 120;
            rainDropHolder.posX = clouds[x].posX + Math.random() * 150;
            rainDropHolder.rainDrop = rainDrop;
            rainDropHolder.active = true;
            rainDrops.push(rainDropHolder);
        }
    }
    // Move rain
    for (var x in rainDrops) {
        rainDrops[x].posY += RAIN_VELOCITY;
        rainDrops[x].rainDrop.css({top: rainDrops[x].posY, left: rainDrops[x].posX, position:'absolute'});

        // If you don't kill before the height of raindrop, they will expand the page
        if (rainDrops[x].posY > $(document).height() - 200) {
            rainDrops[x].rainDrop.remove();
            rainDrops[x].active = false;
        }
    }

    // Remove dead drops
    var i = rainDrops.length;
    while (i--) {
        if (rainDrops[x] && !rainDrops[x].active) {
            rainDrops.splice(i,1);
        }
    }


}

createCloud(jQuery, .8,-100, 650, "cloud1");
createCloud(jQuery, 1,-200, 600, "cloud2");
createCloud(jQuery, .5,-300, 700, "cloud3");

setInterval(cloudUpdate, 50, jQuery);
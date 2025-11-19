//menu.js
$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $(".sticky").addClass("nav-sticky");
    } else {
        $(".sticky").removeClass("nav-sticky");
    }
});

$('.navbar-nav a, .mouse-down').on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 0
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});

// Scrollspy
// $("#navbarCollapse").scrollspy();
$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
    // $('a[href^="#"]').on('click', function (e) {
    //     e.preventDefault();
    //     $(document).off("scroll");
        
    //     $('a').each(function () {
    //         $(this).removeClass('active');
    //     })
    //     $(this).addClass('active');
      
    //     var target = this.hash,
    //         menu = target;
    //     $target = $(target);
    //     $('html, body').stop().animate({
    //         'scrollTop': $target.offset().top+2
    //     }, 500, 'swing', function () {
    //         window.location.hash = target;
    //         $(document).on("scroll", onScroll);
    //     });
    // });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.navbar-nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top -100 < scrollPos) {
            $('.navbar-nav li').removeClass("active");
            currLink.closest('li').addClass("active");
        }
        else{
            currLink.closest('li').removeClass("active");
        }
    });
}
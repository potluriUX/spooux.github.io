$(document).ready(function() {

  //Preloader
  $(window).load(function() {
    $(".spinner").delay(1000).fadeOut('slow');
    $("#mask").delay(1500).slideUp(600);
  });

  //Header animation on scroll
  $(window).scroll(function() {
    var outer = $('#home').height();

    if ($(document).scrollTop() >= outer) {
      $('#topnav').addClass('scrolled');
    } else{
      $('#topnav').removeClass('scrolled');
    }
  }).trigger('scroll');

  $('#nav a[href=#]').click(function() {
    return false;
  });

  //Navigation Scrolling
  $('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  //Close navbar on click
  $('#nav a').on('click', function(){
    if ($(window).width() < 768) {
      $(".navbar-toggle").click();
    }
  });
  
  //Parallax Sections
  $('.parallax-section').each(function() {
    $(this).parallax("100%", 0.1);
  });

  // Home Section Slider
  $('#home-slider').flexslider({
    animation: "slide",
    directionNav: false,
    controlNav: false,
    direction: "vertical",
    smoothHeight: true,
    useCSS: false
  });

  // Background Slider
  $('#backgrounds').flexslider({
    animation: "fade",
    directionNav: false,
    controlNav: false,
  });

  //Background images
  $('#backgrounds img').each(function() {
    var image = $(this).attr('src');
    $(this).parents('li').css('background-image', 'url('+image+')');
    $(this).remove();
  });


  //Page title opacity on scroll
  $(window).on('scroll', function(){

    var fadeStart=  100;
    var fadeUntil=  '';

    if ($('#home').length) {
      fadeUntil = 450
    } else{
      fadeUntil = 200
    }

    var offset = $(document).scrollTop();
    var opacity=0;

    if(offset<=fadeStart){
      opacity=1;
    }
    else if( offset<=fadeUntil ){
      opacity=1-offset/fadeUntil;
    }

    $('.slide-middle, .title-text').css('opacity',opacity);

  });

  //Elements animation
  $('.animated').appear(function(){
    var element = $(this);
    var animation = element.data('animation');
    var animationDelay = element.data('animation-delay');
    if (animationDelay) {
      setTimeout(function(){
        element.addClass( animation + " visible" );          
      }, animationDelay);
    }else {
      element.addClass( animation + " visible" );        
    }    
  },{accY: -150});

  //Clients carousel
  $("#clients-carousel").owlCarousel({
    items : 4,
    itemsDesktop : [1000,4],
    itemsDesktopSmall : [900,3],
    itemsTablet: [600,2],
    itemsMobile : false,
    autoPlay: 4000,
    pagination: false
  });

  //Portfolio Filters
  $('#works-list').mixitup({
    effects: ['fade','scale'],
    easing: 'snap'
  });

  // Go to top of the page
  $(".goTop").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });

  //Portfolio project slider
  function initProjectSlider() {
    $('.project-slider').flexslider({
      prevText: "",
      nextText: "",
      useCSS: false,
      animation: "slide"
    });
  };
function someFunction(newHREF){
//do stuff
document.location.href = newHREF
}
  //Portfolio Modal
  $('.open-project').on('click', function(){     
    var projectUrl = $(this).attr("href");

    $('#project-modal').fadeIn('slow');
    
    $("#project-modal-content").html(projectUrl); 
    someFunction(projecturl);
//    + ' #project',
//      function(){       
//        if ($('.project-slider').length > 0) {
//          initProjectSlider();
//        }
//    });
    
    $('.project-modal-title h3').text($(this).find('h5').text());
    $('body').addClass('modal-open');

    return false;  
  });

  //Modal Close
  $('#project-modal').on('click', '#project-modal-close', function(event) {
    $('#project-modal-content').html('');
    $('#project-modal').fadeOut('slow');
    $('body').removeClass('modal-open');
    return false;
  });
  
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('#project-modal-close').trigger('click');
    }
  });

  // Project Slider
  $('.project-slider').flexslider({
    controlNav: false,
    animation: "slide",
    prevText: "",
    nextText: ""
  });  

  //Contact form validation and submit with ajax
  $('#contact-us').validate({
    errorPlacement: function(error, element) {},
    highlight: function(element, errorClass) {        
        $(element).parent().removeClass('success').addClass('error');
    },
    unhighlight: function(element, errorClass) {
        $(element).parent().removeClass('error').addClass('success');
    },
    rules: {
      fullname:{
        required: true
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true
      }
    },
    submitHandler: function(form) {
      var url = $(form).attr('action');
      $.ajax({
        type: "POST",
        url: url,
        data: $(form).serialize(), // serializes the form's elements.
        success: function(data)
        {
            $('.form-sent').slideDown(400); // show response from the php script.
        }
      });
    }
  });
  
});
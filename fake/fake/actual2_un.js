(function($) {})(window.jQuery);
$(document).ready(function() {
    $('#switch-to-landscape a').click(function() {
        $(".landscape-ok").css({
            "display": "block"
        });
        $("#switch-to-landscape").css({
            "display": "none"
        });
    });
    $('#main-nav ul').slicknav({
        prependTo: '#mobile-menu',
        label: '<img src="http://www.ourwebsite.com/images/backgrounds/burger.png"/>',
        closeOnClick: true
    });
    $("select").simpleselect();
    $(window).load(function() {
        $(".loader").fadeOut("slow");
    });
    var currentYear = (new Date).getFullYear();
    $('span.date').text(currentYear);
    var body = document.body;
    $('.tabs').on('toggled', function(event, tab) {
        classie.add(body, "pml-open-site");
        activeNav = "pml-open-site";
    });
    $('.close-menu').on('click', function() {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass("active");
            activeNav = "pml-open-site";
            classie.remove(body, activeNav);
            activeNav = "";
        } else {
            $(this).parent().addClass("active");
        }
    });
    $(function() {
        $(".sortable").sortable({
            start: function(event, ui) {
                $('.sortable').addClass('dragging');
                $('.delete').remove()
            },
            stop: function(event, ui) {
                $('.sortable').removeClass('dragging')
            }
        });
        $(".sortable").disableSelection()
    });
    $(".phone-settings-input").each(function() {
        $("#" + $(this).attr('id') + "-result").text($(this).val())
    });
    $(".phone-settings-input").keyup(function(e) {
        $("#" + $(this).attr('id') + "-result").text($(this).val());
    });
    $("#imgInp").change(function() {
        readURL(this);
    });
    $("#battery-slider").slider({
        range: "min",
        value: 50,
        min: 1,
        max: 100,
        slide: function(event, ui) {
            $("#battery-slider-amount").val(ui.value + "%");
            $("#battery-percent-number").text(ui.value);
            $("#battery-percent").width(ui.value + "%");
            if (ui.value <= 20) {
                $("#battery-percent").addClass('red')
            } else {
                $("#battery-percent").removeClass('red')
            }
        }
    });
    $("#battery-slider-amount").val($("#battery-slider").slider("value") + "%");
    $('#batteryprecentswitch').click(function() {
        if ($(this).is(':checked')) {
            $("#battery-percent-number-container").fadeIn(250)
        } else {
            $("#battery-percent-number-container").fadeOut(250)
        }
    });
    $('input:radio[name=connectionSelection]').click(function() {
        var $option = $(this).val();
        if ($option == 'wifi') {
            $(".connection-slider-wifi").fadeTo(250, 1);
            $("#connection-type").fadeIn(250);
            $("#connection-type-3g").fadeOut(100);
            $("#connection-type-4g").fadeOut(100, function() {
                $("#connection-type-wifi-wrapper").fadeIn(200)
            })
        } else if ($option == '3g') {
            $("#connection-type").fadeIn(250);
            $("#connection-type-wifi-wrapper").fadeOut(100);
            $("#connection-type-4g").fadeOut(100, function() {
                $("#connection-type-3g").fadeIn(200)
            })
        } else if ($option == '4g') {
            $("#connection-type").fadeIn(250);
            $("#connection-type-3g").fadeOut(100);
            $("#connection-type-wifi-wrapper").fadeOut(100, function() {
                $("#connection-type-4g").fadeIn(200)
            })
        } else if ($option == 'none') {
            $("#connection-type").fadeOut(250)
        }
    });
    $("#wifi-slider").slider({
        range: "min",
        value: 3,
        min: 0,
        max: 3,
        slide: function(event, ui) {
            $("#wifi").attr('src', './fake/wifi-' + ui.value + '.png');
            $("#wifi").attr('src', './fake/wifi-' + ui.value + '.png');
            $("#connection-type-wifi").attr('src', './fake/wifi-' + ui.value + '.png');
          //  console.log('./fake/wifi-' + ui.value + '.png');
           // console.log('./fake/wifi-' + ui.value + '.png');
           // console.log('./fake/wifi-' + ui.value + '.png');
            $('input:radio[name=connectionType][value=wifi]').click()
        }
    });
    $("#connection-slider").slider({
        range: "min",
        value: 3,
        min: 0,
        max: 5,
        slide: function(event, ui) {
            $("#connection").attr('src', './fake/3g-' + ui.value + '.png');
            console.log('./fake/3g-' + ui.value + '.png');
            console.log('./fake/3g-' + ui.value + '.png');
            $("#signalimage").attr('src', './fake/3g-' + ui.value + '.png');
        }
    });
    $('.sendMessage').click(function() {
        var $color = 'text-message ' + $("input[name=messageType]:checked").val();
        var $msg = $("#message-text").val();
        var $msgTime = $("#message-text-time").val();
        var $msgStatus = $("input[name=messageStatus]:checked").val();
        if ($("input[name=messageType]:checked").val() == 'no-color') {
            var $color = 'message-type-time'
        }
        if ($("input[name=messageType]:checked").val() == 'grey') {
            var $msgStatus = 'none'
        }
        if ($msg) {
            var newItem = $('<li class="' + $color + '"><div class="delete" style="display:none;"></div><div class="bubble-top"></div><div class="message-content"><p>' + $msg + '</p><p class="timestamp">' + $msgTime + '<span  class="' + $msgStatus + '"><img src="./fake/check-' + $msgStatus + '.png" alt=""></span></p></div><div class="bubble-bottom"></div></li>');
            $(".download-btn").fadeIn(500);
            if ($('#top-message').length > 0) {
                $("#top-message").fadeOut(250, function() {
                    var newItem2 = $('<li class="message-type-time"><div class="delete" style="display:none;"><i class="fa fa-trash-o"></i></div><div class="bubble-top"></div><div class="message-content"><p></p></div><div class="bubble-bottom"></div></li>');
                    $("#top-message").remove();
                    $("#messages-list").append(newItem2);
                    $("#messages-list").append(newItem);
                    $("#messages-list").animate({
                        scrollTop: $('#messages-container').height()
                    }, 1000)
                });
                $(".message-default").fadeOut(250)
            } else {
                $("#messages-list").append(newItem);
                $("#messages-list").animate({
                    scrollTop: $('#messages-container').height()
                }, 1000)
            }
            $("#msg").val('')
            $(".message-added").html("Message Added!").fadeIn(100).fadeOut(2000);
        }
    });
    $('ul#messages-list').on('mouseenter', 'li', function() {
        if (!$('#messages-list').hasClass('dragging')) {
            $(this).append('<div class="delete"><img src="./fake/icon-trash.png" alt="delete item"></div>')
        }
    });
    $('ul#messages-list').on('mouseleave', 'li', function() {
        $(this).find(".delete").remove()
    });
    $('#messages-list').on('click', '.delete', function() {
        $(this).parent('li').fadeOut(500, function() {
            $(this).remove()
        })
    });
    window.preview = function(input) {
        if (input.files && input.files[0]) {
            $(input.files).each(function() {
                var reader = new FileReader();
                reader.readAsDataURL(this);
                reader.onload = function(e) {
                    $("#messages-list").append("<li class='text-message-img'><img class='thumb' src='" + e.target.result + "'></li>");
                }
            });
        }
    }
    $('#profile-picture-upload input').click(function readURL(e) {
        if (this.files && this.files[0]) {
            var readerProfile = new FileReader();
            $(readerProfile).load(function(e) {
                $('#profile-picture').attr('src', e.target.result);
            });
            readerProfile.readAsDataURL(this.files[0]);
        }
        $("#profile-picture-upload input").change(readURL);
    });
    $("#show-hide-profile-picture").change(function() {
        if ($(this).is(':checked')) {
            $("#profile-picture").show();
        } else {
            $("#profile-picture").hide();
        }
    });
    $(".download-btn .button").click(function() {
        html2canvas($("#screen"), {
            onrendered: function(canvas) {
            //    document.body.appendChild(canvas);
                $('#img_val').val(canvas.toDataURL("image/png"));
                $("#test").html("<img src='"+canvas.toDataURL("image/png")+"'>");
                console.log("test");
                //iphone-wrap generator-nav generator-inputs
              showimage();
                //
//               var x = ravi;
//               var concat = 'spi src="' +x+ '"spu'
//               'spu src="ravi" devi'
               // document.getElementById("myForm").submit();
            }
        });
   return false; });
   $("#showcanvas").click(showthecanvas);
   function showthecanvas(){
       $('#iphone').show();
                $('#generator-nav').show();
                $('#generator-inputs').show();
                $("#test").hide();
                $("#showcanvas").hide();
   }
   $("#showcanvas").hide();
   function showimage(){
         $('#iphone').hide();
                $('#generator-nav').hide();
                $('#generator-inputs').hide();
                $("#test").show();
                $("#showcanvas").show();
   }
});
/* Well howdily doodily do! */

/* break out of frames */

if (window!= top)
top.location.href=location.href

/*
   navigate the high seas
   http://stackoverflow.com/questions/2259690/how-to-get-the-arrow-keys-on-the-keyboard-to-trigger-navigation-previous-next-p
   must be on a page also linked to this script library http://code.jquery.com/jquery-latest.min.js 
*/

$(document).ready(function() {
    document.onkeydown = function() {
        var j = event.keyIdentifier
        if (j == "Right")
            window.location = nextUrl
        else if (j == "Left")
            window.location = prevUrl
    }
});

$(document).ready(function() {
    var nextPage = $("#next_page")
    var prevPage = $("#prev_page")
    nextUrl = nextPage.attr("href")
    prevUrl = prevPage.attr("href")
});

/* play sound on event */

function playSound(soundfile) {
document.getElementById("dummy").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\">";
}

/* By order of the city of Pittsburgh Chief of Police, I hereby declare this to be an unlawful assembly. I order all those assembled to immediately disperse. You must leave the immediate vicinity. If you remain in this immediate vicinity, you will be in violation of the Pennsylvania crimes code. No matter what your purpose is, you must leave. If you do not disperse, you may be arrested and/or subject to other police action. Other police action may include: actual physical removal, the use of riot control agents and/or less lethal munitions, which could cause risk of injury to those who remain. */

/* No Condition Is Permanent. */
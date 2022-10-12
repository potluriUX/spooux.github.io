/* Global JS Functions */

$(document).ready(function(){
	
// Tabs
	//Hide all panels except #1
	$(".tabGrp .panels .panel").not("#panel_01").hide();

	//Tab click function
	$(".tabGrp .tabs .tab").click(function(){
		$(".panels .panel").hide(); // hide all panels
		$($(this).attr('rel')).show(); // show the panel I want
		$(".tabs .tab").removeClass("active"); // remove .active class from all tabs
		$(this).addClass("active"); // add .active class to this tab
	});
	
// END Tab Functions
	

// Collabsible Panels

	$('.toggleBtn').click(function() { 
    		$($(this).attr('rel')).toggle('300');
			$(this).toggleClass("closed");
		return false;
 		});

// END Collabsible Panel
	
});




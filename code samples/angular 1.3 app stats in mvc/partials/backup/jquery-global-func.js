/* Global JS Functions */

$(document).ready(function(){
	
// Landing Page Functions

	// Toggle hidden panels
	$("#selReport").change(function() {
        $(".editRegion").hide();
        $($('#EDIT_FIELD option:selected').attr('rel')).show();
		$(".saveBtn").show();
    }); 

	// Hide Steps 2 and 3
	$(".rptStep").not("#rptStep1").hide();
	
	// Step 1: After choosing a Report Type, show Step 2
	$("#selReport").change(function() {
		var thisValue = $(this).val();
		if (thisValue != "") {
        	$("#rptStep2").show();
			$(".rptDesc").hide();
			$($('#selReport option:selected').attr('rel')).show();
		} else 
			$(".rptStep").not("#rptStep1").hide();
    }); 
	
	// Step 2
	$("input[name='radioProdFamily']").click(function() {
		$("#rptStep3").show();
		$("#prodListTree .prodSubList").hide();
		$(this).closest("li").find(".prodSubList").show();
	
	});
	
	$("#resetBtn").click(function() {
	    $("#prodListTree").find("input:radio, input:checkbox").removeAttr('checked').removeAttr('selected');
	});
	
	//Step 3
	$("input[name='radioRptLength']").click(function() {
		$("#rptStep4").show();
	});
	
	// Step 4
	$("input[name='radioRptFormat']").click(function() {
		$("#rptStep5").show();
	});
	
	// Step 5
	$("input[name='radioIncludeSites']").click(function() {
		$(".runRptBlock").show();
	});
// END Landing Page Functions
	
	
});


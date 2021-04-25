


<div>
	<div class="topNav1">
		<div class="userLinks"><a href="#">Logout</a></div>
		<div class="welcome">Welcome, {{backenddata.result.customername}} </div>
	</div>
	<div class="header"><div class="helpLink"><a href="#/help">Help</a></div> 
		<div class="hdrLogo"><a href="#"><img src="statsrep5_images/Scholastic-Stats-Rpt-hdr.png" alt="Thunderify Statistical Reporting" width="590" height="41" /></a></div>
	
		<div class="topNav2">
			<div class="navBtn cyan active"><a href="#">Standard <br />
			Reports</a><img class="triangle" src="statsrep5_images/navBtnBg-cyan-on.png" alt="" /></div>
			<div class="navBtn orange"><a href="#">Counter <br />
			Reports</a><img class="triangle" src="statsrep5_images/navBtnBg-orange-on.png" alt="" /></div>
			<div class="navBtn red"><a href="#">Sign Up for <br />
			Monthly <br />Reports</a><img class="triangle" src="statsrep5_images/navBtnBg-red-on.png" alt="" /></div>
			<div class="navBtn green" ng-if='backenddata.result.hasmidtier'><a href="#">Mid-Tier <br />
			Group <br />Reports</a><img class="triangle" src="statsrep5_images/navBtnBg-green-on.png" alt="" /></div>
		<!-- end .topNav2 --></div>
		<br class="clearfloat" />
    <!-- end .header --></div>
</div>


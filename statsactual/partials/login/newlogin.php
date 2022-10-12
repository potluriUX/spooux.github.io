
<body class=""><!--<![endif]-->
<!-- below is the view for login page-->



<div id="loginPg" class="wrapper">
	<div class="header">
		<div class="hdrLogo"><a href="#"><img src="statsrep5_images/Scholastic-Stats-Rpt-hdr.png" alt="Thunderify Statistical Reporting" width="590" height="41" /></a></div>
    <!-- end .header --></div>
	
  <div class="mainContent">
  	<div class="intro">
  		<p><strong>Attention customers:</strong> COUNTER format reports are now available.</p>
  		<p>Upon sign-in, reports formatted as described in the COUNTER Code of Practice
  			for Books and Reference Works are available under the COUNTER reports tab.</p>
  	</div>
	 
	<h2>Welcome to the Stats System! <br />
		Start by entering your user name as dev and password as dev.</h2>
	<form id="form" name='myform' class="form-signin">
		<table class="loginTbl">
			<tr>
				<th scope="row"><label for="username">User Name:</label></th>
				<td><input type="text" ng-model="un" name="username" id="username" />
                                 <div ng-show="un_invalid">*User name Required</div></td>
				<td rowspan="2"><button href="#" class="btn red" id="submit" ng-click='test()'>Login</button></td>
			</tr>
			<tr>
				<th scope="row"><label for="password">Password:</label></th>
				<td><input type="password" name="password" id="password" ng-model="pwd"/>
                                <div ng-show="pwd_invalid">*Password Required</div>
                                <div class='ng-show' ng-show="show_un_or_pwd_error == 1">Wrong Username or Password</div> </td>
			</tr>
		</table>
	</form>
      <div ng-if='loading_gif_image_show'><img class="loading" src="/statsrep5_images/graph-loading-1.gif" width="100" height="65" alt="loading..." /></div>
			
	<p>If you do not have your login credentials please call 6128393202</a> for assistance.</p>
  </div>
    
  <div class="footer">
  	
	<div class="logo"><img src="statsrep5_images/Scholastic.png" width="157" height="19" alt="Devi" /></div>
	<div class="legal">™ & © 2015 @Devi. All Rights Reserved.</div>
	<div class="links"></div>		
	<!-- end .footer --></div>
  <!-- end .wrapper --></div>

</body>

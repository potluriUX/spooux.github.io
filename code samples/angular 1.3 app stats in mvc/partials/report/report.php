<div header></div>
<!--<script type="text/javascript" src="./js/jquery-global-func.js"></script>
 there is so much logic in this template file. 
ng-if and ng-inits have been used all over the place. 

-->
 <div class="mainContent">
   <!--<button ng-click='toggleModal()'>Open Modal Dialog</button>-->
    
   <!--{{loading_image_show}}<!-- VVV imp. two way data binding between directive and controller. 
   info has this variable. info= in modal-dialog
   we keep the same name in directive by saying scope{info:"=info" } then info has the variable. if we chagne info
   then we change loading_image_show which is in controller
   -->
   
     <!--<button ng-click="shared()">asdfasdf</button>-->
<div class="cols3">
	<form id="formRptSelect" name="formRptSelect" method="post" action="">
		<div class="col1">
			<!-- Step 1 -->
			<div class="rptStep" id="rptStep1">
				<div class="stepInstrux step1"> Select the report you wish to view:</div>
				<h4>Report:</h4>
				
			<!--initialize rpt_type to OUS select box selects OUS by default-->		
                        <select name="selReport" id="selReport" ng-model="rpt.rpt_type"  >
					<!--<option value="">Please choose a report type…</option>-->
					
					<option value="OUS"  value="OUS"  rel="#rptDesc02" >Overall Usage Summary</option>
					<option value="DDU"  value="DDU"  rel="#rptDesc03">Detailed Document Usage</option>
					<option value="DSU"  value="DSU" rel="#rptDesc04">Detailed Session Usage</option>
			<!--if getcustomerinfo call says the user has groups then only show this option-->		
                                        <option value="DUBG"  value="DUBG" rel="#rptDesc05" ng-if="backenddata.result.hasgroups">Document Usage by Group</option>
			<!--if getcustomerinfo call says the user has groups then only show this option-->			
                                        <option value="SUBG"  value="SUBG" rel="#rptDesc06" ng-if="backenddata.result.hasgroups">Session Usage by Group</option>
                                        <option value="YOYU" value="YOYU" rel="#rptDesc01">Year Over Year Usage</option>
					<!--<option ng-value="SCUBG" value="SCUBG"  rel="#rptDesc07">Search Usage by Group</option>-->
					</select>
				
				<div class="rptDescWrapper">
			<!--show only when the rpt_type chosen above is YOYU-->			
                                        <div class="rptDesc" id="rptDesc01"  ng-if="rpt.rpt_type == 'YOYU'">
						<div id="sampleRptImg"><img src="statsrep5_images/sample-rpt-bar.png" alt="Sample Report" /></div>
						<p>This report displays On-site, Remote, and Individual Usage for the purpose of comparing usage from one year to another for a selected product.</p>
						</div>
					
			<!--show this div only when rpt_type is OUS-->			<div class="rptDesc" id="rptDesc02" ng-if="rpt.rpt_type == 'OUS'">
						<div id="sampleRptImg"><img src="statsrep5_images/sample-rpt-line.png" alt="Sample Report" /></div>
						<p>This report displays overall site usage for one product. Site usage statistics displayed are Total Documents, Total Sessions, and Total Searches. Ability to sort by Months, Document, Sessions, or Searches is available.</p>
						</div>
					
					<div class="rptDesc" id="rptDesc03" ng-if="rpt.rpt_type == 'DDU'">
						<div id="sampleRptImg"><img src="statsrep5_images/sample-rpt-line.png" alt="Sample Report" /></div>
						<p>This report provides a detailed view of document usage for one product. Document Usage is broken down by On-site, Remote and Individual categories.</p>
						</div>
					
					<div class="rptDesc" id="rptDesc04" ng-if="rpt.rpt_type == 'DSU'">
						<div id="sampleRptImg"><img src="statsrep5_images/sample-rpt-line.png" alt="Sample Report" /></div>
						<p>This report provides a detailed view of document usage for one product. Document Usage is broken down by On-site, Remote and Individual categories.</p>
						</div>
					
					<div class="rptDesc" id="rptDesc05" ng-if="rpt.rpt_type == 'DUBG'">
						<div id="sampleRptImg"><img src="statsrep5_images/sample-rpt-line.png" alt="Sample Report" /></div>
						<p>This report displays Document Usage Statistics by Group, product, and month.</p>
						</div>
					
					<div class="rptDesc" id="rptDesc06" ng-if="rpt.rpt_type == 'SUBG'">
						<div id="sampleRptImg"><img src="statsrep5_images/sample-rpt-line.png" alt="Sample Report" /></div>
						<p>This report displays Session Usage Statistics by Group, product, and month.</p>
						</div>
					
					<div class="rptDesc" id="rptDesc07" ng-if="rpt.rpt_type == 'SCUBG'">
						<div id="sampleRptImg"><img src="statsrep5_images/sample-rpt-line.png" alt="Sample Report" /></div>
						<p>This report displays Document Usage Statistics by Group, product, and month.</p>
						</div>
					<!-- end .rptDesc --></div>
				<!-- end .rptStep--></div>
			<!-- end .col1 --></div>
		
		<div class="col2">
			<!-- Step 2 -->
		<!--show col2 or 2nd step once rpt_type has been selected above-->		
                <div class="rptStep" id="rptStep2" ng-if="rpt.rpt_type">
				<div class="stepInstrux step2"> Select the product for which you wish to view stats data:			</div>
                                <!--<div class="alignRt clearAll"><a id="resetBtn" href="" ng-click="resetprodfamily()">Clear All Selections</a></div>-->
				<div class="prodList">
					<ul id="prodListTree" class="none"><!-- the id #prodListTree is required for jQuery toggle script -->
					
<!--                                            <li
                                               
                                               ng:repeat="(key, product) in backenddata.result.goproducts track by $index " ng-init="$index==0?(rpt.prodfamily=product):(role=false)">
                                               
                                                <label><input type="radio" name="radioProdFamily" 
                                                              ng-value="product" id="radioProdFamily_0"  ng-model="rpt.prodfamily" />
							{{productinfo[product]}}</label>
                                                     </li>-->
 <!--if the user has goproducts then show GO button-->	
 <li ng-if="backenddata.result.goproducts"
                                               
                                              >
                                               
                                                <label><input type="radio" name="radioProdFamily" 
                                                              id="radioProdFamily_0" ng-value="GO" ng-model="rpt.prodfamily"  />
							 GO</label>
                                                     </li>
                   <!--show non go products. if there is no go product then select the first non go product.-->                         <li
                                               
                                               ng:repeat="(key, product) in backenddata.result.products track by $index " ng-init='(($index==0)&&(!backenddata.result.goproducts))?(rpt.prodfamily=product):("")'>
                                               <label><input type="radio" name="radioProdFamily" 
                                                             ng-value="product" id="radioProdFamily_0" ng-model="rpt.prodfamily" />
							{{productinfo[product]}}</label>
                                                     </li>
                                                     
                                                     
                                           
						</ul>
					</div>
				<!-- end .rptStep --></div>
			
			
			<!-- end .col2 --></div>
		<div class="col3" >
			<!-- Step 3 -->
		<!--only once the prodfamily has been selected show this div-->		
                <div class="rptStep" id="rptStep3" ng-if="rpt.prodfamily">
				<div class="stepInstrux step3">Show stats for the previous 15 months starting:			</div>
				
				<table class="formTbl">
					<tr>
						<th scope="row"><label for="fromDate">From: </label><br>Month/Year</th>
						<td><select name="fromDate"  ng-dropdown ng-model="rpt.year"  id="fromDate" 
                                                        ng-options="key as value for (key , value) in backenddata.result.usagedates">
                                                        <!--<option value="" selected="selected">Choose one...</option>-->
							
                                                      
      
         
        </select>
       
                                                      
						</td>
					</tr>
<!--					<tr>
						<th scope="row"><label for="toDate">Month:</label></th>
						<td>
							<select   ng-dropdown ng-model="rpt.month" name="toDate" ng-init="somethingHere = somethingHere "
                                                                id="toDate"  
                                                            ng-options="key as value for (key , value) in backenddata.result.usagedates">
							<option value="" selected="selected">Choose one...</option>
                                                      
      
         
        </select>
       
						</td>
					</tr>-->
				</table>
<!--				<div class="errorMssg">
					No data available.
				</div>-->
				<!-- end .rptStep --></div>
		

			
			<!-- Step 4 -->
                        
			<div class="rptStep" id="rptStep4"  ng-if='(rpt.year && rpt.prodfamily)&&(backenddata.result.hasinstitutionalchildren)'>
                <!--if the dubg or subg which are group reports have NOT been selected in the first dropdown
                those reports show up in dropdown only when there is groups for the user logged in.
                
                -->	            <div  ng-if="(!(rpt.rpt_type == 'DUBG' ||rpt.rpt_type == 'SUBG'))"><div class="stepInstrux step4">
                        <div class="fltrt"><span class="ng-scope ng-binding" tooltip-position="left" headertext="heading" tooltip="This is tool tip"><a href="#"><img src="statsrep5_images/btn-help.png" width="25" height="25" alt="Help" /> this is a tool tip directive</a></span></div>
					Include Individual Site statistics in the report? </div>
				
                    <p>
					<label>
                                            <input type="radio" name="radioIncludeSites" value="yes" id="radioIncludeSites_0"  ng-model='rpt.radioincludesites' ng-init="group_from_posted_data?rpt.radioincludesites=group_from_posted_data:(backenddata.result.hasinstitutionalchildren==true?(rpt.radioincludesites='yes'):(rpt.radioincludesites='no'))"/>
					<!--group_from_posted_data?rpt.radioincludesites=group_from_posted_data:-->	
                                            Yes, include individual sites</label>
					<br />
					<label>
						<input type="radio" name="radioIncludeSites" value="not" id="radioIncludeSites_1"  ng-model='rpt.radioincludesites'>
						No, exclude individual sites</label>
					</p>
				<!-- end .rptStep --></div>
                  <!--if the dubg or subg which are group reports HAVE BEEN selected in the first dropdown
                those reports show up in dropdown only when there is groups for the user logged in.
                
                -->	          <div ng-if="rpt.rpt_type == 'DUBG' ||rpt.rpt_type == 'SUBG'">
                                <div class="stepInstrux step4">
					<div class="fltrt"><a href="#"><img src="statsrep5_images/btn-help.png" width="25" height="25" alt="Help" /></a></div>
					Select the group or site </div>
				<p>
				 <label
                                               
                                               ng:repeat="group in backenddata.result.groups track by $index " ng-init="group2_from_posted_data?rpt.radioincludesites2=group2_from_posted_data:($index==0?(rpt.radioincludesites2=group):(role=false))">
                                     <!--group_from_posted_data?rpt.radioincludesites=group_from_posted_data:-->      
                                     <input type="radio" name="radiogroups" 
                                                             ng-value="group" id="radiogroups_0" ng-model="rpt.radioincludesites2" />
                                               {{group}}<br>
                                                     </label>	
                                   
					</p>
                            </div>
                        </div>
			
			
			<div class="runRptBlock" >
                            <!--ng-if="rpt.radioincludesites"-->
		<!--finally create report will call a service and store the post variables ready to be grabbed by any other controller-->		
<!--                <a id="runRptBtn" href="" ng-click="run()">Create Report</a>-->
                <a id="runRptBtn" href="" ng-click="run2()">Create Dialog</a>
				</div>
			<!-- end .col3 --></div>
		</form>
	<br class="clearfloat" />
	<!-- end .cols3 --></div>
  	<!-- end .content --></div>
<div footer></div>
<!--{{loading_image_show}}--><!--left side variable changes if the info variable is changed in the directive. directive to controller-->
<modal-dialog show='modalShown' width='400px' height='150px' info='loading_image_show'>
       <!-- {{rpt.rpt_type}}-->
      <p><br><br>{{modalcontent}}
          <img ng-if='loading_image_show' class="loading" src="/statsrep5_images/graph-loading-1.gif" 
               width="100" height="65" alt="loading..." /></p>
    </modal-dialog>
<modal-dialoge show='modalShown2' width='400px' height='200px' info2='info'>
    <!--'info' is set in controller  info= is actually the variable in modal.php. 
    it is passed by directive =info-->
         This page is a good example of two way data binding,directives,tooltips,modal-dialogs.

       <!-- {{rpt.rpt_type}}-->
       <p><br><br>this is modaldialog new with transclude<br>
           
           {{modalcontent}}
          
       <a id="runRptBtn" href="" ng-click="run()">Create Report</a>
    </modal-dialoge>

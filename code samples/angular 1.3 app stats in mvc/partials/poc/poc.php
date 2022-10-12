<div header></div>
 <div class="mainContent">
  <div ng-app="StatsApp">
    <div ng-controller="POCController">
        <div class="span12">
            
           Click button to get back the server responser
           
           we pass this array to 
           url: "/inprogress/arraytest.php",
            data: {
               customer:[12345, 'abcde']
               <br>
           <button ng-click="poc()">POC Test</button>
           <br><br>
           
           we get back this array
        {{data}}
        </div>
      
    </div>
</div>
 </div>
<div footer></div>

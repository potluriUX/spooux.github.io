<!-- 
	Developer: Hafiz Faraz Mukhtar
	Blog:  	   http://blog.hfarazm.com/ 
	Contact:   http://www.fb.com/h.farazmukhtar/
	Liscense:  MIT license 2014
-->
<div class="details" ng-model="guitarVariable">
	
		<img class="magnifyImg" ng-src="ang/img/{{guitarVariable[whichGuitar].image}}.jpg" />
			<div>
				<h2> {{guitarVariable[whichGuitar].name | lowercase }}</h2>
				<p class="rightDate magnifyDate">Price Revised on: {{guitarVariable[whichGuitar].dateAdded | date:'MM/yy'}}</p><p class="rightPrice magnifyPrice">${{guitarVariable[whichGuitar].price | number:0 }}</p>
				<p> {{guitarVariable[whichGuitar].description}}</p>
				<p class="longDescription"> {{guitarVariable[whichGuitar].longDescription}}</p>

				<!-- added this navigation for switching between different guitars -->
				<div class="navigation">
					<a href="#/details/{{prevGuitar}}">&lt;&nbsp; Previous</a>
					<a href="#/details/{{nextGuitar}}">Next &nbsp;&gt;</a>
				</div>

				<hr><br />
				<a href="index.html" class="link">&laquo; Go back to Search</a>
				<a href="#/test/{{whichGuitar}}" class="checkout">Checkout &raquo;</a>
			</div>
</div>
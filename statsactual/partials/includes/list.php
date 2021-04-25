<!-- 
	Developer: Hafiz Faraz Mukhtar
	Blog:  	   http://blog.hfarazm.com/ 
	Contact:   http://www.fb.com/h.farazmukhtar/
	Liscense:  MIT license 2014
-->


	<h1>Angular Guitar Store</h1>
	<label>Search Guitar</label>
	<input type="text" ng-model="query1" >
	
	<label>Sort by:
		<select ng-model="orderGuitar">
			<option value="name" selected>Name</option>
			<option value="price">Price</option>
		</select>
	</label>
	<br>
	<label>
		<input type="radio" ng-model="direction" name="direction" checked>
		Ascending
	</label>
	<label>	
		<input type="radio" ng-model="direction" name="direction" value="reverse" >
		Descending
	</label>
	<p>&nbsp;	There are {{guitarVariable.length}} items in data.json file</p>

	
	<ul> 
		<li class="itemHolder" ng-repeat="item in guitarVariable | filter:query1 | orderBy:orderGuitar:direction">
                    <div my-customer></div>
		<a href="#/details/{{guitarVariable.indexOf(item)}}">
		<img ng-src="ang/img/{{item.image}}.jpg">
			<div>
				<h3> {{item.name }}</h3>
				<p class="rightDate">Price Revised on: {{item.dateAdded | date:'MM/yy'}}</p><p class="rightPrice">${{item.price | number:0 }}</p>
				<p> {{item.description}}</p>

			</div>
			</a>
		</li>
	</ul>

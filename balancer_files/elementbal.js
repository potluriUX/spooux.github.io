var ions = true;

function chemistry()
{
        $("#re").text("Balanced Equation");
	setError("");
	var balancedElem = document.getElementById("equ");
	var codeOutElem = document.getElementById("result");
	RM_AllChildren(balancedElem);
	RM_AllChildren(codeOutElem);
	
	// Parse equation
	var eqn;
	
	try
	{
		eqn = eqn_parse(); 
	} catch (e)
	{
		setError("Equation error");
		return;
	}
	
	
	try {
		var matrix = createMatrix(eqn);                // form matrix
		solveEq(matrix);                                // Solve by linear system
		var coefficients = splitCoeffic(matrix);      // select coeffic
		checkAnswer(eqn, coefficients);                      // test answers.
		balancedElem.appendChild(eqn.toHtml(coefficients));  // output bal-equation
	} catch (e)
	{
		setError(e.toString());
	}
}



function eqn_parse() {
	var input =$("#input").val();
	var token = new Tnizer(input);
	return pEquation(token);
}


function setError(str)
{
  $("#message").text(str);
}


function Tnizer(stri)
{
	var posi = 0;
	this.position = function()
	{
		return posi;
	}
	
	this.peek = function()
	{
		if (posi == stri.length)
			return null;      // End of stream
		
		var match = /^([A-Za-z][a-z]*|[0-9]+| +|[+\-^=()])/.exec(stri.substring(posi));
		if (match == null)
			throw {errormsg: "Invalid symbol ", start: posi};
		      
		
		var token = match[0];
		if (/^ +$/.test(token))
		{  					// jump whitespace token
			posi += token.length;
			token = this.peek();  		// Return next token
		}
		return token;
	}
	
	this.take = function()
	{
		var result = this.peek();
		posi += result.length;
		return result;
	}
}


function pEquation(tokstr)
{
	var lside = [];
	var rside = [];
	
	lside.push(parseTerm(tokstr));
	while (true)
	{
		var nextstr = tokstr.peek();
		if (nextstr == "=")
			break;
		if (nextstr == null)
			throw {errormsg: "Plus or equal sign expected", start: tokstr.position()};
		if (nextstr != "+")
			throw {errormsg: "Plus expected", start: tokstr.position()};
		tokstr.take();  
		lside.push(parseTerm(tokstr));
	}
	
	if (tokstr.take() != "=")
		throw "Assertion error";
	
	rside.push(parseTerm(tokstr));
	while (true)
	{
		var nextstr = tokstr.peek();
		if (nextstr == null)
			break;
		if (nextstr != "+")
			throw {errormsg: "Plus expected", start: tokstr.position()};
		tokstr.take();  
		rside.push(parseTerm(tokstr));
	}
	
	return new EquationFun(lside, rside);
}


function parseTerm(tokstr)
{
	var startPosition = tokstr.position();	
	var items_array = [];
	while (true)
	{
		var nextstr = tokstr.peek();
		if (nextstr == null)
			break;
		else if (nextstr == "(")
			items_array.push(parseGroup(tokstr));
		else if (/^[A-Za-z][a-z]*$/.test(nextstr))
			items_array.push(parseElement(tokstr));
		else
			break;
	}
	
	var charge = 0;
	var nextstr = tokstr.peek();
	if (nextstr != null && nextstr == "^")
	{
		tokstr.take();  
		nextstr = tokstr.peek();
		if (nextstr == null)
			throw {errormsg: "Number or sign expected", start: tokstr.position()};
		else if (/^[0-9]+$/.test(nextstr)) {
			charge = checkedParseInt(nextstr, 10);
			tokstr.take();  
			nextstr = tokstr.peek();
		} else
			charge = 1;
		
		if (nextstr == null)
			throw {errormsg: "Sign expected", start: tokstr.position()};
		else if (nextstr == "+");  
		else if (nextstr == "-")
			charge = -charge;
		else
			throw {errormsg: "Sign expected", start: tokstr.position()};
		tokstr.take();  
	}
	
	var elements = new Set();
	for (var i = 0; i < items_array.length; i++)
		items_array[i].getElements(elements);
	elements = elements.toArray();  
	if (items_array.length == 0) {
		throw {errormsg: "Invalid term ", start: startPosition, end: tokstr.position()};
	} else if (indexOf(elements, "e") != -1) {  
		if (items_array.length > 1 || charge != 0 && charge != -1)
			throw {errormsg: "Invalid term ", start: startPosition, end: tokstr.position()};
		items_array = [];
		charge = -1;
	} else {  
		for (var i = 0; i < elements.length; i++) {
			if (/^[a-z]+$/.test(elements[i]))
				throw {errormsg: "Invalid element "+elements[i],start: startPosition, end: tokstr.position()};
		}
	}
	
	return new checkTerm(items_array, charge);
}







function createMatrix(eqn)
{
	var elements = eqn.getElements(); 
	var m_rows = elements.length + 1;
	var M_cols = eqn.getLeftSide().length + eqn.getRightSide().length + 1;
	var matrix = new Matrix(m_rows, M_cols);
	for (var i = 0; i < elements.length; i++) {
		var j = 0;
		for (var k = 0, lside = eqn.getLeftSide() ; k < lside.length; j++, k++)
			matrix.set(i, j,  lside[k].countElement(elements[i]));
		for (var k = 0, rside = eqn.getRightSide(); k < rside.length; j++, k++)
			matrix.set(i, j, -rside[k].countElement(elements[i]));
	}
	return matrix;
}


function solveEq(matrix)
      {
	matrix.GJ_Eliminate();
	var i;
	for (i = 0; i < matrix.rowCount() - 1; i++) {
		if (CNZeroCoeffs(matrix, i) > 1)
			break;
	}
	if (i == matrix.rowCount() - 1)
		throw "Element combination incorrect"; 
	
	matrix.set(matrix.rowCount() - 1, i, 1);
	matrix.set(matrix.rowCount() - 1, matrix.columnCount() - 1, 1);
	
	matrix.GJ_Eliminate();
}


function CNZeroCoeffs(matrix, row) {
	var count = 0;
	for (var i = 0; i < matrix.columnCount(); i++) {
		if (matrix.get(row, i) != 0)
			count++;
	}
	return count;
}


function splitCoeffic(matrix) {
	var m_rows = matrix.rowCount();
	var M_cols = matrix.columnCount();
	
	if (M_cols - 1 > m_rows || matrix.get(M_cols - 2, M_cols - 2) == 0)
		throw "No unique solution";
	
	var lcm = 1;
	for (var i = 0; i < M_cols - 1; i++)
		lcm = checkedMultiply(lcm / gcd(lcm, matrix.get(i, i)), matrix.get(i, i));
	
	var coefficients = [];
	var allzero = true;
	for (var i = 0; i < M_cols - 1; i++) {
		var coef = checkedMultiply(lcm / matrix.get(i, i), matrix.get(i, M_cols - 1));
		coefficients.push(coef);
		allzero &= coef == 0;
	}
	if (allzero)
		throw "Assertion error: All zero solution";
	return coefficients;
}


function checkAnswer(eqn, coefficients) {
	if (coefficients.length != eqn.getLeftSide().length + eqn.getRightSide().length)
		throw "Assertion error: Mismatched length";
	
	var allzero = true;
	for (var i = 0; i < coefficients.length; i++) {
		var coef = coefficients[i];
		if (typeof coef != "number" || isNaN(coef) || Math.floor(coef) != coef)
			throw "Assertion error: Not an integer";
		allzero &= coef == 0;
	}
	if (allzero)
		throw "Assertion error: Solution of all zeros";
	
	var elements = eqn.getElements();
	for (var i = 0; i < elements.length; i++) {
		var sum = 0;
		var j = 0;
		for (var k = 0, lside = eqn.getLeftSide() ; k < lside.length; j++, k++)
			sum = checkedAdd(sum, checkedMultiply(lside[k].countElement(elements[i]),  coefficients[j]));
		for (var k = 0, rside = eqn.getRightSide(); k < rside.length; j++, k++)
			sum = checkedAdd(sum, checkedMultiply(rside[k].countElement(elements[i]), -coefficients[j]));
		if (sum != 0)
			throw "Assertion error: Balance failed";
	}
}


function EquationFun(lside, rside)
   {
	lside = copyArray(lside);
	rside = copyArray(rside);
	
	this.getLeftSide  = function() { return copyArray(lside); }
	this.getRightSide = function() { return copyArray(rside); }
	
	this.getElements = function()
	{
		var result = new Set();
		for (var i = 0; i < lside.length; i++)
			lside[i].getElements(result);
		for (var i = 0; i < rside.length; i++)
			rside[i].getElements(result);
		return result.toArray();
	}
	
	this.toHtml = function(coefficients)
	{
		if (coefficients !== undefined && coefficients.length != lside.length + rside.length)
			throw "Mismatched number of coefficients";
		var node = document.createElement("span");
		var initial = true;
		for (var i = 0; i < lside.length; i++) {
			var coef = coefficients !== undefined ? coefficients[i] : 1;
			if (coef != 0) {
			if (initial) initial = false;
			else node.appendChild(document.createTextNode(" + "));
				if (coef != 1)
				{
					var disp = document.createElement("span");
					disp.setAttribute("style","font-weight:bold;color:blue;");
					disp.appendChild(document.createTextNode(coef.toString().replace(/-/, MINUS)));
					node.appendChild(disp);
				}
					
				node.appendChild(lside[i].toHtml());
			}
		}
		
		var disp = document.createElement("span");
		disp.setAttribute("style","font-weight:bold;color:green;font-size:30px;");
		disp.appendChild(document.createTextNode(" \u2192 "));
		node.appendChild(disp);
		
		initial = true;
		for (var i = 0; i < rside.length; i++) {
			var coef = coefficients !== undefined ? coefficients[lside.length + i] : 1;
			if (coef != 0) {
			if (initial) initial = false;
			else node.appendChild(document.createTextNode(" + "));
				if (coef != 1)
				{
					var disp = document.createElement("span");
					disp.setAttribute("style","font-weight:bold;color:blue;");
					disp.appendChild(document.createTextNode(coef.toString().replace(/-/, MINUS)));
					node.appendChild(disp);
				}
				node.appendChild(rside[i].toHtml());
			}
		}
		return node;
	}
}

function checkTerm(items_array, charge)
{

      if(charge!=0)
      {
	ions = false;
      }
    
      if(ions==false && charge!=0)
      {
	throw "Invalid term, Elements without Ions";
      }
  
	if (items_array.length == 0 && charge != -1)
		throw "Invalid term ";
	items_array = copyArray(items_array);
	
	this.getItems = function() { return copyArray(items_array); }
	
	this.getElements = function(result) {
		result.add("e");
		for (var i = 0; i < items_array.length; i++)
			items_array[i].getElements(result);
	}
	
	this.countElement = function(name) {
		if (name == "e") {
			return -charge;
		} else {
			var sum = 0;
			for (var i = 0; i < items_array.length; i++)
				sum = checkedAdd(sum, items_array[i].countElement(name));
			return sum;
		}
	}
	
	this.toHtml = function() {
		var node = document.createElement("span");
		if (items_array.length == 0 && charge == -1) {
			node.appendChild(document.createTextNode("e"));
			var sup = document.createElement("sup");
			sup.appendChild(document.createTextNode(MINUS));
			node.appendChild(sup);
		} else {
			for (var i = 0; i < items_array.length; i++)
				node.appendChild(items_array[i].toHtml());
			if (charge != 0) {
				var sup = document.createElement("sup");
				var s;
				if (Math.abs(charge) == 1) s = "";
				else s = Math.abs(charge).toString();
				if (charge > 0) s += "+";
				else s += MINUS;
				sup.appendChild(document.createTextNode(s));
				node.appendChild(sup);
			}
		}
		return node;
	}
}

function Group(items_array, count) {
	if (count < 1)
		throw "Count must be a positive integer";
	items_array = copyArray(items_array);
	
	this.getItems = function() { return copyArray(items_array); }
	
	this.getCount = function() { return count; }
	
	this.getElements = function(result) {
		for (var i = 0; i < items_array.length; i++)
			items_array[i].getElements(result);
	}
	
	this.countElement = function(name) {
		var sum = 0;
		for (var i = 0; i < items_array.length; i++)
			sum = checkedAdd(sum, checkedMultiply(items_array[i].countElement(name), count));
		return sum;
	}
	
	this.toHtml = function() {
		var node = document.createElement("span");
		node.appendChild(document.createTextNode("("));
		for (var i = 0; i < items_array.length; i++)
			node.appendChild(items_array[i].toHtml());
		node.appendChild(document.createTextNode(")"));
		if (count != 1) {
			var sub = document.createElement("sub");
			sub.appendChild(document.createTextNode(count.toString()));
			node.appendChild(sub);
		}
		return node;
	}
}

function Element(name, count) {
	if (count < 1)
		throw "Count must be a positive integer";
	
	this.getName = function() { return name; }
	
	this.getCount = function() { return count; }
	
	this.getElements = function(result) { result.add(name); }
	
	this.countElement = function(n) { return n == name ? count : 0; }
	
	this.toHtml = function() {
		var node = document.createElement("span");
		node.appendChild(document.createTextNode(name));
		if (count != 1) {
			var sub = document.createElement("sub");
			sub.appendChild(document.createTextNode(count.toString()));
			node.appendChild(sub);
		}
		return node;
	}
}



function parseGroup(tokstr) {
	if (tokstr.take() != "(")
		throw "Assertion error";
	
	var items_array = [];
	while (true) {
		var nextstr = tokstr.peek();
		if (nextstr == null)
			throw {errormsg: "Element, group, or closing parenthesis expected", start: tokstr.position()};
		else if (nextstr == "(")
			items_array.push(parseGroup(tokstr));
		else if (/^[A-Za-z][a-z]*$/.test(nextstr))
			items_array.push(parseElement(tokstr));
		else if (nextstr == ")")
			break;
		else
			throw {errormsg: "Element, group, or closing parenthesis expected", start: tokstr.position()};
	}
	
	if (tokstr.take() != ")")
		throw "Assertion error";
	
	return new Group(items_array, parseCount(tokstr));
}


function parseElement(tokstr) {
	var name = tokstr.take();
	if (!/^[A-Za-z][a-z]*$/.test(name))
		throw "Assertion error";
	return new Element(name, parseCount(tokstr));
}

function parseCount(tokstr) {
	var nextstr = tokstr.peek();
	if (nextstr != null && /^[0-9]+$/.test(nextstr))
		return checkedParseInt(tokstr.take(), 10);
	else
		return 1;
}

function Matrix(m_rows, M_cols)
{
	var cells = [];
	for (var i = 0; i < m_rows; i++) {
		var row = [];
		for (var j = 0; j < M_cols; j++)
			row.push(0);
		cells.push(row);
	}
	
	this.rowCount = function() { return m_rows; }
	this.columnCount = function() { return M_cols; }
	
	this.get = function(r, c) {
		if (r < 0 || r >= m_rows || c < 0 || c >= M_cols)
			throw "Index out of bounds";
		return cells[r][c];
	}
	
	this.set = function(r, c, val) {
		if (r < 0 || r >= m_rows || c < 0 || c >= M_cols)
			throw "Index out of bounds";
		cells[r][c] = val;
	}
	
	function swapRows(i, j) {
		if (i < 0 || i >= m_rows || j < 0 || j >= m_rows)
			throw "Index out of bounds";
		var temp = cells[i];
		cells[i] = cells[j];
		cells[j] = temp;
	}
	
	function AdditionRows(x, y) {
		var z = copyArray(x);
		for (var i = 0; i < z.length; i++)
			z[i] = checkedAdd(x[i], y[i]);
		return z;
	}
	
	function multiplyRow(x, c) {
		var y = copyArray(x);
		for (var i = 0; i < y.length; i++)
			y[i] = checkedMultiply(x[i], c);
		return y;
	}
	
	function gcdRow(x) {
		var result = 0;
		for (var i = 0; i < x.length; i++)
			result = gcd(x[i], result);
		return result;
	}
	
	function simplifyRow(x)
	{
		var sign = 0;
		for (var i = 0; i < x.length; i++) {
			if (x[i] > 0) {
				sign = 1;
				break;
			} else if (x[i] < 0) {
				sign = -1;
				break;
			}
		}
		var y = copyArray(x);
		if (sign == 0)
			return y;
		var g = gcdRow(x) * sign;
		for (var i = 0; i < y.length; i++)
			y[i] /= g;
		return y;
	}
	
	this.GJ_Eliminate = function()
	{
		for (var i = 0; i < m_rows; i++)
			cells[i] = simplifyRow(cells[i]);
		
		var numPivots = 0;
		for (var i = 0; i < M_cols; i++)
		{
			var pivotRow = numPivots;
			while (pivotRow < m_rows && cells[pivotRow][i] == 0)
				pivotRow++;
			if (pivotRow == m_rows)
				continue;
			var pivot = cells[pivotRow][i];
			swapRows(numPivots, pivotRow);
			numPivots++;
		      
			for (var j = numPivots; j < m_rows; j++) {
				var g = gcd(pivot, cells[j][i]);
				cells[j] = simplifyRow(AdditionRows(multiplyRow(cells[j], pivot / g), multiplyRow(cells[i], -cells[j][i] / g)));
			}
		}
		
		for (var i = m_rows - 1; i >= 0; i--) {
			// Find pivot
			var pivotCol = 0;
			while (pivotCol < M_cols && cells[i][pivotCol] == 0)
				pivotCol++;
			if (pivotCol == M_cols)
				continue;
			var pivot = cells[i][pivotCol];
			
			for (var j = i - 1; j >= 0; j--) {
				var g = gcd(pivot, cells[j][pivotCol]);
				cells[j] = simplifyRow(AdditionRows(multiplyRow(cells[j], pivot / g), multiplyRow(cells[i], -cells[j][pivotCol] / g)));
			}
		}
	}
	
	this.toString = function() {
		var result = "[";
		for (var i = 0; i < m_rows; i++) {
			if (i != 0) result += "],\n";
			result += "[";
			for (var j = 0; j < M_cols; j++) {
				if (j != 0) result += ", ";
				result += cells[i][j];
			}
			result += "]";
		}
		return result + "]";
	}
}

function Set() {
	var items_array = [];
	this.add = function(obj) { if (indexOf(items_array, obj) == -1) items_array.push(obj); }
	this.contains = function(obj) { return items_array.indexOf(obj) != -1; }
	this.toArray = function() { return copyArray(items_array); }
}

var NBSP  = "\u00A0";  // No-break space
var MINUS = "\u2212";  // Minus sign


var INT_MAX = 9007199254740992;  // 2^53

function checkedParseInt(str) {
	var result = parseInt(str, 10);
	if (isNaN(result))
		throw "Not a number";
	if (result <= -INT_MAX || result >= INT_MAX)
		throw "Arithmetic overflow";
	return result;
}

function checkedAdd(x, y) {
	var z = x + y;
	if (z <= -INT_MAX || z >= INT_MAX)
		throw "Arithmetic overflow";
	return z;
}

function checkedMultiply(x, y) {
	var z = x * y;
	if (z <= -INT_MAX || z >= INT_MAX)
		throw "Arithmetic overflow";
	return z;
}


function gcd(x, y) {
	if (typeof x != "number" || typeof y != "number" || isNaN(x) || isNaN(y))
		throw "Invalid argument ";
	x = Math.abs(x);
	y = Math.abs(y);
	while (y != 0) {
		var z = x % y;
		x = y;
		y = z;
	}
	return x;
}


function indexOf(array, item)
{
	for (var i = 0; i < array.length; i++) {
		if (array[i] == item)
			return i;
	}
	return -1;
}


function copyArray(array) {
	return array.slice(0);
}

function RM_AllChildren(node) {
	while (node.childNodes.length > 0)
		node.removeChild(node.firstChild);
}


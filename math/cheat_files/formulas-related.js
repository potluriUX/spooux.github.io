
window.onload = function()
{
	implementCookies();
};


function showHideCHoptions()
{
	panel = document.getElementById('CHpanel');
	trigger = document.getElementById('CHtrigger');
	if(panel.style.display === "none" || panel.style.display === "")
	{
		trigger.style.width = "215px";
		trigger.style.textAlign = "left";
		trigger.style.padding = "15px 0px 15px 10px";
		jQuery('#CHpanel').fadeIn(600);
		
	}
	else
	{
		jQuery('#CHpanel').fadeOut(600);
		trigger.style.width = "55px";
		trigger.style.textAlign = "center";
		trigger.style.padding = "5px";
	}
}
function toggleFormuluOver(e)
{
	if (e.style.backgroundPosition.localeCompare('0% 0%') === 0 || e.style.backgroundPosition.localeCompare('') === 0)
	{
		e.style.backgroundPosition = '0% 50%';
	}

}
function toggleFormuluOut(e)
{
	if (e.style.backgroundPosition.localeCompare('0% 50%') === 0)
	{
		e.style.backgroundPosition = '0% 0%';
	}
}
function toggleFormulu(e, id)
{
	arr = document.location.href.split('/');
	fileName = arr[arr.length - 1];

	test1 = e.style.backgroundPosition;
	val = document.getElementById(id);
	numSelectedObj = document.getElementById('numFormulas');
	tekstUlinkuObj = document.getElementById(fileName);
	numSelected = parseFloat(numSelectedObj.innerHTML);

	// kliknuo na normalnu sliku
	if (test1 === '0% 0%' || test1 === '0% 50%' || test1 === '')
	{
		e.style.backgroundPosition = "0% 100%";
		val.value = 1;
		c_name = fileName + '-' + id;
		document.cookie = c_name + "=" + 1 + "; path=/";
		numSelected = numSelected + 1;

		if (tekstUlinkuObj.innerHTML === "")
		{
			tekstUlinkuObj.innerHTML = "(1)";
		}
		else
		{
			tekstUlinku = parseFloat(tekstUlinkuObj.innerHTML.substring(1, tekstUlinkuObj.innerHTML.length - 1));
			tekstUlinku = tekstUlinku + 1;
			tekstUlinkuObj.innerHTML = '(' + tekstUlinku + ')';
		}

	}
	else
	{
		e.style.backgroundPosition = "0% 0%";
		val.value = 0;
		deleteCookie(fileName + '-' + id);
		numSelected = numSelected - 1;

		if (tekstUlinkuObj.innerHTML === "(1)")
		{
			tekstUlinkuObj.innerHTML = "";
		}
		else
		{
			tekstUlinku = parseFloat(tekstUlinkuObj.innerHTML.substring(1, tekstUlinkuObj.innerHTML.length - 1));
			tekstUlinku = tekstUlinku - 1;
			tekstUlinkuObj.innerHTML = '(' + tekstUlinku + ')';
		}
	}
	numSelectedObj.innerHTML = numSelected;
}

function selectDeselctAllOnPage(selektuj)
{
	var tekuciInd = 1;
	var tekuciID = "F01";
	while (document.getElementById(tekuciID + 'Div'))
	{
		el = document.getElementById(tekuciID + 'Div');
		if ((el.style.backgroundPosition.localeCompare('0% 0%')===0 || el.style.backgroundPosition.localeCompare('')=== 0) && selektuj === 1)
		{
			toggleFormulu(el, tekuciID);
		}
		if (el.style.backgroundPosition.localeCompare('0% 100%') === 0 && selektuj === 0)
		{
			toggleFormulu(el, tekuciID);
		}
		tekuciInd = tekuciInd + 1;
		if (tekuciInd < 10)
		{
			tekuciID = "F0" + tekuciInd;
		}
		else
		{
			tekuciID = "F" + tekuciInd;
		}
	}
}
function deleteCookie(cookie_name)
{
	createCookie(cookie_name, "", -1);
}

// ovo sluzi samo za brisanje
function createCookie(name, value, days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else
	{
		expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}



function deleteAllCookies()
{
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++)
	{
		if (cookies[i].indexOf(".php") != -1)
		{
			var spcook = cookies[i].split("=");
			deleteCookie(spcook[0]);
		}
	}
	window.location = "";
}

function getCookie(c_name)
{
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++)
	{
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name)
		{
			return unescape(y);
		}
	}
	return "";
}

function implementCookies()
{
	var i, name, value, arrName;
	var ARRcookies = document.cookie.split(";");

	// nadji ime fajla
	arr = document.location.href.split('/');
	fileName = arr[arr.length - 1];

	// podesi broj selektovanih formula
	numSelectedObj = document.getElementById('numFormulas');
	var cookies = document.cookie.split(";");
	numSelected = 0;
	for (i = 0; i < cookies.length; i++)
	{
		if (cookies[i].indexOf(".php") !== -1)
		{
			numSelected = numSelected + 1;
		}
	}
	numSelectedObj.innerHTML = numSelected;

	// postavi value u input boxu i sliku
	for (i = 0; i < ARRcookies.length; i++)
	{
		name = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		value = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		arrName = name.split("-"); // arrName (ime fajla, imageStance???)
		arrName[0] = arrName[0].replace(/^\s+|\s+$/g, ""); //zakrpa !? - 

		if (document.getElementById(arrName[1]) && value === "1" && fileName === arrName[0])
		{
			document.getElementById(arrName[1]).value = 1;
			document.getElementById(arrName[1] + "Div").style.backgroundPosition = "0% 100%";
		}
	}

	// prebroj koliko ima selektovanih u svakom fajlu i smesti ih u associjativni niz
	var brojSelektovanih = new Array();
	for (i = 0; i < ARRcookies.length; i++)
	{
		name = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		arrName = name.split("-");
		imeFajla = arrName[0].replace(/^\s+|\s+$/g, "");
		if (isNaN(brojSelektovanih[imeFajla]))
		{
			brojSelektovanih[imeFajla] = 1;
		}
		else
		{
			brojSelektovanih[imeFajla] = brojSelektovanih[imeFajla] + 1;
		}
	}
	// ubaca broj selektovanih
	for (key in brojSelektovanih)
	{
		if (document.getElementById(key))
		{
			document.getElementById(key).innerHTML = '(' + brojSelektovanih[key] + ')';
		}
	}
}

function submitGeneratePHP()
{
	numFormulas = parseFloat(document.getElementById("numFormulas").innerHTML);
	
	if (numFormulas === 0)
	{
		alert("ERROR: To generate cheat sheet, you need to select at least one formula.");
		return false;
	}
	if (numFormulas > 70)
	{
		alert("ERROR: Please, slect no more than 70 formulas.");
		return false;
	}
	document.getElementById('sadrzajKuki').value = document.cookie;
	return true;
}
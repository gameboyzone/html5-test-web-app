/***************************************************************************/
/*************************** Home-Page Script ******************************/
/***************************************************************************/


function BlockMove(event)
{
    // Tell Safari not to move the window.
    //Use this if its a single screen, single page App

    //event.preventDefault();
}

function checkGeolocation()
{
	alert("Geolocation function entered.");
	
	if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(function (position) 
        {	
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            
            alert('Coords: ' + lat + ',' + long);
        });
    }
    else 
    {
        alert("Sorry! Your browser does not support HTML5 Geolocation.");
    }
}

function makeAJAXCall()
{
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.onreadystatechange = function()
	{	
		if(xmlhttp.readyState == 4)
		{
			alert(xmlhttp.responseText);
		}
	};
	
	xmlhttp.open("GET","data.txt",true);
	xmlhttp.send();
}

function serverSentEvents()
{
	if (typeof (EventSource) !== "undefined") 
    {   
        var source = new EventSource('advertiser.php');
        
        source.onmessage = function (event) 
        {
            $("#sseMessage").html(event.data);
        };
    }
    else
    {
	    $("#sseMessage").html("HTML5 Server-Side Events not supported!");
    }
}

/******************** Drag and Drop *******************/

function allowDrop(ev) 
{
    ev.preventDefault();
}

function drag(ev) 
{
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) 
{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}

/******************* Web Workers *********************/

var w;

function startWorker()
{
    if (typeof (Worker) != "undefined")
    {
        if (typeof (w) == "undefined")
        {
            w = new Worker("./js/demo_workers.js");
        }

        w.onmessage = function (event)
        {
            document.getElementById("result").innerHTML = event.data;
        };
    }
    else
    {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers!";
    }
}

function stopWorker()
{
    w.terminate();
}

/**************** Canvas *******************/

function initCanvas()
{
	var ctx = document.getElementById('paint_area').getContext('2d');
	
	ctx.fillStyle = '#cc3300';
	ctx.fillRect(0,0,200,200);
	
	//Draw Circle
	var img_buffer = document.createElement('img');
	img_buffer.src = './img/normal_plus.png';
	img_buffer.onload = function() { ctx.drawImage(img_buffer,150,20,20,20); }
	
	//Draw Line
	ctx.beginPath();
	ctx.moveTo(50, 50);
	ctx.lineTo(50, 150);
	ctx.closePath();
	ctx.stroke();
	
	//Draw Cicle - arc(x, y, radius, startAngle, endAngle, anticlockwise)
	ctx.beginPath();
	ctx.arc(75,75,50,0,Math.PI*2,true);
	ctx.closePath();
	ctx.stroke();
}

/*************** Application Cache ***************/

function checkAppCache()
{
	if(window.applicationCache)
	{
		var appCache = window.applicationCache;
		
		switch (appCache.status) 
		{
			case appCache.UNCACHED: // UNCACHED == 0
				alert('UNCACHED');
				break;
			case appCache.IDLE: // IDLE == 1
				alert('IDLE');
				break;
			case appCache.CHECKING: // CHECKING == 2
				alert('CHECKING');
				break;
			case appCache.DOWNLOADING: // DOWNLOADING == 3
				alert('DOWNLOADING');
				break;
			case appCache.UPDATEREADY:  // UPDATEREADY == 4
				alert('UPDATEREADY');
				
				// Browser downloaded a new app cache.
				// Swap it in and reload the page to get the new hotness.
				window.applicationCache.swapCache();
				
				if (confirm('A new version of this site is available. Load it?')) 
				{
					window.location.reload();
				}
			case appCache.OBSOLETE: // OBSOLETE == 5
				alert('OBSOLETE');
				break;
			default:
				alert('UKNOWN CACHE STATUS');
				break;
		};	
	}
	else
	{
		alert("Sorry, Application Cache is not supported on your device!");
	}
}
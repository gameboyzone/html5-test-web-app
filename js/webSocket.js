/* 
    Web Socket Example from http://www.websocket.org/echo.html
*/

var wsUri = "ws://echo.websocket.org/";
var output;

window.addEventListener("load", init, false);

function init()
{
    output = document.getElementById("output");
    openWebSocket();
}

function openWebSocket()
{
    if ("WebSocket" in window)
    {
        websocket = new WebSocket(wsUri);
        websocket.onopen = function (evt) { onOpen(evt); };
        websocket.onclose = function (evt) { onClose(evt); };
        websocket.onmessage = function (evt) { onMessage(evt); };
        websocket.onerror = function (evt) { onError(evt); };
    }
    else
    {
        output.innerHTML = "<p>Web Sockets is not supported in your browser!</p>";
    }
}

/***** Hardik Custom Functions *****/

function closeConnection() 
{
    websocket.close();
}

function sendMessage(msg) 
{
    if ("WebSocket" in window) 
    {
        doSend(msg);
    }
    else 
    {
        output.innerHTML = "<p>Web Sockets is not supported in your browser!</p>";
    }
}

/***********************************/

function onOpen(evt) 
{
    writeToScreen("CONNECTED");
    //doSend("Hello world!");
}

function onClose(evt) 
{
    writeToScreen("DISCONNECTED");
}

function onMessage(evt) 
{
    writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
    //websocket.close();
}

function onError(evt) 
{
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message) 
{
    writeToScreen("SENT: " + message);
    websocket.send(message);
}

function writeToScreen(message) 
{
    var pre = document.createElement("p");

    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}

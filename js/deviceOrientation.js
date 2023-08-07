/******* Script for Device Orientation ******/


var count = 0;

init3();

function init3()
{
    if (window.DeviceOrientationEvent)
    {
        document.getElementById("doEvent").innerHTML = "DeviceOrientation";

        window.addEventListener('deviceorientation', function (eventData) 
        {
            var tiltLR = eventData.gamma;
            var tiltFB = eventData.beta;
            var dir = eventData.alpha
            var motUD = null; deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
        }, false);
    }
    else if (window.OrientationEvent)                //For Mozilla Firefox
    {
        document.getElementById("doEvent").innerHTML = "MozOrientation";

        window.addEventListener('MozOrientation', function (eventData) 
        {
            var tiltLR = eventData.x * 90;
            var tiltFB = eventData.y * -90;
            var dir = null;
            var motUD = eventData.z;
            deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
        }, false);
    }
    else 
    {
        document.getElementById("doEvent").innerHTML = "DeviceOrientation not supported on your device!"
    }
}

function deviceOrientationHandler(tiltLR, tiltFB, dir, motionUD)
{
    document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
    document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
    document.getElementById("doDirection").innerHTML = Math.round(dir);
    document.getElementById("doMotionUD").innerHTML = motionUD;

    document.getElementById("imgLogo").style.webkitTransform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
    document.getElementById("imgLogo").style.MozTransform = "rotate(" + tiltLR + "deg)";
    document.getElementById("imgLogo").style.transform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
}
/******* Script for Device Orientation ******/


init2();

function init2()
{
    if ((window.DeviceMotionEvent) || ('listenForDeviceMovement' in window))
    {
        window.addEventListener('devicemotion', deviceMotionHandler3, false);
    }
    else
    {
        document.getElementById("dmEvent").innerHTML = "DeviceMotion not supported on your device!"
    }
}

function deviceMotionHandler3(eventData)
{
    var acceleration = eventData.accelerationIncludingGravity;
    var rawAcceleration = "[" + Math.round(acceleration.x) + ", " + Math.round(acceleration.y) + ", " + Math.round(acceleration.z) + "]";
    var facingUp = -1;

    if (acceleration.z > 0)
    {
        facingUp = +1;
    }

    var tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
    var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);

    document.getElementById("moAccel").innerHTML = rawAcceleration;
    document.getElementById("moCalcTiltLR").innerHTML = tiltLR;
    document.getElementById("moCalcTiltFB").innerHTML = tiltFB;

    var rotation = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB) + "deg)";
    document.getElementById("imgLogo2").style.webkitTransform = rotation;
}
function realTimeClock() {
    let rtClock = new Date();

    let hours = rtClock.getHours();
    let minutes = rtClock.getMinutes();
    let seconds = rtClock.getSeconds();

    // AM PM
    let amPm = (hours < 12) ? "AM" : "PM"

    // 12 hour format
    hours = (hours > 12) ? hours - 12 : hours;

    // Add zeros in front of hours minutes seconds
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);

    // Display
    document.getElementById('clock').innerHTML = hours + " : " + minutes + " : " + seconds + " " + amPm;

    setTimeout(realTimeClock, 1000);
}

    // Set background and greeting 
function setBackground () {    

    let today = new Date ();
    let hour = today.getHours();

    if(hour < 12) {
        // morning
        document.body.style.backgroundColor = ''
    } else if (hour < 18) {
        // afternoon
        document.body.style.backgroundColor = '';
    } else {
        // evening
        document.body.style.backgroundColor = ''
    }
}
    // run

    realTimeClock();
    setBackground ();
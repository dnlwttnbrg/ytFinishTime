var duration = document.getElementsByClassName("ytp-time-duration")[0] //get duration of the video

observer = new MutationObserver(function(mutationsList, observer) {
    var speed = document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate
    var seconds = (hmsToSeconds(duration.innerHTML)) - (hmsToSeconds(current.innerHTML))
    var newTime = addSeconds(seconds / parseInt(speed))
    tag.innerHTML = newTime.toLocaleTimeString()
});

if(duration != undefined){
    var current = document.getElementsByClassName("ytp-time-current")[0] //get curent time of the video

    //create new span to hold time data
    var tag = document.createElement("span")
    tag.style.marginLeft = "5px"
    tag.setAttribute("id", "finichedAtTime")

    var timeDisplay = document.getElementsByClassName("ytp-time-display")[0] //get time container to add new time to

    timeDisplay.appendChild(tag)
    observer.observe(current, {characterData: false, childList: true, attributes: false});
}

//observes changes in current time


//Converts hh:mm:ss to seconds
function hmsToSeconds(input){
    var a = input.split(":")
    //if no hours are given add 00 in thr front
    if(a.length == 2){
        a = ["00"].concat(a)
    }
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]) //convert
    return parseInt(seconds)
}

function addSeconds(amount, date = new Date()){
    date.setSeconds(date.getSeconds() + amount)
    return date
}





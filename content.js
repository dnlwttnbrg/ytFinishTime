var duration = undefined
var current = undefined
var timeDisplay = undefined
var tag = document.createElement("span")

var currentInterval = setInterval(function() {
    current = document.getElementsByClassName("ytp-time-current")[0] //get curent time of the video
    if(current != undefined){
        console.log(current)
        observer.observe(current, {characterData: false, childList: true, attributes: false});
        clearInterval(currentInterval)
    }
  }, 1000); // 1000 milliseconds (1 second)

//observes changes in current time
observer = new MutationObserver(function(mutationsList, observer) {
    if(duration != undefined){
        current = document.getElementsByClassName("ytp-time-current")[0] //get curent time of the video
        if(timeDisplay == undefined){
            timeDisplay = document.getElementsByClassName("ytp-time-display")[0] //get time container to add new time to

            //create new span to hold time data
            tag.style.marginLeft = "5px"
            tag.setAttribute("id", "finichedAtTime")
            timeDisplay.appendChild(tag)
        }
        var speed = document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate
        console.log(parseFloat(speed))

        var seconds = (hmsToSeconds(duration.innerHTML)) - (hmsToSeconds(current.innerHTML))
        var newTime = addSeconds(Math.floor(seconds / parseFloat(speed)))
        tag.innerHTML = ("(" + newTime.toLocaleTimeString().substring(0,5) + ")")
    }else{
        duration = document.getElementsByClassName("ytp-time-duration")[0] //get duration of the video
    }
});



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
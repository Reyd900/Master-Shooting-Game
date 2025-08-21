function makeDiv(){
    // vary size for fun
    var divsize = ((Math.random()*100) + 50).toFixed();
    var options = ['#f39c12','#f33412','#12f3a5','#1231f3','#86079f','#1ad20e','#dcf90f'];
    var color = options[Math.floor(Math.random()*7)];
   
    $newdiv = $('<div class="new"/>').css({
        'width':divsize+'px',
        'height':divsize+'px',
        'border-radius': '50%',
        'background-color': color
    });

    // make position sensitive to size and document's width
    var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
    var posy = (Math.random() * ($(document).height() - divsize)).toFixed();

    $newdiv.css({
        'position':'absolute',
        'left':posx+'px',
        'top':posy+'px',
        'display':'none'
    }).appendTo( 'body' ).fadeIn(100).click(function() {
        $(this).fadeOut(200, function(){
                $(this).remove();
                counter += 1;
                $('#counter').text("Score: " + counter);            
        });
        makeDiv(); 
    }); 
}

function createTimer(seconds) {
    intervalVar = setInterval(function () {
    makeDiv();
    if (seconds === 0) {
        $('#context').text(seconds);
        clearInterval(intervalVar);
        $('#context').text("Time's up!");
        alert("Your score is " + counter);
        endGame();
        return;
    }
    if (seconds <= 10 && seconds > 5) {
        document.getElementById("context").style.color = "yellow";
    }
    else if (seconds <= 5) {
        document.getElementById("context").style.color = "red";
    }
    else {
        document.getElementById("context").style.color = "white";
    }
    var minutes = Math.floor(seconds / 60);
    var secondsToShow = (seconds - minutes * 60).toString();
    if (secondsToShow.length === 1) {
        secondsToShow = "0" + secondsToShow; // if the number of seconds is '5' for example, make sure that it is shown as '05'
    }
    $('#context').text(minutes.toString() + ":" + secondsToShow);
    seconds--;
    }, 1000);
}

var counter;

function initNewGame(){
    counter = 0; 
    $('#restart').hide();
    createTimer(30);
}

function endGame() {
    //remove divs
    $('.new').remove();
    //put a restart button, which when clicked calls newgame
    $('#restart').fadeIn('fast',function(){
        $(this).click(function() {
            initNewGame();
        });
    });
}

$(document).ready(function() {
	initNewGame();
});

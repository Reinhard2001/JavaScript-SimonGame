var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "green", "blue", "yellow"]


var started = false;
var level = 0;



$(document).on("keypress", () => {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }



})

$(".btn").on('click', function () {

    var userChosenColour = $(this).attr('id');

    userClickedPattern.push(userChosenColour);



    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}



function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");

    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100)
}



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        console.log("wrong");
        var wrongAudio = new Audio('sounds/wrong.mp3');
        wrongAudio.play();

        $('body').addClass('game-over');

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200)

        $("h1").text('Game Over, Press Any Key to Restart')

        $(document).keypress(() => {
            startOver();
        });

    }
}



function nextSequence() {

    userClickedPattern = [];

    level++;
    $("h1").text('Level ' + level)
    

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function startOver() {

    level = 0;

    gamePattern = [];

    userClickedPattern = [];

    nextSequence();


}

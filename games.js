
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var starded = false;
var level = 0;

$(document).keypress(function() {
   if(!starded){
       $("#level-title").text("Level " + level);
       nextSequence();
       starded = true;
   }
});

$(".btn").click(function () {

var userChosoenColour = $(this).attr("id");
userClickedPattern.push(userChosoenColour);

playSound(userChosoenColour);
animatePress(userChosoenColour);

checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
                nextSequence();

            },1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Oyun Bitti, Yeniden Başlamak İçin Bir Tuşa Basınız");
        setTimeout(function () {
            $("body").removeClass("game-over");

        },200);

        startOver();
    }

}


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4 );
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


}

function animatePress(curentColor) {

    $("#" + curentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + curentColor ).removeClass("pressed");
    },100);

}
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();


}




function startOver() {
    level = 0;
    gamePattern = [];
    starded = false;

}

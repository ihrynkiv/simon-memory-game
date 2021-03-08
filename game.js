const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern  = [];
let userClickedPattern = [];
let level = 0;
let isRestart = false;

$(document).keydown(function(event){
  let isStart = (level === 0 && (event.key === 'A' || event.key === 'a'));
  console.log(isStart);
  if (isStart || isRestart) {
    isRestart = false;
    nextSequence();
  }
});


function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playAudio(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $('#level-title').text(`level ${++level}`);
}

function playAudio(name){
  new Audio(`sounds/${name}.mp3`).play();
}

function animatePress(currentColour){
  $(`#${currentColour}`).addClass('pressed');
  setTimeout(function () {
    $(`#${currentColour}`).removeClass('pressed');
  }, 100);
}

$('.btn').click(function() {
  let userChosenColour = $(this).attr('id');
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('yes');
    if (currentLevel == level-1){
      setTimeout(nextSequence, 1000);
    }
  } else {
    playAudio('wrong');
    $('body').addClass('game-over');
    setTimeout(() => $('body').removeClass('game-over'), 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  isRestart = true;
}

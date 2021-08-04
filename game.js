var buttonColors = ["red","green","yellow","blue"];
var gameArray = [];
var userClickedArray = [];
var score = 0;

function nextSequence()
{
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    gameArray.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    var curr = $("#"+currentColor); 
    curr.addClass("pressed");

    setTimeout(function()
    {
        curr.removeClass("pressed");
    },100);
}

function checkAnswer(index)
{
  if(gameArray[index]!=userClickedArray[index])
  {
    $("body").addClass("game-over");
    setTimeout(function()
    {
      $("body").removeClass("game-over");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
    },200);
    userClickedArray = [];
    $("#level-title").text("Your Final"+"\nscore : "+score);
    $(".start").text("Restart");
    $(".start").attr("disabled",false);
    score = 0;
    return;
  }
  
  else if(gameArray.length==userClickedArray.length)
  {
    score++;
    $("#level-title").text("Score : "+score);
    setTimeout(function()
    {
      userClickedArray = [];
      nextSequence();
    },700);
  }
}

$(".btn").click(function(event)
{
    var userChosenColor = $(this).attr("Id");
    userClickedArray.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedArray.length-1);
})

$(".start").click(function()
{
    var button = $("button")[0];
    button.disabled=true;
    $(".start").text("Start");
    score = 0;
    $("#level-title").text("Score : "+score);
    gameArray = [];
    userClickedArray = [];
    nextSequence();
});

$(".help").click(function()
{
  location.href="help.html";
})
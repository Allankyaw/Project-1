const gameBox = document.querySelectorAll(".gameBox");
//this allows us to manipulate all elements inside class:gameBox
const guardColor = document.querySelector("#guard");
let nextPositionOfPrisoner = 0;
let playerScore = 0;
let timer = 0;
let timerStartedTrigger = false;

function updateScoreInHtml() {
  const playerScorePara = document.querySelector("#score");
  playerScorePara.textContent = `Player: ${playerScore}`;
}
function clickingWhenGuardIsRed() {
  playerScore--;
  if (playerScore <= 0) playerScore = 0;
  updateScoreInHtml();
  gameBox.forEach((box) => {
    box.style.backgroundColor = "white";
  });
  nextPositionOfPrisoner = 0;
}

function clickingWhenGuardIsBlue() {
  if (nextPositionOfPrisoner >= gameBox.length) {
    gameBox[nextPositionOfPrisoner - 1].style.backgroundColor = "white";
    //makes box 10 white nextPositionOfPrisoner=10
    nextPositionOfPrisoner = 0;
    playerScore++;
    updateScoreInHtml();
    return;
    //exits function when nextPositionOfPrisoner=10, so this just provides a "click" after box 10 where all boxes are white
  }
  if (nextPositionOfPrisoner !== 0) {
    gameBox[nextPositionOfPrisoner].style.backgroundColor = "blue";
    gameBox[nextPositionOfPrisoner - 1].style.backgroundColor = "white";
    //make the next blue box and current box white
  } else {
    gameBox[nextPositionOfPrisoner].style.backgroundColor = "blue";
    //when nextPositionOfPrisoner=0, no previous box
  }
  nextPositionOfPrisoner++;
}

function clickingTheEscapeButton() {
  document.getElementById("reset").style.borderColor = "black";
  document.getElementById("start").style.borderColor = "black";
  document.getElementById("escape").style.borderColor = "blue";
  if (guardColor.style.backgroundColor === "blue") {
    clickingWhenGuardIsBlue();
  }
  if (guardColor.style.backgroundColor === "green") {
    clickingWhenGuardIsBlue();
  }
  if (guardColor.style.backgroundColor === "red") {
    clickingWhenGuardIsRed();
  }
}
document
  .querySelector("#escape")
  .addEventListener("click", clickingTheEscapeButton);

document.querySelector("#start").addEventListener("click", startSetInterval);

document.querySelector("#reset").addEventListener("click", pressingResetButton);

function pressingResetButton() {
  // const resetButton = document.querySelectorAll("#reset");
  // resetButton.style.backgroundColor = "red";
  document.getElementById("reset").style.borderColor = "blue";
  document.getElementById("start").style.borderColor = "black";
  document.getElementById("escape").style.borderColor = "black";
  playerScore = 0;
  updateScoreInHtml();
  gameBox.forEach((box) => {
    box.style.backgroundColor = "white";
  });
  nextPositionOfPrisoner = 0;
  clearInterval(setIntervalTimerID);
  timerStartedTrigger = false;
  guardColor.style.backgroundColor = "red";
}

function pressingStartButton() {
  if (timer <= 5) {
    guardColor.style.backgroundColor = "blue";
  } else if ((timer > 5, timer <= 9)) {
    guardColor.style.backgroundColor = "green";
  } else guardColor.style.backgroundColor = "red";
  timer++;
  if (timer >= 15) {
    timer = 0;
  }
}
let setIntervalTimerID = null;

function startSetInterval() {
  document.getElementById("reset").style.borderColor = "black";
  document.getElementById("start").style.borderColor = "blue";
  document.getElementById("escape").style.borderColor = "black";
  if (!timerStartedTrigger) {
    setIntervalTimerID = setInterval(pressingStartButton, 500);
    //it will always wait 3 sec before 1st input
    timerStartedTrigger = true;
  }
}

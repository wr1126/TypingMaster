const startPage = document.getElementById("start");
const typePage = document.getElementById("form");
const sentence = document.getElementById("sentence");
const typeForm = document.getElementById("typing");
const typeInput = typeForm.querySelector("input");
const score = document.querySelector("#score > span");
const lastTime = document.querySelector("#time > span");
const againBtn = document.getElementById("againBtn");

function randomAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((value) => value.slip.advice)
    .then((advice) => (sentence.innerText = advice));
}

function start() {
  againBtn.style.opacity = "0";
  startPage.style.display = "none";
  typePage.style.display = "block";
  typeInput.disabled = false;
  setTimer();
}

function submit(event) {
  event.preventDefault();
  if (sentence.innerText === typeInput.value) {
    lastTime.innerText = 20;
  }
  addScore();
  randomAdvice();
}

function setTimer() {
  let handleTimer = setInterval(() => {
    let timeInNumber = Number(lastTime.innerText);
    if (timeInNumber === 0) {
      clearInterval(handleTimer);
      showResult();
    } else {
      timeInNumber -= 1;
      lastTime.innerText = timeInNumber;
    }
  }, 1000);
}

function addScore() {
  if (sentence.innerText === typeInput.value) {
    let scoreNumber = Number(score.innerText);
    scoreNumber += 1;
    score.innerText = parseInt(scoreNumber);
  }
  typeInput.value = "";
}

function showResult() {
  alert(`당신의 점수는 ${score.innerText}점입니다.`);
  score.innerText = 0;
  lastTime.innerText = 20;
  typeInput.value = "";
  typeInput.disabled = true;
  againBtn.style.opacity = "1";
  randomAdvice();
}

randomAdvice();
startBtn.addEventListener("click", start);
typeForm.addEventListener("submit", submit);
againBtn.addEventListener("click", start);

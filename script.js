let startBtn = document.querySelector(".start");
let endBtn = document.querySelector(".end");
let quesContainer = document.querySelector(".questions_container p");
let timer = document.querySelector(".timer p");

let firstQuestions = allQuestions[0];
let secondQuestions = allQuestions[1];
let thirdQuestions = allQuestions[2];
let fourthQuestions = allQuestions[3];
let fifthQuestions = allQuestions[4];

let lvl1time = 30; // Set to 10 seconds for the initial run
let i = 0;
let isInterviewOver = false;

function speakQuestion(question) {
  const utterance = new SpeechSynthesisUtterance(question);
  speechSynthesis.speak(utterance);
}

function getQuestionsLvl1() {
  let randomQuestions = [
    firstQuestions[Math.floor(Math.random() * firstQuestions.length)],
    secondQuestions[Math.floor(Math.random() * secondQuestions.length)],
    thirdQuestions[Math.floor(Math.random() * thirdQuestions.length)],
    fourthQuestions[Math.floor(Math.random() * fourthQuestions.length)],
    fifthQuestions[Math.floor(Math.random() * fifthQuestions.length)],
  ];
  if (i < randomQuestions.length) {
    quesContainer.textContent = randomQuestions[i];
    speakQuestion(randomQuestions[i]);
    i++;
  } else {
    quesContainer.textContent = "Interview Over";
    i = 0; // Reset the i variable to 0 to start the questions again
    isInterviewOver = true; // Set the flag to indicate the interview is over
  }
}

function appendTime(val) {
  if (val >= 10) {
    timer.textContent = `00:${val}`;
  } else {
    timer.textContent = `00:0${val}`;
  }
}

function startTimer() {
  let i = lvl1time;

  const interval = setInterval(() => {
    appendTime(i);
    i--;
    if (i < 0 || isInterviewOver) {
      timer.textContent = "00:00";
      clearInterval(interval);
      if (!isInterviewOver) {
        getQuestionsLvl1(); // Call getQuestionsLvl1() when the timer reaches 00:00
        lvl1time = 30; // Reset the timer duration for the next run
        startTimer(); // Start the timer again for the next set of questions
      }
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  getQuestionsLvl1(); // Run the getQuestionsLvl1 function immediately on click
  isInterviewOver = false; // Reset the interview over flag on each click
  startTimer(); // Start the timer immediately on click
});

endBtn.addEventListener("click", () => {
  location.reload(); // Refresh the page when the "End" button is clicked
});

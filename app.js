const startBtn = document.querySelector(".start-btn button");
const exitBtn = document.querySelector(".btn-exit");
const continueBtn = document.querySelector(".btn-continue");
const nextBtn = document.querySelector(".next-btn");
const ruleBox = document.querySelector(".rule-section");
const quizBox = document.querySelector(".quiz-section");
const resultBox = document.querySelector(".result-section");
const optionList = document.querySelector(".option-list");
let answerCount = 0;
let questionCount = 1;
let optionIndex = 1;
let timeLeft = 16;
let timerId;

const optionsArr = [
  {
    question: "What does HTML stand for?",
    option1: "Hyper Text Preprocessor",
    option2: "Hyper Text Markup Language",
    option3: "Hyper Text Multiple Language",
    option4: "Hyper Text Multi Language",
  },
  {
    question: "What does CSS stand for?",
    option1: "Common Style Sheet",
    option2: "Colorful Style Sheet",
    option3: "Computer Style Sheet",
    option4: "Cascading Style Sheet",
  },
  {
    question: "What does PHP stand for?",
    option1: "Hypertext Preprocessor",
    option2: "Hypertext Programming",
    option3: "Hypertext Preprogramming",
    option4: "Hypertext Production",
  },
  {
    question: "What does SQL stand for?",
    option1: "Stylesheet Query Language",
    option2: "Statement Question Language",
    option3: "Structured Query Language",
    option4: "Seemless Query Language",
  },
  {
    question: "What does CPU stand for?",
    option1: "Copper Platinum unit",
    option2: "Central Processing Unit",
    option3: "Central Portable Unit",
    option4: "Cable Platinum Unit",
  },
];

startBtn.addEventListener("click", startQuiz);
exitBtn.addEventListener("click", () => {
  endQuiz(startBtn, ruleBox);
});
continueBtn.addEventListener("click", () => {
  continueQuiz(ruleBox, quizBox);
});
nextBtn.addEventListener("click", () => {
  nextQuestion();
});
optionList.addEventListener("click", selectAnswer);

function startQuiz() {
  startBtn.parentElement.style.display = "none";
  ruleBox.style.display = "block";
}

function endQuiz(element1, element2) {
  element1.parentElement.style.display = "block";
  element2.style.display = "none";
}

function continueQuiz(element1, element2) {
  element1.style.display = "none";
  element2.style.display = "block";
  resetTimer();
}

function selectAnswer(e) {
  const question = document.querySelector(".question-number");
  let element;

  if (Number(question.textContent) === questionCount) {
    element =
      e.target.firstElementChild.textContent === checkQuestion(questionCount);
  }

  if (e.target.classList.contains("option-list")) {
    console.log("Select an option");
  } else if (element) {
    showAnswer(e.target, "check", "fa-solid fa-check", "#90d7a0");
    answerCount++;
  } else {
    showAnswer(e.target, "times", "fa-solid fa-xmark", "#f8d7da");

    Array.from(optionList.children).forEach((item) => {
      if (item.firstElementChild.textContent === checkQuestion(questionCount)) {
        showAnswer(item, "check", "fa-solid fa-check", "#90d7a0");
      }
    });
  }
}

function checkQuestion(questionCount) {
  let result;

  switch (questionCount) {
    case 1:
      result = "Hyper Text Markup Language";
      break;
    case 2:
      result = "Cascading Style Sheet";
      break;
    case 3:
      result = "Hypertext Preprocessor";
      break;
    case 4:
      result = "Structured Query Language";
      break;
    case 5:
      result = "Central Processing Unit";
      break;
  }

  return result;
}

function showAnswer(target, spanClass, iconClass, bgColor) {
  const span = document.createElement("span");
  span.className = `icon ${spanClass}`;
  target.appendChild(span);
  target.style.background = bgColor;

  const i = document.createElement("i");
  i.className = iconClass;
  span.appendChild(i);

  target.parentElement.style.pointerEvents = "none";
}

function nextQuestion() {
  resetTimer();
  const questionNumber = document.querySelectorAll(".question-number");
  const question = document.querySelector(".question");
  const optionsDiv = Array.from(optionList.children);

  // Set question number
  questionCount++;
  questionNumber.forEach((item) => {
    questionCount <= 5 && (item.textContent = questionCount);
  });
  questionCount === 5 && (nextBtn.textContent = "Result");

  // Set options and question header
  if (optionIndex < optionsArr.length) {
    question.textContent = optionsArr[optionIndex].question;
    optionsDiv[0].firstElementChild.textContent =
      optionsArr[optionIndex].option1;
    optionsDiv[1].firstElementChild.textContent =
      optionsArr[optionIndex].option2;
    optionsDiv[2].firstElementChild.textContent =
      optionsArr[optionIndex].option3;
    optionsDiv[3].firstElementChild.textContent =
      optionsArr[optionIndex].option4;
  }

  optionIndex++;

  // Clear answers to be fresh for next question
  clearSelectedAnswer();

  // Enable Result box with the total score
  if (questionCount > 5) {
    showResult();
  }
}

function clearSelectedAnswer() {
  const optionsDiv = Array.from(optionList.children);

  optionsDiv.forEach((item) => {
    if (item.children.length > 1) {
      item.lastElementChild.remove();
      item.style.background = "rgb(222, 243, 236)";
    }
  });

  optionList.style.pointerEvents = "auto";
}

function showResult() {
  optionIndex = 0;
  questionCount = 0;
  document.querySelector(".answer-text").textContent = answerCount;

  // Set remark text based on total score
  const remarkText = document.querySelector(".remark-text");
  remarkText.textContent =
    answerCount > 3 ? "great" : answerCount === 3 ? "nice" : "sorry";

  resultBox.style.display = "block";
  quizBox.style.display = "none";
  answerCount = 0;

  const exitBtn = document.querySelectorAll(".btn-exit");
  const continueBtn = document.querySelectorAll(".btn-continue");

  exitBtn[1].onclick = () => {
    endQuiz(startBtn, resultBox);
    nextQuestion();
  };

  continueBtn[1].onclick = () => {
    continueQuiz(resultBox, quizBox);
    nextQuestion();
  };
}

// Coundown timer for each question
function updateTimer() {
  document.querySelector(".time-sec").textContent = timeLeft;
}

function timer() {
  timeLeft--;

  updateTimer();

  if (timeLeft > 0) {
    timerId = setTimeout(timer, 1000);
  } else {
    optionList.style.pointerEvents = "none";
  }
}

function resetTimer() {
  clearTimeout(timerId);
  timeLeft = 16;
  timer();
}

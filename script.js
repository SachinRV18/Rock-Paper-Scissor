let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choices .img");

const message = document.querySelector("#msg");
const userScoreValue = document.querySelector("#user-score");
const compScoreValue = document.querySelector("#comp-score");

// modular choice - 1 reusable component we create
const generateComputerChoice = () => {
  const options = ["rock", "paper", "scissor"];
  const randomIdx = Math.floor(Math.random() * 3);
  return options[randomIdx];
};

// drawGame function
const drawGame = () => {
  message.innerText = `Game was drawn, Play again.`;
  message.style.backgroundColor = "#0d0d3f";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScoreValue.innerText = userScore;
    message.innerText = `You Win. Your ${userChoice} beats ${compChoice}`;
    message.style.backgroundColor = "green";
  } else {
    compScore++;
    compScoreValue.innerText = compScore;
    message.innerText = `You Lose. ${compChoice} beats your ${userChoice}`;
    message.style.backgroundColor = "red";
  }
};
const playGame = (userChoice) => {
  console.log("user choice: ", userChoice);
  //generating computer choice
  const compChoice = generateComputerChoice();
  console.log("computer choice: ", compChoice);

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      // scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      // rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

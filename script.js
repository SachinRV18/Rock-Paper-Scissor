let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choices .img");
const message = document.querySelector("#msg");
const userScoreValue = document.querySelector("#user-score");
const compScoreValue = document.querySelector("#comp-score");
const userChoiceDisplay = document.querySelector("#user-choice");
const compChoiceDisplay = document.querySelector("#comp-choice");
const countdownDisplay = document.querySelector("#countdown");

const generateComputerChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randomIdx = Math.floor(Math.random() * 3);
  return options[randomIdx];
};

const drawGame = () => {
  countdownDisplay.style.color = "#0d0d3f";
  countdownDisplay.innerText = `It's a Draw!`; // Handle the draw case correctly
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScoreValue.innerText = userScore;
    countdownDisplay.style.color = "green";
    countdownDisplay.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
  } else {
    compScore++;
    compScoreValue.innerText = compScore;
    countdownDisplay.style.color = "red";
    countdownDisplay.innerText = `You Lose. ${compChoice} beats your ${userChoice}`;
  }
};

const playGame = (userChoice) => {
  const compChoice = generateComputerChoice();

  userChoiceDisplay.innerText = `Your choice: ${userChoice}`;
  compChoiceDisplay.innerText = `Computer's choice: ${compChoice}`;

  // Show countdown message for 5 seconds
  let countdown = 5;
  countdownDisplay.style.color = "#F3A712";
  countdownDisplay.innerText = `Please wait... ${countdown} seconds remaining`;

  // Countdown logic
  const countdownInterval = setInterval(() => {
    countdown--;
    countdownDisplay.style.color = "#F3A712";
    countdownDisplay.innerText = `Please wait... ${countdown} seconds remaining`;
    if (countdown === 0) {
      clearInterval(countdownInterval); // Stop the countdown

      // After countdown finishes, show the result
      if (userChoice === compChoice) {
        drawGame(); // Correctly handle draw scenario
      } else {
        // Here we use ternary logic to check for win/loss conditions
        let userWin = false;

        // Check all conditions for win or loss
        if (userChoice === "rock" && compChoice === "scissors") {
          userWin = true; // Rock beats Scissors
        } else if (userChoice === "scissors" && compChoice === "paper") {
          userWin = true; // Scissors beats Paper
        } else if (userChoice === "paper" && compChoice === "rock") {
          userWin = true; // Paper beats Rock
        } else if (userChoice === "scissors" && compChoice === "rock") {
          userWin = false; // Rock beats Scissors (Computer wins)
        } else if (userChoice === "paper" && compChoice === "scissors") {
          userWin = false; // Scissors beats Paper (Computer wins)
        } else if (userChoice === "rock" && compChoice === "paper") {
          userWin = false; // Paper beats Rock (Computer wins)
        }

        showWinner(userWin, userChoice, compChoice);
      }
    }
  }, 1000); // Update every 1 second
};

// Add event listeners to the choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

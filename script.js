//Step 1
//Declare Global Variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "aladdin";
//Add a New Global Variable for Player Guesses
guessedLetters = [];
//Declare a Global Variable for the Number of Guesses
let remainingGuesses = 8

const fetchCharacterNames = async function () {
  const response = await fetch (
    "https://api.disneyapi.dev/character");
    const data = await response.json();

    // Extract names from the data and store them in an array
    const characterNames = data.data.map(character => character.name);

    //Get random character name
    const randomIndex = Math.floor(Math.random() * characterNames.length);
    word = characterNames[randomIndex].trim();
    placeholder(word);
  };

  fetchCharacterNames();


//Write a Function to Add Placeholders for Each Letter
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("❤");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//Add an Event Listener for the Button
guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  //Validate Input in the Button Event Handler
  message.innerText = "";
  //grab what we have entered...
  const guess = letterInput.value;
  //let's make sure it is a single letter..
  const goodGuess = validateInput(guess);
  //console.log(goodGuess);

  if (goodGuess) {
    //we have a letter let's guess
    makeGuess(guess);
  }
  letterInput.value = "";
});

//Create a Function to Check Player’s Input
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter letters only.";
  } else {
    return input;
  }
};

//Create a Function to Capture Input
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that one silly!";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updateRemainingGuesses(guess);
    showGuesses();
    updateWordInProgress(guessedLetters);
  }
};

//Create a Function to Show the Guessed Letters
const showGuesses = function () {
  guessedLettersElement.innerHTML = "";
  for(const letter of guessedLetters) {
  const li = document.createElement("li");
  li.innerText = letter;
  guessedLettersElement.append(li);
  }
}

//Create a Function to Update the Word in Progress
const updateWordInProgress = function (guessedLetters) {
const wordUpper = word.toUpperCase();
const wordArray = wordUpper.split("");
//console.log(wordArray);
//how do I know to include a for of loop?
const revealWord = [];
for (const letter of wordArray) {
if (guessedLetters.includes(letter)) {
revealWord.push(letter.toUpperCase())
} else {
  revealWord.push("●");
}
}
wordInProgress.innerText = revealWord.join("");
checkIfWin();
};

//Create a Function to Count Guesses Remaining
const updateRemainingGuesses = function (guess) {
const upperWord = word.toUpperCase();
if (!upperWord.includes(guess)){
  //bad guess, lose a chance
  message.innerText = `Sorry, the word has no ${guess}.`;
  remainingGuesses -= 1;
} else {
  message.innerText =`Good guess! The word has the letter ${guess}.`;
}

if (remainingGuesses === 0) {
  message.innerHTML = `Game Over! The word was <span class="highlight">${word}</span>.`;
} else if ( remainingGuesses === 1) {
  remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
} else {
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
}
};

//Create a function to check if player has won
const checkIfWin = function () {
if (word.toUpperCase() === wordInProgress.innerText) {
  message.classList.add("win");
  message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
}
};


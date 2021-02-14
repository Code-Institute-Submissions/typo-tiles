// https://marina-ferreira.github.io/tutorials/js/memory-game/

const cards = document.querySelectorAll('.card');

let hasFlipppedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// ------- Flipcard function...
function flipCard() {
    if (lockBoard) return;
    moveCounter();
    if (this === firstCard) return;

    this.classList.add('flip');



    if (!hasFlipppedCard) {
        //first click
        hasFlipppedCard = true;
        firstCard = this;


        return;
    }
    //second click
    secondCard = this;

    checkForMatch();
}

// ------- Check if cards match function...
function checkForMatch() {
    let isMatch = firstCard.dataset.typeface === secondCard.dataset.typeface;

    if (isMatch) {
        matchCounter += 1;
        disableCards();
        if (matchCounter == (cards.length / 2)) {
            congratulations();
            //         window.alert("Congratulations! You Won!");
        }
    } else {
        unFlipCards();
    }
}
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

// ------- It's a match function...
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// ------- Not a match function...
function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

// ------- Reset board function...
function resetBoard() {
    [hasFlipppedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// ------- Shuffle function...iife
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function restartGame() {
    location.reload();
}

// ------- Tester code ----------------------------------------------------------

let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// stars list
let starsList = document.querySelectorAll(".stars li");

// @description count player's moves
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 24 && moves < 32) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 24) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

//----------------------------------------------------------------------------------------

// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}
//Variable to count the card pairings
let matchCounter = 0;
//----------------------------------------------------------------------------------------

 // close icon in modal
 let closeicon = document.querySelector(".close");

 // declare modal
 let modal = document.getElementById("popup1")

//let matchedCard = document.getElementsByClassName("match");
// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
    //   if  (match.length == 16) {

    clearInterval(interval);
    finalTime = timer.innerHTML;

    // show congratulations modal
    modal.classList.add("show");

    // declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    //closeicon on modal
    closeModal();
};



//---------------------------------------------------------------------------------------- 

//----------------------------------------------------------------------------------------

//  Memory game flip tile code adapted from: https://marina-ferreira.github.io/projects/js/memory-game/

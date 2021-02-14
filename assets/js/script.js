// Started constructing the Javascript with the help of this tutorial by Marina Frerreira: https://www.youtube.com/watch?v=eMhiMsEC9Uk&list=PLLX1I3KXZ-YH-woTgiCfONMya39-Ty8qw

// declare variable for moves (counter)
let moves = 0;
let counter = document.querySelector(".moves");

// declare variable for star icons
const stars = document.querySelectorAll(".fa-star");

// card list
const cards = document.querySelectorAll('.card');

// Variable to count the card pairings
let matchCounter = 0;

let hasFlipppedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// ------- Click event listener card flip
cards.forEach(card => card.addEventListener('click', flipCard));

// ------- Flipcard function
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

// ------- Check if cards match function, will flip back in no match is found, if all matches are found, call congratulations popup modal...
function checkForMatch() {
    let isMatch = firstCard.dataset.typeface === secondCard.dataset.typeface;

    if (isMatch) {
        matchCounter += 1;
        disableCards();
        if (matchCounter == (cards.length / 2)) {
            congratulations();
        }
    } else {
        unFlipCards();
    }
}

// ------- It's a match function, remove the flipcard ability and call reset board to prevent further clicks on matched cards
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

// ------- Reset board function to prevent triple click and double click bugs
function resetBoard() {
    [hasFlipppedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// ------- Shuffle function, (iife - Immediately invoked function expression)
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

// ------- Count player's moves incremently, linked with timer and star rating
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

// -------- Game timer 
let second = 0, minute = 0; hour = 0;
let timer = document.querySelector(".timer");
let interval;
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


// -------- popup modal for when all cards match, displays moves, time and star rating

// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1");

function congratulations() {

    clearInterval(interval);
    finalTime = timer.innerHTML;

    // shows 'Complete!' upon receiving .show class
    modal.classList.add("show");

    // declare star rating variable
    let starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    // calls close modal function
    closeModal();
}

// -------- close icon on modal function
function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
        restartGame();
    });
}

// -------- Restart the game function linked to 'Back to start' button
function restartGame() {
    location.reload();
}

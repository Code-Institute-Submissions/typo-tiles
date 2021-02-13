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

    if (firstCard.dataset.typeface ===
        secondCard.dataset.typeface) {
        
        disableCards();
    } else {
        unFlipCards();
    }
}

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

function restartGame(){
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
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    /*//start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }*/
    // setting rates based on moves
    if (moves > 24 && moves < 32){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 24){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------

//  Memory game flip tile code adapted from: https://marina-ferreira.github.io/projects/js/memory-game/

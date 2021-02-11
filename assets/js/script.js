const cards = document.querySelectorAll('.card');

let hasFlipppedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// ------- Flipcard function...
function flipCard() {
    if (lockBoard) return;
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


cards.forEach(card => card.addEventListener('click', flipCard));


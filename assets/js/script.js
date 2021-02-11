const cards = document.querySelectorAll('.card');

let hasFlipppedCard = false;
let firstCard, secondCard;

// ------- Flipcard function...
function flipCard() {
    this.classList.add('flip');

    if (!hasFlipppedCard) {
        //first click
        hasFlipppedCard = true;
        firstCard = this;
    } else {
        //second click
        hasFlipppedCard = false;
        secondCard = this;

        checkForMatch();
    }
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
}

// ------- Not a match function...
function unFlipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1500);
}


cards.forEach(card => card.addEventListener('click', flipCard));


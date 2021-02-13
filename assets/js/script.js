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
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}






//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------- New JS
//----------------------------------------------------------------------------------------

/* 
 
  Author: Massimo Giraldo
  Last code revision: April 2020

  Memory game flip tile code adapted from: https://marina-ferreira.github.io/projects/js/memory-game/

  
*/


// variables and constants assignement

/*const MINLEVEL = 1, MAXLEVEL = 4, TILESPERLEVEL = 4,  
LEVELDIV = 'level',
PLAYERDIV = 'playerName',
POINTSDIV = 'totalPoints',
COUNTDOWNDIV = 'countdown',
BOARDDIV = 'gameBoard',
STARTTHEGAMEDIV = 'startTheGameDiv', // main navigation div ID
GAMEFORM = 'myForm',
TIMEUPDIV = 'timeUpDiv',
PAUSEDIV = 'pauseDiv',
YOUWONDIV = 'youWonDiv', // defines the div message before the next level
YOUWONALL = 'youWonAll', // defines the final message at the end of the game
TEMPSHOWING = 800, // the time unmatching tiles remain active
RELOADTIME = 5000; // the time before loading the next level


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//retrieve current level from cookie
let currentLevel = checkLevel();
//console.log ('Current Level: ' + currentLevel);
  

// Timer for the game expressed in minutes (10 levels)
let levelTimer     = [];
    levelTimer[1]  = 1; // level 1
    levelTimer[2]  = 1; // level 2
    levelTimer[3]  = 2; // level 3
    levelTimer[4]  = 2; // level 4
    levelTimer[5]  = 3; // level 5
    levelTimer[6]  = 3; // level 6
    levelTimer[7]  = 4; // level 7
    levelTimer[8]  = 4; // level 8
    levelTimer[9]  = 5; // level 9
    levelTimer[10] = 6; // level 10

// set timer to level value minutes from now
let timeInMinutes = levelTimer[parseInt(currentLevel)];
let currentTime = Date.parse(new Date());
let deadline = new Date(currentTime + timeInMinutes*60*1000);
let timeInterval;


// start the timer automatically from the 2nd level up
if(currentLevel > 1){
    document.getElementById(STARTTHEGAMEDIV).style.display = 'none';
    runClock(COUNTDOWNDIV,deadline);
}




// manage the DIV for the level, the total points and the player's name and set the value for it
document.getElementById(LEVELDIV).innerHTML = '<span>' + currentLevel + '</span> Level';

let totalPoints = getCookie('gamePoints');
document.getElementById(POINTSDIV).innerHTML = '<span>' + totalPoints + '</span> Points';

let player = getCookie('playerName');
document.getElementById(PLAYERDIV).innerHTML = '<span>' + player + '</span> Name';

//by default, the start button is not displayed until the player sets up his/her name
document.getElementById('startBtn').style.display = 'none';*/



/* =============== CREATE THE BOARD =============== */

// create an array contaning all the alphabet letters, corresponding to the memory card images
//let myAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// randomize the alphabet array
/*let myRandomizeAlphabet = randomizeArray(myAlphabet);

let myPairs = [];
for (var h = 0; h < currentLevel * 2; h++) { //assign the same values to 2 different tiles
    myPairs.push(myRandomizeAlphabet[h]);
    myPairs.push(myRandomizeAlphabet[h]);
}

// Build and display the deck with all the clickable tiles
let deck = '';
for (let p = 0; p < myPairs.length; p++) {
    let thisCard = myPairs[p];
    deck += `
        <div class="memory-card" data-framework="${thisCard}">
            <img class="front-face" src="images/${thisCard}.png" alt="${thisCard}" />
            <img class="back-face" src="images/pokeball2.svg" alt="Pokeball" />
        </div>
        `;    
}

document.getElementById(BOARDDIV).innerHTML = deck;
//    console.log(deck);

// simple function to randomize the content of a given array
function randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// ======================================================== //



// ================== MANAGE THE MATCHING ================= //

const cards = document.querySelectorAll('.memory-card');


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

let counter = currentLevel * 2;
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch){
        disableCards();
        counter --;
    } 
    else{
        unflipCards();      
    }

    // reload for the next level;
    if(counter <= 0 && currentLevel < MAXLEVEL) {
        displayLevelPassed();
        loadNewLevel();
    } // unless it is the last level
    else if (counter <= 0 && currentLevel === MAXLEVEL) {
        displayWinnerBadge();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('pulserGood');
    secondCard.classList.add('pulserGood');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
        }, TEMPSHOWING);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//shuffle immediately the cards
let cardPerLevel = currentLevel * TILESPERLEVEL; //level of cards per game

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cardPerLevel);
        card.style.order = randomPos;
    });
})();

// ------------------------------------------

// Congratulation message on level completion
let messageOnCompletion = ['That\'s amazing!',
                            'Way to go!',
                            'Keep \'em coming!', 
                            'Extraordinary Job!',
                            'Yo! Gimme five!',
                            'Wow!<br /> Great memory!',
                            'I like to move it,<br /> move it!',
                            'You must have<br /> superpowers!',
                            'You rock!'];
// randomize congratilation array
let currentCompletionMessage = messageOnCompletion[Math.floor(Math.random() * Math.floor(messageOnCompletion.length))];

function displayLevelPassed(){
    stopClock();

    let currentPoints = timeRemaining(deadline).total/100 ;
//    console.log('Points gained: ' + currentPoints);
    let newPoints = parseInt(getCookie('gamePoints')) + currentPoints
    setCookie('gamePoints', newPoints, 1);
//    console.log('Total points: ' + getCookie('gamePoints'));

    setTimeout ( function() {
        let loadingLevel = currentLevel + 1;
        document.getElementById(YOUWONDIV).innerHTML = `
        <div class="center-all">
            <p class="pulseText">${currentCompletionMessage}</p>
            <div class="levelPoints">
                <span>You earned ${currentPoints} level points</span>
                <div class="loader"></div>Loading Level ${loadingLevel}...</div></div>
            </div>
        </div>
        `;
        document.getElementById(YOUWONDIV).style.display = 'block';
    }, TEMPSHOWING );
}


function loadNewLevel(){
    //after matching, wait for RELOADTIME before displaying a new level
    setTimeout ( function() {
        location.reload();
    }, RELOADTIME );
}


function displayWinnerBadge(){
    stopClock();
    let currentPoints = timeRemaining(deadline).total/100 ;
//    console.log('Points gained: ' + currentPoints);
    let newPoints = parseInt(getCookie('gamePoints')) + currentPoints

    setTimeout ( function() {
        document.getElementById(YOUWONALL).innerHTML = `
        <div class="center-all">
            <div class="levelPoints">
                <span>Your final score is ${newPoints}!</span>
            </div>
                <p class="pulseText">You are<br />the Master Matcher!</p>
            <div>
            <div><a class="yellowBtn button" href="#" onclick="resetGame();">Back to Start</a></div>
            <div><img src="images/PokemonTrophySmall.png" alt="winner badge"></div>
        </div>
        `;
        document.getElementById(YOUWONALL).style.display = 'block';
        document.getElementById('winnerBadge').style.display = 'block'; 
    }, TEMPSHOWING );
}


cards.forEach(card => card.addEventListener('click', flipCard));

// ======================================================= 


// ================== timer management =================== 

// forked from https://gist.github.com/remhay18/bcd8a6cf5b1b1ac2ebfa9ad279f13e78 and adapted to the game

function timeRemaining(endTime){
    let t = Date.parse(endTime) - Date.parse(new Date());
    let seconds = Math.floor( (t/1000) % 60 );
    let minutes = Math.floor( (t/1000/60) % 60 );
    let hours = Math.floor( (t/(1000*60*60)) % 24 );
    let days = Math.floor( t/(1000*60*60*24) );
    return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}

function runClock(id, endTime){
    let clock = document.getElementById(id);
    function updateClock(){
        let t = timeRemaining(endTime);
        if (t.seconds <= 9 && t.minutes >= 1){
            clock.innerHTML = '<span>' + t.minutes + ':0' + t.seconds + '</span> Timer';
        }
        else if (t.seconds <= 9 && t.minutes < 1){
            clock.classList.add("shakeIt")
            clock.innerHTML = '<span class="alert">' + t.minutes + ':0' + t.seconds + '</span> Timer';
        }
        else{
            clock.innerHTML = '<span>' + t.minutes + ':' + t.seconds + '</span> Timer';

        }
        if(t.total <= 0){ 
            clearInterval(timeInterval); 
            document.getElementById(TIMEUPDIV).style.display = 'block';
            initGame();
//                console.log("Game Over");
        }
    }
    updateClock(); // run function once at first to avoid delay
    timeInterval = setInterval(updateClock,1000);
}

let paused = false; // is the clock paused?
let timeLeft; // time left on the clock when paused



function pauseClock(){ Currently not used... 
    if(!paused){
        paused = true;
        // stop the clock
        clearInterval(timeInterval);
        // preserve the remaining time
        timeLeft = timeRemaining(deadline).total; 
    }
}

function resumeClock(){  Currently not used... 
    if(paused){
        //reset the pause
        paused = false;
        // update the deadline with the amount of time remaining
        deadline = new Date(Date.parse(new Date()) + timeLeft);

        // start the clock back again
        runClock(COUNTDOWNDIV,deadline);
    }
}

function stopClock(){
    clearInterval(timeInterval); // stop the clock
}


// ========================================================     



 // ================== Cookie management ================== 


 function setCookie(cookieName,cookievalue,expirationDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expirationDays*24*60*60*1000));
    let expires = 'expires=' + date.toGMTString();
    document.cookie = cookieName + '=' + cookievalue + ';' + expires + ';path=/';
}

function getCookie(cookieName) {
    let name = cookieName + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function deleteCookie(cookieName){
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function checkLevel() {
    let level = parseInt(getCookie('gameLevel'));
    if (level == '' || level == undefined ||  isNaN(level)) {
        level = MINLEVEL; //set minimum level tiles
        setCookie('gameLevel', level, 1);
    }
    else if (level >= MAXLEVEL) {
        setCookie('gameLevel', MINLEVEL, 1);
    } else {
        let thisLevel = level + 1;
        setCookie('gameLevel', thisLevel, 1);
    }
    //console.log('Level is: ' + level)
    return level;
}

 // ============================================ 



 // ====== Functions to operate the game ======= 

 function initGame() {
    setCookie('gameLevel', MINLEVEL, 1);
    setCookie('gamePoints', 0, 1);
    setCookie('playerName', '', 1);
}

function startGame(){
    document.getElementById(STARTTHEGAMEDIV).style.display = 'none';
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + timeInMinutes*60*1000);
    runClock(COUNTDOWNDIV,deadline);
    setCookie('gameLevel', MINLEVEL+1, 1);
    setCookie('gamePoints', 0, 1);
    document.getElementById(PLAYERDIV).innerHTML = '<span>' + getCookie('playerName') + '</span> Name';
}

function resetGame(){
    initGame();
    document.getElementById(YOUWONALL).style.display = 'none';
    document.getElementById(YOUWONDIV).style.display = 'none';
    document.getElementById(STARTTHEGAMEDIV).style.display = 'block';
    stopClock();
    location.reload();
}

function pauseGame(){
    pauseClock();
    document.getElementById(PAUSEDIV).style.display = 'block';
}

function resumeGame(){
    resumeClock();
    document.getElementById(PAUSEDIV).style.display = 'none';
}


function recordPlayerName() {
    let playerName = document.getElementById(GAMEFORM).elements.namedItem('playerName').value;
    /* 
    validate with a regular expression containing all latin characters, including extended ones
    \u00C0-\u00FF Latin-1 Supplement
    \u0100-\u017F Latin Extended-A
    \u0180-\u024F Latin Extended-B
    \u1E00-\u1EFF Latin Extended Additional
    
    let nameRegx = /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]{1,8}$/;
    let validName = nameRegx.test(playerName.trim());
    let playerElement = document.getElementById('palyerNameShow');
    if(validName){
        playerElement.innerHTML = `Thank you ${playerName}, you're now ready to play!&nbsp;`;
        document.getElementById('startBtn').style.display = 'inline-block';
        setCookie('playerName', playerName, 1);
    }
    else{
        playerElement.innerHTML = 'Oops! Please enter your name to start playing.';
    }
  }
  
document.getElementById('confirmName').onclick = recordPlayerName;

// ============================================ 



// ================ HELP MODAL ================

// forked from https://www.w3schools.com/howto/howto_css_modals.asp

  // Get the help modal
let helpModal = document.getElementById("helpModalDiv");
// Get the button that opens the modal
let btn = document.getElementById("helpBtn");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("closeHelp")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  helpModal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  helpModal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == helpModal) {
    helpModal.style.display = "none";
  }
}*/



    









// Deck of cards (2-10, J, Q, K, A) and images for cards
const deck = [
    {value: 2, img: 'images/2.png'}, 
    {value: 3, img: 'images/3.png'}, 
    {value: 4, img: 'images/4.png'}, 
    {value: 5, img: 'images/5.png'}, 
    {value: 6, img: 'images/6.png'}, 
    {value: 7, img: 'images/7.png'}, 
    {value: 8, img: 'images/8.png'}, 
    {value: 9, img: 'images/9.png'}, 
    {value: 10, img: 'images/10.png'}, 
    {value: 11, img: 'images/J.png'}, 
    {value: 12, img: 'images/Q.png'}, 
    {value: 13, img: 'images/K.png'}, 
    {value: 14, img: 'images/A.png'}
].flatMap(card => [card, card, card, card]);

// Wallet balance and default bet
let walletBalance = 1000;
let betAmount = 10;
let doubleNextRound = false;

// Select elements
const card1Elem = document.querySelector('#card1-image');
const card2Elem = document.querySelector('#card2-image');
const card3Elem = document.querySelector('#card3-image');
const resultElem = document.getElementById('result');
const dealBtn = document.getElementById('deal-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const doubleOrFoldBtn = document.createElement('button');
const betInput = document.getElementById('bet');
const walletElem = document.createElement('div');

// Add the wallet display
document.body.prepend(walletElem);
updateWalletDisplay();

// Add the "Double Bet or Forfeit" button dynamically
doubleOrFoldBtn.textContent = 'Double to See Third Card or Forfeit Bet';
doubleOrFoldBtn.style.display = 'none';
document.body.appendChild(doubleOrFoldBtn);

let card1, card2, card3;

function dealCards() {
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    
    // Check if doubleNextRound is true to double the bet
    if (doubleNextRound) {
        betAmount *= 2;
        doubleNextRound = false;
    } else {
        betAmount = Number(betInput.value);
    }

    // Deduct bet amount from the wallet
    walletBalance -= betAmount;
    updateWalletDisplay();

    // Dealer deals two cards
    card1 = shuffledDeck.pop();
    card2 = shuffledDeck.pop();

    // Show the card images
    card1Elem.src = card1.img;
    card2Elem.src = card2.img;
    card3Elem.src = '';
    resultElem.textContent = '';

    if (card1.value === card2.value) {
        resultElem.textContent = "It's a tie! You get your money back.";
        walletBalance += betAmount;  // Return the bet
        updateWalletDisplay();
        playAgainBtn.style.display = 'block';
        dealBtn.style.display = 'none';
    } else if (Math.abs(card1.value - card2.value) === 1) {
        resultElem.textContent = "The cards are consecutive. You lose this round.";
        playAgainBtn.style.display = 'block';
        dealBtn.style.display = 'none';
    } else {
        resultElem.textContent = `You can either double your bet to see the third card or forfeit your initial bet.`;
        doubleOrFoldBtn.style.display = 'block';
        dealBtn.style.display = 'none';
        doubleOrFoldBtn.onclick = doubleOrFoldDecision;
    }
}

function doubleOrFoldDecision() {
    // Ask the player if they want to double their bet or forfeit
    const decision = confirm('Do you want to double your bet to see the third card?');
    
    if (decision) {
        // Double the bet and deduct from wallet
        walletBalance -= betAmount;
        betAmount *= 2;
        updateWalletDisplay();
        dealThirdCard(); // Continue to deal the third card
    } else {
        resultElem.textContent = "You forfeited your initial bet!";
        doubleOrFoldBtn.style.display = 'none';
        playAgainBtn.style.display = 'block';
    }
}

function dealThirdCard() {
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    
    // Dealer deals the third card
    card3 = shuffledDeck.pop();

    // Show the card image
    card3Elem.src = card3.img;

    const low = Math.min(card1.value, card2.value);
    const high = Math.max(card1.value, card2.value);

    if (card3.value > low && card3.value < high) {
        resultElem.textContent = `You win! The third card is in between. You win ${betAmount * 2}!`;
        walletBalance += betAmount * 2;  // Player wins double the bet
    } else if (card3.value === card1.value || card3.value === card2.value) {
        resultElem.textContent = `The third card matches one of the first two! Your bet is doubled for the next round.`;
        doubleNextRound = true;  // Double the bet for the next round
    } else {
        resultElem.textContent = `You lose! The third card is not in between. You lose your bet of ${betAmount}.`;
    }

    updateWalletDisplay();
    playAgainBtn.style.display = 'block';
    doubleOrFoldBtn.style.display = 'none';
}

function playAgain() {
    dealBtn.textContent = 'Deal Cards';
    dealBtn.style.display = 'block';
    playAgainBtn.style.display = 'none';
    card1Elem.src = '';
    card2Elem.src = '';
    card3Elem.src = '';
    resultElem.textContent = '';
}

// Function to update the wallet display
function updateWalletDisplay() {
    walletElem.textContent = `Wallet Balance: $${walletBalance}`;
}

dealBtn.addEventListener('click', dealCards);
playAgainBtn.addEventListener('click', playAgain);

// Simplified game with easier-to-win logic

let walletBalance = 1000;
let betAmount = 10;
let doubleNextRound = false;

const card1Elem = document.getElementById('card1-value');
const card2Elem = document.getElementById('card2-value');
const card3Elem = document.getElementById('card3-value');
const resultElem = document.getElementById('result');
const dealBtn = document.getElementById('deal-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const doubleBtn = document.getElementById('double-btn');
const betInput = document.getElementById('bet');
const walletElem = document.getElementById('wallet');

let card1, card2, card3;

function dealCards() {
    const deck = generateDeck();
    
    betAmount = Number(betInput.value);

    // Deduct the initial bet only after third card is played
    walletElem.textContent = `Wallet: $${walletBalance}`;

    // Dealer deals two cards
    card1 = deck.pop();
    card2 = deck.pop();

    card1Elem.textContent = card1;
    card2Elem.textContent = card2;
    card3Elem.textContent = '';
    document.getElementById('card3').style.display = 'none';

    if (card1 === card2) {
        resultElem.textContent = "It's a tie! You get your money back.";
        playAgainBtn.style.display = 'block';
        dealBtn.style.display = 'none';
    } else if (Math.abs(card1 - card2) === 1) {
        resultElem.textContent = "The cards are consecutive. You lose this round.";
        walletBalance -= betAmount;
        updateWalletDisplay();
        playAgainBtn.style.display = 'block';
        dealBtn.style.display = 'none';
    } else {
        dealThirdCard(deck);
    }
}

function dealThirdCard(deck) {
    card3 = deck.pop();
    document.getElementById('card3').style.display = 'block';
    card3Elem.textContent = card3;

    const low = Math.min(card1, card2);
    const high = Math.max(card1, card2);

    if (card3 > low && card3 < high) {
        resultElem.textContent = `You win! The third card is in between. You win ${betAmount * 2}!`;
        walletBalance += betAmount * 2;
        updateWalletDisplay();
        playAgainBtn.style.display = 'block';
    } else if (card3 === card1 || card3 === card2) {
        resultElem.textContent = "Third card matches one of the first two! Your bet is doubled for the next round.";
        doubleNextRound = true;
        doubleBtn.style.display = 'block';
        playAgainBtn.style.display = 'none';
    } else {
        resultElem.textContent = `You lose! The third card is not in between.`;
        walletBalance -= betAmount;
        updateWalletDisplay();
        playAgainBtn.style.display = 'block';
    }
    dealBtn.style.display = 'none';
}

function updateWalletDisplay() {
    walletElem.textContent = `Wallet: $${walletBalance}`;
}

function playAgain() {
    if (doubleNextRound) {
        betAmount *= 2; // Double the bet for the next round
        doubleNextRound = false;
    }
    dealBtn.style.display = 'block';
    playAgainBtn.style.display = 'none';
    doubleBtn.style.display = 'none';
    card1Elem.textContent = '';
    card2Elem.textContent = '';
    card3Elem.textContent = '';
    resultElem.textContent = '';
}

function generateDeck() {
    let deck = [];
    for (let i = 2; i <= 14; i++) {
        deck.push(i, i, i, i); // Each card appears 4 times
    }
    return deck.sort(() => Math.random() - 0.5); // Shuffle the deck
}

dealBtn.addEventListener('click', dealCards);
playAgainBtn.addEventListener('click', playAgain);
doubleBtn.addEventListener('click', playAgain);

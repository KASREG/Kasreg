// Deck of cards (2-10, J, Q, K, A)
const deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"].flatMap(card => [card, card, card, card]);

// Convert face cards to their numeric values
function cardValue(card) {
    if (card === "J") return 11;
    if (card === "Q") return 12;
    if (card === "K") return 13;
    if (card === "A") return 14;
    return card;
}

// Select elements
const card1Elem = document.querySelector('#card1 span');
const card2Elem = document.querySelector('#card2 span');
const card3Elem = document.querySelector('#card3 span');
const resultElem = document.getElementById('result');
const dealBtn = document.getElementById('deal-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const betInput = document.getElementById('bet');

let card1, card2, card3, betAmount;

function dealCards() {
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    
    // Deal two cards
    card1 = shuffledDeck.pop();
    card2 = shuffledDeck.pop();
    betAmount = Number(betInput.value);

    card1Elem.textContent = card1;
    card2Elem.textContent = card2;
    card3Elem.textContent = '';
    resultElem.textContent = '';

    if (cardValue(card1) === cardValue(card2)) {
        resultElem.textContent = "It's a tie! You get your money back.";
        playAgainBtn.style.display = 'block';
        dealBtn.style.display = 'none';
    } else if (Math.abs(cardValue(card1) - cardValue(card2)) === 1) {
        resultElem.textContent = "The cards are consecutive. You lose this round.";
        playAgainBtn.style.display = 'block';
        dealBtn.style.display = 'none';
    } else {
        dealBtn.textContent = 'Deal Third Card';
        dealBtn.onclick = dealThirdCard;
    }
}

function dealThirdCard() {
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    
    // Deal the third card
    card3 = shuffledDeck.pop();
    card3Elem.textContent = card3;

    const low = Math.min(cardValue(card1), cardValue(card2));
    const high = Math.max(cardValue(card1), cardValue(card2));

    if (cardValue(card3) > low && cardValue(card3) < high) {
        resultElem.textContent = `You win! The third card is in between. You win ${betAmount * 2}!`;
    } else {
        resultElem.textContent = `You lose! The third card is not in between. You lose your bet of ${betAmount}.`;
    }

    playAgainBtn.style.display = 'block';
    dealBtn.style.display = 'none';
}

function playAgain() {
    dealBtn.textContent = 'Deal Cards';
    dealBtn.style.display = 'block';
    playAgainBtn.style.display = 'none';
    card1Elem.textContent = '';
    card2Elem.textContent = '';
    card3Elem.textContent = '';
    resultElem.textContent = '';
}

dealBtn.addEventListener('click', dealCards);
playAgainBtn.addEventListener('click', playAgain);

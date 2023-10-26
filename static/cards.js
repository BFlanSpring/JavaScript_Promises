document.addEventListener('DOMContentLoaded', function () {
    let deckId = '';

    async function createNewDeck() {
        try {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
            const data = await response.json();

            if (data.success) {
                deckId = data.deck_id;
                document.getElementById('cardInfo').textContent = '';
                enableDrawButton();
            } else {
                console.error('Failed to create a new deck.');
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    }
    
    async function drawCard() {
        try {
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const data = await response.json();

            if (data.success) {
                const card = data.cards[0];
                const cardInfo = `${card.value} of ${card.suit}`;
                const cardInfoDiv = document.getElementById('cardInfo');
                cardInfoDiv.textContent = cardInfo + '\n' + cardInfoDiv.textContent;
            } else {
                console.error('Failed to draw a card.');
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    }
    function enableDrawButton() {
        document.getElementById('drawButton').disabled = false;
    }

    document.getElementById('startButton').addEventListener('click', createNewDeck);

    document.getElementById('drawButton').addEventListener('click', drawCard);
});


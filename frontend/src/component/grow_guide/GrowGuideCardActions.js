export const toggleCard = (cardIndex) => {
    const card = document.getElementById(`${cardIndex}`);
    card.classList.toggle('is-flipped');

    const isFlippedCards = Array.prototype.slice.call(document.querySelectorAll('.is-flipped'));

    isFlippedCards.forEach((isFlippedCard) => {
        if (parseInt(isFlippedCard.id) !== cardIndex && !isFlippedCard.classList.contains('pin')) {
            isFlippedCard.classList.remove('is-flipped');
        }
    })
}

export const pinCard = (event, index) => {
    event.stopPropagation();
    document.getElementById(`pin-icon-${index}`).classList.toggle('active')
    document.getElementById(`${index}`).classList.toggle('pin')
}
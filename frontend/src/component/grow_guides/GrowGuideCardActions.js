import {Vegetables} from "./Descriptions";

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

export const pinCard = (event, index, id) => {
    event.stopPropagation();
    Vegetables[id].is_pinned = !Vegetables[id].is_pinned;
    document.getElementById(`pin-icon-${index}`).classList.toggle('active')
    document.getElementById(`${index}`).classList.toggle('pin')
}

export const heartCard = (event, index) => {
    event.stopPropagation();
    document.getElementById(`heart-icon-${index}`).classList.toggle('active')
}
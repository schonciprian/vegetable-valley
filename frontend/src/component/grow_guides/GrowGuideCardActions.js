import {Vegetables} from "./Descriptions";

export const toggleCard = (cardIndex) => {
    const card = document.getElementById(`${cardIndex}`);
    card.classList.toggle('is-flipped');
    console.log(card);

    const isFlippedCards = Array.prototype.slice.call(document.querySelectorAll('.is-flipped'));
    console.log(isFlippedCards);
    console.log(cardIndex);

    isFlippedCards.forEach((isFlippedCard) => {
        if ((isFlippedCard.id) !== cardIndex && !isFlippedCard.classList.contains('pin')) {
            isFlippedCard.classList.remove('is-flipped');
        }
    })
}

export const pinCard = (event, index, id) => {
    event.stopPropagation();
    Vegetables[id].is_pinned = !Vegetables[id].is_pinned;
    document.getElementById(`pin-icon-${id}`).classList.toggle('active')
    document.getElementById(`${id}`).classList.toggle('pin')
}

export const heartCard = (event, index, id) => {
    event.stopPropagation();
    document.getElementById(`heart-icon-${index}`).classList.toggle('active')

    if(Vegetables[id].types.includes("Favorite")){
        Vegetables[id].types.splice(Vegetables[id].types.indexOf("Favorite"), 1);
        return;
    }
    Vegetables[id].types.push("Favorite");
}
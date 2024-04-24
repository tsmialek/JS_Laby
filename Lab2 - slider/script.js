'use strict';

const cards = [...document.querySelectorAll('.card')];
console.log(cards);

const chooseBtns = [...document.querySelectorAll('.choose-btn')];
console.log(chooseBtns);

const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');

// move cards to the right or left
const difCard = () => {
    cards.forEach((card, index) => {
        card.className = 'card';
        card.classList.add(`card-${index}`);
    });

    updateSelectedButton();
};

// select btn manually
const selectBtn = btn => {
    chooseBtns.forEach(btn => {
        btn.classList.remove('selected');
    });

    btn.classList.add('selected');
    console.log(`btn ${btn.classList[1]} clicked`);
};

// move selected card to middle
const setCardToMiddle = cardNum => {
    while (cards[2].dataset.btn != cardNum) {
        cards.push(cards.shift());
        difCard();
    }
};

// choose middle card by clickind on corresponding button
chooseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        selectBtn(btn);
        setCardToMiddle(btn.dataset.card);
    });
});

// change button style when card is moved
const updateSelectedButton = () => {
    // set all buttons to unselected
    chooseBtns.forEach(btn => {
        btn.classList.remove('selected');
    });

    // get the value of the middle card
    const middleCardBtnValue = document.querySelector('.card-2').dataset.btn;
    const selectedBtn = document.querySelector(`.btn${middleCardBtnValue}`);

    // set the middle card button to selected
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
    }
};

const nextCard = () => {
    cards.push(cards.shift());
    difCard();
};

nextBtn.addEventListener('click', nextCard);

prevBtn.addEventListener('click', () => {
    cards.unshift(cards.pop());
    difCard();
});

// select button on page load
updateSelectedButton();
setInterval(nextCard, 4000);

// toDO:
// 1. powiększanie i pouzowanie kart
// 2. wybieranie karty za pomocą przycisku
// 3. refactor

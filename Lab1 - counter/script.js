'use strict';

// setting up variables
const addButton = document.querySelector('#add');
const delButton = document.querySelector('#del');
const inputContainer = document.querySelector('.input-container');
let inputs = Array.from(document.querySelectorAll('.input-field'));

const sum = document.querySelector('#sum');
const avg = document.querySelector('#avg');
const min = document.querySelector('#min');
const max = document.querySelector('#max');

// initializing array with input values
const inputsArr = [];

// setting up input listeners
const initInputListeners = () => {
    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            if (input.value.trim().length > 0) {
                input.classList.add('active');
            } else {
                input.classList.remove('active');
            }
            updateArr();
            updateResults();
        });
    });
};

// initial update
initInputListeners();

// updating array with input values
const updateArr = function () {
    inputsArr.length = 0;
    inputs.forEach((input) => {
        inputsArr.push(Number(input.value));
    });
};

// display results
const updateResults = function () {
    sum.textContent = inputsArr.reduce((acc, cur) => acc + cur, 0);
    avg.textContent =
        inputsArr.reduce((acc, cur) => acc + cur, 0) / inputsArr.length;
    min.textContent = Math.min(...inputsArr);
    max.textContent = Math.max(...inputsArr);
};

// adding new input field
addButton.addEventListener('click', () => {
    const newInput = document.createElement('input');
    newInput.classList.add('input-field');
    inputContainer.appendChild(newInput);

    inputs = document.querySelectorAll('.input-field');
    initInputListeners();
    updateArr();
    updateResults();
});

// deleting empty input fields
delButton.addEventListener('click', () => {
    Array.from(inputs).forEach((input) => {
        if (!input.classList.contains('active'))
            inputContainer.removeChild(input);
    });

    inputs = document.querySelectorAll('.input-field');
    initInputListeners();
    updateArr();
    updateResults();
});

// sprbowac zrobic to samo ale bez ustawiania inputs na nowo tylko z dodawaniem nowych do istniejacej tablicy
// i z usuwaniem z tej tablicy

//można też tak
//const inputs = [...document.querySelectorAll('.input-field')];

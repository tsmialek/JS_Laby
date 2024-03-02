'use strict';

const num1 = document.querySelector('#num1');
const num2 = document.querySelector('#num2');
const num3 = document.querySelector('#num3');
const num4 = document.querySelector('#num4');

const sumResult = document.querySelector('#sum');
const avgResult = document.querySelector('#avg');
const minResult = document.querySelector('#min');
const maxResult = document.querySelector('#max');

num1.addEventListener('input', updateResults);
num2.addEventListener('input', updateResults);
num3.addEventListener('input', updateResults);
num4.addEventListener('input', updateResults);

function sum() {
  return (
    parseFloat(num1.value) +
    parseFloat(num2.value) +
    parseFloat(num3.value) +
    parseFloat(num4.value)
  );
}

function avg() {
  return (
    parseFloat(num1.value) +
    parseFloat(num2.value) +
    parseFloat(num3.value) +
    parseFloat(num4.value) / 4
  );
}

function min() {
  return Math.min(
    parseFloat(num1.value),
    parseFloat(num2.value),
    parseFloat(num3.value),
    parseFloat(num4.value)
  );
}

function max() {
  return Math.max(
    parseFloat(num1.value),
    parseFloat(num2.value),
    parseFloat(num3.value),
    parseFloat(num4.value)
  );
}

function updateResults() {
  sumResult.textContent = sum();
  avgResult.textContent = avg();
  minResult.textContent = min();
  maxResult.textContent = max();
}

"use strict";

const inputContainer = document.getElementById(`input=container`);
const countdownForm = document.getElementById(`countdownForm`);
const dateEL = document.getElementById(`date-picker`);

let countdownTitle = ``;
let countdownDate = ``;

//? set dat input minimum with todays date

const today = new Date().toISOString().split(`T`)[0];

//? event listeners

//? takes values from form input
function updateCountdown(e) {
  e.preventDefault();

  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  console.log(countdownDate, countdownTitle);
}

countdownForm.addEventListener(`submit`, updateCountdown);

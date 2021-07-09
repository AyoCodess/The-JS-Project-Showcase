"use strict";

const inputContainer = document.getElementById(`input=container`);
const countdownForm = document.getElementById(`countdownForm`);
const dateEL = document.getElementById(`date-picker`);

const countdownEl = document.getElementById(`countdown`);
const countdownElTitle = document.getElementById(`countdown-title`);
const countdownBtn = document.getElementById(`countdown-button`);

let countdownTitle = ``;
let countdownDate = ``;
let countdownValue = Date;

//? set dat input minimum with todays date

const today = new Date().toISOString().split(`T`)[0];

//? event listeners

//? takes values from form input
function updateCountdown(e) {
  e.preventDefault();

  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  //? get number version of current date

  countdownValue = new Date(countdownDate).getTime();

  console.log(countdownValue);
}

countdownForm.addEventListener(`submit`, updateCountdown);

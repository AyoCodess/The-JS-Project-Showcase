"use strict";

const inputContainer = document.getElementById(`input-container`);
const countdownForm = document.getElementById(`countdownForm`);
const dateEL = document.getElementById(`date-picker`);

const countdownEl = document.getElementById(`countdown`);
const countdownElTitle = document.getElementById(`countdown-title`);
const countdownBtn = document.getElementById(`countdown-button`);
const timeElements = document.querySelectorAll(`span`);

let countdownTitle = ``;
let countdownDate = ``;
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//? set dat input minimum with todays date

const today = new Date().toISOString().split(`T`)[0];

//? populate countdown and complete UI

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();

    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //* populate countdown

    countdownElTitle.textContent = `${countdownTitle}`;

    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    //? hide form

    inputContainer.hidden = true;

    //? show counrdonw

    countdownEl.hidden = false;
  }, 1000);
}

//? event listeners

//? takes values from form input
function updateCountdown(e) {
  e.preventDefault();

  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  //? get number version of current date

  countdownValue = new Date(countdownDate).getTime();

  updateDOM();
}

//? rest all values

function reset() {
  //? hide coutdown, show form
  countdownEl.hidden = true;
  inputContainer.hidden = false;

  //? stop the coutdowm

  clearInterval(countdownActive);

  //? reset all values

  countdownTitle = ``;
  countdownDate = ``;
}
countdownForm.addEventListener(`submit`, updateCountdown);
countdownBtn.addEventListener(`click`, reset);

"use strict";

const inputContainer = document.getElementById(`input-container`);
const countdownForm = document.getElementById(`countdownForm`);
const dateEL = document.getElementById(`date-picker`);

const countdownEl = document.getElementById(`countdown`);
const countdownElTitle = document.getElementById(`countdown-title`);
const countdownBtn = document.getElementById(`countdown-button`);
const timeElements = document.querySelectorAll(`span`);

const completeEl = document.getElementById(`complete`);
const completeElinfo = document.getElementById(`complete-info`);
const completeBtn = document.getElementById(`complete-button`);

let countdownTitle = ``;
let countdownDate = ``;
let countdownValue = Date;
let countdownActive;

//? local storage
let savedCountDown;

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

    //? hide input

    inputContainer.hidden = true;

    //? if countdown has ended show compelete

    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElinfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      //? show countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;

      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, 1000);
}

//? event listeners

//? takes values from form input
function updateCountdown(e) {
  e.preventDefault();

  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  //? local storage
  savedCountDown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem(`countdown`, JSON.stringify(savedCountDown));

  //?  check for valid date

  if (countdownDate === ``) {
    alert(`Please select the date for the countdown.`);
  } else {
    //? get number version of current date

    countdownValue = new Date(countdownDate).getTime();

    updateDOM();
  }
}

//? rest all values

function reset() {
  //? hide coutdown, show form
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  completeEl.hidden = true;

  //? stop the coutdowm

  clearInterval(countdownActive);

  //? reset all values

  countdownTitle = ``;
  countdownDate = ``;

  localStorage.removeItem(`countdown`);
}

function restorePreviouscountdown() {
  if (localStorage.getItem(`countdown`)) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem(`countdown`));
    countdownTitle = savedCountDown.title;
    countdownDate = savedCountDown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

countdownForm.addEventListener(`submit`, updateCountdown);
countdownBtn.addEventListener(`click`, reset);

completeBtn.addEventListener(`click`, reset);

//? on load, check local storage

restorePreviouscountdown();

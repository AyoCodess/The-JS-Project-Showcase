"use strict";

const button = document.getElementById(`button`);
const audioElement = document.getElementById(`audio`);

//? on load alert

alert(
  `We are still working on getting an actual Joker text-to-speech API to read the jokes aloud. For the meantime, enjoy the current voice.`
);

//? Disable/Enable button

function toggleButton() {
  button.disabled = !button.disabled;
}

function resetButtonText() {
  button.textContent = `Joker, tell me a joke.`;
}

//? calling text-to-speech api with joke
function tellMe(joke) {
  VoiceRSS.speech({
    key: "970fa90033b04604871b3dcf69072515",
    src: joke,
    hl: "en-gb",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//? Get jokes from joke api

let joke = "";

async function getJokes() {
  try {
    const apiURL = `https://v2.jokeapi.dev/joke/Dark,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;

    const response = await fetch(apiURL);

    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    }

    if (data.joke) {
      joke = `${data.joke}`;
    }

    tellMe(joke);

    //? disable button while joke is playing

    button.textContent = `I'm telling you a joke...`;
    toggleButton();
  } catch (error) {
    console.error(error);
  }
}

//? event listens
button.addEventListener(`click`, getJokes);
audioElement.addEventListener(`ended`, toggleButton);
audioElement.addEventListener(`ended`, resetButtonText);

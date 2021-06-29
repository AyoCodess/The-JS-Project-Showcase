"use strict";

const button = document.getElementById(`button`);
const audioElement = document.getElementById(`audio`);

//? on load alert

alert(
  `We are still working on getting an actual Joker text-to-speech API to read the jokes aloud. For the meantime, enjoy the current voice.`
);

//? text-speech-SDK

const VoiceRSS = {
  speech: function (e) {
    this._validate(e), this._request(e);
  },
  _validate: function (e) {
    if (!e) throw "The settings are undefined";
    if (!e.key) throw "The API key is undefined";
    if (!e.src) throw "The text is undefined";
    if (!e.hl) throw "The language is undefined";
    if (e.c && "auto" != e.c.toLowerCase()) {
      var a = !1;
      switch (e.c.toLowerCase()) {
        case "mp3":
          a = new Audio().canPlayType("audio/mpeg").replace("no", "");
          break;
        case "wav":
          a = new Audio().canPlayType("audio/wav").replace("no", "");
          break;
        case "aac":
          a = new Audio().canPlayType("audio/aac").replace("no", "");
          break;
        case "ogg":
          a = new Audio().canPlayType("audio/ogg").replace("no", "");
          break;
        case "caf":
          a = new Audio().canPlayType("audio/x-caf").replace("no", "");
      }
      if (!a) throw "The browser does not support the audio codec " + e.c;
    }
  },
  _request: function (e) {
    var a = this._buildRequest(e),
      t = this._getXHR();
    (t.onreadystatechange = function () {
      if (4 == t.readyState && 200 == t.status) {
        if (0 == t.responseText.indexOf("ERROR")) throw t.responseText;
        // new Audio(t.responseText).play();
        audioElement.src = t.responseText;
        audioElement.play();
      }
    }),
      t.open("POST", "https://api.voicerss.org/", !0),
      t.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      ),
      t.send(a);
  },
  _buildRequest: function (e) {
    var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec();
    return (
      "key=" +
      (e.key || "") +
      "&src=" +
      (e.src || "") +
      "&hl=" +
      (e.hl || "") +
      "&v=" +
      (e.v || "") +
      "&r=" +
      (e.r || "") +
      "&c=" +
      (a || "") +
      "&f=" +
      (e.f || "") +
      "&ssml=" +
      (e.ssml || "") +
      "&b64=true"
    );
  },
  _detectCodec: function () {
    var e = new Audio();
    return e.canPlayType("audio/mpeg").replace("no", "")
      ? "mp3"
      : e.canPlayType("audio/wav").replace("no", "")
      ? "wav"
      : e.canPlayType("audio/aac").replace("no", "")
      ? "aac"
      : e.canPlayType("audio/ogg").replace("no", "")
      ? "ogg"
      : e.canPlayType("audio/x-caf").replace("no", "")
      ? "caf"
      : "";
  },
  _getXHR: function () {
    try {
      return new XMLHttpRequest();
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml3.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
    throw "The browser does not support HTTP request";
  },
};

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

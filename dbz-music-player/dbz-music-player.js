"use strict";

const image = document.querySelector(`.img`);
const title = document.getElementById(`title`);
const artist = document.getElementById(`artist`);
const music = document.querySelector(`audio`);
const progressContainer = document.getElementById(`progress-container`);
const progress = document.getElementById(`progress`);
const currentTimeEl = document.getElementById(`current-time`);
const durationEl = document.getElementById(`duration`);
const prevBtn = document.getElementById(`prev`);
const playBtn = document.getElementById(`play`);
const nextBtn = document.getElementById(`next`);

//? Music

const songs = [
  {
    name: `BruceFaulconer-Dragonball-Z`,
    displayName: `Dragonball Z - Intro`,
    artist: `Bruce Faulconer`,
  },
  {
    name: `BruceFaulconer-SSJ-Transformation`,
    displayName: `SSJ Transformation`,
    artist: `Bruce Faulconer`,
  },
  {
    name: `BruceFaulconer-18-Vegetas-Theme`,
    displayName: `Vegeta's Theme`,
    artist: `Bruce Faulconer`,
  },
  {
    name: `BruceFaulconer-03-Trunks-Appears`,
    displayName: `Trunks Appears`,
    artist: `Bruce Faulconer`,
  },
  {
    name: `BruceFaulconer-Gohan-fights-Frieza`,
    displayName: `Gohan Fights Frieza`,
    artist: `Bruce Faulconer`,
  },
  {
    name: `BruceFaulconer-Trunks-Compendium-Prelude-to-Conflict`,
    displayName: `Dragonball Z - Intro 2`,
    artist: `Bruce Faulconer`,
  },
  {
    name: `BruceFaulconer-20-Vegeta-Super-Saiyan`,
    displayName: `Vegeta Super Saiyan`,
    artist: `Bruce Faulconer`,
  },
  {
    name: `Trunks-Cell`,
    displayName: `Trunks Vs Cell`,
    artist: `Bruce Faulconer`,
  },
  {
    name: `SSJ3-Powerup`,
    displayName: `SSJ Powerup`,
    artist: `Bruce Faulconer`,
  },
];

//? check if playing
let isPlaying = false;

//? play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace(`fa-play`, `fa-pause`);
  playBtn.setAttribute(`title`, `Pause`);
  music.play();
}

//? pause

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace(`fa-pause`, `fa-play`);
  playBtn.setAttribute(`title`, `Play`);
  music.pause();
}

//? play or pause

playBtn.addEventListener(`click`, () => {
  isPlaying ? pauseSong() : playSong();
});

//? Update DOM

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpeg`;
}

//? current song

let songIndex = 0;

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    loadSong(songs[0]);
    playSong();
    songIndex = 0;
  } else {
    loadSong(songs[songIndex]);
    playSong();
  }
}

function prevSong() {
  if (songIndex === 0) {
    songIndex = songs.length;
    loadSong(songs[songIndex - 1]);
    playSong();
    songIndex--;
  }

  songIndex--;
  if (songIndex >= songs.length) {
    loadSong(songs[0]);
    playSong();
    songIndex = 0;
  } else {
    loadSong(songs[songIndex]);
    playSong();
  }
}

//? on load - select first song

loadSong(songs[songIndex]);

//? update progress bar and time

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    //? update progress bar width
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;

    //* calculate display for duration
    const durationMinutes = Math.floor(duration / 60);

    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    //? delay switching duration element to avoid not a number

    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    //* calculate display for current
    const currentTimeMinutes = Math.floor(currentTime / 60);

    let currentTimeSeconds = Math.floor(currentTime % 60);
    if (currentTimeSeconds < 10) {
      currentTimeSeconds = `0${currentTimeSeconds}`;
    }

    //? delay switching duration element to avoid not a number

    if (currentTimeSeconds) {
      currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
    }
  }
}

//? set progress bar

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  const { duration } = music;

  music.currentTime = (clickX / width) * duration;
}
//? Event Listeners

prevBtn.addEventListener(`click`, prevSong);
nextBtn.addEventListener(`click`, nextSong);
music.addEventListener(`timeupdate`, updateProgressBar);
progressContainer.addEventListener(`click`, setProgressBar);
music.addEventListener(`ended`, nextSong);

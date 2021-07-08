const image = document.querySelector(`img`);
const title = document.getElementById(`title`);
const artist = document.getElementById(`artist`);
const music = document.querySelector(`audio`);
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
    displayName: `Dragonball Z - Intro 2 (Prelude To Conflict)`,
    artist: `Bruce Faulconer`,
  },
  {
    name: `BruceFaulconer-20-Vegeta-Super-Saiyan`,
    displayName: `Vegeta Super Saiyan`,
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

//? Event Listeners

prevBtn.addEventListener(`click`, prevSong);
nextBtn.addEventListener(`click`, nextSong);

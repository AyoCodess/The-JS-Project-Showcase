const menuBars = document.getElementById(`menu-bars`);
const overlay = document.getElementById(`overlay`);
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");

//? toggle nav

function toggleNav() {
  menuBars.classList.toggle(`change`);
  //? menu active or not

  overlay.classList.toggle(`overlay-active`);

  if (overlay.classList.contains(`overlay-active`)) {
    //? animate in the menu
    overlay.classList.add(`overlay-slide-on-screen`);
  } else {
    //? animate off screen
    overlay.classList.add(`overlay-slide-off-screen`);
  }
}

menuBars.addEventListener(`click`, toggleNav);

nav1.addEventListener(`click`, toggleNav);
nav2.addEventListener(`click`, toggleNav);
nav3.addEventListener(`click`, toggleNav);
nav4.addEventListener(`click`, toggleNav);
nav5.addEventListener(`click`, toggleNav);

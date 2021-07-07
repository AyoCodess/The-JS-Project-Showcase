const menuBars = document.getElementById(`menu-bars`);
const overlay = document.getElementById(`overlay`);
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");

const navItems = [nav1, nav2, nav3, nav4, nav5];

//? control navigation animation
function navAnimation(direction1, direction2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(
      `slide-${direction1}-${i + 1}`,
      `slide-${direction2}-${i + 1}`
    );
  });
}

//? toggle nav

function toggleNav() {
  menuBars.classList.toggle(`change`);
  //? menu active or not

  overlay.classList.toggle(`overlay-active`); //? acts a boolean so we can set an if statement

  if (overlay.classList.contains(`overlay-active`)) {
    //? animate in the menu

    overlay.classList.replace(
      `overlay-slide-off-screen`,
      `overlay-slide-on-screen`
    );

    //? animate in
    navAnimation(`out`, `in`);
  } else {
    //? animate off screen

    overlay.classList.replace(
      `overlay-slide-on-screen`,
      `overlay-slide-off-screen`
    );
    //? animate out
    navAnimation(`in`, `out`);
  }
}

menuBars.addEventListener(`click`, toggleNav);

navItems.forEach((nav) => {
  nav.addEventListener(`click`, toggleNav);
});

const loader1 = document.getElementById(`loader1`);

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  loader1.hidden = true;
});

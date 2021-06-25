//! hiding API KEYS

const apiKey = config.MY_API_TOKEN;

//? DISPLAYING RESULtS

const imageContainer = document.getElementById(`image-container`);
const loader3 = document.getElementById(`loader3`);

let photosArray = [];
let readyToLoadMoreImages = false;
let currentAmountOfImagesLoaded = 0;
let specifiedAmountOfImagesLoaded = 15;
let initialLoad = true;

//? API PARAMETERS

const query = `crypto`;

//? API STRING
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${specifiedAmountOfImagesLoaded}`;

function updateURLWithnewSpecifiedAmountOfImagesLoaded(
  newSpecifiedAmountOfImagesLoaded
) {
  apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${newSpecifiedAmountOfImagesLoaded}`;
}

//* CREATE ELEMENTS FOR LINKS & PHOTOS, ADD TO DOM

//* check if all images were loaded

function imageLoader() {
  currentAmountOfImagesLoaded++;

  if (currentAmountOfImagesLoaded === specifiedAmountOfImagesLoaded) {
    readyToLoadMoreImages = true;
    loader3.hidden = true;

    specifiedAmountOfImagesLoaded = 30;
    console.log(`images per page loaded`, specifiedAmountOfImagesLoaded);
  }
}

//* Helper function to set attributes on DOM elements

function setAttributes(element, attributes) {
  for (const nameOfAtr in attributes) {
    element.setAttribute(nameOfAtr, attributes[nameOfAtr]);

    // for (const [name, value] of Object.entries(attributes)) {
    //   element.setAttribute(name, value);
    // }
  }
}

function displayPhotos() {
  currentAmountOfImagesLoaded = 0;
  console.log(`in the displayPhots function`, currentAmountOfImagesLoaded);

  specifiedAmountOfImagesLoaded = photosArray.length;
  console.log(`total images`, specifiedAmountOfImagesLoaded);

  //? RUN FUNCTION FOR EACH OBJECT IN PHOTO-ARRAY

  photosArray.forEach((photo) => {
    //? creating a direct link to JPEG of photo

    const item = document.createElement(`a`);

    setAttributes(item, {
      href: photo.urls.regular,
      target: "_blank",
    });

    //? create <img> for photo

    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //? event listener check when each is finished loading

    img.addEventListener(`load`, imageLoader);

    //* put <img> inside <a>, then put both inside .image-container</a>

    item.append(img);
    imageContainer.append(item);
  });
}

//? API CALL

async function getPhotos() {
  try {
    console.log(`original state`, initialLoad);
    const response = await fetch(apiURL);
    const data = await response.json();

    if (initialLoad) {
      updateURLWithnewSpecifiedAmountOfImagesLoaded(30);
      initialLoad = false;
    }

    photosArray = data;
    console.log(photosArray);

    console.log(`images per page loaded 2nd`, specifiedAmountOfImagesLoaded);
    displayPhotos();
  } catch (error) {
    alert(`${error}`);
  }
}

//? check to see if scrolling near bottom of page, load more photos

window.addEventListener(`scroll`, () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readyToLoadMoreImages
  ) {
    readyToLoadMoreImages = false;

    getPhotos();
  }
});

//? API LOAD

getPhotos();

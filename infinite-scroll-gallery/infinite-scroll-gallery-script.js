//! hiding API KEYS

const apiKey = config.MY_API_TOKEN;

//? DISPLAYING RESULtS

const imageContainer = document.getElementById(`image-container`);
const loader3 = document.getElementById(`loader3`);

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//? API PARAMETERS

const query = `crypto`;
const order_by = `latest`;
const per_page = `30`;

//? API STRING
const apiURL = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${query}&per_page=${per_page}&order_by=${order_by}`;

//* CREATE ELEMENTS FOR LINKS & PHOTOS, ADD TO DOM

//* check if all images were loaded

function imageLoader() {
  imagesLoaded++;
  console.log(imagesLoaded);

  if (imagesLoaded === totalImages) {
    ready = true;
    loader3.hidden = true;
    console.log(`ready =`, ready);
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
  imagesLoaded = 0;
  console.log(`in the displayPhots function`, imagesLoaded);

  totalImages = photosArray.length;
  console.log(`total images`, totalImages);

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
    const response = await fetch(apiURL);
    const data = await response.json();

    photosArray = data.results;

    displayPhotos();
  } catch (error) {
    alert(`${error}`);
  }
}

//? check to see if scrolling near bottom of page, load more photos

window.addEventListener(`scroll`, () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    console.log(`load more`);
    getPhotos();
  }
});

//? API LOAD

getPhotos();

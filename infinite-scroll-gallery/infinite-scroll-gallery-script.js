//? DISPLAYING RESULtS

const imageContainer = document.getElementById(`image-container`);
const loader = document.getElementById(`loader`);

let photosArray = [];

//? API PARAMETERS

const apiKey = `JR5tbAl5KMYdvRyX55SbkGVx2I3Fx9cDRbpg-LyCzlQ`;

const lang = `en`;
const query = `crypto`;
const order_by = `latest`;
const per_page = `30`;

//? API STRING
const apiURL = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${query}&per_page=${per_page}&order_by=${order_by}`;

//* CREATE ELEMENTS FOR LINKS & PHOTOS, ADD TO DOM

function displayPhotos() {
  //? RUN FUNCTION FOR EACH OBJECT IN PHOTO-ARRAY

  photosArray.forEach((photo) => {
    //? creating a direct link to JPEG of photo

    const item = document.createElement(`a`);

    item.setAttribute(`href`, photo.urls.regular);
    item.setAttribute(`target`, `_blank`);

    //? create <img> for photo

    const img = document.createElement("img");

    img.setAttribute(`src`, photo.urls.regular);
    img.setAttribute(`alt`, photo.alt_description);
    img.setAttribute(`title`, photo.alt_description);

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
    document.body.innerHTML = `To many API requests try again in an hour ${error}`;
    console.log(error);
  }
}

//? API LOAD

getPhotos();

const video = document.getElementById(`video`);
const pipBtn = document.getElementById(`select-share-screen-button`);
const viewScreenBtn = document.getElementById(`view-screen`);
const webCamBtn = document.getElementById(`select-webcam-screen-button`);

//promt user to select media stream, pass to video element, then play

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = mediaStream;
    video.onloadedmetadata = () => {
      video.play();
    };
  } catch (e) {
    // alert(`We have an error:`, e);
  }
}

pipBtn.addEventListener(`click`, async () => {
  try {
    //? Disable button when we click on it

    await selectMediaStream();

    pipBtn.disabled = true;

    //? button reset

    pipBtn.disabled = false;
  } catch (e) {
    alert(`We have an error:`, e);
  }
});

//? start picture in picture after screen has been selected
viewScreenBtn.addEventListener(`click`, async () => {
  try {
    await video.requestPictureInPicture();
  } catch (e) {
    alert(
      `Please select screen first by clicking the "select screen" button`,
      e
    );
  }
});

//? webcam api

const constraints = {
  video: true,
  audio: true,
};

//? check if browser supports webcam share, does it have these methods.
function hasGetUserMedia() {
  return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
}

webCamBtn.addEventListener(`click`, function () {
  hasGetUserMedia();

  if (hasGetUserMedia()) {
    webCamApiCall();
  } else {
    alert("getUserMedia() is not supported by your browser");
  }
});

async function webCamApiCall() {
  try {
    video.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
    video.play();

    video.addEventListener("loadedmetadata", async () => {
      try {
        await video.requestPictureInPicture();
      } catch (error) {
        // alert(`video load`, error);
      }
    });
  } catch (e) {
    // alert(`try again`, e);
  }
}

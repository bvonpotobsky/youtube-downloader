const HOST = "http://localhost:5000/";

const errorMessage = document.querySelector(".error-message");
const thumbnail = document.querySelector(".video-data .thumbnail img");
const title = document.querySelector(".video-data .info h2");
const downloadOptions = document.querySelector("#download-options");
const videoData = document.querySelector(".video-data");

const fetchData = async (videoURL) => {
  try {
    const response = await fetch(`${HOST}videoInfo?videoURL=${videoURL}`);
    const data = await response.json();

    let detailsNodes = {
      thumbnail,
      title,
      videoURL,
      downloadOptions,
    };

    let optionsHTML = "";

    for (let i = 0; i < data.formats.length; i++) {
      if (data.formats[i].container != "mp4") {
        continue;
      }
      optionsHTML += `
                <option value="${data.formats[i].itag}">
                  ${data.formats[i].container} - ${data.formats[i].qualityLabel}
                  </option>
                  `;
      detailsNodes.thumbnail.src =
        data.videoDetails.thumbnails[
          data.videoDetails.thumbnails.length - 1
        ].url; // get HD thumbnail img
      detailsNodes.title.innerHTML = data.videoDetails.title;
      detailsNodes.videoURL.value = videoURL;
      detailsNodes.downloadOptions.innerHTML = optionsHTML;

      videoData.style.display = "block";
      videoData.scrollIntoView({
        behavior: "smooth",
      });
    }
  } catch (err) {
    console.error(err.message);
  }
};

const getVideoButton = document.querySelector("#getVideo");

getVideoButton.addEventListener("click", () => {
  const videoURL = document.querySelector("#videoURL").value.trim();

  if (videoURL.length == 0) {
    errorMessage.textContent = "Insert the link";
    errorMessage.style.opacity = 1;

    setTimeout(() => {
      errorMessage.style.opacity = 0;
    }, 1200);

    return;
  }
  fetchData(videoURL);
});

const downloadBtn = document.getElementById("download-btn");

downloadBtn.addEventListener("click", () => {
  const videoURL = document.querySelector("#video-url").value;
  const itag = document.querySelector("#download-options").value;
  window.open(`${HOST}download?videoURL=${videoURL}&itag=${itag}`);
});

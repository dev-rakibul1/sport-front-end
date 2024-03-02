const dropContainer = document.getElementById("dropContainer");
const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
const submitBtn = document.getElementById("imageGalleryBtn");
const galleryCardParent = document.getElementById("galleryCard");
const loader = document.getElementById("loader");
const playerParent = document.getElementById("player-parent");
const playerForm = document.getElementById("playerForm");

// Random class name
const defaultClassName = ["h-stretch", "v-stretch", "big-stretch", "no-style"];
const randomIndex = Math.floor(Math.random() * defaultClassName.length);
const randomValue = defaultClassName[randomIndex];

let uploadedImage = null;

dropContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropContainer.classList.add("dragover");
});

dropContainer.addEventListener("dragleave", () => {
  dropContainer.classList.remove("dragover");
});

dropContainer.addEventListener("drop", (event) => {
  event.preventDefault();
  dropContainer.classList.remove("dragover");

  const files = event.dataTransfer.files;
  handleFile(files[0]);
});

fileInput.addEventListener("change", (event) => {
  const files = event.target.files;
  handleFile(files[0]);
});

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (uploadedImage) {
    loader.style.display = "block";

    // Get form data
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const title = document.getElementById("titleInput").value;
    const age = document.getElementById("ageInput").value;
    const danceStyle = document.getElementById("danceStyleInput").value;
    const experienceLevel = document.getElementById(
      "experienceLevelInput"
    ).value;
    const address = document.getElementById("addressInput").value;
    const description = document.getElementById("descriptionInput").value;
    const uploadedImage = document.getElementById("fileInput").files[0];

    const file = await uploadImageToImgBB(uploadedImage);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("title", title);
    formData.append("age", age);
    formData.append("danceStyle", danceStyle);
    formData.append("experienceLevel", experienceLevel);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("className", randomValue);

    // console.log("upload_images___:", upload_images);
    console.log("Form Data:", formData);

    fetch(
      `https://express-sql-ts-backend.onrender.com/api/v1/player/create-player/`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
        playerForm.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        // Hide loader after fetch completes
        loader.style.display = "none";
      });
  } else {
    alert("Please upload an image first.");
  }
});

function handleFile(file) {
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.alt = file.name;
      img.classList.add("preview-image");
      previewContainer.innerHTML = "";
      previewContainer.appendChild(img);
      uploadedImage = file;
      previewContainer.style.display = "block";
    };
  }
}

// document.getElementById("fileInput").addEventListener("change", (event) => {
//   const files = event.target.files;
//   handleFile(files[0]);
// });

// get player
fetch("https://express-sql-ts-backend.onrender.com/api/v1/player")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    playerInfo(data);
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const playerInfo = (player) => {
  const playerInfo = player.data;

  playerInfo.forEach((dancer) => {
    // Use forEach to iterate over each player
    const galleryCard = document.createElement("div");
    galleryCard.className = `${
      dancer.className ? dancer.className : "no-style"
    } gallery-effect`;

    galleryCard.innerHTML = `
          <img src="${dancer.file}" alt="" />
          <article class="content">
          <small style="letter-spacing: 3px; font-size: 14px;">${
            dancer.experienceLevel
          }</small>

            <h3>${dancer.title}</h3>
            <p>
            ${
              dancer.description.length > 100
                ? dancer.description.substring(0, 100) + "..." // Concatenate the ellipsis
                : dancer.description
            }
          </p>
          
          
          </article>
    `;

    galleryCardParent.appendChild(galleryCard);
  });
};

// // JQuery and JQuery plugins. On the main page, after the load add jquery ajax call to this rest

$(document).ready(function () {
  $.ajax({
    url: "http://numbersapi.com/1/30/date?json",
    method: "GET",
    success: function (data) {
      // Update card content with received data
      $("#cardTitle").text(data.date);
      $("#numberText").text(data.number);
      $("#foundText").text(data.found);
      $("#yearText").text(data.year);
      $("#typeText").text(data.type);
      $("#cardText").text(data.text);
      $("#cardButton").attr("href", "http://numbersapi.com/" + data.number);
      // console.log(data);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching data:", error);
    },
  });
});

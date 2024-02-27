const dropContainer = document.getElementById("dropContainer");
const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
const submitBtn = document.getElementById("createPlayerBtn");
const loader = document.getElementById("loader");
const playerParent = document.getElementById("player-parent");

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
    const goals = document.getElementById("goalsInput").value;
    const assist = document.getElementById("assistInput").value;
    const type = document.getElementById("typeInput").value;
    const active = document.getElementById("activeInput").value;
    const password = document.getElementById("passwordInput").value;
    const uploadedImage = document.getElementById("fileInput").files[0];

    const file = await uploadImageToImgBB(uploadedImage);

    // const playerData = {
    //   name,
    //   email,
    //   goals,
    //   assist,
    //   active: active === "true" ? true : false,
    //   password,
    //   type,
    //   file,
    // };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("goals", goals);
    formData.append("assist", assist);
    formData.append("type", type);
    formData.append("active", active === "true" ? true : false);
    formData.append("password", password);
    formData.append("file", file);

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
    };
  }
}

document.getElementById("fileInput").addEventListener("change", (event) => {
  const files = event.target.files;
  handleFile(files[0]);
});

// get player
fetch("https://express-sql-ts-backend.onrender.com/api/v1/player/")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    playerInfo(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const playerInfo = (player) => {
  const playerInfo = player.data;

  playerInfo.forEach((player) => {
    // Use forEach to iterate over each player
    const playerCard = document.createElement("div");
    playerCard.className = "col-12 col-md-6 col-lg-4 mb-4";

    playerCard.innerHTML = `
      <div class="card border-0">
        <div class="card-body p-0">
          <div class="player-single-items">
            <div class="player-thumbnail w-full">
              <img src="${player.file}" alt="${player.name}" />
            </div>
            <div class="player-info p-7 text-center">
              <h3 class="lead">${player.name}</h3>
              <div class="player-goals">
                <span class="">${player.goals} Goals</span>
                <span class=""> . </span>
                <span class="">${player.assist} Assist</span>
              </div>
              <button
                class="bg-blue-700 text-white rounded py-2 text-center block w-full mt-4 selected-btn"
                id="selected-btn"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    playerParent.appendChild(playerCard);
  });
};

// JQuery and JQuery plugins. On the main page, after the load add jquery ajax call to this rest

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

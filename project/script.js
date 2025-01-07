const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const screen4 = document.getElementById("screen4");
const screen2Button = document.querySelector("#screen2 .startButton");
const screen3Button = document.querySelector("#screen3 .startButton");

let selectedPropertyHTML = ''; 
let selectedCarHTML = ''; 

screen2Button.disabled = true;
screen3Button.disabled = true;

screen2Button.classList.add("disabled");
screen3Button.classList.add("disabled");

let currentScreen = 1; 
const totalScreens = 4; 

for (let i = 1; i <= totalScreens; i++) {
  if (i === 1) {
    document.getElementById(`screen${i}`).style.display = "block";
  } else {
    document.getElementById(`screen${i}`).style.display = "none";
  }
}

document.querySelectorAll(".startButton").forEach(button => {
  button.addEventListener("click", function () {
    document.getElementById(`screen${currentScreen}`).style.display = "none";

    currentScreen++;

    if (currentScreen > totalScreens) {
      currentScreen = 1;
    }

    if (currentScreen === 4) {
      const selectedItemsDiv = document.getElementById("selectedItems");

      // Display the full HTML of selected property and car
      selectedItemsDiv.innerHTML = ''; // Clear previous selections
      if (selectedPropertyHTML) {
        selectedItemsDiv.innerHTML += `
          <div class="selected-item">
            <h3>Selected Property:</h3>
            ${selectedPropertyHTML} <!-- Display full property HTML -->
          </div>
        `;
      }

      if (selectedCarHTML) {
        selectedItemsDiv.innerHTML += `
          <div class="selected-item">
            <h3>Selected Car:</h3>
            ${selectedCarHTML} <!-- Display full car HTML -->
          </div>
        `;
      }
    }

    document.getElementById(`screen${currentScreen}`).style.display = "block";

    console.log(`Current Screen: ${currentScreen}`);
  });
});

document.querySelectorAll(".backButton").forEach(button => {
  button.addEventListener("click", function () {
    document.getElementById(`screen${currentScreen}`).style.display = "none";

    currentScreen--;

    if (currentScreen > totalScreens) {
      currentScreen == 1;
    }

    document.getElementById(`screen${currentScreen}`).style.display = "block";

    console.log(`Current Screen: ${currentScreen}`);
  })
})

function getStarRating(ratingValue) {
  const fullStar = '<img src="Star 3.png" id="star" alt="Full Star">';
  const emptyStar = '<img src="Star 5.png" id="star" alt="Empty Star">';
  let fullStars = '';
  let emptyStars = '';

  for (let i = 0; i < Math.floor(ratingValue); i++) {
    fullStars += fullStar;
  }

  for (let i = 0; i < 5 - Math.floor(ratingValue); i++) {
    emptyStars += emptyStar;
  }

  return fullStars + emptyStars;
}

document.addEventListener("DOMContentLoaded", () => {
  const screen2 = document.getElementById("screen2");

  fetch("data.json")
    .then(response => response.json())
    .then(jsonData => {
      const realEstateData = jsonData.screens.realEstate.data;

      realEstateData.forEach(property => {
        const propertyDiv = document.createElement("div");
        propertyDiv.className = "property";

        const imagePath = `${property.thumbnail.dir}/${property.thumbnail.filename}`;

        propertyDiv.innerHTML = `
        <div class="property">
          <div class="property-picture">
            <img src="${imagePath}" alt="${property.name}" class="property-image" id="slika1">
          </div>
          <div class="card">
            <div class="payment">
              <p class="inPay">$${property.options.price.weekly_value}</p>
              <p class="inPay2">per week</p>
            </div>
            <div class="other">
              <h2>${property.name}</h2>
              <p>
                <img src="avatars/pete_agent.png" alt="Agent Avatar" id="agentAvatar">
                ${property.options.agent.name}
              </p>
              <span>
                <img src="svg/icons/icon-location.svg" id="iconLocation">
                ${property.options.info.text}
              </span>
              <p class="revies">
                ${getStarRating(property.options.rating.value)}
                (${property.options.rating.review_amount} reviews)
              </p>
            </div>
          </div>
        </div>
      `;

        const imageElement = propertyDiv.querySelector(".property-picture");

        imageElement.addEventListener("click", () => {
          const allPropertyDivs = screen2.querySelectorAll(".property");
          allPropertyDivs.forEach(div => {
            const propPic = div.querySelector(".property-picture");
            const checkmark = div.querySelector(".checkmark-overlay");
            if (checkmark) {
              checkmark.remove();
            }
            propPic.classList.remove("clicked");
            selectedPropertyHTML = propertyDiv.innerHTML;
            screen2Button.disabled = false;
            screen2Button.classList.remove("disabled");
          });


          const propPic = propertyDiv.querySelector(".property-picture");
          const checkmarkOverlay = document.createElement("img");
          checkmarkOverlay.src = "svg/icons/icon-checkmark.svg";
          checkmarkOverlay.className = "checkmark-overlay";
          propertyDiv.appendChild(checkmarkOverlay);

          propPic.classList.add("clicked"); 
        });

        screen2.appendChild(propertyDiv);
      });
    })
    .catch(error => {
      console.error("Error loading JSON data:", error);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const screen3 = document.getElementById("screen3");

  fetch("data.json")
    .then(response => response.json())
    .then(jsonData => {
      console.log(jsonData); 
      if (!jsonData.screens || !jsonData.screens.carsForSale || !jsonData.screens.carsForSale.data) {
        console.error("Cars for sale data is not available in the JSON.");
        return;
      }

      const carsData = jsonData.screens.carsForSale.data;

      carsData.forEach(car => {
        const carDiv = document.createElement("div");
        carDiv.className = "property"; 

        const imagePath = `${car.thumbnail.dir}/${car.thumbnail.filename}`;

        carDiv.innerHTML = `
        <div class="property">
          <div class="property-picture">
            <img src="${imagePath}" alt="${car.name}" class="property-image" id="slika1">
          </div>
          <div class="card">
            <div class="payment">
              <p class="inPay">$${car.options.price.value}</p >
            </div>
            <div class="other">
              <h2>${car.name}</h2>
              <p>${car.description}</p>
              <ul class="option">
                ${car.options.meta.items.map(item => `<li>${item}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
      `;
        
        const imageElement = carDiv.querySelector(".property-picture");

        imageElement.addEventListener("click", () => {
          const allCarDivs = screen3.querySelectorAll(".property");
          allCarDivs.forEach(div => {
            const carPic = div.querySelector(".property-picture");
            const checkmark = div.querySelector(".checkmark-overlay");
            if (checkmark) {
              checkmark.remove();
            }
            carPic.classList.remove("clicked");
          });

          const carPic = carDiv.querySelector(".property-picture");
          const checkmarkOverlay = document.createElement("img");
          checkmarkOverlay.src = "svg/icons/icon-checkmark.svg";
          checkmarkOverlay.className = "checkmark-overlay";
          carDiv.appendChild(checkmarkOverlay);

          carPic.classList.add("clicked"); 
          selectedCarHTML = carDiv.innerHTML;
          screen3Button.disabled = false;
          screen3Button.classList.remove("disabled");
        });

        screen3.appendChild(carDiv);
      });
    })
    .catch(error => console.error("Error fetching data:", error));
});






const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const screen4 = document.getElementById("screen4");

const screen2Button = document.querySelector("[data-screen='screen2'] [data-role='startButton']");
const screen3Button = document.querySelector("[data-screen='screen3'] [data-role='startButton']");

const selectedItemsDiv = document.getElementById("selectedItems");
let selectedPropertyHTML = '';
let selectedCarHTML = '';

toggleDisabled(screen2Button, true);
toggleDisabled(screen3Button, true);

let currentScreen = 1;
const totalScreens = 4;

screen2.className = "hidden";
screen3.className = "hidden";
screen4.className = "hidden";

function toggleDisabled(element, isDisabled) {
  if (isDisabled) {
    element.disabled = true;
    element.classList.add("disabled");
  } else {
    element.disabled = false;
    element.classList.remove("disabled");
  }
}

function addCheckmarkOverlay(propertyDiv, screen, button) {
  const allPropertyDivs = screen.querySelectorAll(".property");
  allPropertyDivs.forEach(div => {
    const propPic = div.querySelector(".property-picture");
    const checkmark = div.querySelector(".checkmark-overlay");
    if (checkmark) {
      checkmark.remove();
    }
    propPic.classList.remove("clicked");
  });

  const propPic = propertyDiv.querySelector(".property-picture");
  const checkmarkOverlay = document.createElement("img");
  checkmarkOverlay.src = "svg/icons/icon-checkmark.svg";
  checkmarkOverlay.className = "checkmark-overlay";
  propertyDiv.appendChild(checkmarkOverlay);

  propPic.classList.add("clicked");

  if (screen === screen2) {
    selectedPropertyHTML = propertyDiv.innerHTML;
  } else if (screen === screen3) {
    selectedCarHTML = propertyDiv.innerHTML;
  }
  toggleDisabled(button, false);
}

function getStarRating(ratingValue) {

  // also, name the pictures accordingly. "Star 3.png" is actually one filled star?
  const fullStar = '<img src="full-star.png" id="star" alt="Full Star">';
  const emptyStar = '<img src="empty-star.png" id="star" alt="Empty Star">';
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

document.addEventListener("click", function(event) {
  if (event.target.matches(".startButton")) {

    document.getElementById(`screen${currentScreen}`).style.display = "none";

    currentScreen++;
    if (currentScreen > totalScreens) {
      currentScreen = 1;
    }

    if (currentScreen === 4) {
      selectedItemsDiv.innerHTML = '';
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
  } else if (event.target.matches(".backButton")) {

    document.getElementById(`screen${currentScreen}`).style.display = "none";

    currentScreen--;

    // what's the use-case here so that this if block is required?
    // if we go `currentScreen--` WHEN does currentScreen ever become >= totalScreens? (so this reset becomes needed)

    document.getElementById(`screen${currentScreen}`).style.display = "block";

    console.log(`Current Screen: ${currentScreen}`);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const screen2 = document.getElementById("screen2");
  const screen3 = document.getElementById("screen3");

  fetch("data.json")
    .then(response => response.json())
    .then(jsonData => {
      const realEstateData = jsonData.screens.realEstate.data;
      const carsData = jsonData.screens.carsForSale.data;

      realEstateData.forEach(property => {
        const propertyDiv = document.createElement("div");
        propertyDiv.className = "property";

        const imagePath = `${property.thumbnail.dir}/${property.thumbnail.filename}`;

        /**
         * function composeTemplate(nesto, img) {
         *
         *  return `ovo dole ispod sto je`
         *
         * }
         */

        // tODO: research what ternary is in javascript

        propertyDiv.innerHTML = `
          <div class="property">
            <div class="property-picture">
              <img src="${imagePath}" alt="${property.name}" class="property-image" id="slika1">
            </div>
            <div class="card">
              <div class="payment">
                <p class="inPay">$${property.options.price.weekly_value ? property.options.price.weekly_value : property.options.price.value}</p>
                ${ property.options.price.weekly_value && '<p class="inPay2">per week</p>'}
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
          addCheckmarkOverlay(propertyDiv, screen2, screen2Button);
        });

        screen2.appendChild(propertyDiv);
      });

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
                <p class="inPay">$${car.options.price.value}</p>
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

        const imageElement2 = carDiv.querySelector(".property-picture");
        imageElement2.addEventListener("click", () => {
          addCheckmarkOverlay(carDiv, screen3, screen3Button);
        });

        screen3.appendChild(carDiv);
      });
    })
    .catch(error => {
      console.error("Error loading JSON data:", error);
    });
});

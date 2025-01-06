let currentScreen = 0;
document.getElementById("screen2").style.display = "none";
document.querySelector(".startButton").addEventListener("click", function () {
  if (currentScreen === 0) {
    document.getElementById("screen1").style.display = "block";
    currentScreen++;
  }
  if (currentScreen === 1) {
    document.getElementById("screen1").style.display = "none";
    document.getElementById("screen2").style.display = "block";
    currentScreen++;
  }
});

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

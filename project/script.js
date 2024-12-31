let currentScreen = 0;

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

})


function getStarRating(ratingValue) {
  const fullStar = '<img src="Star 3.png" id="star" alt="Full Star">';
  const emptyStar = '<img src="Star 5.png" id="star" alt="Empty Star">';
  let fullStars = '';
  let emptyStars = '';

  // Generate the full stars
  for (let i = 0; i < Math.floor(ratingValue); i++) {
    fullStars += fullStar;
  }

  // Generate the empty stars
  for (let i = 0; i < 5 - Math.floor(ratingValue); i++) {
    emptyStars += emptyStar;
  }

  // Return the combination of full and empty stars
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
          <div class ="property">
            <img src="${imagePath}" alt="${property.name} id="slika1">
              <div class ="card">
                <div class ="payment">
                  <p>Weekly Payment: $${property.options.price.weekly_value}</p>
                </div>
                <div class ="other">
                  <h2>${property.name}</h2>
                  <p><img src="avatars/pete_agent.png" alt="Agent Avatar" id="agentAvatar"> ${property.options.agent.name}</p>                  <span><img src="svg/icons/icon-location.svg" id="iconLocation"> ${property.options.info.text}</span>
                  <p>${getStarRating(property.options.rating.value)} (${property.options.rating.review_amount} reviews)</p>
                </div>
              </div>
          </div>
        `;

        screen2.appendChild(propertyDiv);
      });
    })
    .catch(error => {
      console.error("Error loading JSON data:", error);
    });
    
});



let green = "rgb(0, 255, 0)";
let red = "rgb(255, 0, 0)";

document.querySelectorAll(".klasa").forEach(klasa => {
  klasa.addEventListener("click", function () {

    let selectedColor = window.getComputedStyle(this).backgroundColor;
    const text = document.querySelector(".paragraf");
    text.style.color = selectedColor;

    if (selectedColor == red)
    {
      text.textContent = "red";
    }
    else if (selectedColor == green)
    {
      text.textContent = "green";
    }
    else {
      text.textContent = "blue";
    }

 });
});

const words = ["ronalod", "messi", "ronaldinjo", "ferran", "husko", "begic"]
let current = 0;

document.querySelector(".buttoon").addEventListener("click", function () {

  const text = document.querySelector(".paragraf");
  text.textContent = words[current];
  current = Math.floor(Math.random() * 6);
  document.querySelectorAll(".field input").forEach(input => {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;

    const message = `Hi, my name is ${name}. I am ${age} years old and I live in ${city}.`;
    console.log(message);
  });
});

const colors = ["red", "blue", "green"];

document.querySelector(".box").addEventListener("click", function () {
  let buttoon = document.querySelector(".buttoon");
  buttoon.style.backgroundColor =  colors[Math.floor(Math.random() * 4)];
});  



/*
fevenkitsune.page -> index.js
*/

function helloButton() {
  document.getElementById("headerText").style.color = getRandomColor();
}

function getRandomColor() {
  // https://stackoverflow.com/questions/1484506/random-color-generator
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getTextColor() {
  return getComputedStyle(document.documentElement).getPropertyValue("--text-color");
}

// Set SVG color based on text color.
window.addEventListener('load', function () {
  // nightmare nightmare nightmare
  var svgGithub = document.querySelector(".svgGithub").contentDocument.getElementsByClassName("svgGithubPath");
  for (let pathItem of svgGithub) {
    pathItem.setAttribute("fill", getTextColor());
  }
})

document.getElementById("headerText").addEventListener("click", helloButton);
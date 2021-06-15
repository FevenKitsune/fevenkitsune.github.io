/*
fevenkitsune.page -> index.js
*/

function headerColor() {
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

document.getElementById("headerText").addEventListener("click", headerColor);
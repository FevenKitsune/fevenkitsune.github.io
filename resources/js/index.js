/*
fevenkitsune.page -> index.js
*/

function init() {
    document.getElementById("title-head").addEventListener("click", headerColor);
}

function headerColor() {
    document.getElementById("title-head").style.color = getRandomColor();
}

function getRandomColor() {
    // https://stackoverflow.com/questions/1484506/random-color-generator
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

init();
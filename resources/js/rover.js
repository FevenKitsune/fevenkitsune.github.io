/*
fevenkitsune.page -> rover.js
*/

class Rover {
    roverWidth = 2;
    roverLength = 150;
    translateTime = 1000;

    constructor(posx, posy, angle) {
        this.posx = posx;
        this.posy = posy;
        this.angle = angle;
        this.accelerationAngle = 0;
        this.accelerationSpeed = 0;
        this.targetAngle = 0;
        this.angleTranslationStartTime = 0;
        this.targetSpeed = 0;
    }
    setTargetAngle(newAngle) {
        if (this.targetAngle != newAngle) {
            let time = new Date();
            this.targetAngle = newAngle;
            this.angleTranslationStartTime = time.getTime();
        }
    }

    updateAngle() {
        let time = new Date();
        // Note: This doesn't check if the animation finished. We assume the sinusoidal algoithm will reach the target angle in the set timespan.
        if (time.getTime() - this.angleTranslationStartTime < this.translateTime) {
            this.angle = ((this.targetAngle - this.angle) / 2) * -Math.cos((time.getTime() - this.angleTranslationStartTime) / ((this.translateTime * 2) / (2 * Math.PI))) + ((this.targetAngle + this.angle) / 2);
        }
    }
}

let roverA = new Rover(50, 50, 0);

function init() {
    window.requestAnimationFrame(draw);
}

function map(value, valueMinimum, valueMaximum, outputMinimum, outputMaximum) {
    return (value - outputMinimum) / (valueMaximum - valueMinimum) * (outputMaximum - outputMinimum) + outputMinimum;
}

function draw() {
    var cvs = document.getElementById('test-canvas');
    var ctx = cvs.getContext('2d');
    var time = new Date();
    roverA.updateAngle();
    roverA.setTargetAngle(map(time.getSeconds(), 0, 60, 0, 360));
    cvs.style.width = '100%';
    cvs.style.height = '50vh';
    cvs.width = cvs.offsetWidth;
    cvs.height = cvs.offsetHeight;
    roverA.roverLength = cvs.height / 3;
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.save();
    //ctx.translate(roverA.posx, roverA.posy);
    ctx.translate(cvs.width / 2, cvs.height / 2);
    ctx.rotate(roverA.angle * (Math.PI / 180));
    ctx.fillStyle = '#889adf';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-roverA.roverWidth / 2, -roverA.roverLength, roverA.roverWidth, roverA.roverLength);
    ctx.fillStyle = '#363d59';
    ctx.beginPath();
    ctx.arc(0, 0, roverA.roverLength + 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
    window.requestAnimationFrame(draw);
}

init();
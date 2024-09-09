/*
fevenkitsune.page -> rover.js
*/

class Rover {

    constructor(positionX, positionY, angle, roverWidth, roverLength) {
        // Position
        this.positionX = positionX;
        this.positionY = positionY;
        this.angle = angle;
        // Scale
        this.roverWidth = roverWidth;
        this.roverLength = roverLength;
        // Animation target
        this.targetAngle = 0;
        this.targetPositionX = 0;
        this.targetPositionY = 0;
        // Animation request delta
        this.angleTranslationStartTime = 0;
        this.coordinateTranslationStartTime = 0;
        // Animation parameters
        this.translateTime = 1000;
    }

    /**
     * Ensures the new angle is unique from the previous one. Sets the reference point for time delta and targetAngle.
     * @param newAngle - Angle in degrees
     */
    setTargetAngle(newAngle) {
        if (this.targetAngle !== newAngle) {
            let time = new Date();
            this.targetAngle = newAngle;
            this.angleTranslationStartTime = time.getTime();
        }
    }

    /**
     * Calculates and sets angle of Rover using a cosinusoidal smoothing function. Utilizes the time delta (in ms) since
     * the angle was requested by setTargetAngle(newAngle).
     * Note that this function assumes the animation reaches the target angle within the desired timespan.
     */
    updateAngle() {
        let time = new Date();
        if (time.getTime() - this.angleTranslationStartTime < this.translateTime) {
            this.angle = ((this.targetAngle - this.angle) / 2) * -Math.cos((time.getTime() - this.angleTranslationStartTime) / ((this.translateTime * 2) / (2 * Math.PI))) + ((this.targetAngle + this.angle) / 2);
        }
    }

    /**
     * Ensures that the desired angle is under half a turn in front of the rover.
     */
    wrapAngle() {
        if (this.angle - this.targetAngle >= 180) {
            this.angle -= 360;
        }
    }
}

let roverSeconds = new Rover(0, 0, 0, 2, 150);
let roverMinutes = new Rover(0, 0, 0, 4, 120);
let roverHours = new Rover(0, 0, 0, 6, 80);

function init() {
    window.requestAnimationFrame(draw);
}

function map(value, valueMinimum, valueMaximum, outputMinimum, outputMaximum) {
    // Simple range-mapping function.
    return (value - outputMinimum) / (valueMaximum - valueMinimum) * (outputMaximum - outputMinimum) + outputMinimum;
}

function draw() {
    const cvs = document.getElementById('test-canvas');
    const ctx = cvs.getContext('2d');
    const time = new Date();

    // Calculate frame and update rover parameters.
    roverSeconds.updateAngle();
    roverSeconds.setTargetAngle(map(time.getSeconds(), 0, 59, 0, 354));
    roverSeconds.wrapAngle();

    roverMinutes.updateAngle();
    roverMinutes.setTargetAngle(map(time.getMinutes(), 0, 59, 0, 354));
    roverMinutes.wrapAngle();

    roverHours.updateAngle();
    roverHours.setTargetAngle(map(time.getHours() % 12 || 12, 0, 12, 0, 360));
    roverHours.wrapAngle();

    // Update canvas for dynamic resizing relative to webpage.
    //cvs.style.width = '100%';
    //cvs.style.height = '50vh';
    //cvs.width = cvs.offsetWidth;
    //cvs.height = cvs.offsetHeight;

    cvs.width = (Math.min(window.innerWidth, window.innerHeight) / 3) * 2;
    cvs.height = (Math.min(window.innerWidth, window.innerHeight) / 3) * 2;

    // Update rover position and size for dynamic resizing relative to webpage.
    roverSeconds.roverLength = cvs.height / 3;
    roverSeconds.positionX = cvs.width / 2;
    roverSeconds.positionY = cvs.height / 2;
    
    roverMinutes.roverLength = cvs.height / 3 - 10;
    roverMinutes.positionX = cvs.width / 2;
    roverMinutes.positionY = cvs.height / 2;

    roverHours.roverLength = cvs.height / 3 - 20;
    roverHours.positionX = cvs.width / 2;
    roverHours.positionY = cvs.height / 2;

    // Initialize canvas for frame.
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    // Save initial canvas position prior to translation.
    ctx.save();

    // Translate canvas to desired draw position
    ctx.translate(roverSeconds.positionX, roverSeconds.positionY);

    // Draw center point.
    ctx.fillStyle = '#889adf';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.fill();

    // Draw roverSeconds.
    ctx.save();
    ctx.rotate(roverSeconds.angle * (Math.PI / 180));
    ctx.fillStyle = '#B7313F';
    ctx.fillRect(-roverSeconds.roverWidth / 2, -roverSeconds.roverLength, roverSeconds.roverWidth, roverSeconds.roverLength);
    ctx.restore();

    // Draw roverMinutes.
    ctx.save();
    ctx.rotate(roverMinutes.angle * (Math.PI / 180));
    ctx.fillStyle = '#FFFF';
    ctx.fillRect(-roverMinutes.roverWidth / 2, -roverMinutes.roverLength, roverMinutes.roverWidth, roverMinutes.roverLength);
    ctx.restore();

    // Draw roverHours.
    ctx.save();
    ctx.rotate(roverHours.angle * (Math.PI / 180));
    ctx.fillStyle = '#FFFF';
    ctx.fillRect(-roverHours.roverWidth / 2, -roverHours.roverLength, roverHours.roverWidth, roverHours.roverLength);
    ctx.restore();

    // Draw clock background.
    ctx.strokeStyle = '#889adf';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, roverSeconds.roverLength + 10, 0, 2 * Math.PI);
    ctx.stroke();

    // Restore initial translation.
    ctx.restore();

    // Call next frame to be drawn.
    window.requestAnimationFrame(draw);
}

init();
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

let roverA = new Rover(0, 0, 0, 2, 150);

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
    roverA.updateAngle();
    roverA.setTargetAngle(map(time.getSeconds(), 0, 59, 0, 354));
    roverA.wrapAngle();

    // Update canvas for dynamic resizing relative to webpage.
    cvs.style.width = '100%';
    cvs.style.height = '50vh';
    cvs.width = cvs.offsetWidth;
    cvs.height = cvs.offsetHeight;

    // Update rover position and size for dynamic resizing relative to webpage.
    roverA.roverLength = cvs.height / 3;
    roverA.positionX = cvs.width / 2;
    roverA.positionY = cvs.height / 2;

    // Initialize canvas for frame.
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    // Save initial canvas position prior to translation.
    ctx.save();
    // Translate canvas to desired draw position
    ctx.translate(roverA.positionX, roverA.positionY);
    ctx.rotate(roverA.angle * (Math.PI / 180));
    // Draw center point.
    ctx.fillStyle = '#889adf';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.fill();
    // Draw rover.
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-roverA.roverWidth / 2, -roverA.roverLength, roverA.roverWidth, roverA.roverLength);
    // Draw clock background.
    ctx.fillStyle = '#363d59';
    ctx.beginPath();
    ctx.arc(0, 0, roverA.roverLength + 10, 0, 2 * Math.PI);
    ctx.fill();
    // Restore initial translation.
    ctx.restore();
    // Call next frame to be drawn.
    window.requestAnimationFrame(draw);
}

init();
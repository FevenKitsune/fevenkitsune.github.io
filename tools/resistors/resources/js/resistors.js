class UserException {
    constructor(message) {
        this.message = message;
        this.name = 'UserException';
    }
}

function build_values_from_bands() {
    if (arguments.length < 4) {
        throw new UserException('Cannot compute for less than 4 color bands.');
    } else if (arguments.length > 6) {
        throw new UserException('Cannot compute for more than 6 color bands.');
    }

    let value = 0;
    let multiplier = 0;
    let tolerance = 0;
    let PPM = 0;

    switch (arguments.length) {
        case 4:
            value = parseInt(arguments[0].toString() + arguments[1].toString());
            multiplier = parseInt(arguments[2].toString());
            tolerance = parseInt(arguments[3].toString());
            break;
        case 5:
            value = parseInt(arguments[0].toString() + arguments[1].toString() + arguments[2].toString());
            multiplier = parseInt(arguments[3].toString());
            tolerance = parseInt(arguments[4].toString());
            break;
        case 6:
            value = parseInt(arguments[0].toString() + arguments[1].toString() + arguments[2].toString());
            multiplier = parseInt(arguments[3].toString());
            tolerance = parseInt(arguments[4].toString());
            PPM = parseInt(arguments[5].toString());
            break;
    }

    console.log(`Value: ${value}Ω\nMultiplier: ${multiplier}\nTolerance: ${tolerance}`);
}


// https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/
const band_count_options = ['4 Bands', '5 Bands', '6 Bands'];
const band_count_radios = document.querySelector("#band_count_radios");
band_count_radios.innerHTML = band_count_options.map((count_option) =>
    `<input type="radio" name="band_count" value="${count_option}" id="${count_option}">
     <label for="${count_option}">${count_option}</label>`).join(' ');
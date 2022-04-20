class UserException {
    constructor(message) {
        this.message = message;
        this.name = 'UserException';
    }
}

function get_resistance() {
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
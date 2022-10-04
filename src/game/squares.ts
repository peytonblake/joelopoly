const SQUARES_DATA = [
    "Community Chest,2",
    "Chance,7",
    "Community Chest,17",
    "Chance,22",
    "Community Chest,33",
    "Chance,36",
    "Go,0",
    "Just Visiting,10",
    "Free Parking,20",
    "Go To Jail,30"
]

class Square {
    location: number;

    constructor(location: number) {
        this.location = location;
    }
}

export class CommunityChest extends Square {

}

export class Chance extends Square {

}

export class Go extends Square {

}

export class JustVisiting extends Square {

}

export class FreeParking extends Square {

}

export class GoToJail extends Square {

}

function loadSquares() {
    let squares: Square[] = [];
    for (const squareLine of SQUARES_DATA) {
        const squareData = squareLine.split(',');
        const squareType = squareData[0];
        const location = parseInt(squareData[1]);
        if (squareType == "Community Chest") {
            squares.push(new CommunityChest(location));
        } else if (squareType == "Chance") {
            squares.push(new Chance(location));
        } else if (squareType == "Go") {
            squares.push(new Go(location));
        } else if (squareType == "Just Visiting") {
            squares.push(new JustVisiting(location));
        } else if (squareType == "Free Parking") {
            squares.push(new FreeParking(location));
        } else if (squareType == "Go To Jail") {
            squares.push(new GoToJail(location));
        }
    }
    return squares;
}

const squares = loadSquares();
export default squares;
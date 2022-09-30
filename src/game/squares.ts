import Papa, { ParseResult } from "papaparse";

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

interface SquareLine {
    Square: string,
    Location: string;
}

function loadSquares(filePath: string) {
    let squares: Square[] = [];
    Papa.parse(filePath, {
        header: true,
        download: true,
        delimiter: ',',
        complete: (results: ParseResult<SquareLine>) => {
            for (const squareLine of results.data) {
                const location = parseInt(squareLine.Location);
                if (squareLine.Square == "Community Chest") {
                    squares.push(new CommunityChest(location));
                } else if (squareLine.Square == "Chance") {
                    squares.push(new Chance(location));
                } else if (squareLine.Square == "Go") {
                    squares.push(new Go(location));
                } else if (squareLine.Square == "Just Visiting") {
                    squares.push(new JustVisiting(location));
                } else if (squareLine.Square == "Free Parking") {
                    squares.push(new FreeParking(location));
                } else if (squareLine.Square == "Go To Jail") {
                    squares.push(new GoToJail(location));
                }
            }
        }
    })
    return squares;
}

const squares = loadSquares("/data/squares.csv");
export default squares;
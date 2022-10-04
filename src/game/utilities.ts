import { Player } from "./players";

const UTILITIES_DATA = [
    "Flashlight Batteries,12,150,75,4,10",
    "Water Filter,28,150,75,4,10"
]

export class Utility {
    name: string;
    location: number;
    ownedBy: Player | null = null;
    price: number;
    mortgage: number;
    rentMultipliers: number[];
    otherUtility: Utility | null = null;

    constructor(name: string, location: number, price: number, mortgage: number, rentMultipliers: number[]) {
        this.name = name;
        this.location = location;
        this.price = price;
        this.mortgage = mortgage;
        this.rentMultipliers = rentMultipliers;
    }

    getRent() {
        if (this.otherUtility!.ownedBy == this.ownedBy) {
            return this.rentMultipliers[1];
        }
        return this.rentMultipliers[0];
    }
}

function loadUtilities() {
    let utilities: Utility[] = [];
    for (const utilityLine of UTILITIES_DATA) {
        const utilityData = utilityLine.split(',');
        const utility = new Utility(utilityData[0], parseInt(utilityData[1]), 
                                    parseInt(utilityData[2]), parseInt(utilityData[3]),
                                    [parseInt(utilityData[4]), parseInt(utilityData[5])]);
        if (utilities.length > 0) {
            utilities[0].otherUtility = utility
            utility.otherUtility = utilities[0];
        }
        utilities.push(utility);
    }
    return utilities;
}

const utilities = loadUtilities();
export default utilities;
import { Player } from "./players";
import Papa, { ParseResult } from "papaparse";

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

interface UtilityLine {
    Name: string,
    Price: string,
    "Rent Multiplier (1 Owned)": string,
    "Rent Multiplier (2 Owned)": string,
    Mortgage: string,
    Location: string
}

function loadUtilities(filePath: string) {
    let utilities: Utility[] = [];
    Papa.parse(filePath, {
        header: true,
        download: true,
        delimiter: ',',
        complete: (results: ParseResult<UtilityLine>) => {
            for (const utilityLine of results.data) {
                const utility = new Utility(utilityLine.Name, parseInt(utilityLine.Location), 
                                            parseInt(utilityLine.Price), parseInt(utilityLine.Mortgage),
                                            [parseInt(utilityLine["Rent Multiplier (1 Owned)"]),
                                             parseInt(utilityLine["Rent Multiplier (2 Owned)"])]);
                if (utilities.length > 0) {
                    utilities[0].otherUtility = utility
                    utility.otherUtility = utilities[0];
                }
                utilities.push(utility);
            }
        }
    })
    return utilities;
}

const utilities = loadUtilities("/data/utilities.csv");
export default utilities;

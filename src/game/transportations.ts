import { Player } from "./players";
import Papa, { ParseResult } from "papaparse";

export class Transportation {
    name: string;
    location: number;
    ownedBy: Player | null = null;
    price: number;
    mortgage: number;
    rents: number[];
    otherTransportations: Transportation[] = [];

    constructor(name: string, location: number, price: number, mortgage: number, rents: number[]) {
        this.name = name;
        this.location = location;
        this.price = price;
        this.mortgage = mortgage;
        this.rents = rents;
    }

    getRent() {
        let othersOwned: number = 0;
        for (const otherTransportation of this.otherTransportations) {
            if (this.ownedBy == otherTransportation.ownedBy) {
                othersOwned++;
            }
        }
        return this.rents[othersOwned];
    }
}

interface TransportationLine {
    Name: string,
    Cost: string,
    "Rent (1 Owned)": string,
    "Rent (2 Owned)": string,
    "Rent (3 Owned)": string,
    "Rent (4 Owned)": string,
    Mortgage: string,
    Location: string
}

function loadTransportations(filePath: string) {
    let transportations: Transportation[] = [];
    Papa.parse(filePath, {
        header: true,
        download: true,
        delimiter: ',',
        complete: (results: ParseResult<TransportationLine>) => {
            for (const transportationLine of results.data) {
                const transportation = new Transportation(transportationLine.Name, parseInt(transportationLine.Location), 
                                              parseInt(transportationLine.Cost), parseInt(transportationLine.Mortgage),
                                              [parseInt(transportationLine["Rent (1 Owned)"]),
                                               parseInt(transportationLine["Rent (2 Owned)"]),
                                               parseInt(transportationLine["Rent (3 Owned)"]),
                                               parseInt(transportationLine["Rent (4 Owned)"])]);
                for (const otherTransportation of transportations) {
                    otherTransportation.otherTransportations.push(transportation);
                    transportation.otherTransportations.push(otherTransportation);
                }
                transportations.push(transportation);
            }
        }
    })
    return transportations;
}

const transportations = loadTransportations("/data/transportation.csv");
console.log(transportations);
export default transportations;

import { Player } from "./players";

const TRANSPORTATIONS_DATA = [
    "Hiking,200,5,25,50,100,200,100",
    "Rafting,200,15,25,50,100,200,100",
    "Caving,200,25,25,50,100,200,100",
    "Kayaking,200,35,25,50,100,200,100"
]

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

function loadTransportations() {
    let transportations: Transportation[] = [];
    for (const transportationLine of TRANSPORTATIONS_DATA) {
        const transportationData = transportationLine.split(',');
        const transportation = new Transportation(transportationData[0], parseInt(transportationData[2]), 
                                        parseInt(transportationData[1]), parseInt(transportationData[7]),
                                        [3, 4, 5, 6].map(i => parseInt(transportationData[i])));
        for (const otherTransportation of transportations) {
            otherTransportation.otherTransportations.push(transportation);
            transportation.otherTransportations.push(otherTransportation);
        }
        transportations.push(transportation);
    }
    return transportations;
}

const transportations = loadTransportations();
export default transportations;
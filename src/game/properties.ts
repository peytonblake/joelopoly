import { Player } from "./players";

export class Property {
    name: string;
    location: number;
    ownedBy: Player | null = null;
    price: number;
    groupProperties: Property[] = [];
    houses: number = 0;
    rents: number[];

    constructor(name: string, location: number, price: number, rents: number[]) {
        this.name = name;
        this.location = location;
        this.price = price;
        this.rents = rents;
    }

    getRent() {
        if (this.houses > 0) {
            return this.rents[this.groupProperties.length + this.houses];
        }
        let othersOwned = 0;
        for (const otherProperty of this.groupProperties) {
            if (otherProperty.ownedBy == this.ownedBy) {
                othersOwned++;
            }
        }
        return this.rents[othersOwned];
    }
}

function createGroup(properties: Property[]) {
    for (let i = 0; i < properties.length; i++) {
        for (let j = 0; j < properties.length; j++) {
            if (i != j) {
                properties[i].groupProperties.push(properties[j]);
            }
        }
    }
}
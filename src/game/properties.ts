import { Player } from "./players";
import Papa, { ParseResult } from "papaparse";

export class Property {
    name: string;
    location: number;
    ownedBy: Player | null = null;
    price: number;
    pricePerHouse: number;
    color: string;
    mortgage: number;
    groupProperties: Property[] = [];
    houses: number = 0;
    rents: number[];

    constructor(name: string, location: number, price: number, pricePerHouse: number, 
                color: string, mortgage: number, rents: number[]) {
        this.name = name;
        this.location = location;
        this.price = price;
        this.pricePerHouse = pricePerHouse;
        this.color = color;
        this.mortgage = mortgage;
        this.rents = rents;
    }

    getRent() {
        return this.rents[this.houses];
    }

    groupHasSameOwner() {
        return false;  // todo
    }
}

interface PropertyLine {
    Name: string,
    Price: string,
    "Price per house": string,
    Rent: string,
    "Rent (1 House)": string,
    "Rent (2 Houses)": string,
    "Rent (3 Houses)": string,
    "Rent (4 Houses)": string,
    "Rent (Hotel)": string,
    Mortgage: string,
    Color: string,
    Location: string
}

function loadProperties(filePath: string) {
    let properties: Property[] = [];
    Papa.parse(filePath, {
        header: true,
        download: true,
        delimiter: ',',
        complete: (results: ParseResult<PropertyLine>) => {
            const groups: Map<string, Property[]> = new Map<string, Property[]>();  
            for (const propertyLine of results.data) {
                const property = new Property(propertyLine.Name, parseInt(propertyLine.Location), 
                                              parseInt(propertyLine.Price), parseInt(propertyLine["Price per house"]),
                                              propertyLine.Color, parseInt(propertyLine.Mortgage),
                                              [parseInt(propertyLine.Rent),
                                                parseInt(propertyLine["Rent (1 House)"]),
                                                parseInt(propertyLine["Rent (2 Houses)"]),
                                                parseInt(propertyLine["Rent (3 Houses)"]),
                                                parseInt(propertyLine["Rent (4 Houses)"]),
                                                parseInt(propertyLine["Rent (Hotel)"])]);
                if (groups.has(property.color)) {
                    for (const otherProperty of groups.get(property.color)!) {
                        property.groupProperties.push(otherProperty);
                        otherProperty.groupProperties.push(property);
                    }
                    groups.get(property.color)!.push(property);
                } else {
                    groups.set(property.color, [property]);
                }
                properties.push(property);
            }
        }
    })
    return properties;
}

const properties = loadProperties("/data/properties.csv");
export default properties;

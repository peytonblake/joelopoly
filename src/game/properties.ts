import { Player } from "./players";

const PROPERTIES_DATA = [
    "Yellowstone,60,50,2,10,30,90,160,250,30,Purple,1",
    "Grand Teton,60,50,4,20,60,180,320,450,30,Purple,3",
    "Olympic,100,50,6,30,90,270,400,550,50,Cyan,6",
    "Mount Rainier,100,50,6,30,90,270,400,550,50,Cyan,8",
    "North Cascades,120,50,8,40,100,300,450,600,60,Cyan,9",
    "Yosemite,140,100,10,50,150,450,625,750,70,Pink,11",
    "Kings Canyon,140,100,10,50,150,450,625,750,70,Pink,13",
    "Sequoia,160,100,12,60,180,500,700,900,80,Pink,14",
    "Crater Lake,180,100,14,70,200,550,750,950,90,Orange,16",
    "Redwood,180,100,14,70,200,550,750,950,90,Orange,18",
    "Lassen Volcanic,200,100,16,80,220,600,800,1000,100,Orange,19",
    "Grand Canyon,220,150,18,90,250,700,875,1050,110,Red,21",
    "Bryce Canyon,220,150,18,90,250,700,875,1050,110,Red,23",
    "Zion,240,150,20,100,300,750,925,1100,120,Red,24",
    "White Sands,260,150,22,110,330,800,975,1150,130,Yellow,26",
    "Carlsbad Caverns,260,150,22,110,330,800,975,1150,130,Yellow,27",
    "Guadalupe Mountains,280,150,24,120,360,850,1025,1200,140,Yellow,29",
    "Dry Tortugas,300,200,26,130,390,900,1100,1275,150,Green,31",
    "Everglades,300,200,26,130,390,900,1100,1275,150,Green,32",
    "Biscayne,320,200,28,150,450,1000,1200,1400,160,Green,34",
    "Badlands,350,200,35,175,500,1100,1300,1500,175,Blue,37",
    "Wind Cave,400,200,50,200,600,1400,1700,2000,200,Blue,39"
]

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

function loadProperties() {
    let properties: Property[] = [];
    const groups: Map<string, Property[]> = new Map<string, Property[]>(); 
    for (const propertyLine of PROPERTIES_DATA) {
        const propertyData = propertyLine.split(',');
        const property = new Property(
            propertyData[0], 
            parseInt(propertyData[11]),
            parseInt(propertyData[1]),
            parseInt(propertyData[2]),
            propertyData[10],
            parseInt(propertyData[9]),
            [3, 4, 5, 6, 7, 8].map(i => parseInt(propertyData[i]))
        );
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
    return properties;
}

const properties = loadProperties();
export default properties;

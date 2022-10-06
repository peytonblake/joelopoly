const TAXES_DATA = [
    "Littering Tax,4,200",
    "Carbon Emissions Tax,38,100"
]

export class Tax {
    name: string;
    location: number;
    amount: number;

    constructor(name: string, location: number, amount: number) {
        this.name = name;
        this.location = location;
        this.amount = amount;
    }
}

function loadTaxes() {
    let taxes: Tax[] = [];
    for (const taxLine of TAXES_DATA) {
        const taxData = taxLine.split(',');
        taxes.push(new Tax(taxData[0], parseInt(taxData[1]), parseInt(taxData[2])));
    }
    return taxes;
}

const taxes = loadTaxes();
export default taxes;

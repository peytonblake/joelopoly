import Papa, { ParseResult } from "papaparse";

export interface Tax {
    name: string;
    location: number;
    amount: number;
}

interface TaxLine {
    Tax: string,
    Amount: string,
    Location: string
}

function loadTaxes(filePath: string) {
    let taxes: Tax[] = [];
    Papa.parse(filePath, {
        header: true,
        download: true,
        delimiter: ',',
        complete: (results: ParseResult<TaxLine>) => {
            for (const taxLine of results.data) {
                const tax = {
                    name: taxLine.Tax,
                    location: parseInt(taxLine.Location),
                    amount: parseInt(taxLine.Amount)
                }
                taxes.push(tax);
            }
        }
    })
    return taxes;
}

const taxes = loadTaxes("/data/taxes.csv");
export default taxes;

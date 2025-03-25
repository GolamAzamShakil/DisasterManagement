import { CrisisDataModel } from "./dataInterfaces";


export function extractCrisisData (source: any[] | undefined): CrisisDataModel[] | undefined {
    let extractCrisisData: CrisisDataModel[] | undefined;

    if (!source) return [];
    if(source !== undefined && typeof source === "object") {
        extractCrisisData = source.map(
            ({title, location, severity, status, description, help}) => ({title, location, severity, status, description, help})
        );
    }

    return extractCrisisData
}

export function arrangeCrisisData (source: CrisisDataModel[] | undefined): any[] {
    if (!source) return [];
    return [...source]
}
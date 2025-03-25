import { CrisisDataModelAdmin, CrisisDataModelWithID } from "../dataInterfaces";


export function extractCrisisDataA (source: any[] | undefined): CrisisDataModelAdmin[] | undefined {
    let extractCrisisData: CrisisDataModelAdmin[] | undefined;

    if (!source) return [];
    if(source !== undefined && typeof source === "object") {
        extractCrisisData = source.map(
            ({title, location, severity, status, description, help, viewable}) => ({title, location, severity, status, description, help, viewable})
        );
    }

    return extractCrisisData
}

export function arrangeCrisisDataA (source: CrisisDataModelAdmin[] | undefined): any[] {
    if (!source) return [];
    return [...source]
}

export function extractCrisisIDData (source: any[] | undefined): CrisisDataModelWithID[] | undefined {
    let extractCrisisIDData: CrisisDataModelWithID[] | undefined;

    if (!source) return [];
    if(source !== undefined && typeof source === "object") {
        extractCrisisIDData = source.map(
            ({_id, title, location, severity, status, description, help, viewable}) => ({_id, title, location, severity, status, description, help, viewable})
        );
    }

    return extractCrisisIDData
}

export function arrangeCrisisIDData (source: CrisisDataModelWithID[] | undefined): any[] {
    if (!source) return [];
    return [...source]
}
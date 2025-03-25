

import { useQuery } from "convex/react";
import { CrisisDataModel, CrisisDataModelAdmin, CrisisDataModelWithID } from "../dataInterfaces";
import { api } from "../../../convex/_generated/api";
import { arrangeCrisisDataA, arrangeCrisisIDData, extractCrisisDataA, extractCrisisIDData } from "./crisisDataProcessA";
import { arrangeCrisisData } from "../crisisDataProcess";

export function AllCrisisData(): CrisisDataModelWithID[] {
    let finalData: CrisisDataModelWithID[]
    const crisisDataWithID = extractCrisisIDData(useQuery(api.crisis.GetAllCrisisData));
    finalData = arrangeCrisisIDData(crisisDataWithID);

    return finalData;
}

export function NVCrisisApi(): CrisisDataModelAdmin[] {
    let finalData: CrisisDataModelAdmin[]
    const limit = 20
    const notViewableCrisis = extractCrisisDataA(useQuery(api.crisis.FilterNotViewableCrisisData, {limit}));
    finalData = arrangeCrisisDataA(notViewableCrisis);

    return finalData;
}
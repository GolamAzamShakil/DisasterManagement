import { useQuery } from "convex/react";
import { arrangeCrisisData,  extractCrisisData } from "./crisisDataProcess";
import { api } from "../../convex/_generated/api";
import { CrisisDataModel, CrisisDataModelAdmin } from "./dataInterfaces";


export function CrisisApiCall(): CrisisDataModel[] {
  const limit = 20
  let finalData: CrisisDataModel[];
  let crisisGeneralData: CrisisDataModel[] | undefined;
  let crisisSeverityData: CrisisDataModel[] | undefined;
  let crisisStatusData: CrisisDataModel[] | undefined;
  const crisisGeneral = extractCrisisData(
    useQuery(api.crisis.FilterViewableCrisisData, { limit })
  );
  const crisisSeverity = extractCrisisData(
    useQuery(api.crisis.FilterSevereCrisisData, { limit })
  );
  const crisisStatus = extractCrisisData(
    useQuery(api.crisis.FilterStatusCrisisData, { limit })
  );
  /* const crisisDataWrite = extractCrisisData(
    useQuery(api.crisis.CreateCrisisData)
  ) */
  
  finalData = arrangeCrisisData(crisisGeneral);
  /* if (value === "read") {
    finalData = arrangeCrisisData(crisisGeneral);
  }
  if (value === "write") {} */
  
  return finalData;
}

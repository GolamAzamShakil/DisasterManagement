import { VolunteerFullDataModel } from "./dataInterfaces";


export function arrangeVolunteerData(source: VolunteerFullDataModel[] | undefined): any[] {
    /* let extractedVolunteerData;
    if(volunteerData !== undefined && typeof volunteerData === "object") {
      extractedVolunteerData = volunteerData.map(
        ({id, userName, assignedTask, location, status, mobileNumber, email, age}) => ({id, userName, assignedTask, location, status, mobileNumber, email, age})
      );
      
    }
    return extractedVolunteerData; */

    if (!source) return [];
    return [...source]
}
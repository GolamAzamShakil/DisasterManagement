export interface VolunteerVitalDataModel {
    id: number,
    userName: string,
    assignedTask: string,
    location: string | undefined,
    status: string
}
export interface VolunteerFullDataModel extends VolunteerVitalDataModel {
    mobileNumber: number,
    email: string,
    age: number
}

export interface CrisisDataModel {
    title: string,
    location: string,
    severity: string,
    status: string,
    description: string,
    help: string,
}
export interface CrisisDataModelAdmin extends CrisisDataModel {
    viewable: boolean,
}
export interface CrisisDataModelWithID extends CrisisDataModel {
    _id: string,
    viewable: boolean,
}

export interface PersonRole {
    id: number;
    email: string;
    userName: string;
    role: string;
}
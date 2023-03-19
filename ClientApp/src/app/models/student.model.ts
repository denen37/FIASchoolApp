import { LeadershipPosition } from "./leadershipPosition.model";

export class Student {
    constructor(
        public Id: number,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public admissionNumber: string,
        public address: string,
        public leadershipPositionId: number,
        public post: LeadershipPosition,
        public sex: string,
        public religion: string,
        public nationality: string,
        public stateOfOrigin: string,
        public ethnicGroup: string,
        public lga: string,
        public skill: string,
        public admissionDate: Date,
        public hasGraduated: boolean,
        public pictureFilePath: string,
        public age: number
    ){}
}

export class Disability
{
    constructor(
        public studentId: number,
        public name: string,
        public description: string
    ){}
}
import { LeadershipPosition } from "./leadershipPosition.model";
import { MoralBehaviour } from "./moralBehaviour.model";
import { ParentStudentJunction } from "./parent.model";
import { OverallPerformance } from "./reportCard.model";
import { PaymentRecord } from "./studentPayment.model";

export class Student {
    constructor(
        public Id: number,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public admissionNumber: string,
        public currentClass: string,
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
        public age: number,
        public parentStudentJunction: ParentStudentJunction[],
        public overallPerformance: OverallPerformance[],
        public moralBehaviour: MoralBehaviour[],
        public paymentRecords: PaymentRecord[]
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
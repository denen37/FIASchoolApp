import { LeadershipPosition } from "./leadershipPosition.model";
import { MoralBehaviour } from "./moralBehaviour.model";
import { ParentStudentJunction } from "./parent.model";
import { OverallPerformance } from "./reportCard.model";
import { PaymentRecord } from "./studentPayment.model";

export class Student {
    constructor(
        public Id: number | undefined = undefined,
        public firstName: string | undefined = undefined,
        public middleName: string | undefined = undefined,
        public lastName: string | undefined = undefined,
        public dateOfBirth: Date | undefined = undefined,
        public admissionNumber: string | undefined = undefined,
        public currentClass: string | undefined = undefined,
        public address: string | undefined = undefined,
        public leadershipPositionId: number | undefined = undefined,
        public post: LeadershipPosition | undefined = undefined,
        public sex: string | undefined = undefined,
        public religion: string | undefined = undefined,
        public nationality: string | undefined = undefined,
        public stateOfOrigin: string | undefined = undefined,
        public ethnicGroup: string | undefined = undefined,
        public lga: string | undefined = undefined,
        public skill1: string | undefined = undefined,
        public skill2: string | undefined = undefined,
        public admissionDate: Date | undefined = undefined,
        public hasGraduated: boolean | undefined = undefined,
        public pictureFilePath: string | undefined = undefined,
        public age: number | undefined = undefined,
        public parentStudentJunction: ParentStudentJunction[] | undefined = undefined,
        public overallPerformance: OverallPerformance[] | undefined = undefined,
        public moralBehaviour: MoralBehaviour[] | undefined = undefined,
        public paymentRecords: PaymentRecord[] | undefined = undefined,
        public disability: Disability | undefined =undefined
    ){}
}

export class Disability
{
    constructor(
        public studentId: number | undefined = undefined,
        public isDisabled: boolean | undefined = undefined,
        public nameOfDisability: string | undefined = undefined,
        public isIll: boolean | undefined = undefined,
        public nameOfIllness: string | undefined = undefined,
        public description: string | undefined = undefined
    ){}
}
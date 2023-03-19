import { Student } from "./student.model";
import { SessionTermJunction } from "./sessionTerm.model";
import { Subject } from "./classSubject.model";
import { ClassArmJunction } from "./studentClassArm.model";

export class AcademicReport {
    constructor(
        public Id: number,
        public StudentId: number,
        public student: Student,
        public classArmId: number,
        public classArm: ClassArmJunction,
        public sessionTermId: number,
        public sessionTerm: SessionTermJunction,
        public subjectPerformance: SubjectPerformance[]
    ) {}
}

export class SubjectPerformance {
    constructor(
       public id: number,
       public subjectId: number,
       public  subject: Subject,
       public academicReportId: number,
       public academicReport: AcademicReport,
       public test1: number,
       public test2: number,
       public test3: number,
       public testScoreLimit: number,
       public exam: number,
       public total: number
    ) {}
}

export class OverallPerformance {
    constructor(
        public id: number,
        public academicReportId: number,
        public academicReport: AcademicReport,
        public total: number,
        public numOfSubjects: number,
        public average: number,
        public position: number,
        public grade: string,
        public remark: string
    ) {}
}
import { Student } from "./student.model";
import { SessionTermJunction } from "./sessionTerm.model";
//import { Subject } from "./classSubject.model";
import { ClassArmJunction } from "./studentClassArm.model";
import { StudentSkillJunction } from "./skill.model";

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
       public academicReportId: number,
       public test1: number,
       public test2: number,
       public test3: number,
       public testScoreLimit: number,
       public exam: number,
       public total: number
    ) {}
}

export class ComputedResults {
    constructor(public studentId: number,
                public _class: string,
                public arm: string,
                public session: string,
                public subject: string,
                public subjectCategory: string,
                public test1: number,
                public test2: number,
                public test3: number,
                public testScoreLimit: number,
                public exam: number,
                public total: number,
                public classAverage: number,
                public highestScore: number,
                public lowestScore: number,
                public position: number,
                public grade: string,
                public remark: string) {
        
    }
}

export class SubjectScore{
    constructor(
        public fullName: string,
        public studentId: number,
        public subject: string,
        public test1: number,
        public test2: number,
        public test3: number,
        public exam: number,
        public total: number,
        public classAverage: number,
        public highestScore: number,
        public lowestScore: number,
        public position: number,
        public grade: string,
        public remark: string
    ){}
}
export class OverallPerformance {
    constructor(
        public fullName: string,
        public academicReportId: number,
        public studentId: number,
        public _class: string,
        public arm: string,
        public session: string,
        public term: string,
        public totalObtainable: number,
        public total: number,
        public numOfSubjects: number,
        public average: number,
        public position: number,
        public grade: string,
        public remark: string
    ) {}
}

export class BasicStudentInfo {
    constructor(public fullName: string,
                public sex: string,
                public age:  number,
                public admissionNumber: string) {}
}

export class ReportCard {
    constructor(public student?: BasicStudentInfo,
                public results?: ComputedResults[],
                public performance?: OverallPerformance,
                public skills?: StudentSkillJunction[]) {
        
    }
}

export class ModifiedReportCard {
    constructor(public student?: BasicStudentInfo,
                public results: SubjectReport = {},
                public performance?: OverallPerformance,
                public skills: SkillReport = {}) {
        
    }
}

interface SubjectReport
{
    [index: string]: ComputedResults[]
}

interface SkillReport
{
    [index: string]: StudentSkillJunction[]
}
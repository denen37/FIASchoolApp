import { SubjectPerformance } from "./reportCard.model";

export class AcademicRecord
{
    constructor(
        public studentId: number,
        public fullName: string,
        public academicReportId: number,
        public subjectPerformance: SubjectPerformance
    ){}
}
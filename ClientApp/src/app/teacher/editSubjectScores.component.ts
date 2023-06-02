import { Component } from "@angular/core";
import { AcademicRecordRepository } from "../models/academicRecordRepository.model";
import { AcademicRecord } from "../models/academicRecord.model";
import { StudentFilter } from "../filters/studentFilter.model";
import { SubjectPerformance } from "../models/reportCard.model";
import { ReportCardRepository } from "../models/reportCardRepository.model";

@Component({
    templateUrl: 'editSubjectScores.component.html'
})

export class EditSubjectScoresComponent {
    constructor(private academicRepo: AcademicRecordRepository,
                private reportRepo: ReportCardRepository,
                private filter: StudentFilter){
            }
    get completed(): boolean | undefined{
        return this.academicRepo.completed;
    }

    get records(): AcademicRecord[] | undefined
    {
        return this.academicRepo.studentRecords;
    }

    viewScores()
    {
        this.reportRepo.getSubjectScores(this.filter);
    }
    
    public loadBtn()
    {
        this.academicRepo.getAcademicRecordsForClass(this.filter);
    }

    commit()
    {
        let scores = new Array<SubjectPerformance>();

        this.academicRepo.studentRecords?.forEach(element => {
            element.subjectPerformance.testScoreLimit = 30;
            element.subjectPerformance.academicReportId = element.academicReportId;
            scores.push(element.subjectPerformance);
        });
        
        if (scores[0].id == 0) {
            this.academicRepo.saveCompleted = undefined;
            this.academicRepo.saveError = undefined;
            this.academicRepo.addAcademicRecord(scores);
        }
        else
        {
            this.academicRepo.saveCompleted = undefined;
            this.academicRepo.saveError = undefined;
            this.academicRepo.updateAcademicRecord(scores);
        }
    }

    public reload()
    {
        if (this.academicRepo.studentRecords) {
            this.academicRepo.studentRecords = undefined;
            this.academicRepo.completed = false;
            this.academicRepo.getAcademicRecordsForClass(this.filter);
        }
    }

    public createScoresheet()
    {
        this.academicRepo.createScoresheet(this.filter);
    }

    get selectedSubject(): string
    {
        return this.filter.subject||"";
    }

    get saveError(): boolean | undefined
    {
        return this.academicRepo.saveError;
    }

    get saveCompleted(): boolean | undefined
    {
        return this.academicRepo.saveCompleted;
    }

    getName(testName: string, testNo: number, index: number): string
    {
        return `${testName}${testNo}_${index}`;
    }
}
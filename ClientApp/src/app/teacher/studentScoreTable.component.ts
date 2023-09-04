import { Component } from '@angular/core'
import { StudentFilter } from '../filters/studentFilter.model';
import { ReportCardRepository } from '../models/reportCardRepository.model';
import { SubjectScore } from '../models/reportCard.model';
import { StudentRepository } from '../models/studentRepository.model';

@Component({
    templateUrl: 'studentScoreTable.component.html'
})

export class StudentScoreTableComponent {
    constructor(private filter: StudentFilter,
                private studentRepo: StudentRepository,
                private reportRepo: ReportCardRepository) {
                }

    get studentScores():SubjectScore[] | undefined
    {
        return this.reportRepo.studentScores;
    }
    get completed(): boolean | undefined
    {
        return this.reportRepo.studentScoresLoaded;
    }

    get hasNoStudents(): boolean | undefined
    {
        //if completedNames is undefined then an inital request has never been made.
        return this.studentRepo.completedNames === undefined
    }

    loadBtn()
    {
        this.reportRepo.getStudentScores(this.filter);
    }
    reload()
    {
        if (this.studentScores) {
            this.reportRepo.getStudentScores(this.filter);
        }
    }

    get loadError(): any | undefined
    {
        return this.reportRepo.studentScoresLoadedError;
    }

    get selectedStudent(): string
    {
        return this.filter.name||"...";
    }

    get selectedClassArm(): string 
    {
        return this.filter.classroom + ">" + this.filter.arm
    }

    get selectedSessionTerm(): string
    {
        return  this.filter.session + ">" + this.filter.term +" "+ "term" ;
    }
}
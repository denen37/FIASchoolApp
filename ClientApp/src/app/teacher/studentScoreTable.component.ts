import { Component } from '@angular/core'
import { StudentFilter } from '../filters/studentFilter.model';
import { ReportCardRepository } from '../models/reportCardRepository.model';
import { SubjectScore } from '../models/reportCard.model';

@Component({
    templateUrl: 'studentScoreTable.component.html'
})

export class StudentScoreTableComponent {
    studentScores?: SubjectScore[];
    constructor(private filter: StudentFilter,
                private reportRepo: ReportCardRepository) {
                    this.filter.name = 'Asen Theresa Ishun';
                }

    get completed(): boolean | undefined
    {
        return this.reportRepo.studentScoresLoaded;
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
}
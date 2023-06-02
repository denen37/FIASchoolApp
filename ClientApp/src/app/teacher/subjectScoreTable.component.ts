import { Component } from "@angular/core";
import { StudentFilter } from "../filters/studentFilter.model";
import { ReportCardRepository } from "../models/reportCardRepository.model";
import { SubjectScore } from "../models/reportCard.model";
import { ComponentType, task } from "../services/component.service";

@Component({
    selector: "score-table",
    templateUrl: "subjectScoreTable.component.html"
})

export class SubjectScoreTableComponent {
    constructor(private subjectRepo: ReportCardRepository,
                private filter: StudentFilter,
                private component: ComponentType) 
    {
        this.component.type = task.display;
    }
    get completed(): boolean | undefined
    {
        return this.subjectRepo.subjectScoresLoaded;
    }

    get subjectScores(): SubjectScore[] | undefined
    {
        return this.subjectRepo.subjectScores
    }

    loadBtn()
    {
        this.subjectRepo.getSubjectScores(this.filter);
    }

    reload()
    {
        if (this.subjectScores) {
            this.subjectRepo.getSubjectScores(this.filter);
        }
    }
}
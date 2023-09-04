import { Component } from "@angular/core";
import { StudentFilter } from "../filters/studentFilter.model";
//import { ReportCardRepository } from "../models/reportCardRepository.model";
import { OverallPerformance } from "../models/reportCard.model";
import { OverallPerformanceRepository } from "../models/overallPerformanceRepository.model";

@Component({
    templateUrl: "masterScoreSheet.component.html"
})
export class MasterScoreSheetComponent {
    constructor(private reportRepo: OverallPerformanceRepository,
                private filter: StudentFilter) {}

    get completed(): boolean | undefined
    {
        return this.reportRepo.overallScoresLoaded
    }

    get loadError(): any | undefined
    {
        return this.reportRepo.overallScoresLoadedError;
    }

    get scoreSheet(): OverallPerformance[] | undefined
    {
        return this.reportRepo.overallScores?.overallPerformances
    }

    loadBtn()
    {
        this.reportRepo.getOverallScores(this.filter);
    }
    
    get commited(): boolean | undefined
    {
        return this.reportRepo.overallScores?.commited;
    }

    reload()
    {
        if (this.scoreSheet) {
            this.reportRepo.getOverallScores(this.filter);
        }
    }

    get selectedClass(): string | undefined
    {
        return this.filter.classroom + " " + this.filter.arm
    }

    get saveCompleted() : boolean | undefined
    {
        return this.reportRepo.overallScoresAdded
    }

    get saveError(): boolean | undefined
    {
        return this.reportRepo.overallScoresAddedError
    }

    save()
    {
        this.reportRepo.addOverallScores(this.scoreSheet);
    }
}
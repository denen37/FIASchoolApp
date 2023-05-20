import { Component } from "@angular/core";
import { ReportCardRepository } from "../models/reportCardRepository.model";
import { ModifiedReportCard} from "../models/reportCard.model";

@Component({
    selector: "dossier",
    templateUrl: 'studentDossier.component.html'
})

export class StudentDossierComponent
{
    constructor(private reportRepo: ReportCardRepository){

    }

    get reportCard(): ModifiedReportCard
    {
        return this.reportRepo.reportCard;
    }

    get testScore(): number
    {
        return this.reportCard.results['general'][0].testScoreLimit / 300;
    }
    get examScore(): number
    {
        return (100 - this.reportCard.results['general'][0].testScoreLimit) / 100;
    }

    get position(): number
    {
        return this.reportCard.performance?.position || 0;
    }

    get status(): string
    {
        let grade = this.reportCard.performance?.grade || "";
        if(grade == 'E')
        return 'FAILED';
        else
        return 'PASSED';
    }
}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StudentFilter } from "../filters/studentFilter.model";
import { OverallPerformance } from "./reportCard.model";

const resultUrl = 'api/overallperformance'

type MasterScoreSheet = {
    commited: boolean,
    overallPerformances: OverallPerformance[]
}

@Injectable()
export class OverallPerformanceRepository {

    overallScores?: MasterScoreSheet
    overallScoresLoaded?: boolean;
    overallScoresLoadedError?: any

    overallScoresAdded?: boolean;
    overallScoresAddedError?: boolean;
    
    constructor(private http: HttpClient) {}
    getOverallScores(filter: StudentFilter)
    {
        this.overallScoresLoaded = false;
        var url = this.modifyUrl(resultUrl, filter)

        this.http.get<MasterScoreSheet>(url)
        .subscribe(
            ovs => this.overallScores = ovs,
            err => {console.log(err);
                this.overallScoresLoadedError = err},
            () => this.overallScoresLoaded = true
        )
    }

    addOverallScores(scoreSheet?: OverallPerformance[])
    {
        this.overallScoresAdded = false;

        this.http.post<OverallPerformance[]>(resultUrl, scoreSheet)
        .subscribe(
            next => console.log('success'),
            error => {this.overallScoresAddedError = error;
                     console.log(error)},
            () => this.overallScoresAdded = true        
        )
    }

    private modifyUrl(originalUrl: string, filter: StudentFilter): string
    {
        var url = originalUrl;
        var pos = originalUrl.length;

        if(filter?.studentId)
        {
            url = `${url}?studentId=${filter.studentId}`;
        }
        if (filter?.subject) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}subject=${filter.subject}`;
        } 
        if (filter?.classroom) {

            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}classroom=${filter.classroom}`;
        }
        if (filter?.arm) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}arm=${filter.arm}`;
        }
        if (filter?.session) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}session=${filter.session}`;
        }
        if (filter?.term) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}term=${filter.term}`;
        }

        return url;
    }

}
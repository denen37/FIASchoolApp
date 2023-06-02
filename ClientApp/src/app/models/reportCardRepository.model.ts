import { BasicStudentInfo, ComputedResults, ModifiedReportCard, OverallPerformance, ReportCard, SubjectScore } from "./reportCard.model";
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ResultFilter } from "../filters/reportFilter.model";
import { StudentSkillJunction } from "./skill.model";
import { StudentFilter } from "../filters/studentFilter.model";

const resultUrl = 'api/subjectperformance'

@Injectable()
export class ReportCardRepository {
    reportCard: ModifiedReportCard;
    subjectScores?: SubjectScore[];
    subjectScoresLoaded?: boolean;
    studentScores?: SubjectScore[];
    studentScoresLoaded?: boolean;
    studentScoresLoadedError?: any
    reportId: number = 0

    constructor(private http: HttpClient ) {
        this.reportCard = new ModifiedReportCard
    }

    getResult(filter: ResultFilter){
        var tempReport = new ReportCard();
        var url = resultUrl;
        var pos = resultUrl.length;

        url = `${url}/${this.reportId}`;

        if(filter?.student)
        {
            url = `${url}?student=${filter.student}`;
        }
        if (filter?.result) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}result=${filter.result}`;
        }
        if (filter?.performance) {

            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}performance=${filter.performance}`;
        }
        if (filter?.skills) {
            url = `${url}${url.includes("?", pos) && url.length > pos ?"&":"?"}skills=${filter.skills}`;
        }
        
        this.http.get<ReportCard>(url).subscribe(
            r => tempReport = r,
            err => {},
            () => {
                if (filter.student) {
                  this.reportCard.student = tempReport.student;  
                }
                if (filter.result && tempReport.results) {
                    let generalSubjects: ComputedResults[] = [];
                    let specialSubjects: ComputedResults[] = [];
                    let electiveSubjects: ComputedResults[] = [];

                    tempReport.results?.forEach(element => {
                        switch (element.subjectCategory.toLowerCase()) {
                            case 'general':
                                generalSubjects.push(element);
                                break;
                            case 'science':
                            case 'arts':
                            case 'commercial':
                                specialSubjects.push(element);
                                break;
                            default:
                                electiveSubjects.push(element);
                                break;
                        }
                    });

                    this.reportCard.results['general'] = generalSubjects;
                    this.reportCard.results['special'] = specialSubjects;
                    this.reportCard.results['elective'] = electiveSubjects;
                }
                if (filter.performance) {
                    this.reportCard.performance = tempReport.performance
                }
                if (filter.skills && tempReport.skills) {
                    let affective = 'affective';
                    let psychomotor = 'psychomotor';
                    let affectiveDevSkills: StudentSkillJunction[] = [];
                    let psychomotorSkills: StudentSkillJunction[] = [];

                    tempReport.skills.forEach(element => {
                        let skilltype = element.skill.skillType.name.toLowerCase();
                        if (skilltype.includes(affective)) {
                            affectiveDevSkills.push(element);
                        }
                        else if (skilltype.includes(psychomotor)){
                            psychomotorSkills.push(element);
                        }
                    })

                    this.reportCard.skills[affective] = affectiveDevSkills;
                    this.reportCard.skills[psychomotor] = psychomotorSkills;
                }
            }
        )
    }

    getSubjectScores(filter: StudentFilter)
    {
       this.subjectScoresLoaded = false;
       var url = this.modifyUrl(resultUrl, filter);
        this.http.get<SubjectScore[]>(url)
        .subscribe(
            sub => this.subjectScores = sub,
            (err) => {},
            () => {this.subjectScoresLoaded = true;}
        )
    }

    //Another method here
    getStudentScores(filter: StudentFilter)
    {
        this.studentScoresLoaded = false;
        var url = this.modifyUrl(`${resultUrl}/subject-score`, filter);
        
        this.http.get<SubjectScore[]>(url)
        .subscribe(
            std => this.studentScores = std,
            err => {console.log(err);
                    this.studentScoresLoadedError = err;},
            () => this.studentScoresLoaded = true
        )
    }

    private modifyUrl(originalUrl: string, filter: StudentFilter): string
    {
        var url = originalUrl;
        var pos = originalUrl.length;

        if(filter?.name)
        {
            url = `${url}?name=${filter.name}`;
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
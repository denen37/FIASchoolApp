import { BasicStudentInfo, ComputedResults, ModifiedReportCard, OverallPerformance, ReportCard } from "./reportCard.model";
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ResultFilter } from "../filters/reportFilter.model";
import { StudentSkillJunction } from "./skill.model";

const resultUrl = 'api/subjectperformance'

@Injectable()
export class ReportCardRepository {
    reportCard: ModifiedReportCard
    
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
}
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AcademicRecord } from './academicRecord.model'
import { StudentFilter } from '../filters/studentFilter.model';
import { SubjectPerformance } from './reportCard.model';

const recordUrl = 'api/academicrecord';

@Injectable()
export class AcademicRecordRepository
{
    studentRecords?: AcademicRecord[];
    completed?: boolean;
    saveCompleted?: boolean;
    saveError?: boolean

    constructor(private http: HttpClient)
    {}

    async delay(ms: number) {
        await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
    }

    getAcademicRecordsForClass(params: StudentFilter)
    {
        this.completed = false;

        var url = this.modifyUrl(recordUrl, params)

        this.http.get<AcademicRecord[]>(url)
        .subscribe(
            s => this.studentRecords = s,
            err => console.log(err),
            () => this.completed = true
        )
    }

    async updateAcademicRecord(subjectPerformance: SubjectPerformance[])
    {
        this.saveCompleted = false;
        this.saveError = false;
        await this.delay(5000);
        this.http.put<SubjectPerformance[]>(recordUrl, subjectPerformance)
        .subscribe(
            sub => console.log(sub),
            err => this.saveError = true,
            () => this.saveCompleted = true
        )
    }

    async addAcademicRecord(subjectPerformance: SubjectPerformance[])
    {
        this.saveCompleted = false;
        this.saveError = false;
        await this.delay(5000);
        this.http.post<SubjectPerformance[]>(recordUrl, subjectPerformance)
        .subscribe(
            sub => console.log(sub),
            err => this.saveError = true,
            () => this.saveCompleted = true
        )
    }

    createScoresheet(params: StudentFilter)
    {
        this.completed = false;
        params.subject = params.subjectId?.toString();

        var url = this.modifyUrl(`${recordUrl}/create`, params)

        this.http.get<AcademicRecord[]>(url)
        .subscribe(
            s => this.studentRecords = s,
            err => console.log(err),
            () => this.completed = true
        )
    }

    private modifyUrl(originalUrl: string,  params: StudentFilter) : string
    {
        var url = originalUrl;
        var pos = originalUrl.length;

        if(params?.classroom)
        {
            url = `${url}?classroom=${params.classroom}`;
        }
        if (params?.arm) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}arm=${params.arm}`;
        }
        if (params?.session) {

            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}session=${params.session}`;
        }
        if (params?.term) {
            url = `${url}${url.includes("?", pos) && url.length > pos ?"&":"?"}term=${params.term}`;
        }
        if (params?.subject) {
            url = `${url}${url.includes("?", pos) && url.length > pos ?"&":"?"}subject=${params.subject}`;
        }

        return url
    }
}
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { StudentFilter } from '../filters/studentFilter.model';
import { StudentsInClass } from './studentInClass.model';
import { Student } from './student.model';
import { StudentParameters } from '../filters/studentParameters.model';
import { StudentRecordService } from '../services/student.service';

//export const BACKEND_URL = new InjectionToken("back_url");
const studentUrl = "api/student";
@Injectable()
export class StudentRepository
{
    students?: StudentsInClass[];
    completedAll?: boolean;
    completedOne?: boolean;
    //This two members are for the UI
    paymentHasRowspan: boolean[] = [];
    academicsHasRowspan: boolean[] = [];
    private studentService: StudentRecordService 
    
    student?: Student;
    
    constructor(private http: HttpClient/*, @Inject(BACKEND_URL) private backUrl: string*/){
        this.studentService = new StudentRecordService();
    }

    getStudents(filters: StudentFilter){
        var url = studentUrl;
        var pos = studentUrl.length;
        this.completedAll = false;
        
        if(filters?.name)
        {
            url = `${url}?name=${filters.name}`;
        }
        if (filters?.classroom) {

            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}classroom=${filters.classroom}`;
        }
        if (filters?.arm) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}arm=${filters.arm}`;
        }
        if (filters?.session) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}session=${filters.session}`;
        }
        this.http.get<StudentsInClass[]>(url)
        .subscribe(s => this.students = s,
                    err => console.log(err),
                    () => this.completedAll = true);
    }

    getStudent(id: number, params: StudentParameters)
    {
        var url = `${studentUrl}/${id}`;
        var pos = studentUrl.length;
        this.completedOne = false;

        if(params.post)
        {
            url = `${url}?post=${params.post}`;
        }

        if (params.parents) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}parents=${params.parents}`;
        }

        if(params.overallPerformance)
        {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}overallPerformance=${params.overallPerformance}`;
        }

        if(params.morals)
        {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}morals=${params.morals}`;
        }

        if(params.payments)
        {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}payments=${params.payments}`;
        }

        this.http.get<Student>(url)
        .subscribe(s => this.student = s,
                   err => console.log(err),
                   () => {this.completedOne = true;
                            if (this.student?.paymentRecords) {
                                this.paymentHasRowspan = this.studentService.getPaymentRowspanArray(this.student.paymentRecords);
                            }
                            if(this.student?.overallPerformance){
                                this.academicsHasRowspan = this.studentService.getResultRowspanArray(this.student.overallPerformance);
                            };
            });
    }
}
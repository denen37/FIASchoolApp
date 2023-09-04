import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { StudentFilter } from '../filters/studentFilter.model';
import { StudentNames, StudentsInClass } from './studentInClass.model';
import { Student } from './student.model';
import { StudentParameters } from '../filters/studentParameters.model';
import { StudentRecordService } from '../services/student.service';

const studentUrl = "api/student";
@Injectable()
export class StudentRepository
{
    students?: StudentsInClass[];
    completedAll?: boolean;
    completedOne?: boolean;
    //For Student Names Component
    studentNames?: StudentNames[];
    completedNames?: boolean;
    loadStudentNamesError?: boolean;
    //For addStudents method
    completedAdd?: boolean;
    addStudentError?: boolean;
    //This two members are for the UI
    paymentHasRowspan: boolean[] = [];
    academicsHasRowspan: boolean[] = [];
    private studentService: StudentRecordService 
    
    student?: Student;
    
    constructor(private http: HttpClient/*, @Inject(BACKEND_URL) private backUrl: string*/){
        this.studentService = new StudentRecordService();
    }

    getStudents(filters: StudentFilter){
        this.completedAll = false;
        
        var url = this.modifyUrl(studentUrl, filters);

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

    getStudentNames(filter: StudentFilter)
    {
        this.completedNames = false;
        var url = this.modifyUrl(`${studentUrl}/names`, filter);

        this.http.get<StudentNames[]>(url)
        .subscribe(s => this.studentNames = s,
                    err => {console.log(err);
                            this.loadStudentNamesError = true;},
                    () => this.completedNames = true);
    }

    addStudent()
    {
        this.completedAdd = false;
        
        this.http.post<Student>(studentUrl, this.student)
        .subscribe(
            std => console.log(std),
            err => {console.log(err);
                    this.addStudentError = true},
            () => this.completedAdd = true
        )
    }

    modifyUrl(originalUrl: string, filters: StudentFilter): string
    {
        var url = originalUrl;
        var pos = originalUrl.length;

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
        if (filters?.term) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}term=${filters.term}`;
        }

        return url;
    }
}
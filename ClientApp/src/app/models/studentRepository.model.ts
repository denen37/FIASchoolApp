import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { StudentFilter } from '../filters/studentFilter.model';
import { StudentNames, StudentsInClass, StudentsInPage } from './studentInClass.model';
import { Student } from './student.model';
import { StudentParameters } from '../filters/studentParameters.model';
import { StudentRecordService } from '../services/student.service';
import { retry } from 'rxjs';
import { Pagination } from './pagination.model';

const studentUrl = "api/student";
type StudentCount = {_class: string, arm: string, count: number}
@Injectable()
export class StudentRepository
{
    students?: StudentsInPage;
    completedAll?: boolean;
    completedOne?: boolean;
    //For Student Names Component
    studentNames?: StudentNames[];
    completedNames?: boolean;
    loadStudentNamesError?: boolean;
    //Student count
    studentCount?: StudentCount[]
    //For addStudents method
    completedAdd?: boolean;
    addStudentError?: boolean;
    //This two members are for the UI
    paymentHasRowspan: boolean[] = [];
    academicsHasRowspan: boolean[] = [];
    private studentService: StudentRecordService 
    //Delete variables
    deleteError = false;
    deleteCompleted?: boolean
    
    student!: Student;
    
    constructor(private http: HttpClient/*, @Inject(BACKEND_URL) private backUrl: string*/){
        this.studentService = new StudentRecordService();
    }

    getStudents(filters: StudentFilter, pageOption?: Pagination){
        this.completedAll = false;
        
        var url = this.modifyUrl(studentUrl, filters, pageOption);

        this.http.get<StudentsInPage>(url)
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
        .subscribe(s => { this.student = s; },
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

    getStudentCount(session: string)
    {
        this.http.get<StudentCount[]>(`${studentUrl}/count?session=${session}`)
        .pipe(
          retry(3)
        )
        .subscribe({
            next: x => this.studentCount = x,
            error: err => console.log(err),
            complete: () => {}
        })
    }

    deleteStudent(id: number)
    {
        var pos: number
        this.deleteCompleted = false
        this.http.delete<StudentNames[]>(`${studentUrl}?id=${id}`)
        .pipe(
            retry(2)
        )
        .subscribe({
            next: x =>{
                if (this.students) {
                    pos = this.students.pageList.findIndex((x, i) => {
                        return x.id == id
                    })
                    let elements = this.students.pageList.filter(x => x.id != id)
                    this.students = new StudentsInPage(elements, this.students.totalPages);

                    }
                },

            error: err => this.deleteError = true,

            complete: () => this.deleteCompleted = true
        });
    }

    addStudent()
    {
        this.completedAdd = false;
        this.addStudentError = false;
        
        this.http.post<Student>(studentUrl, this.student)
        .subscribe(
            std => console.log(std),
            err => {console.log(err);
                    this.addStudentError = true},
            () => {
                this.completedAdd = true;
                this.student = new Student();
            }
        )
    }

    modifyUrl(originalUrl: string, filters: StudentFilter, pageOption?: Pagination): string
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

        if (pageOption?.currentPage) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}currentPage=${pageOption.currentPage}`;
        }

        if (pageOption?.pageSize) {
            url = `${url}${url.includes("?", pos) && url.length > pos + 1 ?"&":"?"}pageSize=${pageOption.pageSize}`;
        }

        return url;
    }
}
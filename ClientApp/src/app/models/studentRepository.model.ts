import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { StudentFilter } from '../filters/studentFilter.model';
import { StudentsInClass } from './studentInClass.model';
import { Student } from './student.model';

//export const BACKEND_URL = new InjectionToken("back_url");
const studentUrl = "api/student";
@Injectable()
export class StudentRepository
{
    students?: StudentsInClass[];
    completedAll?: boolean;
    completedOne?: boolean;
    
    student?: Student;
    
    constructor(private http: HttpClient/*, @Inject(BACKEND_URL) private backUrl: string*/){

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

    getStudent(id: number)
    {
        this.completedOne = false;

        this.http.get<Student>(`${studentUrl}/${id}`)
        .subscribe(s => this.student = s,
                   err => console.log(err),
                   () => this.completedOne = true)
    }   
}
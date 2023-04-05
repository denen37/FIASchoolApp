import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Student } from './student.model';

const studentUrl = "/api/students";
@Injectable()
export class StudentRepository
{
    students?: Student[];
    
    constructor(private http: HttpClient){

    }

    getStudents(classroom: string){
        this.http.get<Student[]>(`${studentUrl}?${classroom}`)
        .subscribe(s => this.students = s);
    }
}
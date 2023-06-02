import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from './classSubject.model';

const subjectUrl = 'api/subject';

@Injectable()
export class SubjectRepository {

    subjects?: Subject[]
    completed?: boolean
    constructor(private http: HttpClient) {}

    getSubjects()
    {
        this.completed = false;
        
        this.http.get<Subject[]>(subjectUrl)
        .subscribe(
            sub => this.subjects = sub,
            err => console.log(err),
            () => this.completed = true
        )
    }
}
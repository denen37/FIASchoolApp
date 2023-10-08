import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Session } from './sessionTerm.model';
import { retry } from 'rxjs';
const sessionUrl = "api/session";

@Injectable()
export class SessionRepository {
    private _sessions?: Session[];
    completed?: boolean;
    error?: any;


    constructor(private http: HttpClient) {
        
    }

    loadSessions(loadTerms: boolean/*, metadata: boolean = false*/) {
        this.http.get<Session[]>(`${sessionUrl}?related=${loadTerms}`)
        .pipe(
            retry(3) // retry two times 
        )
        .subscribe(
        {
            next: a => this._sessions = a,
            error: err => {
                this.error = err;
                console.log(err)
            },
            complete: () => this.completed = true
        })
    }

    get sessions() {
        return this._sessions;
    }
}


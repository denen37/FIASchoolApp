import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Session, SessionTermJunction } from './sessionTerm.model';
import { retry } from 'rxjs';
const sessionUrl = "api/session";

@Injectable()
export class SessionRepository {
    private _sessions?: Session[];
    sessionTerms: SessionTermJunction[] = [];
    completed?: boolean;
    error?: any;


    constructor(private http: HttpClient) {
        
    }

    loadSessions(loadTerms: boolean, metadata: boolean = false) {
        this.http.get<Session[]>(`${sessionUrl}?related=${loadTerms}&metadata=${metadata}`)
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

    loadSessionTerms(metadata = false)
    {
        let url = `${sessionUrl}/session-term?metadata=${metadata}`;

        this.http.get<SessionTermJunction[]>(url)
        .pipe( retry(3) )
        .subscribe(
        {
            next: a => this.sessionTerms = a,
            error: err => console.log(err),
            complete: () => {}
        })
    }


    addSessionTerm(sessionTerm: SessionTermJunction)
    {
        this.http.post<SessionTermJunction>(sessionUrl, sessionTerm)
        .pipe(
            retry(2)
        ).subscribe(
            {
                next: x => {if(sessionTerm.sessionId == 0) this.loadSessions(false, false)},
                error: err => console.log(err),
                complete: () => {}  
            }
        )
    }
    get sessions() {
        
        return this._sessions;
    }
}


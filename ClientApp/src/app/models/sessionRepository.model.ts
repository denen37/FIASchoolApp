import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Session } from './sessionTerm.model';
const sessionUrl = "api/session";

@Injectable()
export class SessionRepository {
    private _sessions?: Session[];
    completed?: boolean;


    constructor(private http: HttpClient) {
        
    }

    loadSessions() {
        this.http.get<Session[]>(sessionUrl)
        .subscribe(
            a => this._sessions = a,
            err => console.log(err),
            () => this.completed = true);
    }

    get sessions() {
        return this._sessions;
    }
}


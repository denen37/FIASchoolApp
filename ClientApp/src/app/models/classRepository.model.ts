import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Class } from './studentClassArm.model';

const classUrl = "api/class";

@Injectable()
export class ClassRepository {
    private _classes?: Class[];
    completed?: boolean;

    constructor(private http: HttpClient) {
        
    }

    loadClasses() {
        this.http.get<Class[]>(classUrl)
        .subscribe(
            c => this._classes = c,
            err => console.log(err),
            () => this.completed = true);
    }

    get classes() {
        return this._classes;
    }
}


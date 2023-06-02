import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Class } from './studentClassArm.model';

const classUrl = "api/class";

@Injectable()
export class ClassRepository {
    private _classes?: Class[];
    completed?: boolean;
    error?: any;

    constructor(private http: HttpClient) {
        
    }

    loadClasses() {
        this.http.get<Class[]>(classUrl)
        .subscribe(
            c => this._classes = c,
            err => {
                this.error = err;
                console.log(err)
            },
            () => this.completed = true);
    }

    get classes() {
        return this._classes;
    }
}


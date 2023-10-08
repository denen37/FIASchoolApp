import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Class } from './studentClassArm.model';
import { retry } from 'rxjs';

const classUrl = "api/class";

@Injectable()
export class ClassRepository {
    private _classes?: Class[];
    completed?: boolean;
    error?: any;

    constructor(private http: HttpClient) {
        
    }

    loadClasses(loadArms: boolean) {
        this.http.get<Class[]>(`${classUrl}?related=${loadArms}`)
        .pipe(
            retry(3) // retry two times 
        )
        .subscribe(
        {
            next: c => this._classes = c,
            error: err => {
                    this.error = err;
                    console.log(err)
            },
            complete: () => {this.completed = true}
        })
    }

    get classes() {
        return this._classes;
    }
}


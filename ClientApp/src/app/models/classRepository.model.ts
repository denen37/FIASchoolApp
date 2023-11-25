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
    classesArray(numOfColumns: number): Class[][] {
        let _classes = new Array<Class[]>();
        let tempClasses = new Array<Class>();
        let index = -1
        this.classes?.forEach((e, i) => {
            if(i + 1 == this.classes?.length) tempClasses.push(e);
            if ((i % numOfColumns == 0 && i > 0) || i + 1 == this.classes?.length)
            {
                _classes.push(tempClasses);
                tempClasses = [];
            }
            
            tempClasses.push(e);
        });
        
        return _classes;
    }

    constructor(private http: HttpClient) {
        
    }

    loadClasses(loadArms: boolean, courseCategory = false) {
        this.http.get<Class[]>(`${classUrl}?related=${loadArms}&courseCategory=${courseCategory}`)
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


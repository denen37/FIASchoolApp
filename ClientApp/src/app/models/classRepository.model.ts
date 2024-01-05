import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Class, ClientEntityState } from './studentClassArm.model';
import { retry } from 'rxjs';

const classUrl = "api/class";

@Injectable()
export class ClassRepository {
    private _classes?: Class[];
    completed?: boolean;
    error?: any;
    /*classesArray(numOfColumns: number): Class[][] {
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
    }*/

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

    addClass(classObj: Class)
    {
        this.http.post<Class>(`${classUrl}`, classObj)
        .pipe( retry(2) )
        .subscribe(
            {
                next: c => this._classes?.push(c),
                error: err => console.log(err),
                complete: () => {}
            }
        )
    }

    updateClass(selectedClass: Class) {
        //let classCopy = JSON.parse(JSON.stringify(selectedClass)) as typeof selectedClass;
        //classCopy.classArms = [];

        this.http.put<Class>(`${classUrl}`, selectedClass)
        .pipe(retry(2))
        .subscribe({
            next: value => { let i = this.classes?.findIndex(klass => {
                console.log(`${klass.id} == ${value.id}`);
                return klass.id == value.id;
            }) ?? -1;

                value.classArms.forEach((klass, index) => {
                    klass.arm = selectedClass.classArms[index].arm;
                    klass.courseCategory = selectedClass.classArms[index].courseCategory;
                    klass.entityState = ClientEntityState.Unchanged;
                })
                if (this._classes) {
                    this._classes[i] = value;
                    console.log(this._classes[i]);
                    
                }
            },
            error: err => console.log(err),
            complete: () => {}
        })
    }

    deleteClass(klass: Class)
    {
        this.http.delete<Class>(`${classUrl}?id=${klass.id}`)
        .subscribe({
            next: c => {
                let i = this.classes?.findIndex(c => c.id == klass.id) || -1;
                this._classes = this._classes?.slice(0, i).concat(this._classes?.slice(i + 1))
            }
        })
    }
    get classes() {
        return this._classes;
    }
}


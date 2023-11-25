import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Arm, ClassArmJunction } from './studentClassArm.model';
import { retry } from 'rxjs';
import { CourseCategory } from './classSubject.model';

const armUrl = "api/arm";
const courseCategoryUrl = "api/courseCategory";

@Injectable()
export class ArmRepository {
    private _arms?: Arm[];
    newArmEvent = new EventEmitter<ClassArmJunction>();
    completed?: boolean;
    courseCategories?: CourseCategory[]
    error?: any;

    constructor(private http: HttpClient) {
        
    }

    loadArms() {
        this.http.get<Arm[]>(armUrl)
        .pipe(
            retry(2) // retry two times 
        )
        .subscribe(
            {
                next: a => this._arms = a,
                error: err => {
                    this.error = err;
                    console.log(err)
                },
                complete: () => this.completed = true
            }
           );
    }

    get arms() {
        return this._arms;
    }

    addArm(classArm: ClassArmJunction)
    {
        this.http.post<ClassArmJunction>(`${armUrl}/class-arm`, classArm)
        .subscribe(
            {
                next: a => {this.newArmEvent.emit(a)},
                error: err => {
                    console.log(err);
                },
                complete: () => this.completed = true
            }
        )
    }

    getCourseCategories()
    {
        this.http.get<CourseCategory[]>(courseCategoryUrl).pipe( retry(2) )
        .subscribe(
            {
                next: a => this.courseCategories = a,
                error: err => console.log(err),
                complete: () => this.completed = true
                
            }
        )
    }    
}


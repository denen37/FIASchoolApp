import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Arm } from './studentClassArm.model';
import { retry } from 'rxjs';

const armUrl = "api/arm";

@Injectable()
export class ArmRepository {
    private _arms?: Arm[];
    completed?: boolean;
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
}


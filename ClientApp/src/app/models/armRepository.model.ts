import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Arm } from './studentClassArm.model';

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
        .subscribe(
            a => this._arms = a,
            err => {
                this.error = err;
                console.log(err)
            },
            () => this.completed = true);
    }

    get arms() {
        return this._arms;
    }
}


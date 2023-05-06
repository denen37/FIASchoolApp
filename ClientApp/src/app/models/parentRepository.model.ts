import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Parent } from './parent.model';

const parentUrl = "api/parent";

@Injectable()
export class ParentRepository {
    private _parents?: Parent[];
    completed?: boolean;

    constructor(private http: HttpClient) {
        
    }

    loadParents() {
        this.http.get<Parent[]>(parentUrl)
        .subscribe(
            c => this._parents = c,
            err => console.log(err),
            () => this.completed = true);
    }

    get parents() {
        return this._parents;
    }
}


import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Parent } from './parent.model';
import { retry } from 'rxjs';

const parentUrl = "api/parent";
type ParentName = {id: number, name: string}

@Injectable()
export class ParentRepository {
    private _parents?: Parent[];
    parentNames?: ParentName[];
    completedNames?: boolean;
    completed?: boolean;

    constructor(private http: HttpClient) {
        
    }

    loadParents() {
        this.http.get<Parent[]>(parentUrl)
        .pipe(
            retry(2)
        )
        .subscribe(
        {
            next: c => this._parents = c,
            error: err => console.log(err),
            complete: () => this.completed = true
        })
    }

    loadParentNames() {
        this.completedNames =  false;
        this.http.get<ParentName[]>(`${parentUrl}/names`)
        .pipe(
            retry(3)
        )
        .subscribe(
        {
            next: c => this.parentNames = c,
            error: err => console.log(err),
            complete: () => this.completedNames = true
        })
    }


    get parents() {
        return this._parents;
    }
}


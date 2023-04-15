import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentRepository } from "../models/studentRepository.model";
import { StudentFilter } from "../filters/studentFilter.model";
import { ClassRepository } from "../models/classRepository.model";
import { ArmRepository } from "../models/armRepository.model";
import { SessionRepository } from "../models/sessionRepository.model";


@Component({
    selector: "sch-nav-bar",
    templateUrl: "schNavBar.component.html"
})

export class SchNavBarComponent{
    filter?: StudentFilter;

    constructor(private classrepo: ClassRepository,
                private armRepo: ArmRepository,
                private sessionRepo: SessionRepository){

    }
    
    //TODO-remove this method-deprecated
    
}
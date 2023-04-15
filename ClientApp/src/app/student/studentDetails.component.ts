import { Component } from "@angular/core";
import { StudentRepository } from "../models/studentRepository.model";
import { Student } from "../models/student.model";

@Component({
        selector: "student-details",
        templateUrl: "studentDetails.component.html"
    })

export class StudentDetailsComponent{

    constructor(private studentRepo: StudentRepository)
    {}
    
    get student(): Student | undefined{
        return this.studentRepo.student;
    }
    get completed(): boolean | undefined{
        return this.studentRepo.completedOne;
    }
}
import { Component } from "@angular/core";
import { StudentRepository } from "../models/studentRepository.model";
import { StudentsInClass } from "../models/studentInClass.model";
import { Router } from "@angular/router";
import { StudentParameters } from "../filters/studentParameters.model";


@Component({
    selector: "student",
    templateUrl: "studentList.component.html"
})

export class StudentListComponent {

    constructor(private studentRepo: StudentRepository,
                private router: Router,
                private params: StudentParameters) 
    {
               
    }

    
    public get students() : StudentsInClass[]{
        return this.studentRepo.students||[];
    }

    public get completed(): boolean | undefined{
        return this.studentRepo.completedAll;
    }

    public viewDetails(id: number){
        this.studentRepo.getStudent(id, this.params);
        this.router.navigateByUrl(`students/details/${id}`);
    }
    
}
import { Component } from "@angular/core";
import { StudentRepository } from "../models/studentRepository.model";
import { StudentsInClass } from "../models/studentInClass.model";
import { StudentFilter } from "../filters/studentFilter.model";


@Component({
    selector: "student",
    templateUrl: "studentList.component.html"
})

export class StudentListComponent {

    constructor(private studentRepo: StudentRepository,
                private filter: StudentFilter) 
    { }

    
    public get students() : StudentsInClass[]{
        return this.studentRepo.students||[];
    }

    public get completed(): boolean | undefined{
        return this.studentRepo.completedAll;
    }

    loadBtn()
    {
        this.studentRepo.getStudents(this.filter)
    }

    reload(){
        if (this.studentRepo.students) {
            this.studentRepo.getStudents(this.filter);
        }
    }

    //Marked for Deletion
   /* public viewDetails(id: number){
        this.studentRepo.getStudent(id, this.params);
        this.router.navigateByUrl(`students/details/${id}`);
    }*/
    
}
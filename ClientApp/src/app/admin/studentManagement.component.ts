import { Component } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { StudentRepository } from "../models/studentRepository.model";
import { StudentFilter } from "../filters/studentFilter.model";
import { StudentsInClass } from "../models/studentInClass.model";

@Component({
    templateUrl: "studentManagement.component.html",
    styleUrls: ["studentManagement.component.css"]
})

export class StudentManagementComponent
{
    _class: string;
    arm: string;
    filter: StudentFilter

    constructor(private activeRoute: ActivatedRoute,
                private studentRepo: StudentRepository)
    {
        this._class = activeRoute.snapshot.params["class"];
        this.arm = activeRoute.snapshot.params["arm"];
        this.filter = new StudentFilter();
        this.filter.arm = this.arm;
        this.filter.classroom = this._class;
        this.filter.session = '2022/2023'
        
    }

    ngOnInit()
    {

        this.studentRepo.getStudents(this.filter);
    }

    get students()
    {
        return this.studentRepo.students;
    }

    fullName(student: StudentsInClass)
    {
        return student.lastName + ' '
        + (student.middleName?student.middleName + ' ':'')
        + student.firstName;
    }
}
import { ChangeDetectorRef, Component } from "@angular/core";
import { StudentRepository } from "../models/studentRepository.model";
import { Student } from "../models/student.model";
import { ParentStudentJunction } from "../models/parent.model";
//import { NgForm } from "@angular/forms";

@Component({
    templateUrl: 'formPage.component.html'
})

export class FormPageComponent {
    constructor(private studentRepo: StudentRepository, private cd: ChangeDetectorRef) {
    }

    submitForm: boolean = false;
    showAlert: boolean = false;
    //formHasErrors: boolean = false;
    //studentForm?: NgForm;
    sFormErrors: string[] = [];
    pFormErrors: string[] = [];
    viewMode: string  = 'student';
    order: number = 0;
    
    get student() : Student
    {
        if (!this.studentRepo.student) {
            this.studentRepo.student = new Student();
        }
        return this.studentRepo.student
    }

    set student(value: Student)
    {
        this.studentRepo.student = value;
    }

    get parentsOfStudent(): ParentStudentJunction[]
    {
        return this.student.parentStudentJunction?
                this.student.parentStudentJunction:
                this.student.parentStudentJunction = new Array<ParentStudentJunction>();
    }

    set parentsOfStudent(v: ParentStudentJunction[])
    {
        this.student.parentStudentJunction = v;
    }

    submit()
    {
        this.submitForm = true;
        this.showAlert = true;
    }

    postData()
    {
        if (this.sFormErrors.length == 0 && this.pFormErrors.length == 0) {
            this.studentRepo.addStudent();
        }
    }

    resetSubmitBtn()
    {
        this.showAlert = false;
        this.submitForm = false;
    }

    getStudentFormErrors(errors: string[] | undefined)
    {
        if(errors)
        {
            this.sFormErrors = errors;    
            //this.formHasErrors = true;
        }
        else
        {
            this.sFormErrors = [];
            //this.formHasErrors = false;
        } 

        this.submitForm = false;
    }

    getParentFormErrors(errors: string[] | undefined)
    {
        if(errors)
        {
            this.pFormErrors = errors;  
            //this.showAlert = true;
        }
        else
        {
            this.pFormErrors = [];
            this.postData();
            //this.formHasErrors = false;
        } 

        this.submitForm = false;
    }
}
import { Component, TemplateRef, ViewChild} from "@angular/core";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentRepository } from "../models/studentRepository.model";
import { Student } from "../models/student.model";
import { ParentStudentJunction } from "../models/parent.model";
import { SubmitModalComponent } from "./submitStudentModal.component";
import { ClassRepository } from "../models/classRepository.model";
//import { ArmRepository } from "../models/armRepository.model";
import { SessionRepository } from "../models/sessionRepository.model";

@Component({
    templateUrl: 'formPage.component.html'
})

export class FormPageComponent {
    constructor(private studentRepo: StudentRepository,
                private classRepo: ClassRepository,
               // private armRepo: ArmRepository,
                private sessionRepo: SessionRepository,
                private modalService: BsModalService) 
    {
    }

    modalRef?: BsModalRef;
    submitForm: boolean = false;
    showAlert: boolean = false;
    openModal: boolean = false;
    @ViewChild('admitModal')
    admitModal?: TemplateRef<any>

    sFormErrors: string[] = [];
    pFormErrors: string[] = [];
    viewMode: string  = 'student';
    order: number = 0;


    ngOnInit()
    {
        this.classRepo.loadClasses(true);

        this.sessionRepo.loadSessions(true);
    }
    
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

    resetSubmitBtn()
    {
        this.showAlert = false;
        this.submitForm = false;
    }

    //Get the list of errors on the student form returned as an event
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

    //Get the list of errors on the parent form returned as an event
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
            //if no form errors exist send data to the database
            //display a modal
            if(this.sFormErrors.length == 0)
            {
                this.showAdmitModal()
            }
        } 

        this.submitForm = false;
    }

    get saveCompleted()
    {
        return this.studentRepo.completedAdd;
    }

    showAdmitModal() {
        this.modalRef = this.modalService.show(SubmitModalComponent);
     }
}
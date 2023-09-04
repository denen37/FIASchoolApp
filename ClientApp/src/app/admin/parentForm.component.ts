import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Parent, ParentStudentJunction } from "../models/parent.model";
import { FormValidator } from "./formValidator.model";

const MAX_PARENTS = 2;

@Component({
    selector: 'parent-form',
    templateUrl: 'parentForm.component.html'
})

export class ParentFormComponent {
    public relationships: string[] = ["Father", "Mother", "Grandmother", "Grandfather", 
    "Uncle", "Aunty", "Cousin", "Brother", "Sister", "Others"];

    public maritalStatusCollection: string[] = ["Married", "Single", "Divorced", "Widow", "Widower"];
    index: number = 0
    constructor() {
        
        this.parentsOfStudent = new Array<ParentStudentJunction>();
        //this.parentStudent = new ParentStudentJunction();
    }

    //Passed from the FormPageComponent
    @Input()
    parentsOfStudent: ParentStudentJunction[]
    @Input()
    formSubmitted?: boolean
    @Output()
    parentFormErrors = new EventEmitter<string[]>();
    @ViewChild(NgForm)
    pForm?: NgForm


    ngOnChanges()
    {
        if (this.formSubmitted) {
            let errors = this.validateForm(this.pForm)

            setTimeout(() => {
                this.parentFormErrors.emit(errors);
            });
       } 
       //console.log(`formSubmitted: ${this.formSubmitted}`);
    }
    //Gets the Parent-Student connection based on index
    //if it is not available create a new connection
    get parentStudent():ParentStudentJunction
    {
        return this.parentsOfStudent[this.index]?
               this.parentsOfStudent[this.index]:
               this.parentsOfStudent[this.index] = new ParentStudentJunction();
    }

    set parentStudent(value: ParentStudentJunction)
    {
        this.parentsOfStudent[this.index] = value;
    }

    //Get the parent from a particular parent-student connection
    get parent(): Parent
    {
        if (!this.parentStudent.parent) {
            this.parentStudent.parent = new Parent()
        }

        return this.parentStudent.parent;
    }

    //Set the parent to particular parent-student connection
    set parent(value: Parent)
    {
        this.parentStudent.parent = value
    }


    // Add the existing parent-student connection to the list
    //Increase the index(if undefined create a new connection)
    //-check get parentStudent() method
    addParent(form: NgForm){
        this.index++;
        form.reset();
    }

    get hasNextParent(): boolean
    {
        return this.index + 1 <= this.parentsOfStudent.length - 1;
    }

    get hasPrevParent(): boolean{
        return this.index - 1 >= 0
    }

    get studentHasParent(){
        return this.parentsOfStudent.length > 0;
    }

    get canAddParent(){
        return this.parentsOfStudent.length < MAX_PARENTS
    }

    get maritalStatus()
    {
        if(!this.parent.maritalStatus)
        {
            this.parent.maritalStatus = "Married";
        }
        return this.parent.maritalStatus;
    }

    set maritalStatus(v: string)
    {
        this.parent.maritalStatus = v;
    }

    get relationship()
    {
        if(!this.parentStudent.relationship)
        {
            this.parentStudent.relationship = "Father";
        }
        return this.parentStudent.relationship;
    }

    set relationship(v: string)
    {
        this.parent.maritalStatus = v;
    }

    validateForm(form: NgForm | undefined): string[] | undefined
    {
        if(form && form.invalid)
        {
            return FormValidator.getFormValidationMessages(form);
        }

        return undefined;
    }

    //Retrieves all the errors from  a form element
    getValidationErrors(state: any, thingName?: string)
    {
        return FormValidator.getValidationErrors(state, thingName);
    }
}
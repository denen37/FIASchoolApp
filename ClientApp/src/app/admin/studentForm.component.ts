import { Component, EventEmitter, Output, ViewChild } from '@angular/core'
import { Input } from '@angular/core'
import { Disability, Student } from '../models/student.model'
import { country_and_states } from "../dropdowns/country-states";
import { nigeria_state_and_lgas } from "../dropdowns/nigeria-state-and-lgas";
import { NgForm } from '@angular/forms';
import { FormValidator } from './formValidator.model';

@Component({
    selector: 'student-form',
    templateUrl: "studentForm.component.html"
})

export class StudentFormComponent {
    constructor() {
        this.student = new Student();
    }

    @Input()
    student: Student

    @Input()
    formSubmitted?: boolean

    @Input()
    saveCompleted?: boolean

    @Output()
    studentFormErrors = new EventEmitter<string[]>();

    @ViewChild(NgForm)
    sForm?: NgForm

    ngOnInit()
    {
        this.disability = new Disability();
    }

    ngOnChanges()
    {
       if (this.formSubmitted) {
            let errors = this.validateForm(this.sForm)
            
            setTimeout(() => {
                this.studentFormErrors.emit(errors);
            });
       } 

       if(this.saveCompleted)
       {
            this.sForm?.reset();
       }
    }

    get disability(): Disability
    {
        return this.student.disability || new Disability();
    }

    set disability(value: Disability)
    {
        this.student.disability = value;
    }

    get dateOfBirth()
    {
         //return new Date(this.formatDate(this.student.dateOfBirth));
         return this.formatDate(this.student.dateOfBirth);
    }

    formatDate(date: Date = new Date())
    {
        let shortDate = date.toLocaleString('default', {year: 'numeric'});
        let pos = shortDate.indexOf('T');

        return shortDate = shortDate.substring(pos, 0);
    }

    set dateOfBirth(v: string)
    {
        this.student.dateOfBirth = new Date(v);
    }

    get countries()
    {
        let countryList = Object.values(country_and_states.country)
            
        return countryList
    }

    get states()
    {
        let countryAndCodes = Object.entries(country_and_states.country)
        .map((value, index) => ({
        'key': value[0],
        'value': value[1]
        }));

        let countryCode = countryAndCodes.find((entry) =>
        {
            return  entry.value == this.student.nationality;
        })?.key;

        
        if (countryCode) {
            type key = keyof typeof country_and_states.country
    
            let keyCode = countryCode as key
    
            let s = country_and_states.states[keyCode]
    
            let stateList =  s.map((value, index) => ({
                'code': value.code,
                'state': value.name
            }).state);
            
            return stateList;
        }

        return []
    }

    get lgas()
    {
        let state_lgas = nigeria_state_and_lgas.find( x => {
            return x.state == this.state
        })?.lgas

        return state_lgas
    }

    get country()
    {
        //console.log(`country: ${this.student.nationality}`);
        
        if(!this.student.nationality)
        {
            this.student.nationality = 'Nigeria'
        }

        return this.student.nationality;
    }

    set country(v: string)
    {
        this.student.nationality = v;
    }

    get state()
    {
        if (!this.student.stateOfOrigin) {
            this.student.stateOfOrigin = 'Benue'
        }

        return this.student.stateOfOrigin;
    }

    set state(v: string)
    {
        this.student.stateOfOrigin = v;
    }

    get lga()
    {
        if (!this.student.lga) {
            this.student.lga = 'Makurdi'
        }

        return this.student.lga;
    }

    set lga(v: string)
    {
        this.student.lga = v;
    }

    validateForm(form: NgForm | undefined): string[] | undefined
    {
        if(form && form.invalid)
        {
            return FormValidator.getFormValidationMessages(form);
        }

        return undefined;
    }


    getValidationErrors(state: any, thingName?: string)
    {
        return FormValidator.getValidationErrors(state, thingName);
    }
}
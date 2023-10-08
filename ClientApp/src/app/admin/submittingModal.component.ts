import { Component} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StudentRepository } from '../models/studentRepository.model';

@Component({
    templateUrl: 'submittingModal.component.html'
})

export class SubmittingModalComponent
{
    constructor(private modalRef: BsModalRef,
                private studentRepo: StudentRepository)
    {
        
    }

    get saveCompleted()
    {
        return this.studentRepo.completedAdd;
    }

    get saveError()
    {
        return this.studentRepo.addStudentError;
    }
    
    hideSubmittingModal()
    {
        this.modalRef?.hide();
    }
}
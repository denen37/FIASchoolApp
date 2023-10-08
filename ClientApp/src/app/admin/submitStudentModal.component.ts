import {Component, OnInit} from '@angular/core'
import { StudentRepository } from '../models/studentRepository.model';
import { ClassRepository } from '../models/classRepository.model';
import { SessionRepository } from '../models/sessionRepository.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentClassArmJunction } from '../models/studentClassArm.model';
import { SubmittingModalComponent } from './submittingModal.component';

@Component({
    selector: 'submit-modal',
    templateUrl: 'submitStudentModal.component.html'
})
export class SubmitModalComponent implements OnInit
{
    modalRef?: BsModalRef;
    selectedClass: string = ''
    selectedArm: string = ''
    selectedClassArmId:number = 0;
    selectedSession: string = '';
    selectedTerm: string = ''

    constructor(
                private modalService: BsModalService,
                private studentRepo: StudentRepository,
                private classRepo: ClassRepository,
                private sessionRepo: SessionRepository)
                {
                    
                }

    ngOnInit(): void {
    }

    get student()
    {
       return this.studentRepo.student;
    }

    get classes()
    {
        return this.classRepo.classes;
    }

    get arms()
    {
        return this.classes?.find(c => c.name == this.selectedClass)?.classArm
        .map(x => x.arm.name).sort();
    }


    getSelectedClassArm()
    {
        let classArmId = this.classes?.find(c => c.name == this.selectedClass)?.classArm
        .map(x => (
            {
                'classArmId': x.id,
                'arm': x.arm.name
            }
        )).find(x => x.arm == this.selectedArm)?.classArmId;
        return classArmId
    }

    setSelectedSession(value: string)
    {
        this.selectedSession = value;
    }

    getSelectedSessionTerm()
    {
        return this.sessions?.find(s => s.name == this.selectedSession)?.sessionTerms
        .map(x => ({
            'sessionTermId': x.id,
            'term': x.term.name
        })).find(t => t.term == this.selectedTerm)
        ?.sessionTermId;
    }

    get sessions()
    {
        return this.sessionRepo.sessions?.reverse();
    }

    get terms()
    {
        return this.sessions?.find(s => s.name == this.selectedSession)?.sessionTerms?.map(x => x.term.name);
    }

    hideAdmitModal()
    {
    this.modalRef?.hide();
    }

    get fullName(){
        let name = "";
        if (this.student?.lastName) {
            name = this.student.lastName;
        }

        if (this.student?.middleName) {
            name += " " + this.student.middleName;
        }

        if (this.student?.firstName) {
            name += " " + this.student.firstName;
        }

        return name;
    }

    get isClassSelected()
    {
        return this.selectedClass.length != 0 && this.selectedArm.length != 0
                && this.selectedSession.length!= 0 && this.selectedTerm.length != 0
    }

    assignStudent()
    {
        if (this.isClassSelected) {
            let classArmId = this.getSelectedClassArm();
            let sessionTermId = this.getSelectedSessionTerm()
            
            this.student?.studentClassArm?.push(new StudentClassArmJunction
                (undefined, this.student.Id, classArmId, sessionTermId))
        
        return true;
        }
        else{
            return false;
        }
    }

    submitStudentForm()
    {
        this.assignStudent();
        this.studentRepo.addStudent();
        this.hideAdmitModal();
        this.showSubmittingModal();
    } 

    showSubmittingModal() {
        this.modalRef = this.modalService.show(SubmittingModalComponent);
     }
}
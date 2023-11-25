import {Component, OnInit} from '@angular/core'
import { StudentRepository } from '../models/studentRepository.model';
import { ClassRepository } from '../models/classRepository.model';
import { SessionRepository } from '../models/sessionRepository.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentClassArmJunction } from '../models/studentClassArm.model';
import { SubmittingModalComponent } from './submittingModal.component';
import { Student } from '../models/student.model';

@Component({
    selector: 'submit-modal',
    templateUrl: 'submitStudentModal.component.html'
})
export class SubmitModalComponent implements OnInit
{
    state?: string
    create!: boolean
    title?: string
    student!: Student
    modalRef2?: BsModalRef;
    selectedClass: string = ''
    selectedArm: string = ''
    selectedClassArmId:number = 0;
    selectedSession: string = '';
    selectedTerm: string = ''

    constructor(
                public modalRef: BsModalRef,
                private modalService: BsModalService,
                private studentRepo: StudentRepository,
                private classRepo: ClassRepository,
                private sessionRepo: SessionRepository)
                {
                }

    ngOnInit(): void {
        this.create = this.state == 'create';
    }

    get classes()
    {
        return this.classRepo.classes;
    }

    get arms()
    {
        return this.classes?.find(c => c.name == this.selectedClass)?.classArms
        .map(x => x.arm?.name).sort();
    }


    getSelectedClassArm()
    {
        let classArmId = this.classes?.find(c => c.name == this.selectedClass)?.classArms
        .map(x => (
            {
                'classArmId': x.id,
                'arm': x.arm?.name
            }
        )).find(x => x.arm == this.selectedArm)?.classArmId;
        return classArmId
    }

    setSelectedSession(value: string | undefined)
    {
        this.selectedSession = value || '';
    }

    getSelectedSessionTerm()
    {
        return this.sessions?.find(s => s.name == this.selectedSession)?.sessionTerms?.map(x => ({
            'sessionTermId': x.id,
            'term': x.term?.name
        })).find(t => t.term == this.selectedTerm)
        ?.sessionTermId;
    }

    get sessions()
    {
        return this.sessionRepo.sessions?.reverse();
    }

    get terms()
    {
        return this.sessions?.find(s => s.name == this.selectedSession)?.sessionTerms?.map(x => x.term?.name);
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
        this.studentRepo.student = this.student;
        this.studentRepo.addStudent();
        this.hideAdmitModal();
        this.showSubmittingModal();
    } 

    showSubmittingModal() {
        this.modalRef2 = this.modalService.show(SubmittingModalComponent);
     }

     hideAdmitModal()
    {
        this.modalRef?.hide();
    }
}
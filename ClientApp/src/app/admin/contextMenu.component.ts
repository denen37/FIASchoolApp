import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core'
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { StudentsInClass } from '../models/studentInClass.model';
import { StudentRepository } from '../models/studentRepository.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    templateUrl: 'contextMenu.component.html',
    selector: 'context-menu'
})
export class ContextMenuComponent {
    constructor(private studentRepo: StudentRepository,
                private modalService: BsModalService) {}

    @Input()
    contextMenuStudent!: StudentsInClass;

    @ViewChild('dropdown')
    dropdown?: BsDropdownDirective

    title!: string;
    modalRef?: BsModalRef
    isDelete = false


    ngAfterViewInit()
    {
        this.title = this.getFullName(this.contextMenuStudent);
        this.dropdown?.show();
    }

    getFullName(value: StudentsInClass)
    {
        return value.lastName + ' '
        + (value.middleName?value.middleName + ' ':'')
        + value.firstName;
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
      }
    
      closeModal()
      {
        this.modalRef?.hide()
      }

    deleteStudent(id: number)
    {
        this.isDelete = true
        this.studentRepo.deleteStudent(id);
        this.closeModal();
    }

    get deleteComplete()
    {
        return this.studentRepo.deleteCompleted
    }

    get deleteError()
    {
        return this.studentRepo.deleteError;
    }
}
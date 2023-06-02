import { Component } from "@angular/core";
import { StudentFilter } from "../filters/studentFilter.model";
import { Output, EventEmitter } from "@angular/core";
import { SubjectRepository } from "../models/subjectRepository.model";
import { Subject } from "../models/classSubject.model";

@Component({
    selector: 'select-subject',
    templateUrl: 'subjectTermDropdown.component.html'
})

export class SubjectTermDropdownComponent
{
    constructor(private subjectRepo: SubjectRepository,
                private filter: StudentFilter){

    }   

    @Output()
    selectionChanged = new EventEmitter();

    ngOnInit()
    {
        this.subjectRepo.getSubjects();
    }

    get subjects(): Subject[] | undefined
    {
        return this.subjectRepo.subjects;
    }

    get selectedSubject(): string | undefined
    {
        if (!this.filter.subject) {
            this.filter.subject = 'English';
        }
        return this.filter.subject ;
    }

    set selectedSubject(value)
    {
        this.filter.subject = value;
        this.selectionChanged.emit();
    }

    selectSubject(subject: Subject)
    {
        this.selectedSubject = subject.name;
        this.filter.subjectId = subject.id;
    }
}
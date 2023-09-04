import { Component, EventEmitter, Output } from '@angular/core';
import { StudentRepository } from '../models/studentRepository.model';
import { StudentNames } from '../models/studentInClass.model';
import { StudentFilter } from '../filters/studentFilter.model';

@Component({
    selector: 'student-names',
    templateUrl: 'studentNames.component.html'
})

export class StudentNamesComponent {
    constructor(private studentRepo: StudentRepository,
                private filter: StudentFilter) {}
    
    @Output()
    clickHandler = new EventEmitter();

    ngOnInit()
    {
        this.loadStudents.call
    }

    get studentNames(): StudentNames[] | undefined
    {
        return this.studentRepo.studentNames;
    }

    get completed() : boolean | undefined
    {
        return this.studentRepo.completedNames
    }

    loadStudents()
    {
        this.studentRepo.getStudentNames(this.filter)
    }

    get loadError(): boolean | undefined
    {
        return this.studentRepo.loadStudentNamesError;
    }

    emitClick(item: StudentNames)
    {
        this.filter.studentId = item.id;
        this.filter.name = item.fullName;
        this.clickHandler.emit();
    }

    isSelected(id: number): boolean
    {
        return this.filter.studentId == id
    }
}
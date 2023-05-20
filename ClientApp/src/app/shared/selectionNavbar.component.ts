import { Component } from '@angular/core';
import { ClassRepository } from '../models/classRepository.model';
import { ArmRepository } from '../models/armRepository.model';
import { SessionRepository } from '../models/sessionRepository.model';
import { Session } from '../models/sessionTerm.model';
import { Class, Arm } from '../models/studentClassArm.model';
import { StudentFilter } from '../filters/studentFilter.model';
import { StudentParameters } from '../filters/studentParameters.model';
import { StudentRepository } from '../models/studentRepository.model';

@Component({
    selector: 'select-nav',
    templateUrl: 'selectionNavbar.component.html'
})

export class SelectionNavbarComponent {
    selectedClass?: string;
    selectedArm?: string;
    selectedSession?: string;
    searchStudent?: string;
    filter: StudentFilter;


    constructor(private classRepo: ClassRepository,
                private armRepo: ArmRepository,
                private sessionRepo: SessionRepository,
                private studentRepo: StudentRepository,
                private params: StudentParameters) 
    {
        this.filter = new StudentFilter ();
        this.params.post = true;
        this.params.morals = true;
        this.params.overallPerformance = true;
        this.params.parents = true;
        this.params.payments = true;
    }

    ngOnInit() {
        this.loadStudentParameters();
    }

    loadStudents(){
        this.filter.classroom = this.selectedClass;
        this.filter.arm = this.selectedArm;
        this.filter.session = this.selectedSession;
        this.filter.name = this.searchStudent;
        this.studentRepo.getStudents(this.filter);
    }

    loadStudentParameters() {
        this.classRepo.loadClasses();
        this.armRepo.loadArms();
        this.sessionRepo.loadSessions();
    }

    public get completedClass(): boolean | undefined{
        return this.classRepo.completed;
    }

    public get completedArm(): boolean | undefined{
        return this.armRepo.completed;
    }

    public get completedSession(): boolean | undefined{
        return this.sessionRepo.completed;
    }

    public get classes() : Class[]{
        return this.classRepo.classes || [];
    }

    public get arms(): Arm[]{
        return this.armRepo.arms || [];
    }

    public get sessions(): Session[]{
        return this.sessionRepo.sessions || [];
    }
}
import { Component } from '@angular/core';
import { ClassRepository } from '../models/classRepository.model';
import { ArmRepository } from '../models/armRepository.model';
import { SessionRepository } from '../models/sessionRepository.model';
import { Session } from '../models/sessionTerm.model';
import { Class, Arm } from '../models/studentClassArm.model';
import { StudentFilter } from '../filters/studentFilter.model';
import { StudentParameters } from '../filters/studentParameters.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'select-nav',
    templateUrl: 'selectionNavbar.component.html'
})

export class SelectionNavbarComponent {
    termList = ["First", "Second", "Third"];
    constructor(private classRepo: ClassRepository,
                private armRepo: ArmRepository,
                private sessionRepo: SessionRepository,
                private params: StudentParameters,
                private filter: StudentFilter) 
    {
        this.params.post = true;
        this.params.morals = true;
        this.params.overallPerformance = true;
        this.params.parents = true;
        this.params.payments = true;
    }

    ngOnInit() {
        this.loadStudentParameters();
    }

    @Output()
    selectionChanged = new EventEmitter();

    load()
    {
        this.selectionChanged.emit();
    }

    get selectedClass(): string | undefined
    {
        return this.filter.classroom;
    }

    set selectedClass(value)
    {
        this.filter.classroom = value;
        this.selectionChanged.emit();
    }

    get selectedArm(): string | undefined
    {
        return this.filter.arm;
    }

    set selectedArm(value)
    {
        this.filter.arm = value;
        this.selectionChanged.emit();
    }

    get selectedSession(): string | undefined
    {
        return this.filter.session;
    }

    set selectedSession(value)
    {
        this.filter.session = value;
        this.selectionChanged.emit();
    }
    get selectedTerm(): string
    {
        if (!this.filter.term) {
            this.filter.term = 'First';
        }
        return this.filter.term ;
    }

    set selectedTerm(value)
    {
        this.filter.term = value;
        this.selectionChanged.emit();
    }

    get searchStudent(): string | undefined
    {
        return this.filter.name;
    }

    set searchStudent(value)
    {
        this.filter.name = value;
    }

    loadStudentParameters() {
        this.classRepo.loadClasses();
        this.armRepo.loadArms();
        this.sessionRepo.loadSessions();
    }

    getClasses(){
        this.classRepo.error = undefined;
        this.classRepo.completed = undefined;
        this.classRepo.loadClasses();
    }

    getArms(){
        this.armRepo.error = undefined;
        this.armRepo.completed = undefined;
        this.armRepo.loadArms();
    }

    getSessions(){
        this.sessionRepo.error = undefined
        this.sessionRepo.completed = undefined;
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

    public get armError(): boolean
    {
        return this.armRepo.error;
    }
    public get classError(): boolean
    {
        return this.classRepo.error;
    }

    public get sessionError(): boolean
    {
        return this.sessionRepo.error;
    }

    public btnClass(loadError: boolean): Object
    {
        return {
            "btn-light": !loadError,
            "btn-outline-danger": loadError
        }
    }
}
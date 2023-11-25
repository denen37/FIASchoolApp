import { Component, Input } from '@angular/core';
import { ClassRepository } from '../models/classRepository.model';
import { SessionRepository } from '../models/sessionRepository.model';
import { Session } from '../models/sessionTerm.model';
import { Class } from '../models/studentClassArm.model';
import { StudentFilter } from '../filters/studentFilter.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'select-nav',
    templateUrl: 'selectionNavbar.component.html'
})

export class SelectionNavbarComponent {
    termList = ["First", "Second", "Third"];
    constructor(private classRepo: ClassRepository,
                private sessionRepo: SessionRepository,
                private filter: StudentFilter) 
    {
    }

    ngOnInit() {
        this.loadStudentParameters();
    }

    @Output()
    selectionChanged = new EventEmitter();
    @Input()
    includeTerm: boolean = true;

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
        this.classRepo.loadClasses(true);
        this.sessionRepo.loadSessions(false);
    }

    public get completedClass(): boolean | undefined{
        return this.classRepo.completed;
    }

    public get completedArm(): boolean | undefined{
        return this.classRepo.completed;
    }

    public get completedSession(): boolean | undefined{
        return this.sessionRepo.completed;
    }

    public get classes() : Class[]{
        return this.classRepo.classes || [];
    }

    public get arms(){
        return this.classes?.find(c => c.name == this.selectedClass)?.classArms
        .map(x => x.arm?.name).sort() || [];
    }

    public get sessions(): Session[]{
        return this.sessionRepo.sessions?.sort() || [];
    }

    public get armError(): boolean
    {
        return this.classRepo.error;
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
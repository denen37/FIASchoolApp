import { Component } from "@angular/core";
import { StudentRepository } from "../models/studentRepository.model";
//import { StudentFilter } from "../filters/studentFilter.model";
import { StudentsInClass } from "../models/studentInClass.model";
import { ClassRepository } from "../models/classRepository.model";
import { Class, Arm} from "../models/studentClassArm.model";
import { ArmRepository } from "../models/armRepository.model";
import { SessionRepository } from "../models/sessionRepository.model";
import { Session } from "../models/sessionTerm.model";
import { StudentFilter } from "../filters/studentFilter.model";
import { Router } from "@angular/router";

@Component({
    selector: "student",
    templateUrl: "studentList.component.html"
})

export class StudentListComponent {

    selectedClass?: string;
    selectedArm?: string;
    selectedSession?: string;
    //selectedStudent?: StudentsInClass;
    searchStudent?: string;
    filter: StudentFilter;

    constructor(private studentRepo: StudentRepository,
                private classRepo: ClassRepository,
                private armRepo: ArmRepository,
                private sessionRepo: SessionRepository,
                private router: Router) 
    {
                this.filter = new StudentFilter ();
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
    
    public get students() : StudentsInClass[]{
        return this.studentRepo.students||[];
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

    public get completed(): boolean | undefined{
        return this.studentRepo.completedAll;
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

    public viewDetails(id: number){
        this.studentRepo.getStudent(id);
        this.router.navigateByUrl(`students/details/${id}`);
    }
}
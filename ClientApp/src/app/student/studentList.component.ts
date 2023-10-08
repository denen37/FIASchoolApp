import { Component } from "@angular/core";
import { StudentRepository } from "../models/studentRepository.model";
import { StudentsInClass } from "../models/studentInClass.model";
import { StudentFilter } from "../filters/studentFilter.model";
import { ClassRepository } from "../models/classRepository.model";
import { Class } from "../models/studentClassArm.model";
import { SessionRepository } from "../models/sessionRepository.model";
import { Pagination } from "../models/pagination.model";


@Component({
    selector: "student",
    templateUrl: "studentList.component.html"
})

export class StudentListComponent {
    tempClass: string = ''
    _latestSession?: string 
    openSideBar = false
    accItemName: string = ''
    pageOption: Pagination = new Pagination(1, 3);

    constructor(private studentRepo: StudentRepository,
                private filter: StudentFilter,
                private classRepo: ClassRepository,
                private sessionRepo: SessionRepository) 
    { 
    }

    public studentCount(_class: string, arm: string)
    {
       return this.studentRepo.studentCount?.find(x => {
            return x._class == _class && x.arm == arm
        })?.count || 0;
    }

    public get latestSession()
    {
        if (!this._latestSession) {
            this.latestSession = this.sessionRepo.sessions?.sort().reverse()[0].name
        }
        return this._latestSession;
    }
    
    public set latestSession(value: string| undefined)
    {
        this._latestSession = value;
        this.studentRepo.getStudentCount(this._latestSession??'')
    }

    public get sessions()
    {
        return this.sessionRepo.sessions?.sort();
    }

    public get students() {
        return this.studentRepo.students?.pageList||[];
    }

    public get completed(): boolean | undefined{
        return this.studentRepo.completedAll;
    }

    loadBtn()
    {
        this.resetPage();
        this.accItemName = this.getAccordionItemName(this.filter.classroom??'', this.filter.arm??'')
        this.studentRepo.getStudents(this.filter, this.pageOption);
    }

    reload(){
        if (this.studentRepo.students) {
            this.resetPage();
            this.accItemName = this.getAccordionItemName(this.filter.classroom??'', this.filter.arm??'')
            this.studentRepo.getStudents(this.filter, this.pageOption);
        }
    }

    public get classes() : Class[]{
        return this.classRepo.classes || [];
    }

    public arms(_class: string): string[]{
        return this.classes?.find(c => c.name == _class)?.classArm
        .map(x => x.arm.name).sort() || [];
    }
    
    private _pages: boolean[] = [];

    public get totalPages(): number{
        return this.studentRepo?.students?.totalPages??0
    }
    public get hasNextPage()
    {
        return this.pageOption.currentPage < this.totalPages
    }
    public get hasPreviousPage()
    {
        return this.pageOption.currentPage > 1;
    }

    public get pages(): boolean[]
    {
        if (this.studentRepo.students?.totalPages) {
            return this._pages = new Array<boolean>(this.totalPages).fill(false)
            .map((val, i) => {return this.pageOption.currentPage == i + 1 ? true : false});
        }

        return this._pages;
    }

    public setPage(page: number)
    {
        this.pageOption.currentPage = page;
    }
    public resetPage()
    {
        this.pageOption.currentPage = 1;
        this._pages = [];
    }

    public loadPage(page: number)
    {
        this.setPage(page);
        this.studentRepo.getStudents(this.filter, this.pageOption);
    }

    accordionClickAction(className: string, arm: string)
    {
        this.filter.classroom = className;
        this.filter.arm = arm;
        this.filter.session = this._latestSession;
        this.resetPage();

        this.studentRepo.getStudents(this.filter, this.pageOption);
        return this.getAccordionItemName(className, arm);
    }

    public getAccordionName(name: string)
    {
        return name = name.replace(/\s+/g, '')
    }

    getAccordionItemName(className: string, arm: string)
    {
        return className.replace(/\s+/g, '') + arm;
    }
}
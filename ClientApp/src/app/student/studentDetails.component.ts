import { Component } from "@angular/core";
import { StudentRepository } from "../models/studentRepository.model";
import { Student } from "../models/student.model";
import { ResultFilter } from "../filters/reportFilter.model";
import { ReportCardRepository } from "../models/reportCardRepository.model";
import { BasicStudentInfo, OverallPerformance, ReportCard } from "../models/reportCard.model";
import {ActivatedRoute, Router } from "@angular/router";
import { StudentParameters } from "../filters/studentParameters.model";
import { ParentStudentJunction } from "../models/parent.model";

@Component({
        selector: "student-details",
        templateUrl: "studentDetails.component.html"
    })

export class StudentDetailsComponent{
  
  private filter = new ResultFilter();
  private studentId: number;

    constructor(private studentRepo: StudentRepository,
                private params: StudentParameters,
                private reportRepo: ReportCardRepository,
                private router: Router,
                private activeRoute: ActivatedRoute)
    {
       this.studentId = activeRoute.snapshot.params["id"];
    }

    ngOnInit()
    {
      this.loadStudent();
    }

    private loadStudent()
    {
      this.studentRepo.getStudent(this.studentId, this.params);
    }

    fullname(lastName: string| undefined, middleName: string | undefined, firstName: string | undefined): string
    {
      var name = 'Loading...'
      if (lastName) {
        name = lastName;
      }

      if (middleName) {
        name = name + " " + middleName;
      }

      if(firstName)
      {
        name = name + " " + firstName;
      }

      return name;
    }
    
    get student(): Student | undefined{
        return this.studentRepo.student;
    }

    get parents() : ParentStudentJunction[]
    {
      return this.student?.parentStudentJunction || []
    }

    get skills(): string
    {
      let skills = 'none'
      if (this.student?.skill1) {
        skills = this.student.skill1;
      }
      if (this.student?.skill2) {
        skills = skills + ', ' + this.student.skill2;
      }

      return skills;
    }

    get completed(): boolean | undefined{
        return this.studentRepo.completedOne;
    }

    //Gets the rowspan for academics and payment tab
    public getRowspan(term: string): number
    {
      let rowspan = 1;

      if(term == 'First' || term == 'First Term')
        rowspan = 3;
      else if(term == 'Second' || term == 'Second Term')
        rowspan = 2;

       return rowspan;
    }

    public paymentHasRowspan(index: number): boolean{
      if(this.studentRepo.paymentHasRowspan.length > 0)
      return this.studentRepo.paymentHasRowspan[index];
      return false;
    }

    public academicsHasRowspan(index: number): boolean{
      if(this.studentRepo.academicsHasRowspan.length > 0)
      return this.studentRepo.academicsHasRowspan[index];
      return false;
    }

    viewDossier(performance: OverallPerformance){
      
      if (!this.reportRepo.reportCard.student) {
        this.reportRepo.reportCard.student = new BasicStudentInfo(
          this.student?.lastName + " " + this.student?.middleName + " " + this.student?.firstName,
          this.student?.sex || "unspecified",
          this.student?.age || 0,
          this.student?.admissionNumber || "unspecified"
        )

        this.filter.student = false;
      }

      this.reportRepo.reportCard.performance = performance;
      this.filter.performance  = false;
      
      this.reportRepo.reportId = performance.academicReportId;
      this.reportRepo.getResult(this.filter);
    }
}
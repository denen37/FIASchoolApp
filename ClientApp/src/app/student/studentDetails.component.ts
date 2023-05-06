import { Component } from "@angular/core";
import { StudentRepository } from "../models/studentRepository.model";
import { Student } from "../models/student.model";

@Component({
        selector: "student-details",
        templateUrl: "studentDetails.component.html"
    })

export class StudentDetailsComponent{
  private session: string = "";
  //private paymentSession: string = "";
  private paymentIndex: number = 0;
  private getIndex: number = 0;
    constructor(private studentRepo: StudentRepository
                /*private parentRepo: ParentRepository*/)
    {}
    
    get student(): Student | undefined{
        return this.studentRepo.student;
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
    public getOrdinal(n: number): string {
        let ord = 'th';
      
        if (n % 10 == 1 && n % 100 != 11)
        {
          ord = 'st';
        }
        else if (n % 10 == 2 && n % 100 != 12)
        {
          ord = 'nd';
        }
        else if (n % 10 == 3 && n % 100 != 13)
        {
          ord = 'rd';
        }
      
        return ord;
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

    
}
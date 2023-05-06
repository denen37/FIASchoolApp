import { OverallPerformance } from "../models/reportCard.model";
import { PaymentRecord } from "../models/studentPayment.model";

export class StudentRecordService
{
    private paymentHasRowspanArray: boolean[] = [];
    private resultHasRowspanArray : boolean[] = [];
    private session: string = '';

    getPaymentRowspanArray(paymentRecords: PaymentRecord[]): boolean[]
    {
        this.session = '';
        this.paymentHasRowspanArray = [];
        paymentRecords.forEach(element => {
            this.paymentHasRowspanArray.push(this.hasRowspan(element.session));
        });

        return this.paymentHasRowspanArray;
    }

    getResultRowspanArray(overallPerformance: OverallPerformance[]): boolean[]
    {
        this.session = '';
        this.resultHasRowspanArray = [];
        overallPerformance.forEach(element => {
          this.resultHasRowspanArray.push(this.hasRowspan(element.session));
        });

        return this.resultHasRowspanArray;
    }

    private hasRowspan(session: string): boolean{
        let extendRow = false;
        
        if (session != this.session) {
          this.session = session;
          extendRow = true;
        }
  
        return extendRow;
      }
}
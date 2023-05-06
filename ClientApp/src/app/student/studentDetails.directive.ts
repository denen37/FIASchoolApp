import { Directive, Input, ElementRef , HostListener} from '@angular/core';
//import { PaymentRecord } from '../models/studentPayment.model';

@Directive({
  selector: '[btnMoreOrLess]'
})
export class StudentDetailsDirective {
    constructor(private el: ElementRef) { }

    @HostListener('click')
    onClick(){
        let textContent = this.el.nativeElement.textContent;
        this.el.nativeElement.textContent = this.changeTextContent(textContent);
    }

    changeTextContent(content: string): string
    {
        if (content == "More...") {
            content = "Less...";
        }
        else{
            content = "More..."
        }

        return content;
    }
}
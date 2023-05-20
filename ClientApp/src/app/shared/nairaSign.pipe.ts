import { Pipe } from "@angular/core";

@Pipe({
    name: "naira"
})

export class NairaSignPipe {
    transform(value: any): string
    {
        let naira = "\u20a6";
        let money = Number.parseFloat(value);
        let m = money.toLocaleString();
        return `${naira}${m}`;
    }
}
import { Pipe } from "@angular/core";

@Pipe({
    name: "ordinal"
})

export class OrdinalPipe
{
    transform(value: any): string
    {
        let number = Number.parseInt(value);

        return this.getOrdinal(number);

    }

    private getOrdinal(n: number): string {
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
}

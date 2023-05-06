import { SessionTermJunction } from "./sessionTerm.model";

    export class PaymentRecord
    {
        constructor(
            public id: number,
            public session: string,
            public term: string,
            public studentId: number,
            public arrears: number,
            public amountPayable: number,
            public total: number,
            public numOfPayments: number, 
            public payments: Payment[],
        ){}
    }

    export class Payment
    {
        constructor(
            public id: number,
            public paymentRecordId: number,
            public amount: number,
            public balance: number,
            public date: Date
        ){}
    }
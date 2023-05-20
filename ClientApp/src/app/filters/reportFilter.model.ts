export class ResultFilter {
    constructor(
        public student: boolean = true,
        public result: boolean = true,
        public performance: boolean = true,
        public skills: boolean = true
    ) {}
}
export class StudentsInClass {
    constructor(
        public id: number,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public admissionNumber: string,
        public sex: string,
        public currentClass: string
        //public _class: string,
        //public arm: string,
        //public session: string
        ) {}
}

export class StudentsInPage {
    constructor(
        public pageList: StudentsInClass[],
        public totalPages: number
    ) {}
}

export class StudentNames{
    constructor(
    public id: number,
    public fullName: string
    ){}
    
}
    

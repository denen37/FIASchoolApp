export class StudentsInClass {
    constructor(
        public id: number,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public admissionNumber: string,
        public sex: string,
        public _class: string,
        public arm: string,
        public session: string) {}
}
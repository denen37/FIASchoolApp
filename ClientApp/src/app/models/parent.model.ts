export class Parent
{
    constructor(
        public Id: number,
        public Title: string,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public address: string,
        public phone1: string,
        public phone2: string,
        public email: string,
        public occupation: string,
        public maritalStatus: string
    ){}
}

export class ParentStudentJunction
{
    constructor(
        public Id: number,
        public studentId: number,
        public parentId: number,
        public parent: Parent,
        public relationship: string,
        public isLivingTogether: boolean
    ){}
}
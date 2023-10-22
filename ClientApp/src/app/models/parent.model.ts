export class Parent
{
    constructor(
        public id: number | undefined = undefined,
        public title: string | undefined = undefined,
        public firstName: string | undefined = undefined,
        public middleName: string | undefined = undefined,
        public lastName: string | undefined = undefined,
        public address: string | undefined = undefined,
        public phone1: string | undefined = undefined,
        public phone2: string | undefined = undefined,
        public email: string | undefined = undefined,
        public occupation: string | undefined = undefined,
        public maritalStatus: string | undefined = undefined
    ){}
}

export class ParentStudentJunction
{
    constructor(
        public id: number | undefined = undefined,
        public studentId: number | undefined = undefined,
        public parentId: number | undefined = undefined,
        public parent: Parent | undefined = undefined,
        public relationship: string | undefined = undefined,
        public isLivingTogether: boolean = false
    ){}
}
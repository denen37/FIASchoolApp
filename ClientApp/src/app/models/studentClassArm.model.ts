import { CourseCategory } from "./classSubject.model";

export class Class {
    constructor(
        public id: number,
        public name: string,
        public classArms: ClassArmJunction[]
    ) {}
}

export class Arm {
    constructor(
        public id: number,
        public name: string,
        public classArms?: ClassArmJunction[]
    ) { }
}

export class ClassArmJunction
{
    constructor(
        public id: number = 0,
        public classId: number = 0,
        public _class?: Class,
        public armId: number = 0,
        public arm?: Arm,
        public courseCategoryId: number = 0,
        public courseCategory?: CourseCategory
    ){}
}

export class StudentClassArmJunction
{
    constructor(
        public id?: number,
        public studentId?: number,
        public classArmId?: number,
        public sessionTermId?: number
    ){}
}
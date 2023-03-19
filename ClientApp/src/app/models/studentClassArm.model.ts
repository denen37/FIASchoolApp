import { CourseCategory } from "./classSubject.model";

export class Class {
    constructor(
        public id: number,
        public name: number,
        public classArm: ClassArmJunction[]
    ) {}
}

export class Arm {
    constructor(
        public id: number,
        public name: string,
        public classArm: ClassArmJunction[]
    ) { }
}

export class ClassArmJunction
{
    constructor(
        public id: number,
        public classId: number,
        public _class: Class,
        public armId: number,
        public arm: Arm,
        public courseCategoryId: number,
        public courseCategory: CourseCategory
    ){}
}

export class StudentClassArmJunction
{
    constructor(
        public id: number,
        public studentId: number,
        public classArmId: number,
        public sessionId: number
    ){}
}
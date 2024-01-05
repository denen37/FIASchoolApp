export class Subject {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public courseCategoryId: number,
        public courseCategory: CourseCategory
    ) {}
}

export class CourseCategory
{
    constructor(
        public id: number,
        public category: string,
        public description: string | undefined
    ) { }
}
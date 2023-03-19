import { Student } from "./student.model";

export class LeadershipPosition {
    constructor(
        public Id: number,
        public name: string,
        public description: string,
        public students: Student[]
    ) {}
}
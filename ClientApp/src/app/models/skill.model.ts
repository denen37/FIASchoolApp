import { Rating } from "./moralBehaviour.model";

export class Skill
{
    constructor(public id: number,
                public name: string,
                public skillTypeId: number,
                public skillType: SkillType,
                public description: string)
    {}
}

export class SkillType {
    constructor(public id: number,
                public name: string) {}
}

export class StudentSkillJunction {
    constructor(public id: number,
                public skillId: number,
                public academicReportId: number,
                public skill: Skill,
                public ratingId: number,
                public rating: Rating) {
        
    }
}
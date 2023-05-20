
    export class MoralBehaviour
    {
        constructor(
            public id: number,
            public studentId: number,
            public ratingId: number,
            public rating: Rating,
            public category: string,
            public description: string,
            public rewardOrPunishment: string,
            public date: Date
        ){}
    }

    export class Rating
    {
        constructor(
            public id: number,
            public remark: string
        ){}
    }
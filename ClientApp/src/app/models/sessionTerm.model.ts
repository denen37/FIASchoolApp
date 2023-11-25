export class Session {
    constructor(
        public id: number = 0,
        public name?: string,
        public startMonth?: Date,
        public endMonth?: Date,
        public sessionTerms: SessionTermJunction[] = []
    ) {}
}

export class Term {
    constructor(
        public id: number = 0,
        public name?: string
    ) {}
}

export class SessionTermJunction {
    constructor(
        public id: number = 0,
        public sessionId: number = 0,
        public session?: Session,
        public termId?: number,
        public term?: Term,
        public startDate?: Date,
        public endDate?: Date
    ) {}
}
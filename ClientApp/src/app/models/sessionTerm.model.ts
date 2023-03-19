export class Session {
    constructor(
        public Id: number,
        public name: string,
        public startMonth: Date,
        public endMonth: Date,
        public SessionTerm: SessionTermJunction[]
    ) {}
}

export class Term {
    constructor(
        public Id: number,
        public name: string,
        public SessionTerm: SessionTermJunction[]
    ) {}
}

export class SessionTermJunction {
    constructor(
        public id: number,
        public sessionId: number,
        public session: Session,
        public termId: number,
        public term: Term,
        public startDate: Date,
        public endDate: Date
    ) {}
}
import { Component } from '@angular/core';
import { SessionRepository } from '../models/sessionRepository.model';
import { SessionTermJunction } from '../models/sessionTerm.model';

type sessionTermArray = {session: string, term: string}[]

@Component({
    templateUrl: 'sessionList.component.html'
})

export class SessionListComponent {
    constructor(private sessionRepo: SessionRepository) {
        this.sessionRepo.loadSessionTerms(true);
    }

    showDate = false;
    isCollapsed = false;

    getDates(session: string, term: string | undefined = undefined)
    {
        if (session && term) {
            let dates = this.sessionRepo.sessionTerms
                            .find(x => x.session?.name == session && x.term?.name == term) 
            return  {
                start: dates?.startDate,
                end: dates?.endDate
            }       
        }
        else
        {
           let dates = this.sessionRepo.sessionTerms
                    .find(x => x.session?.name == session)?.session
            
            return  {
                start: dates?.startMonth,
                end: dates?.endMonth
            }  
        }
    }
    get sessions()
    {
        return this.sessionRepo.sessions;
    }

    get sessionTerms()
    {
        return this.sessionRepo.sessionTerms.map(x => (
        {
            session: x.session?.name,
            term: x.term?.name
        }))
    }

    getSessionTermId(sessionName: string | undefined, termName: string | undefined)
    {
        sessionName = sessionName?.replace("/", "_");
        return `${termName}_${sessionName}`;
    }

    getSessionTermTarget(sessionName: string | undefined, termName: string | undefined)
    {
        sessionName = sessionName?.replace("/", "_");
        return `#${termName}_${sessionName}`;
    }

    getSessionId(sessionName: string)
    {
        sessionName = sessionName?.replace("/", "_");
        return 'session_' + sessionName;
    }

    getSessionTarget(sessionName: string)
    {
        sessionName = sessionName?.replace("/", "_");
        return "#session_"+sessionName;
    }

    sessionArray (session: string)
    {
        let count = this.sessionTerms.filter((x) => {return x.session == session}).length;
        return this.sessionTerms.filter((x) => {return x.session == session})
        .map((x, i) => ({
            session: x.session,
            term: x.term,
            getRowSpan: i == 0 ? count : 1,
            hasRowSpan: i == 0
        }));
    }

    getRowSpan(session: string, term: string)
    {
        return this.sessionArray(session).find(x => {return x.term == term})
                    ?.getRowSpan ?? 1
    }

    hasRowSpan(session: string, term: string)
    {
        return this.sessionArray(session).find(x => {return x.term == term })?.hasRowSpan ?? false
    }
}
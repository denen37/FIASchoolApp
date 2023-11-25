import { Component } from "@angular/core";
import { SessionRepository } from "../models/sessionRepository.model";
import { Session, SessionTermJunction, Term } from "../models/sessionTerm.model";
import { NgForm } from "@angular/forms";
import { FormValidator } from "./formValidator.model";

@Component({
    templateUrl: 'createSession.component.html',
})

export class CreateSessionComponent {
    constructor(private sessionRepo: SessionRepository) {
        this.sessionRepo.loadSessions(false, false);
    }
    newSession = true;
    sessionId: number = 0;
    private _sessionTerm?: SessionTermJunction;
    private _session?: Session
    private _term?: Term
    formErrors: string[] = []
    showAlert  = false;

    ngOnit()
    {}

    get term() {
        return this._term ??= new Term(1);
    }

    set term (value: Term){
        this._term = value;
    }

    setTermId(value: string)
    {
        this.term = new Term(this.toNumber(value));
        this.sessionTerm.termId = this.toNumber(value);
    }

    setSessionId(val: string)
    {
        if (!this.sessionTerm) this.sessionTerm = new SessionTermJunction()

        this.sessionTerm.sessionId = this.toNumber(val);
    }

    get sessionTerm()
    {
        if (!this._sessionTerm) {
            this._sessionTerm = new SessionTermJunction(0)
        }

        return this._sessionTerm;
    }

    set sessionTerm(value: SessionTermJunction)
    {
        this._sessionTerm = value;
    }

    get sessions()
    {
        return this.sessionRepo.sessions;
    }

    trackById(index: number, session: Session)
    {
        return session.id;
    }

    get session()
    {
        return this._session ??= new Session();
    }

    set session(value: Session)
    {
        this._session = value;
    }

    toNumber(num: string)
    {
        return parseInt(num) ? parseInt(num) : 0;
    }

    /*getDate(v: Date | undefined)
    {
         return this.formatDate(v) || '';
    }

    formatDate(date: Date = new Date())
    {
        let shortDate = date.toLocaleString('default', {year: 'numeric'});
        let pos = shortDate.indexOf('T');

        return shortDate = shortDate.substring(pos, 0);
    }

    setDate(event: Event)
    {
        return new Date((event.target as HTMLInputElement).value);
    }*/

    createSessionTerm(form: NgForm)
    {   
        //Validate form 
        this.formErrors = this.validateForm(form);

        if (!this.newSession && this.sessionTerm.sessionId == 0)
        this.formErrors.push('You must select a session');

        if(this.sessionTerm.termId == 0)
        this.formErrors.push('You must select a term')

        if(this.formErrors.length > 0) this.showAlert = true;

        //No errors? set session parameters
        //set sessionTerm parameters
        if (this.formErrors.length == 0) {
            //this.sessionTerm.termId = this.term.id;
            if (!this.session.name) this.sessionTerm.session = undefined;
            else { 
                this.sessionTerm.session = this.session ;
                this.sessionTerm.sessionId = this.session.id
            }
            this.sessionRepo.addSessionTerm(this.sessionTerm);
            form.submitted;
            form.resetForm()
            this.showAlert = false;
        }
    }

    validateForm(form: NgForm | undefined): string[]
    {
        if(form && form.invalid)
        {
            return FormValidator.getFormValidationMessages(form);
        }

        return [];
    }

    getValidationErrors(state: any, thingName?: string)
    {
        return FormValidator.getValidationErrors(state, thingName);
    }
}
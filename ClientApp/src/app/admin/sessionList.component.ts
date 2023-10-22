import { Component } from '@angular/core';
import { SessionRepository } from '../models/sessionRepository.model';

@Component({
    templateUrl: 'sessionList.component.html'
})

export class SessionList {
    constructor(private sessionRepo: SessionRepository) {
    }

    
}
import { Component } from '@angular/core';
import { ClassRepository } from '../models/classRepository.model';
import { ArmRepository } from '../models/armRepository.model';
import { SessionRepository } from '../models/sessionRepository.model';

@Component({
    selector: 'home-page',
    templateUrl: 'homePage.component.html'
})

export class HomePageComponent {
    constructor(private classrepo: ClassRepository,
        private armRepo: ArmRepository,
        private sessionRepo: SessionRepository){}

        
}
import {NgModule} from "@angular/core";
import { StudentRepository } from "./studentRepository.model";
import {HttpClientModule} from "@angular/common/http";
import { ClassRepository } from "./classRepository.model";
import { ArmRepository } from "./armRepository.model";
import { SessionRepository } from "./sessionRepository.model";
import { ParentRepository } from "./parentRepository.model";


@NgModule({
    imports:[HttpClientModule],
    providers : [StudentRepository, ClassRepository, ArmRepository, SessionRepository,
    ParentRepository]
})

export class ModelModule {
}
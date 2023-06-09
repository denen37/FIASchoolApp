import {NgModule} from "@angular/core";
import { StudentRepository } from "./studentRepository.model";
import {HttpClientModule} from "@angular/common/http";
import { ClassRepository } from "./classRepository.model";
import { ArmRepository } from "./armRepository.model";
import { SessionRepository } from "./sessionRepository.model";
import { ParentRepository } from "./parentRepository.model";
import { ReportCardRepository } from "./reportCardRepository.model";
import { AcademicRecordRepository } from "./academicRecordRepository.model";
import { SubjectRepository } from "./subjectRepository.model";


@NgModule({
    imports:[HttpClientModule],
    providers : [StudentRepository, ClassRepository, ArmRepository, SessionRepository,
    ParentRepository, ReportCardRepository, AcademicRecordRepository, SubjectRepository]
})

export class ModelModule {
}
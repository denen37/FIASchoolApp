import {NgModule} from "@angular/core";
import { StudentRepository } from "./studentRepository.model";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    providers : [StudentRepository]
})

export class ModelModule {
}
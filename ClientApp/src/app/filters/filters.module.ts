import { NgModule } from "@angular/core";
import { StudentParameters } from "./studentParameters.model";
import { StudentFilter } from "./studentFilter.model";
import { ComponentType } from "../services/component.service";


@NgModule({
    providers: [StudentParameters, StudentFilter, ComponentType]
})

export class FilterModule {
}
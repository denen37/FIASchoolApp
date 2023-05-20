import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StudentRouting } from "./student-routing.module";
import { StudentListComponent } from "./studentList.component";
import { StudentDetailsComponent } from "./studentDetails.component"; 
import { StudentDossierComponent } from "./studentDossier.component";
import { StudentDetailsDirective } from "./studentDetails.directive";
import { RouterModule } from "@angular/router";
import { HomeModule } from "../home/home.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [StudentListComponent, StudentDetailsComponent, StudentDossierComponent,
         StudentDetailsDirective],
    imports: [BrowserModule, RouterModule, HomeModule, SharedModule],
    exports: [StudentRouting]
})

export class StudentModule{}
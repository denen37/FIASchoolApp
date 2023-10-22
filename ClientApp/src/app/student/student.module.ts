import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StudentRouting } from "./student-routing.module";
import { RouterModule } from "@angular/router";
import { HomeModule } from "../home/home.module";
import { SharedModule } from "../shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from "@angular/forms";
import { StudentDossierComponent } from "./studentDossier.component";
@NgModule({
    declarations: [StudentDossierComponent],
    imports: [BrowserModule, FormsModule, RouterModule, HomeModule,SharedModule, BrowserAnimationsModule],
    exports: [StudentRouting]
})

export class StudentModule{}
import { NgModule } from "@angular/core";
import { StartPageComponent } from "./startPage.component";
import { TeacherRouting } from "./teacher-routing.module";
import { SharedModule } from "../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { SubjectTermDropdownComponent } from "./subjectTermDropdown.component";
import { SubjectScoreTableComponent } from "./subjectScoreTable.component";
import { EditSubjectScoresComponent } from "./editSubjectScores.component";
import { FormsModule } from "@angular/forms";
import { StudentScoreTableComponent } from "./studentScoreTable.component";
import { StudentNamesComponent } from "./studentNames.component";
import { MasterScoreSheetComponent } from "./masterScoreSheet.component";

@NgModule({
    declarations: [StartPageComponent, SubjectTermDropdownComponent, SubjectScoreTableComponent,
        EditSubjectScoresComponent, StudentScoreTableComponent, StudentNamesComponent, MasterScoreSheetComponent],
    imports: [BrowserModule, RouterModule, SharedModule, FormsModule],
    exports: [TeacherRouting]
})

export class TeacherModule {
}
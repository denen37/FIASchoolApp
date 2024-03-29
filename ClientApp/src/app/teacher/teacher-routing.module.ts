import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StartPageComponent } from "./startPage.component";
import { SubjectScoreTableComponent } from "./subjectScoreTable.component";
import { EditSubjectScoresComponent } from "./editSubjectScores.component";
import { StudentScoreTableComponent } from "./studentScoreTable.component";
import { MasterScoreSheetComponent } from "./masterScoreSheet.component";

const routes: Routes = [
    {path: "teachers", component: StartPageComponent},
    {path: "teachers/subject-scores", component: SubjectScoreTableComponent},
    {path: "teachers/edit-scores", component: EditSubjectScoresComponent},
    {path: "teachers/student-scores", component: StudentScoreTableComponent},
    {path: "teachers/master-scoresheet", component: MasterScoreSheetComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class TeacherRouting {}
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
//import { StudentListComponent } from "./studentList.component"
//import { StudentDetailsComponent } from "./studentDetails.component";
import { StudentDossierComponent } from "./studentDossier.component";

const routes: Routes = [
    //{path: "students", component: StudentListComponent},
    //{path: "students/details/:id", component: StudentDetailsComponent},
    {path: "students/details/dossier/:id", component: StudentDossierComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class StudentRouting {}
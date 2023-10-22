import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { FormPageComponent } from "./formPage.component";
import { AdminBoardComponent } from "./adminBoard.component";
import { StudentListComponent } from "./studentList.component"
import { StudentDetailsComponent } from "./studentDetails.component";
import { StudentFormComponent } from "./studentForm.component";
import { CreateSessionComponent } from "./createSession.component";

const routes: Routes = [
    {path: "admin", component: AdminBoardComponent},
    {path: "admin/students", component: StudentListComponent},
    {path: "admin/students/details/:id", component: StudentDetailsComponent},
    {path: "admin/students/edit/:id", component: FormPageComponent},
    { path: "admin/students/create", component: FormPageComponent },
    {path: "admin/session/create", component: CreateSessionComponent}
] 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AdminRouting{}
import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { FormPageComponent } from "./formPage.component";
import { AdminBoardComponent } from "./adminBoard.component";
import { StudentListComponent } from "./studentList.component"
import { StudentDetailsComponent } from "./studentDetails.component";
import { CreateSessionComponent } from "./createSession.component";
import { SessionListComponent } from "./sessionList.component";
import { ClassListComponent } from "./classList.component";
import { StudentManagementComponent } from "./studentManagement.component";

const routes: Routes = [
    {path: "admin", component: AdminBoardComponent},
    {path: "admin/students", component: StudentListComponent},
    {path: "admin/students/details/:id", component: StudentDetailsComponent},
    {path: "admin/students/edit/:id", component: FormPageComponent},
    { path: "admin/students/create", component: FormPageComponent },
    {path: "admin/sessions", component: SessionListComponent},
    {path: "admin/session/create", component: CreateSessionComponent},
    {path: "admin/classes", component: ClassListComponent},
    {path: "admin/classes/:class/:arm/students", component: StudentManagementComponent}
] 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AdminRouting{}
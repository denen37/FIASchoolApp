import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { FormPageComponent } from "./formPage.component";
import { AdminBoardComponent } from "./adminBoard.component";
import { StudentListComponent } from "../student/studentList.component";

const routes: Routes = [
    {path: "admin", component: AdminBoardComponent},
    {path: "admin/students", component: StudentListComponent},
    { path: "admin/students/create", component: FormPageComponent }
] 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AdminRouting{}
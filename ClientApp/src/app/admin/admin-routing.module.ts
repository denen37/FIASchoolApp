import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { FormPageComponent } from "./formPage.component";

const routes: Routes = [
    {path: "admin/students/create", component: FormPageComponent}
] 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AdminRouting{}
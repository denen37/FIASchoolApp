import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentPageComponent } from "./student.component";

const routes: Routes = [
    {path: "students", component: StudentPageComponent},
    {path: "", redirectTo: "/students", pathMatch: "full"}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class StudentRouting {}
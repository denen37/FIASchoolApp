import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./homePage.component";
import { StudentPageComponent } from "../student/studentList.component";

const routes: Routes = [
    {path: "home", component: HomePageComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "students/:class", component: StudentPageComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class HomeRouting{}
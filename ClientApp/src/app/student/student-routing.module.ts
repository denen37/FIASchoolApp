import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentListComponent } from "./studentList.component"
import { StudentDetailsComponent } from "./studentDetails.component";

const routes: Routes = [
    {path: "students", component: StudentListComponent},
    {path: "students/details/:id", component: StudentDetailsComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class StudentRouting {}
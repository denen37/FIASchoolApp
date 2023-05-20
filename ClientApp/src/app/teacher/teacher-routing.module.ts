import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StartPageComponent } from "./startPage.component";

const routes: Routes = [
    {path: "teachers", component: StartPageComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class TeacherRouting {}
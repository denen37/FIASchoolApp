import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./homePage.component";

const routes: Routes = [
    {path: "index", component: HomePageComponent},
    {path: "", redirectTo: "/index", pathMatch: "full"},
]   

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class HomeRouting{}
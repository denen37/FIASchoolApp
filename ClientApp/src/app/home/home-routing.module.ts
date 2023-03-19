import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./homePage.component";

const routes: Routes = [
    {path: "home", component: HomePageComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class HomeRouting{}
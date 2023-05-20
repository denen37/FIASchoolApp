import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { HomeRouting } from "./home-routing.module";
import { HomePageComponent } from "./homePage.component";
import { SchNavBarComponent } from "./schNavBar.component";
import { SchCarouselComponent } from "./schCarousel.component";
import { SchVisionComponent } from "./schVision.component";
import { SchContactComponent } from "./schContact.component";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [HomePageComponent, SchNavBarComponent, 
                    SchCarouselComponent, SchVisionComponent, SchContactComponent],
    imports: [BrowserModule, RouterModule, SharedModule],
    exports: [HomeRouting]
})

export class HomeModule{}

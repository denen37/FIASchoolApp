import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HomeRouting } from "./home-routing.module";
import { HomePageComponent } from "./homePage.component";
import { SchHeaderComponent } from "./schoolHeader.component";
import { SchNavBarComponent } from "./schNavBar.component";
import { SchCarouselComponent } from "./schCarousel.compnent";
import { SchVisionComponent } from "./schVision.component";
import { SchContactComponent } from "./schContact.component";


@NgModule({
    declarations: [HomePageComponent, SchHeaderComponent, SchNavBarComponent, 
                    SchCarouselComponent, SchVisionComponent, SchContactComponent],
    imports: [BrowserModule],
    exports: [HomeRouting]
})

export class HomeModule{}

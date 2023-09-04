import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AdminRouting } from "./admin-routing.module";
import { StudentFormComponent } from "./studentForm.component";
import { SharedModule } from "../shared/shared.module";
import { FormPageComponent } from "./formPage.component";
import { ParentFormComponent } from "./parentForm.component";

@NgModule({
    declarations: [FormPageComponent, StudentFormComponent, ParentFormComponent],
    providers: [],
    imports: [BrowserModule, FormsModule, SharedModule],
    exports: [AdminRouting]
})

export class AdminModule {}
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StudentRouting } from "./student-routing.module";
import { StudentPageComponent } from "./student.component";

@NgModule({
    declarations: [StudentPageComponent],
    imports: [BrowserModule ],
    exports: [StudentRouting, StudentPageComponent]
})

export class StudentModule{}
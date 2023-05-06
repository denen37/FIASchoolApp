import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StudentRouting } from "./student-routing.module";
import { StudentListComponent } from "./studentList.component";
import { FormsModule } from "@angular/forms";
import { StudentDetailsComponent } from "./studentDetails.component"; 
import { StudentDetailsDirective } from "./studentDetails.directive";

@NgModule({
    declarations: [StudentListComponent, StudentDetailsComponent, StudentDetailsDirective],
    imports: [BrowserModule, FormsModule],
    exports: [StudentRouting]
})

export class StudentModule{}
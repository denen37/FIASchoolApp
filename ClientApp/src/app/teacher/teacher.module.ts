import { NgModule } from "@angular/core";
import { StartPageComponent } from "./startPage.component";
import { TeacherRouting } from "./teacher-routing.module";

@NgModule({
    declarations: [StartPageComponent],
    imports: [],
    exports: [TeacherRouting]
})

export class TeacherModule {
}
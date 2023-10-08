import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AdminRouting } from "./admin-routing.module";
import { StudentFormComponent } from "./studentForm.component";
import { SharedModule } from "../shared/shared.module";
import { FormPageComponent } from "./formPage.component";
import { ParentFormComponent } from "./parentForm.component";
import { AdminBoardComponent } from "./adminBoard.component";
import { RouterModule } from "@angular/router";
import { SubmitModalComponent } from "./submitStudentModal.component";
import { SubmittingModalComponent } from "./submittingModal.component";
import { StudentModule } from "../student/student.module";

@NgModule({
    declarations: [FormPageComponent, StudentFormComponent, ParentFormComponent, AdminBoardComponent,
                    SubmitModalComponent, SubmittingModalComponent],
    providers: [BsModalService],
    imports: [BrowserModule, RouterModule, FormsModule, SharedModule, ModalModule, StudentModule],
    exports: [AdminRouting]
})

export class AdminModule {}
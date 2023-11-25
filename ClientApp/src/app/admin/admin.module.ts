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
import { StudentListComponent } from "./studentList.component";
import { StudentDetailsComponent } from "./studentDetails.component";
import { StudentDetailsDirective } from "./studentDetails.directive";
import { ContextMenuComponent } from "./contextMenu.component";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PopoverModule } from "ngx-bootstrap/popover"
import { Pagination } from "../models/pagination.model";
import { CreateSessionComponent } from "./createSession.component";
import { SessionListComponent } from "./sessionList.component";
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClassListComponent } from "./classList.component";
import { CreateArmModalComponent } from './createArm.component';

@NgModule({
    declarations: [FormPageComponent, StudentFormComponent, ParentFormComponent, AdminBoardComponent,
                    SubmitModalComponent, SubmittingModalComponent, StudentListComponent, StudentDetailsComponent, 
                    StudentDetailsDirective, ContextMenuComponent, CreateSessionComponent, SessionListComponent,
                    ClassListComponent, CreateArmModalComponent],
    providers: [BsModalService, Pagination],
    imports: [BrowserModule, RouterModule, FormsModule, SharedModule, ModalModule.forRoot(), BsDropdownModule.forRoot(), 
             CollapseModule.forRoot(), BrowserAnimationsModule],
    exports: [AdminRouting]
})

export class AdminModule {}
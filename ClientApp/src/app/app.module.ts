import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ModelModule } from './models/model.module';
import { ScriptService } from './services/script.service';
import { StudentModule } from './student/student.module';
import { FilterModule } from './filters/filters.module';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ModelModule, HomeModule, 
            StudentModule, FilterModule, TeacherModule, AdminModule],
  providers: [ScriptService],
  bootstrap: [AppComponent]
})
export class AppModule { }

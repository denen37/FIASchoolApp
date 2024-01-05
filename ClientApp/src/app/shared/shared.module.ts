import { NgModule } from '@angular/core';
import { NairaSignPipe } from './nairaSign.pipe';
import { OrdinalPipe } from './ordinal.pipe';
import { SchHeaderComponent } from './schHeader.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SelectionNavbarComponent } from './selectionNavbar.component';
import { ClickOutsideDirective } from './clickOutside.directive';

@NgModule({
    declarations : [NairaSignPipe, OrdinalPipe, SchHeaderComponent, SelectionNavbarComponent, ClickOutsideDirective],
    imports : [BrowserModule, FormsModule],
    exports: [NairaSignPipe, OrdinalPipe, SchHeaderComponent, SelectionNavbarComponent, ClickOutsideDirective],
    providers: []
})

export class SharedModule{

}
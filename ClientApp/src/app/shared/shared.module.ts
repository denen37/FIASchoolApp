import { NgModule } from '@angular/core';
import { NairaSignPipe } from './nairaSign.pipe';
import { OrdinalPipe } from './ordinal.pipe';
import { SchHeaderComponent } from './schHeader.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SelectionNavbarComponent } from './selectionNavbar.component';

@NgModule({
    declarations : [NairaSignPipe, OrdinalPipe, SchHeaderComponent, SelectionNavbarComponent],
    imports : [BrowserModule, FormsModule],
    exports: [NairaSignPipe, OrdinalPipe, SchHeaderComponent, SelectionNavbarComponent],
    providers: []
})

export class SharedModule{

}
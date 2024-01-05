import {Directive, EventEmitter, ElementRef, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[clickOut]'
})

export class ClickOutsideDirective{
    @Output()
    clickOut: EventEmitter<MouseEvent> = new EventEmitter();

    constructor(private elementRef: ElementRef)
    {

    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent)
    {
        const clickIn = this.elementRef.nativeElement.contains(event.target);
        if (!clickIn) {
            this.clickOut.emit(event);
        }
    }
}
import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
    selector: '[rfofClickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef: ElementRef) {
    }

    @Output()
    public clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        
        if (!targetElement) {
            return;
        }

        const clickedInside = this._elementRef.nativeElement == targetElement || this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            console.log('now');
            this.clickOutside.emit(event);
        }
    }
}

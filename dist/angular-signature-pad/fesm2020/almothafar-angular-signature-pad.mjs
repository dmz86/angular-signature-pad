import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import SignaturePad from 'signature_pad';

class SignaturePadComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.options = this.options || {};
        this.drawStart = new EventEmitter();
        this.drawBeforeUpdate = new EventEmitter();
        this.drawAfterUpdate = new EventEmitter();
        this.drawEnd = new EventEmitter();
    }
    ngAfterContentInit() {
        const canvas = this.getCanvas();
        if (this.options.canvasHeight) {
            canvas.height = this.options.canvasHeight;
        }
        if (this.options.canvasWidth) {
            canvas.width = this.options.canvasWidth;
        }
        this.signaturePad = new SignaturePad(canvas, this.options);
        this.signaturePad.addEventListener('beginStroke', (event) => this.beginStroke(event.detail));
        this.signaturePad.addEventListener('beforeUpdateStroke', (event) => this.beforeUpdateStroke(event.detail));
        this.signaturePad.addEventListener('afterUpdateStroke', (event) => this.afterUpdateStroke(event.detail));
        this.signaturePad.addEventListener('endStroke', (event) => this.endStroke(event.detail));
    }
    ngOnDestroy() {
        const canvas = this.getCanvas();
        canvas.width = 0;
        canvas.height = 0;
    }
    /**
     * Redraw or Resize canvas, note this will clear data.
     */
    redrawCanvas() {
        const canvas = this.getCanvas();
        // when zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1, and only part of the canvas is cleared then.
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }
    /**
     * Returns signature image as an array of point groups
     */
    toData() {
        if (this.signaturePad) {
            return this.signaturePad.toData();
        }
        else {
            return [];
        }
    }
    /**
     * Draws signature image from an array of point groups
     */
    fromData(points) {
        this.signaturePad.fromData(points);
    }
    /**
     * Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible parameters)
     */
    toDataURL(imageType, quality) {
        return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
    }
    /**
     * Draws signature image from data URL
     */
    fromDataURL(dataURL, options = {}) {
        // set default height and width on read data from URL
        if (!options.hasOwnProperty('height') && this.options.canvasHeight) {
            options.height = this.options.canvasHeight;
        }
        if (!options.hasOwnProperty('width') && this.options.canvasWidth) {
            options.width = this.options.canvasWidth;
        }
        this.signaturePad.fromDataURL(dataURL, options);
    }
    /**
     * Clears the canvas
     */
    clear() {
        this.signaturePad.clear();
    }
    /**
     * Returns true if canvas is empty, otherwise returns false
     */
    isEmpty() {
        return this.signaturePad.isEmpty();
    }
    /**
     * Unbinds all event handlers
     */
    off() {
        this.signaturePad.off();
    }
    /**
     * Rebinds all event handlers
     */
    on() {
        this.signaturePad.on();
    }
    /**
     * set an option on the signaturePad - e.g. set('minWidth', 50);
     * @param option one of SignaturePad to set with value, properties of NgSignaturePadOptions
     * @param value the value of option
     */
    set(option, value) {
        const canvas = this.getCanvas();
        switch (option) {
            case 'canvasHeight':
                canvas.height = value;
                break;
            case 'canvasWidth':
                canvas.width = value;
                break;
            default:
                this.signaturePad[option] = value;
        }
    }
    /**
     * notify subscribers on signature begin
     */
    beginStroke(event) {
        this.drawStart.emit(event);
    }
    beforeUpdateStroke(event) {
        this.drawBeforeUpdate.emit(event);
    }
    afterUpdateStroke(event) {
        this.drawAfterUpdate.emit(event);
    }
    /**
     * notify subscribers on signature end
     */
    endStroke(event) {
        this.drawEnd.emit(event);
    }
    getSignaturePad() {
        return this.signaturePad;
    }
    getCanvas() {
        return this.elementRef.nativeElement.querySelector('canvas');
    }
}
SignaturePadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SignaturePadComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
SignaturePadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SignaturePadComponent, selector: "signature-pad", inputs: { options: "options" }, outputs: { drawStart: "drawStart", drawBeforeUpdate: "drawBeforeUpdate", drawAfterUpdate: "drawAfterUpdate", drawEnd: "drawEnd" }, ngImport: i0, template: '<canvas class="signature-pad-canvas"></canvas>', isInline: true, styles: [":host{background:antiquewhite;display:flex;align-items:center;justify-content:center}:host .signature-pad-canvas{border:1px solid gray}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SignaturePadComponent, decorators: [{
            type: Component,
            args: [{ template: '<canvas class="signature-pad-canvas"></canvas>', selector: 'signature-pad', styles: [":host{background:antiquewhite;display:flex;align-items:center;justify-content:center}:host .signature-pad-canvas{border:1px solid gray}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { options: [{
                type: Input
            }], drawStart: [{
                type: Output
            }], drawBeforeUpdate: [{
                type: Output
            }], drawAfterUpdate: [{
                type: Output
            }], drawEnd: [{
                type: Output
            }] } });

class AngularSignaturePadModule {
}
AngularSignaturePadModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AngularSignaturePadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AngularSignaturePadModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: AngularSignaturePadModule, declarations: [SignaturePadComponent], exports: [SignaturePadComponent] });
AngularSignaturePadModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AngularSignaturePadModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AngularSignaturePadModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SignaturePadComponent],
                    imports: [],
                    exports: [SignaturePadComponent],
                }]
        }] });

/*
 * Public API Surface of angular-signature-pad
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AngularSignaturePadModule, SignaturePadComponent };
//# sourceMappingURL=almothafar-angular-signature-pad.mjs.map
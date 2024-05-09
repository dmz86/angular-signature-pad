import { Component, EventEmitter, Input, Output } from '@angular/core';
import SignaturePad from 'signature_pad';
import * as i0 from "@angular/core";
export class SignaturePadComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SignaturePadComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: SignaturePadComponent, selector: "signature-pad", inputs: { options: "options" }, outputs: { drawStart: "drawStart", drawBeforeUpdate: "drawBeforeUpdate", drawAfterUpdate: "drawAfterUpdate", drawEnd: "drawEnd" }, ngImport: i0, template: '<canvas class="signature-pad-canvas"></canvas>', isInline: true, styles: [":host{background:#faebd7;display:flex;align-items:center;justify-content:center}:host .signature-pad-canvas{border:1px solid gray}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SignaturePadComponent, decorators: [{
            type: Component,
            args: [{ template: '<canvas class="signature-pad-canvas"></canvas>', selector: 'signature-pad', styles: [":host{background:#faebd7;display:flex;align-items:center;justify-content:center}:host .signature-pad-canvas{border:1px solid gray}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zaWduYXR1cmUtcGFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItc2lnbmF0dXJlLXBhZC9zcmMvbGliL2FuZ3VsYXItc2lnbmF0dXJlLXBhZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEgsT0FBTyxZQUFxQyxNQUFNLGVBQWUsQ0FBQzs7QUFZbEUsTUFBTSxPQUFPLHFCQUFxQjtJQVNoQyxZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUEyQixDQUFDO1FBQzNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFDeEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO1FBQy9ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBc0IsQ0FBQztJQUN4RCxDQUFDO0lBRU0sa0JBQWtCO1FBQ3ZCLE1BQU0sTUFBTSxHQUFzQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtZQUM3QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1NBQzNDO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUM1QixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxD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SyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEtBQXlCO1FBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNJLFNBQVMsQ0FBQyxLQUF5QjtRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sZUFBZTtRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVNLFNBQVM7UUFDZCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvRCxDQUFDOytHQXhLVSxxQkFBcUI7bUdBQXJCLHFCQUFxQix3TkFKdEIsZ0RBQWdEOzs0RkFJL0MscUJBQXFCO2tCQUxqQyxTQUFTOytCQUNFLGdEQUFnRCxZQUNoRCxlQUFlO2lHQUlULE9BQU87c0JBQXRCLEtBQUs7Z0JBQ1csU0FBUztzQkFBekIsTUFBTTtnQkFDVSxnQkFBZ0I7c0JBQWhDLE1BQU07Z0JBQ1UsZUFBZTtzQkFBL0IsTUFBTTtnQkFDVSxPQUFPO3NCQUF2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFNpZ25hdHVyZVBhZCwgeyBPcHRpb25zLCBQb2ludEdyb3VwIH0gZnJvbSAnc2lnbmF0dXJlX3BhZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdTaWduYXR1cmVQYWRPcHRpb25zIGV4dGVuZHMgT3B0aW9ucyB7XG4gIGNhbnZhc0hlaWdodDogbnVtYmVyO1xuICBjYW52YXNXaWR0aDogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6ICc8Y2FudmFzIGNsYXNzPVwic2lnbmF0dXJlLXBhZC1jYW52YXNcIj48L2NhbnZhcz4nLFxuICBzZWxlY3RvcjogJ3NpZ25hdHVyZS1wYWQnLFxuICBzdHlsZVVybHM6IFsnLi9hbmd1bGFyLXNpZ25hdHVyZS1wYWQuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU2lnbmF0dXJlUGFkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIG9wdGlvbnM6IE5nU2lnbmF0dXJlUGFkT3B0aW9ucztcbiAgQE91dHB1dCgpIHB1YmxpYyBkcmF3U3RhcnQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50IHwgVG91Y2g+O1xuICBAT3V0cHV0KCkgcHVibGljIGRyYXdCZWZvcmVVcGRhdGU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50IHwgVG91Y2g+O1xuICBAT3V0cHV0KCkgcHVibGljIGRyYXdBZnRlclVwZGF0ZTogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQgfCBUb3VjaD47XG4gIEBPdXRwdXQoKSBwdWJsaWMgZHJhd0VuZDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQgfCBUb3VjaD47XG5cbiAgcHJpdmF0ZSBzaWduYXR1cmVQYWQ6IFNpZ25hdHVyZVBhZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgfHwge30gYXMgTmdTaWduYXR1cmVQYWRPcHRpb25zO1xuICAgIHRoaXMuZHJhd1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50IHwgVG91Y2g+KCk7XG4gICAgdGhpcy5kcmF3QmVmb3JlVXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50IHwgVG91Y2g+KCk7XG4gICAgdGhpcy5kcmF3QWZ0ZXJVcGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQgfCBUb3VjaD4oKTtcbiAgICB0aGlzLmRyYXdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQgfCBUb3VjaD4oKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IHRoaXMuZ2V0Q2FudmFzKCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jYW52YXNIZWlnaHQpIHtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLm9wdGlvbnMuY2FudmFzSGVpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2FudmFzV2lkdGgpIHtcbiAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMub3B0aW9ucy5jYW52YXNXaWR0aDtcbiAgICB9XG5cbiAgICB0aGlzLnNpZ25hdHVyZVBhZCA9IG5ldyBTaWduYXR1cmVQYWQoY2FudmFzLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLmFkZEV2ZW50TGlzdGVuZXIoJ2JlZ2luU3Ryb2tlJywgKGV2ZW50OiBDdXN0b21FdmVudCkgPT4gdGhpcy5iZWdpblN0cm9rZShldmVudC5kZXRhaWwpKTtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmVVcGRhdGVTdHJva2UnLCAoZXZlbnQ6IEN1c3RvbUV2ZW50KSA9PiB0aGlzLmJlZm9yZVVwZGF0ZVN0cm9rZShldmVudC5kZXRhaWwpKTtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5hZGRFdmVudExpc3RlbmVyKCdhZnRlclVwZGF0ZVN0cm9rZScsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHRoaXMuYWZ0ZXJVcGRhdGVTdHJva2UoZXZlbnQuZGV0YWlsKSk7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuYWRkRXZlbnRMaXN0ZW5lcignZW5kU3Ryb2tlJywgKGV2ZW50OiBDdXN0b21FdmVudCkgPT4gdGhpcy5lbmRTdHJva2UoZXZlbnQuZGV0YWlsKSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IHRoaXMuZ2V0Q2FudmFzKCk7XG4gICAgY2FudmFzLndpZHRoID0gMDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWRyYXcgb3IgUmVzaXplIGNhbnZhcywgbm90ZSB0aGlzIHdpbGwgY2xlYXIgZGF0YS5cbiAgICovXG4gIHB1YmxpYyByZWRyYXdDYW52YXMoKTogdm9pZCB7XG4gICAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IHRoaXMuZ2V0Q2FudmFzKCk7XG4gICAgLy8gd2hlbiB6b29tZWQgb3V0IHRvIGxlc3MgdGhhbiAxMDAlLCBmb3Igc29tZSB2ZXJ5IHN0cmFuZ2UgcmVhc29uLFxuICAgIC8vIHNvbWUgYnJvd3NlcnMgcmVwb3J0IGRldmljZVBpeGVsUmF0aW8gYXMgbGVzcyB0aGFuIDEsIGFuZCBvbmx5IHBhcnQgb2YgdGhlIGNhbnZhcyBpcyBjbGVhcmVkIHRoZW4uXG4gICAgY29uc3QgcmF0aW86IG51bWJlciA9IE1hdGgubWF4KHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsIDEpO1xuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy5vZmZzZXRXaWR0aCAqIHJhdGlvO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMub2Zmc2V0SGVpZ2h0ICogcmF0aW87XG4gICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuc2NhbGUocmF0aW8sIHJhdGlvKTtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5jbGVhcigpOyAvLyBvdGhlcndpc2UgaXNFbXB0eSgpIG1pZ2h0IHJldHVybiBpbmNvcnJlY3QgdmFsdWVcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHNpZ25hdHVyZSBpbWFnZSBhcyBhbiBhcnJheSBvZiBwb2ludCBncm91cHNcbiAgICovXG4gIHB1YmxpYyB0b0RhdGEoKTogUG9pbnRHcm91cFtdIHtcbiAgICBpZiAodGhpcy5zaWduYXR1cmVQYWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZC50b0RhdGEoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBzaWduYXR1cmUgaW1hZ2UgZnJvbSBhbiBhcnJheSBvZiBwb2ludCBncm91cHNcbiAgICovXG4gIHB1YmxpYyBmcm9tRGF0YShwb2ludHM6IEFycmF5PFBvaW50R3JvdXA+KTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuZnJvbURhdGEocG9pbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHNpZ25hdHVyZSBpbWFnZSBhcyBkYXRhIFVSTCAoc2VlIGh0dHBzOi8vbWRuLmlvL3RvZGF0YXVybCBmb3IgdGhlIGxpc3Qgb2YgcG9zc2libGUgcGFyYW1ldGVycylcbiAgICovXG4gIHB1YmxpYyB0b0RhdGFVUkwoaW1hZ2VUeXBlPzogc3RyaW5nLCBxdWFsaXR5PzogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQudG9EYXRhVVJMKGltYWdlVHlwZSwgcXVhbGl0eSk7IC8vIHNhdmUgaW1hZ2UgYXMgZGF0YSBVUkxcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBzaWduYXR1cmUgaW1hZ2UgZnJvbSBkYXRhIFVSTFxuICAgKi9cbiAgcHVibGljIGZyb21EYXRhVVJMKGRhdGFVUkw6IHN0cmluZywgb3B0aW9uczogeyByYXRpbz86IG51bWJlcjsgd2lkdGg/OiBudW1iZXI7IGhlaWdodD86IG51bWJlciB9ID0ge30pOiB2b2lkIHtcbiAgICAvLyBzZXQgZGVmYXVsdCBoZWlnaHQgYW5kIHdpZHRoIG9uIHJlYWQgZGF0YSBmcm9tIFVSTFxuICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnaGVpZ2h0JykgJiYgdGhpcy5vcHRpb25zLmNhbnZhc0hlaWdodCkge1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSB0aGlzLm9wdGlvbnMuY2FudmFzSGVpZ2h0O1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiYgdGhpcy5vcHRpb25zLmNhbnZhc1dpZHRoKSB7XG4gICAgICBvcHRpb25zLndpZHRoID0gdGhpcy5vcHRpb25zLmNhbnZhc1dpZHRoO1xuICAgIH1cbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5mcm9tRGF0YVVSTChkYXRhVVJMLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGNhbnZhc1xuICAgKi9cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGNhbnZhcyBpcyBlbXB0eSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcbiAgICovXG4gIHB1YmxpYyBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZC5pc0VtcHR5KCk7XG4gIH1cblxuICAvKipcbiAgICogVW5iaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnNcbiAgICovXG4gIHB1YmxpYyBvZmYoKTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQub2ZmKCk7XG4gIH1cblxuICAvKipcbiAgICogUmViaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnNcbiAgICovXG4gIHB1YmxpYyBvbigpOiB2b2lkIHtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5vbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCBhbiBvcHRpb24gb24gdGhlIHNpZ25hdHVyZVBhZCAtIGUuZy4gc2V0KCdtaW5XaWR0aCcsIDUwKTtcbiAgICogQHBhcmFtIG9wdGlvbiBvbmUgb2YgU2lnbmF0dXJlUGFkIHRvIHNldCB3aXRoIHZhbHVlLCBwcm9wZXJ0aWVzIG9mIE5nU2lnbmF0dXJlUGFkT3B0aW9uc1xuICAgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIG9mIG9wdGlvblxuICAgKi9cbiAgcHVibGljIHNldChvcHRpb246IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSB0aGlzLmdldENhbnZhcygpO1xuICAgIHN3aXRjaCAob3B0aW9uKSB7XG4gICAgICBjYXNlICdjYW52YXNIZWlnaHQnOlxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2FudmFzV2lkdGgnOlxuICAgICAgICBjYW52YXMud2lkdGggPSB2YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnNpZ25hdHVyZVBhZFtvcHRpb25dID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG5vdGlmeSBzdWJzY3JpYmVycyBvbiBzaWduYXR1cmUgYmVnaW5cbiAgICovXG4gIHB1YmxpYyBiZWdpblN0cm9rZShldmVudDogTW91c2VFdmVudCB8IFRvdWNoKTogdm9pZCB7XG4gICAgdGhpcy5kcmF3U3RhcnQuZW1pdChldmVudCk7XG4gIH1cblxuICBwdWJsaWMgYmVmb3JlVXBkYXRlU3Ryb2tlKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2gpOiB2b2lkIHtcbiAgICB0aGlzLmRyYXdCZWZvcmVVcGRhdGUuZW1pdChldmVudCk7XG4gIH1cblxuICBwdWJsaWMgYWZ0ZXJVcGRhdGVTdHJva2UoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaCk6IHZvaWQge1xuICAgIHRoaXMuZHJhd0FmdGVyVXBkYXRlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIG5vdGlmeSBzdWJzY3JpYmVycyBvbiBzaWduYXR1cmUgZW5kXG4gICAqL1xuICBwdWJsaWMgZW5kU3Ryb2tlKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2gpOiB2b2lkIHtcbiAgICB0aGlzLmRyYXdFbmQuZW1pdChldmVudCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2lnbmF0dXJlUGFkKCk6IFNpZ25hdHVyZVBhZCB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlUGFkO1xuICB9XG5cbiAgcHVibGljIGdldENhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuICB9XG59XG4iXX0=
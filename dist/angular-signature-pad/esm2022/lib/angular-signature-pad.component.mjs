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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.8", ngImport: i0, type: SignaturePadComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.8", type: SignaturePadComponent, selector: "signature-pad", inputs: { options: "options" }, outputs: { drawStart: "drawStart", drawBeforeUpdate: "drawBeforeUpdate", drawAfterUpdate: "drawAfterUpdate", drawEnd: "drawEnd" }, ngImport: i0, template: '<canvas class="signature-pad-canvas"></canvas>', isInline: true, styles: [":host{background:#faebd7;display:flex;align-items:center;justify-content:center}:host .signature-pad-canvas{border:1px solid gray}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.8", ngImport: i0, type: SignaturePadComponent, decorators: [{
            type: Component,
            args: [{ template: '<canvas class="signature-pad-canvas"></canvas>', selector: 'signature-pad', styles: [":host{background:#faebd7;display:flex;align-items:center;justify-content:center}:host .signature-pad-canvas{border:1px solid gray}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { options: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zaWduYXR1cmUtcGFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItc2lnbmF0dXJlLXBhZC9zcmMvbGliL2FuZ3VsYXItc2lnbmF0dXJlLXBhZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEgsT0FBTyxZQUFxQyxNQUFNLGVBQWUsQ0FBQzs7QUFZbEUsTUFBTSxPQUFPLHFCQUFxQjtJQVNoQyxZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUEyQixDQUFDO1FBQzNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFDeEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO1FBQy9ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBc0IsQ0FBQztJQUN4RCxDQUFDO0lBRU0sa0JBQWtCO1FBQ3ZCLE1BQU0sTUFBTSxHQUFzQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDNUMsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM3QixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1FB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LENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxLQUF5QjtRQUNqRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxLQUF5QjtRQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxTQUFTLENBQUMsS0FBeUI7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLGVBQWU7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs4R0F4S1UscUJBQXFCO2tHQUFyQixxQkFBcUIsd05BSnRCLGdEQUFnRDs7MkZBSS9DLHFCQUFxQjtrQkFMakMsU0FBUzsrQkFDRSxnREFBZ0QsWUFDaEQsZUFBZTsrRUFJVCxPQUFPO3NCQUF0QixLQUFLO2dCQUNXLFNBQVM7c0JBQXpCLE1BQU07Z0JBQ1UsZ0JBQWdCO3NCQUFoQyxNQUFNO2dCQUNVLGVBQWU7c0JBQS9CLE1BQU07Z0JBQ1UsT0FBTztzQkFBdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBTaWduYXR1cmVQYWQsIHsgT3B0aW9ucywgUG9pbnRHcm91cCB9IGZyb20gJ3NpZ25hdHVyZV9wYWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5nU2lnbmF0dXJlUGFkT3B0aW9ucyBleHRlbmRzIE9wdGlvbnMge1xuICBjYW52YXNIZWlnaHQ6IG51bWJlcjtcbiAgY2FudmFzV2lkdGg6IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiAnPGNhbnZhcyBjbGFzcz1cInNpZ25hdHVyZS1wYWQtY2FudmFzXCI+PC9jYW52YXM+JyxcbiAgc2VsZWN0b3I6ICdzaWduYXR1cmUtcGFkJyxcbiAgc3R5bGVVcmxzOiBbJy4vYW5ndWxhci1zaWduYXR1cmUtcGFkLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNpZ25hdHVyZVBhZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHB1YmxpYyBvcHRpb25zOiBOZ1NpZ25hdHVyZVBhZE9wdGlvbnM7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZHJhd1N0YXJ0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudCB8IFRvdWNoPjtcbiAgQE91dHB1dCgpIHB1YmxpYyBkcmF3QmVmb3JlVXBkYXRlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudCB8IFRvdWNoPjtcbiAgQE91dHB1dCgpIHB1YmxpYyBkcmF3QWZ0ZXJVcGRhdGU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50IHwgVG91Y2g+O1xuICBAT3V0cHV0KCkgcHVibGljIGRyYXdFbmQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50IHwgVG91Y2g+O1xuXG4gIHByaXZhdGUgc2lnbmF0dXJlUGFkOiBTaWduYXR1cmVQYWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IHt9IGFzIE5nU2lnbmF0dXJlUGFkT3B0aW9ucztcbiAgICB0aGlzLmRyYXdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudCB8IFRvdWNoPigpO1xuICAgIHRoaXMuZHJhd0JlZm9yZVVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudCB8IFRvdWNoPigpO1xuICAgIHRoaXMuZHJhd0FmdGVyVXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50IHwgVG91Y2g+KCk7XG4gICAgdGhpcy5kcmF3RW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50IHwgVG91Y2g+KCk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSB0aGlzLmdldENhbnZhcygpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2FudmFzSGVpZ2h0KSB7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLmNhbnZhc0hlaWdodDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNhbnZhc1dpZHRoKSB7XG4gICAgICBjYW52YXMud2lkdGggPSB0aGlzLm9wdGlvbnMuY2FudmFzV2lkdGg7XG4gICAgfVxuXG4gICAgdGhpcy5zaWduYXR1cmVQYWQgPSBuZXcgU2lnbmF0dXJlUGFkKGNhbnZhcywgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5hZGRFdmVudExpc3RlbmVyKCdiZWdpblN0cm9rZScsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHRoaXMuYmVnaW5TdHJva2UoZXZlbnQuZGV0YWlsKSk7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JlVXBkYXRlU3Ryb2tlJywgKGV2ZW50OiBDdXN0b21FdmVudCkgPT4gdGhpcy5iZWZvcmVVcGRhdGVTdHJva2UoZXZlbnQuZGV0YWlsKSk7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuYWRkRXZlbnRMaXN0ZW5lcignYWZ0ZXJVcGRhdGVTdHJva2UnLCAoZXZlbnQ6IEN1c3RvbUV2ZW50KSA9PiB0aGlzLmFmdGVyVXBkYXRlU3Ryb2tlKGV2ZW50LmRldGFpbCkpO1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZFN0cm9rZScsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHRoaXMuZW5kU3Ryb2tlKGV2ZW50LmRldGFpbCkpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSB0aGlzLmdldENhbnZhcygpO1xuICAgIGNhbnZhcy53aWR0aCA9IDA7XG4gICAgY2FudmFzLmhlaWdodCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmVkcmF3IG9yIFJlc2l6ZSBjYW52YXMsIG5vdGUgdGhpcyB3aWxsIGNsZWFyIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgcmVkcmF3Q2FudmFzKCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSB0aGlzLmdldENhbnZhcygpO1xuICAgIC8vIHdoZW4gem9vbWVkIG91dCB0byBsZXNzIHRoYW4gMTAwJSwgZm9yIHNvbWUgdmVyeSBzdHJhbmdlIHJlYXNvbixcbiAgICAvLyBzb21lIGJyb3dzZXJzIHJlcG9ydCBkZXZpY2VQaXhlbFJhdGlvIGFzIGxlc3MgdGhhbiAxLCBhbmQgb25seSBwYXJ0IG9mIHRoZSBjYW52YXMgaXMgY2xlYXJlZCB0aGVuLlxuICAgIGNvbnN0IHJhdGlvOiBudW1iZXIgPSBNYXRoLm1heCh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLCAxKTtcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMub2Zmc2V0V2lkdGggKiByYXRpbztcbiAgICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzLm9mZnNldEhlaWdodCAqIHJhdGlvO1xuICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuY2xlYXIoKTsgLy8gb3RoZXJ3aXNlIGlzRW1wdHkoKSBtaWdodCByZXR1cm4gaW5jb3JyZWN0IHZhbHVlXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBzaWduYXR1cmUgaW1hZ2UgYXMgYW4gYXJyYXkgb2YgcG9pbnQgZ3JvdXBzXG4gICAqL1xuICBwdWJsaWMgdG9EYXRhKCk6IFBvaW50R3JvdXBbXSB7XG4gICAgaWYgKHRoaXMuc2lnbmF0dXJlUGFkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQudG9EYXRhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhd3Mgc2lnbmF0dXJlIGltYWdlIGZyb20gYW4gYXJyYXkgb2YgcG9pbnQgZ3JvdXBzXG4gICAqL1xuICBwdWJsaWMgZnJvbURhdGEocG9pbnRzOiBBcnJheTxQb2ludEdyb3VwPik6IHZvaWQge1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLmZyb21EYXRhKHBvaW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBzaWduYXR1cmUgaW1hZ2UgYXMgZGF0YSBVUkwgKHNlZSBodHRwczovL21kbi5pby90b2RhdGF1cmwgZm9yIHRoZSBsaXN0IG9mIHBvc3NpYmxlIHBhcmFtZXRlcnMpXG4gICAqL1xuICBwdWJsaWMgdG9EYXRhVVJMKGltYWdlVHlwZT86IHN0cmluZywgcXVhbGl0eT86IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlUGFkLnRvRGF0YVVSTChpbWFnZVR5cGUsIHF1YWxpdHkpOyAvLyBzYXZlIGltYWdlIGFzIGRhdGEgVVJMXG4gIH1cblxuICAvKipcbiAgICogRHJhd3Mgc2lnbmF0dXJlIGltYWdlIGZyb20gZGF0YSBVUkxcbiAgICovXG4gIHB1YmxpYyBmcm9tRGF0YVVSTChkYXRhVVJMOiBzdHJpbmcsIG9wdGlvbnM6IHsgcmF0aW8/OiBudW1iZXI7IHdpZHRoPzogbnVtYmVyOyBoZWlnaHQ/OiBudW1iZXIgfSA9IHt9KTogdm9pZCB7XG4gICAgLy8gc2V0IGRlZmF1bHQgaGVpZ2h0IGFuZCB3aWR0aCBvbiByZWFkIGRhdGEgZnJvbSBVUkxcbiAgICBpZiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2hlaWdodCcpICYmIHRoaXMub3B0aW9ucy5jYW52YXNIZWlnaHQpIHtcbiAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLmNhbnZhc0hlaWdodDtcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmIHRoaXMub3B0aW9ucy5jYW52YXNXaWR0aCkge1xuICAgICAgb3B0aW9ucy53aWR0aCA9IHRoaXMub3B0aW9ucy5jYW52YXNXaWR0aDtcbiAgICB9XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuZnJvbURhdGFVUkwoZGF0YVVSTCwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBjYW52YXNcbiAgICovXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBjYW52YXMgaXMgZW1wdHksIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXG4gICAqL1xuICBwdWJsaWMgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQuaXNFbXB0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuYmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzXG4gICAqL1xuICBwdWJsaWMgb2ZmKCk6IHZvaWQge1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9mZigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzXG4gICAqL1xuICBwdWJsaWMgb24oKTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQub24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgYW4gb3B0aW9uIG9uIHRoZSBzaWduYXR1cmVQYWQgLSBlLmcuIHNldCgnbWluV2lkdGgnLCA1MCk7XG4gICAqIEBwYXJhbSBvcHRpb24gb25lIG9mIFNpZ25hdHVyZVBhZCB0byBzZXQgd2l0aCB2YWx1ZSwgcHJvcGVydGllcyBvZiBOZ1NpZ25hdHVyZVBhZE9wdGlvbnNcbiAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSBvZiBvcHRpb25cbiAgICovXG4gIHB1YmxpYyBzZXQob3B0aW9uOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gdGhpcy5nZXRDYW52YXMoKTtcbiAgICBzd2l0Y2ggKG9wdGlvbikge1xuICAgICAgY2FzZSAnY2FudmFzSGVpZ2h0JzpcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NhbnZhc1dpZHRoJzpcbiAgICAgICAgY2FudmFzLndpZHRoID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQYWRbb3B0aW9uXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBub3RpZnkgc3Vic2NyaWJlcnMgb24gc2lnbmF0dXJlIGJlZ2luXG4gICAqL1xuICBwdWJsaWMgYmVnaW5TdHJva2UoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaCk6IHZvaWQge1xuICAgIHRoaXMuZHJhd1N0YXJ0LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIGJlZm9yZVVwZGF0ZVN0cm9rZShldmVudDogTW91c2VFdmVudCB8IFRvdWNoKTogdm9pZCB7XG4gICAgdGhpcy5kcmF3QmVmb3JlVXBkYXRlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIGFmdGVyVXBkYXRlU3Ryb2tlKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2gpOiB2b2lkIHtcbiAgICB0aGlzLmRyYXdBZnRlclVwZGF0ZS5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBub3RpZnkgc3Vic2NyaWJlcnMgb24gc2lnbmF0dXJlIGVuZFxuICAgKi9cbiAgcHVibGljIGVuZFN0cm9rZShldmVudDogTW91c2VFdmVudCB8IFRvdWNoKTogdm9pZCB7XG4gICAgdGhpcy5kcmF3RW5kLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIGdldFNpZ25hdHVyZVBhZCgpOiBTaWduYXR1cmVQYWQge1xuICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcbiAgfVxufVxuIl19
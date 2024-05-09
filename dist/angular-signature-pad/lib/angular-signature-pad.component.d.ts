import { AfterContentInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import SignaturePad, { Options, PointGroup } from 'signature_pad';
import * as i0 from "@angular/core";
export interface NgSignaturePadOptions extends Options {
    canvasHeight: number;
    canvasWidth: number;
}
export declare class SignaturePadComponent implements AfterContentInit, OnDestroy {
    private elementRef;
    options: NgSignaturePadOptions;
    drawStart: EventEmitter<MouseEvent | Touch>;
    drawBeforeUpdate: EventEmitter<MouseEvent | Touch>;
    drawAfterUpdate: EventEmitter<MouseEvent | Touch>;
    drawEnd: EventEmitter<MouseEvent | Touch>;
    private signaturePad;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * Redraw or Resize canvas, note this will clear data.
     */
    redrawCanvas(): void;
    /**
     * Returns signature image as an array of point groups
     */
    toData(): PointGroup[];
    /**
     * Draws signature image from an array of point groups
     */
    fromData(points: Array<PointGroup>): void;
    /**
     * Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible parameters)
     */
    toDataURL(imageType?: string, quality?: number): string;
    /**
     * Draws signature image from data URL
     */
    fromDataURL(dataURL: string, options?: {
        ratio?: number;
        width?: number;
        height?: number;
    }): void;
    /**
     * Clears the canvas
     */
    clear(): void;
    /**
     * Returns true if canvas is empty, otherwise returns false
     */
    isEmpty(): boolean;
    /**
     * Unbinds all event handlers
     */
    off(): void;
    /**
     * Rebinds all event handlers
     */
    on(): void;
    /**
     * set an option on the signaturePad - e.g. set('minWidth', 50);
     * @param option one of SignaturePad to set with value, properties of NgSignaturePadOptions
     * @param value the value of option
     */
    set(option: string, value: any): void;
    /**
     * notify subscribers on signature begin
     */
    beginStroke(event: MouseEvent | Touch): void;
    beforeUpdateStroke(event: MouseEvent | Touch): void;
    afterUpdateStroke(event: MouseEvent | Touch): void;
    /**
     * notify subscribers on signature end
     */
    endStroke(event: MouseEvent | Touch): void;
    getSignaturePad(): SignaturePad;
    getCanvas(): HTMLCanvasElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignaturePadComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SignaturePadComponent, "signature-pad", never, { "options": "options"; }, { "drawStart": "drawStart"; "drawBeforeUpdate": "drawBeforeUpdate"; "drawAfterUpdate": "drawAfterUpdate"; "drawEnd": "drawEnd"; }, never, never, false, never>;
}
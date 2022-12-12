/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	HostBinding,
	Input,
	ViewChild,
	ElementRef,
	Renderer2,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
} from '@angular/core';

@Component({
	selector: 'ril-radio-option',
	templateUrl: './radio-option.html',
	styleUrls: ['./radio-option.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilRadioOption implements AfterViewInit {
	@HostBinding('class.ril-radio-option') true;
	@HostBinding('class.disabled') @Input() disabled: boolean;
	@HostBinding('class.checked') checked: boolean;
	@ViewChild('radioLabel', { static: true }) radioLabel;
	@Input() name: string;
	@Input() label: string;
	@Input('value') _value: string;
	@Output() changeValue: EventEmitter<string>;

	constructor(private renderer: Renderer2, private elementRef: ElementRef, private cdRef: ChangeDetectorRef) {
		this.label = '';
		this.name = '';
		this.checked = false;
		this.disabled = false;
		this.changeValue = new EventEmitter<string>();
	}

	ngAfterViewInit() {
		this.cdRef.detectChanges();
	}

	switch(value: string) {
		if (!this.disabled && !this.checked) {
			this.changeValue.emit(value);
		}
	}

	changeAttr(checked: boolean) {
		this.renderer.setProperty(this.elementRef, 'checked', checked);
	}
}

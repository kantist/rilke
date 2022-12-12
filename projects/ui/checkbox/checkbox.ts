/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, OnInit, HostBinding, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'ril-checkbox',
	templateUrl: './checkbox.html',
	styleUrls: ['./checkbox.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RilCheckbox),
			multi: true,
		},
	],
})
export class RilCheckbox implements ControlValueAccessor, OnInit {
	@HostBinding('class.ril-checkbox') true = true;
	@HostBinding('class.checked') get focus() {
		return this._value;
	}

	@HostBinding('class.disabled') @Input() disabled: boolean;
	@Input() name: string;
	@Input('value') _value: boolean;

	onChange: any = () => {};
	onTouched: any = () => {};

	constructor() {
		this._value = false;
		this.name = '';
		this.disabled = false;
	}

	ngOnInit() {}

	get value() {
		return this._value;
	}

	set value(val) {
		this._value = val;
		this.onChange(val);
		this.onTouched();
	}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	writeValue(value) {
		if (value) {
			this.value = value;
		}
	}

	switch(bool: boolean) {
		if (!this.disabled) {
			this.value = !bool;
		}
	}
}

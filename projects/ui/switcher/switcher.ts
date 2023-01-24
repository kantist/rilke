/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import {
	Component,
	forwardRef,
	HostBinding,
	Input,
	OnInit,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'ril-switcher',
	templateUrl: './switcher.html',
	styleUrls: ['./switcher.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RilSwitcher),
			multi: true,
		},
	],
})
export class RilSwitcher implements OnInit {
	@HostBinding('class.ril-switcher') true;
	@HostBinding('class.checked') get focus() {
		return this._value;
	}
	@HostBinding('class.disabled') @Input() disabled: boolean;
	@Input() label: string;
	@Input() name: string;
	@Input('value') _value: boolean;
	@Output() valueChanged: EventEmitter<boolean>;

	onChange: any = () => {};
	onTouched: any = () => {};

	constructor(private cdr: ChangeDetectorRef) {
		this.valueChanged = new EventEmitter();
		this._value = false;
		this.label = '';
		this.name = '';
		this.disabled = false;
	}

	ngOnInit() {}

	get value() {
		return this._value;
	}

	set value(val) {
		this._value = val;
		this.valueChanged.emit(val);
		this.onChange(val);
		this.onTouched();

		this.cdr.detectChanges();
	}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	writeValue(value) {
		this.value = value;
	}

	switch(bool: boolean) {
		if (!this.disabled) {
			this.value = !bool;
		}
	}
}

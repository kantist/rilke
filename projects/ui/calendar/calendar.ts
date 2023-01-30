/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, Input, OnInit, forwardRef, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'ril-calendar',
	templateUrl: './calendar.html',
	styleUrls: ['./calendar.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RilCalendar),
			multi: true,
		},
	],
})
export class RilCalendar implements OnInit, ControlValueAccessor {
	@HostBinding('class.input-disabled') @Input() disabled: boolean;
	@Input('value') innerValue: string;

	@Input() backgroundColor: string;
	@Input() width: string;
	@Input() direction: string;
	@Input() showHex: boolean;
	@Input() comparisonStart: Date | null;
	@Input() comparisonEnd: Date | null;

	get value() {
		if (this.innerValue) {
			return this.innerValue;
		} else {
			return null;
		}
	}

	set value(v) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.onChange(v);
		}
	}

	onChange = (color: string) => {};
	onTouched = () => {};

	constructor() {}

	ngOnInit() {}

	writeValue(value: string) {
		if (value !== this.innerValue) {
			this.innerValue = value;
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
}

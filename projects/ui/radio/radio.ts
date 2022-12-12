/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import {
	AfterContentInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChildren,
	EventEmitter,
	forwardRef,
	HostBinding,
	Input,
	Output,
	QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RilRadioOption } from './radio-option/radio-option';

@Component({
	selector: 'ril-radio',
	templateUrl: './radio.html',
	styleUrls: ['./radio.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RilRadio),
			multi: true,
		},
	],
})
export class RilRadio implements AfterContentInit, ControlValueAccessor {
	@Input() direction: string;
	@Input() value: string;
	@Output() change: EventEmitter<string>;
	@HostBinding('class.ril-radio') true;
	@HostBinding('class.ril-radio-horizontal') get getDirection() {
		return this.direction === 'horizontal';
	}

	// get option component
	@ContentChildren(RilRadioOption)
	radioOptions: QueryList<RilRadioOption>;

	onChange: any = () => {};
	onTouched: any = () => {};

	constructor(private cdRef: ChangeDetectorRef) {
		this.change = new EventEmitter<string>();
	}

	ngAfterContentInit() {
		this.setCheckedOption(this.value, true);
		this.cdRef.detectChanges();
	}

	setCheckedOption(value: string, subscribe: boolean) {
		if (this.radioOptions && this.radioOptions.length) {
			this.radioOptions.forEach((option) => {
				option.checked = option._value === value ? true : false;

				if (subscribe) {
					option.changeValue.subscribe((newValue) => {
						this.writeValue(newValue);
						this.change.emit(newValue);
						this.onChange(newValue);

						this.radioOptions.forEach((option) => {
							option.checked = option._value === newValue ? true : false;
							option.changeAttr(option._value === newValue);
						});
					});
				}
			});
		}
	}

	writeValue(value) {
		if (!value || typeof value !== 'string') {
			return;
		}
		this.value = value;
	}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}
}

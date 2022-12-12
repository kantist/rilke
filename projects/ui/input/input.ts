/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import {
	Component,
	OnInit,
	Input,
	forwardRef,
	HostBinding,
	ElementRef,
	Output,
	EventEmitter,
	Inject,
	PLATFORM_ID,
	ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { isPlatformBrowser } from '@angular/common';
import { IRilInputProperties } from './input.model';

const PROPERTIES_NAMES: string[] = ['prefix', 'suffix', 'prefixIcon', 'suffixIcon', 'placeholder'];

@Component({
	selector: 'ril-input',
	templateUrl: './input.html',
	styleUrls: ['./input.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RilInput),
			multi: true,
		},
	],
})
export class RilInput implements ControlValueAccessor, OnInit {
	@HostBinding('class.ril-input') simpleInput: boolean;
	@HostBinding('class.input-focus') inputFocus: boolean;
	@HostBinding('class.input-disabled') @Input() disabled: boolean;
	@HostBinding('class.input-readonly') @Input() readonly: boolean;
	@Input() type: string;
	@Input() name: string;
	@Input() min: string;
	@Input() max: string;
	@Input() placeholder: string;
	@Input() charLimiting: number;
	@Input() prefix: string | string[];
	@Input() suffix: string | string[];
	@Input() prefixIcon: string | string[];
	@Input() suffixIcon: string | string[];
	@Input() size: string;
	@Input() required: boolean;
	@Input() autoSize: boolean;
	@HostBinding('class.has-value') @Input('value') innerValue: string;

	@Output() focus: EventEmitter<boolean>;
	@Output() blur: EventEmitter<void>;

	@Input() set focused(f) {
		if (f) {
			this.onFocus(this.disabled);
		}
	}

	charLength: number;
	properties: IRilInputProperties;

	onChange: any = () => {};
	onTouched: any = () => {};

	constructor(public element: ElementRef, @Inject(PLATFORM_ID) public platformId: any) {
		this.simpleInput = true;
		this.type = 'text';
		this.name = '';
		this.size = 'md';
		this.inputFocus = false;
		this.readonly = false;
		this.disabled = false;
		this.required = false;
		this.autoSize = false;
		this.innerValue = '';
		this.properties = {
			prefixValue: '',
			prefixColor: '',
			suffixValue: '',
			suffixColor: '',
			prefixIconValue: '',
			prefixIconColor: '',
			suffixIconValue: '',
			suffixIconColor: '',
		};
		this.blur = new EventEmitter<void>();
		this.focus = new EventEmitter<boolean>();
	}

	ngOnInit() {
		this.changeCharLength(this.charLimiting, this.innerValue.length);

		if (this.autoSize) {
			if (isPlatformBrowser(this.platformId)) {
				setTimeout(() => {
					this.resizable(this.element.nativeElement.querySelector('.input-control'));
				}, 0);
			}
		}

		PROPERTIES_NAMES.forEach((property) => {
			const PROPERTY = this[property];

			this.properties[`${property}Value`] = PROPERTY instanceof Array ? PROPERTY[0] : PROPERTY;
			this.properties[`${property}Color`] = PROPERTY instanceof Array ? PROPERTY[1] : null;
		});
	}

	get value() {
		return this.innerValue;
	}

	set value(v) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.onChange(v);
		}

		if (this.charLimiting > 0) {
			this.changeCharLength(this.charLimiting, this.innerValue.length);
		}
	}

	changeCharLength(limit: number, valLength: number) {
		this.charLength = limit - valLength >= 0 ? limit - valLength : 0;
	}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	writeValue(value: string) {
		if (value !== this.innerValue) {
			this.innerValue = value;
			this.focus.emit(true);
			this.blur.emit();
		}
	}

	setDisabledState(isDisabled: boolean) {
		this.disabled = isDisabled;
	}

	onFocus(disabled: boolean) {
		if (!this.inputFocus && !disabled) {
			this.element.nativeElement.querySelector('.input-control').focus();
			this.inputFocus = true;

			this.focus.emit(true);
		}
	}

	onBlur(disabled: boolean) {
		this.inputFocus = false;
		this.focus.emit(false);

		if (!disabled) {
			this.blur.emit();
			this.onTouched();
		}
	}

	resizable(el: any, factor?: number) {
		const INT: number = Number(factor) || 7.7;

		function resize() {
			el.parentElement.style.maxWidth = el.value.length * INT + 4 + 'px';
		}

		const e = 'keyup, keypress, focus, blur, change'.split(',');

		for (let i = 0; i < e.length; i++) {
			el.addEventListener(e[i], resize, false);
		}

		resize();
	}
}

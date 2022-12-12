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
	ViewChild,
	Inject,
	PLATFORM_ID,
	ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { BreakpointObserver } from '@angular/cdk/layout';

// import { IRilInputProperties } from '../input/input.model';
import { isPlatformBrowser } from '@angular/common';

const PROPERTIES_NAMES: string[] = ['prefix', 'suffix', 'prefixIcon', 'suffixIcon', 'placeholder'];

@Component({
	selector: 'ril-date-picker',
	templateUrl: './datepicker.html',
	styleUrls: ['./datepicker.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RilDatePicker),
			multi: true,
		},
	],
})
export class RilDatePicker implements ControlValueAccessor, OnInit {
	@ViewChild('picker') picker;

	@HostBinding('class.ril-date-picker') true = true;

	@HostBinding('class.input-sm') get smSize() {
		return this.size === 'sm';
	}
	@HostBinding('class.input-lg') get lgSize() {
		return this.size === 'lg';
	}

	@HostBinding('class.input-focus') get focused() {
		return this.inputFocus;
	}
	@HostBinding('class.input-disabled') @Input() disabled: boolean;
	@HostBinding('class.input-readonly') @Input() readonly: boolean;

	@Input() type: string;
	@Input() name: string;
	@Input() placeholder: string;
	@Input() prefix: string | string[];
	@Input() suffix: string | string[];
	@Input() prefixIcon: string | string[];
	@Input() suffixIcon: string | string[];
	@Input() size: string;
	@Input() required: boolean;
	@Input() autoSize: boolean;
	@HostBinding('class.has-value') @Input('value') innerValue: string;
	@Input() autoOpen: boolean;

	@Output() focus: EventEmitter<void>;
	@Output() blur: EventEmitter<void>;
	@Output() valueChange: EventEmitter<string>;

	inputFocus: boolean;
	properties: any;

	onChange: any = () => {};
	onTouched: any = () => {};

	get touchUi() {
		return this.breakpointObserver.isMatched('(max-width: 767px)');
	}

	constructor(
		public element: ElementRef,
		@Inject(PLATFORM_ID) public platformId: any,
		private breakpointObserver: BreakpointObserver
	) {
		this.placeholder = '';
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
		this.focus = new EventEmitter<void>();
		this.valueChange = new EventEmitter<string>();
		this.suffixIcon = 'icofont-ui-calendar';
		this.autoOpen = true;
	}

	open() {
		this.picker.open();
		this.onFocus(this.disabled);
	}

	close() {
		this.picker.close();
		this.onBlur(this.disabled);
	}

	ngOnInit() {
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
			this.valueChange.emit(v);
			this.onChange(v);
		}
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
			this.focus.emit();
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
			this.focus.emit();
		}
	}

	onBlur(disabled: boolean) {
		this.inputFocus = false;
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

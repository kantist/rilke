/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { isPlatformBrowser } from '@angular/common';
import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	forwardRef,
	HostBinding,
	ElementRef,
	HostListener,
	PLATFORM_ID,
	Inject,
	ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { IRilTextAreaLimiter } from './text-area.model';

@Component({
	selector: 'ril-text-area, ril-textarea',
	templateUrl: './text-area.html',
	styleUrls: ['./text-area.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RilTextArea),
			multi: true,
		},
	],
})
export class RilTextArea implements ControlValueAccessor, OnInit {
	@HostBinding('class.ril-textarea') class = true;
	@HostBinding('class.textarea-focus') get focused() {
		return this.textareaFocus;
	}
	@HostBinding('class.textarea-disabled') @Input() disabled: boolean;
	@HostBinding('class.textarea-not-resize') get getResize() {
		return !this.resize || this.autoGrow;
	}
	@HostBinding('class.textarea-readonly') @Input() readonly: boolean;
	@HostBinding('style.height') get controlHeight() {
		const HEIGHT = this.height;

		return typeof HEIGHT === 'number' ? `${HEIGHT}px` : HEIGHT;
	}

	@HostBinding('class.textarea-nostyle') @Input() noStyle: boolean;

	@Input() name: string;
	@Input() placeholder: string;
	@Input() charLimiter: number | IRilTextAreaLimiter;
	@Input() required: boolean;
	@Input('value') innerValue: string;
	@Input() bgColor: string | string[];
	@Input() borderColor: string | string[];
	@Input() color: string | string[];
	@Input('autoGrow') autoGrowArea: boolean;
	@Input() resize: boolean;
	@Input() height: number | string;
	@Input() rows: number;

	@HostListener('input')
	onInput(): void {
		return this.autoGrowArea ? this.adjust() : null;
	}

	@Output() focus: EventEmitter<boolean>;

	textareaFocus: boolean;
	limiter: IRilTextAreaLimiter;
	currentBgColor: string;
	currentBorderColor: string;
	currentColor: string;
	states: any;
	onChange: any = () => {};
	onTouched: any = () => {};

	constructor(private element: ElementRef, @Inject(PLATFORM_ID) public platformId: any) {
		this.name = '';
		this.textareaFocus = false;
		this.readonly = false;
		this.disabled = false;
		this.required = false;
		this.innerValue = '';
		this.autoGrowArea = false;
		this.resize = false;
		this.limiter = {
			counter: null,
			before: '',
			after: '',
		};

		this.focus = new EventEmitter<boolean>();
	}

	ngOnInit() {
		if (this.charLimiter) this.setLimiter(this.charLimiter, this.value);
	}

	setLimiter(limiter: number | IRilTextAreaLimiter, value: string) {
		const VAL_LENGHT = value.length ? value.length : 0;

		if (limiter instanceof Object) {
			this.limiter = {
				counter: limiter['counter'] - VAL_LENGHT,
				before: limiter['before'],
				after: limiter['after'],
			};
		} else {
			this.limiter.counter = limiter - VAL_LENGHT;
		}
	}

	get value() {
		return this.innerValue;
	}

	set value(v) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.onChange(v);
		}

		if (this.charLimiter) {
			this.limiter.counter =
				(this.charLimiter instanceof Object ? this.charLimiter['counter'] : this.charLimiter) -
				this.innerValue.length;
		}
	}

	get autoGrow() {
		return this.autoGrowArea;
	}

	set autoGrow(v) {
		if (v !== this.autoGrowArea) {
			this.autoGrowArea = v;

			if (this.autoGrowArea) {
				this.adjust();
			} else {
				this.deAdjust();
			}
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
			this.onInput();
		}
	}

	onFocus(disabled: boolean) {
		if (!this.textareaFocus && !disabled) {
			this.element.nativeElement.querySelector('.textarea-control').focus();
			this.textareaFocus = true;

			this.focus.emit(true);
		}
	}

	onBlur(disabled: boolean) {
		this.textareaFocus = false;
		this.focus.emit(false);
	}

	adjust(): void {
		if (isPlatformBrowser(this.platformId)) {
			setTimeout(() => {
				let el = this.element.nativeElement.querySelector('textarea');

				if (el) {
					el.style.overflow = 'hidden';
					el.style.height = 'auto';
					el.style.height = `${el.scrollHeight + 2}px`;
				}
			});
		}
	}

	deAdjust(): void {
		if (isPlatformBrowser(this.platformId)) {
			setTimeout(() => {
				let el = this.element.nativeElement.querySelector('textarea');

				if (el) {
					el.style.overflow = 'auto';
					el.style.height = '100%';
				}
			});
		}
	}
}

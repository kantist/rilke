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
	HostBinding,
	Input,
	HostListener,
	forwardRef,
	Output,
	EventEmitter,
	ContentChildren,
	QueryList,
	ViewChild,
	AfterContentInit,
	ChangeDetectionStrategy,
	Inject,
	ViewEncapsulation,
	ContentChild,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';

import { RilSelectOption } from './select-option/select-option';

import { RIL_LANGUAGE } from '@rilke/ui/common';
import { RilInput } from '@rilke/ui/input';

@Component({
	selector: 'ril-select',
	templateUrl: './select.html',
	styleUrls: ['./select.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.Emulated,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RilSelect),
			multi: true,
		},
	],
})
export class RilSelect implements OnInit, AfterContentInit, ControlValueAccessor {
	@ContentChild(RilInput) searchBoxRef!: RilInput;

	@Output() valueSelected: EventEmitter<any | any[]>;
	@Input() search: boolean;
	@Input() disableOptionCentering: boolean;
	@Input() disableRipple: boolean;
	@Input() disabled: boolean;
	@Input() id: string;
	@Input() multiple: boolean;
	@Input() panelClass: string | string[] | Set<string> | { [key: string]: any };
	@Input() placeholder: string;
	@Input() required: boolean;
	@Input() typeaheadDebounceInterval: number;
	@Output() openedChange: EventEmitter<boolean>;
	@Output() selectionChange: EventEmitter<any>;

	@ContentChildren(RilSelectOption)
	optionQueries: QueryList<RilSelectOption>;

	@ViewChild('matSelect') matSelect;

	@HostBinding('class.has-value') @Input('value') innerValue: any;
	onChange: any = () => {};
	onTouched: any = () => {};

	@HostListener('click', ['$event'])
	toggleSelect() {
		if (this.searchBoxRef) {
			this.searchBoxRef.onFocus(false);
		}
		this.matSelect.open();
	}
	searchValue: string;
	searchForm: FormGroup;

	options: any[];
	filtered_options: any[];

	constructor(@Inject(RIL_LANGUAGE) public lang, private formBuilder: FormBuilder) {
		this.disableOptionCentering = false;
		this.disableRipple = true;
		this.disabled = false;
		this.id = '';
		this.multiple = false;
		this.panelClass = '';
		this.required = false;
		this.search = false;
		this.searchValue = '';
		this.typeaheadDebounceInterval = 0;
		this.openedChange = new EventEmitter<boolean>();
		this.selectionChange = new EventEmitter<any>();
		this.valueSelected = new EventEmitter();
		this.searchForm = this.formBuilder.group({
			search: [''],
		});

		this.options = this.optionQueries?.toArray();
		this.filtered_options = this.options;
	}

	ngOnInit() {}

	ngAfterContentInit() {
		if (this.optionQueries) {
			this.options = this.optionQueries.toArray();
			this.filtered_options = this.options;
		}

		this.searchForm.get('search')?.valueChanges.subscribe((res) => {
			this.filterResults(res);
		});

		this.optionQueries.changes.subscribe((opt) => {
			this.options = opt.toArray();
			this.filtered_options = this.options;
		});
	}

	filterResults(phrase) {
		this.filtered_options = this.options.filter((item) =>
			item.content.toLocaleUpperCase('tr-TR').includes(phrase.toLocaleUpperCase('tr-TR'))
		);
	}

	setDefault(status) {
		this.searchForm.get('search')?.setValue('');
	}

	// register OnChange event

	registerOnChange(fn: any) {
		this.onChange = fn;
	}

	// register OnTouched event
	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	writeValue(value: string | string[]) {
		if (value !== this.innerValue) {
			this.innerValue = value;
		}
	}

	// get value
	get value() {
		return this.innerValue;
	}

	// set value
	set value(v) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.selectionChange.emit(v);
			this.onChange(v);
		}
	}
}

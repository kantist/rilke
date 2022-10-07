/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	HostBinding,
	HostListener,
	Inject,
	Input,
	OnInit,
	PLATFORM_ID,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RIL_LANGUAGE } from '@rilke/ui/common';
import { IFile, RilFile } from './file.model';

@Component({
	selector: 'ril-file-drop',
	templateUrl: 'file-drop.html',
	styleUrls: ['./file-drop.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RilFileDrop),
			multi: true,
		},
	],
})
export class RilFileDrop implements ControlValueAccessor, OnInit {
	@HostBinding('class.ril-file-upload') rilFileUpload: boolean;
	@Input() multiple: boolean;
	@Input() required: boolean;
	@HostBinding('class.input-readonly') @Input() readonly: boolean;
	@HostBinding('class.input-disabled') @Input() disabled: boolean;

	@HostBinding('class.has-value') @Input('value') innerValue: IFile[];
	fileOver: boolean;

	// Dragover listener
	@HostListener('dragover', ['$event']) onDragOver(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.fileOver = true;
	}

	// Dragleave listener
	@HostListener('dragleave', ['$event']) public onDragLeave(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.fileOver = false;
	}

	// Drop listener
	@HostListener('drop', ['$event']) public ondrop(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.fileOver = false;
		let files = evt.dataTransfer.files;
		if (files.length > 0) {
			this.fileReader(files);
		}
	}

	onChange: any = () => {};
	onTouched: any = () => {};

	constructor(@Inject(RIL_LANGUAGE) public lang, @Inject(PLATFORM_ID) public platformId: any) {
		this.rilFileUpload = true;
		this.readonly = false;
		this.disabled = false;
		this.multiple = true;
		this.required = false;
		this.innerValue = null;
	}

	get value() {
		return this.innerValue;
	}

	set value(v) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.onChange(v);
		}
	}

	ngOnInit() {
		if (isPlatformBrowser(this.platformId)) {
			setInterval(() => {
				this.value = this.value?.filter((v) => v != null);
			}, 100);
		}
	}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	writeValue(value: IFile[]) {
		if (value !== this.innerValue) {
			this.innerValue = value;
		}
	}

	onFileChanged(inputValue: any) {
		const files: File[] = inputValue.target.files;

		this.fileReader(files);
	}

	fileReader(files: File[]) {
		if (!this.value) {
			this.value = [];
		}

		for (let file of files) {
			let reader: FileReader = new FileReader();

			reader.onloadend = () => {
				if (!this.multiple) this.value = [];

				this.value.push(
					new RilFile({
						name: file.name,
						base64: reader.result,
						file: file,
					})
				);
			};

			reader.readAsDataURL(file);
		}
	}
}

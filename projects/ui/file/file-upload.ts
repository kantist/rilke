/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RIL_LANGUAGE } from '@rilke/ui/common';
import { IFile, RilFile } from './file.model';

@Component({
	selector: 'ril-file-upload',
	templateUrl: 'file-upload.html',
	styleUrls: ['./file-upload.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RilFileUpload),
			multi: true,
		},
	],
})
export class RilFileUpload implements ControlValueAccessor, OnInit {
	@HostBinding('class.ril-file-upload') rilFileUpload: boolean;
	@Input() required: boolean;
	@HostBinding('class.input-readonly') @Input() readonly: boolean;
	@HostBinding('class.input-disabled') @Input() disabled: boolean;

	@HostBinding('class.has-value') @Input('value') innerValue: IFile;

	@Input() isImage: boolean;
	isUrl: boolean;

	@Input() selectFileNotice: string;

	onChange: any = () => {};
	onTouched: any = () => {};

	constructor(@Inject(RIL_LANGUAGE) public lang) {
		this.rilFileUpload = true;
		this.readonly = false;
		this.disabled = false;
		this.required = false;
		this.innerValue = null;

		this.isImage = false;
		this.isUrl = false;
	}

	get value() {
		return this.innerValue;
	}

	set value(v) {
		if (v !== this.innerValue) {
			if (this.validURL(v)) {
				this.isUrl = true;
			}

			this.innerValue = v;
			this.onChange(v);

			if (this.value?.file) {
				if (['image/jpg', 'image/png', 'image/jpeg'].includes(this.value.file.type)) {
					this.isImage = true;
				}
			}
		}
	}

	ngOnInit() {
		if (this.value) {
			if (['image/jpg', 'image/png', 'image/jpeg'].includes(this.value.file.type)) {
				this.isImage = true;
			}
		}
	}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	writeValue(value: IFile) {
		if (value !== this.innerValue) {
			if (this.validURL(value)) {
				this.isUrl = true;
			}

			this.innerValue = value;

			if (this.innerValue?.file) {
				if (['image/jpg', 'image/png', 'image/jpeg'].includes(this.innerValue.file.type)) {
					this.isImage = true;
				}
			}
		}
	}

	onFileChanged(inputValue: any) {
		this.value = null;
		this.isImage = false;

		let files: File[] = inputValue.target.files;
		for (let file of files) {
			let reader: FileReader = new FileReader();

			reader.onloadend = () => {
				this.value = new RilFile({
					name: file.name,
					base64: reader.result,
					file: file,
				});
			};

			reader.readAsDataURL(file);
		}
	}

	cancelFile() {
		this.value = null;
		this.isImage = false;
	}

	validURL(str) {
		let pattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocol
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
				'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
				'(\\#[-a-z\\d_]*)?$',
			'i'
		); // fragment locator
		return !!pattern.test(str);
	}
}

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
	ElementRef,
	HostBinding,
	OnInit,
	Input,
	ContentChildren,
	QueryList,
	AfterContentInit,
	Inject,
	PLATFORM_ID,
} from '@angular/core';

import { RilDatePicker } from '@rilke/ui/datepicker';
import { RilInput } from '@rilke/ui/input';
import { RilRichText } from '@rilke/ui/rich-text';
import { RilSelect } from '@rilke/ui/select';
import { RilTextArea } from '@rilke/ui/text-area';

@Component({
	selector: 'ril-form-group',
	templateUrl: './form-group.html',
	styleUrls: ['./form-group.scss'],
})
export class RilFormGroup implements OnInit, AfterContentInit {
	@HostBinding('class.ril-form-group') true = true;
	@HostBinding('class.float') @Input() float = true;
	@HostBinding('class.has-value') hasValue: boolean;
	@HostBinding('class.input-focus') inputFocus: boolean;
	@HostBinding('class.text-area') textarea: boolean;
	@HostBinding('class.rich-text') richtext: boolean;

	@ContentChildren(RilInput)
	inputRef: QueryList<RilInput>;

	@ContentChildren(RilSelect)
	selectRef: QueryList<RilSelect>;

	@ContentChildren(RilTextArea)
	textareaRef: QueryList<RilTextArea>;

	@ContentChildren(RilRichText)
	richTextRef: QueryList<RilRichText>;

	@ContentChildren(RilDatePicker)
	datepickerRef: QueryList<RilDatePicker>;

	constructor(private element: ElementRef, @Inject(PLATFORM_ID) public platformId: any) {}

	ngOnInit() {}

	ngAfterContentInit() {
		this.inputRef.toArray().forEach((input, index) => {
			this.inputFocus = input.inputFocus;
			this.hasValue = input.innerValue ? true : false;

			input.focus.subscribe((i) => {
				this.inputFocus = input.inputFocus;
				this.hasValue = input.innerValue ? true : false;
			});
			input.blur.subscribe((i) => {
				this.inputFocus = input.inputFocus;
				this.hasValue = input.innerValue ? true : false;
			});
		});

		this.selectRef.toArray().forEach((input, index) => {
			this.hasValue = input.innerValue ? true : false;

			input.selectionChange.subscribe((i) => {
				this.hasValue = input.innerValue ? true : false;
			});
		});

		this.textareaRef.toArray().forEach((input, index) => {
			this.textarea = true;
			this.inputFocus = input.textareaFocus;
			this.hasValue = input.innerValue ? true : false;

			input.focus.subscribe((i) => {
				this.inputFocus = input.textareaFocus;
				this.hasValue = input.innerValue ? true : false;
			});
		});

		this.richTextRef.toArray().forEach((input, index) => {
			this.richtext = true;
			this.inputFocus = input.focused;
			this.hasValue = input.innerValue ? true : false;

			input.focus.subscribe((i) => {
				this.inputFocus = input.richtextFocus;
				this.hasValue = input.innerValue ? true : false;
			});
			input.blur.subscribe((i) => {
				this.inputFocus = input.richtextFocus;
				this.hasValue = input.innerValue ? true : false;
			});

			if (isPlatformBrowser(this.platformId)) {
				setTimeout(() => {
					input.editorToolbar.height.subscribe((height) => {
						if (!this.inputFocus && !this.hasValue) {
							this.element.nativeElement
								.getElementsByTagName('ril-form-label')[0]
								.style.setProperty('top', height + 18 + 'px', 'important');
						} else {
							this.element.nativeElement
								.getElementsByTagName('ril-form-label')[0]
								.style.setProperty('top', '-0.5em');
						}
					});
				});
			}
		});

		this.datepickerRef.toArray().forEach((input, index) => {
			this.inputFocus = input.inputFocus;
			this.hasValue = input.innerValue ? true : false;

			input.focus.subscribe((i) => {
				this.inputFocus = input.inputFocus;
				this.hasValue = input.innerValue ? true : false;
			});
			input.blur.subscribe((i) => {
				this.inputFocus = input.inputFocus;
				this.hasValue = input.innerValue ? true : false;
			});
		});
	}
}

/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import {
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Inject,
	Input,
	Output,
	Renderer2,
	ViewChild,
	AfterViewChecked,
	ChangeDetectionStrategy,
} from '@angular/core';
import { RilRichTextService } from '../rich-text.service';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { CustomClass, UploadResponse } from '../rich-text.model';
import { Observable } from 'rxjs';
import { RilDialogService } from '@rilke/ui/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RIL_LANGUAGE } from '@rilke/ui/common';

@Component({
	selector: 'ril-editor-toolbar',
	templateUrl: './editor-toolbar.html',
	styleUrls: ['./editor-toolbar.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilEditorToolbar implements AfterViewChecked {
	htmlMode = false;
	linkSelected = false;
	block = 'default';
	fontName = 'Times New Roman';
	fontSize = '3';
	foreColour;
	backColor;

	headings = [
		{
			label: 'Heading 1',
			value: 'h1',
		},
		{
			label: 'Heading 2',
			value: 'h2',
		},
		{
			label: 'Heading 3',
			value: 'h3',
		},
		{
			label: 'Heading 4',
			value: 'h4',
		},
		{
			label: 'Heading 5',
			value: 'h5',
		},
		{
			label: 'Heading 6',
			value: 'h6',
		},
		{
			label: 'Heading 7',
			value: 'h7',
		},
		{
			label: 'Paragraph',
			value: 'p',
		},
		{
			label: 'Predefined',
			value: 'pre',
		},
		{
			label: 'Standard',
			value: 'div',
		},
		{
			label: 'default',
			value: 'default',
		},
	];

	fontSizes = [
		{
			label: '1',
			value: '1',
		},
		{
			label: '2',
			value: '2',
		},
		{
			label: '3',
			value: '3',
		},
		{
			label: '4',
			value: '4',
		},
		{
			label: '5',
			value: '5',
		},
		{
			label: '6',
			value: '6',
		},
		{
			label: '7',
			value: '7',
		},
	];

	customClassId = '-1';
	_customClasses: CustomClass[];
	customClassList = [{ label: '', value: '' }];

	tagMap = {
		BLOCKQUOTE: 'indent',
		A: 'link',
	};

	select = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'PRE', 'DIV'];

	buttons = [
		'bold',
		'italic',
		'underline',
		'strikeThrough',
		'subscript',
		'superscript',
		'justifyLeft',
		'justifyCenter',
		'justifyRight',
		'justifyFull',
		'indent',
		'outdent',
		'insertUnorderedList',
		'insertOrderedList',
		'link',
	];

	@Input() id: string;
	@Input() uploadUrl: string;
	@Input() upload: (file: File) => Observable<HttpEvent<UploadResponse>>;
	@Input() showToolbar: boolean;
	@Input() fonts = [{ label: '', value: '' }];

	@Input()
	set customClasses(classes: CustomClass[]) {
		if (classes) {
			this._customClasses = classes;
			this.customClassList = this._customClasses.map((x, i) => ({
				label: x.name,
				value: i.toString(),
			}));
			this.customClassList.unshift({ label: 'Clear Class', value: '-1' });
		}
	}

	@Input()
	set defaultFontName(value: string) {
		if (value) {
			this.fontName = value;
		}
	}

	@Input()
	set defaultFontSize(value: string) {
		if (value) {
			this.fontSize = value;
		}
	}

	@Input() hiddenButtons: string[][];
	@Output() height: EventEmitter<number> = new EventEmitter<number>();

	@Output() execute: EventEmitter<string> = new EventEmitter<string>();

	@ViewChild('fileInput', { static: true }) myInputFile: ElementRef;

	@HostListener('window:resize', ['$event'])
	onResizeHandler(event: Event): void {
		this.height.emit(this.er.nativeElement.scrollHeight);
	}

	public get isLinkButtonDisabled(): boolean {
		return this.htmlMode || !Boolean(this.richTextService.selectedText);
	}

	constructor(
		private r: Renderer2,
		private richTextService: RilRichTextService,
		private er: ElementRef,
		@Inject(DOCUMENT) private doc: any,
		@Inject(RIL_LANGUAGE) public lang,
		private dialog: RilDialogService,
		private formBuilder: FormBuilder
	) {}

	ngAfterViewChecked() {
		this.height.emit(this.er.nativeElement.scrollHeight);
	}

	/**
	 * Trigger command from editor header buttons
	 * @param command string from toolbar buttons
	 */
	triggerCommand(command: string) {
		this.execute.emit(command);
	}

	/**
	 * highlight editor buttons when cursor moved or positioning
	 */
	triggerButtons() {
		if (!this.showToolbar) {
			return;
		}
		this.buttons.forEach((e) => {
			const result = this.doc.queryCommandState(e);
			const elementById = this.doc.getElementById(e + '-' + this.id);
			if (result) {
				this.r.addClass(elementById, 'active');
			} else {
				this.r.removeClass(elementById, 'active');
			}
		});
	}

	/**
	 * trigger highlight editor buttons when cursor moved or positioning in block
	 */
	triggerBlocks(nodes: Node[]) {
		if (!this.showToolbar) {
			return;
		}
		this.linkSelected = nodes.findIndex((x) => x.nodeName === 'A') > -1;
		let found = false;
		this.select.forEach((y) => {
			const node = nodes.find((x) => x.nodeName === y);
			if (node !== undefined && y === node.nodeName) {
				if (found === false) {
					this.block = node.nodeName.toLowerCase();
					found = true;
				}
			} else if (found === false) {
				this.block = 'default';
			}
		});

		found = false;
		if (this._customClasses) {
			this._customClasses.forEach((y, index) => {
				const node = nodes.find((x) => {
					if (x instanceof Element) {
						return x.className === y.class;
					}

					return null;
				});
				if (node !== undefined) {
					if (found === false) {
						this.customClassId = index.toString();
						found = true;
					}
				} else if (found === false) {
					this.customClassId = '-1';
				}
			});
		}

		Object.keys(this.tagMap).map((e) => {
			const elementById = this.doc.getElementById(this.tagMap[e] + '-' + this.id);
			const node = nodes.find((x) => x.nodeName === e);
			if (node !== undefined && e === node.nodeName) {
				this.r.addClass(elementById, 'active');
			} else {
				this.r.removeClass(elementById, 'active');
			}
		});

		this.foreColour = this.doc.queryCommandValue('ForeColor');
		this.fontSize = this.doc.queryCommandValue('FontSize');
		this.fontName = this.doc.queryCommandValue('FontName').replace(/"/g, '');
		this.backColor = this.doc.queryCommandValue('backColor');
	}

	/**
	 * insert URL link
	 */
	insertUrl() {
		let form: FormGroup = this.formBuilder.group({
			url: ['https://', Validators.required],
		});

		this.dialog
			.show({
				data: {
					text: 'URL',
					cancel: this.lang.common.cancel,
					action: this.lang.common.confirm,
					form: form,
				},
			})
			.subscribe((result) => {
				if (result) {
					this.focus();

					console.log(result.controls['url'].value);
					this.richTextService.createLink(result.controls['url'].value);
				}
			});
	}

	/**
	 * insert Video link
	 */
	insertVideo() {
		this.execute.emit('');

		let form: FormGroup = this.formBuilder.group({
			url: ['https://', Validators.required],
		});

		this.dialog
			.show({
				data: {
					text: 'URL',
					cancel: this.lang.common.cancel,
					action: this.lang.common.confirm,
					form: form,
				},
			})
			.subscribe((result) => {
				if (result) {
					console.log(result.controls['url'].value);
					this.richTextService.insertVideo(result.controls['url'].value);
				}
			});
	}

	/** insert color */
	insertColor(color: string, where: string) {
		this.richTextService.insertColor(color, where);
		this.execute.emit('');
	}

	/**
	 * set font Name/family
	 * @param fontName string
	 */
	setFontName(fontName: string): void {
		// this.richTextService.fontName(fontName);
		// this.execute.emit('');
	}

	/**
	 * set font Size
	 * @param fontSize string
	 */
	setFontSize(fontSize: string): void {
		this.richTextService.setFontSize(fontSize);
		this.execute.emit('');
	}

	/**
	 * toggle editor mode (WYSIWYG or SOURCE)
	 * @param m boolean
	 */
	setEditorMode(m: boolean) {
		const toggleEditorModeButton = this.doc.getElementById('toggleEditorMode' + '-' + this.id);
		if (m) {
			this.r.addClass(toggleEditorModeButton, 'active');
		} else {
			this.r.removeClass(toggleEditorModeButton, 'active');
		}
		this.htmlMode = m;
	}

	/**
	 * Upload image when file is selected.
	 */
	onFileChanged(event) {
		const file = event.target.files[0];
		if (file.type.includes('image/')) {
			if (this.upload) {
				this.upload(file).subscribe({
					next: (response: any) => {
						return this.watchUploadImage(response, event);
					},
				});
			} else if (this.uploadUrl) {
				this.richTextService.uploadImage(file).subscribe({
					next: (response: any) => {
						return this.watchUploadImage(response, event);
					},
				});
			} else {
				const reader = new FileReader();
				reader.onload = (e: ProgressEvent) => {
					const fr = e.currentTarget as FileReader;
					this.richTextService.insertImage(fr.result.toString());
				};
				reader.readAsDataURL(file);
			}
		}
	}

	watchUploadImage(response: HttpResponse<UploadResponse>, event) {
		const { imageUrl } = response.body;
		this.richTextService.insertImage(imageUrl);
		event.srcElement.value = null;
	}

	/**
	 * Set custom class
	 */
	setCustomClass(classId: string) {
		if (classId === '-1') {
			this.execute.emit('clear');
		} else {
			this.richTextService.createCustomClass(this._customClasses[+classId]);
		}
	}

	isButtonHidden(name: string): boolean {
		if (!name) {
			return false;
		}
		if (!(this.hiddenButtons instanceof Array)) {
			return false;
		}
		let result: any;
		for (const arr of this.hiddenButtons) {
			if (arr instanceof Array) {
				result = arr.find((item) => item === name);
			}
			if (result) {
				break;
			}
		}
		return result !== undefined;
	}

	focus() {
		this.execute.emit('focus');
	}
}

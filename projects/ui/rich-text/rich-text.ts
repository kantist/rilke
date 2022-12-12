/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	HostBinding,
	Inject,
	Input,
	OnInit,
	Output,
	Renderer2,
	SecurityContext,
	ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RichTextConfig, richTextConfig } from './rich-text.model';
import { RilEditorToolbar } from './editor-toolbar/editor-toolbar';
import { RilRichTextService } from './rich-text.service';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'ril-rich-text',
	templateUrl: './rich-text.html',
	styleUrls: ['./rich-text.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RilRichText),
			multi: true,
		},
		RilRichTextService,
	],
})
export class RilRichText implements OnInit, ControlValueAccessor, AfterViewInit {
	@HostBinding('class.ril-richtext') class = true;
	@HostBinding('class.richtext-focus') get focused() {
		return this.richtextFocus;
	}
	@HostBinding('class.richtext-disabled') @Input() disabled: boolean;
	@HostBinding('class.richtext-readonly') @Input() readonly: boolean;

	@HostBinding('class.richtext-nostyle') @Input() noStyle: boolean;

	@ViewChild('editor', { static: true }) textArea: ElementRef;
	@ViewChild('editorWrapper', { static: true }) editorWrapper: ElementRef;
	@ViewChild('editorToolbar') editorToolbar: RilEditorToolbar;

	@Input() config: RichTextConfig = richTextConfig;
	@Input() name: string;
	@Input() placeholder: string;
	@Input() required: boolean;
	@Input('value') innerValue: string;
	@Input() bgColor: string | string[];
	@Input() borderColor: string | string[];
	@Input() color: string | string[];
	@Input() resize: boolean;
	@Input() rows: number;
	@Input() autoGrow: boolean;

	@Output() focus: EventEmitter<boolean>;
	@Output() blur: EventEmitter<void>;
	@Output() html;
	@Output() viewMode = new EventEmitter<boolean>();

	modeVisual: boolean;
	touched: boolean;
	fonts: any;

	richtextFocus: boolean;
	private onChange: (value: string) => void;
	private onTouched: () => void;

	constructor(
		private r: Renderer2,
		private richTextService: RilRichTextService,
		@Inject(DOCUMENT) private doc: any,
		private sanitizer: DomSanitizer
	) {
		this.name = '';
		this.richtextFocus = false;
		this.readonly = false;
		this.disabled = false;
		this.required = false;
		this.innerValue = '';
		this.resize = false;
		this.modeVisual = true;
		this.autoGrow = true;
		this.rows = 3;

		this.focus = new EventEmitter<boolean>();
		this.blur = new EventEmitter<void>();
	}

	ngOnInit() {
		this.config.toolbarPosition = this.config.toolbarPosition
			? this.config.toolbarPosition
			: richTextConfig.toolbarPosition;

		this.fonts = this.getFonts();
	}

	ngAfterViewInit() {
		this.setRow();
	}

	getFonts() {
		const fonts = this.config.fonts ? this.config.fonts : richTextConfig.fonts;
		return fonts.map((x) => {
			return { label: x.name, value: x.name };
		});
	}

	getCustomTags() {
		const tags = ['span'];
		this.config.customClasses.forEach((x) => {
			if (x.tag !== undefined) {
				if (!tags.includes(x.tag)) {
					tags.push(x.tag);
				}
			}
		});
		return tags.join(',');
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

	registerOnChange(fn) {
		this.onChange = (e) => (e === '<br>' ? fn('') : fn(e));
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	writeValue(value: string) {
		if (value === undefined || value === '' || value === '<br>') {
			value = null;
		}

		if (value !== this.innerValue) {
			this.innerValue = value;
			this.refreshView(value);
		}
	}

	refreshView(value: string): void {
		const normalizedValue = value === null ? '' : value;
		this.r.setProperty(this.textArea.nativeElement, 'innerHTML', normalizedValue);

		return;
	}

	setFocus() {
		if (this.modeVisual) {
			this.textArea.nativeElement.focus();
		} else {
			const sourceText = this.doc.getElementById('sourceText');
			sourceText.focus();
			this.focus.emit(true);
		}
	}

	onFocus(event: FocusEvent = null) {
		if (!this.richtextFocus) {
			this.textArea.nativeElement.focus();
			this.richtextFocus = true;

			this.focus.emit(true);

			this.richTextService.executeInNextQueueIteration(() => {
				this.configure();
				this.touched = true;
			});
		}
	}

	onBlur(event: FocusEvent) {
		this.richtextFocus = false;
		this.focus.emit(false);
		this.blur.emit();

		this.richTextService.executeInNextQueueIteration(this.richTextService.saveSelection);

		if (typeof this.onTouched === 'function') {
			this.onTouched();
		}
	}

	setRow(): void {
		let el = this.textArea.nativeElement;

		if (el) {
			let height = el.scrollHeight * this.rows;

			if (this.autoGrow) {
				// el.style['min-height'] = `${height}px`;
			} else {
				el.style.overflow = 'auto';
				el.style.height = `${height}px`;
			}
		}
	}

	onPaste(event: ClipboardEvent) {
		if (this.config.rawPaste) {
			event.preventDefault();
			const text = event.clipboardData.getData('text/plain');
			document.execCommand('insertHTML', false, text);
			return text;
		}

		return '';
	}

	executeCommand(command: string) {
		console.log('command: ' + command);
		this.setFocus();
		if (command === 'focus') {
			return;
		}
		if (command === 'toggleEditorMode') {
			this.toggleEditorMode(this.modeVisual);
		} else if (command !== '') {
			if (command === 'clear') {
				this.richTextService.removeSelectedElements(this.getCustomTags());
				this.onContentChange(this.textArea.nativeElement);
			} else if (command === 'default') {
				this.richTextService.removeSelectedElements('h1,h2,h3,h4,h5,h6,p,pre');
				this.onContentChange(this.textArea.nativeElement);
			} else {
				this.richTextService.executeCommand(command);
			}
			this.exec();
		}
	}

	public onTextAreaMouseOut(event: MouseEvent): void {
		this.richTextService.saveSelection();
	}

	onContentChange(element: HTMLElement | any): void {
		let html = '';
		if (this.modeVisual) {
			html = element.innerHTML;
		} else {
			html = element.innerText;
		}
		if (!html || html === '<br>') {
			html = '';
		}
		if (typeof this.onChange === 'function') {
			this.value =
				this.config.sanitize || this.config.sanitize === undefined
					? this.sanitizer.sanitize(SecurityContext.HTML, html)
					: html;
		}
	}

	toggleEditorMode(modeVisual: boolean) {
		let oContent: any;
		const editableElement = this.textArea.nativeElement;

		if (modeVisual) {
			oContent = this.r.createText(editableElement.innerHTML);
			this.r.setProperty(editableElement, 'innerHTML', '');
			this.r.setProperty(editableElement, 'contentEditable', false);

			const oPre = this.r.createElement('pre');
			this.r.setStyle(oPre, 'margin', '0');
			this.r.setStyle(oPre, 'outline', 'none');

			const oCode = this.r.createElement('code');
			this.r.setProperty(oCode, 'id', 'sourceText');
			this.r.setStyle(oCode, 'display', 'block');
			this.r.setStyle(oCode, 'white-space', 'pre-wrap');
			this.r.setStyle(oCode, 'word-break', 'keep-all');
			this.r.setStyle(oCode, 'outline', 'none');
			this.r.setStyle(oCode, 'margin', '0');
			this.r.setStyle(oCode, 'background-color', '#fff5b9');
			this.r.setProperty(oCode, 'contentEditable', true);
			this.r.appendChild(oCode, oContent);
			// this.focusInstance = this.r.listen(oCode, 'focus', (event) => this.onFocus(event));
			// this.blurInstance = this.r.listen(oCode, 'blur', (event) => this.onBlur(event));
			this.r.appendChild(oPre, oCode);
			this.r.appendChild(editableElement, oPre);

			// ToDo move to service
			this.doc.execCommand('defaultParagraphSeparator', false, 'div');

			this.modeVisual = false;
			this.viewMode.emit(false);
			oCode.focus();
		} else {
			if (this.doc.querySelectorAll) {
				this.r.setProperty(editableElement, 'innerHTML', editableElement.innerText);
			} else {
				oContent = this.doc.createRange();
				oContent.selectNodeContents(editableElement.firstChild);
				this.r.setProperty(editableElement, 'innerHTML', oContent.toString());
			}
			this.r.setProperty(editableElement, 'contentEditable', true);
			this.modeVisual = true;
			this.viewMode.emit(true);
			this.onContentChange(editableElement);
			editableElement.focus();
		}
		this.editorToolbar.setEditorMode(!this.modeVisual);
	}

	exec() {
		this.editorToolbar.triggerButtons();

		let userSelection;
		if (this.doc.getSelection) {
			userSelection = this.doc.getSelection();
			this.richTextService.executeInNextQueueIteration(this.richTextService.saveSelection);
		}

		let a = userSelection.focusNode;
		const els = [];
		while (a && a.id !== 'editor') {
			els.unshift(a);
			a = a.parentNode;
		}
		this.editorToolbar.triggerBlocks(els);
	}

	private configure() {
		this.richTextService.uploadUrl = this.config.uploadUrl;
		this.richTextService.uploadWithCredentials = this.config.uploadWithCredentials;
		if (this.config.defaultParagraphSeparator) {
			this.richTextService.setDefaultParagraphSeparator(this.config.defaultParagraphSeparator);
		}
		if (this.config.defaultFontName) {
			this.richTextService.setFontName(this.config.defaultFontName);
		}
		if (this.config.defaultFontSize) {
			this.richTextService.setFontSize(this.config.defaultFontSize);
		}
	}
}

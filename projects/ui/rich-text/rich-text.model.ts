/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UploadResponse {
	imageUrl: string;
}

export interface CustomClass {
	name: string;
	class: string;
	tag?: string;
}

export interface Font {
	name: string;
	class: string;
}

export interface RichTextConfig {
	editable?: boolean;
	spellcheck?: boolean;
	translate?: 'yes' | 'now' | string;
	enableToolbar?: boolean;
	showToolbar?: boolean;
	defaultParagraphSeparator?: string;
	defaultFontName?: string;
	defaultFontSize?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | string;
	uploadUrl?: string;
	upload?: (file: File) => Observable<HttpEvent<UploadResponse>>;
	uploadWithCredentials?: boolean;
	fonts?: Font[];
	customClasses?: CustomClass[];
	sanitize?: boolean;
	toolbarPosition?: 'top' | 'bottom';
	toolbarHiddenButtons?: string[][];
	rawPaste?: boolean;
}

export const richTextConfig: RichTextConfig = {
	editable: true,
	spellcheck: true,
	translate: 'yes',
	enableToolbar: true,
	showToolbar: true,
	defaultParagraphSeparator: '',
	defaultFontName: '',
	defaultFontSize: '',
	fonts: [
		{ class: 'arial', name: 'Arial' },
		{ class: 'times-new-roman', name: 'Times New Roman' },
		{ class: 'calibri', name: 'Calibri' },
		{ class: 'comic-sans-ms', name: 'Comic Sans MS' },
	],
	uploadUrl: null,
	upload: null,
	uploadWithCredentials: false,
	sanitize: true,
	toolbarPosition: 'top',
	/*toolbarHiddenButtons: [
		['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
		['heading', 'fontName', 'fontSize', 'color'],
		['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
		['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
		['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
		['link', 'unlink', 'image', 'video']
	]*/
};

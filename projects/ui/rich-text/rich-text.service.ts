/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CustomClass, UploadResponse } from './rich-text.model';

@Injectable()
export class RilRichTextService {
	savedSelection: Range | null;
	selectedText: string;
	uploadUrl: string;
	uploadWithCredentials: boolean;

	constructor(
		private http: HttpClient,
		@Inject(DOCUMENT) private doc: any,
		@Inject(PLATFORM_ID) public platformId: any
	) {}

	executeCommand(command: string) {
		const commands = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
		if (commands.includes(command)) {
			this.doc.execCommand('formatBlock', false, command);
			return;
		}
		this.doc.execCommand(command, false, null);
	}

	createLink(url: string) {
		if (!url.includes('http')) {
			this.doc.execCommand('createlink', false, url);
		} else {
			const newUrl = '<a href="' + url + '" target="_blank">' + this.selectedText + '</a>';
			this.insertHtml(newUrl);
		}
	}

	insertColor(color: string, where: string): void {
		const restored = this.restoreSelection();
		console.log(restored);
		console.log(color + where);
		if (restored) {
			if (where === 'textColor') {
				this.doc.execCommand('foreColor', false, color);
			} else {
				this.doc.execCommand('hiliteColor', false, color);
			}
		}
	}

	setFontName(fontName: string) {
		this.doc.execCommand('fontName', false, fontName);
	}

	setFontSize(fontSize: string) {
		this.doc.execCommand('fontSize', false, fontSize);
	}

	insertHtml(html: string): void {
		const isHTMLInserted = this.doc.execCommand('insertHTML', false, html);

		if (!isHTMLInserted) {
			throw new Error('Unable to perform the operation');
		}
	}

	public saveSelection = (): void => {
		if (this.doc.getSelection) {
			const sel = this.doc.getSelection();
			if (sel.getRangeAt && sel.rangeCount) {
				this.savedSelection = sel.getRangeAt(0);
				this.selectedText = sel.toString();
			}
		} else if (this.doc.getSelection && this.doc.createRange) {
			this.savedSelection = document.createRange();
		} else {
			this.savedSelection = null;
		}
	};

	restoreSelection(): boolean {
		if (this.savedSelection) {
			if (this.doc.getSelection) {
				const sel = this.doc.getSelection();
				sel.removeAllRanges();
				sel.addRange(this.savedSelection);
				return true;
			} else if (this.doc.getSelection /*&& this.savedSelection.select*/) {
				// this.savedSelection.select();
				return true;
			}
		}

		return false;
	}

	public executeInNextQueueIteration(callbackFn: (...args: any[]) => any, timeout = 1e2): void {
		if (isPlatformBrowser(this.platformId)) {
			setTimeout(callbackFn, timeout);
		}
	}

	// private checkSelection(): any {
	// 	const selectedText = this.savedSelection.toString();

	// 	if (selectedText.length === 0) {
	// 		throw new Error('No Selection Made');
	// 	}
	// 	return true;
	// }

	uploadImage(file: File): Observable<HttpEvent<UploadResponse>> {
		const uploadData: FormData = new FormData();

		uploadData.append('file', file, file.name);

		return this.http.post<UploadResponse>(this.uploadUrl, uploadData, {
			reportProgress: true,
			observe: 'events',
			withCredentials: this.uploadWithCredentials,
		});
	}

	insertImage(imageUrl: string) {
		this.doc.execCommand('insertImage', false, imageUrl);
	}

	setDefaultParagraphSeparator(separator: string) {
		this.doc.execCommand('defaultParagraphSeparator', false, separator);
	}

	createCustomClass(customClass: CustomClass) {
		let newTag = this.selectedText;
		if (customClass) {
			const tagName = customClass.tag ? customClass.tag : 'span';
			newTag = '<' + tagName + ' class="' + customClass.class + '">' + this.selectedText + '</' + tagName + '>';
		}
		this.insertHtml(newTag);
	}

	insertVideo(videoUrl: string) {
		if (videoUrl.match('www.youtube.com')) {
			this.insertYouTubeVideoTag(videoUrl);
		}
		if (videoUrl.match('vimeo.com')) {
			this.insertVimeoVideoTag(videoUrl);
		}
	}

	private insertYouTubeVideoTag(videoUrl: string): void {
		const id = videoUrl.split('v=')[1];
		const imageUrl = `https://img.youtube.com/vi/${id}/0.jpg`;
		const thumbnail = `
			<div style='position: relative'>
				<a href='${videoUrl}' target='_blank'>
					<img src="${imageUrl}" alt="click to watch"/>
					<img style='position: absolute; left:200px; top:140px'
					src="https://img.icons8.com/color/96/000000/youtube-play.png"/>
				</a>
			</div>`;
		this.insertHtml(thumbnail);
	}

	private insertVimeoVideoTag(videoUrl: string): void {
		const sub = this.http.get<any>(`https://vimeo.com/api/oembed.json?url=${videoUrl}`).subscribe((data) => {
			const imageUrl = data.thumbnail_url_with_play_button;
			const thumbnail = `<div>
				<a href='${videoUrl}' target='_blank'>
					<img src="${imageUrl}" alt="${data.title}"/>
				</a>
			</div>`;
			this.insertHtml(thumbnail);
			sub.unsubscribe();
		});
	}

	nextNode(node) {
		if (node.hasChildNodes()) {
			return node.firstChild;
		} else {
			while (node && !node.nextSibling) {
				node = node.parentNode;
			}
			if (!node) {
				return null;
			}
			return node.nextSibling;
		}
	}

	getRangeSelectedNodes(range, includePartiallySelectedContainers) {
		let node = range.startContainer;
		const endNode = range.endContainer;
		let rangeNodes = [];

		if (node === endNode) {
			rangeNodes = [node];
		} else {
			while (node && node !== endNode) {
				rangeNodes.push((node = this.nextNode(node)));
			}

			node = range.startContainer;
			while (node && node !== range.commonAncestorContainer) {
				rangeNodes.unshift(node);
				node = node.parentNode;
			}
		}

		if (includePartiallySelectedContainers) {
			node = range.commonAncestorContainer;
			while (node) {
				rangeNodes.push(node);
				node = node.parentNode;
			}
		}

		return rangeNodes;
	}

	getSelectedNodes() {
		const nodes = [];
		if (this.doc.getSelection) {
			const sel = this.doc.getSelection();
			for (let i = 0, len = sel.rangeCount; i < len; ++i) {
				// nodes.push.apply(nodes, this.getRangeSelectedNodes(sel.getRangeAt(i), true));
			}
		}
		return nodes;
	}

	replaceWithOwnChildren(el) {
		const parent = el.parentNode;
		while (el.hasChildNodes()) {
			parent.insertBefore(el.firstChild, el);
		}
		parent.removeChild(el);
	}

	removeSelectedElements(tagNames) {
		const tagNamesArray = tagNames.toLowerCase().split(',');
		this.getSelectedNodes().forEach((node) => {
			if (node.nodeType === 1 && tagNamesArray.indexOf(node.tagName.toLowerCase()) > -1) {
				this.replaceWithOwnChildren(node);
			}
		});
	}
}

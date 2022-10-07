/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, AfterContentInit, Inject, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'ril-select-option',
	templateUrl: './select-option.html',
	styleUrls: ['./select-option.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilSelectOption implements AfterContentInit {
	@Input() value: any;
	@Input() content: any;

	constructor(@Inject(ElementRef) private element: ElementRef) {
		this.value = '';
	}

	ngAfterContentInit() {
		this.content = this.element.nativeElement.innerHTML;
	}
}

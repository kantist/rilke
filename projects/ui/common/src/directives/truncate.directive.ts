/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Directive, OnInit, Input, HostBinding, OnChanges } from '@angular/core';

@Directive({
	selector: '[ril-truncate]',
})
export class RilTruncateDirective implements OnInit, OnChanges {
	@HostBinding('style.display') get getDisplay() {
		return '-webkit-box';
	}

	@HostBinding('style.-webkit-box-orient') get getOrient() {
		return 'vertical';
	}

	@HostBinding('style.overflow') get getOverflow() {
		return 'hidden';
	}

	@HostBinding('style.-webkit-line-clamp') get getRow() {
		return this.line ? this.line : 2;
	}

	@Input() line: string | number;

	ngOnInit() {}

	ngOnChanges() {}
}

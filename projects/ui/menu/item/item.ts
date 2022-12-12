/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: '[ril-menu-item], ril-menu-item',
	templateUrl: './item.html',
	styleUrls: ['./item.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilMenuItem implements OnInit {
	@Input() hr: boolean;

	constructor() {
		this.hr = false;
	}

	ngOnInit() {}
}

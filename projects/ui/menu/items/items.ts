/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: '[ril-menu-items], ril-menu-items',
	templateUrl: './items.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilMenuItems implements OnInit {
	constructor() {}

	ngOnInit() {}
}

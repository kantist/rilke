/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector:
		'ril-expansion-panel-description, ril-panel-description, [ril-expansion-panel-description], [ril-panel-description]',
	templateUrl: './expansion-panel-description.html',
	styleUrls: ['./expansion-panel-description.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilExpansionPanelDescription implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}

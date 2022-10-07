/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'ril-expansion-panel-title, ril-panel-title, [ril-expansion-panel-title], [ril-panel-title]',
	templateUrl: './expansion-panel-title.html',
	styleUrls: ['./expansion-panel-title.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilExpansionPanelTitle implements OnInit {
	constructor() {}

	ngOnInit() {}
}

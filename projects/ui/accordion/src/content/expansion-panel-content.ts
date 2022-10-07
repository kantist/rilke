/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'ril-expansion-panel-content, ril-panel-content, [ril-expansion-panel-content], [ril-panel-content]',
	templateUrl: './expansion-panel-content.html',
	styleUrls: ['./expansion-panel-content.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilExpansionPanelContent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}

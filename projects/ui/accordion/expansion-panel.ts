/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, AfterContentInit, Input, ChangeDetectionStrategy } from '@angular/core';

type RilAccordionTogglePosition = 'before' | 'after';

@Component({
	selector: 'ril-expansion-panel',
	templateUrl: './expansion-panel.html',
	styleUrls: ['./expansion-panel.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilExpansionPanel implements AfterContentInit {
	// Material
	@Input() disabled: any;
	@Input() expanded: any;
	@Input() hideToggle: boolean;
	@Input() togglePosition: RilAccordionTogglePosition;

	constructor() {
		this.disabled = false;
		this.expanded = false;
		this.hideToggle = false;
		this.togglePosition = 'after';
	}

	ngAfterContentInit() {}
}

/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'ril-progress-spinner',
	templateUrl: './progress-spinner.html',
	styleUrls: ['./progress-spinner.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilProgressSpinner implements OnInit {
	@Input() thickness: number;
	@Input() diameter: number;
	@Input() color: string;
	@Input() loadingText: string;
	@Input() mode: any;

	@HostBinding('class.ril-progress-spinner') true = true;

	constructor() {
		this.thickness = 5;
		this.diameter = 50;
		this.mode = 'indeterminate';
	}

	ngOnInit() {}
}

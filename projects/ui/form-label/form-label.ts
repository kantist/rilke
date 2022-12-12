/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';

@Component({
	selector: 'ril-form-label',
	templateUrl: './form-label.html',
	styleUrls: ['./form-label.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilFormLabel implements OnInit {
	@HostBinding('class.ril-form-label') true = true;

	constructor() {}

	ngOnInit() {}
}

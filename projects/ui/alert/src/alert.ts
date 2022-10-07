/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
	selector: 'ril-alert',
	templateUrl: './alert.html',
	styleUrls: ['./alert.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilAlert implements OnInit {
	text: string;
	type: string;
	action: string;
	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private _snackBar: MatSnackBar) {
		this.type = this.data.type || 'default';
		this.action = this.data.action;
		this.text = this.data.text;
	}

	ngOnInit() {}

	onClick() {
		this._snackBar.dismiss();
	}
}

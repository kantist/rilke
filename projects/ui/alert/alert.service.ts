/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RilAlert } from './alert';
import { IRilAlertOptions } from './alert.model';

@Injectable({ providedIn: 'any' })
export class RilAlertService {
	durationInSeconds: number;
	constructor(private _snackBar: MatSnackBar) {}

	show(config: IRilAlertOptions) {
		this._snackBar.openFromComponent(RilAlert, {
			data: config.data,
			duration: config.duration || 3000,
			horizontalPosition: config.horizontalPosition || 'center',
			verticalPosition: config.verticalPosition || 'top',
		});
	}

	close() {
		this._snackBar.dismiss();
	}
}

/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RilDialog } from './dialog';

@Injectable({ providedIn: 'any' })
export class RilDialogService {
	constructor(private dialog: MatDialog) {}

	show(config: MatDialogConfig) {
		const dialogRef = this.dialog.open(RilDialog, {
			data: config.data,
		});

		return dialogRef.componentInstance.onResults.pipe(tap((res: any) => res));
	}
}

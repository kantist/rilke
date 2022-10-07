/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { EventEmitter, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { tap } from 'rxjs/operators';
import { IRilBottomSheetOptions } from './bottom-sheet.model';

@Injectable({ providedIn: 'any' })
export class RilBottomSheetService {
	statusChange: EventEmitter<boolean>;

	constructor(private _matBottom: MatBottomSheet) {
		this.statusChange = new EventEmitter<boolean>(false);
	}

	open(config: IRilBottomSheetOptions) {
		this.statusChange.emit(true);

		this._matBottom.open(config.component, config);

		this._matBottom._openedBottomSheetRef.afterDismissed().subscribe(() => {
			this.statusChange.emit(false);
		});

		this._matBottom._openedBottomSheetRef.backdropClick().subscribe(() => {
			this.statusChange.emit(false);
		});
	}

	close() {
		this._matBottom.dismiss();
	}

	afterClose() {
		return this._matBottom._openedBottomSheetRef.afterDismissed().pipe(tap((res: any) => res));
	}
}

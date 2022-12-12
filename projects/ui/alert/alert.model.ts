/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import {
	MatSnackBarConfig,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export type TAlertTypes = 'default' | 'error' | 'warning' | 'success' | 'info';

export interface IRilAlertOptions extends MatSnackBarConfig {
	duration?: number;
	data?: {
		text: string;
		action?: string;
		type?: TAlertTypes;
	};
	horizontalPosition?: MatSnackBarHorizontalPosition;
	verticalPosition?: MatSnackBarVerticalPosition;
}

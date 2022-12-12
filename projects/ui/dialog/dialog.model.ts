/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { FormGroup } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';

export interface IRilDialogData {
	text: string;
	action: string;
	cancel: string;
	form?: FormGroup;
}

export interface IRilDialogOptions extends MatDialogConfig {
	data: IRilDialogData;
}

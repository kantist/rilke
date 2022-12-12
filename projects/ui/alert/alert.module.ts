/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { CommonModule } from '@angular/common';
import { RilCommonModule } from '@rilke/ui/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RilButtonModule } from '@rilke/ui/button';
import { RilAlert } from './alert';

@NgModule({
	imports: [CommonModule, RilCommonModule, MatSnackBarModule, RilButtonModule],
	exports: [RilAlert],
	declarations: [RilAlert],
})
export class RilAlertModule {}

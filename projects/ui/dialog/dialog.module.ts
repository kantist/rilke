/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { CommonModule } from '@angular/common';
import { RilCommonModule } from '@rilke/ui/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { RilDialog } from './dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RilInputModule } from '@rilke/ui/input';

@NgModule({
	imports: [CommonModule, RilCommonModule, MatDialogModule, RilInputModule, FormsModule, ReactiveFormsModule],
	exports: [RilDialog],
	declarations: [RilDialog],
})
export class RilDialogModule {}

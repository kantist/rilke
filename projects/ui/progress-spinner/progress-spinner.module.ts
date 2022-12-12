/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { CommonModule } from '@angular/common';
import { RilCommonModule } from '@rilke/ui/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { RilProgressSpinner } from './progress-spinner';

@NgModule({
	imports: [CommonModule, RilCommonModule, MatProgressSpinnerModule],
	exports: [RilProgressSpinner],
	declarations: [RilProgressSpinner],
})
export class RilProgressSpinnerModule {}

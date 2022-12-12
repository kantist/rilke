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
import { RilInput } from './input';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, RilCommonModule, FormsModule],
	exports: [RilInput],
	declarations: [RilInput],
})
export class RilInputModule {}

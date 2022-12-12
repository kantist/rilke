/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RilCommonModule } from '@rilke/ui/common';
import { RilButton } from './button';

@NgModule({
	imports: [CommonModule, RilCommonModule],
	exports: [RilButton],
	declarations: [RilButton],
})
export class RilButtonModule {}

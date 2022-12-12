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
import { FormsModule } from '@angular/forms';
import { RilFormDescription } from './form-description';

@NgModule({
	imports: [CommonModule, RilCommonModule, FormsModule],
	exports: [RilFormDescription],
	declarations: [RilFormDescription],
})
export class RilFormDescriptionModule {}

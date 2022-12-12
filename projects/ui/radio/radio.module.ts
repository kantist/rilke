/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { CommonModule } from '@angular/common';
import { RilCommonModule } from '@rilke/ui/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RilRadio } from './radio';
import { RilRadioOption } from './radio-option/radio-option';

@NgModule({
	imports: [CommonModule, RilCommonModule, FormsModule],
	exports: [RilRadio, RilRadioOption],
	declarations: [RilRadio, RilRadioOption],
})
export class RilRadioModule {}

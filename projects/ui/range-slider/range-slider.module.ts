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
import { MatSliderModule } from '@angular/material/slider';
import { RilRangeSlider } from './range-slider';

@NgModule({
	imports: [CommonModule, RilCommonModule, FormsModule, MatSliderModule],
	exports: [RilRangeSlider],
	declarations: [RilRangeSlider],
})
export class RilRangeSliderModule {}

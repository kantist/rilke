/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { RilCommonModule } from '@rilke/ui/common';
import { NgModule } from '@angular/core';
import { ColorChromeModule } from 'ngx-color/chrome';

import { RilColorPicker } from './color-picker';

@NgModule({
	imports: [CommonModule, RilCommonModule, FormsModule, ColorChromeModule, OverlayModule],
	exports: [RilColorPicker],
	declarations: [RilColorPicker],
})
export class RilColorPickerModule {}

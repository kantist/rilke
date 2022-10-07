/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { CommonModule } from '@angular/common';
import { RilCommonModule } from '@rilke/ui/common';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { RilMenu } from './menu';
import { RilMenuItems } from './items/items';
import { RilMenuItem } from './item/item';

@NgModule({
	imports: [CommonModule, RilCommonModule, MatMenuModule],
	exports: [RilMenu, RilMenuItems, RilMenuItem],
	declarations: [RilMenu, RilMenuItems, RilMenuItem],
})
export class RilMenuModule {}

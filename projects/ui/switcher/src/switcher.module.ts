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

import { RilSwitcher } from './switcher';

@NgModule({
	imports: [CommonModule, RilCommonModule, FormsModule],
	exports: [RilSwitcher],
	declarations: [RilSwitcher],
})
export class RilSelectModule {}

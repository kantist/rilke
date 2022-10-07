/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { CommonModule } from '@angular/common';
import { RilCommonModule } from '@rilke/ui/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RilInputModule } from '@rilke/ui/input';

import { RilSelect } from './select';
import { RilSelectOption } from './select-option/select-option';

@NgModule({
	imports: [CommonModule, RilCommonModule, FormsModule, ReactiveFormsModule, MatSelectModule, RilInputModule],
	exports: [RilSelect, RilSelectOption],
	declarations: [RilSelect, RilSelectOption],
})
export class RilSelectModule {}

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
import { RilPaginationModule } from '@rilke/ui/pagination';
import { RilCheckboxModule } from '@rilke/ui/checkbox';
import { RilList } from './list';
import { RilListItem } from './list-item/list-item';
import { RilListHeader } from './list-header/list-header';
import { RilListToolbar } from './list-toolbar/list-toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { RilButtonModule } from '@rilke/ui/button';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RilButtonModule,
		RilCommonModule,
		RilPaginationModule,
		RilCheckboxModule,
	],
	exports: [RilList, RilListItem, RilListHeader, RilListToolbar],
	declarations: [RilList, RilListItem, RilListHeader, RilListToolbar],
})
export class RilListModule {}

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
import { MatExpansionModule } from '@angular/material/expansion';
import { RilAccordion } from './accordion';
import { RilExpansionPanel } from './expansion-panel';
import { RilExpansionPanelTitle } from './title/expansion-panel-title';
import { RilExpansionPanelDescription } from './description/expansion-panel-description';
import { RilExpansionPanelContent } from './content/expansion-panel-content';

@NgModule({
	imports: [CommonModule, RilCommonModule, MatExpansionModule],
	exports: [
		RilAccordion,
		RilExpansionPanel,
		RilExpansionPanelTitle,
		RilExpansionPanelDescription,
		RilExpansionPanelContent,
	],
	declarations: [
		RilAccordion,
		RilExpansionPanel,
		RilExpansionPanelTitle,
		RilExpansionPanelDescription,
		RilExpansionPanelContent,
	],
})
export class RilExpansionModule {}

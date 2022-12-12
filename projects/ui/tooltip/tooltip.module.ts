/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip.component';
import { TooltipOptions } from './options.interface';
import { TooltipOptionsService } from './options.service';

@NgModule({
	declarations: [TooltipDirective, TooltipComponent],
	imports: [CommonModule],
	exports: [TooltipDirective],
	entryComponents: [TooltipComponent],
})
export class RilTooltipModule {
	static forRoot(initOptions: TooltipOptions): ModuleWithProviders<RilTooltipModule> {
		return {
			ngModule: RilTooltipModule,
			providers: [
				{
					provide: TooltipOptionsService,
					useValue: initOptions,
				},
			],
		};
	}
}

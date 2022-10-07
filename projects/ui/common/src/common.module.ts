/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RilStopPropagationDirective } from './directives/stop-propagation.directive';
import { RilTruncateDirective } from './directives/truncate.directive';
import { RilInitialLetterPipe } from './pipes/initial-letter.pipe';

@NgModule({
	imports: [CommonModule],
	exports: [RilInitialLetterPipe, RilStopPropagationDirective, RilTruncateDirective],
	declarations: [RilInitialLetterPipe, RilStopPropagationDirective, RilTruncateDirective],
})
export class RilCommonModule {}

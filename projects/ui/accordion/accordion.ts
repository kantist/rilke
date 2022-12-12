/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'ril-accordion',
	template: '<mat-accordion><ng-content></ng-content></mat-accordion>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilAccordion {
	constructor() {}
}

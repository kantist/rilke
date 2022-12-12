/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[ril-stop-propagation]',
})
export class RilStopPropagationDirective {
	@HostListener('click', ['$event'])
	public onClick(event: any): void {
		event.stopPropagation();
	}
}

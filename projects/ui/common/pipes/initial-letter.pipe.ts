/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'rilInitialLetter',
})
export class RilInitialLetterPipe implements PipeTransform {
	transform(fullName: string): any {
		let initialLetter = fullName
			.split(/\s+/)
			.map((n) => n[0])
			.join('');

		return initialLetter.substr(0, 3);
	}
}

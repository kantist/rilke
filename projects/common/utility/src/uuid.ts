/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

export function uuid() {
	const dateStr = Date.now().toString(36); // convert num to base 36 and stringify

	const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point

	return `${dateStr}-${randomStr}`;
}

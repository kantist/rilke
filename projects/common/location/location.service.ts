/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocationService {
	getPosition(): Promise<any> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(resp) => {
					resolve([resp.coords.latitude, resp.coords.longitude]);
				},
				(err) => {
					reject(err);
				}
			);
		});
	}
}

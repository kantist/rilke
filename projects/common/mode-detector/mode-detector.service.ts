/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ModeDetectorService {
	constructor(@Inject(PLATFORM_ID) private platformId: any) {}

	public get mode(): Observable<'dark' | 'light'> {
		let mediaQuery;
		if (isPlatformBrowser(this.platformId)) {
			mediaQuery = window.matchMedia('(prefers-color-scheme: dark)') as any;
		}

		return fromEvent(mediaQuery, 'change').pipe(
			startWith(mediaQuery),
			map((list: MediaQueryList) => (list.matches ? 'dark' : 'light'))
		);
	}
}
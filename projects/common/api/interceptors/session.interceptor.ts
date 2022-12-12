/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from '../injections';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
	constructor(@Inject(API_URL) private apiUrl: string) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap((res) => {
				const isApiUrl = request.url.startsWith(this.apiUrl);

				if (isApiUrl) {
					const date = new Date();
					localStorage.setItem('lastCall', date.toISOString());
				}
			})
		);
	}
}

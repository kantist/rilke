/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Inject, Injectable, Injector } from '@angular/core';

import { AuthService } from '@rilke/common/auth';
import { Observable } from 'rxjs';
import { API_URL } from '../injections';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(@Inject(API_URL) private apiUrl: string, private injector: Injector) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add auth header with jwt if user is logged in and request is to api url
		const token = this.injector.get(AuthService).bearerToken;
		const isApiUrl = request.url.startsWith(this.apiUrl);
		if (token && isApiUrl) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
			});
		}

		return next.handle(request);
	}
}

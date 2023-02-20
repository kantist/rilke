/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { ApiCall, IApiCall } from './api.model';
import { throwError } from 'rxjs';
import { catchError, delay, retry, tap } from 'rxjs/operators';
import { API_DELAY, API_RETRY, API_URL } from './injections';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	constructor(
		private http: HttpClient,
		@Inject(API_URL) private apiUrl?: string,
		@Inject(API_RETRY) private apiRetry?: number,
		@Inject(API_DELAY) private apiDelay?: number
	) {}

	get(apiCall: IApiCall) {
		apiCall = this.setApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.get(url, apiCall.options).pipe(
			retry(this.apiRetry),
			delay(this.apiDelay),
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	post(apiCall: IApiCall) {
		apiCall = this.setApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.post(url, apiCall.body, apiCall.options).pipe(
			retry(this.apiRetry),
			delay(this.apiDelay),
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	patch(apiCall: IApiCall) {
		apiCall = this.setApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.patch(url, apiCall.body, apiCall.options).pipe(
			retry(this.apiRetry),
			delay(this.apiDelay),
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	delete(apiCall: IApiCall) {
		apiCall = this.setApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.delete(url, apiCall.options).pipe(
			retry(this.apiRetry),
			delay(this.apiDelay),
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	options(apiCall: IApiCall) {
		apiCall = this.setApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.options(url, apiCall.options).pipe(
			retry(this.apiRetry),
			delay(this.apiDelay),
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	head(apiCall: IApiCall) {
		apiCall = this.setApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.head(url, apiCall.options).pipe(
			retry(this.apiRetry),
			delay(this.apiDelay),
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	setApiCall(apiCall: IApiCall): ApiCall {
		if (!apiCall.apiUrl) {
			apiCall.apiUrl = this.apiUrl;
		}

		return new ApiCall(apiCall);
	}

	private handleError(error: HttpErrorResponse) {
		return throwError(() => error);
	}
}

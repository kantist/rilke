/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiCall, IApiCall } from './api.model';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	constructor(private http: HttpClient) {}

	get(apiCall: IApiCall) {
		apiCall = new ApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.get(url, apiCall.options).pipe(
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	post(apiCall: IApiCall) {
		apiCall = new ApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.post(url, apiCall.body, apiCall.options).pipe(
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	patch(apiCall: IApiCall) {
		apiCall = new ApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.patch(url, apiCall.body, apiCall.options).pipe(
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	delete(apiCall: IApiCall) {
		apiCall = new ApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.delete(url, apiCall.options).pipe(
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	options(apiCall: IApiCall) {
		apiCall = new ApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.options(url, apiCall.options).pipe(
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	head(apiCall: IApiCall) {
		apiCall = new ApiCall(apiCall);

		const url = apiCall.getFullPath();

		return this.http.head(url, apiCall.options).pipe(
			tap((res: any) => res),
			catchError(this.handleError)
		);
	}

	private handleError(error: HttpErrorResponse) {
		return throwError(() => error);
	}
}

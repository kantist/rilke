/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Inject } from '@angular/core';
import { API_URL } from './injections';

export interface IApiCall {
	path: string;
	body?: any;
	options?: IApiCallOptions;
	getFullPath?(): string;
}

export interface IApiCallOptions {
	headers?: any;
	params?: any;
	body?: any;
}

export class ApiCall implements IApiCall {
	path: string;
	body?: any;
	options?: IApiCallOptions;

	constructor(apiCall: IApiCall, @Inject(API_URL) private apiUrl?: string) {
		this.path = apiCall.path;
		this.body = apiCall.body;
		this.options = apiCall.options;
	}

	getFullPath(): string {
		return this.apiUrl + this.path;
	}
}

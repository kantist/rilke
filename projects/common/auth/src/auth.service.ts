/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private authToken: BehaviorSubject<string>;
	public token: Observable<string>;

	constructor() {
		this.authToken = new BehaviorSubject<string>(localStorage.getItem('bearer_token'));
		this.token = this.authToken.asObservable();
	}

	public get bearerToken(): string {
		return this.authToken.value;
	}

	setBearerToken(token: string) {
		localStorage.setItem('bearer_token', token);
		this.authToken.next(token);
	}

	logout() {
		localStorage.removeItem('bearer_token');
		localStorage.removeItem('lastCall');
		this.authToken.next(null);
	}
}

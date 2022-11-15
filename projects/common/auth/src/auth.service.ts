/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TOKEN_KEY } from './injections';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private authToken: BehaviorSubject<string>;
	public token: Observable<string>;

	constructor(@Optional() @Inject(TOKEN_KEY) private token_key: string = 'bearerToken') {
		this.authToken = new BehaviorSubject<string>(localStorage.getItem(token_key));
		this.token = this.authToken.asObservable();
	}

	public get bearerToken(): string {
		return this.authToken.value;
	}

	setBearerToken(token: string) {
		localStorage.setItem(this.token_key, token);
		this.authToken.next(token);
	}

	logout() {
		localStorage.removeItem(this.token_key);
		localStorage.removeItem('lastCall');
		this.authToken.next(null);
	}
}

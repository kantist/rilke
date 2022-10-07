/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AuthService],
		});
	});

	it('should be created', inject([AuthService], (service: AuthService) => {
		expect(service).toBeTruthy();
	}));
});

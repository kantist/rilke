/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ApiService],
		});
	});

	it('should be created', inject([ApiService], (service: ApiService) => {
		expect(service).toBeTruthy();
	}));
});

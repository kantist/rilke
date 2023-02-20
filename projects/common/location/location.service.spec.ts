/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { TestBed, inject } from '@angular/core/testing';

import { LocationService } from './location.service';

describe('LocationService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LocationService],
		});
	});

	it('should be created', inject([LocationService], (service: LocationService) => {
		expect(service).toBeTruthy();
	}));
});

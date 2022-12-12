/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { TestBed } from '@angular/core/testing';

import { SeoService } from './seo.service';

describe('SeoService', () => {
	let service: SeoService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SeoService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

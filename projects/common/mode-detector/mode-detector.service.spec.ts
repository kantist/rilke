/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { TestBed, inject } from '@angular/core/testing';

import { ModeDetectorService } from './mode-detector.service';

describe('ModeDetectorService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ModeDetectorService],
		});
	});

	it('should be created', inject([ModeDetectorService], (service: ModeDetectorService) => {
		expect(service).toBeTruthy();
	}));
});

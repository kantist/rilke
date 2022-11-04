/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RIL_LANGUAGE } from '../injections';

@Injectable({ providedIn: 'any' })
export class RilValidationService {
	constructor(@Inject(RIL_LANGUAGE) private lang) {}

	public getValidatorErrorMessage(validatorName: string, validatorValue?: any, exampleValue?: string) {
		let config = {
			required: this.lang.error.required,
			email: this.lang.error.email,
			pattern: this.lang.error.pattern,
			min: this.lang.error.min_number + validatorValue.min,
			max: this.lang.error.max_number + validatorValue.max,
			minlength: this.lang.error.please_min + validatorValue.requiredLength + this.lang.error.char_enter,
			maxlength: this.lang.error.please_max + validatorValue.requiredLength + this.lang.error.char_enter,
		};

		if (exampleValue && validatorName == 'pattern') {
			config[validatorName] += ' ' + this.lang.common.example + ' ' + exampleValue;
		}

		return config[validatorName];
	}

	public markFormGroupTouched(formGroup: FormGroup) {
		(Object as any).values(formGroup.controls).forEach((control) => {
			control.markAsTouched();

			if (control.controls) {
				this.markFormGroupTouched(control);
			}
		});
	}
}

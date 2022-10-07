/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RilValidationService } from '@rilke/ui/common';

@Component({
	selector: 'ril-form-description',
	templateUrl: './form-description.html',
	styleUrls: ['./form-description.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilFormDescription {
	_errorMessage: string;

	@HostBinding('class.ril-form-description') class() {
		return true;
	}

	@Input() control: FormControl;
	@Input() example: string;
	@Input() exception: string;

	constructor(private validator: RilValidationService) {}

	get errorMessage(): string {
		if (!this.control) {
			return null;
		}

		for (let propertyName in this.control.errors) {
			if (this.control.errors.hasOwnProperty(propertyName) && (!this.control.pristine || this.control.touched)) {
				return this.validator.getValidatorErrorMessage(
					propertyName,
					this.control.errors[propertyName],
					this.example
				);
			}
		}

		if (!this.control.invalid && this.exception) {
			return this.exception;
		}

		return null;
	}
}

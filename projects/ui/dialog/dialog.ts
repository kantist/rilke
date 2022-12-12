/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Inject,
	OnInit,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IRilDialogData } from './dialog.model';

@Component({
	selector: 'ril-dialog',
	templateUrl: './dialog.html',
	styleUrls: ['./dialog.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.Emulated,
})
export class RilDialog implements OnInit {
	onResults: Observable<boolean>;
	@Output() onResult: EventEmitter<any>;
	form: FormGroup;

	formArray: any[];

	constructor(@Inject(MAT_DIALOG_DATA) public data: IRilDialogData, private dialogRef: MatDialogRef<any>) {
		this.onResult = new EventEmitter<boolean>(null);
		this.onResults = this.onResult.asObservable();
	}

	ngOnInit() {
		if (this.data.form) {
			this.formArray = Object.entries(this.data.form.controls);
		}
	}

	onCancel() {
		this.onResult.emit(false);
		this.dialogRef.close();
	}

	onAction() {
		if (this.data.form) {
			this.onResult.emit(this.data.form);
		} else {
			this.onResult.emit(true);
		}
		this.dialogRef.close();
	}
}

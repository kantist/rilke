/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, OnInit, Input, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RilList } from '../list';

@Component({
	selector: 'ril-list-header',
	templateUrl: './list-header.html',
	styleUrls: ['./list-header.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilListHeader implements OnInit {
	@Input() checkbox: boolean;

	unchecking: boolean;

	listCheck = new FormControl(false);

	constructor(@Inject(RilList) public list: RilList) {
		this.list.listToolbar.allSelected.subscribe((res) => {
			if (!res) {
				this.onClear();
			}
		});
	}

	itemOption: boolean;

	ngOnInit() {
		this.listCheck.valueChanges.subscribe((res) => {
			if (!this.unchecking) {
				if (res) {
					this.list.listToolbar.selectAll();
				} else {
					this.list.listToolbar.removeAll();
				}
			}
		});
	}

	onClear(): void {
		this.unchecking = true;
		this.listCheck.setValue(false);
		this.unchecking = false;
	}
}

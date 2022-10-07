/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, OnInit, OnDestroy, Input, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RilList } from '../list';

@Component({
	selector: 'ril-list-item',
	templateUrl: './list-item.html',
	styleUrls: ['./list-item.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilListItem implements OnInit, OnDestroy {
	@Input() checkbox: boolean;
	@Input() itemIndex: number;

	unchecking: boolean;

	listCheck = new FormControl(false);

	constructor(@Inject(RilList) public list: RilList) {
		this.list.listToolbar.allSelected.subscribe((res) => {
			if (res) {
				this.onSelect();
			} else {
				this.onClear();
			}
		});
	}

	ngOnInit() {
		this.listCheck.valueChanges.subscribe((res) => {
			if (!this.unchecking) {
				if (res == true) {
					this.list.listToolbar.addToSelectedList(this.itemIndex, res);
				} else {
					this.list.listToolbar.removeFromSelectedlist(this.itemIndex);
				}
			}
		});
	}

	onSelect(): void {
		this.listCheck.setValue(true);
	}

	onClear(): void {
		this.unchecking = true;
		this.listCheck.setValue(false);
		this.unchecking = false;
	}

	ngOnDestroy() {}
}

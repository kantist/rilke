/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, OnInit, Input, EventEmitter, Output, Inject, ChangeDetectionStrategy } from '@angular/core';
import { IRilListToolbarOptions } from '../list-toolbar.model';
import { RIL_LANGUAGE } from '@rilke/ui/common';

@Component({
	selector: 'ril-list-toolbar',
	templateUrl: './list-toolbar.html',
	styleUrls: ['./list-toolbar.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilListToolbar implements OnInit {
	@Input() options: IRilListToolbarOptions;
	@Output() close: EventEmitter<boolean>;
	@Output() onToolbarButtonClick: EventEmitter<string>;

	constructor(@Inject(RIL_LANGUAGE) public lang) {
		this.close = new EventEmitter();

		this.onToolbarButtonClick = new EventEmitter<string>();
	}

	ngOnInit() {}

	closeWindow(val) {
		this.close.emit(true);
	}

	clickButton(button) {
		this.onToolbarButtonClick.emit(button);
	}
}

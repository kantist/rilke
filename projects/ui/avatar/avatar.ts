/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
	selector: 'ril-avatar',
	templateUrl: './avatar.html',
	styleUrls: ['./avatar.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilAvatar implements OnInit {
	@HostBinding('class.ril-avatar') true = true;
	@Input() src: string;
	@Input() icon: string;
	@Input() initial: string;
	@Input() size: number;
	@Input() alt: string;
	@HostBinding('class.selectable') @Input() selectable: boolean;
	@HostBinding('style.height') get height() {
		return `${this.size}rem`;
	}
	@HostBinding('style.width') get width() {
		return `${this.size}rem`;
	}
	@HostBinding('style.fontSize') get fontSize() {
		return `${this.size / 2}rem`;
	}

	constructor() {
		this.size = 3;
		this.src = '';
		this.icon = '';
		this.selectable = false;
		this.alt = '';
	}

	ngOnInit() {}
}

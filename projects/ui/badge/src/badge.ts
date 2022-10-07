/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, OnInit, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'ril-badge',
	templateUrl: './badge.html',
	styleUrls: ['./badge.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilBadge implements OnInit {
	@HostBinding('class.ril-badge') true = true;

	// Sizes
	@HostBinding('class.badge-xs') get xs() {
		return this.size === 'xs';
	}
	@HostBinding('class.badge-sm') get sm() {
		return this.size === 'sm';
	}
	@HostBinding('class.badge-md') get md() {
		return this.size === 'md';
	}
	@HostBinding('class.badge-lg') get lg() {
		return this.size === 'lg';
	}
	@HostBinding('class.badge-xl') get xl() {
		return this.size === 'xl';
	}

	// Colors
	@HostBinding('class.badge-accent') get viewAccent() {
		return this.view === 'accent';
	}
	@HostBinding('class.badge-success') get viewSuccess() {
		return this.view === 'success';
	}
	@HostBinding('class.badge-warning') get viewWarning() {
		return this.view === 'warning';
	}
	@HostBinding('class.badge-error') get viewError() {
		return this.view === 'error';
	}
	@HostBinding('class.badge-info') get viewInfo() {
		return this.view === 'info';
	}
	@HostBinding('class.badge-light') get viewLight() {
		return this.view === 'light';
	}
	@HostBinding('class.badge-dark') get viewDark() {
		return this.view === 'dark';
	}

	@HostBinding('class.thin') get weightExtraThin() {
		return this.weight === 'extra-thin';
	}
	@HostBinding('class.thin') get weightThin() {
		return this.weight === 'thin';
	}
	@HostBinding('class.bold') get weightBold() {
		return this.weight === 'bold';
	}
	@HostBinding('class.heavy-bold') get weightHeavyBold() {
		return this.weight === 'heavy-bold';
	}

	@Input() view: string;
	@Input() weight: string;
	@Input() size: string;

	constructor() {
		this.view = 'accent';
		this.size = 'md';
	}

	ngOnInit() {}
}

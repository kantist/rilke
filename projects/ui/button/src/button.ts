/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: '[ril-button], [ril-btn]',
	templateUrl: './button.html',
	styleUrls: ['./button.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilButton implements OnInit {
	@Input() align: string;
	@Input() size: string;
	@Input() view: string;
	@Input() tcLineStyle: string;
	@Input() beforeIcon: string;
	@Input() afterIcon: string;

	@HostBinding('class.ril-btn') true = true;
	@HostBinding('class.btn-disabled') @Input() disabled: boolean;
	@HostBinding('class.btn-load') @Input() load: boolean;

	// Direction
	@HostBinding('class.btn-left') get alignLeft() {
		return this.align === 'left';
	}
	@HostBinding('class.btn-right') get alignRight() {
		return this.align === 'right';
	}

	// Sizes
	@HostBinding('class.btn-xs') get xs() {
		return this.size === 'xs';
	}
	@HostBinding('class.btn-sm') get sm() {
		return this.size === 'sm';
	}
	@HostBinding('class.btn-md') get md() {
		return this.size === 'md';
	}
	@HostBinding('class.btn-lg') get lg() {
		return this.size === 'lg';
	}
	@HostBinding('class.btn-xl') get xl() {
		return this.size === 'xl';
	}

	// Colors
	@HostBinding('class.btn-accent') get viewAccent() {
		return this.view === 'accent';
	}
	@HostBinding('class.btn-success') get viewSuccess() {
		return this.view === 'success';
	}
	@HostBinding('class.btn-warning') get viewWarning() {
		return this.view === 'warning';
	}
	@HostBinding('class.btn-error') get viewError() {
		return this.view === 'error';
	}
	@HostBinding('class.btn-info') get viewInfo() {
		return this.view === 'info';
	}
	@HostBinding('class.btn-light') get viewLight() {
		return this.view === 'light';
	}

	@HostBinding('class.btn-outline') @Input() outline: boolean;
	@HostBinding('class.btn-shadow') @Input() shadow: boolean;

	constructor() {
		this.disabled = false;
		this.load = false;
		this.outline = false;
		this.shadow = false;
		this.align = 'center';
		this.size = 'md';
		this.view = 'accent';
	}

	ngOnInit() {}
}

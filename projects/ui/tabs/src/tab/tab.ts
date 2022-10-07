/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { isPlatformBrowser } from '@angular/common';
import { Component, Input, HostBinding, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'ril-tab',
	templateUrl: './tab.html',
	styleUrls: ['./tab.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilTab implements OnInit {
	@HostBinding('class.tab-panel') tab = true;
	@HostBinding('class.fade') fade = true;
	@HostBinding('class.active') @Input() active: boolean;

	constructor(@Inject(PLATFORM_ID) public platformId: any) {}

	@Input('title') title: string;
	@Input('rounded') rounded: boolean;
	@Input('icon') icon: string;
	@Input('link') link: string;
	@Input('fullMatch') fullMatch: boolean;

	ngOnInit() {
		if (isPlatformBrowser(this.platformId)) {
			if (this.fullMatch && window.location.pathname == this.link) {
				this.active = true;
			} else if (!this.fullMatch && window.location.pathname.startsWith(this.link)) {
				this.active = true;
			}
		}
	}
}

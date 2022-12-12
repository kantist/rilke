/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Component, ContentChildren, QueryList, Input, AfterContentInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { RilTab } from './tab/tab';

@Component({
	selector: 'ril-tabs',
	templateUrl: './tabs.html',
	styleUrls: ['./tabs.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilTabs implements AfterContentInit {
	@ContentChildren(RilTab) tabs: QueryList<RilTab>;

	@Input() scrollable: boolean;
	@Input() icon: string;
	currentIndex: number;

	@Input() index: number;

	constructor(private router: Router) {
		this.scrollable = false;
	}

	ngAfterContentInit() {
		let activeTabs = this.tabs.filter((tab) => tab.active);

		if (this.index) {
			this.selectTab(this.tabs[this.index]);
		} else if (activeTabs.length === 0) {
			this.selectTab(this.tabs.first);
		} else {
			this.tabs.toArray().forEach((tab, index) => {
				if (tab.active) {
					this.currentIndex = index;
				}
			});
		}
	}

	selectTab(selected_tab) {
		this.tabs.toArray().forEach((tab, index) => {
			tab.active = false;

			if (selected_tab == tab) {
				this.currentIndex = index;
			}
		});

		selected_tab.active = true;
	}

	setIndex(i) {
		this.selectTab(this.tabs.toArray()[i]);
	}

	onClick(selected_tab) {
		if (selected_tab.link) {
			this.router.navigate([selected_tab.link]);
		}
	}
}

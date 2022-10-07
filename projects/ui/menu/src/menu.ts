/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import {
	Component,
	OnInit,
	Input,
	HostListener,
	ViewChild,
	ChangeDetectionStrategy,
	ViewEncapsulation,
} from '@angular/core';

import { MatMenuTrigger } from '@angular/material/menu';

type MenuPositionX = 'before' | 'after';

@Component({
	selector: 'ril-menu',
	templateUrl: './menu.html',
	styleUrls: ['./menu.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.Emulated,
})
export class RilMenu implements OnInit {
	@Input() xPosition: MenuPositionX;
	@Input() menuClass: string;
	@Input() hasBackdrop: boolean;

	@ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

	@HostListener('click', ['$event'])
	toggleSelect() {
		this.menuTrigger.toggleMenu();
	}

	constructor() {
		this.xPosition = 'after';
		this.menuClass = '';
		this.hasBackdrop = true;
	}

	ngOnInit() {}
}

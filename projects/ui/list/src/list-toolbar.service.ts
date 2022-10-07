/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, EventEmitter, Injectable, Output } from '@angular/core';
import { IRilListToolbarOptions } from './list-toolbar.model';
import { RilListToolbar } from './list-toolbar/list-toolbar';

@Injectable()
export class RilListToolbarService {
	componentRef: ComponentRef<any>;
	overlayRef: OverlayRef;

	selectedList: any[];
	toolbarOptions: IRilListToolbarOptions;

	isOpen: boolean;

	@Output() allSelected: EventEmitter<boolean>;
	@Output() onToolbarButtonClick: EventEmitter<string>;

	constructor(private overlay: Overlay) {
		this.selectedList = [];
		this.isOpen = false;

		this.allSelected = new EventEmitter<boolean>();
		this.onToolbarButtonClick = new EventEmitter<string>();
	}

	setOptions(options: IRilListToolbarOptions) {
		if (!options) {
			options = {
				selected: 0,
				text_selected: 'selected',
			};
		}

		options.selected = 0;

		this.toolbarOptions = options;
	}

	open() {
		let options: OverlayConfig = {
			panelClass: 'list-toolbar-panel',
			hasBackdrop: false,
		};

		this.overlayRef = this.overlay.create(options);
		this.overlayRef.hostElement.classList.add('list-toolbar-overlay-wrapper');
		const modalPortal = new ComponentPortal(RilListToolbar);
		this.componentRef = this.overlayRef.attach(modalPortal);

		this.componentRef.instance.options = this.toolbarOptions;

		// subscribe @Output close event
		this.componentRef.instance.close.subscribe((data) => {
			this.close();
		});
		this.componentRef.instance.onToolbarButtonClick.subscribe((button) => {
			this.toolbarButtonClick(button);
		});

		this.isOpen = true;
	}

	close() {
		if (this.overlayRef) {
			this.overlayRef.dispose();
		}
		this.isOpen = false;

		this.selectedList = [];
		this.allSelected.emit(false);
	}

	get selectedListQuantity() {
		return this.selectedList.length;
	}

	setSelected() {
		this.toolbarOptions.selected = this.selectedListQuantity;
	}

	addToSelectedList(index: number, value: boolean) {
		this.selectedList.push(index);

		this.setSelected();

		if (!this.isOpen) this.open();
	}

	removeFromSelectedlist(index: number) {
		this.selectedList.splice(this.selectedList.indexOf(index), 1);

		this.setSelected();

		if (this.selectedList.length == 0) this.close();
	}

	selectAll() {
		this.allSelected.emit(true);
	}

	removeAll() {
		this.selectedList = [];
		this.close();
	}

	toolbarButtonClick(button: string) {
		this.onToolbarButtonClick.emit(button);
		this.close();
	}
}

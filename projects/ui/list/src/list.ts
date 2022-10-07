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
	OnChanges,
	AfterViewInit,
	Input,
	Output,
	EventEmitter,
	ElementRef,
	ChangeDetectorRef,
	ViewChild,
	HostBinding,
	ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRilListToolbarOptions } from './list-toolbar.model';
import { RilListToolbarService } from './list-toolbar.service';

@Component({
	selector: 'ril-list',
	templateUrl: './list.html',
	styleUrls: ['./list.scss'],
	providers: [RilListToolbarService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilList implements OnInit, OnChanges, AfterViewInit {
	@ViewChild('refHeader') refHeader: ElementRef<any>;
	@ViewChild('refItem') refItem: ElementRef<any>;

	@Input() checkbox: boolean;

	// List Toolbar
	@Input() listToolbarOptions: IRilListToolbarOptions;
	@Output() onToolbarButtonClick: EventEmitter<any>;

	// Pagination Inputs
	@Input() pageRouter: boolean;
	@Input() dataLength: number;
	@Input() page: number;
	@Input() itemsPerPage: number;
	@Output() pageChange: EventEmitter<number>;

	@HostBinding('class.loaded') @Input() loaded: boolean;

	pagesCount: number;

	listHeader: boolean;
	listItem: boolean;

	constructor(
		private route: ActivatedRoute,
		private cdr: ChangeDetectorRef,
		public listToolbar: RilListToolbarService
	) {
		this.checkbox = false;

		// List Toolbar
		this.onToolbarButtonClick = new EventEmitter<any>();

		// Pagination
		this.pageChange = new EventEmitter<number>();
		this.pageRouter = true;
		this.itemsPerPage = 25;
		this.dataLength = 0;
		this.page = 1;
	}

	ngOnInit() {
		// Pagination
		if (this.pageRouter) {
			this.route.queryParams.subscribe((x) => {
				this.listToolbar.close();
				this.page = x.page || 1;
			});
		}

		this.calcPagesCount(this.dataLength, this.itemsPerPage);

		this.listToolbar.setOptions(this.listToolbarOptions);

		this.toolbarButtonClickListener();
	}

	ngAfterViewInit() {
		if (this.refHeader.nativeElement.innerHTML.trim()) {
			this.listHeader = true;
		}
		if (this.refItem.nativeElement.innerHTML.trim()) {
			this.listItem = true;
		}
		this.cdr.detectChanges();
	}

	toolbarButtonClickListener() {
		this.listToolbar.onToolbarButtonClick.subscribe((button) => {
			this.onToolbarButtonClick.emit({
				button: button,
				items: this.listToolbar.selectedList,
			});
		});
	}

	/* PAGINATION FUNCTIONS */
	calcPagesCount(length: number, perPage: number) {
		this.pagesCount = Math.ceil(length / perPage);
	}

	ngOnChanges() {
		this.calcPagesCount(this.dataLength, this.itemsPerPage);
	}

	pageListener(page) {
		this.pageChange.emit(page);
	}

	public get skeletonRows() {
		return Array(this.itemsPerPage);
	}
}

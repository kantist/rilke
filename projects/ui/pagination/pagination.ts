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
	HostBinding,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	Inject,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	AfterViewChecked,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RIL_LANGUAGE } from '@rilke/ui/common';

@Component({
	selector: 'ril-pagination',
	templateUrl: './pagination.html',
	styleUrls: ['./pagination.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RilPagination implements OnInit, OnChanges, AfterViewChecked {
	@HostBinding('class.ril-pagination') true = true;

	@Input() pageRouter: boolean;
	@Input() pagesNumber: number;
	@Input() skipLocationChange: boolean;
	@Input() pageNum: number;

	@Input() firstText: string;
	@Input() lastText: string;

	@Output() pageChange: EventEmitter<number>;

	pages: Array<number>;
	dynamicPages: Array<number>;

	constructor(
		@Inject(RIL_LANGUAGE) public lang,
		private router: Router,
		private route: ActivatedRoute,
		private cdr: ChangeDetectorRef
	) {
		this.pagesNumber = 1;
		this.pageNum = 1;
		this.skipLocationChange = false;

		this.pageRouter = false;

		this.pageChange = new EventEmitter<number>();

		this.firstText = this.lang.pagination.first;
		this.lastText = this.lang.pagination.last;
	}

	ngOnInit() {
		this.setPages();
	}

	setPages() {
		this.pages = Array.from(Array(this.pagesNumber), (x, i) => i + 1);
	}

	public changePage(page: number) {
		this.pageNum = page;

		if (page >= 4) {
			this.dynamicPages = this.pages.slice(page - 3, page + 2);
		} else {
			this.dynamicPages = this.pages.slice(0, 5);
		}

		this.goPage();
	}

	public lastPage() {
		this.pageNum = this.getLast();
		this.goPage();
		this.dynamicPages = this.pages.slice(this.getLast() - 3, this.getLast());
	}

	public firstPage() {
		this.pageNum = 1;
		this.goPage();
		this.dynamicPages = this.pages.slice(0, 5);
	}

	goPage() {
		if (this.pageRouter) {
			this.router.navigate(['.'], {
				relativeTo: this.route,
				queryParamsHandling: 'merge',
				queryParams: { page: this.pageNum },
				skipLocationChange: this.skipLocationChange,
			});
		} else {
			this.pageChange.emit(this.pageNum);
		}
	}

	ngOnChanges() {
		this.setPages();
		this.changePage(this.pageNum);
	}

	ngAfterViewChecked() {
		this.cdr.detectChanges();
	}

	getLast(): number {
		return this.pages[this.pages.length - 1];
	}
}

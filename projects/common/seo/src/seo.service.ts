/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root',
})
export class SeoService {
	private suffix = '| Kant';

	constructor(private title: Title, private meta: Meta) {}

	updateTitle(title: string, suffix = this.suffix) {
		if (suffix) {
			title = title + ' ' + suffix;
		}

		this.title.setTitle(title);

		this.updateMetaByProperty('og:title', title);
		this.updateMeta('twitter:title', title);
	}

	updateSuffix(suffix: string) {
		this.suffix = suffix;
	}

	updateDescription(description: string) {
		this.updateMeta('description', description);
		this.updateMetaByProperty('og:description', description);
		this.updateMeta('twitter:description', description);
	}

	updateMeta(name: string, content: string) {
		this.meta.updateTag({ name, content });
	}

	updateMetaByProperty(property: string, content: string) {
		this.meta.updateTag({ property: property, content: content });
	}
}

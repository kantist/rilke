/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { TemplateRef, Type } from '@angular/core';

export interface IRilListToolbarOptions {
	selected?: number;
	text_selected?: Tpl;
	buttons?: IRilListToolbarButtons[];
}

export interface IRilListToolbarButtons {
	name: string;
	text: string;
	icon?: string;
	class: string;
}

type Tpl = string | TemplateRef<any> | Type<any>;
export type Content<T> = string | TemplateRef<T> | Type<T>;

/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { CommonModule } from '@angular/common';
import { RilCommonModule } from '@rilke/ui/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RilDialogModule } from '@rilke/ui/dialog';
import { RilButtonModule } from '@rilke/ui/button';
import { RilSelectModule } from '@rilke/ui/select';
import { RilColorPickerModule } from '@rilke/ui/color-picker';

import { RilRichText } from './rich-text';
import { RilEditorToolbar } from './editor-toolbar/editor-toolbar';

@NgModule({
	imports: [
		CommonModule,
		RilCommonModule,
		FormsModule,
		RilDialogModule,
		RilButtonModule,
		RilSelectModule,
		RilColorPickerModule,
	],
	exports: [RilRichText, RilEditorToolbar],
	declarations: [RilRichText, RilEditorToolbar],
})
export class RilRichTextModule {}

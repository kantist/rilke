/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { CommonModule } from '@angular/common';
import { RilCommonModule } from '@rilke/ui/common';
import { NgModule } from '@angular/core';
import { RilSelectModule } from '@rilke/ui/select';
import { RilInputModule } from '@rilke/ui/input';
import { RilFormDescriptionModule } from '@rilke/ui/form-description';
import { RilFormLabelModule } from '@rilke/ui/form-label';
import { RilRadioModule } from '@rilke/ui/radio';
import { RilTextAreaModule } from '@rilke/ui/text-area';
import { RilCheckboxModule } from '@rilke/ui/checkbox';
import { RilFileModule } from '@rilke/ui/file';
import { RilDatePickerModule } from '@rilke/ui/datepicker';
import { RilCalendarModule } from '@rilke/ui/calendar';
import { RilColorPickerModule } from '@rilke/ui/color-picker';
import { RilRangeSliderModule } from '@rilke/ui/range-slider';
import { RilRichTextModule } from '@rilke/ui/rich-text';
import { RilFormGroupModule } from '@rilke/ui/form-group';

@NgModule({
	imports: [
		CommonModule,
		RilCommonModule,
		RilSelectModule,
		RilInputModule,
		RilRadioModule,
		RilTextAreaModule,
		RilCheckboxModule,
		RilDatePickerModule,
		RilCalendarModule,
		RilColorPickerModule,
		RilRangeSliderModule,
		RilRichTextModule,
		RilFileModule,
		RilFormGroupModule,
		RilFormDescriptionModule,
		RilFormLabelModule,
	],
	exports: [
		RilSelectModule,
		RilInputModule,
		RilRadioModule,
		RilTextAreaModule,
		RilCheckboxModule,
		RilDatePickerModule,
		RilCalendarModule,
		RilColorPickerModule,
		RilRangeSliderModule,
		RilRichTextModule,
		RilFileModule,
		RilFormGroupModule,
		RilFormDescriptionModule,
		RilFormLabelModule,
	],
	declarations: [],
})
export class RilFormModule {}

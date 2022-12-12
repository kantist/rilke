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
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RilCalendar } from './calendar';

@NgModule({
	imports: [CommonModule, RilCommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule],
	exports: [RilCalendar],
	declarations: [RilCalendar],
})
export class RilCalendarModule {}

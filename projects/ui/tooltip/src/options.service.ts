/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { InjectionToken } from '@angular/core';
import { TooltipOptions } from './options.interface';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionToken used to import the config (initOptions) object, provided from the outside
 */
export const TooltipOptionsService = new InjectionToken<TooltipOptions>('TooltipOptions');

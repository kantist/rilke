/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { InjectionToken } from '@angular/core';

export const API_URL: InjectionToken<string> = new InjectionToken(null);
export const API_RETRY: InjectionToken<number> = new InjectionToken('3');
export const API_DELAY: InjectionToken<number> = new InjectionToken('500');

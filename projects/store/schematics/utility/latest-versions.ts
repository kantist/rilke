/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

export const latestVersions: Record<string, string> & {
	RilkeStore: string;
	Ngrx: string;
} = {
	RilkeStore: '' + require('../../package.json')['version'],
	Ngrx: '~15.3.0',
};
/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

export interface Schema {
	/** Name of the project. */
	project: string;
	/**
	 * Skip installing dependency packages.
	 */
	skipInstall?: boolean;
}
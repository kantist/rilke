"use strict";
/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.latestVersions = void 0;
exports.latestVersions = {
    // We could have used TypeScripts' `resolveJsonModule` to make the `latestVersion` object typesafe,
    // but ts_library doesn't support JSON inputs.
    ...require('./latest-versions/package.json')['dependencies'],
    Rilke: '' + require('../../package.json')['version'],
};

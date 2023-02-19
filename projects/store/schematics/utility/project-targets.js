"use strict";
/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.targetBuildNotFoundError = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function targetBuildNotFoundError() {
    return new schematics_1.SchematicsException(`Project target "build" not found.`);
}
exports.targetBuildNotFoundError = targetBuildNotFoundError;

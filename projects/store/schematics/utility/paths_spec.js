"use strict";
/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("./paths");
describe('paths', () => {
    describe('relativePathToWorkspaceRoot', () => {
        it(`should handle root '/'`, () => {
            const result = (0, paths_1.relativePathToWorkspaceRoot)('/');
            expect(result).toBe('.');
        });
        it(`should handle an empty path`, () => {
            const result = (0, paths_1.relativePathToWorkspaceRoot)('');
            expect(result).toBe('.');
        });
        it(`should handle an undefined path`, () => {
            const result = (0, paths_1.relativePathToWorkspaceRoot)(undefined);
            expect(result).toBe('.');
        });
        it(`should handle path with trailing '/'`, () => {
            const result = (0, paths_1.relativePathToWorkspaceRoot)('foo/bar/');
            expect(result).toBe('../..');
        });
        it(`should handle path without trailing '/'`, () => {
            const result = (0, paths_1.relativePathToWorkspaceRoot)('foo/bar');
            expect(result).toBe('../..');
        });
    });
});

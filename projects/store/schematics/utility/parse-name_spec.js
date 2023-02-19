"use strict";
/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const parse_name_1 = require("./parse-name");
describe('parse-name', () => {
    it('should handle just the name', () => {
        const result = (0, parse_name_1.parseName)('src/app', 'foo');
        expect(result.name).toEqual('foo');
        expect(result.path).toEqual('/src/app');
    });
    it('should handle no path', () => {
        const result = (0, parse_name_1.parseName)('', 'foo');
        expect(result.name).toEqual('foo');
        expect(result.path).toEqual('/');
    });
    it('should handle name has a path (sub-dir)', () => {
        const result = (0, parse_name_1.parseName)('src/app', 'bar/foo');
        expect(result.name).toEqual('foo');
        expect(result.path).toEqual('/src/app/bar');
    });
    it('should handle name has a higher path', () => {
        const result = (0, parse_name_1.parseName)('src/app', '../foo');
        expect(result.name).toEqual('foo');
        expect(result.path).toEqual('/src');
    });
    it('should handle name has a higher path above root', () => {
        expect(() => (0, parse_name_1.parseName)('src/app', '../../../foo')).toThrow();
    });
    it('should handle Windows paths', () => {
        const result = (0, parse_name_1.parseName)('', 'foo\\bar\\baz');
        expect(result.name).toEqual('baz');
        expect(result.path).toEqual('/foo/bar');
    });
});

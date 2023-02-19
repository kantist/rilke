"use strict";
/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("./workspace");
const TEST_WORKSPACE_CONTENT = JSON.stringify({
    version: 1,
    projects: {
        test: {
            root: '',
        },
    },
});
async function testRule(rule, tree) {
    await (0, schematics_1.callRule)(rule, tree, {}).toPromise();
}
describe('readWorkspace', () => {
    it('reads a workspace using the default path value', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/angular.json', TEST_WORKSPACE_CONTENT);
        const workspace = await (0, workspace_1.getWorkspace)(tree);
        expect(workspace.projects.has('test')).toBeTrue();
    });
    it('reads a workspace when specifying a directory path', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/xyz/angular.json', TEST_WORKSPACE_CONTENT);
        const workspace = await (0, workspace_1.getWorkspace)(tree, '/xyz/');
        expect(workspace.projects.has('test')).toBeTrue();
    });
    it('reads a workspace when specifying a file path', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/xyz/angular.json', TEST_WORKSPACE_CONTENT);
        const workspace = await (0, workspace_1.getWorkspace)(tree, '/xyz/angular.json');
        expect(workspace.projects.has('test')).toBeTrue();
    });
    it('throws if workspace file does not exist when using the default path value', async () => {
        const tree = new schematics_1.EmptyTree();
        await expectAsync((0, workspace_1.getWorkspace)(tree)).toBeRejectedWithError();
    });
    it('throws if workspace file does not exist when specifying a file path', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/angular.json', TEST_WORKSPACE_CONTENT);
        await expectAsync((0, workspace_1.getWorkspace)(tree, 'abc.json')).toBeRejectedWithError();
    });
});
describe('writeWorkspace', () => {
    it('writes a workspace using the default path value', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/angular.json', TEST_WORKSPACE_CONTENT);
        const workspace = await (0, workspace_1.getWorkspace)(tree);
        workspace.extensions['x-abc'] = 1;
        await (0, workspace_1.writeWorkspace)(tree, workspace);
        expect(tree.readJson('/angular.json')).toEqual(jasmine.objectContaining({ 'x-abc': 1 }));
    });
    it('writes a workspace when specifying a path', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/angular.json', TEST_WORKSPACE_CONTENT);
        const workspace = await (0, workspace_1.getWorkspace)(tree);
        workspace.extensions['x-abc'] = 1;
        await (0, workspace_1.writeWorkspace)(tree, workspace, '/xyz/angular.json');
        expect(tree.readJson('/xyz/angular.json')).toEqual(jasmine.objectContaining({ 'x-abc': 1 }));
    });
});
describe('updateWorkspace', () => {
    it('updates a workspace using the default path value', async () => {
        var _a;
        const tree = new schematics_1.EmptyTree();
        tree.create('/angular.json', TEST_WORKSPACE_CONTENT);
        const rule = (0, workspace_1.updateWorkspace)((workspace) => {
            workspace.projects.add({
                name: 'abc',
                root: 'src',
            });
        });
        await testRule(rule, tree);
        expect((_a = tree.read('angular.json')) === null || _a === void 0 ? void 0 : _a.toString()).toContain('"abc"');
    });
    it('throws if workspace file does not exist', async () => {
        const tree = new schematics_1.EmptyTree();
        const rule = (0, workspace_1.updateWorkspace)((workspace) => {
            workspace.projects.add({
                name: 'abc',
                root: 'src',
            });
        });
        await expectAsync(testRule(rule, tree)).toBeRejectedWithError();
    });
    it('allows executing a returned followup rule', async () => {
        var _a;
        const tree = new schematics_1.EmptyTree();
        tree.create('/angular.json', TEST_WORKSPACE_CONTENT);
        const rule = (0, workspace_1.updateWorkspace)(() => {
            return (tree) => tree.create('/followup.txt', '12345');
        });
        await testRule(rule, tree);
        expect((_a = tree.read('/followup.txt')) === null || _a === void 0 ? void 0 : _a.toString()).toContain('12345');
    });
});

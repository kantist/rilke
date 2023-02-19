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
const dependency_1 = require("./dependency");
async function testRule(rule, tree) {
    const tasks = [];
    const logs = [];
    const context = {
        addTask(task) {
            tasks.push(task);
        },
        logger: {
            warn(message) {
                logs.push({ type: 'warn', message });
            },
        },
    };
    await (0, schematics_1.callRule)(rule, tree, context).toPromise();
    return { tasks, logs };
}
describe('addDependency', () => {
    it('adds a package to "dependencies" by default', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({
            dependencies: {},
        }));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0');
        await testRule(rule, tree);
        expect(tree.readJson('/package.json')).toEqual({
            dependencies: { '@angular/core': '^15.0.0' },
        });
    });
    it('warns if a package is already present with a different specifier by default', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({
            dependencies: { '@angular/core': '^13.0.0' },
        }));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0');
        const { logs } = await testRule(rule, tree);
        expect(logs).toContain(jasmine.objectContaining({
            type: 'warn',
            message: 'Package dependency "@angular/core" already exists with a different specifier. ' +
                '"^13.0.0" will be replaced with "^15.0.0".',
        }));
    });
    it('warns if a package is already present with a different specifier with replace behavior', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({
            dependencies: { '@angular/core': '^13.0.0' },
        }));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0', { existing: dependency_1.ExistingBehavior.Replace });
        const { logs } = await testRule(rule, tree);
        expect(logs).toContain(jasmine.objectContaining({
            type: 'warn',
            message: 'Package dependency "@angular/core" already exists with a different specifier. ' +
                '"^13.0.0" will be replaced with "^15.0.0".',
        }));
    });
    it('replaces the specifier if a package is already present with a different specifier with replace behavior', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({
            dependencies: { '@angular/core': '^13.0.0' },
        }));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0', { existing: dependency_1.ExistingBehavior.Replace });
        await testRule(rule, tree);
        expect(tree.readJson('/package.json')).toEqual({
            dependencies: { '@angular/core': '^15.0.0' },
        });
    });
    it('does not replace the specifier if a package is already present with a different specifier with skip behavior', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({
            dependencies: { '@angular/core': '^13.0.0' },
        }));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0', { existing: dependency_1.ExistingBehavior.Skip });
        await testRule(rule, tree);
        expect(tree.readJson('/package.json')).toEqual({
            dependencies: { '@angular/core': '^13.0.0' },
        });
    });
    it('adds a package version with other packages in alphabetical order', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({
            dependencies: { '@angular/common': '^15.0.0', '@angular/router': '^15.0.0' },
        }));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0');
        await testRule(rule, tree);
        expect(Object.entries(tree.readJson('/package.json').dependencies)).toEqual([
            ['@angular/common', '^15.0.0'],
            ['@angular/core', '^15.0.0'],
            ['@angular/router', '^15.0.0'],
        ]);
    });
    it('adds a dependency section if not present', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({}));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0');
        await testRule(rule, tree);
        expect(tree.readJson('/package.json')).toEqual({
            dependencies: { '@angular/core': '^15.0.0' },
        });
    });
    it('adds a package to "devDependencies" when "type" is "dev"', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({
            dependencies: {},
            devDependencies: {},
        }));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0', { type: dependency_1.DependencyType.Dev });
        await testRule(rule, tree);
        expect(tree.readJson('/package.json')).toEqual({
            dependencies: {},
            devDependencies: { '@angular/core': '^15.0.0' },
        });
    });
    it('adds a package to "peerDependencies" when "type" is "peer"', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({
            devDependencies: {},
            peerDependencies: {},
        }));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0', { type: dependency_1.DependencyType.Peer });
        await testRule(rule, tree);
        expect(tree.readJson('/package.json')).toEqual({
            devDependencies: {},
            peerDependencies: { '@angular/core': '^15.0.0' },
        });
    });
    it('uses specified manifest when provided via "manifestPath" option', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({}));
        tree.create('/abc/package.json', JSON.stringify({}));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0', {
            packageJsonPath: '/abc/package.json',
        });
        await testRule(rule, tree);
        expect(tree.readJson('/package.json')).toEqual({});
        expect(tree.readJson('/abc/package.json')).toEqual({
            dependencies: { '@angular/core': '^15.0.0' },
        });
    });
    it('schedules a package install task', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({}));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0');
        const { tasks } = await testRule(rule, tree);
        expect(tasks.map((task) => task.toConfiguration())).toEqual([
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/' }),
            },
        ]);
    });
    it('schedules a package install task with working directory when "packageJsonPath" is used', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/abc/package.json', JSON.stringify({}));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0', {
            packageJsonPath: '/abc/package.json',
        });
        const { tasks } = await testRule(rule, tree);
        expect(tasks.map((task) => task.toConfiguration())).toEqual([
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/abc' }),
            },
        ]);
    });
    it('schedules a package install task when install behavior is auto', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/abc/package.json', JSON.stringify({}));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0', {
            packageJsonPath: '/abc/package.json',
            install: dependency_1.InstallBehavior.Auto,
        });
        const { tasks } = await testRule(rule, tree);
        expect(tasks.map((task) => task.toConfiguration())).toEqual([
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/abc' }),
            },
        ]);
    });
    it('schedules a package install task when install behavior is always', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/abc/package.json', JSON.stringify({}));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0', {
            packageJsonPath: '/abc/package.json',
            install: dependency_1.InstallBehavior.Always,
        });
        const { tasks } = await testRule(rule, tree);
        expect(tasks.map((task) => task.toConfiguration())).toEqual([
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/abc' }),
            },
        ]);
    });
    it('does not schedule a package install task when install behavior is none', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/abc/package.json', JSON.stringify({}));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0', {
            packageJsonPath: '/abc/package.json',
            install: dependency_1.InstallBehavior.None,
        });
        const { tasks } = await testRule(rule, tree);
        expect(tasks).toEqual([]);
    });
    it('does not schedule a package install task if version is the same', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({
            dependencies: { '@angular/core': '^15.0.0' },
        }));
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0');
        const { tasks } = await testRule(rule, tree);
        expect(tasks).toEqual([]);
    });
    it('only schedules one package install task for the same manifest path by default', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({}));
        const rule = (0, schematics_1.chain)([(0, dependency_1.addDependency)('@angular/core', '^15.0.0'), (0, dependency_1.addDependency)('@angular/common', '^15.0.0')]);
        const { tasks } = await testRule(rule, tree);
        expect(tasks.map((task) => task.toConfiguration())).toEqual([
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/' }),
            },
        ]);
    });
    it('only schedules one package install task for the same manifest path with auto install behavior', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({}));
        const rule = (0, schematics_1.chain)([
            (0, dependency_1.addDependency)('@angular/core', '^15.0.0', { install: dependency_1.InstallBehavior.Auto }),
            (0, dependency_1.addDependency)('@angular/common', '^15.0.0', { install: dependency_1.InstallBehavior.Auto }),
        ]);
        const { tasks } = await testRule(rule, tree);
        expect(tasks.map((task) => task.toConfiguration())).toEqual([
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/' }),
            },
        ]);
    });
    it('only schedules one package install task for the same manifest path with mixed auto/none install behavior', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({}));
        const rule = (0, schematics_1.chain)([
            (0, dependency_1.addDependency)('@angular/core', '^15.0.0', { install: dependency_1.InstallBehavior.Auto }),
            (0, dependency_1.addDependency)('@angular/common', '^15.0.0', { install: dependency_1.InstallBehavior.None }),
        ]);
        const { tasks } = await testRule(rule, tree);
        expect(tasks.map((task) => task.toConfiguration())).toEqual([
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/' }),
            },
        ]);
    });
    it('only schedules one package install task for the same manifest path with mixed always then auto install behavior', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({}));
        const rule = (0, schematics_1.chain)([
            (0, dependency_1.addDependency)('@angular/core', '^15.0.0', { install: dependency_1.InstallBehavior.Always }),
            (0, dependency_1.addDependency)('@angular/common', '^15.0.0', { install: dependency_1.InstallBehavior.Auto }),
        ]);
        const { tasks } = await testRule(rule, tree);
        expect(tasks.map((task) => task.toConfiguration())).toEqual([
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/' }),
            },
        ]);
    });
    it('schedules multiple package install tasks for the same manifest path with mixed auto then always install behavior', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({}));
        const rule = (0, schematics_1.chain)([
            (0, dependency_1.addDependency)('@angular/core', '^15.0.0', { install: dependency_1.InstallBehavior.Auto }),
            (0, dependency_1.addDependency)('@angular/common', '^15.0.0', { install: dependency_1.InstallBehavior.Always }),
        ]);
        const { tasks } = await testRule(rule, tree);
        expect(tasks.map((task) => task.toConfiguration())).toEqual([
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/' }),
            },
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/' }),
            },
        ]);
    });
    it('schedules a package install task for each manifest path present', async () => {
        const tree = new schematics_1.EmptyTree();
        tree.create('/package.json', JSON.stringify({}));
        tree.create('/abc/package.json', JSON.stringify({}));
        const rule = (0, schematics_1.chain)([
            (0, dependency_1.addDependency)('@angular/core', '^15.0.0'),
            (0, dependency_1.addDependency)('@angular/common', '^15.0.0', { packageJsonPath: '/abc/package.json' }),
        ]);
        const { tasks } = await testRule(rule, tree);
        expect(tasks.map((task) => task.toConfiguration())).toEqual([
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/' }),
            },
            {
                name: 'node-package',
                options: jasmine.objectContaining({ command: 'install', workingDirectory: '/abc' }),
            },
        ]);
    });
    it('throws an error when the default manifest path does not exist', async () => {
        const tree = new schematics_1.EmptyTree();
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0');
        await expectAsync(testRule(rule, tree)).toBeRejectedWithError(undefined, `Path "/package.json" does not exist.`);
    });
    it('throws an error when the specified manifest path does not exist', async () => {
        const tree = new schematics_1.EmptyTree();
        const rule = (0, dependency_1.addDependency)('@angular/core', '^15.0.0', {
            packageJsonPath: '/abc/package.json',
        });
        await expectAsync(testRule(rule, tree)).toBeRejectedWithError(undefined, `Path "/abc/package.json" does not exist.`);
    });
});

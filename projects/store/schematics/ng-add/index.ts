/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { strings, normalize } from '@angular-devkit/core';
import {
	Rule,
	MergeStrategy,
	SchematicContext,
	SchematicsException,
	Tree,
	apply,
	applyTemplates,
	chain,
	noop,
	mergeWith,
	move,
	url,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addImportToModule } from '../utility/ast-utils';
import { InsertChange } from '../utility/change';
import { getWorkspace } from '../utility/workspace';
import { getAppModulePath } from '../utility/ng-ast-utils';
import * as ts from '../third_party/files/typescript';
import { targetBuildNotFoundError } from '../utility/project-targets';
import { BrowserBuilderOptions } from '../utility/workspace-models';
import { NodeDependencyType, addPackageJsonDependency } from '../utility/dependencies';
import { latestVersions } from '../utility/latest-versions';
import { Schema } from './schema';

function readIntoSourceFile(host: Tree, path: string): ts.SourceFile {
	const buffer = host.read(path);
	if (!buffer) {
		throw new SchematicsException(`Could not read file (${path}).`);
	}
	const content = buffer.toString();
	const source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);

	return source;
}

function addDependenciesToPackageJson(options: Schema) {
	return (host: Tree, context: SchematicContext) => {
		[
			{
				type: NodeDependencyType.Dev,
				name: '@ngrx/effects',
				version: latestVersions['@ngrx'],
			},
			{
				type: NodeDependencyType.Dev,
				name: '@ngrx/entity',
				version: latestVersions['@ngrx'],
			},
			{
				type: NodeDependencyType.Dev,
				name: '@ngrx/store',
				version: latestVersions['@ngrx'],
			},
		].forEach((dependency) => addPackageJsonDependency(host, dependency));

		if (!options.skipInstall) {
			context.addTask(new NodePackageInstallTask());
		}

		return host;
	};
}

function addAppStoreModule(mainPath: string): Rule {
	return (host: Tree) => {
		let source: ts.SourceFile;
		let modulePath = getAppModulePath(host, mainPath);

		if (host.read(modulePath)) {
			source = readIntoSourceFile(host, modulePath);
		} else {
			throw new SchematicsException(`App Module not found`);
		}

		const relativePath = '@stores/app-store.module';
		const classifiedName = 'AppStoreModule';
		const importChanges = addImportToModule(source, modulePath, classifiedName, relativePath);

		const importRecorder = host.beginUpdate(modulePath);
		for (const change of importChanges) {
			if (change instanceof InsertChange) {
				importRecorder.insertLeft(change.pos, change.toAdd);
			}
		}
		host.commitUpdate(importRecorder);

		return host;
	};
}

export default function (options: Schema): Rule {
	return async (host: Tree) => {
		const workspace = await getWorkspace(host);
		const project = workspace.projects.get(options.project as string);

		if (!project) {
			throw new SchematicsException(`Project "${options.project}" does not exist.`);
		}

		const buildTarget = project.targets.get('build');
		if (!buildTarget) {
			throw targetBuildNotFoundError();
		}
		const buildOptions = (buildTarget.options || {}) as unknown as BrowserBuilderOptions;

		const newProjectRoot = (workspace.extensions.newProjectRoot as string | undefined) || '';

		const appDir = normalize(newProjectRoot);
		const sourceDir = `${appDir}/src/app`;

		return chain([
			addAppStoreModule(buildOptions.main),
			addDependenciesToPackageJson(options),
			mergeWith(
				apply(url('./files'), [
					noop(),
					applyTemplates({
						strings,
						...options,
					}),
					move(sourceDir),
				]),
				MergeStrategy.Overwrite
			),
		]);
	};
}

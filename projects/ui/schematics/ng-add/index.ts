/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { strings, workspaces } from '@angular-devkit/core';
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
import * as ts from '../third_party/files/typescript';
import { InsertChange } from '../utility/change';
import { getWorkspace } from '../utility/workspace';
import { getAppModulePath } from '../utility/ng-ast-utils';
import { targetBuildNotFoundError } from '../utility/project-targets';
import { BrowserBuilderOptions } from '../utility/workspace-models';

function addStyleToWorkspaceFile(workspace: workspaces.WorkspaceDefinition): Rule {
	return (host: Tree) => {
		const project = workspace.projects.get(workspace.extensions.defaultProject as string);

		const projectName = workspace.extensions.defaultProject as string;

		if (!project) {
			throw new SchematicsException(`Project does not exist.`);
		}

		let configPath = './angular.json';

		if (host.exists(configPath)) {
			let currentAngularJson = host.read(configPath)!.toString('utf-8');
			let json = JSON.parse(currentAngularJson);
			let optionsJson = json['projects'][projectName]['architect']['build']['options'];

			let styles = ['src/assets/rilke-ui/style/styles.scss'];

			styles.forEach((s) => {
				if (!optionsJson['styles'].includes(s)) {
					optionsJson['styles'].push(s);
				}
			});

			json['projects'][projectName]['architect']['build']['options'] = optionsJson;
			host.overwrite(configPath, JSON.stringify(json, null, 2));
		} else {
			throw new SchematicsException('angular.json not found at ' + configPath);
		}
		return host;
	};
}

function readIntoSourceFile(host: Tree, modulePath: string): ts.SourceFile {
	const text = host.read(modulePath);
	if (text === null) {
		throw new SchematicsException(`File ${modulePath} does not exist.`);
	}
	const sourceText = text.toString('utf-8');

	return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
}

function addAnimationsModuleToNgModule(mainPath: string): Rule {
	return (host: Tree) => {
		let source: ts.SourceFile;
		let modulePath = getAppModulePath(host, mainPath);

		if (host.read(modulePath)) {
			source = readIntoSourceFile(host, modulePath);
		} else {
			throw new SchematicsException(`App Module not found`);
		}

		const relativePath = '@angular/platform-browser/animations';
		const classifiedName = 'BrowserAnimationsModule';
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

// function addUIModuleToNgModule(mainPath: string): Rule {
// 	return (host: Tree) => {
// 		let source: ts.SourceFile;
// 		let modulePath = getAppModulePath(host, mainPath);

// 		if (host.read(modulePath)) {
// 			source = readIntoSourceFile(host, modulePath);
// 		} else {
// 			throw new SchematicsException(`App Module not found`);
// 		}

// 		const relativePath = '@rilke/ui';
// 		const classifiedName = 'RilkeUIModule';
// 		const importChanges = addImportToModule(source, modulePath, classifiedName, relativePath);

// 		const importRecorder = host.beginUpdate(modulePath);
// 		for (const change of importChanges) {
// 			if (change instanceof InsertChange) {
// 				importRecorder.insertLeft(change.pos, change.toAdd);
// 			}
// 		}
// 		host.commitUpdate(importRecorder);

// 		return host;
// 	};
// }

export default function (): Rule {
	return async (host: Tree, context: SchematicContext) => {
		const workspace = await getWorkspace(host);

		const project = workspace.projects.get(workspace.extensions.defaultProject as string);

		if (!project) {
			throw new SchematicsException(`Project does not exist.`);
		}

		const buildTarget = project.targets.get('build');
		if (!buildTarget) {
			throw targetBuildNotFoundError();
		}
		const buildOptions = (buildTarget.options || {}) as unknown as BrowserBuilderOptions;

		context.addTask(new NodePackageInstallTask());

		const templateSource = apply(url('./files'), [
			noop(),
			applyTemplates({
				...strings,
			}),
			move('/src/assets/rilke-ui/'),
		]);

		return chain([
			addAnimationsModuleToNgModule(buildOptions.main),
			// addUIModuleToNgModule(buildOptions.main),
			addStyleToWorkspaceFile(workspace),
			mergeWith(templateSource, MergeStrategy.Overwrite),
		]);
	};
}

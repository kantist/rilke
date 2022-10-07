"use strict";
/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppModule = void 0;
function createAppModule(tree, path) {
    tree.create(path || '/src/app/app.module.ts', `
		import { BrowserModule } from '@angular/platform-browser';
		import { NgModule } from '@angular/core';
		import { AppComponent } from './app.component';

		@NgModule({
		declarations: [
			AppComponent
		],
		imports: [
			BrowserModule
		],
		providers: [],
		bootstrap: [AppComponent]
		})
		export class AppModule { }
	`);
    return tree;
}
exports.createAppModule = createAppModule;
//# sourceMappingURL=create-app-module.js.map
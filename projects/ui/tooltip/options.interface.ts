/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

export interface TooltipOptions {
	placement?: string;
	autoPlacement?: boolean;
	'content-type'?: 'string' | 'html' | 'template';
	contentType?: 'string' | 'html' | 'template';
	delay?: number;
	'show-delay'?: number;
	showDelay?: number;
	'hide-delay'?: number;
	hideDelay?: number;
	'hide-delay-mobile'?: number;
	hideDelayMobile?: number;
	hideDelayTouchscreen?: number;
	'z-index'?: number;
	zIndex?: number;
	'animation-duration'?: number;
	animationDuration?: number;
	'animation-duration-default'?: number;
	animationDurationDefault?: number;
	trigger?: string;
	'tooltip-class'?: string;
	tooltipClass?: string;
	display?: boolean;
	'display-mobile'?: boolean;
	displayMobile?: boolean;
	displayTouchscreen?: boolean;
	shadow?: boolean;
	theme?: 'dark' | 'light';
	offset?: number;
	width?: string;
	'max-width'?: string;
	maxWidth?: string;
	id?: string | number;
	hideDelayAfterClick?: number;
	pointerEvents?: 'auto' | 'none';
	position?: { top: number; left: number };
}

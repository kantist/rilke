/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-rest-params */

const isFunction = (fn) => typeof fn === 'function';

const doUnsubscribe = (subscription) => {
	subscription && isFunction(subscription.unsubscribe) && subscription.unsubscribe();
};

const doUnsubscribeIfArray = (subscriptionsArray) => {
	if (Array.isArray(subscriptionsArray) && subscriptionsArray.length > 0) {
		for (let sub of subscriptionsArray) {
			if (!isFunction(sub?.unsubscribe)) break; // if one of the elements is not a subscription, break the loop

			doUnsubscribe(sub);
		}
	}
};

export function AutoUnsubscribe(blackList = []) {
	return function (constructor: Function) {
		const original = constructor.prototype.ngOnDestroy;

		constructor.prototype.ngOnDestroy = function () {
			for (let prop in this) {
				if (blackList.includes(prop)) continue; // if it's in the blacklist, skip it

				const property = this[prop];

				doUnsubscribeIfArray(property); // if it's an array, unsubscribe all elements
				doUnsubscribe(property); // if it's a single subscription, unsubscribe it
			}

			original && isFunction(original) && original.apply(this, arguments); // call original function
		};
	};
}

import { $ as $inputRule, $t as createSlice, A as clearTextInCurrentBlockCommand, An as longestStreak, B as listItemSchema, Bt as editorCtx, C as imageBlockConfig, Cn as debounce, Ct as getMarkdown, D as addBlockTypeCommand, Dn as root, E as vue_exports, En as baseGetTag, F as hrSchema, Fn as factorySpace, Ft as EditorViewReady, G as strongSchema, Gt as rootCtx, H as paragraphSchema, Ht as editorViewOptionsCtx, I as inlineCodeSchema, It as InitReady, J as toggleStrongCommand, Jt as Decoration, K as toggleEmphasisCommand, Kt as schemaCtx, L as isMarkSelectedCommand, Ln as markdownLineEnding, Lt as SerializerReady, M as commonmark, N as emphasisSchema, Nn as visit, Nt as Editor, O as blockquoteSchema, On as freeGlobal, P as headingSchema, Pt as EditorStatus, Q as $ctx, Qt as keymap, R as isNodeSelectedCommand, Rt as commandsCtx, S as imageBlockComponent, Sn as throttle, T as Icon, Tn as isObjectLike, U as selectTextNearPosCommand, Ut as parserCtx, V as orderedListSchema, Vn as clsx, Vt as editorViewCtx, W as setBlockTypeCommand, Wt as prosePluginsCtx, X as $command, Xt as EditorView, Y as wrapInBlockTypeCommand, Yt as DecorationSet, Zt as keydownHandler, _ as undo, _n as DOMSerializer, a as configureLinkTooltip, an as isTextOnlySlice, b as strikethroughSchema, bn as Schema, c as toggleLinkCommand, cn as textblockTypeInputRule, ct as $nodeSchema, d as imageInlineComponent, dn as NodeSelection, dt as $prose, en as browser, f as inlineImageConfig, fn as Plugin, g as redo, gn as DOMParser, gt as $useKeymap, h as history$1, hn as TextSelection, i as listItemBlockConfig, in as getNodeFromSchema, j as codeBlockSchema, k as bulletListSchema, l as TooltipProvider, ln as AllSelection, m as codeBlockConfig, mn as Selection, mt as $shortcut, n as tableBlockConfig, nn as findParent, o as linkTooltipConfig, on as nodeRule, p as codeBlockComponent, pn as PluginKey, pt as $remark, q as toggleInlineCodeCommand, qt as serializerCtx, r as listItemBlockComponent, rn as findParentNode, s as linkTooltipPlugin, sn as posToDOMRect, t as tableBlock, tn as findNodeInSelection, u as tooltipFactory, un as EditorState, v as createTable, vn as Fragment$1, w as imageBlockSchema, wn as isObject, x as toggleStrikethroughCommand, xn as Slice, y as gfm, yn as Mark, z as linkSchema, zt as defaultValueCtx } from "./components+[...].mjs";
import { $ as highlightActiveLineGutter, E as foldKeymap, J as crosshairCursor, M as indentOnInput, Q as highlightActiveLine, R as syntaxHighlighting, X as dropCursor, Y as drawSelection, _ as bracketMatching, _t as EditorState$1, b as defaultHighlightStyle, et as highlightSpecialChars, i as closeBracketsKeymap, it as rectangularSelection, n as autocompletion, nt as keymap$1, o as completionKeymap, r as closeBrackets, rt as lineNumbers, w as foldGutter } from "../@codemirror/autocomplete+[...].mjs";
import { t as languages } from "../codemirror__language-data.mjs";
import { t as oneDark } from "../codemirror__theme-one-dark.mjs";
import { i as offset, n as computePosition, r as flip } from "../@floating-ui/dom+[...].mjs";
import { i as indentWithTab, n as history$2, r as historyKeymap$1, t as defaultKeymap } from "../codemirror__commands.mjs";
import { n as searchKeymap, t as highlightSelectionMatches } from "../codemirror__search.mjs";
import { t as lintKeymap } from "../codemirror__lint.mjs";
//#region node_modules/lodash-es/isArray.js
/**
* Checks if `value` is classified as an `Array` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an array, else `false`.
* @example
*
* _.isArray([1, 2, 3]);
* // => true
*
* _.isArray(document.body.children);
* // => false
*
* _.isArray('abc');
* // => false
*
* _.isArray(_.noop);
* // => false
*/
var isArray = Array.isArray;
//#endregion
//#region node_modules/lodash-es/identity.js
/**
* This method returns the first argument it receives.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Util
* @param {*} value Any value.
* @returns {*} Returns `value`.
* @example
*
* var object = { 'a': 1 };
*
* console.log(_.identity(object) === object);
* // => true
*/
function identity(value) {
	return value;
}
//#endregion
//#region node_modules/lodash-es/isFunction.js
/** `Object#toString` result references. */
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
/**
* Checks if `value` is classified as a `Function` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a function, else `false`.
* @example
*
* _.isFunction(_);
* // => true
*
* _.isFunction(/abc/);
* // => false
*/
function isFunction(value) {
	if (!isObject(value)) return false;
	var tag = baseGetTag(value);
	return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
//#endregion
//#region node_modules/lodash-es/_coreJsData.js
/** Used to detect overreaching core-js shims. */
var coreJsData = root["__core-js_shared__"];
//#endregion
//#region node_modules/lodash-es/_isMasked.js
/** Used to detect methods masquerading as native. */
var maskSrcKey = function() {
	var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
	return uid ? "Symbol(src)_1." + uid : "";
}();
/**
* Checks if `func` has its source masked.
*
* @private
* @param {Function} func The function to check.
* @returns {boolean} Returns `true` if `func` is masked, else `false`.
*/
function isMasked(func) {
	return !!maskSrcKey && maskSrcKey in func;
}
//#endregion
//#region node_modules/lodash-es/_toSource.js
/** Used to resolve the decompiled source of functions. */
var funcToString$2 = Function.prototype.toString;
/**
* Converts `func` to its source code.
*
* @private
* @param {Function} func The function to convert.
* @returns {string} Returns the source code.
*/
function toSource(func) {
	if (func != null) {
		try {
			return funcToString$2.call(func);
		} catch (e) {}
		try {
			return func + "";
		} catch (e) {}
	}
	return "";
}
//#endregion
//#region node_modules/lodash-es/_baseIsNative.js
/**
* Used to match `RegExp`
* [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
*/
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */
var funcProto$1 = Function.prototype, objectProto$3 = Object.prototype;
/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;
/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$3.hasOwnProperty;
/** Used to detect if a method is native. */
var reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$7).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
/**
* The base implementation of `_.isNative` without bad shim checks.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a native function,
*  else `false`.
*/
function baseIsNative(value) {
	if (!isObject(value) || isMasked(value)) return false;
	return (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
}
//#endregion
//#region node_modules/lodash-es/_getValue.js
/**
* Gets the value at `key` of `object`.
*
* @private
* @param {Object} [object] The object to query.
* @param {string} key The key of the property to get.
* @returns {*} Returns the property value.
*/
function getValue(object, key) {
	return object == null ? void 0 : object[key];
}
//#endregion
//#region node_modules/lodash-es/_getNative.js
/**
* Gets the native function at `key` of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {string} key The key of the method to get.
* @returns {*} Returns the function if it's native, else `undefined`.
*/
function getNative(object, key) {
	var value = getValue(object, key);
	return baseIsNative(value) ? value : void 0;
}
//#endregion
//#region node_modules/lodash-es/_baseCreate.js
/** Built-in value references. */
var objectCreate = Object.create;
/**
* The base implementation of `_.create` without support for assigning
* properties to the created object.
*
* @private
* @param {Object} proto The object to inherit from.
* @returns {Object} Returns the new object.
*/
var baseCreate = function() {
	function object() {}
	return function(proto) {
		if (!isObject(proto)) return {};
		if (objectCreate) return objectCreate(proto);
		object.prototype = proto;
		var result = new object();
		object.prototype = void 0;
		return result;
	};
}();
//#endregion
//#region node_modules/lodash-es/_apply.js
/**
* A faster alternative to `Function#apply`, this function invokes `func`
* with the `this` binding of `thisArg` and the arguments of `args`.
*
* @private
* @param {Function} func The function to invoke.
* @param {*} thisArg The `this` binding of `func`.
* @param {Array} args The arguments to invoke `func` with.
* @returns {*} Returns the result of `func`.
*/
function apply(func, thisArg, args) {
	switch (args.length) {
		case 0: return func.call(thisArg);
		case 1: return func.call(thisArg, args[0]);
		case 2: return func.call(thisArg, args[0], args[1]);
		case 3: return func.call(thisArg, args[0], args[1], args[2]);
	}
	return func.apply(thisArg, args);
}
//#endregion
//#region node_modules/lodash-es/_copyArray.js
/**
* Copies the values of `source` to `array`.
*
* @private
* @param {Array} source The array to copy values from.
* @param {Array} [array=[]] The array to copy values to.
* @returns {Array} Returns `array`.
*/
function copyArray(source, array) {
	var index = -1, length = source.length;
	array || (array = Array(length));
	while (++index < length) array[index] = source[index];
	return array;
}
//#endregion
//#region node_modules/lodash-es/_shortOut.js
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
/**
* Creates a function that'll short out and invoke `identity` instead
* of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
* milliseconds.
*
* @private
* @param {Function} func The function to restrict.
* @returns {Function} Returns the new shortable function.
*/
function shortOut(func) {
	var count = 0, lastCalled = 0;
	return function() {
		var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
		lastCalled = stamp;
		if (remaining > 0) {
			if (++count >= HOT_COUNT) return arguments[0];
		} else count = 0;
		return func.apply(void 0, arguments);
	};
}
//#endregion
//#region node_modules/lodash-es/constant.js
/**
* Creates a function that returns `value`.
*
* @static
* @memberOf _
* @since 2.4.0
* @category Util
* @param {*} value The value to return from the new function.
* @returns {Function} Returns the new constant function.
* @example
*
* var objects = _.times(2, _.constant({ 'a': 1 }));
*
* console.log(objects);
* // => [{ 'a': 1 }, { 'a': 1 }]
*
* console.log(objects[0] === objects[1]);
* // => true
*/
function constant(value) {
	return function() {
		return value;
	};
}
//#endregion
//#region node_modules/lodash-es/_defineProperty.js
var defineProperty = function() {
	try {
		var func = getNative(Object, "defineProperty");
		func({}, "", {});
		return func;
	} catch (e) {}
}();
//#endregion
//#region node_modules/lodash-es/_setToString.js
/**
* Sets the `toString` method of `func` to return `string`.
*
* @private
* @param {Function} func The function to modify.
* @param {Function} string The `toString` result.
* @returns {Function} Returns `func`.
*/
var setToString = shortOut(!defineProperty ? identity : function(func, string) {
	return defineProperty(func, "toString", {
		"configurable": true,
		"enumerable": false,
		"value": constant(string),
		"writable": true
	});
});
//#endregion
//#region node_modules/lodash-es/_isIndex.js
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;
/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
* Checks if `value` is a valid array-like index.
*
* @private
* @param {*} value The value to check.
* @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
* @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
*/
function isIndex(value, length) {
	var type = typeof value;
	length = length == null ? MAX_SAFE_INTEGER$1 : length;
	return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
//#endregion
//#region node_modules/lodash-es/_baseAssignValue.js
/**
* The base implementation of `assignValue` and `assignMergeValue` without
* value checks.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function baseAssignValue(object, key, value) {
	if (key == "__proto__" && defineProperty) defineProperty(object, key, {
		"configurable": true,
		"enumerable": true,
		"value": value,
		"writable": true
	});
	else object[key] = value;
}
//#endregion
//#region node_modules/lodash-es/eq.js
/**
* Performs a
* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* comparison between two values to determine if they are equivalent.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
* @example
*
* var object = { 'a': 1 };
* var other = { 'a': 1 };
*
* _.eq(object, object);
* // => true
*
* _.eq(object, other);
* // => false
*
* _.eq('a', 'a');
* // => true
*
* _.eq('a', Object('a'));
* // => false
*
* _.eq(NaN, NaN);
* // => true
*/
function eq(value, other) {
	return value === other || value !== value && other !== other;
}
//#endregion
//#region node_modules/lodash-es/_assignValue.js
/** Used to check objects for own properties. */
var hasOwnProperty$6 = Object.prototype.hasOwnProperty;
/**
* Assigns `value` to `key` of `object` if the existing value is not equivalent
* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* for equality comparisons.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function assignValue(object, key, value) {
	var objValue = object[key];
	if (!(hasOwnProperty$6.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) baseAssignValue(object, key, value);
}
//#endregion
//#region node_modules/lodash-es/_copyObject.js
/**
* Copies properties of `source` to `object`.
*
* @private
* @param {Object} source The object to copy properties from.
* @param {Array} props The property identifiers to copy.
* @param {Object} [object={}] The object to copy properties to.
* @param {Function} [customizer] The function to customize copied values.
* @returns {Object} Returns `object`.
*/
function copyObject(source, props, object, customizer) {
	var isNew = !object;
	object || (object = {});
	var index = -1, length = props.length;
	while (++index < length) {
		var key = props[index];
		var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
		if (newValue === void 0) newValue = source[key];
		if (isNew) baseAssignValue(object, key, newValue);
		else assignValue(object, key, newValue);
	}
	return object;
}
//#endregion
//#region node_modules/lodash-es/_overRest.js
var nativeMax = Math.max;
/**
* A specialized version of `baseRest` which transforms the rest array.
*
* @private
* @param {Function} func The function to apply a rest parameter to.
* @param {number} [start=func.length-1] The start position of the rest parameter.
* @param {Function} transform The rest array transform.
* @returns {Function} Returns the new function.
*/
function overRest(func, start, transform) {
	start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
	return function() {
		var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
		while (++index < length) array[index] = args[start + index];
		index = -1;
		var otherArgs = Array(start + 1);
		while (++index < start) otherArgs[index] = args[index];
		otherArgs[start] = transform(array);
		return apply(func, this, otherArgs);
	};
}
//#endregion
//#region node_modules/lodash-es/_baseRest.js
/**
* The base implementation of `_.rest` which doesn't validate or coerce arguments.
*
* @private
* @param {Function} func The function to apply a rest parameter to.
* @param {number} [start=func.length-1] The start position of the rest parameter.
* @returns {Function} Returns the new function.
*/
function baseRest(func, start) {
	return setToString(overRest(func, start, identity), func + "");
}
//#endregion
//#region node_modules/lodash-es/isLength.js
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
* Checks if `value` is a valid array-like length.
*
* **Note:** This method is loosely based on
* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
* @example
*
* _.isLength(3);
* // => true
*
* _.isLength(Number.MIN_VALUE);
* // => false
*
* _.isLength(Infinity);
* // => false
*
* _.isLength('3');
* // => false
*/
function isLength(value) {
	return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
//#endregion
//#region node_modules/lodash-es/isArrayLike.js
/**
* Checks if `value` is array-like. A value is considered array-like if it's
* not a function and has a `value.length` that's an integer greater than or
* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
* @example
*
* _.isArrayLike([1, 2, 3]);
* // => true
*
* _.isArrayLike(document.body.children);
* // => true
*
* _.isArrayLike('abc');
* // => true
*
* _.isArrayLike(_.noop);
* // => false
*/
function isArrayLike(value) {
	return value != null && isLength(value.length) && !isFunction(value);
}
//#endregion
//#region node_modules/lodash-es/_isIterateeCall.js
/**
* Checks if the given arguments are from an iteratee call.
*
* @private
* @param {*} value The potential iteratee value argument.
* @param {*} index The potential iteratee index or key argument.
* @param {*} object The potential iteratee object argument.
* @returns {boolean} Returns `true` if the arguments are from an iteratee call,
*  else `false`.
*/
function isIterateeCall(value, index, object) {
	if (!isObject(object)) return false;
	var type = typeof index;
	if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) return eq(object[index], value);
	return false;
}
//#endregion
//#region node_modules/lodash-es/_createAssigner.js
/**
* Creates a function like `_.assign`.
*
* @private
* @param {Function} assigner The function to assign values.
* @returns {Function} Returns the new assigner function.
*/
function createAssigner(assigner) {
	return baseRest(function(object, sources) {
		var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
		customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
		if (guard && isIterateeCall(sources[0], sources[1], guard)) {
			customizer = length < 3 ? void 0 : customizer;
			length = 1;
		}
		object = Object(object);
		while (++index < length) {
			var source = sources[index];
			if (source) assigner(object, source, index, customizer);
		}
		return object;
	});
}
//#endregion
//#region node_modules/lodash-es/_isPrototype.js
/** Used for built-in method references. */
var objectProto$2 = Object.prototype;
/**
* Checks if `value` is likely a prototype object.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
*/
function isPrototype(value) {
	var Ctor = value && value.constructor;
	return value === (typeof Ctor == "function" && Ctor.prototype || objectProto$2);
}
//#endregion
//#region node_modules/lodash-es/_baseTimes.js
/**
* The base implementation of `_.times` without support for iteratee shorthands
* or max array length checks.
*
* @private
* @param {number} n The number of times to invoke `iteratee`.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the array of results.
*/
function baseTimes(n, iteratee) {
	var index = -1, result = Array(n);
	while (++index < n) result[index] = iteratee(index);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_baseIsArguments.js
/** `Object#toString` result references. */
var argsTag$1 = "[object Arguments]";
/**
* The base implementation of `_.isArguments`.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an `arguments` object,
*/
function baseIsArguments(value) {
	return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}
//#endregion
//#region node_modules/lodash-es/isArguments.js
/** Used for built-in method references. */
var objectProto$1 = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$1.hasOwnProperty;
/** Built-in value references. */
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
/**
* Checks if `value` is likely an `arguments` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an `arguments` object,
*  else `false`.
* @example
*
* _.isArguments(function() { return arguments; }());
* // => true
*
* _.isArguments([1, 2, 3]);
* // => false
*/
var isArguments = baseIsArguments(function() {
	return arguments;
}()) ? baseIsArguments : function(value) {
	return isObjectLike(value) && hasOwnProperty$5.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
//#endregion
//#region node_modules/lodash-es/stubFalse.js
/**
* This method returns `false`.
*
* @static
* @memberOf _
* @since 4.13.0
* @category Util
* @returns {boolean} Returns `false`.
* @example
*
* _.times(2, _.stubFalse);
* // => [false, false]
*/
function stubFalse() {
	return false;
}
//#endregion
//#region node_modules/lodash-es/isBuffer.js
/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
/** Built-in value references. */
var Buffer$1 = freeModule$2 && freeModule$2.exports === freeExports$2 ? root.Buffer : void 0;
/**
* Checks if `value` is a buffer.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
* @example
*
* _.isBuffer(new Buffer(2));
* // => true
*
* _.isBuffer(new Uint8Array(2));
* // => false
*/
var isBuffer = (Buffer$1 ? Buffer$1.isBuffer : void 0) || stubFalse;
//#endregion
//#region node_modules/lodash-es/_baseIsTypedArray.js
/** `Object#toString` result references. */
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag$1 = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/**
* The base implementation of `_.isTypedArray` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
*/
function baseIsTypedArray(value) {
	return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
//#endregion
//#region node_modules/lodash-es/_baseUnary.js
/**
* The base implementation of `_.unary` without support for storing metadata.
*
* @private
* @param {Function} func The function to cap arguments for.
* @returns {Function} Returns the new capped function.
*/
function baseUnary(func) {
	return function(value) {
		return func(value);
	};
}
//#endregion
//#region node_modules/lodash-es/_nodeUtil.js
/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
/** Detect free variable `process` from Node.js. */
var freeProcess = freeModule$1 && freeModule$1.exports === freeExports$1 && freeGlobal.process;
/** Used to access faster Node.js helpers. */
var nodeUtil = function() {
	try {
		var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
		if (types) return types;
		return freeProcess && freeProcess.binding && freeProcess.binding("util");
	} catch (e) {}
}();
//#endregion
//#region node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
* Checks if `value` is classified as a typed array.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
* @example
*
* _.isTypedArray(new Uint8Array);
* // => true
*
* _.isTypedArray([]);
* // => false
*/
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
//#endregion
//#region node_modules/lodash-es/_arrayLikeKeys.js
/** Used to check objects for own properties. */
var hasOwnProperty$4 = Object.prototype.hasOwnProperty;
/**
* Creates an array of the enumerable property names of the array-like `value`.
*
* @private
* @param {*} value The value to query.
* @param {boolean} inherited Specify returning inherited property names.
* @returns {Array} Returns the array of property names.
*/
function arrayLikeKeys(value, inherited) {
	var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
	for (var key in value) if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_overArg.js
/**
* Creates a unary function that invokes `func` with its argument transformed.
*
* @private
* @param {Function} func The function to wrap.
* @param {Function} transform The argument transform.
* @returns {Function} Returns the new function.
*/
function overArg(func, transform) {
	return function(arg) {
		return func(transform(arg));
	};
}
//#endregion
//#region node_modules/lodash-es/_nativeKeysIn.js
/**
* This function is like
* [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
* except that it includes inherited enumerable properties.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function nativeKeysIn(object) {
	var result = [];
	if (object != null) for (var key in Object(object)) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_baseKeysIn.js
/** Used to check objects for own properties. */
var hasOwnProperty$3 = Object.prototype.hasOwnProperty;
/**
* The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function baseKeysIn(object) {
	if (!isObject(object)) return nativeKeysIn(object);
	var isProto = isPrototype(object), result = [];
	for (var key in object) if (!(key == "constructor" && (isProto || !hasOwnProperty$3.call(object, key)))) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/keysIn.js
/**
* Creates an array of the own and inherited enumerable property names of `object`.
*
* **Note:** Non-object values are coerced to objects.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Object
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
* @example
*
* function Foo() {
*   this.a = 1;
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.keysIn(new Foo);
* // => ['a', 'b', 'c'] (iteration order is not guaranteed)
*/
function keysIn(object) {
	return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
//#endregion
//#region node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative(Object, "create");
//#endregion
//#region node_modules/lodash-es/_hashClear.js
/**
* Removes all key-value entries from the hash.
*
* @private
* @name clear
* @memberOf Hash
*/
function hashClear() {
	this.__data__ = nativeCreate ? nativeCreate(null) : {};
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_hashDelete.js
/**
* Removes `key` and its value from the hash.
*
* @private
* @name delete
* @memberOf Hash
* @param {Object} hash The hash to modify.
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function hashDelete(key) {
	var result = this.has(key) && delete this.__data__[key];
	this.size -= result ? 1 : 0;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_hashGet.js
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
/** Used to check objects for own properties. */
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
/**
* Gets the hash value for `key`.
*
* @private
* @name get
* @memberOf Hash
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function hashGet(key) {
	var data = this.__data__;
	if (nativeCreate) {
		var result = data[key];
		return result === HASH_UNDEFINED$1 ? void 0 : result;
	}
	return hasOwnProperty$2.call(data, key) ? data[key] : void 0;
}
//#endregion
//#region node_modules/lodash-es/_hashHas.js
/** Used to check objects for own properties. */
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
/**
* Checks if a hash value for `key` exists.
*
* @private
* @name has
* @memberOf Hash
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function hashHas(key) {
	var data = this.__data__;
	return nativeCreate ? data[key] !== void 0 : hasOwnProperty$1.call(data, key);
}
//#endregion
//#region node_modules/lodash-es/_hashSet.js
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = "__lodash_hash_undefined__";
/**
* Sets the hash `key` to `value`.
*
* @private
* @name set
* @memberOf Hash
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the hash instance.
*/
function hashSet(key, value) {
	var data = this.__data__;
	this.size += this.has(key) ? 0 : 1;
	data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_Hash.js
/**
* Creates a hash object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Hash(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
//#endregion
//#region node_modules/lodash-es/_listCacheClear.js
/**
* Removes all key-value entries from the list cache.
*
* @private
* @name clear
* @memberOf ListCache
*/
function listCacheClear() {
	this.__data__ = [];
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_assocIndexOf.js
/**
* Gets the index at which the `key` is found in `array` of key-value pairs.
*
* @private
* @param {Array} array The array to inspect.
* @param {*} key The key to search for.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function assocIndexOf(array, key) {
	var length = array.length;
	while (length--) if (eq(array[length][0], key)) return length;
	return -1;
}
//#endregion
//#region node_modules/lodash-es/_listCacheDelete.js
/** Built-in value references. */
var splice = Array.prototype.splice;
/**
* Removes `key` and its value from the list cache.
*
* @private
* @name delete
* @memberOf ListCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function listCacheDelete(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) return false;
	if (index == data.length - 1) data.pop();
	else splice.call(data, index, 1);
	--this.size;
	return true;
}
//#endregion
//#region node_modules/lodash-es/_listCacheGet.js
/**
* Gets the list cache value for `key`.
*
* @private
* @name get
* @memberOf ListCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function listCacheGet(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	return index < 0 ? void 0 : data[index][1];
}
//#endregion
//#region node_modules/lodash-es/_listCacheHas.js
/**
* Checks if a list cache value for `key` exists.
*
* @private
* @name has
* @memberOf ListCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function listCacheHas(key) {
	return assocIndexOf(this.__data__, key) > -1;
}
//#endregion
//#region node_modules/lodash-es/_listCacheSet.js
/**
* Sets the list cache `key` to `value`.
*
* @private
* @name set
* @memberOf ListCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the list cache instance.
*/
function listCacheSet(key, value) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) {
		++this.size;
		data.push([key, value]);
	} else data[index][1] = value;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_ListCache.js
/**
* Creates an list cache object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function ListCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
//#endregion
//#region node_modules/lodash-es/_Map.js
var Map$1 = getNative(root, "Map");
//#endregion
//#region node_modules/lodash-es/_mapCacheClear.js
/**
* Removes all key-value entries from the map.
*
* @private
* @name clear
* @memberOf MapCache
*/
function mapCacheClear() {
	this.size = 0;
	this.__data__ = {
		"hash": new Hash(),
		"map": new (Map$1 || ListCache)(),
		"string": new Hash()
	};
}
//#endregion
//#region node_modules/lodash-es/_isKeyable.js
/**
* Checks if `value` is suitable for use as unique object key.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
*/
function isKeyable(value) {
	var type = typeof value;
	return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
//#endregion
//#region node_modules/lodash-es/_getMapData.js
/**
* Gets the data for `map`.
*
* @private
* @param {Object} map The map to query.
* @param {string} key The reference key.
* @returns {*} Returns the map data.
*/
function getMapData(map, key) {
	var data = map.__data__;
	return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
//#endregion
//#region node_modules/lodash-es/_mapCacheDelete.js
/**
* Removes `key` and its value from the map.
*
* @private
* @name delete
* @memberOf MapCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function mapCacheDelete(key) {
	var result = getMapData(this, key)["delete"](key);
	this.size -= result ? 1 : 0;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_mapCacheGet.js
/**
* Gets the map value for `key`.
*
* @private
* @name get
* @memberOf MapCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function mapCacheGet(key) {
	return getMapData(this, key).get(key);
}
//#endregion
//#region node_modules/lodash-es/_mapCacheHas.js
/**
* Checks if a map value for `key` exists.
*
* @private
* @name has
* @memberOf MapCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function mapCacheHas(key) {
	return getMapData(this, key).has(key);
}
//#endregion
//#region node_modules/lodash-es/_mapCacheSet.js
/**
* Sets the map `key` to `value`.
*
* @private
* @name set
* @memberOf MapCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the map cache instance.
*/
function mapCacheSet(key, value) {
	var data = getMapData(this, key), size = data.size;
	data.set(key, value);
	this.size += data.size == size ? 0 : 1;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_MapCache.js
/**
* Creates a map cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function MapCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
//#endregion
//#region node_modules/lodash-es/_getPrototype.js
/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);
//#endregion
//#region node_modules/lodash-es/isPlainObject.js
/** `Object#toString` result references. */
var objectTag = "[object Object]";
/** Used for built-in method references. */
var funcProto = Function.prototype, objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;
/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);
/**
* Checks if `value` is a plain object, that is, an object created by the
* `Object` constructor or one with a `[[Prototype]]` of `null`.
*
* @static
* @memberOf _
* @since 0.8.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
* @example
*
* function Foo() {
*   this.a = 1;
* }
*
* _.isPlainObject(new Foo);
* // => false
*
* _.isPlainObject([1, 2, 3]);
* // => false
*
* _.isPlainObject({ 'x': 0, 'y': 0 });
* // => true
*
* _.isPlainObject(Object.create(null));
* // => true
*/
function isPlainObject(value) {
	if (!isObjectLike(value) || baseGetTag(value) != objectTag) return false;
	var proto = getPrototype(value);
	if (proto === null) return true;
	var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
	return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
//#endregion
//#region node_modules/lodash-es/_stackClear.js
/**
* Removes all key-value entries from the stack.
*
* @private
* @name clear
* @memberOf Stack
*/
function stackClear() {
	this.__data__ = new ListCache();
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_stackDelete.js
/**
* Removes `key` and its value from the stack.
*
* @private
* @name delete
* @memberOf Stack
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function stackDelete(key) {
	var data = this.__data__, result = data["delete"](key);
	this.size = data.size;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_stackGet.js
/**
* Gets the stack value for `key`.
*
* @private
* @name get
* @memberOf Stack
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function stackGet(key) {
	return this.__data__.get(key);
}
//#endregion
//#region node_modules/lodash-es/_stackHas.js
/**
* Checks if a stack value for `key` exists.
*
* @private
* @name has
* @memberOf Stack
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function stackHas(key) {
	return this.__data__.has(key);
}
//#endregion
//#region node_modules/lodash-es/_stackSet.js
/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
/**
* Sets the stack `key` to `value`.
*
* @private
* @name set
* @memberOf Stack
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the stack cache instance.
*/
function stackSet(key, value) {
	var data = this.__data__;
	if (data instanceof ListCache) {
		var pairs = data.__data__;
		if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
			pairs.push([key, value]);
			this.size = ++data.size;
			return this;
		}
		data = this.__data__ = new MapCache(pairs);
	}
	data.set(key, value);
	this.size = data.size;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_Stack.js
/**
* Creates a stack cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Stack(entries) {
	this.size = (this.__data__ = new ListCache(entries)).size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
//#endregion
//#region node_modules/lodash-es/_cloneBuffer.js
/** Detect free variable `exports`. */
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
/** Built-in value references. */
var Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
/**
* Creates a clone of  `buffer`.
*
* @private
* @param {Buffer} buffer The buffer to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Buffer} Returns the cloned buffer.
*/
function cloneBuffer(buffer, isDeep) {
	if (isDeep) return buffer.slice();
	var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	buffer.copy(result);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_Uint8Array.js
/** Built-in value references. */
var Uint8Array = root.Uint8Array;
//#endregion
//#region node_modules/lodash-es/_cloneArrayBuffer.js
/**
* Creates a clone of `arrayBuffer`.
*
* @private
* @param {ArrayBuffer} arrayBuffer The array buffer to clone.
* @returns {ArrayBuffer} Returns the cloned array buffer.
*/
function cloneArrayBuffer(arrayBuffer) {
	var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	return result;
}
//#endregion
//#region node_modules/lodash-es/_cloneTypedArray.js
/**
* Creates a clone of `typedArray`.
*
* @private
* @param {Object} typedArray The typed array to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the cloned typed array.
*/
function cloneTypedArray(typedArray, isDeep) {
	var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
//#endregion
//#region node_modules/lodash-es/_initCloneObject.js
/**
* Initializes an object clone.
*
* @private
* @param {Object} object The object to clone.
* @returns {Object} Returns the initialized clone.
*/
function initCloneObject(object) {
	return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
//#endregion
//#region node_modules/lodash-es/_createBaseFor.js
/**
* Creates a base function for methods like `_.forIn` and `_.forOwn`.
*
* @private
* @param {boolean} [fromRight] Specify iterating from right to left.
* @returns {Function} Returns the new base function.
*/
function createBaseFor(fromRight) {
	return function(object, iteratee, keysFunc) {
		var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
		while (length--) {
			var key = props[fromRight ? length : ++index];
			if (iteratee(iterable[key], key, iterable) === false) break;
		}
		return object;
	};
}
//#endregion
//#region node_modules/lodash-es/_baseFor.js
/**
* The base implementation of `baseForOwn` which iterates over `object`
* properties returned by `keysFunc` and invokes `iteratee` for each property.
* Iteratee functions may exit iteration early by explicitly returning `false`.
*
* @private
* @param {Object} object The object to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @param {Function} keysFunc The function to get the keys of `object`.
* @returns {Object} Returns `object`.
*/
var baseFor = createBaseFor();
//#endregion
//#region node_modules/lodash-es/_assignMergeValue.js
/**
* This function is like `assignValue` except that it doesn't assign
* `undefined` values.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function assignMergeValue(object, key, value) {
	if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) baseAssignValue(object, key, value);
}
//#endregion
//#region node_modules/lodash-es/isArrayLikeObject.js
/**
* This method is like `_.isArrayLike` except that it also checks if `value`
* is an object.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an array-like object,
*  else `false`.
* @example
*
* _.isArrayLikeObject([1, 2, 3]);
* // => true
*
* _.isArrayLikeObject(document.body.children);
* // => true
*
* _.isArrayLikeObject('abc');
* // => false
*
* _.isArrayLikeObject(_.noop);
* // => false
*/
function isArrayLikeObject(value) {
	return isObjectLike(value) && isArrayLike(value);
}
//#endregion
//#region node_modules/lodash-es/_safeGet.js
/**
* Gets the value at `key`, unless `key` is "__proto__" or "constructor".
*
* @private
* @param {Object} object The object to query.
* @param {string} key The key of the property to get.
* @returns {*} Returns the property value.
*/
function safeGet(object, key) {
	if (key === "constructor" && typeof object[key] === "function") return;
	if (key == "__proto__") return;
	return object[key];
}
//#endregion
//#region node_modules/lodash-es/toPlainObject.js
/**
* Converts `value` to a plain object flattening inherited enumerable string
* keyed properties of `value` to own properties of the plain object.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Lang
* @param {*} value The value to convert.
* @returns {Object} Returns the converted plain object.
* @example
*
* function Foo() {
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.assign({ 'a': 1 }, new Foo);
* // => { 'a': 1, 'b': 2 }
*
* _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
* // => { 'a': 1, 'b': 2, 'c': 3 }
*/
function toPlainObject(value) {
	return copyObject(value, keysIn(value));
}
//#endregion
//#region node_modules/lodash-es/_baseMergeDeep.js
/**
* A specialized version of `baseMerge` for arrays and objects which performs
* deep merges and tracks traversed objects enabling objects with circular
* references to be merged.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @param {string} key The key of the value to merge.
* @param {number} srcIndex The index of `source`.
* @param {Function} mergeFunc The function to merge values.
* @param {Function} [customizer] The function to customize assigned values.
* @param {Object} [stack] Tracks traversed source values and their merged
*  counterparts.
*/
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
	if (stacked) {
		assignMergeValue(object, key, stacked);
		return;
	}
	var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
	var isCommon = newValue === void 0;
	if (isCommon) {
		var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
		newValue = srcValue;
		if (isArr || isBuff || isTyped) if (isArray(objValue)) newValue = objValue;
		else if (isArrayLikeObject(objValue)) newValue = copyArray(objValue);
		else if (isBuff) {
			isCommon = false;
			newValue = cloneBuffer(srcValue, true);
		} else if (isTyped) {
			isCommon = false;
			newValue = cloneTypedArray(srcValue, true);
		} else newValue = [];
		else if (isPlainObject(srcValue) || isArguments(srcValue)) {
			newValue = objValue;
			if (isArguments(objValue)) newValue = toPlainObject(objValue);
			else if (!isObject(objValue) || isFunction(objValue)) newValue = initCloneObject(srcValue);
		} else isCommon = false;
	}
	if (isCommon) {
		stack.set(srcValue, newValue);
		mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
		stack["delete"](srcValue);
	}
	assignMergeValue(object, key, newValue);
}
//#endregion
//#region node_modules/lodash-es/_baseMerge.js
/**
* The base implementation of `_.merge` without support for multiple sources.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @param {number} srcIndex The index of `source`.
* @param {Function} [customizer] The function to customize merged values.
* @param {Object} [stack] Tracks traversed source values and their merged
*  counterparts.
*/
function baseMerge(object, source, srcIndex, customizer, stack) {
	if (object === source) return;
	baseFor(source, function(srcValue, key) {
		stack || (stack = new Stack());
		if (isObject(srcValue)) baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
		else {
			var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
			if (newValue === void 0) newValue = srcValue;
			assignMergeValue(object, key, newValue);
		}
	}, keysIn);
}
//#endregion
//#region node_modules/lodash-es/_customDefaultsMerge.js
/**
* Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
* objects into destination objects that are passed thru.
*
* @private
* @param {*} objValue The destination value.
* @param {*} srcValue The source value.
* @param {string} key The key of the property to merge.
* @param {Object} object The parent object of `objValue`.
* @param {Object} source The parent object of `srcValue`.
* @param {Object} [stack] Tracks traversed source values and their merged
*  counterparts.
* @returns {*} Returns the value to assign.
*/
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
	if (isObject(objValue) && isObject(srcValue)) {
		stack.set(srcValue, objValue);
		baseMerge(objValue, srcValue, void 0, customDefaultsMerge, stack);
		stack["delete"](srcValue);
	}
	return objValue;
}
//#endregion
//#region node_modules/lodash-es/mergeWith.js
/**
* This method is like `_.merge` except that it accepts `customizer` which
* is invoked to produce the merged values of the destination and source
* properties. If `customizer` returns `undefined`, merging is handled by the
* method instead. The `customizer` is invoked with six arguments:
* (objValue, srcValue, key, object, source, stack).
*
* **Note:** This method mutates `object`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Object
* @param {Object} object The destination object.
* @param {...Object} sources The source objects.
* @param {Function} customizer The function to customize assigned values.
* @returns {Object} Returns `object`.
* @example
*
* function customizer(objValue, srcValue) {
*   if (_.isArray(objValue)) {
*     return objValue.concat(srcValue);
*   }
* }
*
* var object = { 'a': [1], 'b': [2] };
* var other = { 'a': [3], 'b': [4] };
*
* _.mergeWith(object, other, customizer);
* // => { 'a': [1, 3], 'b': [2, 4] }
*/
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
	baseMerge(object, source, srcIndex, customizer);
});
//#endregion
//#region node_modules/lodash-es/defaultsDeep.js
/**
* This method is like `_.defaults` except that it recursively assigns
* default properties.
*
* **Note:** This method mutates `object`.
*
* @static
* @memberOf _
* @since 3.10.0
* @category Object
* @param {Object} object The destination object.
* @param {...Object} [sources] The source objects.
* @returns {Object} Returns `object`.
* @see _.defaults
* @example
*
* _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
* // => { 'a': { 'b': 2, 'c': 3 } }
*/
var defaultsDeep = baseRest(function(args) {
	args.push(void 0, customDefaultsMerge);
	return apply(mergeWith, void 0, args);
});
//#endregion
//#region node_modules/@milkdown/plugin-block/lib/index.js
function withMeta$3(plugin, meta) {
	Object.assign(plugin, { meta: {
		package: "@milkdown/plugin-block",
		...meta
	} });
	return plugin;
}
var defaultNodeFilter = (pos) => {
	if (findParent((node) => node.type.name === "table")(pos)) return false;
	return true;
};
var blockConfig = $ctx({ filterNodes: defaultNodeFilter }, "blockConfig");
withMeta$3(blockConfig, { displayName: "Ctx<blockConfig>" });
function selectRootNodeByDom(view, coords, filterNodes) {
	if (!view.dom.parentElement) return null;
	try {
		const pos = view.posAtCoords({
			left: coords.x,
			top: coords.y
		})?.inside;
		if (pos == null || pos < 0) return null;
		let $pos = view.state.doc.resolve(pos);
		let node = view.state.doc.nodeAt(pos);
		let element = view.nodeDOM(pos);
		const filter = (needLookup) => {
			const checkDepth = $pos.depth >= 1 && $pos.index($pos.depth) === 0;
			if (!(needLookup || checkDepth)) return;
			const ancestorPos = $pos.before($pos.depth);
			node = view.state.doc.nodeAt(ancestorPos);
			element = view.nodeDOM(ancestorPos);
			$pos = view.state.doc.resolve(ancestorPos);
			if (!filterNodes($pos, node)) filter(true);
		};
		filter(!filterNodes($pos, node));
		if (!element || !node) return null;
		return {
			node,
			$pos,
			el: element
		};
	} catch {
		return null;
	}
}
var brokenClipboardAPI = browser.ie && browser.ie_version < 15 || browser.ios && browser.webkit_version < 604;
var buffer = 20;
var BlockService = class {
	constructor() {
		this.#createSelection = () => {
			if (!this.#active) return null;
			const result = this.#active;
			const view = this.#view;
			if (view && NodeSelection.isSelectable(result.node)) {
				const nodeSelection = NodeSelection.create(view.state.doc, result.$pos.pos);
				view.dispatch(view.state.tr.setSelection(nodeSelection));
				view.focus();
				this.#activeSelection = nodeSelection;
				return nodeSelection;
			}
			return null;
		};
		this.#activeSelection = null;
		this.#active = null;
		this.#activeDOMRect = void 0;
		this.#dragging = false;
		this.#hide = () => {
			this.#notify?.({ type: "hide" });
			this.#active = null;
		};
		this.#show = (active) => {
			this.#active = active;
			this.#notify?.({
				type: "show",
				active
			});
		};
		this.bind = (ctx, notify) => {
			this.#ctx = ctx;
			this.#notify = notify;
		};
		this.addEvent = (dom) => {
			dom.addEventListener("mousedown", this.#handleMouseDown);
			dom.addEventListener("mouseup", this.#handleMouseUp);
			dom.addEventListener("dragstart", this.#handleDragStart);
			dom.addEventListener("dragend", this.#handleDragEnd);
		};
		this.removeEvent = (dom) => {
			dom.removeEventListener("mousedown", this.#handleMouseDown);
			dom.removeEventListener("mouseup", this.#handleMouseUp);
			dom.removeEventListener("dragstart", this.#handleDragStart);
			dom.removeEventListener("dragend", this.#handleDragEnd);
		};
		this.unBind = () => {
			this.#notify = void 0;
		};
		this.#handleMouseDown = () => {
			this.#activeDOMRect = this.#active?.el.getBoundingClientRect();
			this.#createSelection();
		};
		this.#handleMouseUp = () => {
			if (!this.#dragging) {
				requestAnimationFrame(() => {
					if (!this.#activeDOMRect) return;
					this.#view?.focus();
				});
				return;
			}
			this.#dragging = false;
			this.#activeSelection = null;
		};
		this.#handleDragStart = (event) => {
			this.#dragging = true;
			const view = this.#view;
			if (!view) return;
			view.dom.dataset.dragging = "true";
			const selection = this.#activeSelection;
			if (event.dataTransfer && selection) {
				const slice = selection.content();
				event.dataTransfer.effectAllowed = "copyMove";
				const { dom, text } = view.serializeForClipboard(slice);
				event.dataTransfer.clearData();
				event.dataTransfer.setData(brokenClipboardAPI ? "Text" : "text/html", dom.innerHTML);
				if (!brokenClipboardAPI) event.dataTransfer.setData("text/plain", text);
				const activeEl = this.#active?.el;
				if (activeEl) event.dataTransfer.setDragImage(activeEl, 0, 0);
				view.dragging = {
					slice,
					move: true
				};
			}
		};
		this.#handleDragEnd = () => {
			if (this.#view) this.#dragEnd(this.#view);
		};
		this.keydownCallback = (view) => {
			this.#hide();
			this.#dragging = false;
			view.dom.dataset.dragging = "false";
			return false;
		};
		this.#mousemoveCallback = throttle((view, event) => {
			if (!view.editable) return;
			const rect = view.dom.getBoundingClientRect();
			const x = rect.left + rect.width / 2;
			if (!(view.root.elementFromPoint(x, event.clientY) instanceof Element)) {
				this.#hide();
				return;
			}
			const filterNodes = this.#filterNodes;
			if (!filterNodes) return;
			const result = selectRootNodeByDom(view, {
				x,
				y: event.clientY
			}, filterNodes);
			if (!result) {
				this.#hide();
				return;
			}
			this.#show(result);
		}, 200);
		this.mousemoveCallback = (view, event) => {
			if (view.composing || !view.editable) return false;
			this.#mousemoveCallback(view, event);
			return false;
		};
		this.dragoverCallback = (view, event) => {
			if (this.#dragging) {
				const root = this.#view?.dom.parentElement;
				if (!root) return false;
				const hasHorizontalScrollbar = root.scrollHeight > root.clientHeight;
				const rootRect = root.getBoundingClientRect();
				if (hasHorizontalScrollbar) {
					if (root.scrollTop > 0 && Math.abs(event.y - rootRect.y) < buffer) {
						root.scrollTop = root.scrollTop > 10 ? root.scrollTop - 10 : 0;
						return false;
					}
					const totalHeight = Math.round(view.dom.getBoundingClientRect().height);
					if (Math.round(root.scrollTop + rootRect.height) < totalHeight && Math.abs(event.y - (rootRect.height + rootRect.y)) < buffer) {
						root.scrollTop = root.scrollTop + 10;
						return false;
					}
				}
			}
			return false;
		};
		this.dragenterCallback = (view) => {
			if (!view.dragging) return;
			this.#dragging = true;
			view.dom.dataset.dragging = "true";
		};
		this.dragleaveCallback = (view, event) => {
			const x = event.clientX;
			const y = event.clientY;
			if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
				this.#active = null;
				this.#dragEnd(view);
			}
		};
		this.dropCallback = (view) => {
			this.#dragEnd(view);
			return false;
		};
		this.dragendCallback = (view) => {
			this.#dragEnd(view);
		};
		this.#dragEnd = (view) => {
			this.#dragging = false;
			view.dom.dataset.dragging = "false";
		};
	}
	#ctx;
	#createSelection;
	#activeSelection;
	#active;
	#activeDOMRect;
	#dragging;
	get #filterNodes() {
		try {
			return this.#ctx?.get(blockConfig.key).filterNodes;
		} catch {
			return;
		}
	}
	get #view() {
		return this.#ctx?.get(editorViewCtx);
	}
	#notify;
	#hide;
	#show;
	#handleMouseDown;
	#handleMouseUp;
	#handleDragStart;
	#handleDragEnd;
	#mousemoveCallback;
	#dragEnd;
};
var blockService = $ctx(() => new BlockService(), "blockService");
var blockServiceInstance = $ctx({}, "blockServiceInstance");
withMeta$3(blockService, { displayName: "Ctx<blockService>" });
withMeta$3(blockServiceInstance, { displayName: "Ctx<blockServiceInstance>" });
var blockSpec = $ctx({}, "blockSpec");
withMeta$3(blockSpec, { displayName: "Ctx<blockSpec>" });
var blockPlugin = $prose((ctx) => {
	const milkdownPluginBlockKey = new PluginKey("MILKDOWN_BLOCK");
	const service = ctx.get(blockService.key)();
	ctx.set(blockServiceInstance.key, service);
	const spec = ctx.get(blockSpec.key);
	return new Plugin({
		key: milkdownPluginBlockKey,
		...spec,
		props: {
			...spec.props,
			handleDOMEvents: {
				drop: (view) => {
					return service.dropCallback(view);
				},
				pointermove: (view, event) => {
					return service.mousemoveCallback(view, event);
				},
				keydown: (view) => {
					return service.keydownCallback(view);
				},
				dragover: (view, event) => {
					return service.dragoverCallback(view, event);
				},
				dragleave: (view, event) => {
					return service.dragleaveCallback(view, event);
				},
				dragenter: (view) => {
					return service.dragenterCallback(view);
				},
				dragend: (view) => {
					return service.dragendCallback(view);
				}
			}
		}
	});
});
withMeta$3(blockPlugin, { displayName: "Prose<block>" });
var BlockProvider = class {
	constructor(options) {
		this.#activeNode = null;
		this.#initialized = false;
		this.update = () => {
			requestAnimationFrame(() => {
				if (!this.#initialized) try {
					this.#init();
					this.#initialized = true;
				} catch {}
			});
		};
		this.destroy = () => {
			this.#service?.unBind();
			this.#service?.removeEvent(this.#element);
			this.#element.remove();
		};
		this.show = (active) => {
			const dom = active.el;
			const editorDom = this.#ctx.get(editorViewCtx).dom;
			const deriveContext = {
				ctx: this.#ctx,
				active,
				editorDom,
				blockDom: this.#element
			};
			const virtualEl = {
				contextElement: dom,
				getBoundingClientRect: () => {
					if (this.#getPosition) return this.#getPosition(deriveContext);
					return dom.getBoundingClientRect();
				}
			};
			const middleware = [flip()];
			if (this.#getOffset) {
				const offsetExt = offset(this.#getOffset(deriveContext));
				middleware.push(offsetExt);
			}
			computePosition(virtualEl, this.#element, {
				placement: this.#getPlacement ? this.#getPlacement(deriveContext) : "left",
				middleware: [...middleware, ...this.#middleware],
				...this.#floatingUIOptions
			}).then(({ x, y }) => {
				Object.assign(this.#element.style, {
					left: `${x}px`,
					top: `${y}px`
				});
				this.#element.dataset.show = "true";
			}).catch(console.error);
		};
		this.hide = () => {
			this.#element.dataset.show = "false";
		};
		this.#ctx = options.ctx;
		this.#element = options.content;
		this.#getOffset = options.getOffset;
		this.#getPosition = options.getPosition;
		this.#getPlacement = options.getPlacement;
		this.#middleware = options.middleware ?? [];
		this.#floatingUIOptions = options.floatingUIOptions ?? {};
		this.#root = options.root;
		this.hide();
	}
	#element;
	#ctx;
	#service;
	#activeNode;
	#root;
	#initialized;
	#middleware;
	#floatingUIOptions;
	#getOffset;
	#getPosition;
	#getPlacement;
	get active() {
		return this.#activeNode;
	}
	#init() {
		const view = this.#ctx.get(editorViewCtx);
		(this.#root ?? view.dom.parentElement ?? document.body).appendChild(this.#element);
		const service = this.#ctx.get(blockServiceInstance.key);
		service.bind(this.#ctx, (message) => {
			if (message.type === "hide") {
				this.hide();
				this.#activeNode = null;
			} else if (message.type === "show") {
				this.show(message.active);
				this.#activeNode = message.active;
			}
		});
		this.#service = service;
		this.#service.addEvent(this.#element);
		this.#element.draggable = true;
	}
};
var block = [
	blockSpec,
	blockConfig,
	blockService,
	blockServiceInstance,
	blockPlugin
];
block.key = blockSpec.key;
block.pluginKey = blockPlugin.key;
//#endregion
//#region node_modules/@milkdown/plugin-slash/lib/index.js
function slashFactory(id) {
	const slashSpec = $ctx({}, `${id}_SLASH_SPEC`);
	const slashPlugin = $prose((ctx) => {
		const spec = ctx.get(slashSpec.key);
		return new Plugin({
			key: new PluginKey(`${id}_SLASH`),
			...spec
		});
	});
	const result = [slashSpec, slashPlugin];
	result.key = slashSpec.key;
	result.pluginKey = slashPlugin.key;
	slashSpec.meta = {
		package: "@milkdown/plugin-slash",
		displayName: `Ctx<slashSpec>|${id}`
	};
	slashPlugin.meta = {
		package: "@milkdown/plugin-slash",
		displayName: `Prose<slash>|${id}`
	};
	return result;
}
var SlashProvider = class {
	constructor(options) {
		this.#initialized = false;
		this.onShow = () => {};
		this.onHide = () => {};
		this.#onUpdate = (view, prevState) => {
			const { state, composing } = view;
			const { selection, doc } = state;
			const { ranges } = selection;
			const from = Math.min(...ranges.map((range) => range.$from.pos));
			const to = Math.max(...ranges.map((range) => range.$to.pos));
			const isSame = prevState && prevState.doc.eq(doc) && prevState.selection.eq(selection);
			if (!this.#initialized) {
				(this.#root ?? view.dom.parentElement ?? document.body).appendChild(this.element);
				this.#initialized = true;
			}
			if (composing || isSame) return;
			if (!this.#shouldShow(view, prevState)) {
				this.hide();
				return;
			}
			computePosition({ getBoundingClientRect: () => posToDOMRect(view, from, to) }, this.element, {
				placement: "bottom-start",
				middleware: [
					flip(),
					offset(this.#offset),
					...this.#middleware
				],
				...this.#floatingUIOptions
			}).then(({ x, y }) => {
				Object.assign(this.element.style, {
					left: `${x}px`,
					top: `${y}px`
				});
			}).catch(console.error);
			this.show();
		};
		this.update = (view, prevState) => {
			this.#updater(view, prevState);
		};
		this.getContent = (view, matchNode = (node) => node.type.name === "paragraph") => {
			const { selection } = view.state;
			const { empty, $from } = selection;
			const isTextBlock = view.state.selection instanceof TextSelection;
			if (typeof document === "undefined") return;
			const isSlashChildren = this.element.contains(document.activeElement);
			const notHasFocus = !view.hasFocus() && !isSlashChildren;
			const isReadonly = !view.editable;
			const isNotInParagraph = !findParentNode(matchNode)(view.state.selection);
			if (notHasFocus || isReadonly || !empty || !isTextBlock || isNotInParagraph) return;
			return $from.parent.textBetween(Math.max(0, $from.parentOffset - 500), $from.parentOffset, void 0, "￼");
		};
		this.destroy = () => {
			this.#updater.cancel();
		};
		this.show = () => {
			this.element.dataset.show = "true";
			this.onShow();
		};
		this.hide = () => {
			this.element.dataset.show = "false";
			this.onHide();
		};
		this.element = options.content;
		this.#debounce = options.debounce ?? 200;
		this.#shouldShow = options.shouldShow ?? this.#_shouldShow;
		this.#trigger = options.trigger ?? "/";
		this.#offset = options.offset;
		this.#middleware = options.middleware ?? [];
		this.#floatingUIOptions = options.floatingUIOptions ?? {};
		this.#root = options.root;
		this.#updater = debounce(this.#onUpdate, this.#debounce);
	}
	#initialized;
	#middleware;
	#floatingUIOptions;
	#root;
	#debounce;
	#trigger;
	#shouldShow;
	#updater;
	#offset;
	#onUpdate;
	#_shouldShow(view) {
		const currentTextBlockContent = this.getContent(view);
		if (!currentTextBlockContent) return false;
		const target = currentTextBlockContent.at(-1);
		if (!target) return false;
		return Array.isArray(this.#trigger) ? this.#trigger.includes(target) : this.#trigger === target;
	}
};
//#endregion
//#region node_modules/codemirror/dist/index.js
/**
This is an extension value that just pulls together a number of
extensions that you might want in a basic editor. It is meant as a
convenient helper to quickly set up CodeMirror without installing
and importing a lot of separate packages.

Specifically, it includes...

- [the default command bindings](https://codemirror.net/6/docs/ref/#commands.defaultKeymap)
- [line numbers](https://codemirror.net/6/docs/ref/#view.lineNumbers)
- [special character highlighting](https://codemirror.net/6/docs/ref/#view.highlightSpecialChars)
- [the undo history](https://codemirror.net/6/docs/ref/#commands.history)
- [a fold gutter](https://codemirror.net/6/docs/ref/#language.foldGutter)
- [custom selection drawing](https://codemirror.net/6/docs/ref/#view.drawSelection)
- [drop cursor](https://codemirror.net/6/docs/ref/#view.dropCursor)
- [multiple selections](https://codemirror.net/6/docs/ref/#state.EditorState^allowMultipleSelections)
- [reindentation on input](https://codemirror.net/6/docs/ref/#language.indentOnInput)
- [the default highlight style](https://codemirror.net/6/docs/ref/#language.defaultHighlightStyle) (as fallback)
- [bracket matching](https://codemirror.net/6/docs/ref/#language.bracketMatching)
- [bracket closing](https://codemirror.net/6/docs/ref/#autocomplete.closeBrackets)
- [autocompletion](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion)
- [rectangular selection](https://codemirror.net/6/docs/ref/#view.rectangularSelection) and [crosshair cursor](https://codemirror.net/6/docs/ref/#view.crosshairCursor)
- [active line highlighting](https://codemirror.net/6/docs/ref/#view.highlightActiveLine)
- [active line gutter highlighting](https://codemirror.net/6/docs/ref/#view.highlightActiveLineGutter)
- [selection match highlighting](https://codemirror.net/6/docs/ref/#search.highlightSelectionMatches)
- [search](https://codemirror.net/6/docs/ref/#search.searchKeymap)
- [linting](https://codemirror.net/6/docs/ref/#lint.lintKeymap)

(You'll probably want to add some language package to your setup
too.)

This extension does not allow customization. The idea is that,
once you decide you want to configure your editor more precisely,
you take this package's source (which is just a bunch of imports
and an array literal), copy it into your own code, and adjust it
as desired.
*/
var basicSetup = [
	lineNumbers(),
	highlightActiveLineGutter(),
	highlightSpecialChars(),
	history$2(),
	foldGutter(),
	drawSelection(),
	dropCursor(),
	EditorState$1.allowMultipleSelections.of(true),
	indentOnInput(),
	syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
	bracketMatching(),
	closeBrackets(),
	autocompletion(),
	rectangularSelection(),
	crosshairCursor(),
	highlightActiveLine(),
	highlightSelectionMatches(),
	keymap$1.of([
		...closeBracketsKeymap,
		...defaultKeymap,
		...searchKeymap,
		...historyKeymap$1,
		...foldKeymap,
		...completionKeymap,
		...lintKeymap
	])
];
highlightSpecialChars(), history$2(), drawSelection(), syntaxHighlighting(defaultHighlightStyle, { fallback: true }), keymap$1.of([...defaultKeymap, ...historyKeymap$1]);
//#endregion
//#region node_modules/@ocavue/utils/dist/index.js
function isElement(node) {
	return node.nodeType === 1;
}
function isHTMLElement(node) {
	return isElement(node) && node.namespaceURI === "http://www.w3.org/1999/xhtml";
}
//#endregion
//#region node_modules/prosemirror-drop-indicator/dist/index.js
function getTargetsByView(view) {
	let stack = [[-1, view.state.doc]];
	let targets = [];
	while (stack.length > 0) {
		const [pos, node] = stack.pop();
		if (pos >= 0) {
			let dom = view.nodeDOM(pos);
			if (dom && isHTMLElement(dom)) {
				let { top, bottom, left: x1, right: x2 } = dom.getBoundingClientRect();
				targets.push([pos, [
					x1,
					top,
					x2,
					top
				]], [pos + node.nodeSize, [
					x1,
					bottom,
					x2,
					bottom
				]]);
			}
		}
		if (node.isBlock && !node.isTextblock) {
			let childPos = pos + 1;
			for (let child of node.children) {
				stack.push([childPos, child]);
				childPos += child.nodeSize;
			}
		}
	}
	return targets;
}
/**
* @internal
*/
function buildGetTarget(view, onDrag) {
	let prevTargets = [];
	let prevDoc;
	let prevRect;
	const getTargets = () => {
		const rect = view.dom.getBoundingClientRect();
		const doc = view.state.doc;
		if (prevTargets && prevDoc && prevRect && rect.width === prevRect.width && rect.height === prevRect.height && rect.x === prevRect.x && rect.y === prevRect.y && prevDoc.eq(doc)) return prevTargets;
		prevRect = rect;
		prevDoc = doc;
		prevTargets = getTargetsByView(view);
		return prevTargets;
	};
	const getTargetImpl = (point, event) => {
		if (!view.editable || view.isDestroyed) return;
		const compare = (p1, p2) => {
			const [pos1, line1] = p1;
			const [pos2, line2] = p2;
			return pointLineDistance(point, line1) - pointLineDistance(point, line2) || pos1 - pos2;
		};
		let targets = getTargets();
		targets.sort(compare);
		targets = targets.slice(0, 8);
		const target = targets.find((target$1) => onDrag?.({
			view,
			pos: target$1[0],
			event
		}) !== false);
		if (target && isDraggingToItself(view, target[0])) return;
		return target;
	};
	let prevPoint;
	let prevTarget;
	const getTargetCached = (point, event) => {
		if (prevPoint && pointEqual(prevPoint, point)) return prevTarget;
		prevPoint = point;
		prevTarget = getTargetImpl(point, event);
		return prevTarget;
	};
	return getTargetCached;
}
function pointEqual(a, b) {
	return a[0] === b[0] && a[1] === b[1];
}
function pointPointDistance(a, b) {
	return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
function pointLineDistance(point, line) {
	return Math.min(pointPointDistance(point, [line[0], line[1]]), pointPointDistance(point, [line[2], line[3]]));
}
/**
* Whether the dragging node is being dragged to the same position. For example,
* dragging a list node into a new position that is just below the list node, or
* dragging a nested quoteblock into itself.
*/
function isDraggingToItself(view, pos) {
	const dragging = view.dragging;
	if (!dragging) return;
	const { move } = dragging;
	if (!move) return;
	const selection = view.state.selection;
	if (!(selection instanceof NodeSelection)) return;
	const { from, to } = selection;
	return from <= pos && pos <= to;
}
/**
* @public
*
* @param options - The options for the drop indicator plugin.
*/
function createDropIndicatorPlugin(options) {
	let getTarget;
	return new Plugin({
		key: new PluginKey("prosekit-drop-indicator"),
		view: (view) => {
			getTarget = buildGetTarget(view, options.onDrag);
			return createDropIndicatorView(view, getTarget, options);
		},
		props: { handleDrop(view, event, slice, move) {
			if (!getTarget) return false;
			const target = getTarget([event.clientX, event.clientY], event);
			if (!target) return false;
			event.preventDefault();
			let insertPos = target[0];
			let tr = view.state.tr;
			if (move) {
				let { node } = view.dragging || {};
				if (node) node.replace(tr);
				else tr.deleteSelection();
			}
			let pos = tr.mapping.map(insertPos);
			let isNode = slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1;
			let beforeInsert = tr.doc;
			if (isNode) tr.replaceRangeWith(pos, pos, slice.content.firstChild);
			else tr.replaceRange(pos, pos, slice);
			if (tr.doc.eq(beforeInsert)) return true;
			let $pos = tr.doc.resolve(pos);
			if (isNode && NodeSelection.isSelectable(slice.content.firstChild) && $pos.nodeAfter && $pos.nodeAfter.sameMarkup(slice.content.firstChild)) tr.setSelection(new NodeSelection($pos));
			else {
				let end = tr.mapping.map(insertPos);
				tr.mapping.maps[tr.mapping.maps.length - 1].forEach((_from, _to, _newFrom, newTo) => end = newTo);
				tr.setSelection(selectionBetween(view, $pos, tr.doc.resolve(end)));
			}
			view.focus();
			view.dispatch(tr.setMeta("uiEvent", "drop"));
			return true;
		} }
	});
}
function selectionBetween(view, $anchor, $head, bias) {
	return view.someProp("createSelectionBetween", (f) => f(view, $anchor, $head)) || TextSelection.between($anchor, $head, bias);
}
function createDropIndicatorView(view, getTarget, options) {
	let dom = view.dom;
	let hideId;
	let prevX;
	let prevY;
	let hasDragOverEvent = false;
	const scheduleHide = () => {
		if (hideId) clearTimeout(hideId);
		hasDragOverEvent = false;
		hideId = setTimeout(() => {
			if (hasDragOverEvent) return;
			options.onHide?.();
		}, 30);
	};
	const handleDragOver = (event) => {
		hasDragOverEvent = true;
		const { clientX, clientY } = event;
		if (prevX === clientX && prevY === clientY) return;
		prevX = clientX;
		prevY = clientY;
		let target = getTarget([clientX, clientY], event);
		if (!target) {
			scheduleHide();
			return;
		} else {
			const [pos, [x1, y1, x2, y2]] = target;
			const line = {
				p1: {
					x: x1,
					y: y1
				},
				p2: {
					x: x2,
					y: y2
				}
			};
			options.onShow?.({
				view,
				pos,
				line
			});
		}
	};
	dom.addEventListener("dragover", handleDragOver);
	dom.addEventListener("dragend", scheduleHide);
	dom.addEventListener("drop", scheduleHide);
	dom.addEventListener("dragleave", scheduleHide);
	const destroy = () => {
		dom.removeEventListener("dragover", handleDragOver);
		dom.removeEventListener("dragend", scheduleHide);
		dom.removeEventListener("drop", scheduleHide);
		dom.removeEventListener("dragleave", scheduleHide);
	};
	return { destroy };
}
//#endregion
//#region node_modules/prosemirror-gapcursor/dist/index.js
/**
Gap cursor selections are represented using this class. Its
`$anchor` and `$head` properties both point at the cursor position.
*/
var GapCursor = class GapCursor extends Selection {
	/**
	Create a gap cursor.
	*/
	constructor($pos) {
		super($pos, $pos);
	}
	map(doc, mapping) {
		let $pos = doc.resolve(mapping.map(this.head));
		return GapCursor.valid($pos) ? new GapCursor($pos) : Selection.near($pos);
	}
	content() {
		return Slice.empty;
	}
	eq(other) {
		return other instanceof GapCursor && other.head == this.head;
	}
	toJSON() {
		return {
			type: "gapcursor",
			pos: this.head
		};
	}
	/**
	@internal
	*/
	static fromJSON(doc, json) {
		if (typeof json.pos != "number") throw new RangeError("Invalid input for GapCursor.fromJSON");
		return new GapCursor(doc.resolve(json.pos));
	}
	/**
	@internal
	*/
	getBookmark() {
		return new GapBookmark(this.anchor);
	}
	/**
	@internal
	*/
	static valid($pos) {
		let parent = $pos.parent;
		if (parent.isTextblock || !closedBefore($pos) || !closedAfter($pos)) return false;
		let override = parent.type.spec.allowGapCursor;
		if (override != null) return override;
		let deflt = parent.contentMatchAt($pos.index()).defaultType;
		return deflt && deflt.isTextblock;
	}
	/**
	@internal
	*/
	static findGapCursorFrom($pos, dir, mustMove = false) {
		search: for (;;) {
			if (!mustMove && GapCursor.valid($pos)) return $pos;
			let pos = $pos.pos, next = null;
			for (let d = $pos.depth;; d--) {
				let parent = $pos.node(d);
				if (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0) {
					next = parent.child(dir > 0 ? $pos.indexAfter(d) : $pos.index(d) - 1);
					break;
				} else if (d == 0) return null;
				pos += dir;
				let $cur = $pos.doc.resolve(pos);
				if (GapCursor.valid($cur)) return $cur;
			}
			for (;;) {
				let inside = dir > 0 ? next.firstChild : next.lastChild;
				if (!inside) {
					if (next.isAtom && !next.isText && !NodeSelection.isSelectable(next)) {
						$pos = $pos.doc.resolve(pos + next.nodeSize * dir);
						mustMove = false;
						continue search;
					}
					break;
				}
				next = inside;
				pos += dir;
				let $cur = $pos.doc.resolve(pos);
				if (GapCursor.valid($cur)) return $cur;
			}
			return null;
		}
	}
};
GapCursor.prototype.visible = false;
GapCursor.findFrom = GapCursor.findGapCursorFrom;
Selection.jsonID("gapcursor", GapCursor);
var GapBookmark = class GapBookmark {
	constructor(pos) {
		this.pos = pos;
	}
	map(mapping) {
		return new GapBookmark(mapping.map(this.pos));
	}
	resolve(doc) {
		let $pos = doc.resolve(this.pos);
		return GapCursor.valid($pos) ? new GapCursor($pos) : Selection.near($pos);
	}
};
function needsGap(type) {
	return type.isAtom || type.spec.isolating || type.spec.createGapCursor;
}
function closedBefore($pos) {
	for (let d = $pos.depth; d >= 0; d--) {
		let index = $pos.index(d), parent = $pos.node(d);
		if (index == 0) {
			if (parent.type.spec.isolating) return true;
			continue;
		}
		for (let before = parent.child(index - 1);; before = before.lastChild) {
			if (before.childCount == 0 && !before.inlineContent || needsGap(before.type)) return true;
			if (before.inlineContent) return false;
		}
	}
	return true;
}
function closedAfter($pos) {
	for (let d = $pos.depth; d >= 0; d--) {
		let index = $pos.indexAfter(d), parent = $pos.node(d);
		if (index == parent.childCount) {
			if (parent.type.spec.isolating) return true;
			continue;
		}
		for (let after = parent.child(index);; after = after.firstChild) {
			if (after.childCount == 0 && !after.inlineContent || needsGap(after.type)) return true;
			if (after.inlineContent) return false;
		}
	}
	return true;
}
/**
Create a gap cursor plugin. When enabled, this will capture clicks
near and arrow-key-motion past places that don't have a normally
selectable position nearby, and create a gap cursor selection for
them. The cursor is drawn as an element with class
`ProseMirror-gapcursor`. You can either include
`style/gapcursor.css` from the package's directory or add your own
styles to make it visible.
*/
function gapCursor() {
	return new Plugin({ props: {
		decorations: drawGapCursor,
		createSelectionBetween(_view, $anchor, $head) {
			return $anchor.pos == $head.pos && GapCursor.valid($head) ? new GapCursor($head) : null;
		},
		handleClick,
		handleKeyDown,
		handleDOMEvents: { beforeinput }
	} });
}
var handleKeyDown = keydownHandler({
	"ArrowLeft": arrow("horiz", -1),
	"ArrowRight": arrow("horiz", 1),
	"ArrowUp": arrow("vert", -1),
	"ArrowDown": arrow("vert", 1)
});
function arrow(axis, dir) {
	const dirStr = axis == "vert" ? dir > 0 ? "down" : "up" : dir > 0 ? "right" : "left";
	return function(state, dispatch, view) {
		let sel = state.selection;
		let $start = dir > 0 ? sel.$to : sel.$from, mustMove = sel.empty;
		if (sel instanceof TextSelection) {
			if (!view.endOfTextblock(dirStr) || $start.depth == 0) return false;
			mustMove = false;
			$start = state.doc.resolve(dir > 0 ? $start.after() : $start.before());
		}
		let $found = GapCursor.findGapCursorFrom($start, dir, mustMove);
		if (!$found) return false;
		if (dispatch) dispatch(state.tr.setSelection(new GapCursor($found)));
		return true;
	};
}
function handleClick(view, pos, event) {
	if (!view || !view.editable) return false;
	let $pos = view.state.doc.resolve(pos);
	if (!GapCursor.valid($pos)) return false;
	let clickPos = view.posAtCoords({
		left: event.clientX,
		top: event.clientY
	});
	if (clickPos && clickPos.inside > -1 && NodeSelection.isSelectable(view.state.doc.nodeAt(clickPos.inside))) return false;
	view.dispatch(view.state.tr.setSelection(new GapCursor($pos)));
	return true;
}
function beforeinput(view, event) {
	if (event.inputType != "insertCompositionText" || !(view.state.selection instanceof GapCursor)) return false;
	let { $from } = view.state.selection;
	let insert = $from.parent.contentMatchAt($from.index()).findWrapping(view.state.schema.nodes.text);
	if (!insert) return false;
	let frag = Fragment$1.empty;
	for (let i = insert.length - 1; i >= 0; i--) frag = Fragment$1.from(insert[i].createAndFill(null, frag));
	let tr = view.state.tr.replace($from.pos, $from.pos, new Slice(frag, 0, 0));
	tr.setSelection(TextSelection.near(tr.doc.resolve($from.pos + 1)));
	view.dispatch(tr);
	return false;
}
function drawGapCursor(state) {
	if (!(state.selection instanceof GapCursor)) return null;
	let node = document.createElement("div");
	node.className = "ProseMirror-gapcursor";
	return DecorationSet.create(state.doc, [Decoration.widget(state.selection.head, node, { key: "gapcursor" })]);
}
//#endregion
//#region node_modules/@milkdown/plugin-cursor/lib/index.js
function withMeta$2(plugin, meta) {
	Object.assign(plugin, { meta: {
		package: "@milkdown/plugin-cursor",
		...meta
	} });
	return plugin;
}
var dropIndicatorState = $ctx(null, "dropIndicatorState");
withMeta$2(dropIndicatorState, { displayName: "Ctx<dropIndicatorState>" });
var dropIndicatorConfig = $ctx({
	width: 2,
	color: false,
	class: "milkdown-drop-indicator"
}, "dropIndicatorConfig");
withMeta$2(dropIndicatorConfig, { displayName: "Ctx<dropIndicatorConfig>" });
var key$2 = new PluginKey("MILKDOWN_DROP_INDICATOR_DOM");
var dropIndicatorDOMPlugin = $prose((ctx) => new Plugin({
	key: key$2,
	view: (view) => {
		const config = ctx.get(dropIndicatorConfig.key);
		const dom = document.createElement("div");
		Object.assign(dom.style, {
			position: "fixed",
			pointerEvents: "none",
			display: "none",
			backgroundColor: config.color,
			top: "0",
			left: "0"
		});
		dom.classList.add(config.class);
		dom.classList.add("milkdown-drop-indicator");
		view.dom.parentNode?.appendChild(dom);
		const stateSlice = ctx.use(dropIndicatorState.key);
		const onUpdate = (state) => {
			renderIndicator(dom, state, config);
		};
		stateSlice.on(onUpdate);
		return { destroy: () => {
			stateSlice.off(onUpdate);
			dom.remove();
		} };
	}
}));
withMeta$2(dropIndicatorDOMPlugin, { displayName: "Prose<dropIndicatorDOM>" });
function renderIndicator(dom, state, config) {
	if (!state) {
		Object.assign(dom.style, { display: "none" });
		return;
	}
	const { line } = state;
	const { width: lineWidth } = config;
	const { p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } } = line;
	const horizontal = y1 === y2;
	let width;
	let height;
	let top = y1;
	let left = x1;
	if (horizontal) {
		width = x2 - x1;
		height = lineWidth;
		top -= lineWidth / 2;
	} else {
		width = lineWidth;
		height = y2 - y1;
		left -= lineWidth / 2;
	}
	top = Math.round(top);
	left = Math.round(left);
	Object.assign(dom.style, {
		display: "block",
		width: `${width}px`,
		height: `${height}px`,
		transform: `translate(${left}px, ${top}px)`
	});
}
var dropIndicatorPlugin = $prose((ctx) => {
	const onShow = (options) => {
		ctx.set(dropIndicatorState.key, options);
	};
	const onHide = () => {
		ctx.set(dropIndicatorState.key, null);
	};
	return createDropIndicatorPlugin({
		onShow,
		onHide,
		onDrag: () => true
	});
});
withMeta$2(dropIndicatorPlugin, { displayName: "Prose<dropIndicator>" });
var gapCursorPlugin = $prose(() => gapCursor());
withMeta$2(gapCursorPlugin, { displayName: "Prose<gapCursor>" });
var cursor$1 = [
	gapCursorPlugin,
	dropIndicatorConfig,
	dropIndicatorState,
	dropIndicatorDOMPlugin,
	dropIndicatorPlugin
].flat();
//#endregion
//#region node_modules/prosemirror-virtual-cursor/dist/index.js
function createVirtualCursor(options) {
	var _a;
	const skipWarning = (_a = options == null ? void 0 : options.skipWarning) != null ? _a : false;
	let _cursor = typeof document === "undefined" ? null : document.createElement("div");
	return new Plugin({
		key: key$1,
		view: (view) => {
			if (skipWarning !== true) checkInclusive(view.state.schema, skipWarning || []);
			const doc = view.dom.ownerDocument;
			_cursor = _cursor || document.createElement("div");
			const cursor = _cursor;
			const update = () => {
				updateCursor(view, cursor);
			};
			let observer;
			if (window.ResizeObserver) {
				observer = new window.ResizeObserver(() => update());
				observer.observe(view.dom);
			}
			doc.addEventListener("selectionchange", update);
			return {
				update: () => {
					update();
				},
				destroy: () => {
					doc.removeEventListener("selectionchange", update);
					if (observer) observer.unobserve(view.dom);
				}
			};
		},
		props: {
			handleKeyDown: (view, event) => {
				var _a2;
				const { selection } = view.state;
				if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.isComposing || !["ArrowLeft", "ArrowRight"].includes(event.key) || !isTextSelection(selection) || !selection.empty) return false;
				const $pos = selection.$head;
				const [marksBefore, marksAfter] = getMarksAround($pos);
				const marks = view.state.storedMarks || $pos.marks();
				if (marksBefore && marksAfter && !Mark.sameSet(marksBefore, marksAfter)) {
					if (event.key === "ArrowLeft" && !Mark.sameSet(marksBefore, marks)) {
						view.dispatch(view.state.tr.setStoredMarks(marksBefore));
						return true;
					}
					if (event.key === "ArrowRight" && !Mark.sameSet(marksAfter, marks)) {
						view.dispatch(view.state.tr.setStoredMarks(marksAfter));
						return true;
					}
				}
				if (event.key === "ArrowLeft" && $pos.textOffset === 1) {
					view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, $pos.pos - 1)).setStoredMarks($pos.marks()));
					return true;
				}
				if (event.key === "ArrowRight" && $pos.textOffset + 1 === ((_a2 = $pos.parent.maybeChild($pos.index())) == null ? void 0 : _a2.nodeSize)) {
					view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, $pos.pos + 1)).setStoredMarks($pos.marks()));
					return true;
				}
				return false;
			},
			decorations: (state) => {
				if (!_cursor || !isTextSelection(state.selection) || !state.selection.empty) return;
				return DecorationSet.create(state.doc, [Decoration.widget(0, _cursor, { key: "prosemirror-virtual-cursor" })]);
			},
			attributes: { class: "virtual-cursor-enabled" }
		}
	});
}
var key$1 = new PluginKey("prosemirror-virtual-cursor");
function getCursorRect(view, toStart) {
	var _a;
	const selection = window.getSelection();
	if (!selection || !selection.rangeCount) return null;
	const range = (_a = selection == null ? void 0 : selection.getRangeAt(0)) == null ? void 0 : _a.cloneRange();
	if (!range) return null;
	range.collapse(toStart);
	const rects = range.getClientRects();
	const rect = (rects == null ? void 0 : rects.length) ? rects[rects.length - 1] : null;
	if (rect == null ? void 0 : rect.height) return rect;
	return view.coordsAtPos(view.state.selection.head);
}
function getMarksAround($pos) {
	const index = $pos.index();
	const after = $pos.parent.maybeChild(index);
	let before = $pos.textOffset ? after : null;
	if (!before && index > 0) before = $pos.parent.maybeChild(index - 1);
	return [before == null ? void 0 : before.marks, after == null ? void 0 : after.marks];
}
function isTextSelection(selection) {
	return selection && typeof selection === "object" && "$cursor" in selection;
}
function updateCursor(view, cursor) {
	if (!view || !view.dom || view.isDestroyed || !cursor) return;
	const { state, dom } = view;
	const { selection } = state;
	if (!isTextSelection(selection)) return;
	const cursorRect = getCursorRect(view, selection.$head === selection.$from);
	if (!cursorRect) return cursor;
	const editorRect = dom.getBoundingClientRect();
	let className = "prosemirror-virtual-cursor";
	const $pos = state.selection.$head;
	const [marksBefore, marksAfter] = getMarksAround($pos);
	const marks = state.storedMarks || $pos.marks();
	if (selection.$cursor && marksBefore && marksAfter && marks && !Mark.sameSet(marksBefore, marksAfter)) {
		if (Mark.sameSet(marksBefore, marks)) className += " prosemirror-virtual-cursor-left";
		else if (Mark.sameSet(marksAfter, marks)) className += " prosemirror-virtual-cursor-right";
	}
	cursor.className = className;
	restartAnimation(cursor, "prosemirror-virtual-cursor-animation");
	cursor.style.height = `${cursorRect.bottom - cursorRect.top}px`;
	cursor.style.left = `${cursorRect.left - editorRect.left}px`;
	cursor.style.top = `${cursorRect.top - editorRect.top}px`;
}
function restartAnimation(element, className) {
	element.classList.remove(className);
	element.offsetWidth;
	element.classList.add(className);
}
function checkInclusive(schema, skipWarning) {
	for (const [mark, type] of Object.entries(schema.marks)) if (type.spec.inclusive === false && !skipWarning.includes(mark)) console.warn(`[prosemirror-virtual-cursor] Virtual cursor does not work well with marks that have inclusive set to false. Please consider removing the inclusive option from the "${mark}" mark or adding it to the "skipWarning" option.`);
}
//#endregion
//#region node_modules/katex/dist/katex.mjs
/**
* This is the ParseError class, which is the main error thrown by KaTeX
* functions when something has gone wrong. This is used to distinguish internal
* errors from errors in the expression that the user provided.
*
* If possible, a caller should provide a Token or ParseNode with information
* about where in the source string the problem occurred.
*/
var ParseError = class ParseError extends Error {
	constructor(message, token) {
		var error = "KaTeX parse error: " + message;
		var start;
		var end;
		var loc = token && token.loc;
		if (loc && loc.start <= loc.end) {
			var input = loc.lexer.input;
			start = loc.start;
			end = loc.end;
			if (start === input.length) error += " at end of input: ";
			else error += " at position " + (start + 1) + ": ";
			var underlined = input.slice(start, end).replace(/[^]/g, "$&̲");
			var left;
			if (start > 15) left = "…" + input.slice(start - 15, start);
			else left = input.slice(0, start);
			var right;
			if (end + 15 < input.length) right = input.slice(end, end + 15) + "…";
			else right = input.slice(end);
			error += left + underlined + right;
		}
		super(error);
		this.name = "ParseError";
		Object.setPrototypeOf(this, ParseError.prototype);
		this.position = start;
		if (start != null && end != null) this.length = end - start;
		this.rawMessage = message;
	}
};
/**
* This file contains a list of utility functions which are useful in other
* files.
*/
var uppercase = /([A-Z])/g;
var hyphenate = (str) => str.replace(uppercase, "-$1").toLowerCase();
var ESCAPE_LOOKUP = {
	"&": "&amp;",
	">": "&gt;",
	"<": "&lt;",
	"\"": "&quot;",
	"'": "&#x27;"
};
var ESCAPE_REGEX = /[&><"']/g;
/**
* Escapes text to prevent scripting attacks.
*/
var escape = (text) => String(text).replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
/**
* Sometimes we want to pull out the innermost element of a group. In most
* cases, this will just be the group itself, but when ordgroups and colors have
* a single element, we want to pull that out.
*/
var getBaseElem = (group) => {
	if (group.type === "ordgroup") if (group.body.length === 1) return getBaseElem(group.body[0]);
	else return group;
	else if (group.type === "color") if (group.body.length === 1) return getBaseElem(group.body[0]);
	else return group;
	else if (group.type === "font") return getBaseElem(group.body);
	else return group;
};
var characterNodesTypes = new Set([
	"mathord",
	"textord",
	"atom"
]);
/**
* TeXbook algorithms often reference "character boxes", which are simply groups
* with a single character in them. To decide if something is a character box,
* we find its innermost group, and see if it is a single character.
*/
var isCharacterBox = (group) => characterNodesTypes.has(getBaseElem(group).type);
/**
* Return the protocol of a URL, or "_relative" if the URL does not specify a
* protocol (and thus is relative), or `null` if URL has invalid protocol
* (so should be outright rejected).
*/
var protocolFromUrl = (url) => {
	var protocol = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(url);
	if (!protocol) return "_relative";
	if (protocol[2] !== ":") return null;
	if (!/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(protocol[1])) return null;
	return protocol[1].toLowerCase();
};
var SETTINGS_SCHEMA = {
	displayMode: {
		type: "boolean",
		description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
		cli: "-d, --display-mode"
	},
	output: {
		type: { enum: [
			"htmlAndMathml",
			"html",
			"mathml"
		] },
		description: "Determines the markup language of the output.",
		cli: "-F, --format <type>"
	},
	leqno: {
		type: "boolean",
		description: "Render display math in leqno style (left-justified tags)."
	},
	fleqn: {
		type: "boolean",
		description: "Render display math flush left."
	},
	throwOnError: {
		type: "boolean",
		default: true,
		cli: "-t, --no-throw-on-error",
		cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."
	},
	errorColor: {
		type: "string",
		default: "#cc0000",
		cli: "-c, --error-color <color>",
		cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
		cliProcessor: (color) => "#" + color
	},
	macros: {
		type: "object",
		cli: "-m, --macro <def>",
		cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
		cliDefault: [],
		cliProcessor: (def, defs) => {
			defs.push(def);
			return defs;
		}
	},
	minRuleThickness: {
		type: "number",
		description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
		processor: (t) => Math.max(0, t),
		cli: "--min-rule-thickness <size>",
		cliProcessor: parseFloat
	},
	colorIsTextColor: {
		type: "boolean",
		description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
		cli: "-b, --color-is-text-color"
	},
	strict: {
		type: [
			{ enum: [
				"warn",
				"ignore",
				"error"
			] },
			"boolean",
			"function"
		],
		description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
		cli: "-S, --strict",
		cliDefault: false
	},
	trust: {
		type: ["boolean", "function"],
		description: "Trust the input, enabling all HTML features such as \\url.",
		cli: "-T, --trust"
	},
	maxSize: {
		type: "number",
		default: Infinity,
		description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
		processor: (s) => Math.max(0, s),
		cli: "-s, --max-size <n>",
		cliProcessor: parseInt
	},
	maxExpand: {
		type: "number",
		default: 1e3,
		description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
		processor: (n) => Math.max(0, n),
		cli: "-e, --max-expand <n>",
		cliProcessor: (n) => n === "Infinity" ? Infinity : parseInt(n)
	},
	globalGroup: {
		type: "boolean",
		cli: false
	}
};
function getDefaultValue(schema) {
	if ("default" in schema) return schema.default;
	var type = schema.type;
	var defaultType = Array.isArray(type) ? type[0] : type;
	if (typeof defaultType !== "string") return defaultType.enum[0];
	switch (defaultType) {
		case "boolean": return false;
		case "string": return "";
		case "number": return 0;
		case "object": return {};
	}
}
/**
* The main Settings object
*
* The current options stored are:
*  - displayMode: Whether the expression should be typeset as inline math
*                 (false, the default), meaning that the math starts in
*                 \textstyle and is placed in an inline-block); or as display
*                 math (true), meaning that the math starts in \displaystyle
*                 and is placed in a block with vertical margin.
*/
var Settings = class {
	constructor(options) {
		if (options === void 0) options = {};
		options = options || {};
		for (var prop of Object.keys(SETTINGS_SCHEMA)) {
			var schema = SETTINGS_SCHEMA[prop];
			var optionValue = options[prop];
			this[prop] = optionValue !== void 0 ? schema.processor ? schema.processor(optionValue) : optionValue : getDefaultValue(schema);
		}
	}
	/**
	* Report nonstrict (non-LaTeX-compatible) input.
	* Can safely not be called if `this.strict` is false in JavaScript.
	*/
	reportNonstrict(errorCode, errorMsg, token) {
		var strict = this.strict;
		if (typeof strict === "function") strict = strict(errorCode, errorMsg, token);
		if (!strict || strict === "ignore") return;
		else if (strict === true || strict === "error") throw new ParseError("LaTeX-incompatible input and strict mode is set to 'error': " + (errorMsg + " [" + errorCode + "]"), token);
		else if (strict === "warn") typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
		else typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
	}
	/**
	* Check whether to apply strict (LaTeX-adhering) behavior for unusual
	* input (like `\\`).  Unlike `nonstrict`, will not throw an error;
	* instead, "error" translates to a return value of `true`, while "ignore"
	* translates to a return value of `false`.  May still print a warning:
	* "warn" prints a warning and returns `false`.
	* This is for the second category of `errorCode`s listed in the README.
	*/
	useStrictBehavior(errorCode, errorMsg, token) {
		var strict = this.strict;
		if (typeof strict === "function") try {
			strict = strict(errorCode, errorMsg, token);
		} catch (error) {
			strict = "error";
		}
		if (!strict || strict === "ignore") return false;
		else if (strict === true || strict === "error") return true;
		else if (strict === "warn") {
			typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
			return false;
		} else {
			typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
			return false;
		}
	}
	/**
	* Check whether to test potentially dangerous input, and return
	* `true` (trusted) or `false` (untrusted).  The sole argument `context`
	* should be an object with `command` field specifying the relevant LaTeX
	* command (as a string starting with `\`), and any other arguments, etc.
	* If `context` has a `url` field, a `protocol` field will automatically
	* get added by this function (changing the specified object).
	*/
	isTrusted(context) {
		if ("url" in context && context.url && !context.protocol) {
			var protocol = protocolFromUrl(context.url);
			if (protocol == null) return false;
			context.protocol = protocol;
		}
		var trust = typeof this.trust === "function" ? this.trust(context) : this.trust;
		return Boolean(trust);
	}
};
/**
* This file contains information and classes for the various kinds of styles
* used in TeX. It provides a generic `Style` class, which holds information
* about a specific style. It then provides instances of all the different kinds
* of styles possible, and provides functions to move between them and get
* information about them.
*/
/**
* The main style class. Contains a unique id for the style, a size (which is
* the same for cramped and uncramped version of a style), and a cramped flag.
*/
var Style = class {
	constructor(id, size, cramped) {
		this.id = id;
		this.size = size;
		this.cramped = cramped;
	}
	/**
	* Get the style of a superscript given a base in the current style.
	*/
	sup() {
		return styles[sup[this.id]];
	}
	/**
	* Get the style of a subscript given a base in the current style.
	*/
	sub() {
		return styles[sub[this.id]];
	}
	/**
	* Get the style of a fraction numerator given the fraction in the current
	* style.
	*/
	fracNum() {
		return styles[fracNum[this.id]];
	}
	/**
	* Get the style of a fraction denominator given the fraction in the current
	* style.
	*/
	fracDen() {
		return styles[fracDen[this.id]];
	}
	/**
	* Get the cramped version of a style (in particular, cramping a cramped style
	* doesn't change the style).
	*/
	cramp() {
		return styles[cramp[this.id]];
	}
	/**
	* Get a text or display version of this style.
	*/
	text() {
		return styles[text$1[this.id]];
	}
	/**
	* Return true if this style is tightly spaced (scriptstyle/scriptscriptstyle)
	*/
	isTight() {
		return this.size >= 2;
	}
};
var D = 0;
var Dc = 1;
var T = 2;
var Tc = 3;
var S = 4;
var Sc = 5;
var SS = 6;
var SSc = 7;
var styles = [
	new Style(D, 0, false),
	new Style(Dc, 0, true),
	new Style(T, 1, false),
	new Style(Tc, 1, true),
	new Style(S, 2, false),
	new Style(Sc, 2, true),
	new Style(SS, 3, false),
	new Style(SSc, 3, true)
];
var sup = [
	S,
	Sc,
	S,
	Sc,
	SS,
	SSc,
	SS,
	SSc
];
var sub = [
	Sc,
	Sc,
	Sc,
	Sc,
	SSc,
	SSc,
	SSc,
	SSc
];
var fracNum = [
	T,
	Tc,
	S,
	Sc,
	SS,
	SSc,
	SS,
	SSc
];
var fracDen = [
	Tc,
	Tc,
	Sc,
	Sc,
	SSc,
	SSc,
	SSc,
	SSc
];
var cramp = [
	Dc,
	Dc,
	Tc,
	Tc,
	Sc,
	Sc,
	SSc,
	SSc
];
var text$1 = [
	D,
	Dc,
	T,
	Tc,
	T,
	Tc,
	T,
	Tc
];
var Style$1 = {
	DISPLAY: styles[D],
	TEXT: styles[T],
	SCRIPT: styles[S],
	SCRIPTSCRIPT: styles[SS]
};
/**
* Unicode block data for the families of scripts we support in \text{}.
* Scripts only need to appear here if they do not have font metrics.
*/
var scriptData = [
	{
		name: "latin",
		blocks: [[256, 591], [768, 879]]
	},
	{
		name: "cyrillic",
		blocks: [[1024, 1279]]
	},
	{
		name: "armenian",
		blocks: [[1328, 1423]]
	},
	{
		name: "brahmic",
		blocks: [[2304, 4255]]
	},
	{
		name: "georgian",
		blocks: [[4256, 4351]]
	},
	{
		name: "cjk",
		blocks: [
			[12288, 12543],
			[19968, 40879],
			[65280, 65376]
		]
	},
	{
		name: "hangul",
		blocks: [[44032, 55215]]
	}
];
/**
* Given a codepoint, return the name of the script or script family
* it is from, or null if it is not part of a known block
*/
function scriptFromCodepoint(codepoint) {
	for (var i = 0; i < scriptData.length; i++) {
		var script = scriptData[i];
		for (var _i = 0; _i < script.blocks.length; _i++) {
			var block = script.blocks[_i];
			if (codepoint >= block[0] && codepoint <= block[1]) return script.name;
		}
	}
	return null;
}
/**
* A flattened version of all the supported blocks in a single array.
* This is an optimization to make supportedCodepoint() fast.
*/
var allBlocks = [];
scriptData.forEach((s) => s.blocks.forEach((b) => allBlocks.push(...b)));
/**
* Given a codepoint, return true if it falls within one of the
* scripts or script families defined above and false otherwise.
*
* Micro benchmarks shows that this is faster than
* /[\u3000-\u30FF\u4E00-\u9FAF\uFF00-\uFF60\uAC00-\uD7AF\u0900-\u109F]/.test()
* in Firefox, Chrome and Node.
*/
function supportedCodepoint(codepoint) {
	for (var i = 0; i < allBlocks.length; i += 2) if (codepoint >= allBlocks[i] && codepoint <= allBlocks[i + 1]) return true;
	return false;
}
/**
* This file provides support to domTree.js and delimiter.js.
* It's a storehouse of path geometry for SVG images.
*/
var hLinePad = 80;
var sqrtMain = function sqrtMain(extraVinculum, hLinePad) {
	return "M95," + (622 + extraVinculum + hLinePad) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl" + extraVinculum / 2.075 + " -" + extraVinculum + "\nc5.3,-9.3,12,-14,20,-14\nH400000v" + (40 + extraVinculum) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM" + (834 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "h-400000z";
};
var sqrtSize1 = function sqrtSize1(extraVinculum, hLinePad) {
	return "M263," + (601 + extraVinculum + hLinePad) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl" + extraVinculum / 2.084 + " -" + extraVinculum + "\nc4.7,-7.3,11,-11,19,-11\nH40000v" + (40 + extraVinculum) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM" + (1001 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "h-400000z";
};
var sqrtSize2 = function sqrtSize2(extraVinculum, hLinePad) {
	return "M983 " + (10 + extraVinculum + hLinePad) + "\nl" + extraVinculum / 3.13 + " -" + extraVinculum + "\nc4,-6.7,10,-10,18,-10 H400000v" + (40 + extraVinculum) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM" + (1001 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "h-400000z";
};
var sqrtSize3 = function sqrtSize3(extraVinculum, hLinePad) {
	return "M424," + (2398 + extraVinculum + hLinePad) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl" + extraVinculum / 4.223 + " -" + extraVinculum + "c4,-6.7,10,-10,18,-10 H400000\nv" + (40 + extraVinculum) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M" + (1001 + extraVinculum) + " " + hLinePad + "\nh400000v" + (40 + extraVinculum) + "h-400000z";
};
var sqrtSize4 = function sqrtSize4(extraVinculum, hLinePad) {
	return "M473," + (2713 + extraVinculum + hLinePad) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l" + extraVinculum / 5.298 + " -" + extraVinculum + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v" + (40 + extraVinculum) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM" + (1001 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "H1017.7z";
};
var phasePath = function phasePath(y) {
	var x = y / 2;
	return "M400000 " + y + " H0 L" + x + " 0 l65 45 L145 " + (y - 80) + " H400000z";
};
var sqrtTall = function sqrtTall(extraVinculum, hLinePad, viewBoxHeight) {
	var vertSegment = viewBoxHeight - 54 - hLinePad - extraVinculum;
	return "M702 " + (extraVinculum + hLinePad) + "H400000" + (40 + extraVinculum) + "\nH742v" + vertSegment + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 " + hLinePad + "H400000v" + (40 + extraVinculum) + "H742z";
};
var sqrtPath = function sqrtPath(size, extraVinculum, viewBoxHeight) {
	extraVinculum = 1e3 * extraVinculum;
	var path = "";
	switch (size) {
		case "sqrtMain":
			path = sqrtMain(extraVinculum, hLinePad);
			break;
		case "sqrtSize1":
			path = sqrtSize1(extraVinculum, hLinePad);
			break;
		case "sqrtSize2":
			path = sqrtSize2(extraVinculum, hLinePad);
			break;
		case "sqrtSize3":
			path = sqrtSize3(extraVinculum, hLinePad);
			break;
		case "sqrtSize4":
			path = sqrtSize4(extraVinculum, hLinePad);
			break;
		case "sqrtTall": path = sqrtTall(extraVinculum, hLinePad, viewBoxHeight);
	}
	return path;
};
var innerPath = function innerPath(name, height) {
	switch (name) {
		case "⎜": return "M291 0 H417 V" + height + " H291z M291 0 H417 V" + height + " H291z";
		case "∣": return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z";
		case "∥": return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z" + ("M367 0 H410 V" + height + " H367z M367 0 H410 V" + height + " H367z");
		case "⎟": return "M457 0 H583 V" + height + " H457z M457 0 H583 V" + height + " H457z";
		case "⎢": return "M319 0 H403 V" + height + " H319z M319 0 H403 V" + height + " H319z";
		case "⎥": return "M263 0 H347 V" + height + " H263z M263 0 H347 V" + height + " H263z";
		case "⎪": return "M384 0 H504 V" + height + " H384z M384 0 H504 V" + height + " H384z";
		case "⏐": return "M312 0 H355 V" + height + " H312z M312 0 H355 V" + height + " H312z";
		case "‖": return "M257 0 H300 V" + height + " H257z M257 0 H300 V" + height + " H257z" + ("M478 0 H521 V" + height + " H478z M478 0 H521 V" + height + " H478z");
		default: return "";
	}
};
var path = {
	doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
	doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
	leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
	leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
	leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
	leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
	leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
	leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
	leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
	leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
	leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
	lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
	leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",
	leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",
	leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
	longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",
	midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
	midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
	oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",
	oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",
	oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",
	oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",
	rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
	rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
	rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
	rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
	rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
	rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
	rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
	rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
	rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
	righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
	rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",
	rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
	twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
	twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
	tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
	tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
	tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
	tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
	vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
	widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
	widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
	widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
	widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
	widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",
	widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
	widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
	widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
	baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",
	rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",
	baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",
	rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",
	shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",
	shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"
};
var tallDelim = function tallDelim(label, midHeight) {
	switch (label) {
		case "lbrack": return "M403 1759 V84 H666 V0 H319 V1759 v" + midHeight + " v1759 h347 v-84\nH403z M403 1759 V0 H319 V1759 v" + midHeight + " v1759 h84z";
		case "rbrack": return "M347 1759 V0 H0 V84 H263 V1759 v" + midHeight + " v1759 H0 v84 H347z\nM347 1759 V0 H263 V1759 v" + midHeight + " v1759 h84z";
		case "vert": return "M145 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + midHeight + " v585 h43z";
		case "doublevert": return "M145 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + midHeight + " v585 h43z\nM367 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M410 15 H367 v585 v" + midHeight + " v585 h43z";
		case "lfloor": return "M319 602 V0 H403 V602 v" + midHeight + " v1715 h263 v84 H319z\nMM319 602 V0 H403 V602 v" + midHeight + " v1715 H319z";
		case "rfloor": return "M319 602 V0 H403 V602 v" + midHeight + " v1799 H0 v-84 H319z\nMM319 602 V0 H403 V602 v" + midHeight + " v1715 H319z";
		case "lceil": return "M403 1759 V84 H666 V0 H319 V1759 v" + midHeight + " v602 h84z\nM403 1759 V0 H319 V1759 v" + midHeight + " v602 h84z";
		case "rceil": return "M347 1759 V0 H0 V84 H263 V1759 v" + midHeight + " v602 h84z\nM347 1759 V0 h-84 V1759 v" + midHeight + " v602 h84z";
		case "lparen": return "M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1\nc-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,\n-36,557 l0," + (midHeight + 84) + "c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,\n949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9\nc0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,\n-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189\nl0,-" + (midHeight + 92) + "c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,\n-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z";
		case "rparen": return "M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,\n63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5\nc11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0," + (midHeight + 9) + "\nc-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664\nc-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11\nc0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17\nc242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558\nl0,-" + (midHeight + 144) + "c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,\n-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z";
		default: throw new Error("Unknown stretchy delimiter.");
	}
};
/**
* This file does conversion between units.  In particular, it provides
* calculateSize to convert other units into ems.
*/
var ptPerUnit = {
	"pt": 1,
	"mm": 7227 / 2540,
	"cm": 7227 / 254,
	"in": 72.27,
	"bp": 803 / 800,
	"pc": 12,
	"dd": 1238 / 1157,
	"cc": 14856 / 1157,
	"nd": 685 / 642,
	"nc": 1370 / 107,
	"sp": 1 / 65536,
	"px": 803 / 800
};
var relativeUnit = {
	"ex": true,
	"em": true,
	"mu": true
};
/**
* Determine whether the specified unit (either a string defining the unit
* or a "size" parse node containing a unit field) is valid.
*/
var validUnit = function validUnit(unit) {
	if (typeof unit !== "string") unit = unit.unit;
	return unit in ptPerUnit || unit in relativeUnit || unit === "ex";
};
var calculateSize = function calculateSize(sizeValue, options) {
	var scale;
	if (sizeValue.unit in ptPerUnit) scale = ptPerUnit[sizeValue.unit] / options.fontMetrics().ptPerEm / options.sizeMultiplier;
	else if (sizeValue.unit === "mu") scale = options.fontMetrics().cssEmPerMu;
	else {
		var unitOptions;
		if (options.style.isTight()) unitOptions = options.havingStyle(options.style.text());
		else unitOptions = options;
		if (sizeValue.unit === "ex") scale = unitOptions.fontMetrics().xHeight;
		else if (sizeValue.unit === "em") scale = unitOptions.fontMetrics().quad;
		else throw new ParseError("Invalid unit: '" + sizeValue.unit + "'");
		if (unitOptions !== options) scale *= unitOptions.sizeMultiplier / options.sizeMultiplier;
	}
	return Math.min(sizeValue.number * scale, options.maxSize);
};
/**
* Round `n` to 4 decimal places, or to the nearest 1/10,000th em. See
* https://github.com/KaTeX/KaTeX/pull/2460.
*/
var makeEm = function makeEm(n) {
	return +n.toFixed(4) + "em";
};
/**
* These objects store the data about the DOM nodes we create, as well as some
* extra data. They can then be transformed into real DOM nodes with the
* `toNode` function or HTML markup using `toMarkup`. They are useful for both
* storing extra properties on the nodes, as well as providing a way to easily
* work with the DOM.
*
* Similar functions for working with MathML nodes exist in mathMLTree.js.
*
* TODO: refactor `span` and `anchor` into common superclass when
* target environments support class inheritance
*/
/**
* Create an HTML className based on a list of classes. In addition to joining
* with spaces, we also remove empty classes.
*/
var createClass = function createClass(classes) {
	return classes.filter((cls) => cls).join(" ");
};
var initNode = function initNode(classes, options, style) {
	this.classes = classes || [];
	this.attributes = {};
	this.height = 0;
	this.depth = 0;
	this.maxFontSize = 0;
	this.style = style || {};
	if (options) {
		if (options.style.isTight()) this.classes.push("mtight");
		var color = options.getColor();
		if (color) this.style.color = color;
	}
};
/**
* Convert into an HTML node
*/
var toNode = function toNode(tagName) {
	var node = document.createElement(tagName);
	node.className = createClass(this.classes);
	for (var key of Object.keys(this.style)) node.style[key] = this.style[key];
	for (var attr of Object.keys(this.attributes)) node.setAttribute(attr, this.attributes[attr]);
	for (var i = 0; i < this.children.length; i++) node.appendChild(this.children[i].toNode());
	return node;
};
/**
* https://w3c.github.io/html-reference/syntax.html#syntax-attributes
*
* > Attribute Names must consist of one or more characters
* other than the space characters, U+0000 NULL,
* '"', "'", ">", "/", "=", the control characters,
* and any characters that are not defined by Unicode.
*/
var invalidAttributeNameRegex = /[\s"'>/=\x00-\x1f]/;
/**
* Convert into an HTML markup string
*/
var toMarkup = function toMarkup(tagName) {
	var markup = "<" + tagName;
	if (this.classes.length) markup += " class=\"" + escape(createClass(this.classes)) + "\"";
	var styles = "";
	for (var key of Object.keys(this.style)) styles += hyphenate(key) + ":" + this.style[key] + ";";
	if (styles) markup += " style=\"" + escape(styles) + "\"";
	for (var attr of Object.keys(this.attributes)) {
		if (invalidAttributeNameRegex.test(attr)) throw new ParseError("Invalid attribute name '" + attr + "'");
		markup += " " + attr + "=\"" + escape(this.attributes[attr]) + "\"";
	}
	markup += ">";
	for (var i = 0; i < this.children.length; i++) markup += this.children[i].toMarkup();
	markup += "</" + tagName + ">";
	return markup;
};
/**
* This node represents a span node, with a className, a list of children, and
* an inline style. It also contains information about its height, depth, and
* maxFontSize.
*
* Represents two types with different uses: SvgSpan to wrap an SVG and DomSpan
* otherwise. This typesafety is important when HTML builders access a span's
* children.
*/
var Span = class {
	constructor(classes, children, options, style) {
		initNode.call(this, classes, options, style);
		this.children = children || [];
	}
	/**
	* Sets an arbitrary attribute on the span. Warning: use this wisely. Not
	* all browsers support attributes the same, and having too many custom
	* attributes is probably bad.
	*/
	setAttribute(attribute, value) {
		this.attributes[attribute] = value;
	}
	hasClass(className) {
		return this.classes.includes(className);
	}
	toNode() {
		return toNode.call(this, "span");
	}
	toMarkup() {
		return toMarkup.call(this, "span");
	}
};
/**
* This node represents an anchor (<a>) element with a hyperlink.  See `span`
* for further details.
*/
var Anchor = class {
	constructor(href, classes, children, options) {
		initNode.call(this, classes, options);
		this.children = children || [];
		this.setAttribute("href", href);
	}
	setAttribute(attribute, value) {
		this.attributes[attribute] = value;
	}
	hasClass(className) {
		return this.classes.includes(className);
	}
	toNode() {
		return toNode.call(this, "a");
	}
	toMarkup() {
		return toMarkup.call(this, "a");
	}
};
/**
* This node represents an image embed (<img>) element.
*/
var Img = class {
	constructor(src, alt, style) {
		this.alt = alt;
		this.src = src;
		this.classes = ["mord"];
		this.height = 0;
		this.depth = 0;
		this.maxFontSize = 0;
		this.style = style;
	}
	hasClass(className) {
		return this.classes.includes(className);
	}
	toNode() {
		var node = document.createElement("img");
		node.src = this.src;
		node.alt = this.alt;
		node.className = "mord";
		for (var key of Object.keys(this.style)) node.style[key] = this.style[key];
		return node;
	}
	toMarkup() {
		var markup = "<img src=\"" + escape(this.src) + "\"" + (" alt=\"" + escape(this.alt) + "\"");
		var styles = "";
		for (var key of Object.keys(this.style)) styles += hyphenate(key) + ":" + this.style[key] + ";";
		if (styles) markup += " style=\"" + escape(styles) + "\"";
		markup += "'/>";
		return markup;
	}
};
var iCombinations = {
	"î": "ı̂",
	"ï": "ı̈",
	"í": "ı́",
	"ì": "ı̀"
};
/**
* A symbol node contains information about a single symbol. It either renders
* to a single text node, or a span with a single text node in it, depending on
* whether it has CSS classes, styles, or needs italic correction.
*/
var SymbolNode = class {
	constructor(text, height, depth, italic, skew, width, classes, style) {
		this.text = text;
		this.height = height || 0;
		this.depth = depth || 0;
		this.italic = italic || 0;
		this.skew = skew || 0;
		this.width = width || 0;
		this.classes = classes || [];
		this.style = style || {};
		this.maxFontSize = 0;
		var script = scriptFromCodepoint(this.text.charCodeAt(0));
		if (script) this.classes.push(script + "_fallback");
		if (/[îïíì]/.test(this.text)) this.text = iCombinations[this.text];
	}
	hasClass(className) {
		return this.classes.includes(className);
	}
	/**
	* Creates a text node or span from a symbol node. Note that a span is only
	* created if it is needed.
	*/
	toNode() {
		var node = document.createTextNode(this.text);
		var span = null;
		if (this.italic > 0) {
			span = document.createElement("span");
			span.style.marginRight = makeEm(this.italic);
		}
		if (this.classes.length > 0) {
			span = span || document.createElement("span");
			span.className = createClass(this.classes);
		}
		for (var key of Object.keys(this.style)) {
			span = span || document.createElement("span");
			span.style[key] = this.style[key];
		}
		if (span) {
			span.appendChild(node);
			return span;
		} else return node;
	}
	/**
	* Creates markup for a symbol node.
	*/
	toMarkup() {
		var needsSpan = false;
		var markup = "<span";
		if (this.classes.length) {
			needsSpan = true;
			markup += " class=\"";
			markup += escape(createClass(this.classes));
			markup += "\"";
		}
		var styles = "";
		if (this.italic > 0) styles += "margin-right:" + this.italic + "em;";
		for (var key of Object.keys(this.style)) styles += hyphenate(key) + ":" + this.style[key] + ";";
		if (styles) {
			needsSpan = true;
			markup += " style=\"" + escape(styles) + "\"";
		}
		var escaped = escape(this.text);
		if (needsSpan) {
			markup += ">";
			markup += escaped;
			markup += "</span>";
			return markup;
		} else return escaped;
	}
};
/**
* SVG nodes are used to render stretchy wide elements.
*/
var SvgNode = class {
	constructor(children, attributes) {
		this.children = children || [];
		this.attributes = attributes || {};
	}
	toNode() {
		var node = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		for (var attr of Object.keys(this.attributes)) node.setAttribute(attr, this.attributes[attr]);
		for (var i = 0; i < this.children.length; i++) node.appendChild(this.children[i].toNode());
		return node;
	}
	toMarkup() {
		var markup = "<svg xmlns=\"http://www.w3.org/2000/svg\"";
		for (var attr of Object.keys(this.attributes)) markup += " " + attr + "=\"" + escape(this.attributes[attr]) + "\"";
		markup += ">";
		for (var i = 0; i < this.children.length; i++) markup += this.children[i].toMarkup();
		markup += "</svg>";
		return markup;
	}
};
var PathNode = class {
	constructor(pathName, alternate) {
		this.pathName = pathName;
		this.alternate = alternate;
	}
	toNode() {
		var node = document.createElementNS("http://www.w3.org/2000/svg", "path");
		if (this.alternate) node.setAttribute("d", this.alternate);
		else node.setAttribute("d", path[this.pathName]);
		return node;
	}
	toMarkup() {
		if (this.alternate) return "<path d=\"" + escape(this.alternate) + "\"/>";
		else return "<path d=\"" + escape(path[this.pathName]) + "\"/>";
	}
};
var LineNode = class {
	constructor(attributes) {
		this.attributes = attributes || {};
	}
	toNode() {
		var node = document.createElementNS("http://www.w3.org/2000/svg", "line");
		for (var attr of Object.keys(this.attributes)) node.setAttribute(attr, this.attributes[attr]);
		return node;
	}
	toMarkup() {
		var markup = "<line";
		for (var attr of Object.keys(this.attributes)) markup += " " + attr + "=\"" + escape(this.attributes[attr]) + "\"";
		markup += "/>";
		return markup;
	}
};
function assertSymbolDomNode(group) {
	if (group instanceof SymbolNode) return group;
	else throw new Error("Expected symbolNode but got " + String(group) + ".");
}
function assertSpan(group) {
	if (group instanceof Span) return group;
	else throw new Error("Expected span<HtmlDomNode> but got " + String(group) + ".");
}
var fontMetricsData = {
	"AMS-Regular": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"65": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"66": [
			0,
			.68889,
			0,
			0,
			.66667
		],
		"67": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"68": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"69": [
			0,
			.68889,
			0,
			0,
			.66667
		],
		"70": [
			0,
			.68889,
			0,
			0,
			.61111
		],
		"71": [
			0,
			.68889,
			0,
			0,
			.77778
		],
		"72": [
			0,
			.68889,
			0,
			0,
			.77778
		],
		"73": [
			0,
			.68889,
			0,
			0,
			.38889
		],
		"74": [
			.16667,
			.68889,
			0,
			0,
			.5
		],
		"75": [
			0,
			.68889,
			0,
			0,
			.77778
		],
		"76": [
			0,
			.68889,
			0,
			0,
			.66667
		],
		"77": [
			0,
			.68889,
			0,
			0,
			.94445
		],
		"78": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"79": [
			.16667,
			.68889,
			0,
			0,
			.77778
		],
		"80": [
			0,
			.68889,
			0,
			0,
			.61111
		],
		"81": [
			.16667,
			.68889,
			0,
			0,
			.77778
		],
		"82": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"83": [
			0,
			.68889,
			0,
			0,
			.55556
		],
		"84": [
			0,
			.68889,
			0,
			0,
			.66667
		],
		"85": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"86": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"87": [
			0,
			.68889,
			0,
			0,
			1
		],
		"88": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"89": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"90": [
			0,
			.68889,
			0,
			0,
			.66667
		],
		"107": [
			0,
			.68889,
			0,
			0,
			.55556
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"165": [
			0,
			.675,
			.025,
			0,
			.75
		],
		"174": [
			.15559,
			.69224,
			0,
			0,
			.94666
		],
		"240": [
			0,
			.68889,
			0,
			0,
			.55556
		],
		"295": [
			0,
			.68889,
			0,
			0,
			.54028
		],
		"710": [
			0,
			.825,
			0,
			0,
			2.33334
		],
		"732": [
			0,
			.9,
			0,
			0,
			2.33334
		],
		"770": [
			0,
			.825,
			0,
			0,
			2.33334
		],
		"771": [
			0,
			.9,
			0,
			0,
			2.33334
		],
		"989": [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		"1008": [
			0,
			.43056,
			.04028,
			0,
			.66667
		],
		"8245": [
			0,
			.54986,
			0,
			0,
			.275
		],
		"8463": [
			0,
			.68889,
			0,
			0,
			.54028
		],
		"8487": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"8498": [
			0,
			.68889,
			0,
			0,
			.55556
		],
		"8502": [
			0,
			.68889,
			0,
			0,
			.66667
		],
		"8503": [
			0,
			.68889,
			0,
			0,
			.44445
		],
		"8504": [
			0,
			.68889,
			0,
			0,
			.66667
		],
		"8513": [
			0,
			.68889,
			0,
			0,
			.63889
		],
		"8592": [
			-.03598,
			.46402,
			0,
			0,
			.5
		],
		"8594": [
			-.03598,
			.46402,
			0,
			0,
			.5
		],
		"8602": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8603": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8606": [
			.01354,
			.52239,
			0,
			0,
			1
		],
		"8608": [
			.01354,
			.52239,
			0,
			0,
			1
		],
		"8610": [
			.01354,
			.52239,
			0,
			0,
			1.11111
		],
		"8611": [
			.01354,
			.52239,
			0,
			0,
			1.11111
		],
		"8619": [
			0,
			.54986,
			0,
			0,
			1
		],
		"8620": [
			0,
			.54986,
			0,
			0,
			1
		],
		"8621": [
			-.13313,
			.37788,
			0,
			0,
			1.38889
		],
		"8622": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8624": [
			0,
			.69224,
			0,
			0,
			.5
		],
		"8625": [
			0,
			.69224,
			0,
			0,
			.5
		],
		"8630": [
			0,
			.43056,
			0,
			0,
			1
		],
		"8631": [
			0,
			.43056,
			0,
			0,
			1
		],
		"8634": [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		"8635": [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		"8638": [
			.19444,
			.69224,
			0,
			0,
			.41667
		],
		"8639": [
			.19444,
			.69224,
			0,
			0,
			.41667
		],
		"8642": [
			.19444,
			.69224,
			0,
			0,
			.41667
		],
		"8643": [
			.19444,
			.69224,
			0,
			0,
			.41667
		],
		"8644": [
			.1808,
			.675,
			0,
			0,
			1
		],
		"8646": [
			.1808,
			.675,
			0,
			0,
			1
		],
		"8647": [
			.1808,
			.675,
			0,
			0,
			1
		],
		"8648": [
			.19444,
			.69224,
			0,
			0,
			.83334
		],
		"8649": [
			.1808,
			.675,
			0,
			0,
			1
		],
		"8650": [
			.19444,
			.69224,
			0,
			0,
			.83334
		],
		"8651": [
			.01354,
			.52239,
			0,
			0,
			1
		],
		"8652": [
			.01354,
			.52239,
			0,
			0,
			1
		],
		"8653": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8654": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8655": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8666": [
			.13667,
			.63667,
			0,
			0,
			1
		],
		"8667": [
			.13667,
			.63667,
			0,
			0,
			1
		],
		"8669": [
			-.13313,
			.37788,
			0,
			0,
			1
		],
		"8672": [
			-.064,
			.437,
			0,
			0,
			1.334
		],
		"8674": [
			-.064,
			.437,
			0,
			0,
			1.334
		],
		"8705": [
			0,
			.825,
			0,
			0,
			.5
		],
		"8708": [
			0,
			.68889,
			0,
			0,
			.55556
		],
		"8709": [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		"8717": [
			0,
			.43056,
			0,
			0,
			.42917
		],
		"8722": [
			-.03598,
			.46402,
			0,
			0,
			.5
		],
		"8724": [
			.08198,
			.69224,
			0,
			0,
			.77778
		],
		"8726": [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		"8733": [
			0,
			.69224,
			0,
			0,
			.77778
		],
		"8736": [
			0,
			.69224,
			0,
			0,
			.72222
		],
		"8737": [
			0,
			.69224,
			0,
			0,
			.72222
		],
		"8738": [
			.03517,
			.52239,
			0,
			0,
			.72222
		],
		"8739": [
			.08167,
			.58167,
			0,
			0,
			.22222
		],
		"8740": [
			.25142,
			.74111,
			0,
			0,
			.27778
		],
		"8741": [
			.08167,
			.58167,
			0,
			0,
			.38889
		],
		"8742": [
			.25142,
			.74111,
			0,
			0,
			.5
		],
		"8756": [
			0,
			.69224,
			0,
			0,
			.66667
		],
		"8757": [
			0,
			.69224,
			0,
			0,
			.66667
		],
		"8764": [
			-.13313,
			.36687,
			0,
			0,
			.77778
		],
		"8765": [
			-.13313,
			.37788,
			0,
			0,
			.77778
		],
		"8769": [
			-.13313,
			.36687,
			0,
			0,
			.77778
		],
		"8770": [
			-.03625,
			.46375,
			0,
			0,
			.77778
		],
		"8774": [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		"8776": [
			-.01688,
			.48312,
			0,
			0,
			.77778
		],
		"8778": [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		"8782": [
			.06062,
			.54986,
			0,
			0,
			.77778
		],
		"8783": [
			.06062,
			.54986,
			0,
			0,
			.77778
		],
		"8785": [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		"8786": [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		"8787": [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		"8790": [
			0,
			.69224,
			0,
			0,
			.77778
		],
		"8791": [
			.22958,
			.72958,
			0,
			0,
			.77778
		],
		"8796": [
			.08198,
			.91667,
			0,
			0,
			.77778
		],
		"8806": [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		"8807": [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		"8808": [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		"8809": [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		"8812": [
			.25583,
			.75583,
			0,
			0,
			.5
		],
		"8814": [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		"8815": [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		"8816": [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		"8817": [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		"8818": [
			.22958,
			.72958,
			0,
			0,
			.77778
		],
		"8819": [
			.22958,
			.72958,
			0,
			0,
			.77778
		],
		"8822": [
			.1808,
			.675,
			0,
			0,
			.77778
		],
		"8823": [
			.1808,
			.675,
			0,
			0,
			.77778
		],
		"8828": [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		"8829": [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		"8830": [
			.22958,
			.72958,
			0,
			0,
			.77778
		],
		"8831": [
			.22958,
			.72958,
			0,
			0,
			.77778
		],
		"8832": [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		"8833": [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		"8840": [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		"8841": [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		"8842": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"8843": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"8847": [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		"8848": [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		"8858": [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		"8859": [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		"8861": [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		"8862": [
			0,
			.675,
			0,
			0,
			.77778
		],
		"8863": [
			0,
			.675,
			0,
			0,
			.77778
		],
		"8864": [
			0,
			.675,
			0,
			0,
			.77778
		],
		"8865": [
			0,
			.675,
			0,
			0,
			.77778
		],
		"8872": [
			0,
			.69224,
			0,
			0,
			.61111
		],
		"8873": [
			0,
			.69224,
			0,
			0,
			.72222
		],
		"8874": [
			0,
			.69224,
			0,
			0,
			.88889
		],
		"8876": [
			0,
			.68889,
			0,
			0,
			.61111
		],
		"8877": [
			0,
			.68889,
			0,
			0,
			.61111
		],
		"8878": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"8879": [
			0,
			.68889,
			0,
			0,
			.72222
		],
		"8882": [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		"8883": [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		"8884": [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		"8885": [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		"8888": [
			0,
			.54986,
			0,
			0,
			1.11111
		],
		"8890": [
			.19444,
			.43056,
			0,
			0,
			.55556
		],
		"8891": [
			.19444,
			.69224,
			0,
			0,
			.61111
		],
		"8892": [
			.19444,
			.69224,
			0,
			0,
			.61111
		],
		"8901": [
			0,
			.54986,
			0,
			0,
			.27778
		],
		"8903": [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		"8905": [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		"8906": [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		"8907": [
			0,
			.69224,
			0,
			0,
			.77778
		],
		"8908": [
			0,
			.69224,
			0,
			0,
			.77778
		],
		"8909": [
			-.03598,
			.46402,
			0,
			0,
			.77778
		],
		"8910": [
			0,
			.54986,
			0,
			0,
			.76042
		],
		"8911": [
			0,
			.54986,
			0,
			0,
			.76042
		],
		"8912": [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		"8913": [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		"8914": [
			0,
			.54986,
			0,
			0,
			.66667
		],
		"8915": [
			0,
			.54986,
			0,
			0,
			.66667
		],
		"8916": [
			0,
			.69224,
			0,
			0,
			.66667
		],
		"8918": [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		"8919": [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		"8920": [
			.03517,
			.54986,
			0,
			0,
			1.33334
		],
		"8921": [
			.03517,
			.54986,
			0,
			0,
			1.33334
		],
		"8922": [
			.38569,
			.88569,
			0,
			0,
			.77778
		],
		"8923": [
			.38569,
			.88569,
			0,
			0,
			.77778
		],
		"8926": [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		"8927": [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		"8928": [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		"8929": [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		"8934": [
			.23222,
			.74111,
			0,
			0,
			.77778
		],
		"8935": [
			.23222,
			.74111,
			0,
			0,
			.77778
		],
		"8936": [
			.23222,
			.74111,
			0,
			0,
			.77778
		],
		"8937": [
			.23222,
			.74111,
			0,
			0,
			.77778
		],
		"8938": [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		"8939": [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		"8940": [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		"8941": [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		"8994": [
			.19444,
			.69224,
			0,
			0,
			.77778
		],
		"8995": [
			.19444,
			.69224,
			0,
			0,
			.77778
		],
		"9416": [
			.15559,
			.69224,
			0,
			0,
			.90222
		],
		"9484": [
			0,
			.69224,
			0,
			0,
			.5
		],
		"9488": [
			0,
			.69224,
			0,
			0,
			.5
		],
		"9492": [
			0,
			.37788,
			0,
			0,
			.5
		],
		"9496": [
			0,
			.37788,
			0,
			0,
			.5
		],
		"9585": [
			.19444,
			.68889,
			0,
			0,
			.88889
		],
		"9586": [
			.19444,
			.74111,
			0,
			0,
			.88889
		],
		"9632": [
			0,
			.675,
			0,
			0,
			.77778
		],
		"9633": [
			0,
			.675,
			0,
			0,
			.77778
		],
		"9650": [
			0,
			.54986,
			0,
			0,
			.72222
		],
		"9651": [
			0,
			.54986,
			0,
			0,
			.72222
		],
		"9654": [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		"9660": [
			0,
			.54986,
			0,
			0,
			.72222
		],
		"9661": [
			0,
			.54986,
			0,
			0,
			.72222
		],
		"9664": [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		"9674": [
			.11111,
			.69224,
			0,
			0,
			.66667
		],
		"9733": [
			.19444,
			.69224,
			0,
			0,
			.94445
		],
		"10003": [
			0,
			.69224,
			0,
			0,
			.83334
		],
		"10016": [
			0,
			.69224,
			0,
			0,
			.83334
		],
		"10731": [
			.11111,
			.69224,
			0,
			0,
			.66667
		],
		"10846": [
			.19444,
			.75583,
			0,
			0,
			.61111
		],
		"10877": [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		"10878": [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		"10885": [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		"10886": [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		"10887": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"10888": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"10889": [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		"10890": [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		"10891": [
			.48256,
			.98256,
			0,
			0,
			.77778
		],
		"10892": [
			.48256,
			.98256,
			0,
			0,
			.77778
		],
		"10901": [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		"10902": [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		"10933": [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		"10934": [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		"10935": [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		"10936": [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		"10937": [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		"10938": [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		"10949": [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		"10950": [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		"10955": [
			.28481,
			.79383,
			0,
			0,
			.77778
		],
		"10956": [
			.28481,
			.79383,
			0,
			0,
			.77778
		],
		"57350": [
			.08167,
			.58167,
			0,
			0,
			.22222
		],
		"57351": [
			.08167,
			.58167,
			0,
			0,
			.38889
		],
		"57352": [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		"57353": [
			0,
			.43056,
			.04028,
			0,
			.66667
		],
		"57356": [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		"57357": [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		"57358": [
			.41951,
			.91951,
			0,
			0,
			.77778
		],
		"57359": [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		"57360": [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		"57361": [
			.41951,
			.91951,
			0,
			0,
			.77778
		],
		"57366": [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		"57367": [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		"57368": [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		"57369": [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		"57370": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"57371": [
			.13597,
			.63597,
			0,
			0,
			.77778
		]
	},
	"Caligraphic-Regular": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"65": [
			0,
			.68333,
			0,
			.19445,
			.79847
		],
		"66": [
			0,
			.68333,
			.03041,
			.13889,
			.65681
		],
		"67": [
			0,
			.68333,
			.05834,
			.13889,
			.52653
		],
		"68": [
			0,
			.68333,
			.02778,
			.08334,
			.77139
		],
		"69": [
			0,
			.68333,
			.08944,
			.11111,
			.52778
		],
		"70": [
			0,
			.68333,
			.09931,
			.11111,
			.71875
		],
		"71": [
			.09722,
			.68333,
			.0593,
			.11111,
			.59487
		],
		"72": [
			0,
			.68333,
			.00965,
			.11111,
			.84452
		],
		"73": [
			0,
			.68333,
			.07382,
			0,
			.54452
		],
		"74": [
			.09722,
			.68333,
			.18472,
			.16667,
			.67778
		],
		"75": [
			0,
			.68333,
			.01445,
			.05556,
			.76195
		],
		"76": [
			0,
			.68333,
			0,
			.13889,
			.68972
		],
		"77": [
			0,
			.68333,
			0,
			.13889,
			1.2009
		],
		"78": [
			0,
			.68333,
			.14736,
			.08334,
			.82049
		],
		"79": [
			0,
			.68333,
			.02778,
			.11111,
			.79611
		],
		"80": [
			0,
			.68333,
			.08222,
			.08334,
			.69556
		],
		"81": [
			.09722,
			.68333,
			0,
			.11111,
			.81667
		],
		"82": [
			0,
			.68333,
			0,
			.08334,
			.8475
		],
		"83": [
			0,
			.68333,
			.075,
			.13889,
			.60556
		],
		"84": [
			0,
			.68333,
			.25417,
			0,
			.54464
		],
		"85": [
			0,
			.68333,
			.09931,
			.08334,
			.62583
		],
		"86": [
			0,
			.68333,
			.08222,
			0,
			.61278
		],
		"87": [
			0,
			.68333,
			.08222,
			.08334,
			.98778
		],
		"88": [
			0,
			.68333,
			.14643,
			.13889,
			.7133
		],
		"89": [
			.09722,
			.68333,
			.08222,
			.08334,
			.66834
		],
		"90": [
			0,
			.68333,
			.07944,
			.13889,
			.72473
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		]
	},
	"Fraktur-Regular": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"33": [
			0,
			.69141,
			0,
			0,
			.29574
		],
		"34": [
			0,
			.69141,
			0,
			0,
			.21471
		],
		"38": [
			0,
			.69141,
			0,
			0,
			.73786
		],
		"39": [
			0,
			.69141,
			0,
			0,
			.21201
		],
		"40": [
			.24982,
			.74947,
			0,
			0,
			.38865
		],
		"41": [
			.24982,
			.74947,
			0,
			0,
			.38865
		],
		"42": [
			0,
			.62119,
			0,
			0,
			.27764
		],
		"43": [
			.08319,
			.58283,
			0,
			0,
			.75623
		],
		"44": [
			0,
			.10803,
			0,
			0,
			.27764
		],
		"45": [
			.08319,
			.58283,
			0,
			0,
			.75623
		],
		"46": [
			0,
			.10803,
			0,
			0,
			.27764
		],
		"47": [
			.24982,
			.74947,
			0,
			0,
			.50181
		],
		"48": [
			0,
			.47534,
			0,
			0,
			.50181
		],
		"49": [
			0,
			.47534,
			0,
			0,
			.50181
		],
		"50": [
			0,
			.47534,
			0,
			0,
			.50181
		],
		"51": [
			.18906,
			.47534,
			0,
			0,
			.50181
		],
		"52": [
			.18906,
			.47534,
			0,
			0,
			.50181
		],
		"53": [
			.18906,
			.47534,
			0,
			0,
			.50181
		],
		"54": [
			0,
			.69141,
			0,
			0,
			.50181
		],
		"55": [
			.18906,
			.47534,
			0,
			0,
			.50181
		],
		"56": [
			0,
			.69141,
			0,
			0,
			.50181
		],
		"57": [
			.18906,
			.47534,
			0,
			0,
			.50181
		],
		"58": [
			0,
			.47534,
			0,
			0,
			.21606
		],
		"59": [
			.12604,
			.47534,
			0,
			0,
			.21606
		],
		"61": [
			-.13099,
			.36866,
			0,
			0,
			.75623
		],
		"63": [
			0,
			.69141,
			0,
			0,
			.36245
		],
		"65": [
			0,
			.69141,
			0,
			0,
			.7176
		],
		"66": [
			0,
			.69141,
			0,
			0,
			.88397
		],
		"67": [
			0,
			.69141,
			0,
			0,
			.61254
		],
		"68": [
			0,
			.69141,
			0,
			0,
			.83158
		],
		"69": [
			0,
			.69141,
			0,
			0,
			.66278
		],
		"70": [
			.12604,
			.69141,
			0,
			0,
			.61119
		],
		"71": [
			0,
			.69141,
			0,
			0,
			.78539
		],
		"72": [
			.06302,
			.69141,
			0,
			0,
			.7203
		],
		"73": [
			0,
			.69141,
			0,
			0,
			.55448
		],
		"74": [
			.12604,
			.69141,
			0,
			0,
			.55231
		],
		"75": [
			0,
			.69141,
			0,
			0,
			.66845
		],
		"76": [
			0,
			.69141,
			0,
			0,
			.66602
		],
		"77": [
			0,
			.69141,
			0,
			0,
			1.04953
		],
		"78": [
			0,
			.69141,
			0,
			0,
			.83212
		],
		"79": [
			0,
			.69141,
			0,
			0,
			.82699
		],
		"80": [
			.18906,
			.69141,
			0,
			0,
			.82753
		],
		"81": [
			.03781,
			.69141,
			0,
			0,
			.82699
		],
		"82": [
			0,
			.69141,
			0,
			0,
			.82807
		],
		"83": [
			0,
			.69141,
			0,
			0,
			.82861
		],
		"84": [
			0,
			.69141,
			0,
			0,
			.66899
		],
		"85": [
			0,
			.69141,
			0,
			0,
			.64576
		],
		"86": [
			0,
			.69141,
			0,
			0,
			.83131
		],
		"87": [
			0,
			.69141,
			0,
			0,
			1.04602
		],
		"88": [
			0,
			.69141,
			0,
			0,
			.71922
		],
		"89": [
			.18906,
			.69141,
			0,
			0,
			.83293
		],
		"90": [
			.12604,
			.69141,
			0,
			0,
			.60201
		],
		"91": [
			.24982,
			.74947,
			0,
			0,
			.27764
		],
		"93": [
			.24982,
			.74947,
			0,
			0,
			.27764
		],
		"94": [
			0,
			.69141,
			0,
			0,
			.49965
		],
		"97": [
			0,
			.47534,
			0,
			0,
			.50046
		],
		"98": [
			0,
			.69141,
			0,
			0,
			.51315
		],
		"99": [
			0,
			.47534,
			0,
			0,
			.38946
		],
		"100": [
			0,
			.62119,
			0,
			0,
			.49857
		],
		"101": [
			0,
			.47534,
			0,
			0,
			.40053
		],
		"102": [
			.18906,
			.69141,
			0,
			0,
			.32626
		],
		"103": [
			.18906,
			.47534,
			0,
			0,
			.5037
		],
		"104": [
			.18906,
			.69141,
			0,
			0,
			.52126
		],
		"105": [
			0,
			.69141,
			0,
			0,
			.27899
		],
		"106": [
			0,
			.69141,
			0,
			0,
			.28088
		],
		"107": [
			0,
			.69141,
			0,
			0,
			.38946
		],
		"108": [
			0,
			.69141,
			0,
			0,
			.27953
		],
		"109": [
			0,
			.47534,
			0,
			0,
			.76676
		],
		"110": [
			0,
			.47534,
			0,
			0,
			.52666
		],
		"111": [
			0,
			.47534,
			0,
			0,
			.48885
		],
		"112": [
			.18906,
			.52396,
			0,
			0,
			.50046
		],
		"113": [
			.18906,
			.47534,
			0,
			0,
			.48912
		],
		"114": [
			0,
			.47534,
			0,
			0,
			.38919
		],
		"115": [
			0,
			.47534,
			0,
			0,
			.44266
		],
		"116": [
			0,
			.62119,
			0,
			0,
			.33301
		],
		"117": [
			0,
			.47534,
			0,
			0,
			.5172
		],
		"118": [
			0,
			.52396,
			0,
			0,
			.5118
		],
		"119": [
			0,
			.52396,
			0,
			0,
			.77351
		],
		"120": [
			.18906,
			.47534,
			0,
			0,
			.38865
		],
		"121": [
			.18906,
			.47534,
			0,
			0,
			.49884
		],
		"122": [
			.18906,
			.47534,
			0,
			0,
			.39054
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"8216": [
			0,
			.69141,
			0,
			0,
			.21471
		],
		"8217": [
			0,
			.69141,
			0,
			0,
			.21471
		],
		"58112": [
			0,
			.62119,
			0,
			0,
			.49749
		],
		"58113": [
			0,
			.62119,
			0,
			0,
			.4983
		],
		"58114": [
			.18906,
			.69141,
			0,
			0,
			.33328
		],
		"58115": [
			.18906,
			.69141,
			0,
			0,
			.32923
		],
		"58116": [
			.18906,
			.47534,
			0,
			0,
			.50343
		],
		"58117": [
			0,
			.69141,
			0,
			0,
			.33301
		],
		"58118": [
			0,
			.62119,
			0,
			0,
			.33409
		],
		"58119": [
			0,
			.47534,
			0,
			0,
			.50073
		]
	},
	"Main-Bold": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"33": [
			0,
			.69444,
			0,
			0,
			.35
		],
		"34": [
			0,
			.69444,
			0,
			0,
			.60278
		],
		"35": [
			.19444,
			.69444,
			0,
			0,
			.95833
		],
		"36": [
			.05556,
			.75,
			0,
			0,
			.575
		],
		"37": [
			.05556,
			.75,
			0,
			0,
			.95833
		],
		"38": [
			0,
			.69444,
			0,
			0,
			.89444
		],
		"39": [
			0,
			.69444,
			0,
			0,
			.31944
		],
		"40": [
			.25,
			.75,
			0,
			0,
			.44722
		],
		"41": [
			.25,
			.75,
			0,
			0,
			.44722
		],
		"42": [
			0,
			.75,
			0,
			0,
			.575
		],
		"43": [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		"44": [
			.19444,
			.15556,
			0,
			0,
			.31944
		],
		"45": [
			0,
			.44444,
			0,
			0,
			.38333
		],
		"46": [
			0,
			.15556,
			0,
			0,
			.31944
		],
		"47": [
			.25,
			.75,
			0,
			0,
			.575
		],
		"48": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"49": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"50": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"51": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"52": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"53": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"54": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"55": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"56": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"57": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"58": [
			0,
			.44444,
			0,
			0,
			.31944
		],
		"59": [
			.19444,
			.44444,
			0,
			0,
			.31944
		],
		"60": [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		"61": [
			-.10889,
			.39111,
			0,
			0,
			.89444
		],
		"62": [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		"63": [
			0,
			.69444,
			0,
			0,
			.54305
		],
		"64": [
			0,
			.69444,
			0,
			0,
			.89444
		],
		"65": [
			0,
			.68611,
			0,
			0,
			.86944
		],
		"66": [
			0,
			.68611,
			0,
			0,
			.81805
		],
		"67": [
			0,
			.68611,
			0,
			0,
			.83055
		],
		"68": [
			0,
			.68611,
			0,
			0,
			.88194
		],
		"69": [
			0,
			.68611,
			0,
			0,
			.75555
		],
		"70": [
			0,
			.68611,
			0,
			0,
			.72361
		],
		"71": [
			0,
			.68611,
			0,
			0,
			.90416
		],
		"72": [
			0,
			.68611,
			0,
			0,
			.9
		],
		"73": [
			0,
			.68611,
			0,
			0,
			.43611
		],
		"74": [
			0,
			.68611,
			0,
			0,
			.59444
		],
		"75": [
			0,
			.68611,
			0,
			0,
			.90138
		],
		"76": [
			0,
			.68611,
			0,
			0,
			.69166
		],
		"77": [
			0,
			.68611,
			0,
			0,
			1.09166
		],
		"78": [
			0,
			.68611,
			0,
			0,
			.9
		],
		"79": [
			0,
			.68611,
			0,
			0,
			.86388
		],
		"80": [
			0,
			.68611,
			0,
			0,
			.78611
		],
		"81": [
			.19444,
			.68611,
			0,
			0,
			.86388
		],
		"82": [
			0,
			.68611,
			0,
			0,
			.8625
		],
		"83": [
			0,
			.68611,
			0,
			0,
			.63889
		],
		"84": [
			0,
			.68611,
			0,
			0,
			.8
		],
		"85": [
			0,
			.68611,
			0,
			0,
			.88472
		],
		"86": [
			0,
			.68611,
			.01597,
			0,
			.86944
		],
		"87": [
			0,
			.68611,
			.01597,
			0,
			1.18888
		],
		"88": [
			0,
			.68611,
			0,
			0,
			.86944
		],
		"89": [
			0,
			.68611,
			.02875,
			0,
			.86944
		],
		"90": [
			0,
			.68611,
			0,
			0,
			.70277
		],
		"91": [
			.25,
			.75,
			0,
			0,
			.31944
		],
		"92": [
			.25,
			.75,
			0,
			0,
			.575
		],
		"93": [
			.25,
			.75,
			0,
			0,
			.31944
		],
		"94": [
			0,
			.69444,
			0,
			0,
			.575
		],
		"95": [
			.31,
			.13444,
			.03194,
			0,
			.575
		],
		"97": [
			0,
			.44444,
			0,
			0,
			.55902
		],
		"98": [
			0,
			.69444,
			0,
			0,
			.63889
		],
		"99": [
			0,
			.44444,
			0,
			0,
			.51111
		],
		"100": [
			0,
			.69444,
			0,
			0,
			.63889
		],
		"101": [
			0,
			.44444,
			0,
			0,
			.52708
		],
		"102": [
			0,
			.69444,
			.10903,
			0,
			.35139
		],
		"103": [
			.19444,
			.44444,
			.01597,
			0,
			.575
		],
		"104": [
			0,
			.69444,
			0,
			0,
			.63889
		],
		"105": [
			0,
			.69444,
			0,
			0,
			.31944
		],
		"106": [
			.19444,
			.69444,
			0,
			0,
			.35139
		],
		"107": [
			0,
			.69444,
			0,
			0,
			.60694
		],
		"108": [
			0,
			.69444,
			0,
			0,
			.31944
		],
		"109": [
			0,
			.44444,
			0,
			0,
			.95833
		],
		"110": [
			0,
			.44444,
			0,
			0,
			.63889
		],
		"111": [
			0,
			.44444,
			0,
			0,
			.575
		],
		"112": [
			.19444,
			.44444,
			0,
			0,
			.63889
		],
		"113": [
			.19444,
			.44444,
			0,
			0,
			.60694
		],
		"114": [
			0,
			.44444,
			0,
			0,
			.47361
		],
		"115": [
			0,
			.44444,
			0,
			0,
			.45361
		],
		"116": [
			0,
			.63492,
			0,
			0,
			.44722
		],
		"117": [
			0,
			.44444,
			0,
			0,
			.63889
		],
		"118": [
			0,
			.44444,
			.01597,
			0,
			.60694
		],
		"119": [
			0,
			.44444,
			.01597,
			0,
			.83055
		],
		"120": [
			0,
			.44444,
			0,
			0,
			.60694
		],
		"121": [
			.19444,
			.44444,
			.01597,
			0,
			.60694
		],
		"122": [
			0,
			.44444,
			0,
			0,
			.51111
		],
		"123": [
			.25,
			.75,
			0,
			0,
			.575
		],
		"124": [
			.25,
			.75,
			0,
			0,
			.31944
		],
		"125": [
			.25,
			.75,
			0,
			0,
			.575
		],
		"126": [
			.35,
			.34444,
			0,
			0,
			.575
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"163": [
			0,
			.69444,
			0,
			0,
			.86853
		],
		"168": [
			0,
			.69444,
			0,
			0,
			.575
		],
		"172": [
			0,
			.44444,
			0,
			0,
			.76666
		],
		"176": [
			0,
			.69444,
			0,
			0,
			.86944
		],
		"177": [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		"184": [
			.17014,
			0,
			0,
			0,
			.51111
		],
		"198": [
			0,
			.68611,
			0,
			0,
			1.04166
		],
		"215": [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		"216": [
			.04861,
			.73472,
			0,
			0,
			.89444
		],
		"223": [
			0,
			.69444,
			0,
			0,
			.59722
		],
		"230": [
			0,
			.44444,
			0,
			0,
			.83055
		],
		"247": [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		"248": [
			.09722,
			.54167,
			0,
			0,
			.575
		],
		"305": [
			0,
			.44444,
			0,
			0,
			.31944
		],
		"338": [
			0,
			.68611,
			0,
			0,
			1.16944
		],
		"339": [
			0,
			.44444,
			0,
			0,
			.89444
		],
		"567": [
			.19444,
			.44444,
			0,
			0,
			.35139
		],
		"710": [
			0,
			.69444,
			0,
			0,
			.575
		],
		"711": [
			0,
			.63194,
			0,
			0,
			.575
		],
		"713": [
			0,
			.59611,
			0,
			0,
			.575
		],
		"714": [
			0,
			.69444,
			0,
			0,
			.575
		],
		"715": [
			0,
			.69444,
			0,
			0,
			.575
		],
		"728": [
			0,
			.69444,
			0,
			0,
			.575
		],
		"729": [
			0,
			.69444,
			0,
			0,
			.31944
		],
		"730": [
			0,
			.69444,
			0,
			0,
			.86944
		],
		"732": [
			0,
			.69444,
			0,
			0,
			.575
		],
		"733": [
			0,
			.69444,
			0,
			0,
			.575
		],
		"915": [
			0,
			.68611,
			0,
			0,
			.69166
		],
		"916": [
			0,
			.68611,
			0,
			0,
			.95833
		],
		"920": [
			0,
			.68611,
			0,
			0,
			.89444
		],
		"923": [
			0,
			.68611,
			0,
			0,
			.80555
		],
		"926": [
			0,
			.68611,
			0,
			0,
			.76666
		],
		"928": [
			0,
			.68611,
			0,
			0,
			.9
		],
		"931": [
			0,
			.68611,
			0,
			0,
			.83055
		],
		"933": [
			0,
			.68611,
			0,
			0,
			.89444
		],
		"934": [
			0,
			.68611,
			0,
			0,
			.83055
		],
		"936": [
			0,
			.68611,
			0,
			0,
			.89444
		],
		"937": [
			0,
			.68611,
			0,
			0,
			.83055
		],
		"8211": [
			0,
			.44444,
			.03194,
			0,
			.575
		],
		"8212": [
			0,
			.44444,
			.03194,
			0,
			1.14999
		],
		"8216": [
			0,
			.69444,
			0,
			0,
			.31944
		],
		"8217": [
			0,
			.69444,
			0,
			0,
			.31944
		],
		"8220": [
			0,
			.69444,
			0,
			0,
			.60278
		],
		"8221": [
			0,
			.69444,
			0,
			0,
			.60278
		],
		"8224": [
			.19444,
			.69444,
			0,
			0,
			.51111
		],
		"8225": [
			.19444,
			.69444,
			0,
			0,
			.51111
		],
		"8242": [
			0,
			.55556,
			0,
			0,
			.34444
		],
		"8407": [
			0,
			.72444,
			.15486,
			0,
			.575
		],
		"8463": [
			0,
			.69444,
			0,
			0,
			.66759
		],
		"8465": [
			0,
			.69444,
			0,
			0,
			.83055
		],
		"8467": [
			0,
			.69444,
			0,
			0,
			.47361
		],
		"8472": [
			.19444,
			.44444,
			0,
			0,
			.74027
		],
		"8476": [
			0,
			.69444,
			0,
			0,
			.83055
		],
		"8501": [
			0,
			.69444,
			0,
			0,
			.70277
		],
		"8592": [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		"8593": [
			.19444,
			.69444,
			0,
			0,
			.575
		],
		"8594": [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		"8595": [
			.19444,
			.69444,
			0,
			0,
			.575
		],
		"8596": [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		"8597": [
			.25,
			.75,
			0,
			0,
			.575
		],
		"8598": [
			.19444,
			.69444,
			0,
			0,
			1.14999
		],
		"8599": [
			.19444,
			.69444,
			0,
			0,
			1.14999
		],
		"8600": [
			.19444,
			.69444,
			0,
			0,
			1.14999
		],
		"8601": [
			.19444,
			.69444,
			0,
			0,
			1.14999
		],
		"8636": [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		"8637": [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		"8640": [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		"8641": [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		"8656": [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		"8657": [
			.19444,
			.69444,
			0,
			0,
			.70277
		],
		"8658": [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		"8659": [
			.19444,
			.69444,
			0,
			0,
			.70277
		],
		"8660": [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		"8661": [
			.25,
			.75,
			0,
			0,
			.70277
		],
		"8704": [
			0,
			.69444,
			0,
			0,
			.63889
		],
		"8706": [
			0,
			.69444,
			.06389,
			0,
			.62847
		],
		"8707": [
			0,
			.69444,
			0,
			0,
			.63889
		],
		"8709": [
			.05556,
			.75,
			0,
			0,
			.575
		],
		"8711": [
			0,
			.68611,
			0,
			0,
			.95833
		],
		"8712": [
			.08556,
			.58556,
			0,
			0,
			.76666
		],
		"8715": [
			.08556,
			.58556,
			0,
			0,
			.76666
		],
		"8722": [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		"8723": [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		"8725": [
			.25,
			.75,
			0,
			0,
			.575
		],
		"8726": [
			.25,
			.75,
			0,
			0,
			.575
		],
		"8727": [
			-.02778,
			.47222,
			0,
			0,
			.575
		],
		"8728": [
			-.02639,
			.47361,
			0,
			0,
			.575
		],
		"8729": [
			-.02639,
			.47361,
			0,
			0,
			.575
		],
		"8730": [
			.18,
			.82,
			0,
			0,
			.95833
		],
		"8733": [
			0,
			.44444,
			0,
			0,
			.89444
		],
		"8734": [
			0,
			.44444,
			0,
			0,
			1.14999
		],
		"8736": [
			0,
			.69224,
			0,
			0,
			.72222
		],
		"8739": [
			.25,
			.75,
			0,
			0,
			.31944
		],
		"8741": [
			.25,
			.75,
			0,
			0,
			.575
		],
		"8743": [
			0,
			.55556,
			0,
			0,
			.76666
		],
		"8744": [
			0,
			.55556,
			0,
			0,
			.76666
		],
		"8745": [
			0,
			.55556,
			0,
			0,
			.76666
		],
		"8746": [
			0,
			.55556,
			0,
			0,
			.76666
		],
		"8747": [
			.19444,
			.69444,
			.12778,
			0,
			.56875
		],
		"8764": [
			-.10889,
			.39111,
			0,
			0,
			.89444
		],
		"8768": [
			.19444,
			.69444,
			0,
			0,
			.31944
		],
		"8771": [
			.00222,
			.50222,
			0,
			0,
			.89444
		],
		"8773": [
			.027,
			.638,
			0,
			0,
			.894
		],
		"8776": [
			.02444,
			.52444,
			0,
			0,
			.89444
		],
		"8781": [
			.00222,
			.50222,
			0,
			0,
			.89444
		],
		"8801": [
			.00222,
			.50222,
			0,
			0,
			.89444
		],
		"8804": [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		"8805": [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		"8810": [
			.08556,
			.58556,
			0,
			0,
			1.14999
		],
		"8811": [
			.08556,
			.58556,
			0,
			0,
			1.14999
		],
		"8826": [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		"8827": [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		"8834": [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		"8835": [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		"8838": [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		"8839": [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		"8846": [
			0,
			.55556,
			0,
			0,
			.76666
		],
		"8849": [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		"8850": [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		"8851": [
			0,
			.55556,
			0,
			0,
			.76666
		],
		"8852": [
			0,
			.55556,
			0,
			0,
			.76666
		],
		"8853": [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		"8854": [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		"8855": [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		"8856": [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		"8857": [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		"8866": [
			0,
			.69444,
			0,
			0,
			.70277
		],
		"8867": [
			0,
			.69444,
			0,
			0,
			.70277
		],
		"8868": [
			0,
			.69444,
			0,
			0,
			.89444
		],
		"8869": [
			0,
			.69444,
			0,
			0,
			.89444
		],
		"8900": [
			-.02639,
			.47361,
			0,
			0,
			.575
		],
		"8901": [
			-.02639,
			.47361,
			0,
			0,
			.31944
		],
		"8902": [
			-.02778,
			.47222,
			0,
			0,
			.575
		],
		"8968": [
			.25,
			.75,
			0,
			0,
			.51111
		],
		"8969": [
			.25,
			.75,
			0,
			0,
			.51111
		],
		"8970": [
			.25,
			.75,
			0,
			0,
			.51111
		],
		"8971": [
			.25,
			.75,
			0,
			0,
			.51111
		],
		"8994": [
			-.13889,
			.36111,
			0,
			0,
			1.14999
		],
		"8995": [
			-.13889,
			.36111,
			0,
			0,
			1.14999
		],
		"9651": [
			.19444,
			.69444,
			0,
			0,
			1.02222
		],
		"9657": [
			-.02778,
			.47222,
			0,
			0,
			.575
		],
		"9661": [
			.19444,
			.69444,
			0,
			0,
			1.02222
		],
		"9667": [
			-.02778,
			.47222,
			0,
			0,
			.575
		],
		"9711": [
			.19444,
			.69444,
			0,
			0,
			1.14999
		],
		"9824": [
			.12963,
			.69444,
			0,
			0,
			.89444
		],
		"9825": [
			.12963,
			.69444,
			0,
			0,
			.89444
		],
		"9826": [
			.12963,
			.69444,
			0,
			0,
			.89444
		],
		"9827": [
			.12963,
			.69444,
			0,
			0,
			.89444
		],
		"9837": [
			0,
			.75,
			0,
			0,
			.44722
		],
		"9838": [
			.19444,
			.69444,
			0,
			0,
			.44722
		],
		"9839": [
			.19444,
			.69444,
			0,
			0,
			.44722
		],
		"10216": [
			.25,
			.75,
			0,
			0,
			.44722
		],
		"10217": [
			.25,
			.75,
			0,
			0,
			.44722
		],
		"10815": [
			0,
			.68611,
			0,
			0,
			.9
		],
		"10927": [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		"10928": [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		"57376": [
			.19444,
			.69444,
			0,
			0,
			0
		]
	},
	"Main-BoldItalic": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"33": [
			0,
			.69444,
			.11417,
			0,
			.38611
		],
		"34": [
			0,
			.69444,
			.07939,
			0,
			.62055
		],
		"35": [
			.19444,
			.69444,
			.06833,
			0,
			.94444
		],
		"37": [
			.05556,
			.75,
			.12861,
			0,
			.94444
		],
		"38": [
			0,
			.69444,
			.08528,
			0,
			.88555
		],
		"39": [
			0,
			.69444,
			.12945,
			0,
			.35555
		],
		"40": [
			.25,
			.75,
			.15806,
			0,
			.47333
		],
		"41": [
			.25,
			.75,
			.03306,
			0,
			.47333
		],
		"42": [
			0,
			.75,
			.14333,
			0,
			.59111
		],
		"43": [
			.10333,
			.60333,
			.03306,
			0,
			.88555
		],
		"44": [
			.19444,
			.14722,
			0,
			0,
			.35555
		],
		"45": [
			0,
			.44444,
			.02611,
			0,
			.41444
		],
		"46": [
			0,
			.14722,
			0,
			0,
			.35555
		],
		"47": [
			.25,
			.75,
			.15806,
			0,
			.59111
		],
		"48": [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		"49": [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		"50": [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		"51": [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		"52": [
			.19444,
			.64444,
			.13167,
			0,
			.59111
		],
		"53": [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		"54": [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		"55": [
			.19444,
			.64444,
			.13167,
			0,
			.59111
		],
		"56": [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		"57": [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		"58": [
			0,
			.44444,
			.06695,
			0,
			.35555
		],
		"59": [
			.19444,
			.44444,
			.06695,
			0,
			.35555
		],
		"61": [
			-.10889,
			.39111,
			.06833,
			0,
			.88555
		],
		"63": [
			0,
			.69444,
			.11472,
			0,
			.59111
		],
		"64": [
			0,
			.69444,
			.09208,
			0,
			.88555
		],
		"65": [
			0,
			.68611,
			0,
			0,
			.86555
		],
		"66": [
			0,
			.68611,
			.0992,
			0,
			.81666
		],
		"67": [
			0,
			.68611,
			.14208,
			0,
			.82666
		],
		"68": [
			0,
			.68611,
			.09062,
			0,
			.87555
		],
		"69": [
			0,
			.68611,
			.11431,
			0,
			.75666
		],
		"70": [
			0,
			.68611,
			.12903,
			0,
			.72722
		],
		"71": [
			0,
			.68611,
			.07347,
			0,
			.89527
		],
		"72": [
			0,
			.68611,
			.17208,
			0,
			.8961
		],
		"73": [
			0,
			.68611,
			.15681,
			0,
			.47166
		],
		"74": [
			0,
			.68611,
			.145,
			0,
			.61055
		],
		"75": [
			0,
			.68611,
			.14208,
			0,
			.89499
		],
		"76": [
			0,
			.68611,
			0,
			0,
			.69777
		],
		"77": [
			0,
			.68611,
			.17208,
			0,
			1.07277
		],
		"78": [
			0,
			.68611,
			.17208,
			0,
			.8961
		],
		"79": [
			0,
			.68611,
			.09062,
			0,
			.85499
		],
		"80": [
			0,
			.68611,
			.0992,
			0,
			.78721
		],
		"81": [
			.19444,
			.68611,
			.09062,
			0,
			.85499
		],
		"82": [
			0,
			.68611,
			.02559,
			0,
			.85944
		],
		"83": [
			0,
			.68611,
			.11264,
			0,
			.64999
		],
		"84": [
			0,
			.68611,
			.12903,
			0,
			.7961
		],
		"85": [
			0,
			.68611,
			.17208,
			0,
			.88083
		],
		"86": [
			0,
			.68611,
			.18625,
			0,
			.86555
		],
		"87": [
			0,
			.68611,
			.18625,
			0,
			1.15999
		],
		"88": [
			0,
			.68611,
			.15681,
			0,
			.86555
		],
		"89": [
			0,
			.68611,
			.19803,
			0,
			.86555
		],
		"90": [
			0,
			.68611,
			.14208,
			0,
			.70888
		],
		"91": [
			.25,
			.75,
			.1875,
			0,
			.35611
		],
		"93": [
			.25,
			.75,
			.09972,
			0,
			.35611
		],
		"94": [
			0,
			.69444,
			.06709,
			0,
			.59111
		],
		"95": [
			.31,
			.13444,
			.09811,
			0,
			.59111
		],
		"97": [
			0,
			.44444,
			.09426,
			0,
			.59111
		],
		"98": [
			0,
			.69444,
			.07861,
			0,
			.53222
		],
		"99": [
			0,
			.44444,
			.05222,
			0,
			.53222
		],
		"100": [
			0,
			.69444,
			.10861,
			0,
			.59111
		],
		"101": [
			0,
			.44444,
			.085,
			0,
			.53222
		],
		"102": [
			.19444,
			.69444,
			.21778,
			0,
			.4
		],
		"103": [
			.19444,
			.44444,
			.105,
			0,
			.53222
		],
		"104": [
			0,
			.69444,
			.09426,
			0,
			.59111
		],
		"105": [
			0,
			.69326,
			.11387,
			0,
			.35555
		],
		"106": [
			.19444,
			.69326,
			.1672,
			0,
			.35555
		],
		"107": [
			0,
			.69444,
			.11111,
			0,
			.53222
		],
		"108": [
			0,
			.69444,
			.10861,
			0,
			.29666
		],
		"109": [
			0,
			.44444,
			.09426,
			0,
			.94444
		],
		"110": [
			0,
			.44444,
			.09426,
			0,
			.64999
		],
		"111": [
			0,
			.44444,
			.07861,
			0,
			.59111
		],
		"112": [
			.19444,
			.44444,
			.07861,
			0,
			.59111
		],
		"113": [
			.19444,
			.44444,
			.105,
			0,
			.53222
		],
		"114": [
			0,
			.44444,
			.11111,
			0,
			.50167
		],
		"115": [
			0,
			.44444,
			.08167,
			0,
			.48694
		],
		"116": [
			0,
			.63492,
			.09639,
			0,
			.385
		],
		"117": [
			0,
			.44444,
			.09426,
			0,
			.62055
		],
		"118": [
			0,
			.44444,
			.11111,
			0,
			.53222
		],
		"119": [
			0,
			.44444,
			.11111,
			0,
			.76777
		],
		"120": [
			0,
			.44444,
			.12583,
			0,
			.56055
		],
		"121": [
			.19444,
			.44444,
			.105,
			0,
			.56166
		],
		"122": [
			0,
			.44444,
			.13889,
			0,
			.49055
		],
		"126": [
			.35,
			.34444,
			.11472,
			0,
			.59111
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"168": [
			0,
			.69444,
			.11473,
			0,
			.59111
		],
		"176": [
			0,
			.69444,
			0,
			0,
			.94888
		],
		"184": [
			.17014,
			0,
			0,
			0,
			.53222
		],
		"198": [
			0,
			.68611,
			.11431,
			0,
			1.02277
		],
		"216": [
			.04861,
			.73472,
			.09062,
			0,
			.88555
		],
		"223": [
			.19444,
			.69444,
			.09736,
			0,
			.665
		],
		"230": [
			0,
			.44444,
			.085,
			0,
			.82666
		],
		"248": [
			.09722,
			.54167,
			.09458,
			0,
			.59111
		],
		"305": [
			0,
			.44444,
			.09426,
			0,
			.35555
		],
		"338": [
			0,
			.68611,
			.11431,
			0,
			1.14054
		],
		"339": [
			0,
			.44444,
			.085,
			0,
			.82666
		],
		"567": [
			.19444,
			.44444,
			.04611,
			0,
			.385
		],
		"710": [
			0,
			.69444,
			.06709,
			0,
			.59111
		],
		"711": [
			0,
			.63194,
			.08271,
			0,
			.59111
		],
		"713": [
			0,
			.59444,
			.10444,
			0,
			.59111
		],
		"714": [
			0,
			.69444,
			.08528,
			0,
			.59111
		],
		"715": [
			0,
			.69444,
			0,
			0,
			.59111
		],
		"728": [
			0,
			.69444,
			.10333,
			0,
			.59111
		],
		"729": [
			0,
			.69444,
			.12945,
			0,
			.35555
		],
		"730": [
			0,
			.69444,
			0,
			0,
			.94888
		],
		"732": [
			0,
			.69444,
			.11472,
			0,
			.59111
		],
		"733": [
			0,
			.69444,
			.11472,
			0,
			.59111
		],
		"915": [
			0,
			.68611,
			.12903,
			0,
			.69777
		],
		"916": [
			0,
			.68611,
			0,
			0,
			.94444
		],
		"920": [
			0,
			.68611,
			.09062,
			0,
			.88555
		],
		"923": [
			0,
			.68611,
			0,
			0,
			.80666
		],
		"926": [
			0,
			.68611,
			.15092,
			0,
			.76777
		],
		"928": [
			0,
			.68611,
			.17208,
			0,
			.8961
		],
		"931": [
			0,
			.68611,
			.11431,
			0,
			.82666
		],
		"933": [
			0,
			.68611,
			.10778,
			0,
			.88555
		],
		"934": [
			0,
			.68611,
			.05632,
			0,
			.82666
		],
		"936": [
			0,
			.68611,
			.10778,
			0,
			.88555
		],
		"937": [
			0,
			.68611,
			.0992,
			0,
			.82666
		],
		"8211": [
			0,
			.44444,
			.09811,
			0,
			.59111
		],
		"8212": [
			0,
			.44444,
			.09811,
			0,
			1.18221
		],
		"8216": [
			0,
			.69444,
			.12945,
			0,
			.35555
		],
		"8217": [
			0,
			.69444,
			.12945,
			0,
			.35555
		],
		"8220": [
			0,
			.69444,
			.16772,
			0,
			.62055
		],
		"8221": [
			0,
			.69444,
			.07939,
			0,
			.62055
		]
	},
	"Main-Italic": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"33": [
			0,
			.69444,
			.12417,
			0,
			.30667
		],
		"34": [
			0,
			.69444,
			.06961,
			0,
			.51444
		],
		"35": [
			.19444,
			.69444,
			.06616,
			0,
			.81777
		],
		"37": [
			.05556,
			.75,
			.13639,
			0,
			.81777
		],
		"38": [
			0,
			.69444,
			.09694,
			0,
			.76666
		],
		"39": [
			0,
			.69444,
			.12417,
			0,
			.30667
		],
		"40": [
			.25,
			.75,
			.16194,
			0,
			.40889
		],
		"41": [
			.25,
			.75,
			.03694,
			0,
			.40889
		],
		"42": [
			0,
			.75,
			.14917,
			0,
			.51111
		],
		"43": [
			.05667,
			.56167,
			.03694,
			0,
			.76666
		],
		"44": [
			.19444,
			.10556,
			0,
			0,
			.30667
		],
		"45": [
			0,
			.43056,
			.02826,
			0,
			.35778
		],
		"46": [
			0,
			.10556,
			0,
			0,
			.30667
		],
		"47": [
			.25,
			.75,
			.16194,
			0,
			.51111
		],
		"48": [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		"49": [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		"50": [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		"51": [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		"52": [
			.19444,
			.64444,
			.13556,
			0,
			.51111
		],
		"53": [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		"54": [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		"55": [
			.19444,
			.64444,
			.13556,
			0,
			.51111
		],
		"56": [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		"57": [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		"58": [
			0,
			.43056,
			.0582,
			0,
			.30667
		],
		"59": [
			.19444,
			.43056,
			.0582,
			0,
			.30667
		],
		"61": [
			-.13313,
			.36687,
			.06616,
			0,
			.76666
		],
		"63": [
			0,
			.69444,
			.1225,
			0,
			.51111
		],
		"64": [
			0,
			.69444,
			.09597,
			0,
			.76666
		],
		"65": [
			0,
			.68333,
			0,
			0,
			.74333
		],
		"66": [
			0,
			.68333,
			.10257,
			0,
			.70389
		],
		"67": [
			0,
			.68333,
			.14528,
			0,
			.71555
		],
		"68": [
			0,
			.68333,
			.09403,
			0,
			.755
		],
		"69": [
			0,
			.68333,
			.12028,
			0,
			.67833
		],
		"70": [
			0,
			.68333,
			.13305,
			0,
			.65277
		],
		"71": [
			0,
			.68333,
			.08722,
			0,
			.77361
		],
		"72": [
			0,
			.68333,
			.16389,
			0,
			.74333
		],
		"73": [
			0,
			.68333,
			.15806,
			0,
			.38555
		],
		"74": [
			0,
			.68333,
			.14028,
			0,
			.525
		],
		"75": [
			0,
			.68333,
			.14528,
			0,
			.76888
		],
		"76": [
			0,
			.68333,
			0,
			0,
			.62722
		],
		"77": [
			0,
			.68333,
			.16389,
			0,
			.89666
		],
		"78": [
			0,
			.68333,
			.16389,
			0,
			.74333
		],
		"79": [
			0,
			.68333,
			.09403,
			0,
			.76666
		],
		"80": [
			0,
			.68333,
			.10257,
			0,
			.67833
		],
		"81": [
			.19444,
			.68333,
			.09403,
			0,
			.76666
		],
		"82": [
			0,
			.68333,
			.03868,
			0,
			.72944
		],
		"83": [
			0,
			.68333,
			.11972,
			0,
			.56222
		],
		"84": [
			0,
			.68333,
			.13305,
			0,
			.71555
		],
		"85": [
			0,
			.68333,
			.16389,
			0,
			.74333
		],
		"86": [
			0,
			.68333,
			.18361,
			0,
			.74333
		],
		"87": [
			0,
			.68333,
			.18361,
			0,
			.99888
		],
		"88": [
			0,
			.68333,
			.15806,
			0,
			.74333
		],
		"89": [
			0,
			.68333,
			.19383,
			0,
			.74333
		],
		"90": [
			0,
			.68333,
			.14528,
			0,
			.61333
		],
		"91": [
			.25,
			.75,
			.1875,
			0,
			.30667
		],
		"93": [
			.25,
			.75,
			.10528,
			0,
			.30667
		],
		"94": [
			0,
			.69444,
			.06646,
			0,
			.51111
		],
		"95": [
			.31,
			.12056,
			.09208,
			0,
			.51111
		],
		"97": [
			0,
			.43056,
			.07671,
			0,
			.51111
		],
		"98": [
			0,
			.69444,
			.06312,
			0,
			.46
		],
		"99": [
			0,
			.43056,
			.05653,
			0,
			.46
		],
		"100": [
			0,
			.69444,
			.10333,
			0,
			.51111
		],
		"101": [
			0,
			.43056,
			.07514,
			0,
			.46
		],
		"102": [
			.19444,
			.69444,
			.21194,
			0,
			.30667
		],
		"103": [
			.19444,
			.43056,
			.08847,
			0,
			.46
		],
		"104": [
			0,
			.69444,
			.07671,
			0,
			.51111
		],
		"105": [
			0,
			.65536,
			.1019,
			0,
			.30667
		],
		"106": [
			.19444,
			.65536,
			.14467,
			0,
			.30667
		],
		"107": [
			0,
			.69444,
			.10764,
			0,
			.46
		],
		"108": [
			0,
			.69444,
			.10333,
			0,
			.25555
		],
		"109": [
			0,
			.43056,
			.07671,
			0,
			.81777
		],
		"110": [
			0,
			.43056,
			.07671,
			0,
			.56222
		],
		"111": [
			0,
			.43056,
			.06312,
			0,
			.51111
		],
		"112": [
			.19444,
			.43056,
			.06312,
			0,
			.51111
		],
		"113": [
			.19444,
			.43056,
			.08847,
			0,
			.46
		],
		"114": [
			0,
			.43056,
			.10764,
			0,
			.42166
		],
		"115": [
			0,
			.43056,
			.08208,
			0,
			.40889
		],
		"116": [
			0,
			.61508,
			.09486,
			0,
			.33222
		],
		"117": [
			0,
			.43056,
			.07671,
			0,
			.53666
		],
		"118": [
			0,
			.43056,
			.10764,
			0,
			.46
		],
		"119": [
			0,
			.43056,
			.10764,
			0,
			.66444
		],
		"120": [
			0,
			.43056,
			.12042,
			0,
			.46389
		],
		"121": [
			.19444,
			.43056,
			.08847,
			0,
			.48555
		],
		"122": [
			0,
			.43056,
			.12292,
			0,
			.40889
		],
		"126": [
			.35,
			.31786,
			.11585,
			0,
			.51111
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"168": [
			0,
			.66786,
			.10474,
			0,
			.51111
		],
		"176": [
			0,
			.69444,
			0,
			0,
			.83129
		],
		"184": [
			.17014,
			0,
			0,
			0,
			.46
		],
		"198": [
			0,
			.68333,
			.12028,
			0,
			.88277
		],
		"216": [
			.04861,
			.73194,
			.09403,
			0,
			.76666
		],
		"223": [
			.19444,
			.69444,
			.10514,
			0,
			.53666
		],
		"230": [
			0,
			.43056,
			.07514,
			0,
			.71555
		],
		"248": [
			.09722,
			.52778,
			.09194,
			0,
			.51111
		],
		"338": [
			0,
			.68333,
			.12028,
			0,
			.98499
		],
		"339": [
			0,
			.43056,
			.07514,
			0,
			.71555
		],
		"710": [
			0,
			.69444,
			.06646,
			0,
			.51111
		],
		"711": [
			0,
			.62847,
			.08295,
			0,
			.51111
		],
		"713": [
			0,
			.56167,
			.10333,
			0,
			.51111
		],
		"714": [
			0,
			.69444,
			.09694,
			0,
			.51111
		],
		"715": [
			0,
			.69444,
			0,
			0,
			.51111
		],
		"728": [
			0,
			.69444,
			.10806,
			0,
			.51111
		],
		"729": [
			0,
			.66786,
			.11752,
			0,
			.30667
		],
		"730": [
			0,
			.69444,
			0,
			0,
			.83129
		],
		"732": [
			0,
			.66786,
			.11585,
			0,
			.51111
		],
		"733": [
			0,
			.69444,
			.1225,
			0,
			.51111
		],
		"915": [
			0,
			.68333,
			.13305,
			0,
			.62722
		],
		"916": [
			0,
			.68333,
			0,
			0,
			.81777
		],
		"920": [
			0,
			.68333,
			.09403,
			0,
			.76666
		],
		"923": [
			0,
			.68333,
			0,
			0,
			.69222
		],
		"926": [
			0,
			.68333,
			.15294,
			0,
			.66444
		],
		"928": [
			0,
			.68333,
			.16389,
			0,
			.74333
		],
		"931": [
			0,
			.68333,
			.12028,
			0,
			.71555
		],
		"933": [
			0,
			.68333,
			.11111,
			0,
			.76666
		],
		"934": [
			0,
			.68333,
			.05986,
			0,
			.71555
		],
		"936": [
			0,
			.68333,
			.11111,
			0,
			.76666
		],
		"937": [
			0,
			.68333,
			.10257,
			0,
			.71555
		],
		"8211": [
			0,
			.43056,
			.09208,
			0,
			.51111
		],
		"8212": [
			0,
			.43056,
			.09208,
			0,
			1.02222
		],
		"8216": [
			0,
			.69444,
			.12417,
			0,
			.30667
		],
		"8217": [
			0,
			.69444,
			.12417,
			0,
			.30667
		],
		"8220": [
			0,
			.69444,
			.1685,
			0,
			.51444
		],
		"8221": [
			0,
			.69444,
			.06961,
			0,
			.51444
		],
		"8463": [
			0,
			.68889,
			0,
			0,
			.54028
		]
	},
	"Main-Regular": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"33": [
			0,
			.69444,
			0,
			0,
			.27778
		],
		"34": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"35": [
			.19444,
			.69444,
			0,
			0,
			.83334
		],
		"36": [
			.05556,
			.75,
			0,
			0,
			.5
		],
		"37": [
			.05556,
			.75,
			0,
			0,
			.83334
		],
		"38": [
			0,
			.69444,
			0,
			0,
			.77778
		],
		"39": [
			0,
			.69444,
			0,
			0,
			.27778
		],
		"40": [
			.25,
			.75,
			0,
			0,
			.38889
		],
		"41": [
			.25,
			.75,
			0,
			0,
			.38889
		],
		"42": [
			0,
			.75,
			0,
			0,
			.5
		],
		"43": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"44": [
			.19444,
			.10556,
			0,
			0,
			.27778
		],
		"45": [
			0,
			.43056,
			0,
			0,
			.33333
		],
		"46": [
			0,
			.10556,
			0,
			0,
			.27778
		],
		"47": [
			.25,
			.75,
			0,
			0,
			.5
		],
		"48": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"49": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"50": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"51": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"52": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"53": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"54": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"55": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"56": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"57": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"58": [
			0,
			.43056,
			0,
			0,
			.27778
		],
		"59": [
			.19444,
			.43056,
			0,
			0,
			.27778
		],
		"60": [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		"61": [
			-.13313,
			.36687,
			0,
			0,
			.77778
		],
		"62": [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		"63": [
			0,
			.69444,
			0,
			0,
			.47222
		],
		"64": [
			0,
			.69444,
			0,
			0,
			.77778
		],
		"65": [
			0,
			.68333,
			0,
			0,
			.75
		],
		"66": [
			0,
			.68333,
			0,
			0,
			.70834
		],
		"67": [
			0,
			.68333,
			0,
			0,
			.72222
		],
		"68": [
			0,
			.68333,
			0,
			0,
			.76389
		],
		"69": [
			0,
			.68333,
			0,
			0,
			.68056
		],
		"70": [
			0,
			.68333,
			0,
			0,
			.65278
		],
		"71": [
			0,
			.68333,
			0,
			0,
			.78472
		],
		"72": [
			0,
			.68333,
			0,
			0,
			.75
		],
		"73": [
			0,
			.68333,
			0,
			0,
			.36111
		],
		"74": [
			0,
			.68333,
			0,
			0,
			.51389
		],
		"75": [
			0,
			.68333,
			0,
			0,
			.77778
		],
		"76": [
			0,
			.68333,
			0,
			0,
			.625
		],
		"77": [
			0,
			.68333,
			0,
			0,
			.91667
		],
		"78": [
			0,
			.68333,
			0,
			0,
			.75
		],
		"79": [
			0,
			.68333,
			0,
			0,
			.77778
		],
		"80": [
			0,
			.68333,
			0,
			0,
			.68056
		],
		"81": [
			.19444,
			.68333,
			0,
			0,
			.77778
		],
		"82": [
			0,
			.68333,
			0,
			0,
			.73611
		],
		"83": [
			0,
			.68333,
			0,
			0,
			.55556
		],
		"84": [
			0,
			.68333,
			0,
			0,
			.72222
		],
		"85": [
			0,
			.68333,
			0,
			0,
			.75
		],
		"86": [
			0,
			.68333,
			.01389,
			0,
			.75
		],
		"87": [
			0,
			.68333,
			.01389,
			0,
			1.02778
		],
		"88": [
			0,
			.68333,
			0,
			0,
			.75
		],
		"89": [
			0,
			.68333,
			.025,
			0,
			.75
		],
		"90": [
			0,
			.68333,
			0,
			0,
			.61111
		],
		"91": [
			.25,
			.75,
			0,
			0,
			.27778
		],
		"92": [
			.25,
			.75,
			0,
			0,
			.5
		],
		"93": [
			.25,
			.75,
			0,
			0,
			.27778
		],
		"94": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"95": [
			.31,
			.12056,
			.02778,
			0,
			.5
		],
		"97": [
			0,
			.43056,
			0,
			0,
			.5
		],
		"98": [
			0,
			.69444,
			0,
			0,
			.55556
		],
		"99": [
			0,
			.43056,
			0,
			0,
			.44445
		],
		"100": [
			0,
			.69444,
			0,
			0,
			.55556
		],
		"101": [
			0,
			.43056,
			0,
			0,
			.44445
		],
		"102": [
			0,
			.69444,
			.07778,
			0,
			.30556
		],
		"103": [
			.19444,
			.43056,
			.01389,
			0,
			.5
		],
		"104": [
			0,
			.69444,
			0,
			0,
			.55556
		],
		"105": [
			0,
			.66786,
			0,
			0,
			.27778
		],
		"106": [
			.19444,
			.66786,
			0,
			0,
			.30556
		],
		"107": [
			0,
			.69444,
			0,
			0,
			.52778
		],
		"108": [
			0,
			.69444,
			0,
			0,
			.27778
		],
		"109": [
			0,
			.43056,
			0,
			0,
			.83334
		],
		"110": [
			0,
			.43056,
			0,
			0,
			.55556
		],
		"111": [
			0,
			.43056,
			0,
			0,
			.5
		],
		"112": [
			.19444,
			.43056,
			0,
			0,
			.55556
		],
		"113": [
			.19444,
			.43056,
			0,
			0,
			.52778
		],
		"114": [
			0,
			.43056,
			0,
			0,
			.39167
		],
		"115": [
			0,
			.43056,
			0,
			0,
			.39445
		],
		"116": [
			0,
			.61508,
			0,
			0,
			.38889
		],
		"117": [
			0,
			.43056,
			0,
			0,
			.55556
		],
		"118": [
			0,
			.43056,
			.01389,
			0,
			.52778
		],
		"119": [
			0,
			.43056,
			.01389,
			0,
			.72222
		],
		"120": [
			0,
			.43056,
			0,
			0,
			.52778
		],
		"121": [
			.19444,
			.43056,
			.01389,
			0,
			.52778
		],
		"122": [
			0,
			.43056,
			0,
			0,
			.44445
		],
		"123": [
			.25,
			.75,
			0,
			0,
			.5
		],
		"124": [
			.25,
			.75,
			0,
			0,
			.27778
		],
		"125": [
			.25,
			.75,
			0,
			0,
			.5
		],
		"126": [
			.35,
			.31786,
			0,
			0,
			.5
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"163": [
			0,
			.69444,
			0,
			0,
			.76909
		],
		"167": [
			.19444,
			.69444,
			0,
			0,
			.44445
		],
		"168": [
			0,
			.66786,
			0,
			0,
			.5
		],
		"172": [
			0,
			.43056,
			0,
			0,
			.66667
		],
		"176": [
			0,
			.69444,
			0,
			0,
			.75
		],
		"177": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"182": [
			.19444,
			.69444,
			0,
			0,
			.61111
		],
		"184": [
			.17014,
			0,
			0,
			0,
			.44445
		],
		"198": [
			0,
			.68333,
			0,
			0,
			.90278
		],
		"215": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"216": [
			.04861,
			.73194,
			0,
			0,
			.77778
		],
		"223": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"230": [
			0,
			.43056,
			0,
			0,
			.72222
		],
		"247": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"248": [
			.09722,
			.52778,
			0,
			0,
			.5
		],
		"305": [
			0,
			.43056,
			0,
			0,
			.27778
		],
		"338": [
			0,
			.68333,
			0,
			0,
			1.01389
		],
		"339": [
			0,
			.43056,
			0,
			0,
			.77778
		],
		"567": [
			.19444,
			.43056,
			0,
			0,
			.30556
		],
		"710": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"711": [
			0,
			.62847,
			0,
			0,
			.5
		],
		"713": [
			0,
			.56778,
			0,
			0,
			.5
		],
		"714": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"715": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"728": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"729": [
			0,
			.66786,
			0,
			0,
			.27778
		],
		"730": [
			0,
			.69444,
			0,
			0,
			.75
		],
		"732": [
			0,
			.66786,
			0,
			0,
			.5
		],
		"733": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"915": [
			0,
			.68333,
			0,
			0,
			.625
		],
		"916": [
			0,
			.68333,
			0,
			0,
			.83334
		],
		"920": [
			0,
			.68333,
			0,
			0,
			.77778
		],
		"923": [
			0,
			.68333,
			0,
			0,
			.69445
		],
		"926": [
			0,
			.68333,
			0,
			0,
			.66667
		],
		"928": [
			0,
			.68333,
			0,
			0,
			.75
		],
		"931": [
			0,
			.68333,
			0,
			0,
			.72222
		],
		"933": [
			0,
			.68333,
			0,
			0,
			.77778
		],
		"934": [
			0,
			.68333,
			0,
			0,
			.72222
		],
		"936": [
			0,
			.68333,
			0,
			0,
			.77778
		],
		"937": [
			0,
			.68333,
			0,
			0,
			.72222
		],
		"8211": [
			0,
			.43056,
			.02778,
			0,
			.5
		],
		"8212": [
			0,
			.43056,
			.02778,
			0,
			1
		],
		"8216": [
			0,
			.69444,
			0,
			0,
			.27778
		],
		"8217": [
			0,
			.69444,
			0,
			0,
			.27778
		],
		"8220": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"8221": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"8224": [
			.19444,
			.69444,
			0,
			0,
			.44445
		],
		"8225": [
			.19444,
			.69444,
			0,
			0,
			.44445
		],
		"8230": [
			0,
			.123,
			0,
			0,
			1.172
		],
		"8242": [
			0,
			.55556,
			0,
			0,
			.275
		],
		"8407": [
			0,
			.71444,
			.15382,
			0,
			.5
		],
		"8463": [
			0,
			.68889,
			0,
			0,
			.54028
		],
		"8465": [
			0,
			.69444,
			0,
			0,
			.72222
		],
		"8467": [
			0,
			.69444,
			0,
			.11111,
			.41667
		],
		"8472": [
			.19444,
			.43056,
			0,
			.11111,
			.63646
		],
		"8476": [
			0,
			.69444,
			0,
			0,
			.72222
		],
		"8501": [
			0,
			.69444,
			0,
			0,
			.61111
		],
		"8592": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8593": [
			.19444,
			.69444,
			0,
			0,
			.5
		],
		"8594": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8595": [
			.19444,
			.69444,
			0,
			0,
			.5
		],
		"8596": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8597": [
			.25,
			.75,
			0,
			0,
			.5
		],
		"8598": [
			.19444,
			.69444,
			0,
			0,
			1
		],
		"8599": [
			.19444,
			.69444,
			0,
			0,
			1
		],
		"8600": [
			.19444,
			.69444,
			0,
			0,
			1
		],
		"8601": [
			.19444,
			.69444,
			0,
			0,
			1
		],
		"8614": [
			.011,
			.511,
			0,
			0,
			1
		],
		"8617": [
			.011,
			.511,
			0,
			0,
			1.126
		],
		"8618": [
			.011,
			.511,
			0,
			0,
			1.126
		],
		"8636": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8637": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8640": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8641": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8652": [
			.011,
			.671,
			0,
			0,
			1
		],
		"8656": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8657": [
			.19444,
			.69444,
			0,
			0,
			.61111
		],
		"8658": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8659": [
			.19444,
			.69444,
			0,
			0,
			.61111
		],
		"8660": [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		"8661": [
			.25,
			.75,
			0,
			0,
			.61111
		],
		"8704": [
			0,
			.69444,
			0,
			0,
			.55556
		],
		"8706": [
			0,
			.69444,
			.05556,
			.08334,
			.5309
		],
		"8707": [
			0,
			.69444,
			0,
			0,
			.55556
		],
		"8709": [
			.05556,
			.75,
			0,
			0,
			.5
		],
		"8711": [
			0,
			.68333,
			0,
			0,
			.83334
		],
		"8712": [
			.0391,
			.5391,
			0,
			0,
			.66667
		],
		"8715": [
			.0391,
			.5391,
			0,
			0,
			.66667
		],
		"8722": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"8723": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"8725": [
			.25,
			.75,
			0,
			0,
			.5
		],
		"8726": [
			.25,
			.75,
			0,
			0,
			.5
		],
		"8727": [
			-.03472,
			.46528,
			0,
			0,
			.5
		],
		"8728": [
			-.05555,
			.44445,
			0,
			0,
			.5
		],
		"8729": [
			-.05555,
			.44445,
			0,
			0,
			.5
		],
		"8730": [
			.2,
			.8,
			0,
			0,
			.83334
		],
		"8733": [
			0,
			.43056,
			0,
			0,
			.77778
		],
		"8734": [
			0,
			.43056,
			0,
			0,
			1
		],
		"8736": [
			0,
			.69224,
			0,
			0,
			.72222
		],
		"8739": [
			.25,
			.75,
			0,
			0,
			.27778
		],
		"8741": [
			.25,
			.75,
			0,
			0,
			.5
		],
		"8743": [
			0,
			.55556,
			0,
			0,
			.66667
		],
		"8744": [
			0,
			.55556,
			0,
			0,
			.66667
		],
		"8745": [
			0,
			.55556,
			0,
			0,
			.66667
		],
		"8746": [
			0,
			.55556,
			0,
			0,
			.66667
		],
		"8747": [
			.19444,
			.69444,
			.11111,
			0,
			.41667
		],
		"8764": [
			-.13313,
			.36687,
			0,
			0,
			.77778
		],
		"8768": [
			.19444,
			.69444,
			0,
			0,
			.27778
		],
		"8771": [
			-.03625,
			.46375,
			0,
			0,
			.77778
		],
		"8773": [
			-.022,
			.589,
			0,
			0,
			.778
		],
		"8776": [
			-.01688,
			.48312,
			0,
			0,
			.77778
		],
		"8781": [
			-.03625,
			.46375,
			0,
			0,
			.77778
		],
		"8784": [
			-.133,
			.673,
			0,
			0,
			.778
		],
		"8801": [
			-.03625,
			.46375,
			0,
			0,
			.77778
		],
		"8804": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"8805": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"8810": [
			.0391,
			.5391,
			0,
			0,
			1
		],
		"8811": [
			.0391,
			.5391,
			0,
			0,
			1
		],
		"8826": [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		"8827": [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		"8834": [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		"8835": [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		"8838": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"8839": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"8846": [
			0,
			.55556,
			0,
			0,
			.66667
		],
		"8849": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"8850": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"8851": [
			0,
			.55556,
			0,
			0,
			.66667
		],
		"8852": [
			0,
			.55556,
			0,
			0,
			.66667
		],
		"8853": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"8854": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"8855": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"8856": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"8857": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"8866": [
			0,
			.69444,
			0,
			0,
			.61111
		],
		"8867": [
			0,
			.69444,
			0,
			0,
			.61111
		],
		"8868": [
			0,
			.69444,
			0,
			0,
			.77778
		],
		"8869": [
			0,
			.69444,
			0,
			0,
			.77778
		],
		"8872": [
			.249,
			.75,
			0,
			0,
			.867
		],
		"8900": [
			-.05555,
			.44445,
			0,
			0,
			.5
		],
		"8901": [
			-.05555,
			.44445,
			0,
			0,
			.27778
		],
		"8902": [
			-.03472,
			.46528,
			0,
			0,
			.5
		],
		"8904": [
			.005,
			.505,
			0,
			0,
			.9
		],
		"8942": [
			.03,
			.903,
			0,
			0,
			.278
		],
		"8943": [
			-.19,
			.313,
			0,
			0,
			1.172
		],
		"8945": [
			-.1,
			.823,
			0,
			0,
			1.282
		],
		"8968": [
			.25,
			.75,
			0,
			0,
			.44445
		],
		"8969": [
			.25,
			.75,
			0,
			0,
			.44445
		],
		"8970": [
			.25,
			.75,
			0,
			0,
			.44445
		],
		"8971": [
			.25,
			.75,
			0,
			0,
			.44445
		],
		"8994": [
			-.14236,
			.35764,
			0,
			0,
			1
		],
		"8995": [
			-.14236,
			.35764,
			0,
			0,
			1
		],
		"9136": [
			.244,
			.744,
			0,
			0,
			.412
		],
		"9137": [
			.244,
			.745,
			0,
			0,
			.412
		],
		"9651": [
			.19444,
			.69444,
			0,
			0,
			.88889
		],
		"9657": [
			-.03472,
			.46528,
			0,
			0,
			.5
		],
		"9661": [
			.19444,
			.69444,
			0,
			0,
			.88889
		],
		"9667": [
			-.03472,
			.46528,
			0,
			0,
			.5
		],
		"9711": [
			.19444,
			.69444,
			0,
			0,
			1
		],
		"9824": [
			.12963,
			.69444,
			0,
			0,
			.77778
		],
		"9825": [
			.12963,
			.69444,
			0,
			0,
			.77778
		],
		"9826": [
			.12963,
			.69444,
			0,
			0,
			.77778
		],
		"9827": [
			.12963,
			.69444,
			0,
			0,
			.77778
		],
		"9837": [
			0,
			.75,
			0,
			0,
			.38889
		],
		"9838": [
			.19444,
			.69444,
			0,
			0,
			.38889
		],
		"9839": [
			.19444,
			.69444,
			0,
			0,
			.38889
		],
		"10216": [
			.25,
			.75,
			0,
			0,
			.38889
		],
		"10217": [
			.25,
			.75,
			0,
			0,
			.38889
		],
		"10222": [
			.244,
			.744,
			0,
			0,
			.412
		],
		"10223": [
			.244,
			.745,
			0,
			0,
			.412
		],
		"10229": [
			.011,
			.511,
			0,
			0,
			1.609
		],
		"10230": [
			.011,
			.511,
			0,
			0,
			1.638
		],
		"10231": [
			.011,
			.511,
			0,
			0,
			1.859
		],
		"10232": [
			.024,
			.525,
			0,
			0,
			1.609
		],
		"10233": [
			.024,
			.525,
			0,
			0,
			1.638
		],
		"10234": [
			.024,
			.525,
			0,
			0,
			1.858
		],
		"10236": [
			.011,
			.511,
			0,
			0,
			1.638
		],
		"10815": [
			0,
			.68333,
			0,
			0,
			.75
		],
		"10927": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"10928": [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		"57376": [
			.19444,
			.69444,
			0,
			0,
			0
		]
	},
	"Math-BoldItalic": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"48": [
			0,
			.44444,
			0,
			0,
			.575
		],
		"49": [
			0,
			.44444,
			0,
			0,
			.575
		],
		"50": [
			0,
			.44444,
			0,
			0,
			.575
		],
		"51": [
			.19444,
			.44444,
			0,
			0,
			.575
		],
		"52": [
			.19444,
			.44444,
			0,
			0,
			.575
		],
		"53": [
			.19444,
			.44444,
			0,
			0,
			.575
		],
		"54": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"55": [
			.19444,
			.44444,
			0,
			0,
			.575
		],
		"56": [
			0,
			.64444,
			0,
			0,
			.575
		],
		"57": [
			.19444,
			.44444,
			0,
			0,
			.575
		],
		"65": [
			0,
			.68611,
			0,
			0,
			.86944
		],
		"66": [
			0,
			.68611,
			.04835,
			0,
			.8664
		],
		"67": [
			0,
			.68611,
			.06979,
			0,
			.81694
		],
		"68": [
			0,
			.68611,
			.03194,
			0,
			.93812
		],
		"69": [
			0,
			.68611,
			.05451,
			0,
			.81007
		],
		"70": [
			0,
			.68611,
			.15972,
			0,
			.68889
		],
		"71": [
			0,
			.68611,
			0,
			0,
			.88673
		],
		"72": [
			0,
			.68611,
			.08229,
			0,
			.98229
		],
		"73": [
			0,
			.68611,
			.07778,
			0,
			.51111
		],
		"74": [
			0,
			.68611,
			.10069,
			0,
			.63125
		],
		"75": [
			0,
			.68611,
			.06979,
			0,
			.97118
		],
		"76": [
			0,
			.68611,
			0,
			0,
			.75555
		],
		"77": [
			0,
			.68611,
			.11424,
			0,
			1.14201
		],
		"78": [
			0,
			.68611,
			.11424,
			0,
			.95034
		],
		"79": [
			0,
			.68611,
			.03194,
			0,
			.83666
		],
		"80": [
			0,
			.68611,
			.15972,
			0,
			.72309
		],
		"81": [
			.19444,
			.68611,
			0,
			0,
			.86861
		],
		"82": [
			0,
			.68611,
			.00421,
			0,
			.87235
		],
		"83": [
			0,
			.68611,
			.05382,
			0,
			.69271
		],
		"84": [
			0,
			.68611,
			.15972,
			0,
			.63663
		],
		"85": [
			0,
			.68611,
			.11424,
			0,
			.80027
		],
		"86": [
			0,
			.68611,
			.25555,
			0,
			.67778
		],
		"87": [
			0,
			.68611,
			.15972,
			0,
			1.09305
		],
		"88": [
			0,
			.68611,
			.07778,
			0,
			.94722
		],
		"89": [
			0,
			.68611,
			.25555,
			0,
			.67458
		],
		"90": [
			0,
			.68611,
			.06979,
			0,
			.77257
		],
		"97": [
			0,
			.44444,
			0,
			0,
			.63287
		],
		"98": [
			0,
			.69444,
			0,
			0,
			.52083
		],
		"99": [
			0,
			.44444,
			0,
			0,
			.51342
		],
		"100": [
			0,
			.69444,
			0,
			0,
			.60972
		],
		"101": [
			0,
			.44444,
			0,
			0,
			.55361
		],
		"102": [
			.19444,
			.69444,
			.11042,
			0,
			.56806
		],
		"103": [
			.19444,
			.44444,
			.03704,
			0,
			.5449
		],
		"104": [
			0,
			.69444,
			0,
			0,
			.66759
		],
		"105": [
			0,
			.69326,
			0,
			0,
			.4048
		],
		"106": [
			.19444,
			.69326,
			.0622,
			0,
			.47083
		],
		"107": [
			0,
			.69444,
			.01852,
			0,
			.6037
		],
		"108": [
			0,
			.69444,
			.0088,
			0,
			.34815
		],
		"109": [
			0,
			.44444,
			0,
			0,
			1.0324
		],
		"110": [
			0,
			.44444,
			0,
			0,
			.71296
		],
		"111": [
			0,
			.44444,
			0,
			0,
			.58472
		],
		"112": [
			.19444,
			.44444,
			0,
			0,
			.60092
		],
		"113": [
			.19444,
			.44444,
			.03704,
			0,
			.54213
		],
		"114": [
			0,
			.44444,
			.03194,
			0,
			.5287
		],
		"115": [
			0,
			.44444,
			0,
			0,
			.53125
		],
		"116": [
			0,
			.63492,
			0,
			0,
			.41528
		],
		"117": [
			0,
			.44444,
			0,
			0,
			.68102
		],
		"118": [
			0,
			.44444,
			.03704,
			0,
			.56666
		],
		"119": [
			0,
			.44444,
			.02778,
			0,
			.83148
		],
		"120": [
			0,
			.44444,
			0,
			0,
			.65903
		],
		"121": [
			.19444,
			.44444,
			.03704,
			0,
			.59028
		],
		"122": [
			0,
			.44444,
			.04213,
			0,
			.55509
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"915": [
			0,
			.68611,
			.15972,
			0,
			.65694
		],
		"916": [
			0,
			.68611,
			0,
			0,
			.95833
		],
		"920": [
			0,
			.68611,
			.03194,
			0,
			.86722
		],
		"923": [
			0,
			.68611,
			0,
			0,
			.80555
		],
		"926": [
			0,
			.68611,
			.07458,
			0,
			.84125
		],
		"928": [
			0,
			.68611,
			.08229,
			0,
			.98229
		],
		"931": [
			0,
			.68611,
			.05451,
			0,
			.88507
		],
		"933": [
			0,
			.68611,
			.15972,
			0,
			.67083
		],
		"934": [
			0,
			.68611,
			0,
			0,
			.76666
		],
		"936": [
			0,
			.68611,
			.11653,
			0,
			.71402
		],
		"937": [
			0,
			.68611,
			.04835,
			0,
			.8789
		],
		"945": [
			0,
			.44444,
			0,
			0,
			.76064
		],
		"946": [
			.19444,
			.69444,
			.03403,
			0,
			.65972
		],
		"947": [
			.19444,
			.44444,
			.06389,
			0,
			.59003
		],
		"948": [
			0,
			.69444,
			.03819,
			0,
			.52222
		],
		"949": [
			0,
			.44444,
			0,
			0,
			.52882
		],
		"950": [
			.19444,
			.69444,
			.06215,
			0,
			.50833
		],
		"951": [
			.19444,
			.44444,
			.03704,
			0,
			.6
		],
		"952": [
			0,
			.69444,
			.03194,
			0,
			.5618
		],
		"953": [
			0,
			.44444,
			0,
			0,
			.41204
		],
		"954": [
			0,
			.44444,
			0,
			0,
			.66759
		],
		"955": [
			0,
			.69444,
			0,
			0,
			.67083
		],
		"956": [
			.19444,
			.44444,
			0,
			0,
			.70787
		],
		"957": [
			0,
			.44444,
			.06898,
			0,
			.57685
		],
		"958": [
			.19444,
			.69444,
			.03021,
			0,
			.50833
		],
		"959": [
			0,
			.44444,
			0,
			0,
			.58472
		],
		"960": [
			0,
			.44444,
			.03704,
			0,
			.68241
		],
		"961": [
			.19444,
			.44444,
			0,
			0,
			.6118
		],
		"962": [
			.09722,
			.44444,
			.07917,
			0,
			.42361
		],
		"963": [
			0,
			.44444,
			.03704,
			0,
			.68588
		],
		"964": [
			0,
			.44444,
			.13472,
			0,
			.52083
		],
		"965": [
			0,
			.44444,
			.03704,
			0,
			.63055
		],
		"966": [
			.19444,
			.44444,
			0,
			0,
			.74722
		],
		"967": [
			.19444,
			.44444,
			0,
			0,
			.71805
		],
		"968": [
			.19444,
			.69444,
			.03704,
			0,
			.75833
		],
		"969": [
			0,
			.44444,
			.03704,
			0,
			.71782
		],
		"977": [
			0,
			.69444,
			0,
			0,
			.69155
		],
		"981": [
			.19444,
			.69444,
			0,
			0,
			.7125
		],
		"982": [
			0,
			.44444,
			.03194,
			0,
			.975
		],
		"1009": [
			.19444,
			.44444,
			0,
			0,
			.6118
		],
		"1013": [
			0,
			.44444,
			0,
			0,
			.48333
		],
		"57649": [
			0,
			.44444,
			0,
			0,
			.39352
		],
		"57911": [
			.19444,
			.44444,
			0,
			0,
			.43889
		]
	},
	"Math-Italic": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"48": [
			0,
			.43056,
			0,
			0,
			.5
		],
		"49": [
			0,
			.43056,
			0,
			0,
			.5
		],
		"50": [
			0,
			.43056,
			0,
			0,
			.5
		],
		"51": [
			.19444,
			.43056,
			0,
			0,
			.5
		],
		"52": [
			.19444,
			.43056,
			0,
			0,
			.5
		],
		"53": [
			.19444,
			.43056,
			0,
			0,
			.5
		],
		"54": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"55": [
			.19444,
			.43056,
			0,
			0,
			.5
		],
		"56": [
			0,
			.64444,
			0,
			0,
			.5
		],
		"57": [
			.19444,
			.43056,
			0,
			0,
			.5
		],
		"65": [
			0,
			.68333,
			0,
			.13889,
			.75
		],
		"66": [
			0,
			.68333,
			.05017,
			.08334,
			.75851
		],
		"67": [
			0,
			.68333,
			.07153,
			.08334,
			.71472
		],
		"68": [
			0,
			.68333,
			.02778,
			.05556,
			.82792
		],
		"69": [
			0,
			.68333,
			.05764,
			.08334,
			.7382
		],
		"70": [
			0,
			.68333,
			.13889,
			.08334,
			.64306
		],
		"71": [
			0,
			.68333,
			0,
			.08334,
			.78625
		],
		"72": [
			0,
			.68333,
			.08125,
			.05556,
			.83125
		],
		"73": [
			0,
			.68333,
			.07847,
			.11111,
			.43958
		],
		"74": [
			0,
			.68333,
			.09618,
			.16667,
			.55451
		],
		"75": [
			0,
			.68333,
			.07153,
			.05556,
			.84931
		],
		"76": [
			0,
			.68333,
			0,
			.02778,
			.68056
		],
		"77": [
			0,
			.68333,
			.10903,
			.08334,
			.97014
		],
		"78": [
			0,
			.68333,
			.10903,
			.08334,
			.80347
		],
		"79": [
			0,
			.68333,
			.02778,
			.08334,
			.76278
		],
		"80": [
			0,
			.68333,
			.13889,
			.08334,
			.64201
		],
		"81": [
			.19444,
			.68333,
			0,
			.08334,
			.79056
		],
		"82": [
			0,
			.68333,
			.00773,
			.08334,
			.75929
		],
		"83": [
			0,
			.68333,
			.05764,
			.08334,
			.6132
		],
		"84": [
			0,
			.68333,
			.13889,
			.08334,
			.58438
		],
		"85": [
			0,
			.68333,
			.10903,
			.02778,
			.68278
		],
		"86": [
			0,
			.68333,
			.22222,
			0,
			.58333
		],
		"87": [
			0,
			.68333,
			.13889,
			0,
			.94445
		],
		"88": [
			0,
			.68333,
			.07847,
			.08334,
			.82847
		],
		"89": [
			0,
			.68333,
			.22222,
			0,
			.58056
		],
		"90": [
			0,
			.68333,
			.07153,
			.08334,
			.68264
		],
		"97": [
			0,
			.43056,
			0,
			0,
			.52859
		],
		"98": [
			0,
			.69444,
			0,
			0,
			.42917
		],
		"99": [
			0,
			.43056,
			0,
			.05556,
			.43276
		],
		"100": [
			0,
			.69444,
			0,
			.16667,
			.52049
		],
		"101": [
			0,
			.43056,
			0,
			.05556,
			.46563
		],
		"102": [
			.19444,
			.69444,
			.10764,
			.16667,
			.48959
		],
		"103": [
			.19444,
			.43056,
			.03588,
			.02778,
			.47697
		],
		"104": [
			0,
			.69444,
			0,
			0,
			.57616
		],
		"105": [
			0,
			.65952,
			0,
			0,
			.34451
		],
		"106": [
			.19444,
			.65952,
			.05724,
			0,
			.41181
		],
		"107": [
			0,
			.69444,
			.03148,
			0,
			.5206
		],
		"108": [
			0,
			.69444,
			.01968,
			.08334,
			.29838
		],
		"109": [
			0,
			.43056,
			0,
			0,
			.87801
		],
		"110": [
			0,
			.43056,
			0,
			0,
			.60023
		],
		"111": [
			0,
			.43056,
			0,
			.05556,
			.48472
		],
		"112": [
			.19444,
			.43056,
			0,
			.08334,
			.50313
		],
		"113": [
			.19444,
			.43056,
			.03588,
			.08334,
			.44641
		],
		"114": [
			0,
			.43056,
			.02778,
			.05556,
			.45116
		],
		"115": [
			0,
			.43056,
			0,
			.05556,
			.46875
		],
		"116": [
			0,
			.61508,
			0,
			.08334,
			.36111
		],
		"117": [
			0,
			.43056,
			0,
			.02778,
			.57246
		],
		"118": [
			0,
			.43056,
			.03588,
			.02778,
			.48472
		],
		"119": [
			0,
			.43056,
			.02691,
			.08334,
			.71592
		],
		"120": [
			0,
			.43056,
			0,
			.02778,
			.57153
		],
		"121": [
			.19444,
			.43056,
			.03588,
			.05556,
			.49028
		],
		"122": [
			0,
			.43056,
			.04398,
			.05556,
			.46505
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"915": [
			0,
			.68333,
			.13889,
			.08334,
			.61528
		],
		"916": [
			0,
			.68333,
			0,
			.16667,
			.83334
		],
		"920": [
			0,
			.68333,
			.02778,
			.08334,
			.76278
		],
		"923": [
			0,
			.68333,
			0,
			.16667,
			.69445
		],
		"926": [
			0,
			.68333,
			.07569,
			.08334,
			.74236
		],
		"928": [
			0,
			.68333,
			.08125,
			.05556,
			.83125
		],
		"931": [
			0,
			.68333,
			.05764,
			.08334,
			.77986
		],
		"933": [
			0,
			.68333,
			.13889,
			.05556,
			.58333
		],
		"934": [
			0,
			.68333,
			0,
			.08334,
			.66667
		],
		"936": [
			0,
			.68333,
			.11,
			.05556,
			.61222
		],
		"937": [
			0,
			.68333,
			.05017,
			.08334,
			.7724
		],
		"945": [
			0,
			.43056,
			.0037,
			.02778,
			.6397
		],
		"946": [
			.19444,
			.69444,
			.05278,
			.08334,
			.56563
		],
		"947": [
			.19444,
			.43056,
			.05556,
			0,
			.51773
		],
		"948": [
			0,
			.69444,
			.03785,
			.05556,
			.44444
		],
		"949": [
			0,
			.43056,
			0,
			.08334,
			.46632
		],
		"950": [
			.19444,
			.69444,
			.07378,
			.08334,
			.4375
		],
		"951": [
			.19444,
			.43056,
			.03588,
			.05556,
			.49653
		],
		"952": [
			0,
			.69444,
			.02778,
			.08334,
			.46944
		],
		"953": [
			0,
			.43056,
			0,
			.05556,
			.35394
		],
		"954": [
			0,
			.43056,
			0,
			0,
			.57616
		],
		"955": [
			0,
			.69444,
			0,
			0,
			.58334
		],
		"956": [
			.19444,
			.43056,
			0,
			.02778,
			.60255
		],
		"957": [
			0,
			.43056,
			.06366,
			.02778,
			.49398
		],
		"958": [
			.19444,
			.69444,
			.04601,
			.11111,
			.4375
		],
		"959": [
			0,
			.43056,
			0,
			.05556,
			.48472
		],
		"960": [
			0,
			.43056,
			.03588,
			0,
			.57003
		],
		"961": [
			.19444,
			.43056,
			0,
			.08334,
			.51702
		],
		"962": [
			.09722,
			.43056,
			.07986,
			.08334,
			.36285
		],
		"963": [
			0,
			.43056,
			.03588,
			0,
			.57141
		],
		"964": [
			0,
			.43056,
			.1132,
			.02778,
			.43715
		],
		"965": [
			0,
			.43056,
			.03588,
			.02778,
			.54028
		],
		"966": [
			.19444,
			.43056,
			0,
			.08334,
			.65417
		],
		"967": [
			.19444,
			.43056,
			0,
			.05556,
			.62569
		],
		"968": [
			.19444,
			.69444,
			.03588,
			.11111,
			.65139
		],
		"969": [
			0,
			.43056,
			.03588,
			0,
			.62245
		],
		"977": [
			0,
			.69444,
			0,
			.08334,
			.59144
		],
		"981": [
			.19444,
			.69444,
			0,
			.08334,
			.59583
		],
		"982": [
			0,
			.43056,
			.02778,
			0,
			.82813
		],
		"1009": [
			.19444,
			.43056,
			0,
			.08334,
			.51702
		],
		"1013": [
			0,
			.43056,
			0,
			.05556,
			.4059
		],
		"57649": [
			0,
			.43056,
			0,
			.02778,
			.32246
		],
		"57911": [
			.19444,
			.43056,
			0,
			.08334,
			.38403
		]
	},
	"SansSerif-Bold": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"33": [
			0,
			.69444,
			0,
			0,
			.36667
		],
		"34": [
			0,
			.69444,
			0,
			0,
			.55834
		],
		"35": [
			.19444,
			.69444,
			0,
			0,
			.91667
		],
		"36": [
			.05556,
			.75,
			0,
			0,
			.55
		],
		"37": [
			.05556,
			.75,
			0,
			0,
			1.02912
		],
		"38": [
			0,
			.69444,
			0,
			0,
			.83056
		],
		"39": [
			0,
			.69444,
			0,
			0,
			.30556
		],
		"40": [
			.25,
			.75,
			0,
			0,
			.42778
		],
		"41": [
			.25,
			.75,
			0,
			0,
			.42778
		],
		"42": [
			0,
			.75,
			0,
			0,
			.55
		],
		"43": [
			.11667,
			.61667,
			0,
			0,
			.85556
		],
		"44": [
			.10556,
			.13056,
			0,
			0,
			.30556
		],
		"45": [
			0,
			.45833,
			0,
			0,
			.36667
		],
		"46": [
			0,
			.13056,
			0,
			0,
			.30556
		],
		"47": [
			.25,
			.75,
			0,
			0,
			.55
		],
		"48": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"49": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"50": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"51": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"52": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"53": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"54": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"55": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"56": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"57": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"58": [
			0,
			.45833,
			0,
			0,
			.30556
		],
		"59": [
			.10556,
			.45833,
			0,
			0,
			.30556
		],
		"61": [
			-.09375,
			.40625,
			0,
			0,
			.85556
		],
		"63": [
			0,
			.69444,
			0,
			0,
			.51945
		],
		"64": [
			0,
			.69444,
			0,
			0,
			.73334
		],
		"65": [
			0,
			.69444,
			0,
			0,
			.73334
		],
		"66": [
			0,
			.69444,
			0,
			0,
			.73334
		],
		"67": [
			0,
			.69444,
			0,
			0,
			.70278
		],
		"68": [
			0,
			.69444,
			0,
			0,
			.79445
		],
		"69": [
			0,
			.69444,
			0,
			0,
			.64167
		],
		"70": [
			0,
			.69444,
			0,
			0,
			.61111
		],
		"71": [
			0,
			.69444,
			0,
			0,
			.73334
		],
		"72": [
			0,
			.69444,
			0,
			0,
			.79445
		],
		"73": [
			0,
			.69444,
			0,
			0,
			.33056
		],
		"74": [
			0,
			.69444,
			0,
			0,
			.51945
		],
		"75": [
			0,
			.69444,
			0,
			0,
			.76389
		],
		"76": [
			0,
			.69444,
			0,
			0,
			.58056
		],
		"77": [
			0,
			.69444,
			0,
			0,
			.97778
		],
		"78": [
			0,
			.69444,
			0,
			0,
			.79445
		],
		"79": [
			0,
			.69444,
			0,
			0,
			.79445
		],
		"80": [
			0,
			.69444,
			0,
			0,
			.70278
		],
		"81": [
			.10556,
			.69444,
			0,
			0,
			.79445
		],
		"82": [
			0,
			.69444,
			0,
			0,
			.70278
		],
		"83": [
			0,
			.69444,
			0,
			0,
			.61111
		],
		"84": [
			0,
			.69444,
			0,
			0,
			.73334
		],
		"85": [
			0,
			.69444,
			0,
			0,
			.76389
		],
		"86": [
			0,
			.69444,
			.01528,
			0,
			.73334
		],
		"87": [
			0,
			.69444,
			.01528,
			0,
			1.03889
		],
		"88": [
			0,
			.69444,
			0,
			0,
			.73334
		],
		"89": [
			0,
			.69444,
			.0275,
			0,
			.73334
		],
		"90": [
			0,
			.69444,
			0,
			0,
			.67223
		],
		"91": [
			.25,
			.75,
			0,
			0,
			.34306
		],
		"93": [
			.25,
			.75,
			0,
			0,
			.34306
		],
		"94": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"95": [
			.35,
			.10833,
			.03056,
			0,
			.55
		],
		"97": [
			0,
			.45833,
			0,
			0,
			.525
		],
		"98": [
			0,
			.69444,
			0,
			0,
			.56111
		],
		"99": [
			0,
			.45833,
			0,
			0,
			.48889
		],
		"100": [
			0,
			.69444,
			0,
			0,
			.56111
		],
		"101": [
			0,
			.45833,
			0,
			0,
			.51111
		],
		"102": [
			0,
			.69444,
			.07639,
			0,
			.33611
		],
		"103": [
			.19444,
			.45833,
			.01528,
			0,
			.55
		],
		"104": [
			0,
			.69444,
			0,
			0,
			.56111
		],
		"105": [
			0,
			.69444,
			0,
			0,
			.25556
		],
		"106": [
			.19444,
			.69444,
			0,
			0,
			.28611
		],
		"107": [
			0,
			.69444,
			0,
			0,
			.53056
		],
		"108": [
			0,
			.69444,
			0,
			0,
			.25556
		],
		"109": [
			0,
			.45833,
			0,
			0,
			.86667
		],
		"110": [
			0,
			.45833,
			0,
			0,
			.56111
		],
		"111": [
			0,
			.45833,
			0,
			0,
			.55
		],
		"112": [
			.19444,
			.45833,
			0,
			0,
			.56111
		],
		"113": [
			.19444,
			.45833,
			0,
			0,
			.56111
		],
		"114": [
			0,
			.45833,
			.01528,
			0,
			.37222
		],
		"115": [
			0,
			.45833,
			0,
			0,
			.42167
		],
		"116": [
			0,
			.58929,
			0,
			0,
			.40417
		],
		"117": [
			0,
			.45833,
			0,
			0,
			.56111
		],
		"118": [
			0,
			.45833,
			.01528,
			0,
			.5
		],
		"119": [
			0,
			.45833,
			.01528,
			0,
			.74445
		],
		"120": [
			0,
			.45833,
			0,
			0,
			.5
		],
		"121": [
			.19444,
			.45833,
			.01528,
			0,
			.5
		],
		"122": [
			0,
			.45833,
			0,
			0,
			.47639
		],
		"126": [
			.35,
			.34444,
			0,
			0,
			.55
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"168": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"176": [
			0,
			.69444,
			0,
			0,
			.73334
		],
		"180": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"184": [
			.17014,
			0,
			0,
			0,
			.48889
		],
		"305": [
			0,
			.45833,
			0,
			0,
			.25556
		],
		"567": [
			.19444,
			.45833,
			0,
			0,
			.28611
		],
		"710": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"711": [
			0,
			.63542,
			0,
			0,
			.55
		],
		"713": [
			0,
			.63778,
			0,
			0,
			.55
		],
		"728": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"729": [
			0,
			.69444,
			0,
			0,
			.30556
		],
		"730": [
			0,
			.69444,
			0,
			0,
			.73334
		],
		"732": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"733": [
			0,
			.69444,
			0,
			0,
			.55
		],
		"915": [
			0,
			.69444,
			0,
			0,
			.58056
		],
		"916": [
			0,
			.69444,
			0,
			0,
			.91667
		],
		"920": [
			0,
			.69444,
			0,
			0,
			.85556
		],
		"923": [
			0,
			.69444,
			0,
			0,
			.67223
		],
		"926": [
			0,
			.69444,
			0,
			0,
			.73334
		],
		"928": [
			0,
			.69444,
			0,
			0,
			.79445
		],
		"931": [
			0,
			.69444,
			0,
			0,
			.79445
		],
		"933": [
			0,
			.69444,
			0,
			0,
			.85556
		],
		"934": [
			0,
			.69444,
			0,
			0,
			.79445
		],
		"936": [
			0,
			.69444,
			0,
			0,
			.85556
		],
		"937": [
			0,
			.69444,
			0,
			0,
			.79445
		],
		"8211": [
			0,
			.45833,
			.03056,
			0,
			.55
		],
		"8212": [
			0,
			.45833,
			.03056,
			0,
			1.10001
		],
		"8216": [
			0,
			.69444,
			0,
			0,
			.30556
		],
		"8217": [
			0,
			.69444,
			0,
			0,
			.30556
		],
		"8220": [
			0,
			.69444,
			0,
			0,
			.55834
		],
		"8221": [
			0,
			.69444,
			0,
			0,
			.55834
		]
	},
	"SansSerif-Italic": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"33": [
			0,
			.69444,
			.05733,
			0,
			.31945
		],
		"34": [
			0,
			.69444,
			.00316,
			0,
			.5
		],
		"35": [
			.19444,
			.69444,
			.05087,
			0,
			.83334
		],
		"36": [
			.05556,
			.75,
			.11156,
			0,
			.5
		],
		"37": [
			.05556,
			.75,
			.03126,
			0,
			.83334
		],
		"38": [
			0,
			.69444,
			.03058,
			0,
			.75834
		],
		"39": [
			0,
			.69444,
			.07816,
			0,
			.27778
		],
		"40": [
			.25,
			.75,
			.13164,
			0,
			.38889
		],
		"41": [
			.25,
			.75,
			.02536,
			0,
			.38889
		],
		"42": [
			0,
			.75,
			.11775,
			0,
			.5
		],
		"43": [
			.08333,
			.58333,
			.02536,
			0,
			.77778
		],
		"44": [
			.125,
			.08333,
			0,
			0,
			.27778
		],
		"45": [
			0,
			.44444,
			.01946,
			0,
			.33333
		],
		"46": [
			0,
			.08333,
			0,
			0,
			.27778
		],
		"47": [
			.25,
			.75,
			.13164,
			0,
			.5
		],
		"48": [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		"49": [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		"50": [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		"51": [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		"52": [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		"53": [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		"54": [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		"55": [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		"56": [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		"57": [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		"58": [
			0,
			.44444,
			.02502,
			0,
			.27778
		],
		"59": [
			.125,
			.44444,
			.02502,
			0,
			.27778
		],
		"61": [
			-.13,
			.37,
			.05087,
			0,
			.77778
		],
		"63": [
			0,
			.69444,
			.11809,
			0,
			.47222
		],
		"64": [
			0,
			.69444,
			.07555,
			0,
			.66667
		],
		"65": [
			0,
			.69444,
			0,
			0,
			.66667
		],
		"66": [
			0,
			.69444,
			.08293,
			0,
			.66667
		],
		"67": [
			0,
			.69444,
			.11983,
			0,
			.63889
		],
		"68": [
			0,
			.69444,
			.07555,
			0,
			.72223
		],
		"69": [
			0,
			.69444,
			.11983,
			0,
			.59722
		],
		"70": [
			0,
			.69444,
			.13372,
			0,
			.56945
		],
		"71": [
			0,
			.69444,
			.11983,
			0,
			.66667
		],
		"72": [
			0,
			.69444,
			.08094,
			0,
			.70834
		],
		"73": [
			0,
			.69444,
			.13372,
			0,
			.27778
		],
		"74": [
			0,
			.69444,
			.08094,
			0,
			.47222
		],
		"75": [
			0,
			.69444,
			.11983,
			0,
			.69445
		],
		"76": [
			0,
			.69444,
			0,
			0,
			.54167
		],
		"77": [
			0,
			.69444,
			.08094,
			0,
			.875
		],
		"78": [
			0,
			.69444,
			.08094,
			0,
			.70834
		],
		"79": [
			0,
			.69444,
			.07555,
			0,
			.73611
		],
		"80": [
			0,
			.69444,
			.08293,
			0,
			.63889
		],
		"81": [
			.125,
			.69444,
			.07555,
			0,
			.73611
		],
		"82": [
			0,
			.69444,
			.08293,
			0,
			.64584
		],
		"83": [
			0,
			.69444,
			.09205,
			0,
			.55556
		],
		"84": [
			0,
			.69444,
			.13372,
			0,
			.68056
		],
		"85": [
			0,
			.69444,
			.08094,
			0,
			.6875
		],
		"86": [
			0,
			.69444,
			.1615,
			0,
			.66667
		],
		"87": [
			0,
			.69444,
			.1615,
			0,
			.94445
		],
		"88": [
			0,
			.69444,
			.13372,
			0,
			.66667
		],
		"89": [
			0,
			.69444,
			.17261,
			0,
			.66667
		],
		"90": [
			0,
			.69444,
			.11983,
			0,
			.61111
		],
		"91": [
			.25,
			.75,
			.15942,
			0,
			.28889
		],
		"93": [
			.25,
			.75,
			.08719,
			0,
			.28889
		],
		"94": [
			0,
			.69444,
			.0799,
			0,
			.5
		],
		"95": [
			.35,
			.09444,
			.08616,
			0,
			.5
		],
		"97": [
			0,
			.44444,
			.00981,
			0,
			.48056
		],
		"98": [
			0,
			.69444,
			.03057,
			0,
			.51667
		],
		"99": [
			0,
			.44444,
			.08336,
			0,
			.44445
		],
		"100": [
			0,
			.69444,
			.09483,
			0,
			.51667
		],
		"101": [
			0,
			.44444,
			.06778,
			0,
			.44445
		],
		"102": [
			0,
			.69444,
			.21705,
			0,
			.30556
		],
		"103": [
			.19444,
			.44444,
			.10836,
			0,
			.5
		],
		"104": [
			0,
			.69444,
			.01778,
			0,
			.51667
		],
		"105": [
			0,
			.67937,
			.09718,
			0,
			.23889
		],
		"106": [
			.19444,
			.67937,
			.09162,
			0,
			.26667
		],
		"107": [
			0,
			.69444,
			.08336,
			0,
			.48889
		],
		"108": [
			0,
			.69444,
			.09483,
			0,
			.23889
		],
		"109": [
			0,
			.44444,
			.01778,
			0,
			.79445
		],
		"110": [
			0,
			.44444,
			.01778,
			0,
			.51667
		],
		"111": [
			0,
			.44444,
			.06613,
			0,
			.5
		],
		"112": [
			.19444,
			.44444,
			.0389,
			0,
			.51667
		],
		"113": [
			.19444,
			.44444,
			.04169,
			0,
			.51667
		],
		"114": [
			0,
			.44444,
			.10836,
			0,
			.34167
		],
		"115": [
			0,
			.44444,
			.0778,
			0,
			.38333
		],
		"116": [
			0,
			.57143,
			.07225,
			0,
			.36111
		],
		"117": [
			0,
			.44444,
			.04169,
			0,
			.51667
		],
		"118": [
			0,
			.44444,
			.10836,
			0,
			.46111
		],
		"119": [
			0,
			.44444,
			.10836,
			0,
			.68334
		],
		"120": [
			0,
			.44444,
			.09169,
			0,
			.46111
		],
		"121": [
			.19444,
			.44444,
			.10836,
			0,
			.46111
		],
		"122": [
			0,
			.44444,
			.08752,
			0,
			.43472
		],
		"126": [
			.35,
			.32659,
			.08826,
			0,
			.5
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"168": [
			0,
			.67937,
			.06385,
			0,
			.5
		],
		"176": [
			0,
			.69444,
			0,
			0,
			.73752
		],
		"184": [
			.17014,
			0,
			0,
			0,
			.44445
		],
		"305": [
			0,
			.44444,
			.04169,
			0,
			.23889
		],
		"567": [
			.19444,
			.44444,
			.04169,
			0,
			.26667
		],
		"710": [
			0,
			.69444,
			.0799,
			0,
			.5
		],
		"711": [
			0,
			.63194,
			.08432,
			0,
			.5
		],
		"713": [
			0,
			.60889,
			.08776,
			0,
			.5
		],
		"714": [
			0,
			.69444,
			.09205,
			0,
			.5
		],
		"715": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"728": [
			0,
			.69444,
			.09483,
			0,
			.5
		],
		"729": [
			0,
			.67937,
			.07774,
			0,
			.27778
		],
		"730": [
			0,
			.69444,
			0,
			0,
			.73752
		],
		"732": [
			0,
			.67659,
			.08826,
			0,
			.5
		],
		"733": [
			0,
			.69444,
			.09205,
			0,
			.5
		],
		"915": [
			0,
			.69444,
			.13372,
			0,
			.54167
		],
		"916": [
			0,
			.69444,
			0,
			0,
			.83334
		],
		"920": [
			0,
			.69444,
			.07555,
			0,
			.77778
		],
		"923": [
			0,
			.69444,
			0,
			0,
			.61111
		],
		"926": [
			0,
			.69444,
			.12816,
			0,
			.66667
		],
		"928": [
			0,
			.69444,
			.08094,
			0,
			.70834
		],
		"931": [
			0,
			.69444,
			.11983,
			0,
			.72222
		],
		"933": [
			0,
			.69444,
			.09031,
			0,
			.77778
		],
		"934": [
			0,
			.69444,
			.04603,
			0,
			.72222
		],
		"936": [
			0,
			.69444,
			.09031,
			0,
			.77778
		],
		"937": [
			0,
			.69444,
			.08293,
			0,
			.72222
		],
		"8211": [
			0,
			.44444,
			.08616,
			0,
			.5
		],
		"8212": [
			0,
			.44444,
			.08616,
			0,
			1
		],
		"8216": [
			0,
			.69444,
			.07816,
			0,
			.27778
		],
		"8217": [
			0,
			.69444,
			.07816,
			0,
			.27778
		],
		"8220": [
			0,
			.69444,
			.14205,
			0,
			.5
		],
		"8221": [
			0,
			.69444,
			.00316,
			0,
			.5
		]
	},
	"SansSerif-Regular": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"33": [
			0,
			.69444,
			0,
			0,
			.31945
		],
		"34": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"35": [
			.19444,
			.69444,
			0,
			0,
			.83334
		],
		"36": [
			.05556,
			.75,
			0,
			0,
			.5
		],
		"37": [
			.05556,
			.75,
			0,
			0,
			.83334
		],
		"38": [
			0,
			.69444,
			0,
			0,
			.75834
		],
		"39": [
			0,
			.69444,
			0,
			0,
			.27778
		],
		"40": [
			.25,
			.75,
			0,
			0,
			.38889
		],
		"41": [
			.25,
			.75,
			0,
			0,
			.38889
		],
		"42": [
			0,
			.75,
			0,
			0,
			.5
		],
		"43": [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		"44": [
			.125,
			.08333,
			0,
			0,
			.27778
		],
		"45": [
			0,
			.44444,
			0,
			0,
			.33333
		],
		"46": [
			0,
			.08333,
			0,
			0,
			.27778
		],
		"47": [
			.25,
			.75,
			0,
			0,
			.5
		],
		"48": [
			0,
			.65556,
			0,
			0,
			.5
		],
		"49": [
			0,
			.65556,
			0,
			0,
			.5
		],
		"50": [
			0,
			.65556,
			0,
			0,
			.5
		],
		"51": [
			0,
			.65556,
			0,
			0,
			.5
		],
		"52": [
			0,
			.65556,
			0,
			0,
			.5
		],
		"53": [
			0,
			.65556,
			0,
			0,
			.5
		],
		"54": [
			0,
			.65556,
			0,
			0,
			.5
		],
		"55": [
			0,
			.65556,
			0,
			0,
			.5
		],
		"56": [
			0,
			.65556,
			0,
			0,
			.5
		],
		"57": [
			0,
			.65556,
			0,
			0,
			.5
		],
		"58": [
			0,
			.44444,
			0,
			0,
			.27778
		],
		"59": [
			.125,
			.44444,
			0,
			0,
			.27778
		],
		"61": [
			-.13,
			.37,
			0,
			0,
			.77778
		],
		"63": [
			0,
			.69444,
			0,
			0,
			.47222
		],
		"64": [
			0,
			.69444,
			0,
			0,
			.66667
		],
		"65": [
			0,
			.69444,
			0,
			0,
			.66667
		],
		"66": [
			0,
			.69444,
			0,
			0,
			.66667
		],
		"67": [
			0,
			.69444,
			0,
			0,
			.63889
		],
		"68": [
			0,
			.69444,
			0,
			0,
			.72223
		],
		"69": [
			0,
			.69444,
			0,
			0,
			.59722
		],
		"70": [
			0,
			.69444,
			0,
			0,
			.56945
		],
		"71": [
			0,
			.69444,
			0,
			0,
			.66667
		],
		"72": [
			0,
			.69444,
			0,
			0,
			.70834
		],
		"73": [
			0,
			.69444,
			0,
			0,
			.27778
		],
		"74": [
			0,
			.69444,
			0,
			0,
			.47222
		],
		"75": [
			0,
			.69444,
			0,
			0,
			.69445
		],
		"76": [
			0,
			.69444,
			0,
			0,
			.54167
		],
		"77": [
			0,
			.69444,
			0,
			0,
			.875
		],
		"78": [
			0,
			.69444,
			0,
			0,
			.70834
		],
		"79": [
			0,
			.69444,
			0,
			0,
			.73611
		],
		"80": [
			0,
			.69444,
			0,
			0,
			.63889
		],
		"81": [
			.125,
			.69444,
			0,
			0,
			.73611
		],
		"82": [
			0,
			.69444,
			0,
			0,
			.64584
		],
		"83": [
			0,
			.69444,
			0,
			0,
			.55556
		],
		"84": [
			0,
			.69444,
			0,
			0,
			.68056
		],
		"85": [
			0,
			.69444,
			0,
			0,
			.6875
		],
		"86": [
			0,
			.69444,
			.01389,
			0,
			.66667
		],
		"87": [
			0,
			.69444,
			.01389,
			0,
			.94445
		],
		"88": [
			0,
			.69444,
			0,
			0,
			.66667
		],
		"89": [
			0,
			.69444,
			.025,
			0,
			.66667
		],
		"90": [
			0,
			.69444,
			0,
			0,
			.61111
		],
		"91": [
			.25,
			.75,
			0,
			0,
			.28889
		],
		"93": [
			.25,
			.75,
			0,
			0,
			.28889
		],
		"94": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"95": [
			.35,
			.09444,
			.02778,
			0,
			.5
		],
		"97": [
			0,
			.44444,
			0,
			0,
			.48056
		],
		"98": [
			0,
			.69444,
			0,
			0,
			.51667
		],
		"99": [
			0,
			.44444,
			0,
			0,
			.44445
		],
		"100": [
			0,
			.69444,
			0,
			0,
			.51667
		],
		"101": [
			0,
			.44444,
			0,
			0,
			.44445
		],
		"102": [
			0,
			.69444,
			.06944,
			0,
			.30556
		],
		"103": [
			.19444,
			.44444,
			.01389,
			0,
			.5
		],
		"104": [
			0,
			.69444,
			0,
			0,
			.51667
		],
		"105": [
			0,
			.67937,
			0,
			0,
			.23889
		],
		"106": [
			.19444,
			.67937,
			0,
			0,
			.26667
		],
		"107": [
			0,
			.69444,
			0,
			0,
			.48889
		],
		"108": [
			0,
			.69444,
			0,
			0,
			.23889
		],
		"109": [
			0,
			.44444,
			0,
			0,
			.79445
		],
		"110": [
			0,
			.44444,
			0,
			0,
			.51667
		],
		"111": [
			0,
			.44444,
			0,
			0,
			.5
		],
		"112": [
			.19444,
			.44444,
			0,
			0,
			.51667
		],
		"113": [
			.19444,
			.44444,
			0,
			0,
			.51667
		],
		"114": [
			0,
			.44444,
			.01389,
			0,
			.34167
		],
		"115": [
			0,
			.44444,
			0,
			0,
			.38333
		],
		"116": [
			0,
			.57143,
			0,
			0,
			.36111
		],
		"117": [
			0,
			.44444,
			0,
			0,
			.51667
		],
		"118": [
			0,
			.44444,
			.01389,
			0,
			.46111
		],
		"119": [
			0,
			.44444,
			.01389,
			0,
			.68334
		],
		"120": [
			0,
			.44444,
			0,
			0,
			.46111
		],
		"121": [
			.19444,
			.44444,
			.01389,
			0,
			.46111
		],
		"122": [
			0,
			.44444,
			0,
			0,
			.43472
		],
		"126": [
			.35,
			.32659,
			0,
			0,
			.5
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"168": [
			0,
			.67937,
			0,
			0,
			.5
		],
		"176": [
			0,
			.69444,
			0,
			0,
			.66667
		],
		"184": [
			.17014,
			0,
			0,
			0,
			.44445
		],
		"305": [
			0,
			.44444,
			0,
			0,
			.23889
		],
		"567": [
			.19444,
			.44444,
			0,
			0,
			.26667
		],
		"710": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"711": [
			0,
			.63194,
			0,
			0,
			.5
		],
		"713": [
			0,
			.60889,
			0,
			0,
			.5
		],
		"714": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"715": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"728": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"729": [
			0,
			.67937,
			0,
			0,
			.27778
		],
		"730": [
			0,
			.69444,
			0,
			0,
			.66667
		],
		"732": [
			0,
			.67659,
			0,
			0,
			.5
		],
		"733": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"915": [
			0,
			.69444,
			0,
			0,
			.54167
		],
		"916": [
			0,
			.69444,
			0,
			0,
			.83334
		],
		"920": [
			0,
			.69444,
			0,
			0,
			.77778
		],
		"923": [
			0,
			.69444,
			0,
			0,
			.61111
		],
		"926": [
			0,
			.69444,
			0,
			0,
			.66667
		],
		"928": [
			0,
			.69444,
			0,
			0,
			.70834
		],
		"931": [
			0,
			.69444,
			0,
			0,
			.72222
		],
		"933": [
			0,
			.69444,
			0,
			0,
			.77778
		],
		"934": [
			0,
			.69444,
			0,
			0,
			.72222
		],
		"936": [
			0,
			.69444,
			0,
			0,
			.77778
		],
		"937": [
			0,
			.69444,
			0,
			0,
			.72222
		],
		"8211": [
			0,
			.44444,
			.02778,
			0,
			.5
		],
		"8212": [
			0,
			.44444,
			.02778,
			0,
			1
		],
		"8216": [
			0,
			.69444,
			0,
			0,
			.27778
		],
		"8217": [
			0,
			.69444,
			0,
			0,
			.27778
		],
		"8220": [
			0,
			.69444,
			0,
			0,
			.5
		],
		"8221": [
			0,
			.69444,
			0,
			0,
			.5
		]
	},
	"Script-Regular": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"65": [
			0,
			.7,
			.22925,
			0,
			.80253
		],
		"66": [
			0,
			.7,
			.04087,
			0,
			.90757
		],
		"67": [
			0,
			.7,
			.1689,
			0,
			.66619
		],
		"68": [
			0,
			.7,
			.09371,
			0,
			.77443
		],
		"69": [
			0,
			.7,
			.18583,
			0,
			.56162
		],
		"70": [
			0,
			.7,
			.13634,
			0,
			.89544
		],
		"71": [
			0,
			.7,
			.17322,
			0,
			.60961
		],
		"72": [
			0,
			.7,
			.29694,
			0,
			.96919
		],
		"73": [
			0,
			.7,
			.19189,
			0,
			.80907
		],
		"74": [
			.27778,
			.7,
			.19189,
			0,
			1.05159
		],
		"75": [
			0,
			.7,
			.31259,
			0,
			.91364
		],
		"76": [
			0,
			.7,
			.19189,
			0,
			.87373
		],
		"77": [
			0,
			.7,
			.15981,
			0,
			1.08031
		],
		"78": [
			0,
			.7,
			.3525,
			0,
			.9015
		],
		"79": [
			0,
			.7,
			.08078,
			0,
			.73787
		],
		"80": [
			0,
			.7,
			.08078,
			0,
			1.01262
		],
		"81": [
			0,
			.7,
			.03305,
			0,
			.88282
		],
		"82": [
			0,
			.7,
			.06259,
			0,
			.85
		],
		"83": [
			0,
			.7,
			.19189,
			0,
			.86767
		],
		"84": [
			0,
			.7,
			.29087,
			0,
			.74697
		],
		"85": [
			0,
			.7,
			.25815,
			0,
			.79996
		],
		"86": [
			0,
			.7,
			.27523,
			0,
			.62204
		],
		"87": [
			0,
			.7,
			.27523,
			0,
			.80532
		],
		"88": [
			0,
			.7,
			.26006,
			0,
			.94445
		],
		"89": [
			0,
			.7,
			.2939,
			0,
			.70961
		],
		"90": [
			0,
			.7,
			.24037,
			0,
			.8212
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		]
	},
	"Size1-Regular": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"40": [
			.35001,
			.85,
			0,
			0,
			.45834
		],
		"41": [
			.35001,
			.85,
			0,
			0,
			.45834
		],
		"47": [
			.35001,
			.85,
			0,
			0,
			.57778
		],
		"91": [
			.35001,
			.85,
			0,
			0,
			.41667
		],
		"92": [
			.35001,
			.85,
			0,
			0,
			.57778
		],
		"93": [
			.35001,
			.85,
			0,
			0,
			.41667
		],
		"123": [
			.35001,
			.85,
			0,
			0,
			.58334
		],
		"125": [
			.35001,
			.85,
			0,
			0,
			.58334
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"710": [
			0,
			.72222,
			0,
			0,
			.55556
		],
		"732": [
			0,
			.72222,
			0,
			0,
			.55556
		],
		"770": [
			0,
			.72222,
			0,
			0,
			.55556
		],
		"771": [
			0,
			.72222,
			0,
			0,
			.55556
		],
		"8214": [
			-99e-5,
			.601,
			0,
			0,
			.77778
		],
		"8593": [
			1e-5,
			.6,
			0,
			0,
			.66667
		],
		"8595": [
			1e-5,
			.6,
			0,
			0,
			.66667
		],
		"8657": [
			1e-5,
			.6,
			0,
			0,
			.77778
		],
		"8659": [
			1e-5,
			.6,
			0,
			0,
			.77778
		],
		"8719": [
			.25001,
			.75,
			0,
			0,
			.94445
		],
		"8720": [
			.25001,
			.75,
			0,
			0,
			.94445
		],
		"8721": [
			.25001,
			.75,
			0,
			0,
			1.05556
		],
		"8730": [
			.35001,
			.85,
			0,
			0,
			1
		],
		"8739": [
			-.00599,
			.606,
			0,
			0,
			.33333
		],
		"8741": [
			-.00599,
			.606,
			0,
			0,
			.55556
		],
		"8747": [
			.30612,
			.805,
			.19445,
			0,
			.47222
		],
		"8748": [
			.306,
			.805,
			.19445,
			0,
			.47222
		],
		"8749": [
			.306,
			.805,
			.19445,
			0,
			.47222
		],
		"8750": [
			.30612,
			.805,
			.19445,
			0,
			.47222
		],
		"8896": [
			.25001,
			.75,
			0,
			0,
			.83334
		],
		"8897": [
			.25001,
			.75,
			0,
			0,
			.83334
		],
		"8898": [
			.25001,
			.75,
			0,
			0,
			.83334
		],
		"8899": [
			.25001,
			.75,
			0,
			0,
			.83334
		],
		"8968": [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		"8969": [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		"8970": [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		"8971": [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		"9168": [
			-99e-5,
			.601,
			0,
			0,
			.66667
		],
		"10216": [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		"10217": [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		"10752": [
			.25001,
			.75,
			0,
			0,
			1.11111
		],
		"10753": [
			.25001,
			.75,
			0,
			0,
			1.11111
		],
		"10754": [
			.25001,
			.75,
			0,
			0,
			1.11111
		],
		"10756": [
			.25001,
			.75,
			0,
			0,
			.83334
		],
		"10758": [
			.25001,
			.75,
			0,
			0,
			.83334
		]
	},
	"Size2-Regular": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"40": [
			.65002,
			1.15,
			0,
			0,
			.59722
		],
		"41": [
			.65002,
			1.15,
			0,
			0,
			.59722
		],
		"47": [
			.65002,
			1.15,
			0,
			0,
			.81111
		],
		"91": [
			.65002,
			1.15,
			0,
			0,
			.47222
		],
		"92": [
			.65002,
			1.15,
			0,
			0,
			.81111
		],
		"93": [
			.65002,
			1.15,
			0,
			0,
			.47222
		],
		"123": [
			.65002,
			1.15,
			0,
			0,
			.66667
		],
		"125": [
			.65002,
			1.15,
			0,
			0,
			.66667
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"710": [
			0,
			.75,
			0,
			0,
			1
		],
		"732": [
			0,
			.75,
			0,
			0,
			1
		],
		"770": [
			0,
			.75,
			0,
			0,
			1
		],
		"771": [
			0,
			.75,
			0,
			0,
			1
		],
		"8719": [
			.55001,
			1.05,
			0,
			0,
			1.27778
		],
		"8720": [
			.55001,
			1.05,
			0,
			0,
			1.27778
		],
		"8721": [
			.55001,
			1.05,
			0,
			0,
			1.44445
		],
		"8730": [
			.65002,
			1.15,
			0,
			0,
			1
		],
		"8747": [
			.86225,
			1.36,
			.44445,
			0,
			.55556
		],
		"8748": [
			.862,
			1.36,
			.44445,
			0,
			.55556
		],
		"8749": [
			.862,
			1.36,
			.44445,
			0,
			.55556
		],
		"8750": [
			.86225,
			1.36,
			.44445,
			0,
			.55556
		],
		"8896": [
			.55001,
			1.05,
			0,
			0,
			1.11111
		],
		"8897": [
			.55001,
			1.05,
			0,
			0,
			1.11111
		],
		"8898": [
			.55001,
			1.05,
			0,
			0,
			1.11111
		],
		"8899": [
			.55001,
			1.05,
			0,
			0,
			1.11111
		],
		"8968": [
			.65002,
			1.15,
			0,
			0,
			.52778
		],
		"8969": [
			.65002,
			1.15,
			0,
			0,
			.52778
		],
		"8970": [
			.65002,
			1.15,
			0,
			0,
			.52778
		],
		"8971": [
			.65002,
			1.15,
			0,
			0,
			.52778
		],
		"10216": [
			.65002,
			1.15,
			0,
			0,
			.61111
		],
		"10217": [
			.65002,
			1.15,
			0,
			0,
			.61111
		],
		"10752": [
			.55001,
			1.05,
			0,
			0,
			1.51112
		],
		"10753": [
			.55001,
			1.05,
			0,
			0,
			1.51112
		],
		"10754": [
			.55001,
			1.05,
			0,
			0,
			1.51112
		],
		"10756": [
			.55001,
			1.05,
			0,
			0,
			1.11111
		],
		"10758": [
			.55001,
			1.05,
			0,
			0,
			1.11111
		]
	},
	"Size3-Regular": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"40": [
			.95003,
			1.45,
			0,
			0,
			.73611
		],
		"41": [
			.95003,
			1.45,
			0,
			0,
			.73611
		],
		"47": [
			.95003,
			1.45,
			0,
			0,
			1.04445
		],
		"91": [
			.95003,
			1.45,
			0,
			0,
			.52778
		],
		"92": [
			.95003,
			1.45,
			0,
			0,
			1.04445
		],
		"93": [
			.95003,
			1.45,
			0,
			0,
			.52778
		],
		"123": [
			.95003,
			1.45,
			0,
			0,
			.75
		],
		"125": [
			.95003,
			1.45,
			0,
			0,
			.75
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"710": [
			0,
			.75,
			0,
			0,
			1.44445
		],
		"732": [
			0,
			.75,
			0,
			0,
			1.44445
		],
		"770": [
			0,
			.75,
			0,
			0,
			1.44445
		],
		"771": [
			0,
			.75,
			0,
			0,
			1.44445
		],
		"8730": [
			.95003,
			1.45,
			0,
			0,
			1
		],
		"8968": [
			.95003,
			1.45,
			0,
			0,
			.58334
		],
		"8969": [
			.95003,
			1.45,
			0,
			0,
			.58334
		],
		"8970": [
			.95003,
			1.45,
			0,
			0,
			.58334
		],
		"8971": [
			.95003,
			1.45,
			0,
			0,
			.58334
		],
		"10216": [
			.95003,
			1.45,
			0,
			0,
			.75
		],
		"10217": [
			.95003,
			1.45,
			0,
			0,
			.75
		]
	},
	"Size4-Regular": {
		"32": [
			0,
			0,
			0,
			0,
			.25
		],
		"40": [
			1.25003,
			1.75,
			0,
			0,
			.79167
		],
		"41": [
			1.25003,
			1.75,
			0,
			0,
			.79167
		],
		"47": [
			1.25003,
			1.75,
			0,
			0,
			1.27778
		],
		"91": [
			1.25003,
			1.75,
			0,
			0,
			.58334
		],
		"92": [
			1.25003,
			1.75,
			0,
			0,
			1.27778
		],
		"93": [
			1.25003,
			1.75,
			0,
			0,
			.58334
		],
		"123": [
			1.25003,
			1.75,
			0,
			0,
			.80556
		],
		"125": [
			1.25003,
			1.75,
			0,
			0,
			.80556
		],
		"160": [
			0,
			0,
			0,
			0,
			.25
		],
		"710": [
			0,
			.825,
			0,
			0,
			1.8889
		],
		"732": [
			0,
			.825,
			0,
			0,
			1.8889
		],
		"770": [
			0,
			.825,
			0,
			0,
			1.8889
		],
		"771": [
			0,
			.825,
			0,
			0,
			1.8889
		],
		"8730": [
			1.25003,
			1.75,
			0,
			0,
			1
		],
		"8968": [
			1.25003,
			1.75,
			0,
			0,
			.63889
		],
		"8969": [
			1.25003,
			1.75,
			0,
			0,
			.63889
		],
		"8970": [
			1.25003,
			1.75,
			0,
			0,
			.63889
		],
		"8971": [
			1.25003,
			1.75,
			0,
			0,
			.63889
		],
		"9115": [
			.64502,
			1.155,
			0,
			0,
			.875
		],
		"9116": [
			1e-5,
			.6,
			0,
			0,
			.875
		],
		"9117": [
			.64502,
			1.155,
			0,
			0,
			.875
		],
		"9118": [
			.64502,
			1.155,
			0,
			0,
			.875
		],
		"9119": [
			1e-5,
			.6,
			0,
			0,
			.875
		],
		"9120": [
			.64502,
			1.155,
			0,
			0,
			.875
		],
		"9121": [
			.64502,
			1.155,
			0,
			0,
			.66667
		],
		"9122": [
			-99e-5,
			.601,
			0,
			0,
			.66667
		],
		"9123": [
			.64502,
			1.155,
			0,
			0,
			.66667
		],
		"9124": [
			.64502,
			1.155,
			0,
			0,
			.66667
		],
		"9125": [
			-99e-5,
			.601,
			0,
			0,
			.66667
		],
		"9126": [
			.64502,
			1.155,
			0,
			0,
			.66667
		],
		"9127": [
			1e-5,
			.9,
			0,
			0,
			.88889
		],
		"9128": [
			.65002,
			1.15,
			0,
			0,
			.88889
		],
		"9129": [
			.90001,
			0,
			0,
			0,
			.88889
		],
		"9130": [
			0,
			.3,
			0,
			0,
			.88889
		],
		"9131": [
			1e-5,
			.9,
			0,
			0,
			.88889
		],
		"9132": [
			.65002,
			1.15,
			0,
			0,
			.88889
		],
		"9133": [
			.90001,
			0,
			0,
			0,
			.88889
		],
		"9143": [
			.88502,
			.915,
			0,
			0,
			1.05556
		],
		"10216": [
			1.25003,
			1.75,
			0,
			0,
			.80556
		],
		"10217": [
			1.25003,
			1.75,
			0,
			0,
			.80556
		],
		"57344": [
			-.00499,
			.605,
			0,
			0,
			1.05556
		],
		"57345": [
			-.00499,
			.605,
			0,
			0,
			1.05556
		],
		"57680": [
			0,
			.12,
			0,
			0,
			.45
		],
		"57681": [
			0,
			.12,
			0,
			0,
			.45
		],
		"57682": [
			0,
			.12,
			0,
			0,
			.45
		],
		"57683": [
			0,
			.12,
			0,
			0,
			.45
		]
	},
	"Typewriter-Regular": {
		"32": [
			0,
			0,
			0,
			0,
			.525
		],
		"33": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"34": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"35": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"36": [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		"37": [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		"38": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"39": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"40": [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		"41": [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		"42": [
			0,
			.52083,
			0,
			0,
			.525
		],
		"43": [
			-.08056,
			.53055,
			0,
			0,
			.525
		],
		"44": [
			.13889,
			.125,
			0,
			0,
			.525
		],
		"45": [
			-.08056,
			.53055,
			0,
			0,
			.525
		],
		"46": [
			0,
			.125,
			0,
			0,
			.525
		],
		"47": [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		"48": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"49": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"50": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"51": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"52": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"53": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"54": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"55": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"56": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"57": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"58": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"59": [
			.13889,
			.43056,
			0,
			0,
			.525
		],
		"60": [
			-.05556,
			.55556,
			0,
			0,
			.525
		],
		"61": [
			-.19549,
			.41562,
			0,
			0,
			.525
		],
		"62": [
			-.05556,
			.55556,
			0,
			0,
			.525
		],
		"63": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"64": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"65": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"66": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"67": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"68": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"69": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"70": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"71": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"72": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"73": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"74": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"75": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"76": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"77": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"78": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"79": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"80": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"81": [
			.13889,
			.61111,
			0,
			0,
			.525
		],
		"82": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"83": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"84": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"85": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"86": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"87": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"88": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"89": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"90": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"91": [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		"92": [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		"93": [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		"94": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"95": [
			.09514,
			0,
			0,
			0,
			.525
		],
		"96": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"97": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"98": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"99": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"100": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"101": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"102": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"103": [
			.22222,
			.43056,
			0,
			0,
			.525
		],
		"104": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"105": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"106": [
			.22222,
			.61111,
			0,
			0,
			.525
		],
		"107": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"108": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"109": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"110": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"111": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"112": [
			.22222,
			.43056,
			0,
			0,
			.525
		],
		"113": [
			.22222,
			.43056,
			0,
			0,
			.525
		],
		"114": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"115": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"116": [
			0,
			.55358,
			0,
			0,
			.525
		],
		"117": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"118": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"119": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"120": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"121": [
			.22222,
			.43056,
			0,
			0,
			.525
		],
		"122": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"123": [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		"124": [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		"125": [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		"126": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"127": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"160": [
			0,
			0,
			0,
			0,
			.525
		],
		"176": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"184": [
			.19445,
			0,
			0,
			0,
			.525
		],
		"305": [
			0,
			.43056,
			0,
			0,
			.525
		],
		"567": [
			.22222,
			.43056,
			0,
			0,
			.525
		],
		"711": [
			0,
			.56597,
			0,
			0,
			.525
		],
		"713": [
			0,
			.56555,
			0,
			0,
			.525
		],
		"714": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"715": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"728": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"730": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"770": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"771": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"776": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"915": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"916": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"920": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"923": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"926": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"928": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"931": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"933": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"934": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"936": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"937": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"8216": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"8217": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"8242": [
			0,
			.61111,
			0,
			0,
			.525
		],
		"9251": [
			.11111,
			.21944,
			0,
			0,
			.525
		]
	}
};
/**
* This file contains metrics regarding fonts and individual symbols. The sigma
* and xi variables, as well as the metricMap map contain data extracted from
* TeX, TeX font metrics, and the TTF files. These data are then exposed via the
* `metrics` variable and the getCharacterMetrics function.
*/
var sigmasAndXis = {
	slant: [
		.25,
		.25,
		.25
	],
	space: [
		0,
		0,
		0
	],
	stretch: [
		0,
		0,
		0
	],
	shrink: [
		0,
		0,
		0
	],
	xHeight: [
		.431,
		.431,
		.431
	],
	quad: [
		1,
		1.171,
		1.472
	],
	extraSpace: [
		0,
		0,
		0
	],
	num1: [
		.677,
		.732,
		.925
	],
	num2: [
		.394,
		.384,
		.387
	],
	num3: [
		.444,
		.471,
		.504
	],
	denom1: [
		.686,
		.752,
		1.025
	],
	denom2: [
		.345,
		.344,
		.532
	],
	sup1: [
		.413,
		.503,
		.504
	],
	sup2: [
		.363,
		.431,
		.404
	],
	sup3: [
		.289,
		.286,
		.294
	],
	sub1: [
		.15,
		.143,
		.2
	],
	sub2: [
		.247,
		.286,
		.4
	],
	supDrop: [
		.386,
		.353,
		.494
	],
	subDrop: [
		.05,
		.071,
		.1
	],
	delim1: [
		2.39,
		1.7,
		1.98
	],
	delim2: [
		1.01,
		1.157,
		1.42
	],
	axisHeight: [
		.25,
		.25,
		.25
	],
	defaultRuleThickness: [
		.04,
		.049,
		.049
	],
	bigOpSpacing1: [
		.111,
		.111,
		.111
	],
	bigOpSpacing2: [
		.166,
		.166,
		.166
	],
	bigOpSpacing3: [
		.2,
		.2,
		.2
	],
	bigOpSpacing4: [
		.6,
		.611,
		.611
	],
	bigOpSpacing5: [
		.1,
		.143,
		.143
	],
	sqrtRuleThickness: [
		.04,
		.04,
		.04
	],
	ptPerEm: [
		10,
		10,
		10
	],
	doubleRuleSep: [
		.2,
		.2,
		.2
	],
	arrayRuleWidth: [
		.04,
		.04,
		.04
	],
	fboxsep: [
		.3,
		.3,
		.3
	],
	fboxrule: [
		.04,
		.04,
		.04
	]
};
var extraCharacterMap = {
	"Å": "A",
	"Ð": "D",
	"Þ": "o",
	"å": "a",
	"ð": "d",
	"þ": "o",
	"А": "A",
	"Б": "B",
	"В": "B",
	"Г": "F",
	"Д": "A",
	"Е": "E",
	"Ж": "K",
	"З": "3",
	"И": "N",
	"Й": "N",
	"К": "K",
	"Л": "N",
	"М": "M",
	"Н": "H",
	"О": "O",
	"П": "N",
	"Р": "P",
	"С": "C",
	"Т": "T",
	"У": "y",
	"Ф": "O",
	"Х": "X",
	"Ц": "U",
	"Ч": "h",
	"Ш": "W",
	"Щ": "W",
	"Ъ": "B",
	"Ы": "X",
	"Ь": "B",
	"Э": "3",
	"Ю": "X",
	"Я": "R",
	"а": "a",
	"б": "b",
	"в": "a",
	"г": "r",
	"д": "y",
	"е": "e",
	"ж": "m",
	"з": "e",
	"и": "n",
	"й": "n",
	"к": "n",
	"л": "n",
	"м": "m",
	"н": "n",
	"о": "o",
	"п": "n",
	"р": "p",
	"с": "c",
	"т": "o",
	"у": "y",
	"ф": "b",
	"х": "x",
	"ц": "n",
	"ч": "n",
	"ш": "w",
	"щ": "w",
	"ъ": "a",
	"ы": "m",
	"ь": "a",
	"э": "e",
	"ю": "m",
	"я": "r"
};
/**
* This function adds new font metrics to default metricMap
* It can also override existing metrics
*/
function setFontMetrics(fontName, metrics) {
	fontMetricsData[fontName] = metrics;
}
/**
* This function is a convenience function for looking up information in the
* metricMap table. It takes a character as a string, and a font.
*
* Note: the `width` property may be undefined if fontMetricsData.js wasn't
* built using `Make extended_metrics`.
*/
function getCharacterMetrics(character, font, mode) {
	if (!fontMetricsData[font]) throw new Error("Font metrics not found for font: " + font + ".");
	var ch = character.charCodeAt(0);
	var metrics = fontMetricsData[font][ch];
	if (!metrics && character[0] in extraCharacterMap) {
		ch = extraCharacterMap[character[0]].charCodeAt(0);
		metrics = fontMetricsData[font][ch];
	}
	if (!metrics && mode === "text") {
		if (supportedCodepoint(ch)) metrics = fontMetricsData[font][77];
	}
	if (metrics) return {
		depth: metrics[0],
		height: metrics[1],
		italic: metrics[2],
		skew: metrics[3],
		width: metrics[4]
	};
}
var fontMetricsBySizeIndex = {};
/**
* Get the font metrics for a given size.
*/
function getGlobalMetrics(size) {
	var sizeIndex;
	if (size >= 5) sizeIndex = 0;
	else if (size >= 3) sizeIndex = 1;
	else sizeIndex = 2;
	if (!fontMetricsBySizeIndex[sizeIndex]) {
		var metrics = fontMetricsBySizeIndex[sizeIndex] = { cssEmPerMu: sigmasAndXis.quad[sizeIndex] / 18 };
		for (var key in sigmasAndXis) if (sigmasAndXis.hasOwnProperty(key)) metrics[key] = sigmasAndXis[key][sizeIndex];
	}
	return fontMetricsBySizeIndex[sizeIndex];
}
/**
* This file holds a list of all no-argument functions and single-character
* symbols (like 'a' or ';').
*
* For each of the symbols, there are three properties they can have:
* - font (required): the font to be used for this symbol. Either "main" (the
normal font), or "ams" (the ams fonts).
* - group (required): the ParseNode group type the symbol should have (i.e.
"textord", "mathord", etc).
See https://github.com/KaTeX/KaTeX/wiki/Examining-TeX#group-types
* - replace: the character that this symbol or function should be
*   replaced with (i.e. "\phi" has a replace value of "\u03d5", the phi
*   character in the main font).
*
* The outermost map in the table indicates what mode the symbols should be
* accepted in (e.g. "math" or "text").
*/
var ATOMS = {
	"bin": 1,
	"close": 1,
	"inner": 1,
	"open": 1,
	"punct": 1,
	"rel": 1
};
var NON_ATOMS = {
	"accent-token": 1,
	"mathord": 1,
	"op-token": 1,
	"spacing": 1,
	"textord": 1
};
var symbols = {
	"math": {},
	"text": {}
};
/** `acceptUnicodeChar = true` is only applicable if `replace` is set. */
function defineSymbol(mode, font, group, replace, name, acceptUnicodeChar) {
	symbols[mode][name] = {
		font,
		group,
		replace
	};
	if (acceptUnicodeChar && replace) symbols[mode][replace] = symbols[mode][name];
}
var math$1 = "math";
var text = "text";
var main = "main";
var ams = "ams";
var accent = "accent-token";
var bin = "bin";
var close = "close";
var inner = "inner";
var mathord = "mathord";
var op = "op-token";
var open = "open";
var punct = "punct";
var rel = "rel";
var spacing = "spacing";
var textord = "textord";
defineSymbol(math$1, main, rel, "≡", "\\equiv", true);
defineSymbol(math$1, main, rel, "≺", "\\prec", true);
defineSymbol(math$1, main, rel, "≻", "\\succ", true);
defineSymbol(math$1, main, rel, "∼", "\\sim", true);
defineSymbol(math$1, main, rel, "⊥", "\\perp");
defineSymbol(math$1, main, rel, "⪯", "\\preceq", true);
defineSymbol(math$1, main, rel, "⪰", "\\succeq", true);
defineSymbol(math$1, main, rel, "≃", "\\simeq", true);
defineSymbol(math$1, main, rel, "∣", "\\mid", true);
defineSymbol(math$1, main, rel, "≪", "\\ll", true);
defineSymbol(math$1, main, rel, "≫", "\\gg", true);
defineSymbol(math$1, main, rel, "≍", "\\asymp", true);
defineSymbol(math$1, main, rel, "∥", "\\parallel");
defineSymbol(math$1, main, rel, "⋈", "\\bowtie", true);
defineSymbol(math$1, main, rel, "⌣", "\\smile", true);
defineSymbol(math$1, main, rel, "⊑", "\\sqsubseteq", true);
defineSymbol(math$1, main, rel, "⊒", "\\sqsupseteq", true);
defineSymbol(math$1, main, rel, "≐", "\\doteq", true);
defineSymbol(math$1, main, rel, "⌢", "\\frown", true);
defineSymbol(math$1, main, rel, "∋", "\\ni", true);
defineSymbol(math$1, main, rel, "∝", "\\propto", true);
defineSymbol(math$1, main, rel, "⊢", "\\vdash", true);
defineSymbol(math$1, main, rel, "⊣", "\\dashv", true);
defineSymbol(math$1, main, rel, "∋", "\\owns");
defineSymbol(math$1, main, punct, ".", "\\ldotp");
defineSymbol(math$1, main, punct, "⋅", "\\cdotp");
defineSymbol(math$1, main, textord, "#", "\\#");
defineSymbol(text, main, textord, "#", "\\#");
defineSymbol(math$1, main, textord, "&", "\\&");
defineSymbol(text, main, textord, "&", "\\&");
defineSymbol(math$1, main, textord, "ℵ", "\\aleph", true);
defineSymbol(math$1, main, textord, "∀", "\\forall", true);
defineSymbol(math$1, main, textord, "ℏ", "\\hbar", true);
defineSymbol(math$1, main, textord, "∃", "\\exists", true);
defineSymbol(math$1, main, textord, "∇", "\\nabla", true);
defineSymbol(math$1, main, textord, "♭", "\\flat", true);
defineSymbol(math$1, main, textord, "ℓ", "\\ell", true);
defineSymbol(math$1, main, textord, "♮", "\\natural", true);
defineSymbol(math$1, main, textord, "♣", "\\clubsuit", true);
defineSymbol(math$1, main, textord, "℘", "\\wp", true);
defineSymbol(math$1, main, textord, "♯", "\\sharp", true);
defineSymbol(math$1, main, textord, "♢", "\\diamondsuit", true);
defineSymbol(math$1, main, textord, "ℜ", "\\Re", true);
defineSymbol(math$1, main, textord, "♡", "\\heartsuit", true);
defineSymbol(math$1, main, textord, "ℑ", "\\Im", true);
defineSymbol(math$1, main, textord, "♠", "\\spadesuit", true);
defineSymbol(math$1, main, textord, "§", "\\S", true);
defineSymbol(text, main, textord, "§", "\\S");
defineSymbol(math$1, main, textord, "¶", "\\P", true);
defineSymbol(text, main, textord, "¶", "\\P");
defineSymbol(math$1, main, textord, "†", "\\dag");
defineSymbol(text, main, textord, "†", "\\dag");
defineSymbol(text, main, textord, "†", "\\textdagger");
defineSymbol(math$1, main, textord, "‡", "\\ddag");
defineSymbol(text, main, textord, "‡", "\\ddag");
defineSymbol(text, main, textord, "‡", "\\textdaggerdbl");
defineSymbol(math$1, main, close, "⎱", "\\rmoustache", true);
defineSymbol(math$1, main, open, "⎰", "\\lmoustache", true);
defineSymbol(math$1, main, close, "⟯", "\\rgroup", true);
defineSymbol(math$1, main, open, "⟮", "\\lgroup", true);
defineSymbol(math$1, main, bin, "∓", "\\mp", true);
defineSymbol(math$1, main, bin, "⊖", "\\ominus", true);
defineSymbol(math$1, main, bin, "⊎", "\\uplus", true);
defineSymbol(math$1, main, bin, "⊓", "\\sqcap", true);
defineSymbol(math$1, main, bin, "∗", "\\ast");
defineSymbol(math$1, main, bin, "⊔", "\\sqcup", true);
defineSymbol(math$1, main, bin, "◯", "\\bigcirc", true);
defineSymbol(math$1, main, bin, "∙", "\\bullet", true);
defineSymbol(math$1, main, bin, "‡", "\\ddagger");
defineSymbol(math$1, main, bin, "≀", "\\wr", true);
defineSymbol(math$1, main, bin, "⨿", "\\amalg");
defineSymbol(math$1, main, bin, "&", "\\And");
defineSymbol(math$1, main, rel, "⟵", "\\longleftarrow", true);
defineSymbol(math$1, main, rel, "⇐", "\\Leftarrow", true);
defineSymbol(math$1, main, rel, "⟸", "\\Longleftarrow", true);
defineSymbol(math$1, main, rel, "⟶", "\\longrightarrow", true);
defineSymbol(math$1, main, rel, "⇒", "\\Rightarrow", true);
defineSymbol(math$1, main, rel, "⟹", "\\Longrightarrow", true);
defineSymbol(math$1, main, rel, "↔", "\\leftrightarrow", true);
defineSymbol(math$1, main, rel, "⟷", "\\longleftrightarrow", true);
defineSymbol(math$1, main, rel, "⇔", "\\Leftrightarrow", true);
defineSymbol(math$1, main, rel, "⟺", "\\Longleftrightarrow", true);
defineSymbol(math$1, main, rel, "↦", "\\mapsto", true);
defineSymbol(math$1, main, rel, "⟼", "\\longmapsto", true);
defineSymbol(math$1, main, rel, "↗", "\\nearrow", true);
defineSymbol(math$1, main, rel, "↩", "\\hookleftarrow", true);
defineSymbol(math$1, main, rel, "↪", "\\hookrightarrow", true);
defineSymbol(math$1, main, rel, "↘", "\\searrow", true);
defineSymbol(math$1, main, rel, "↼", "\\leftharpoonup", true);
defineSymbol(math$1, main, rel, "⇀", "\\rightharpoonup", true);
defineSymbol(math$1, main, rel, "↙", "\\swarrow", true);
defineSymbol(math$1, main, rel, "↽", "\\leftharpoondown", true);
defineSymbol(math$1, main, rel, "⇁", "\\rightharpoondown", true);
defineSymbol(math$1, main, rel, "↖", "\\nwarrow", true);
defineSymbol(math$1, main, rel, "⇌", "\\rightleftharpoons", true);
defineSymbol(math$1, ams, rel, "≮", "\\nless", true);
defineSymbol(math$1, ams, rel, "", "\\@nleqslant");
defineSymbol(math$1, ams, rel, "", "\\@nleqq");
defineSymbol(math$1, ams, rel, "⪇", "\\lneq", true);
defineSymbol(math$1, ams, rel, "≨", "\\lneqq", true);
defineSymbol(math$1, ams, rel, "", "\\@lvertneqq");
defineSymbol(math$1, ams, rel, "⋦", "\\lnsim", true);
defineSymbol(math$1, ams, rel, "⪉", "\\lnapprox", true);
defineSymbol(math$1, ams, rel, "⊀", "\\nprec", true);
defineSymbol(math$1, ams, rel, "⋠", "\\npreceq", true);
defineSymbol(math$1, ams, rel, "⋨", "\\precnsim", true);
defineSymbol(math$1, ams, rel, "⪹", "\\precnapprox", true);
defineSymbol(math$1, ams, rel, "≁", "\\nsim", true);
defineSymbol(math$1, ams, rel, "", "\\@nshortmid");
defineSymbol(math$1, ams, rel, "∤", "\\nmid", true);
defineSymbol(math$1, ams, rel, "⊬", "\\nvdash", true);
defineSymbol(math$1, ams, rel, "⊭", "\\nvDash", true);
defineSymbol(math$1, ams, rel, "⋪", "\\ntriangleleft");
defineSymbol(math$1, ams, rel, "⋬", "\\ntrianglelefteq", true);
defineSymbol(math$1, ams, rel, "⊊", "\\subsetneq", true);
defineSymbol(math$1, ams, rel, "", "\\@varsubsetneq");
defineSymbol(math$1, ams, rel, "⫋", "\\subsetneqq", true);
defineSymbol(math$1, ams, rel, "", "\\@varsubsetneqq");
defineSymbol(math$1, ams, rel, "≯", "\\ngtr", true);
defineSymbol(math$1, ams, rel, "", "\\@ngeqslant");
defineSymbol(math$1, ams, rel, "", "\\@ngeqq");
defineSymbol(math$1, ams, rel, "⪈", "\\gneq", true);
defineSymbol(math$1, ams, rel, "≩", "\\gneqq", true);
defineSymbol(math$1, ams, rel, "", "\\@gvertneqq");
defineSymbol(math$1, ams, rel, "⋧", "\\gnsim", true);
defineSymbol(math$1, ams, rel, "⪊", "\\gnapprox", true);
defineSymbol(math$1, ams, rel, "⊁", "\\nsucc", true);
defineSymbol(math$1, ams, rel, "⋡", "\\nsucceq", true);
defineSymbol(math$1, ams, rel, "⋩", "\\succnsim", true);
defineSymbol(math$1, ams, rel, "⪺", "\\succnapprox", true);
defineSymbol(math$1, ams, rel, "≆", "\\ncong", true);
defineSymbol(math$1, ams, rel, "", "\\@nshortparallel");
defineSymbol(math$1, ams, rel, "∦", "\\nparallel", true);
defineSymbol(math$1, ams, rel, "⊯", "\\nVDash", true);
defineSymbol(math$1, ams, rel, "⋫", "\\ntriangleright");
defineSymbol(math$1, ams, rel, "⋭", "\\ntrianglerighteq", true);
defineSymbol(math$1, ams, rel, "", "\\@nsupseteqq");
defineSymbol(math$1, ams, rel, "⊋", "\\supsetneq", true);
defineSymbol(math$1, ams, rel, "", "\\@varsupsetneq");
defineSymbol(math$1, ams, rel, "⫌", "\\supsetneqq", true);
defineSymbol(math$1, ams, rel, "", "\\@varsupsetneqq");
defineSymbol(math$1, ams, rel, "⊮", "\\nVdash", true);
defineSymbol(math$1, ams, rel, "⪵", "\\precneqq", true);
defineSymbol(math$1, ams, rel, "⪶", "\\succneqq", true);
defineSymbol(math$1, ams, rel, "", "\\@nsubseteqq");
defineSymbol(math$1, ams, bin, "⊴", "\\unlhd");
defineSymbol(math$1, ams, bin, "⊵", "\\unrhd");
defineSymbol(math$1, ams, rel, "↚", "\\nleftarrow", true);
defineSymbol(math$1, ams, rel, "↛", "\\nrightarrow", true);
defineSymbol(math$1, ams, rel, "⇍", "\\nLeftarrow", true);
defineSymbol(math$1, ams, rel, "⇏", "\\nRightarrow", true);
defineSymbol(math$1, ams, rel, "↮", "\\nleftrightarrow", true);
defineSymbol(math$1, ams, rel, "⇎", "\\nLeftrightarrow", true);
defineSymbol(math$1, ams, rel, "△", "\\vartriangle");
defineSymbol(math$1, ams, textord, "ℏ", "\\hslash");
defineSymbol(math$1, ams, textord, "▽", "\\triangledown");
defineSymbol(math$1, ams, textord, "◊", "\\lozenge");
defineSymbol(math$1, ams, textord, "Ⓢ", "\\circledS");
defineSymbol(math$1, ams, textord, "®", "\\circledR");
defineSymbol(text, ams, textord, "®", "\\circledR");
defineSymbol(math$1, ams, textord, "∡", "\\measuredangle", true);
defineSymbol(math$1, ams, textord, "∄", "\\nexists");
defineSymbol(math$1, ams, textord, "℧", "\\mho");
defineSymbol(math$1, ams, textord, "Ⅎ", "\\Finv", true);
defineSymbol(math$1, ams, textord, "⅁", "\\Game", true);
defineSymbol(math$1, ams, textord, "‵", "\\backprime");
defineSymbol(math$1, ams, textord, "▲", "\\blacktriangle");
defineSymbol(math$1, ams, textord, "▼", "\\blacktriangledown");
defineSymbol(math$1, ams, textord, "■", "\\blacksquare");
defineSymbol(math$1, ams, textord, "⧫", "\\blacklozenge");
defineSymbol(math$1, ams, textord, "★", "\\bigstar");
defineSymbol(math$1, ams, textord, "∢", "\\sphericalangle", true);
defineSymbol(math$1, ams, textord, "∁", "\\complement", true);
defineSymbol(math$1, ams, textord, "ð", "\\eth", true);
defineSymbol(text, main, textord, "ð", "ð");
defineSymbol(math$1, ams, textord, "╱", "\\diagup");
defineSymbol(math$1, ams, textord, "╲", "\\diagdown");
defineSymbol(math$1, ams, textord, "□", "\\square");
defineSymbol(math$1, ams, textord, "□", "\\Box");
defineSymbol(math$1, ams, textord, "◊", "\\Diamond");
defineSymbol(math$1, ams, textord, "¥", "\\yen", true);
defineSymbol(text, ams, textord, "¥", "\\yen", true);
defineSymbol(math$1, ams, textord, "✓", "\\checkmark", true);
defineSymbol(text, ams, textord, "✓", "\\checkmark");
defineSymbol(math$1, ams, textord, "ℶ", "\\beth", true);
defineSymbol(math$1, ams, textord, "ℸ", "\\daleth", true);
defineSymbol(math$1, ams, textord, "ℷ", "\\gimel", true);
defineSymbol(math$1, ams, textord, "ϝ", "\\digamma", true);
defineSymbol(math$1, ams, textord, "ϰ", "\\varkappa");
defineSymbol(math$1, ams, open, "┌", "\\@ulcorner", true);
defineSymbol(math$1, ams, close, "┐", "\\@urcorner", true);
defineSymbol(math$1, ams, open, "└", "\\@llcorner", true);
defineSymbol(math$1, ams, close, "┘", "\\@lrcorner", true);
defineSymbol(math$1, ams, rel, "≦", "\\leqq", true);
defineSymbol(math$1, ams, rel, "⩽", "\\leqslant", true);
defineSymbol(math$1, ams, rel, "⪕", "\\eqslantless", true);
defineSymbol(math$1, ams, rel, "≲", "\\lesssim", true);
defineSymbol(math$1, ams, rel, "⪅", "\\lessapprox", true);
defineSymbol(math$1, ams, rel, "≊", "\\approxeq", true);
defineSymbol(math$1, ams, bin, "⋖", "\\lessdot");
defineSymbol(math$1, ams, rel, "⋘", "\\lll", true);
defineSymbol(math$1, ams, rel, "≶", "\\lessgtr", true);
defineSymbol(math$1, ams, rel, "⋚", "\\lesseqgtr", true);
defineSymbol(math$1, ams, rel, "⪋", "\\lesseqqgtr", true);
defineSymbol(math$1, ams, rel, "≑", "\\doteqdot");
defineSymbol(math$1, ams, rel, "≓", "\\risingdotseq", true);
defineSymbol(math$1, ams, rel, "≒", "\\fallingdotseq", true);
defineSymbol(math$1, ams, rel, "∽", "\\backsim", true);
defineSymbol(math$1, ams, rel, "⋍", "\\backsimeq", true);
defineSymbol(math$1, ams, rel, "⫅", "\\subseteqq", true);
defineSymbol(math$1, ams, rel, "⋐", "\\Subset", true);
defineSymbol(math$1, ams, rel, "⊏", "\\sqsubset", true);
defineSymbol(math$1, ams, rel, "≼", "\\preccurlyeq", true);
defineSymbol(math$1, ams, rel, "⋞", "\\curlyeqprec", true);
defineSymbol(math$1, ams, rel, "≾", "\\precsim", true);
defineSymbol(math$1, ams, rel, "⪷", "\\precapprox", true);
defineSymbol(math$1, ams, rel, "⊲", "\\vartriangleleft");
defineSymbol(math$1, ams, rel, "⊴", "\\trianglelefteq");
defineSymbol(math$1, ams, rel, "⊨", "\\vDash", true);
defineSymbol(math$1, ams, rel, "⊪", "\\Vvdash", true);
defineSymbol(math$1, ams, rel, "⌣", "\\smallsmile");
defineSymbol(math$1, ams, rel, "⌢", "\\smallfrown");
defineSymbol(math$1, ams, rel, "≏", "\\bumpeq", true);
defineSymbol(math$1, ams, rel, "≎", "\\Bumpeq", true);
defineSymbol(math$1, ams, rel, "≧", "\\geqq", true);
defineSymbol(math$1, ams, rel, "⩾", "\\geqslant", true);
defineSymbol(math$1, ams, rel, "⪖", "\\eqslantgtr", true);
defineSymbol(math$1, ams, rel, "≳", "\\gtrsim", true);
defineSymbol(math$1, ams, rel, "⪆", "\\gtrapprox", true);
defineSymbol(math$1, ams, bin, "⋗", "\\gtrdot");
defineSymbol(math$1, ams, rel, "⋙", "\\ggg", true);
defineSymbol(math$1, ams, rel, "≷", "\\gtrless", true);
defineSymbol(math$1, ams, rel, "⋛", "\\gtreqless", true);
defineSymbol(math$1, ams, rel, "⪌", "\\gtreqqless", true);
defineSymbol(math$1, ams, rel, "≖", "\\eqcirc", true);
defineSymbol(math$1, ams, rel, "≗", "\\circeq", true);
defineSymbol(math$1, ams, rel, "≜", "\\triangleq", true);
defineSymbol(math$1, ams, rel, "∼", "\\thicksim");
defineSymbol(math$1, ams, rel, "≈", "\\thickapprox");
defineSymbol(math$1, ams, rel, "⫆", "\\supseteqq", true);
defineSymbol(math$1, ams, rel, "⋑", "\\Supset", true);
defineSymbol(math$1, ams, rel, "⊐", "\\sqsupset", true);
defineSymbol(math$1, ams, rel, "≽", "\\succcurlyeq", true);
defineSymbol(math$1, ams, rel, "⋟", "\\curlyeqsucc", true);
defineSymbol(math$1, ams, rel, "≿", "\\succsim", true);
defineSymbol(math$1, ams, rel, "⪸", "\\succapprox", true);
defineSymbol(math$1, ams, rel, "⊳", "\\vartriangleright");
defineSymbol(math$1, ams, rel, "⊵", "\\trianglerighteq");
defineSymbol(math$1, ams, rel, "⊩", "\\Vdash", true);
defineSymbol(math$1, ams, rel, "∣", "\\shortmid");
defineSymbol(math$1, ams, rel, "∥", "\\shortparallel");
defineSymbol(math$1, ams, rel, "≬", "\\between", true);
defineSymbol(math$1, ams, rel, "⋔", "\\pitchfork", true);
defineSymbol(math$1, ams, rel, "∝", "\\varpropto");
defineSymbol(math$1, ams, rel, "◀", "\\blacktriangleleft");
defineSymbol(math$1, ams, rel, "∴", "\\therefore", true);
defineSymbol(math$1, ams, rel, "∍", "\\backepsilon");
defineSymbol(math$1, ams, rel, "▶", "\\blacktriangleright");
defineSymbol(math$1, ams, rel, "∵", "\\because", true);
defineSymbol(math$1, ams, rel, "⋘", "\\llless");
defineSymbol(math$1, ams, rel, "⋙", "\\gggtr");
defineSymbol(math$1, ams, bin, "⊲", "\\lhd");
defineSymbol(math$1, ams, bin, "⊳", "\\rhd");
defineSymbol(math$1, ams, rel, "≂", "\\eqsim", true);
defineSymbol(math$1, main, rel, "⋈", "\\Join");
defineSymbol(math$1, ams, rel, "≑", "\\Doteq", true);
defineSymbol(math$1, ams, bin, "∔", "\\dotplus", true);
defineSymbol(math$1, ams, bin, "∖", "\\smallsetminus");
defineSymbol(math$1, ams, bin, "⋒", "\\Cap", true);
defineSymbol(math$1, ams, bin, "⋓", "\\Cup", true);
defineSymbol(math$1, ams, bin, "⩞", "\\doublebarwedge", true);
defineSymbol(math$1, ams, bin, "⊟", "\\boxminus", true);
defineSymbol(math$1, ams, bin, "⊞", "\\boxplus", true);
defineSymbol(math$1, ams, bin, "⋇", "\\divideontimes", true);
defineSymbol(math$1, ams, bin, "⋉", "\\ltimes", true);
defineSymbol(math$1, ams, bin, "⋊", "\\rtimes", true);
defineSymbol(math$1, ams, bin, "⋋", "\\leftthreetimes", true);
defineSymbol(math$1, ams, bin, "⋌", "\\rightthreetimes", true);
defineSymbol(math$1, ams, bin, "⋏", "\\curlywedge", true);
defineSymbol(math$1, ams, bin, "⋎", "\\curlyvee", true);
defineSymbol(math$1, ams, bin, "⊝", "\\circleddash", true);
defineSymbol(math$1, ams, bin, "⊛", "\\circledast", true);
defineSymbol(math$1, ams, bin, "⋅", "\\centerdot");
defineSymbol(math$1, ams, bin, "⊺", "\\intercal", true);
defineSymbol(math$1, ams, bin, "⋒", "\\doublecap");
defineSymbol(math$1, ams, bin, "⋓", "\\doublecup");
defineSymbol(math$1, ams, bin, "⊠", "\\boxtimes", true);
defineSymbol(math$1, ams, rel, "⇢", "\\dashrightarrow", true);
defineSymbol(math$1, ams, rel, "⇠", "\\dashleftarrow", true);
defineSymbol(math$1, ams, rel, "⇇", "\\leftleftarrows", true);
defineSymbol(math$1, ams, rel, "⇆", "\\leftrightarrows", true);
defineSymbol(math$1, ams, rel, "⇚", "\\Lleftarrow", true);
defineSymbol(math$1, ams, rel, "↞", "\\twoheadleftarrow", true);
defineSymbol(math$1, ams, rel, "↢", "\\leftarrowtail", true);
defineSymbol(math$1, ams, rel, "↫", "\\looparrowleft", true);
defineSymbol(math$1, ams, rel, "⇋", "\\leftrightharpoons", true);
defineSymbol(math$1, ams, rel, "↶", "\\curvearrowleft", true);
defineSymbol(math$1, ams, rel, "↺", "\\circlearrowleft", true);
defineSymbol(math$1, ams, rel, "↰", "\\Lsh", true);
defineSymbol(math$1, ams, rel, "⇈", "\\upuparrows", true);
defineSymbol(math$1, ams, rel, "↿", "\\upharpoonleft", true);
defineSymbol(math$1, ams, rel, "⇃", "\\downharpoonleft", true);
defineSymbol(math$1, main, rel, "⊶", "\\origof", true);
defineSymbol(math$1, main, rel, "⊷", "\\imageof", true);
defineSymbol(math$1, ams, rel, "⊸", "\\multimap", true);
defineSymbol(math$1, ams, rel, "↭", "\\leftrightsquigarrow", true);
defineSymbol(math$1, ams, rel, "⇉", "\\rightrightarrows", true);
defineSymbol(math$1, ams, rel, "⇄", "\\rightleftarrows", true);
defineSymbol(math$1, ams, rel, "↠", "\\twoheadrightarrow", true);
defineSymbol(math$1, ams, rel, "↣", "\\rightarrowtail", true);
defineSymbol(math$1, ams, rel, "↬", "\\looparrowright", true);
defineSymbol(math$1, ams, rel, "↷", "\\curvearrowright", true);
defineSymbol(math$1, ams, rel, "↻", "\\circlearrowright", true);
defineSymbol(math$1, ams, rel, "↱", "\\Rsh", true);
defineSymbol(math$1, ams, rel, "⇊", "\\downdownarrows", true);
defineSymbol(math$1, ams, rel, "↾", "\\upharpoonright", true);
defineSymbol(math$1, ams, rel, "⇂", "\\downharpoonright", true);
defineSymbol(math$1, ams, rel, "⇝", "\\rightsquigarrow", true);
defineSymbol(math$1, ams, rel, "⇝", "\\leadsto");
defineSymbol(math$1, ams, rel, "⇛", "\\Rrightarrow", true);
defineSymbol(math$1, ams, rel, "↾", "\\restriction");
defineSymbol(math$1, main, textord, "‘", "`");
defineSymbol(math$1, main, textord, "$", "\\$");
defineSymbol(text, main, textord, "$", "\\$");
defineSymbol(text, main, textord, "$", "\\textdollar");
defineSymbol(math$1, main, textord, "%", "\\%");
defineSymbol(text, main, textord, "%", "\\%");
defineSymbol(math$1, main, textord, "_", "\\_");
defineSymbol(text, main, textord, "_", "\\_");
defineSymbol(text, main, textord, "_", "\\textunderscore");
defineSymbol(math$1, main, textord, "∠", "\\angle", true);
defineSymbol(math$1, main, textord, "∞", "\\infty", true);
defineSymbol(math$1, main, textord, "′", "\\prime");
defineSymbol(math$1, main, textord, "△", "\\triangle");
defineSymbol(math$1, main, textord, "Γ", "\\Gamma", true);
defineSymbol(math$1, main, textord, "Δ", "\\Delta", true);
defineSymbol(math$1, main, textord, "Θ", "\\Theta", true);
defineSymbol(math$1, main, textord, "Λ", "\\Lambda", true);
defineSymbol(math$1, main, textord, "Ξ", "\\Xi", true);
defineSymbol(math$1, main, textord, "Π", "\\Pi", true);
defineSymbol(math$1, main, textord, "Σ", "\\Sigma", true);
defineSymbol(math$1, main, textord, "Υ", "\\Upsilon", true);
defineSymbol(math$1, main, textord, "Φ", "\\Phi", true);
defineSymbol(math$1, main, textord, "Ψ", "\\Psi", true);
defineSymbol(math$1, main, textord, "Ω", "\\Omega", true);
defineSymbol(math$1, main, textord, "A", "Α");
defineSymbol(math$1, main, textord, "B", "Β");
defineSymbol(math$1, main, textord, "E", "Ε");
defineSymbol(math$1, main, textord, "Z", "Ζ");
defineSymbol(math$1, main, textord, "H", "Η");
defineSymbol(math$1, main, textord, "I", "Ι");
defineSymbol(math$1, main, textord, "K", "Κ");
defineSymbol(math$1, main, textord, "M", "Μ");
defineSymbol(math$1, main, textord, "N", "Ν");
defineSymbol(math$1, main, textord, "O", "Ο");
defineSymbol(math$1, main, textord, "P", "Ρ");
defineSymbol(math$1, main, textord, "T", "Τ");
defineSymbol(math$1, main, textord, "X", "Χ");
defineSymbol(math$1, main, textord, "¬", "\\neg", true);
defineSymbol(math$1, main, textord, "¬", "\\lnot");
defineSymbol(math$1, main, textord, "⊤", "\\top");
defineSymbol(math$1, main, textord, "⊥", "\\bot");
defineSymbol(math$1, main, textord, "∅", "\\emptyset");
defineSymbol(math$1, ams, textord, "∅", "\\varnothing");
defineSymbol(math$1, main, mathord, "α", "\\alpha", true);
defineSymbol(math$1, main, mathord, "β", "\\beta", true);
defineSymbol(math$1, main, mathord, "γ", "\\gamma", true);
defineSymbol(math$1, main, mathord, "δ", "\\delta", true);
defineSymbol(math$1, main, mathord, "ϵ", "\\epsilon", true);
defineSymbol(math$1, main, mathord, "ζ", "\\zeta", true);
defineSymbol(math$1, main, mathord, "η", "\\eta", true);
defineSymbol(math$1, main, mathord, "θ", "\\theta", true);
defineSymbol(math$1, main, mathord, "ι", "\\iota", true);
defineSymbol(math$1, main, mathord, "κ", "\\kappa", true);
defineSymbol(math$1, main, mathord, "λ", "\\lambda", true);
defineSymbol(math$1, main, mathord, "μ", "\\mu", true);
defineSymbol(math$1, main, mathord, "ν", "\\nu", true);
defineSymbol(math$1, main, mathord, "ξ", "\\xi", true);
defineSymbol(math$1, main, mathord, "ο", "\\omicron", true);
defineSymbol(math$1, main, mathord, "π", "\\pi", true);
defineSymbol(math$1, main, mathord, "ρ", "\\rho", true);
defineSymbol(math$1, main, mathord, "σ", "\\sigma", true);
defineSymbol(math$1, main, mathord, "τ", "\\tau", true);
defineSymbol(math$1, main, mathord, "υ", "\\upsilon", true);
defineSymbol(math$1, main, mathord, "ϕ", "\\phi", true);
defineSymbol(math$1, main, mathord, "χ", "\\chi", true);
defineSymbol(math$1, main, mathord, "ψ", "\\psi", true);
defineSymbol(math$1, main, mathord, "ω", "\\omega", true);
defineSymbol(math$1, main, mathord, "ε", "\\varepsilon", true);
defineSymbol(math$1, main, mathord, "ϑ", "\\vartheta", true);
defineSymbol(math$1, main, mathord, "ϖ", "\\varpi", true);
defineSymbol(math$1, main, mathord, "ϱ", "\\varrho", true);
defineSymbol(math$1, main, mathord, "ς", "\\varsigma", true);
defineSymbol(math$1, main, mathord, "φ", "\\varphi", true);
defineSymbol(math$1, main, bin, "∗", "*", true);
defineSymbol(math$1, main, bin, "+", "+");
defineSymbol(math$1, main, bin, "−", "-", true);
defineSymbol(math$1, main, bin, "⋅", "\\cdot", true);
defineSymbol(math$1, main, bin, "∘", "\\circ", true);
defineSymbol(math$1, main, bin, "÷", "\\div", true);
defineSymbol(math$1, main, bin, "±", "\\pm", true);
defineSymbol(math$1, main, bin, "×", "\\times", true);
defineSymbol(math$1, main, bin, "∩", "\\cap", true);
defineSymbol(math$1, main, bin, "∪", "\\cup", true);
defineSymbol(math$1, main, bin, "∖", "\\setminus", true);
defineSymbol(math$1, main, bin, "∧", "\\land");
defineSymbol(math$1, main, bin, "∨", "\\lor");
defineSymbol(math$1, main, bin, "∧", "\\wedge", true);
defineSymbol(math$1, main, bin, "∨", "\\vee", true);
defineSymbol(math$1, main, textord, "√", "\\surd");
defineSymbol(math$1, main, open, "⟨", "\\langle", true);
defineSymbol(math$1, main, open, "∣", "\\lvert");
defineSymbol(math$1, main, open, "∥", "\\lVert");
defineSymbol(math$1, main, close, "?", "?");
defineSymbol(math$1, main, close, "!", "!");
defineSymbol(math$1, main, close, "⟩", "\\rangle", true);
defineSymbol(math$1, main, close, "∣", "\\rvert");
defineSymbol(math$1, main, close, "∥", "\\rVert");
defineSymbol(math$1, main, rel, "=", "=");
defineSymbol(math$1, main, rel, ":", ":");
defineSymbol(math$1, main, rel, "≈", "\\approx", true);
defineSymbol(math$1, main, rel, "≅", "\\cong", true);
defineSymbol(math$1, main, rel, "≥", "\\ge");
defineSymbol(math$1, main, rel, "≥", "\\geq", true);
defineSymbol(math$1, main, rel, "←", "\\gets");
defineSymbol(math$1, main, rel, ">", "\\gt", true);
defineSymbol(math$1, main, rel, "∈", "\\in", true);
defineSymbol(math$1, main, rel, "", "\\@not");
defineSymbol(math$1, main, rel, "⊂", "\\subset", true);
defineSymbol(math$1, main, rel, "⊃", "\\supset", true);
defineSymbol(math$1, main, rel, "⊆", "\\subseteq", true);
defineSymbol(math$1, main, rel, "⊇", "\\supseteq", true);
defineSymbol(math$1, ams, rel, "⊈", "\\nsubseteq", true);
defineSymbol(math$1, ams, rel, "⊉", "\\nsupseteq", true);
defineSymbol(math$1, main, rel, "⊨", "\\models");
defineSymbol(math$1, main, rel, "←", "\\leftarrow", true);
defineSymbol(math$1, main, rel, "≤", "\\le");
defineSymbol(math$1, main, rel, "≤", "\\leq", true);
defineSymbol(math$1, main, rel, "<", "\\lt", true);
defineSymbol(math$1, main, rel, "→", "\\rightarrow", true);
defineSymbol(math$1, main, rel, "→", "\\to");
defineSymbol(math$1, ams, rel, "≱", "\\ngeq", true);
defineSymbol(math$1, ams, rel, "≰", "\\nleq", true);
defineSymbol(math$1, main, spacing, "\xA0", "\\ ");
defineSymbol(math$1, main, spacing, "\xA0", "\\space");
defineSymbol(math$1, main, spacing, "\xA0", "\\nobreakspace");
defineSymbol(text, main, spacing, "\xA0", "\\ ");
defineSymbol(text, main, spacing, "\xA0", " ");
defineSymbol(text, main, spacing, "\xA0", "\\space");
defineSymbol(text, main, spacing, "\xA0", "\\nobreakspace");
defineSymbol(math$1, main, spacing, null, "\\nobreak");
defineSymbol(math$1, main, spacing, null, "\\allowbreak");
defineSymbol(math$1, main, punct, ",", ",");
defineSymbol(math$1, main, punct, ";", ";");
defineSymbol(math$1, ams, bin, "⊼", "\\barwedge", true);
defineSymbol(math$1, ams, bin, "⊻", "\\veebar", true);
defineSymbol(math$1, main, bin, "⊙", "\\odot", true);
defineSymbol(math$1, main, bin, "⊕", "\\oplus", true);
defineSymbol(math$1, main, bin, "⊗", "\\otimes", true);
defineSymbol(math$1, main, textord, "∂", "\\partial", true);
defineSymbol(math$1, main, bin, "⊘", "\\oslash", true);
defineSymbol(math$1, ams, bin, "⊚", "\\circledcirc", true);
defineSymbol(math$1, ams, bin, "⊡", "\\boxdot", true);
defineSymbol(math$1, main, bin, "△", "\\bigtriangleup");
defineSymbol(math$1, main, bin, "▽", "\\bigtriangledown");
defineSymbol(math$1, main, bin, "†", "\\dagger");
defineSymbol(math$1, main, bin, "⋄", "\\diamond");
defineSymbol(math$1, main, bin, "⋆", "\\star");
defineSymbol(math$1, main, bin, "◃", "\\triangleleft");
defineSymbol(math$1, main, bin, "▹", "\\triangleright");
defineSymbol(math$1, main, open, "{", "\\{");
defineSymbol(text, main, textord, "{", "\\{");
defineSymbol(text, main, textord, "{", "\\textbraceleft");
defineSymbol(math$1, main, close, "}", "\\}");
defineSymbol(text, main, textord, "}", "\\}");
defineSymbol(text, main, textord, "}", "\\textbraceright");
defineSymbol(math$1, main, open, "{", "\\lbrace");
defineSymbol(math$1, main, close, "}", "\\rbrace");
defineSymbol(math$1, main, open, "[", "\\lbrack", true);
defineSymbol(text, main, textord, "[", "\\lbrack", true);
defineSymbol(math$1, main, close, "]", "\\rbrack", true);
defineSymbol(text, main, textord, "]", "\\rbrack", true);
defineSymbol(math$1, main, open, "(", "\\lparen", true);
defineSymbol(math$1, main, close, ")", "\\rparen", true);
defineSymbol(text, main, textord, "<", "\\textless", true);
defineSymbol(text, main, textord, ">", "\\textgreater", true);
defineSymbol(math$1, main, open, "⌊", "\\lfloor", true);
defineSymbol(math$1, main, close, "⌋", "\\rfloor", true);
defineSymbol(math$1, main, open, "⌈", "\\lceil", true);
defineSymbol(math$1, main, close, "⌉", "\\rceil", true);
defineSymbol(math$1, main, textord, "\\", "\\backslash");
defineSymbol(math$1, main, textord, "∣", "|");
defineSymbol(math$1, main, textord, "∣", "\\vert");
defineSymbol(text, main, textord, "|", "\\textbar", true);
defineSymbol(math$1, main, textord, "∥", "\\|");
defineSymbol(math$1, main, textord, "∥", "\\Vert");
defineSymbol(text, main, textord, "∥", "\\textbardbl");
defineSymbol(text, main, textord, "~", "\\textasciitilde");
defineSymbol(text, main, textord, "\\", "\\textbackslash");
defineSymbol(text, main, textord, "^", "\\textasciicircum");
defineSymbol(math$1, main, rel, "↑", "\\uparrow", true);
defineSymbol(math$1, main, rel, "⇑", "\\Uparrow", true);
defineSymbol(math$1, main, rel, "↓", "\\downarrow", true);
defineSymbol(math$1, main, rel, "⇓", "\\Downarrow", true);
defineSymbol(math$1, main, rel, "↕", "\\updownarrow", true);
defineSymbol(math$1, main, rel, "⇕", "\\Updownarrow", true);
defineSymbol(math$1, main, op, "∐", "\\coprod");
defineSymbol(math$1, main, op, "⋁", "\\bigvee");
defineSymbol(math$1, main, op, "⋀", "\\bigwedge");
defineSymbol(math$1, main, op, "⨄", "\\biguplus");
defineSymbol(math$1, main, op, "⋂", "\\bigcap");
defineSymbol(math$1, main, op, "⋃", "\\bigcup");
defineSymbol(math$1, main, op, "∫", "\\int");
defineSymbol(math$1, main, op, "∫", "\\intop");
defineSymbol(math$1, main, op, "∬", "\\iint");
defineSymbol(math$1, main, op, "∭", "\\iiint");
defineSymbol(math$1, main, op, "∏", "\\prod");
defineSymbol(math$1, main, op, "∑", "\\sum");
defineSymbol(math$1, main, op, "⨂", "\\bigotimes");
defineSymbol(math$1, main, op, "⨁", "\\bigoplus");
defineSymbol(math$1, main, op, "⨀", "\\bigodot");
defineSymbol(math$1, main, op, "∮", "\\oint");
defineSymbol(math$1, main, op, "∯", "\\oiint");
defineSymbol(math$1, main, op, "∰", "\\oiiint");
defineSymbol(math$1, main, op, "⨆", "\\bigsqcup");
defineSymbol(math$1, main, op, "∫", "\\smallint");
defineSymbol(text, main, inner, "…", "\\textellipsis");
defineSymbol(math$1, main, inner, "…", "\\mathellipsis");
defineSymbol(text, main, inner, "…", "\\ldots", true);
defineSymbol(math$1, main, inner, "…", "\\ldots", true);
defineSymbol(math$1, main, inner, "⋯", "\\@cdots", true);
defineSymbol(math$1, main, inner, "⋱", "\\ddots", true);
defineSymbol(math$1, main, textord, "⋮", "\\varvdots");
defineSymbol(text, main, textord, "⋮", "\\varvdots");
defineSymbol(math$1, main, accent, "ˊ", "\\acute");
defineSymbol(math$1, main, accent, "ˋ", "\\grave");
defineSymbol(math$1, main, accent, "¨", "\\ddot");
defineSymbol(math$1, main, accent, "~", "\\tilde");
defineSymbol(math$1, main, accent, "ˉ", "\\bar");
defineSymbol(math$1, main, accent, "˘", "\\breve");
defineSymbol(math$1, main, accent, "ˇ", "\\check");
defineSymbol(math$1, main, accent, "^", "\\hat");
defineSymbol(math$1, main, accent, "⃗", "\\vec");
defineSymbol(math$1, main, accent, "˙", "\\dot");
defineSymbol(math$1, main, accent, "˚", "\\mathring");
defineSymbol(math$1, main, mathord, "", "\\@imath");
defineSymbol(math$1, main, mathord, "", "\\@jmath");
defineSymbol(math$1, main, textord, "ı", "ı");
defineSymbol(math$1, main, textord, "ȷ", "ȷ");
defineSymbol(text, main, textord, "ı", "\\i", true);
defineSymbol(text, main, textord, "ȷ", "\\j", true);
defineSymbol(text, main, textord, "ß", "\\ss", true);
defineSymbol(text, main, textord, "æ", "\\ae", true);
defineSymbol(text, main, textord, "œ", "\\oe", true);
defineSymbol(text, main, textord, "ø", "\\o", true);
defineSymbol(text, main, textord, "Æ", "\\AE", true);
defineSymbol(text, main, textord, "Œ", "\\OE", true);
defineSymbol(text, main, textord, "Ø", "\\O", true);
defineSymbol(text, main, accent, "ˊ", "\\'");
defineSymbol(text, main, accent, "ˋ", "\\`");
defineSymbol(text, main, accent, "ˆ", "\\^");
defineSymbol(text, main, accent, "˜", "\\~");
defineSymbol(text, main, accent, "ˉ", "\\=");
defineSymbol(text, main, accent, "˘", "\\u");
defineSymbol(text, main, accent, "˙", "\\.");
defineSymbol(text, main, accent, "¸", "\\c");
defineSymbol(text, main, accent, "˚", "\\r");
defineSymbol(text, main, accent, "ˇ", "\\v");
defineSymbol(text, main, accent, "¨", "\\\"");
defineSymbol(text, main, accent, "˝", "\\H");
defineSymbol(text, main, accent, "◯", "\\textcircled");
var ligatures = {
	"--": true,
	"---": true,
	"``": true,
	"''": true
};
defineSymbol(text, main, textord, "–", "--", true);
defineSymbol(text, main, textord, "–", "\\textendash");
defineSymbol(text, main, textord, "—", "---", true);
defineSymbol(text, main, textord, "—", "\\textemdash");
defineSymbol(text, main, textord, "‘", "`", true);
defineSymbol(text, main, textord, "‘", "\\textquoteleft");
defineSymbol(text, main, textord, "’", "'", true);
defineSymbol(text, main, textord, "’", "\\textquoteright");
defineSymbol(text, main, textord, "“", "``", true);
defineSymbol(text, main, textord, "“", "\\textquotedblleft");
defineSymbol(text, main, textord, "”", "''", true);
defineSymbol(text, main, textord, "”", "\\textquotedblright");
defineSymbol(math$1, main, textord, "°", "\\degree", true);
defineSymbol(text, main, textord, "°", "\\degree");
defineSymbol(text, main, textord, "°", "\\textdegree", true);
defineSymbol(math$1, main, textord, "£", "\\pounds");
defineSymbol(math$1, main, textord, "£", "\\mathsterling", true);
defineSymbol(text, main, textord, "£", "\\pounds");
defineSymbol(text, main, textord, "£", "\\textsterling", true);
defineSymbol(math$1, ams, textord, "✠", "\\maltese");
defineSymbol(text, ams, textord, "✠", "\\maltese");
var mathTextSymbols = "0123456789/@.\"";
for (var i = 0; i < mathTextSymbols.length; i++) {
	var ch = mathTextSymbols.charAt(i);
	defineSymbol(math$1, main, textord, ch, ch);
}
var textSymbols = "0123456789!@*()-=+\";:?/.,";
for (var _i = 0; _i < textSymbols.length; _i++) {
	var _ch = textSymbols.charAt(_i);
	defineSymbol(text, main, textord, _ch, _ch);
}
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var _i2 = 0; _i2 < letters.length; _i2++) {
	var _ch2 = letters.charAt(_i2);
	defineSymbol(math$1, main, mathord, _ch2, _ch2);
	defineSymbol(text, main, textord, _ch2, _ch2);
}
defineSymbol(math$1, ams, textord, "C", "ℂ");
defineSymbol(text, ams, textord, "C", "ℂ");
defineSymbol(math$1, ams, textord, "H", "ℍ");
defineSymbol(text, ams, textord, "H", "ℍ");
defineSymbol(math$1, ams, textord, "N", "ℕ");
defineSymbol(text, ams, textord, "N", "ℕ");
defineSymbol(math$1, ams, textord, "P", "ℙ");
defineSymbol(text, ams, textord, "P", "ℙ");
defineSymbol(math$1, ams, textord, "Q", "ℚ");
defineSymbol(text, ams, textord, "Q", "ℚ");
defineSymbol(math$1, ams, textord, "R", "ℝ");
defineSymbol(text, ams, textord, "R", "ℝ");
defineSymbol(math$1, ams, textord, "Z", "ℤ");
defineSymbol(text, ams, textord, "Z", "ℤ");
defineSymbol(math$1, main, mathord, "h", "ℎ");
defineSymbol(text, main, mathord, "h", "ℎ");
var wideChar = "";
for (var _i3 = 0; _i3 < letters.length; _i3++) {
	var _ch3 = letters.charAt(_i3);
	wideChar = String.fromCharCode(55349, 56320 + _i3);
	defineSymbol(math$1, main, mathord, _ch3, wideChar);
	defineSymbol(text, main, textord, _ch3, wideChar);
	wideChar = String.fromCharCode(55349, 56372 + _i3);
	defineSymbol(math$1, main, mathord, _ch3, wideChar);
	defineSymbol(text, main, textord, _ch3, wideChar);
	wideChar = String.fromCharCode(55349, 56424 + _i3);
	defineSymbol(math$1, main, mathord, _ch3, wideChar);
	defineSymbol(text, main, textord, _ch3, wideChar);
	wideChar = String.fromCharCode(55349, 56580 + _i3);
	defineSymbol(math$1, main, mathord, _ch3, wideChar);
	defineSymbol(text, main, textord, _ch3, wideChar);
	wideChar = String.fromCharCode(55349, 56684 + _i3);
	defineSymbol(math$1, main, mathord, _ch3, wideChar);
	defineSymbol(text, main, textord, _ch3, wideChar);
	wideChar = String.fromCharCode(55349, 56736 + _i3);
	defineSymbol(math$1, main, mathord, _ch3, wideChar);
	defineSymbol(text, main, textord, _ch3, wideChar);
	wideChar = String.fromCharCode(55349, 56788 + _i3);
	defineSymbol(math$1, main, mathord, _ch3, wideChar);
	defineSymbol(text, main, textord, _ch3, wideChar);
	wideChar = String.fromCharCode(55349, 56840 + _i3);
	defineSymbol(math$1, main, mathord, _ch3, wideChar);
	defineSymbol(text, main, textord, _ch3, wideChar);
	wideChar = String.fromCharCode(55349, 56944 + _i3);
	defineSymbol(math$1, main, mathord, _ch3, wideChar);
	defineSymbol(text, main, textord, _ch3, wideChar);
	if (_i3 < 26) {
		wideChar = String.fromCharCode(55349, 56632 + _i3);
		defineSymbol(math$1, main, mathord, _ch3, wideChar);
		defineSymbol(text, main, textord, _ch3, wideChar);
		wideChar = String.fromCharCode(55349, 56476 + _i3);
		defineSymbol(math$1, main, mathord, _ch3, wideChar);
		defineSymbol(text, main, textord, _ch3, wideChar);
	}
}
wideChar = String.fromCharCode(55349, 56668);
defineSymbol(math$1, main, mathord, "k", wideChar);
defineSymbol(text, main, textord, "k", wideChar);
for (var _i4 = 0; _i4 < 10; _i4++) {
	var _ch4 = _i4.toString();
	wideChar = String.fromCharCode(55349, 57294 + _i4);
	defineSymbol(math$1, main, mathord, _ch4, wideChar);
	defineSymbol(text, main, textord, _ch4, wideChar);
	wideChar = String.fromCharCode(55349, 57314 + _i4);
	defineSymbol(math$1, main, mathord, _ch4, wideChar);
	defineSymbol(text, main, textord, _ch4, wideChar);
	wideChar = String.fromCharCode(55349, 57324 + _i4);
	defineSymbol(math$1, main, mathord, _ch4, wideChar);
	defineSymbol(text, main, textord, _ch4, wideChar);
	wideChar = String.fromCharCode(55349, 57334 + _i4);
	defineSymbol(math$1, main, mathord, _ch4, wideChar);
	defineSymbol(text, main, textord, _ch4, wideChar);
}
var extraLatin = "ÐÞþ";
for (var _i5 = 0; _i5 < extraLatin.length; _i5++) {
	var _ch5 = extraLatin.charAt(_i5);
	defineSymbol(math$1, main, mathord, _ch5, _ch5);
	defineSymbol(text, main, textord, _ch5, _ch5);
}
/**
* This file provides support for Unicode range U+1D400 to U+1D7FF,
* Mathematical Alphanumeric Symbols.
*
* Function wideCharacterFont takes a wide character as input and returns
* the font information necessary to render it properly.
*/
/**
* Data below is from https://www.unicode.org/charts/PDF/U1D400.pdf
* That document sorts characters into groups by font type, say bold or italic.
*
* In the arrays below, each subarray consists three elements:
*      * The CSS class of that group when in math mode.
*      * The CSS class of that group when in text mode.
*      * The font name, so that KaTeX can get font metrics.
*/
var wideLatinLetterData = [
	[
		"mathbf",
		"textbf",
		"Main-Bold"
	],
	[
		"mathbf",
		"textbf",
		"Main-Bold"
	],
	[
		"mathnormal",
		"textit",
		"Math-Italic"
	],
	[
		"mathnormal",
		"textit",
		"Math-Italic"
	],
	[
		"boldsymbol",
		"boldsymbol",
		"Main-BoldItalic"
	],
	[
		"boldsymbol",
		"boldsymbol",
		"Main-BoldItalic"
	],
	[
		"mathscr",
		"textscr",
		"Script-Regular"
	],
	[
		"",
		"",
		""
	],
	[
		"",
		"",
		""
	],
	[
		"",
		"",
		""
	],
	[
		"mathfrak",
		"textfrak",
		"Fraktur-Regular"
	],
	[
		"mathfrak",
		"textfrak",
		"Fraktur-Regular"
	],
	[
		"mathbb",
		"textbb",
		"AMS-Regular"
	],
	[
		"mathbb",
		"textbb",
		"AMS-Regular"
	],
	[
		"mathboldfrak",
		"textboldfrak",
		"Fraktur-Regular"
	],
	[
		"mathboldfrak",
		"textboldfrak",
		"Fraktur-Regular"
	],
	[
		"mathsf",
		"textsf",
		"SansSerif-Regular"
	],
	[
		"mathsf",
		"textsf",
		"SansSerif-Regular"
	],
	[
		"mathboldsf",
		"textboldsf",
		"SansSerif-Bold"
	],
	[
		"mathboldsf",
		"textboldsf",
		"SansSerif-Bold"
	],
	[
		"mathitsf",
		"textitsf",
		"SansSerif-Italic"
	],
	[
		"mathitsf",
		"textitsf",
		"SansSerif-Italic"
	],
	[
		"",
		"",
		""
	],
	[
		"",
		"",
		""
	],
	[
		"mathtt",
		"texttt",
		"Typewriter-Regular"
	],
	[
		"mathtt",
		"texttt",
		"Typewriter-Regular"
	]
];
var wideNumeralData = [
	[
		"mathbf",
		"textbf",
		"Main-Bold"
	],
	[
		"",
		"",
		""
	],
	[
		"mathsf",
		"textsf",
		"SansSerif-Regular"
	],
	[
		"mathboldsf",
		"textboldsf",
		"SansSerif-Bold"
	],
	[
		"mathtt",
		"texttt",
		"Typewriter-Regular"
	]
];
var wideCharacterFont = (wideChar, mode) => {
	var H = wideChar.charCodeAt(0);
	var L = wideChar.charCodeAt(1);
	var codePoint = (H - 55296) * 1024 + (L - 56320) + 65536;
	var j = mode === "math" ? 0 : 1;
	if (119808 <= codePoint && codePoint < 120484) {
		var i = Math.floor((codePoint - 119808) / 26);
		return [wideLatinLetterData[i][2], wideLatinLetterData[i][j]];
	} else if (120782 <= codePoint && codePoint <= 120831) {
		var _i = Math.floor((codePoint - 120782) / 10);
		return [wideNumeralData[_i][2], wideNumeralData[_i][j]];
	} else if (codePoint === 120485 || codePoint === 120486) return [wideLatinLetterData[0][2], wideLatinLetterData[0][j]];
	else if (120486 < codePoint && codePoint < 120782) return ["", ""];
	else throw new ParseError("Unsupported character: " + wideChar);
};
/**
* This node represents a document fragment, which contains elements, but when
* placed into the DOM doesn't have any representation itself. It only contains
* children and doesn't have any DOM node properties.
*/
var DocumentFragment = class {
	constructor(children) {
		this.children = children;
		this.classes = [];
		this.height = 0;
		this.depth = 0;
		this.maxFontSize = 0;
		this.style = {};
	}
	hasClass(className) {
		return this.classes.includes(className);
	}
	/** Convert the fragment into a node. */
	toNode() {
		var frag = document.createDocumentFragment();
		for (var i = 0; i < this.children.length; i++) frag.appendChild(this.children[i].toNode());
		return frag;
	}
	/** Convert the fragment into HTML markup. */
	toMarkup() {
		var markup = "";
		for (var i = 0; i < this.children.length; i++) markup += this.children[i].toMarkup();
		return markup;
	}
	/**
	* Converts the math node into a string, similar to innerText. Applies to
	* MathDomNode's only.
	*/
	toText() {
		var toText = (child) => child.toText();
		return this.children.map(toText).join("");
	}
};
/**
* Looks up the given symbol in fontMetrics, after applying any symbol
* replacements defined in symbol.js
*/
var lookupSymbol = function lookupSymbol(value, fontName, mode) {
	if (symbols[mode][value]) {
		var replacement = symbols[mode][value].replace;
		if (replacement) value = replacement;
	}
	return {
		value,
		metrics: getCharacterMetrics(value, fontName, mode)
	};
};
/**
* Makes a symbolNode after translation via the list of symbols in symbols.js.
* Correctly pulls out metrics for the character, and optionally takes a list of
* classes to be attached to the node.
*
* TODO: make argument order closer to makeSpan
* TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
* should if present come first in `classes`.
* TODO(#953): Make `options` mandatory and always pass it in.
*/
var makeSymbol = function makeSymbol(value, fontName, mode, options, classes) {
	var lookup = lookupSymbol(value, fontName, mode);
	var metrics = lookup.metrics;
	value = lookup.value;
	var symbolNode;
	if (metrics) {
		var italic = metrics.italic;
		if (mode === "text" || options && options.font === "mathit") italic = 0;
		symbolNode = new SymbolNode(value, metrics.height, metrics.depth, italic, metrics.skew, metrics.width, classes);
	} else {
		typeof console !== "undefined" && console.warn("No character metrics " + ("for '" + value + "' in style '" + fontName + "' and mode '" + mode + "'"));
		symbolNode = new SymbolNode(value, 0, 0, 0, 0, 0, classes);
	}
	if (options) {
		symbolNode.maxFontSize = options.sizeMultiplier;
		if (options.style.isTight()) symbolNode.classes.push("mtight");
		var color = options.getColor();
		if (color) symbolNode.style.color = color;
	}
	return symbolNode;
};
/**
* Makes a symbol in Main-Regular or AMS-Regular.
* Used for rel, bin, open, close, inner, and punct.
*/
var mathsym = function mathsym(value, mode, options, classes) {
	if (classes === void 0) classes = [];
	if (options.font === "boldsymbol" && lookupSymbol(value, "Main-Bold", mode).metrics) return makeSymbol(value, "Main-Bold", mode, options, classes.concat(["mathbf"]));
	else if (value === "\\" || symbols[mode][value].font === "main") return makeSymbol(value, "Main-Regular", mode, options, classes);
	else return makeSymbol(value, "AMS-Regular", mode, options, classes.concat(["amsrm"]));
};
/**
* Determines which of the two font names (Main-Bold and Math-BoldItalic) and
* corresponding style tags (mathbf or boldsymbol) to use for font "boldsymbol",
* depending on the symbol.  Use this function instead of fontMap for font
* "boldsymbol".
*/
var boldsymbol = function boldsymbol(value, mode, options, classes, type) {
	if (type !== "textord" && lookupSymbol(value, "Math-BoldItalic", mode).metrics) return {
		fontName: "Math-BoldItalic",
		fontClass: "boldsymbol"
	};
	else return {
		fontName: "Main-Bold",
		fontClass: "mathbf"
	};
};
/**
* Makes either a mathord or textord in the correct font and color.
*/
var makeOrd = function makeOrd(group, options, type) {
	var mode = group.mode;
	var text = group.text;
	var classes = ["mord"];
	var isFont = mode === "math" || mode === "text" && options.font;
	var fontOrFamily = isFont ? options.font : options.fontFamily;
	var wideFontName = "";
	var wideFontClass = "";
	if (text.charCodeAt(0) === 55349) [wideFontName, wideFontClass] = wideCharacterFont(text, mode);
	if (wideFontName.length > 0) return makeSymbol(text, wideFontName, mode, options, classes.concat(wideFontClass));
	else if (fontOrFamily) {
		var fontName;
		var fontClasses;
		if (fontOrFamily === "boldsymbol") {
			var fontData = boldsymbol(text, mode, options, classes, type);
			fontName = fontData.fontName;
			fontClasses = [fontData.fontClass];
		} else if (isFont) {
			fontName = fontMap[fontOrFamily].fontName;
			fontClasses = [fontOrFamily];
		} else {
			fontName = retrieveTextFontName(fontOrFamily, options.fontWeight, options.fontShape);
			fontClasses = [
				fontOrFamily,
				options.fontWeight,
				options.fontShape
			];
		}
		if (lookupSymbol(text, fontName, mode).metrics) return makeSymbol(text, fontName, mode, options, classes.concat(fontClasses));
		else if (ligatures.hasOwnProperty(text) && fontName.slice(0, 10) === "Typewriter") {
			var parts = [];
			for (var i = 0; i < text.length; i++) parts.push(makeSymbol(text[i], fontName, mode, options, classes.concat(fontClasses)));
			return makeFragment(parts);
		}
	}
	if (type === "mathord") return makeSymbol(text, "Math-Italic", mode, options, classes.concat(["mathnormal"]));
	else if (type === "textord") {
		var font = symbols[mode][text] && symbols[mode][text].font;
		if (font === "ams") return makeSymbol(text, retrieveTextFontName("amsrm", options.fontWeight, options.fontShape), mode, options, classes.concat("amsrm", options.fontWeight, options.fontShape));
		else if (font === "main" || !font) return makeSymbol(text, retrieveTextFontName("textrm", options.fontWeight, options.fontShape), mode, options, classes.concat(options.fontWeight, options.fontShape));
		else {
			var _fontName3 = retrieveTextFontName(font, options.fontWeight, options.fontShape);
			return makeSymbol(text, _fontName3, mode, options, classes.concat(_fontName3, options.fontWeight, options.fontShape));
		}
	} else throw new Error("unexpected type: " + type + " in makeOrd");
};
/**
* Returns true if subsequent symbolNodes have the same classes, skew, maxFont,
* and styles. For mathnormal text, the left node must also have zero italic
* correction so we don't lose spacing between combined glyphs.
*/
var canCombine = (prev, next) => {
	if (createClass(prev.classes) !== createClass(next.classes) || prev.skew !== next.skew || prev.maxFontSize !== next.maxFontSize || prev.italic !== 0 && prev.hasClass("mathnormal")) return false;
	if (prev.classes.length === 1) {
		var cls = prev.classes[0];
		if (cls === "mbin" || cls === "mord") return false;
	}
	for (var key of Object.keys(prev.style)) if (prev.style[key] !== next.style[key]) return false;
	for (var _key of Object.keys(next.style)) if (prev.style[_key] !== next.style[_key]) return false;
	return true;
};
/**
* Combine consecutive domTree.symbolNodes into a single symbolNode.
* Note: this function mutates the argument.
*/
var tryCombineChars = (chars) => {
	for (var i = 0; i < chars.length - 1; i++) {
		var prev = chars[i];
		var next = chars[i + 1];
		if (prev instanceof SymbolNode && next instanceof SymbolNode && canCombine(prev, next)) {
			prev.text += next.text;
			prev.height = Math.max(prev.height, next.height);
			prev.depth = Math.max(prev.depth, next.depth);
			prev.italic = next.italic;
			chars.splice(i + 1, 1);
			i--;
		}
	}
	return chars;
};
/**
* Calculate the height, depth, and maxFontSize of an element based on its
* children.
*/
var sizeElementFromChildren = function sizeElementFromChildren(elem) {
	var height = 0;
	var depth = 0;
	var maxFontSize = 0;
	for (var i = 0; i < elem.children.length; i++) {
		var child = elem.children[i];
		if (child.height > height) height = child.height;
		if (child.depth > depth) depth = child.depth;
		if (child.maxFontSize > maxFontSize) maxFontSize = child.maxFontSize;
	}
	elem.height = height;
	elem.depth = depth;
	elem.maxFontSize = maxFontSize;
};
/**
* Makes a span with the given list of classes, list of children, and options.
*
* TODO(#953): Ensure that `options` is always provided (currently some call
* sites don't pass it) and make the type below mandatory.
* TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
* should if present come first in `classes`.
*/
var makeSpan = function makeSpan(classes, children, options, style) {
	var span = new Span(classes, children, options, style);
	sizeElementFromChildren(span);
	return span;
};
var makeSvgSpan = (classes, children, options, style) => new Span(classes, children, options, style);
var makeLineSpan = function makeLineSpan(className, options, thickness) {
	var line = makeSpan([className], [], options);
	line.height = Math.max(thickness || options.fontMetrics().defaultRuleThickness, options.minRuleThickness);
	line.style.borderBottomWidth = makeEm(line.height);
	line.maxFontSize = 1;
	return line;
};
/**
* Makes an anchor with the given href, list of classes, list of children,
* and options.
*/
var makeAnchor = function makeAnchor(href, classes, children, options) {
	var anchor = new Anchor(href, classes, children, options);
	sizeElementFromChildren(anchor);
	return anchor;
};
/**
* Makes a document fragment with the given list of children.
*/
var makeFragment = function makeFragment(children) {
	var fragment = new DocumentFragment(children);
	sizeElementFromChildren(fragment);
	return fragment;
};
/**
* Wraps group in a span if it's a document fragment, allowing to apply classes
* and styles
*/
var wrapFragment = function wrapFragment(group, options) {
	if (group instanceof DocumentFragment) return makeSpan([], [group], options);
	return group;
};
var getVListChildrenAndDepth = function getVListChildrenAndDepth(params) {
	if (params.positionType === "individualShift") {
		var oldChildren = params.children;
		var children = [oldChildren[0]];
		var _depth = -oldChildren[0].shift - oldChildren[0].elem.depth;
		var currPos = _depth;
		for (var i = 1; i < oldChildren.length; i++) {
			var diff = -oldChildren[i].shift - currPos - oldChildren[i].elem.depth;
			var size = diff - (oldChildren[i - 1].elem.height + oldChildren[i - 1].elem.depth);
			currPos = currPos + diff;
			children.push({
				type: "kern",
				size
			});
			children.push(oldChildren[i]);
		}
		return {
			children,
			depth: _depth
		};
	}
	var depth;
	if (params.positionType === "top") {
		var bottom = params.positionData;
		for (var _i = 0; _i < params.children.length; _i++) {
			var child = params.children[_i];
			bottom -= child.type === "kern" ? child.size : child.elem.height + child.elem.depth;
		}
		depth = bottom;
	} else if (params.positionType === "bottom") depth = -params.positionData;
	else {
		var firstChild = params.children[0];
		if (firstChild.type !== "elem") throw new Error("First child must have type \"elem\".");
		if (params.positionType === "shift") depth = -firstChild.elem.depth - params.positionData;
		else if (params.positionType === "firstBaseline") depth = -firstChild.elem.depth;
		else throw new Error("Invalid positionType " + params.positionType + ".");
	}
	return {
		children: params.children,
		depth
	};
};
/**
* Makes a vertical list by stacking elements and kerns on top of each other.
* Allows for many different ways of specifying the positioning method.
*
* See VListParam documentation above.
*/
var makeVList = function makeVList(params, options) {
	var { children, depth } = getVListChildrenAndDepth(params);
	var pstrutSize = 0;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.type === "elem") {
			var elem = child.elem;
			pstrutSize = Math.max(pstrutSize, elem.maxFontSize, elem.height);
		}
	}
	pstrutSize += 2;
	var pstrut = makeSpan(["pstrut"], []);
	pstrut.style.height = makeEm(pstrutSize);
	var realChildren = [];
	var minPos = depth;
	var maxPos = depth;
	var currPos = depth;
	for (var _i2 = 0; _i2 < children.length; _i2++) {
		var _child = children[_i2];
		if (_child.type === "kern") currPos += _child.size;
		else {
			var _elem = _child.elem;
			var classes = _child.wrapperClasses || [];
			var style = _child.wrapperStyle || {};
			var childWrap = makeSpan(classes, [pstrut, _elem], void 0, style);
			childWrap.style.top = makeEm(-pstrutSize - currPos - _elem.depth);
			if (_child.marginLeft) childWrap.style.marginLeft = _child.marginLeft;
			if (_child.marginRight) childWrap.style.marginRight = _child.marginRight;
			realChildren.push(childWrap);
			currPos += _elem.height + _elem.depth;
		}
		minPos = Math.min(minPos, currPos);
		maxPos = Math.max(maxPos, currPos);
	}
	var vlist = makeSpan(["vlist"], realChildren);
	vlist.style.height = makeEm(maxPos);
	var rows;
	if (minPos < 0) {
		var depthStrut = makeSpan(["vlist"], [makeSpan([], [])]);
		depthStrut.style.height = makeEm(-minPos);
		rows = [makeSpan(["vlist-r"], [vlist, makeSpan(["vlist-s"], [new SymbolNode("​")])]), makeSpan(["vlist-r"], [depthStrut])];
	} else rows = [makeSpan(["vlist-r"], [vlist])];
	var vtable = makeSpan(["vlist-t"], rows);
	if (rows.length === 2) vtable.classes.push("vlist-t2");
	vtable.height = maxPos;
	vtable.depth = -minPos;
	return vtable;
};
var makeGlue = (measurement, options) => {
	var rule = makeSpan(["mspace"], [], options);
	var size = calculateSize(measurement, options);
	rule.style.marginRight = makeEm(size);
	return rule;
};
var retrieveTextFontName = function retrieveTextFontName(fontFamily, fontWeight, fontShape) {
	var baseFontName = "";
	switch (fontFamily) {
		case "amsrm":
			baseFontName = "AMS";
			break;
		case "textrm":
			baseFontName = "Main";
			break;
		case "textsf":
			baseFontName = "SansSerif";
			break;
		case "texttt":
			baseFontName = "Typewriter";
			break;
		default: baseFontName = fontFamily;
	}
	var fontStylesName;
	if (fontWeight === "textbf" && fontShape === "textit") fontStylesName = "BoldItalic";
	else if (fontWeight === "textbf") fontStylesName = "Bold";
	else if (fontWeight === "textit") fontStylesName = "Italic";
	else fontStylesName = "Regular";
	return baseFontName + "-" + fontStylesName;
};
/**
* Maps TeX font commands to objects containing:
* - variant: string used for "mathvariant" attribute in buildMathML.js
* - fontName: the "style" parameter to fontMetrics.getCharacterMetrics
*/
var fontMap = {
	"mathbf": {
		variant: "bold",
		fontName: "Main-Bold"
	},
	"mathrm": {
		variant: "normal",
		fontName: "Main-Regular"
	},
	"textit": {
		variant: "italic",
		fontName: "Main-Italic"
	},
	"mathit": {
		variant: "italic",
		fontName: "Main-Italic"
	},
	"mathnormal": {
		variant: "italic",
		fontName: "Math-Italic"
	},
	"mathsfit": {
		variant: "sans-serif-italic",
		fontName: "SansSerif-Italic"
	},
	"mathbb": {
		variant: "double-struck",
		fontName: "AMS-Regular"
	},
	"mathcal": {
		variant: "script",
		fontName: "Caligraphic-Regular"
	},
	"mathfrak": {
		variant: "fraktur",
		fontName: "Fraktur-Regular"
	},
	"mathscr": {
		variant: "script",
		fontName: "Script-Regular"
	},
	"mathsf": {
		variant: "sans-serif",
		fontName: "SansSerif-Regular"
	},
	"mathtt": {
		variant: "monospace",
		fontName: "Typewriter-Regular"
	}
};
var svgData = {
	vec: [
		"vec",
		.471,
		.714
	],
	oiintSize1: [
		"oiintSize1",
		.957,
		.499
	],
	oiintSize2: [
		"oiintSize2",
		1.472,
		.659
	],
	oiiintSize1: [
		"oiiintSize1",
		1.304,
		.499
	],
	oiiintSize2: [
		"oiiintSize2",
		1.98,
		.659
	]
};
var staticSvg = function staticSvg(value, options) {
	var [pathName, width, height] = svgData[value];
	var span = makeSvgSpan(["overlay"], [new SvgNode([new PathNode(pathName)], {
		"width": makeEm(width),
		"height": makeEm(height),
		"style": "width:" + makeEm(width),
		"viewBox": "0 0 " + 1e3 * width + " " + 1e3 * height,
		"preserveAspectRatio": "xMinYMin"
	})], options);
	span.height = height;
	span.style.height = makeEm(height);
	span.style.width = makeEm(width);
	return span;
};
var thinspace = {
	number: 3,
	unit: "mu"
};
var mediumspace = {
	number: 4,
	unit: "mu"
};
var thickspace = {
	number: 5,
	unit: "mu"
};
var spacings = {
	mord: {
		mop: thinspace,
		mbin: mediumspace,
		mrel: thickspace,
		minner: thinspace
	},
	mop: {
		mord: thinspace,
		mop: thinspace,
		mrel: thickspace,
		minner: thinspace
	},
	mbin: {
		mord: mediumspace,
		mop: mediumspace,
		mopen: mediumspace,
		minner: mediumspace
	},
	mrel: {
		mord: thickspace,
		mop: thickspace,
		mopen: thickspace,
		minner: thickspace
	},
	mopen: {},
	mclose: {
		mop: thinspace,
		mbin: mediumspace,
		mrel: thickspace,
		minner: thinspace
	},
	mpunct: {
		mord: thinspace,
		mop: thinspace,
		mrel: thickspace,
		mopen: thinspace,
		mclose: thinspace,
		mpunct: thinspace,
		minner: thinspace
	},
	minner: {
		mord: thinspace,
		mop: thinspace,
		mbin: mediumspace,
		mrel: thickspace,
		mopen: thinspace,
		mpunct: thinspace,
		minner: thinspace
	}
};
var tightSpacings = {
	mord: { mop: thinspace },
	mop: {
		mord: thinspace,
		mop: thinspace
	},
	mbin: {},
	mrel: {},
	mopen: {},
	mclose: { mop: thinspace },
	mpunct: {},
	minner: { mop: thinspace }
};
/**
* All registered functions.
* `functions.js` just exports this same dictionary again and makes it public.
* `Parser.js` requires this dictionary.
*/
var _functions = {};
/**
* All HTML builders. Should be only used in the `define*` and the `build*ML`
* functions.
*/
var _htmlGroupBuilders = {};
/**
* All MathML builders. Should be only used in the `define*` and the `build*ML`
* functions.
*/
var _mathmlGroupBuilders = {};
function defineFunction(_ref) {
	var { type, names, props, handler, htmlBuilder, mathmlBuilder } = _ref;
	var data = {
		type,
		numArgs: props.numArgs,
		argTypes: props.argTypes,
		allowedInArgument: !!props.allowedInArgument,
		allowedInText: !!props.allowedInText,
		allowedInMath: props.allowedInMath === void 0 ? true : props.allowedInMath,
		numOptionalArgs: props.numOptionalArgs || 0,
		infix: !!props.infix,
		primitive: !!props.primitive,
		handler
	};
	for (var i = 0; i < names.length; ++i) _functions[names[i]] = data;
	if (type) {
		if (htmlBuilder) _htmlGroupBuilders[type] = htmlBuilder;
		if (mathmlBuilder) _mathmlGroupBuilders[type] = mathmlBuilder;
	}
}
/**
* Use this to register only the HTML and MathML builders for a function (e.g.
* if the function's ParseNode is generated in Parser.js rather than via a
* stand-alone handler provided to `defineFunction`).
*/
function defineFunctionBuilders(_ref2) {
	var { type, htmlBuilder, mathmlBuilder } = _ref2;
	defineFunction({
		type,
		names: [],
		props: { numArgs: 0 },
		handler() {
			throw new Error("Should never be called.");
		},
		htmlBuilder,
		mathmlBuilder
	});
}
var normalizeArgument = function normalizeArgument(arg) {
	return arg.type === "ordgroup" && arg.body.length === 1 ? arg.body[0] : arg;
};
var ordargument = function ordargument(arg) {
	return arg.type === "ordgroup" ? arg.body : [arg];
};
/**
* This file does the main work of building a domTree structure from a parse
* tree. The entry point is the `buildHTML` function, which takes a parse tree.
* Then, the buildExpression, buildGroup, and various groupBuilders functions
* are called, to produce a final HTML tree.
*/
var binLeftCanceller = new Set([
	"leftmost",
	"mbin",
	"mopen",
	"mrel",
	"mop",
	"mpunct"
]);
var binRightCanceller = new Set([
	"rightmost",
	"mrel",
	"mclose",
	"mpunct"
]);
var styleMap$1 = {
	"display": Style$1.DISPLAY,
	"text": Style$1.TEXT,
	"script": Style$1.SCRIPT,
	"scriptscript": Style$1.SCRIPTSCRIPT
};
var DomEnum = {
	mord: "mord",
	mop: "mop",
	mbin: "mbin",
	mrel: "mrel",
	mopen: "mopen",
	mclose: "mclose",
	mpunct: "mpunct",
	minner: "minner"
};
/**
* Take a list of nodes, build them in order, and return a list of the built
* nodes. documentFragments are flattened into their contents, so the
* returned list contains no fragments. `isRealGroup` is true if `expression`
* is a real group (no atoms will be added on either side), as opposed to
* a partial group (e.g. one created by \color). `surrounding` is an array
* consisting type of nodes that will be added to the left and right.
*/
var buildExpression$1 = function buildExpression(expression, options, isRealGroup, surrounding) {
	if (surrounding === void 0) surrounding = [null, null];
	var groups = [];
	for (var i = 0; i < expression.length; i++) {
		var output = buildGroup$1(expression[i], options);
		if (output instanceof DocumentFragment) {
			var children = output.children;
			groups.push(...children);
		} else groups.push(output);
	}
	tryCombineChars(groups);
	if (!isRealGroup) return groups;
	var glueOptions = options;
	if (expression.length === 1) {
		var node = expression[0];
		if (node.type === "sizing") glueOptions = options.havingSize(node.size);
		else if (node.type === "styling") glueOptions = options.havingStyle(styleMap$1[node.style]);
	}
	var dummyPrev = makeSpan([surrounding[0] || "leftmost"], [], options);
	var dummyNext = makeSpan([surrounding[1] || "rightmost"], [], options);
	var isRoot = isRealGroup === "root";
	_traverseNonSpaceNodes(groups, (node, prev) => {
		var prevType = prev.classes[0];
		var type = node.classes[0];
		if (prevType === "mbin" && binRightCanceller.has(type)) prev.classes[0] = "mord";
		else if (type === "mbin" && binLeftCanceller.has(prevType)) node.classes[0] = "mord";
	}, { node: dummyPrev }, dummyNext, isRoot);
	_traverseNonSpaceNodes(groups, (node, prev) => {
		var _tightSpacings$prevTy, _spacings$prevType;
		var prevType = getTypeOfDomTree(prev);
		var type = getTypeOfDomTree(node);
		var space = prevType && type ? node.hasClass("mtight") ? (_tightSpacings$prevTy = tightSpacings[prevType]) == null ? void 0 : _tightSpacings$prevTy[type] : (_spacings$prevType = spacings[prevType]) == null ? void 0 : _spacings$prevType[type] : null;
		if (space) return makeGlue(space, glueOptions);
	}, { node: dummyPrev }, dummyNext, isRoot);
	return groups;
};
var _traverseNonSpaceNodes = function traverseNonSpaceNodes(nodes, callback, prev, next, isRoot) {
	if (next) nodes.push(next);
	var i = 0;
	for (; i < nodes.length; i++) {
		var node = nodes[i];
		var partialGroup = checkPartialGroup(node);
		if (partialGroup) {
			_traverseNonSpaceNodes(partialGroup.children, callback, prev, null, isRoot);
			continue;
		}
		var nonspace = !node.hasClass("mspace");
		if (nonspace) {
			var result = callback(node, prev.node);
			if (result) if (prev.insertAfter) prev.insertAfter(result);
			else {
				nodes.unshift(result);
				i++;
			}
		}
		if (nonspace) prev.node = node;
		else if (isRoot && node.hasClass("newline")) prev.node = makeSpan(["leftmost"]);
		prev.insertAfter = ((index) => (n) => {
			nodes.splice(index + 1, 0, n);
			i++;
		})(i);
	}
	if (next) nodes.pop();
};
var checkPartialGroup = function checkPartialGroup(node) {
	if (node instanceof DocumentFragment || node instanceof Anchor || node instanceof Span && node.hasClass("enclosing")) return node;
	return null;
};
var _getOutermostNode = function getOutermostNode(node, side) {
	var partialGroup = checkPartialGroup(node);
	if (partialGroup) {
		var children = partialGroup.children;
		if (children.length) {
			if (side === "right") return _getOutermostNode(children[children.length - 1], "right");
			else if (side === "left") return _getOutermostNode(children[0], "left");
		}
	}
	return node;
};
var getTypeOfDomTree = function getTypeOfDomTree(node, side) {
	if (!node) return null;
	if (side) node = _getOutermostNode(node, side);
	return DomEnum[node.classes[0]] || null;
};
var makeNullDelimiter = function makeNullDelimiter(options, classes) {
	var moreClasses = ["nulldelimiter"].concat(options.baseSizingClasses());
	return makeSpan(classes.concat(moreClasses));
};
/**
* buildGroup is the function that takes a group and calls the correct groupType
* function for it. It also handles the interaction of size and style changes
* between parents and children.
*/
var buildGroup$1 = function buildGroup(group, options, baseOptions) {
	if (!group) return makeSpan();
	if (_htmlGroupBuilders[group.type]) {
		var groupNode = _htmlGroupBuilders[group.type](group, options);
		if (baseOptions && options.size !== baseOptions.size) {
			groupNode = makeSpan(options.sizingClasses(baseOptions), [groupNode], options);
			var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;
			groupNode.height *= multiplier;
			groupNode.depth *= multiplier;
		}
		return groupNode;
	} else throw new ParseError("Got group of unknown type: '" + group.type + "'");
};
/**
* Combine an array of HTML DOM nodes (e.g., the output of `buildExpression`)
* into an unbreakable HTML node of class .base, with proper struts to
* guarantee correct vertical extent.  `buildHTML` calls this repeatedly to
* make up the entire expression as a sequence of unbreakable units.
*/
function buildHTMLUnbreakable(children, options) {
	var body = makeSpan(["base"], children, options);
	var strut = makeSpan(["strut"]);
	strut.style.height = makeEm(body.height + body.depth);
	if (body.depth) strut.style.verticalAlign = makeEm(-body.depth);
	body.children.unshift(strut);
	return body;
}
/**
* Take an entire parse tree, and build it into an appropriate set of HTML
* nodes.
*/
function buildHTML(tree, options) {
	var tag = null;
	if (tree.length === 1 && tree[0].type === "tag") {
		tag = tree[0].tag;
		tree = tree[0].body;
	}
	var expression = buildExpression$1(tree, options, "root");
	var eqnNum;
	if (expression.length === 2 && expression[1].hasClass("tag")) eqnNum = expression.pop();
	var children = [];
	var parts = [];
	for (var i = 0; i < expression.length; i++) {
		parts.push(expression[i]);
		if (expression[i].hasClass("mbin") || expression[i].hasClass("mrel") || expression[i].hasClass("allowbreak")) {
			var nobreak = false;
			while (i < expression.length - 1 && expression[i + 1].hasClass("mspace") && !expression[i + 1].hasClass("newline")) {
				i++;
				parts.push(expression[i]);
				if (expression[i].hasClass("nobreak")) nobreak = true;
			}
			if (!nobreak) {
				children.push(buildHTMLUnbreakable(parts, options));
				parts = [];
			}
		} else if (expression[i].hasClass("newline")) {
			parts.pop();
			if (parts.length > 0) {
				children.push(buildHTMLUnbreakable(parts, options));
				parts = [];
			}
			children.push(expression[i]);
		}
	}
	if (parts.length > 0) children.push(buildHTMLUnbreakable(parts, options));
	var tagChild;
	if (tag) {
		tagChild = buildHTMLUnbreakable(buildExpression$1(tag, options, true), options);
		tagChild.classes = ["tag"];
		children.push(tagChild);
	} else if (eqnNum) children.push(eqnNum);
	var htmlNode = makeSpan(["katex-html"], children);
	htmlNode.setAttribute("aria-hidden", "true");
	if (tagChild) {
		var strut = tagChild.children[0];
		strut.style.height = makeEm(htmlNode.height + htmlNode.depth);
		if (htmlNode.depth) strut.style.verticalAlign = makeEm(-htmlNode.depth);
	}
	return htmlNode;
}
/**
* These objects store data about MathML nodes. This is the MathML equivalent
* of the types in domTree.js. Since MathML handles its own rendering, and
* since we're mainly using MathML to improve accessibility, we don't manage
* any of the styling state that the plain DOM nodes do.
*
* The `toNode` and `toMarkup` functions work similarly to how they do in
* domTree.js, creating namespaced DOM nodes and HTML text markup respectively.
*/
function newDocumentFragment(children) {
	return new DocumentFragment(children);
}
/**
* This node represents a general purpose MathML node of any type. The
* constructor requires the type of node to create (for example, `"mo"` or
* `"mspace"`, corresponding to `<mo>` and `<mspace>` tags).
*/
var MathNode = class {
	constructor(type, children, classes) {
		this.type = type;
		this.attributes = {};
		this.children = children || [];
		this.classes = classes || [];
	}
	/**
	* Sets an attribute on a MathML node. MathML depends on attributes to convey a
	* semantic content, so this is used heavily.
	*/
	setAttribute(name, value) {
		this.attributes[name] = value;
	}
	/**
	* Gets an attribute on a MathML node.
	*/
	getAttribute(name) {
		return this.attributes[name];
	}
	/**
	* Converts the math node into a MathML-namespaced DOM element.
	*/
	toNode() {
		var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
		for (var attr in this.attributes) if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) node.setAttribute(attr, this.attributes[attr]);
		if (this.classes.length > 0) node.className = createClass(this.classes);
		for (var i = 0; i < this.children.length; i++) if (this.children[i] instanceof TextNode && this.children[i + 1] instanceof TextNode) {
			var text = this.children[i].toText() + this.children[++i].toText();
			while (this.children[i + 1] instanceof TextNode) text += this.children[++i].toText();
			node.appendChild(new TextNode(text).toNode());
		} else node.appendChild(this.children[i].toNode());
		return node;
	}
	/**
	* Converts the math node into an HTML markup string.
	*/
	toMarkup() {
		var markup = "<" + this.type;
		for (var attr in this.attributes) if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
			markup += " " + attr + "=\"";
			markup += escape(this.attributes[attr]);
			markup += "\"";
		}
		if (this.classes.length > 0) markup += " class =\"" + escape(createClass(this.classes)) + "\"";
		markup += ">";
		for (var i = 0; i < this.children.length; i++) markup += this.children[i].toMarkup();
		markup += "</" + this.type + ">";
		return markup;
	}
	/**
	* Converts the math node into a string, similar to innerText, but escaped.
	*/
	toText() {
		return this.children.map((child) => child.toText()).join("");
	}
};
/**
* This node represents a piece of text.
*/
var TextNode = class {
	constructor(text) {
		this.text = text;
	}
	/**
	* Converts the text node into a DOM text node.
	*/
	toNode() {
		return document.createTextNode(this.text);
	}
	/**
	* Converts the text node into escaped HTML markup
	* (representing the text itself).
	*/
	toMarkup() {
		return escape(this.toText());
	}
	/**
	* Converts the text node into a string
	* (representing the text itself).
	*/
	toText() {
		return this.text;
	}
};
/**
* This node represents a space, but may render as <mspace.../> or as text,
* depending on the width.
*/
var SpaceNode = class {
	/**
	* Create a Space node with width given in CSS ems.
	*/
	constructor(width) {
		this.width = width;
		if (width >= .05555 && width <= .05556) this.character = " ";
		else if (width >= .1666 && width <= .1667) this.character = " ";
		else if (width >= .2222 && width <= .2223) this.character = " ";
		else if (width >= .2777 && width <= .2778) this.character = "  ";
		else if (width >= -.05556 && width <= -.05555) this.character = " ⁣";
		else if (width >= -.1667 && width <= -.1666) this.character = " ⁣";
		else if (width >= -.2223 && width <= -.2222) this.character = " ⁣";
		else if (width >= -.2778 && width <= -.2777) this.character = " ⁣";
		else this.character = null;
	}
	/**
	* Converts the math node into a MathML-namespaced DOM element.
	*/
	toNode() {
		if (this.character) return document.createTextNode(this.character);
		else {
			var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
			node.setAttribute("width", makeEm(this.width));
			return node;
		}
	}
	/**
	* Converts the math node into an HTML markup string.
	*/
	toMarkup() {
		if (this.character) return "<mtext>" + this.character + "</mtext>";
		else return "<mspace width=\"" + makeEm(this.width) + "\"/>";
	}
	/**
	* Converts the math node into a string, similar to innerText.
	*/
	toText() {
		if (this.character) return this.character;
		else return " ";
	}
};
/**
* This file converts a parse tree into a corresponding MathML tree. The main
* entry point is the `buildMathML` function, which takes a parse tree from the
* parser.
*/
var noVariantSymbols = new Set(["\\imath", "\\jmath"]);
var rowLikeTypes = new Set(["mrow", "mtable"]);
/**
* Takes a symbol and converts it into a MathML text node after performing
* optional replacement from symbols.js.
*/
var makeText = function makeText(text, mode, options) {
	if (symbols[mode][text] && symbols[mode][text].replace && text.charCodeAt(0) !== 55349 && !(ligatures.hasOwnProperty(text) && options && (options.fontFamily && options.fontFamily.slice(4, 6) === "tt" || options.font && options.font.slice(4, 6) === "tt"))) text = symbols[mode][text].replace;
	return new TextNode(text);
};
/**
* Wrap the given array of nodes in an <mrow> node if needed, i.e.,
* unless the array has length 1.  Always returns a single node.
*/
var makeRow = function makeRow(body) {
	if (body.length === 1) return body[0];
	else return new MathNode("mrow", body);
};
/**
* Returns the math variant as a string or null if none is required.
*/
var getVariant = function getVariant(group, options) {
	if (options.fontFamily === "texttt") return "monospace";
	else if (options.fontFamily === "textsf") if (options.fontShape === "textit" && options.fontWeight === "textbf") return "sans-serif-bold-italic";
	else if (options.fontShape === "textit") return "sans-serif-italic";
	else if (options.fontWeight === "textbf") return "bold-sans-serif";
	else return "sans-serif";
	else if (options.fontShape === "textit" && options.fontWeight === "textbf") return "bold-italic";
	else if (options.fontShape === "textit") return "italic";
	else if (options.fontWeight === "textbf") return "bold";
	var font = options.font;
	if (!font || font === "mathnormal") return null;
	var mode = group.mode;
	if (font === "mathit") return "italic";
	else if (font === "boldsymbol") return group.type === "textord" ? "bold" : "bold-italic";
	else if (font === "mathbf") return "bold";
	else if (font === "mathbb") return "double-struck";
	else if (font === "mathsfit") return "sans-serif-italic";
	else if (font === "mathfrak") return "fraktur";
	else if (font === "mathscr" || font === "mathcal") return "script";
	else if (font === "mathsf") return "sans-serif";
	else if (font === "mathtt") return "monospace";
	var text = group.text;
	if (noVariantSymbols.has(text)) return null;
	if (symbols[mode][text]) {
		var replacement = symbols[mode][text].replace;
		if (replacement) text = replacement;
	}
	var fontName = fontMap[font].fontName;
	if (getCharacterMetrics(text, fontName, mode)) return fontMap[font].variant;
	return null;
};
/**
* Check for <mi>.</mi> which is how a dot renders in MathML,
* or <mo separator="true" lspace="0em" rspace="0em">,</mo>
* which is how a braced comma {,} renders in MathML
*/
function isNumberPunctuation(group) {
	if (!group) return false;
	if (group.type === "mi" && group.children.length === 1) {
		var child = group.children[0];
		return child instanceof TextNode && child.text === ".";
	} else if (group.type === "mo" && group.children.length === 1 && group.getAttribute("separator") === "true" && group.getAttribute("lspace") === "0em" && group.getAttribute("rspace") === "0em") {
		var _child = group.children[0];
		return _child instanceof TextNode && _child.text === ",";
	} else return false;
}
/**
* Takes a list of nodes, builds them, and returns a list of the generated
* MathML nodes.  Also combine consecutive <mtext> outputs into a single
* <mtext> tag.
*/
var buildExpression = function buildExpression(expression, options, isOrdgroup) {
	if (expression.length === 1) {
		var group = buildGroup(expression[0], options);
		if (isOrdgroup && group instanceof MathNode && group.type === "mo") {
			group.setAttribute("lspace", "0em");
			group.setAttribute("rspace", "0em");
		}
		return [group];
	}
	var groups = [];
	var lastGroup;
	for (var i = 0; i < expression.length; i++) {
		var _group = buildGroup(expression[i], options);
		if (_group instanceof MathNode && lastGroup instanceof MathNode) {
			if (_group.type === "mtext" && lastGroup.type === "mtext" && _group.getAttribute("mathvariant") === lastGroup.getAttribute("mathvariant")) {
				lastGroup.children.push(..._group.children);
				continue;
			} else if (_group.type === "mn" && lastGroup.type === "mn") {
				lastGroup.children.push(..._group.children);
				continue;
			} else if (isNumberPunctuation(_group) && lastGroup.type === "mn") {
				lastGroup.children.push(..._group.children);
				continue;
			} else if (_group.type === "mn" && isNumberPunctuation(lastGroup)) {
				_group.children = [...lastGroup.children, ..._group.children];
				groups.pop();
			} else if ((_group.type === "msup" || _group.type === "msub") && _group.children.length >= 1 && (lastGroup.type === "mn" || isNumberPunctuation(lastGroup))) {
				var base = _group.children[0];
				if (base instanceof MathNode && base.type === "mn") {
					base.children = [...lastGroup.children, ...base.children];
					groups.pop();
				}
			} else if (lastGroup.type === "mi" && lastGroup.children.length === 1) {
				var lastChild = lastGroup.children[0];
				if (lastChild instanceof TextNode && lastChild.text === "̸" && (_group.type === "mo" || _group.type === "mi" || _group.type === "mn")) {
					var child = _group.children[0];
					if (child instanceof TextNode && child.text.length > 0) {
						child.text = child.text.slice(0, 1) + "̸" + child.text.slice(1);
						groups.pop();
					}
				}
			}
		}
		groups.push(_group);
		lastGroup = _group;
	}
	return groups;
};
/**
* Equivalent to buildExpression, but wraps the elements in an <mrow>
* if there's more than one.  Returns a single node instead of an array.
*/
var buildExpressionRow = function buildExpressionRow(expression, options, isOrdgroup) {
	return makeRow(buildExpression(expression, options, isOrdgroup));
};
/**
* Takes a group from the parser and calls the appropriate groupBuilders function
* on it to produce a MathML node.
*/
var buildGroup = function buildGroup(group, options) {
	if (!group) return new MathNode("mrow");
	if (_mathmlGroupBuilders[group.type]) return _mathmlGroupBuilders[group.type](group, options);
	else throw new ParseError("Got group of unknown type: '" + group.type + "'");
};
/**
* Takes a full parse tree and settings and builds a MathML representation of
* it. In particular, we put the elements from building the parse tree into a
* <semantics> tag so we can also include that TeX source as an annotation.
*
* Note that we actually return a domTree element with a `<math>` inside it so
* we can do appropriate styling.
*/
function buildMathML(tree, texExpression, options, isDisplayMode, forMathmlOnly) {
	var expression = buildExpression(tree, options);
	var wrapper;
	if (expression.length === 1 && expression[0] instanceof MathNode && rowLikeTypes.has(expression[0].type)) wrapper = expression[0];
	else wrapper = new MathNode("mrow", expression);
	var annotation = new MathNode("annotation", [new TextNode(texExpression)]);
	annotation.setAttribute("encoding", "application/x-tex");
	var math = new MathNode("math", [new MathNode("semantics", [wrapper, annotation])]);
	math.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
	if (isDisplayMode) math.setAttribute("display", "block");
	return makeSpan([forMathmlOnly ? "katex" : "katex-mathml"], [math]);
}
/**
* This file contains information about the options that the Parser carries
* around with it while parsing. Data is held in an `Options` object, and when
* recursing, a new `Options` object can be created with the `.with*` and
* `.reset` functions.
*/
var sizeStyleMap = [
	[
		1,
		1,
		1
	],
	[
		2,
		1,
		1
	],
	[
		3,
		1,
		1
	],
	[
		4,
		2,
		1
	],
	[
		5,
		2,
		1
	],
	[
		6,
		3,
		1
	],
	[
		7,
		4,
		2
	],
	[
		8,
		6,
		3
	],
	[
		9,
		7,
		6
	],
	[
		10,
		8,
		7
	],
	[
		11,
		10,
		9
	]
];
var sizeMultipliers = [
	.5,
	.6,
	.7,
	.8,
	.9,
	1,
	1.2,
	1.44,
	1.728,
	2.074,
	2.488
];
var sizeAtStyle = function sizeAtStyle(size, style) {
	return style.size < 2 ? size : sizeStyleMap[size - 1][style.size - 1];
};
/**
* This is the main options class. It contains the current style, size, color,
* and font.
*
* Options objects should not be modified. To create a new Options with
* different properties, call a `.having*` method.
*/
var Options = class Options {
	constructor(data) {
		this.style = data.style;
		this.color = data.color;
		this.size = data.size || Options.BASESIZE;
		this.textSize = data.textSize || this.size;
		this.phantom = !!data.phantom;
		this.font = data.font || "";
		this.fontFamily = data.fontFamily || "";
		this.fontWeight = data.fontWeight || "";
		this.fontShape = data.fontShape || "";
		this.sizeMultiplier = sizeMultipliers[this.size - 1];
		this.maxSize = data.maxSize;
		this.minRuleThickness = data.minRuleThickness;
		this._fontMetrics = void 0;
	}
	/**
	* Returns a new options object with the same properties as "this".  Properties
	* from "extension" will be copied to the new options object.
	*/
	extend(extension) {
		var data = {
			style: this.style,
			size: this.size,
			textSize: this.textSize,
			color: this.color,
			phantom: this.phantom,
			font: this.font,
			fontFamily: this.fontFamily,
			fontWeight: this.fontWeight,
			fontShape: this.fontShape,
			maxSize: this.maxSize,
			minRuleThickness: this.minRuleThickness
		};
		Object.assign(data, extension);
		return new Options(data);
	}
	/**
	* Return an options object with the given style. If `this.style === style`,
	* returns `this`.
	*/
	havingStyle(style) {
		if (this.style === style) return this;
		else return this.extend({
			style,
			size: sizeAtStyle(this.textSize, style)
		});
	}
	/**
	* Return an options object with a cramped version of the current style. If
	* the current style is cramped, returns `this`.
	*/
	havingCrampedStyle() {
		return this.havingStyle(this.style.cramp());
	}
	/**
	* Return an options object with the given size and in at least `\textstyle`.
	* Returns `this` if appropriate.
	*/
	havingSize(size) {
		if (this.size === size && this.textSize === size) return this;
		else return this.extend({
			style: this.style.text(),
			size,
			textSize: size,
			sizeMultiplier: sizeMultipliers[size - 1]
		});
	}
	/**
	* Like `this.havingSize(BASESIZE).havingStyle(style)`. If `style` is omitted,
	* changes to at least `\textstyle`.
	*/
	havingBaseStyle(style) {
		style = style || this.style.text();
		var wantSize = sizeAtStyle(Options.BASESIZE, style);
		if (this.size === wantSize && this.textSize === Options.BASESIZE && this.style === style) return this;
		else return this.extend({
			style,
			size: wantSize
		});
	}
	/**
	* Remove the effect of sizing changes such as \Huge.
	* Keep the effect of the current style, such as \scriptstyle.
	*/
	havingBaseSizing() {
		var size;
		switch (this.style.id) {
			case 4:
			case 5:
				size = 3;
				break;
			case 6:
			case 7:
				size = 1;
				break;
			default: size = 6;
		}
		return this.extend({
			style: this.style.text(),
			size
		});
	}
	/**
	* Create a new options object with the given color.
	*/
	withColor(color) {
		return this.extend({ color });
	}
	/**
	* Create a new options object with "phantom" set to true.
	*/
	withPhantom() {
		return this.extend({ phantom: true });
	}
	/**
	* Creates a new options object with the given math font or old text font.
	* @type {[type]}
	*/
	withFont(font) {
		return this.extend({ font });
	}
	/**
	* Create a new options objects with the given fontFamily.
	*/
	withTextFontFamily(fontFamily) {
		return this.extend({
			fontFamily,
			font: ""
		});
	}
	/**
	* Creates a new options object with the given font weight
	*/
	withTextFontWeight(fontWeight) {
		return this.extend({
			fontWeight,
			font: ""
		});
	}
	/**
	* Creates a new options object with the given font weight
	*/
	withTextFontShape(fontShape) {
		return this.extend({
			fontShape,
			font: ""
		});
	}
	/**
	* Return the CSS sizing classes required to switch from enclosing options
	* `oldOptions` to `this`. Returns an array of classes.
	*/
	sizingClasses(oldOptions) {
		if (oldOptions.size !== this.size) return [
			"sizing",
			"reset-size" + oldOptions.size,
			"size" + this.size
		];
		else return [];
	}
	/**
	* Return the CSS sizing classes required to switch to the base size. Like
	* `this.havingSize(BASESIZE).sizingClasses(this)`.
	*/
	baseSizingClasses() {
		if (this.size !== Options.BASESIZE) return [
			"sizing",
			"reset-size" + this.size,
			"size" + Options.BASESIZE
		];
		else return [];
	}
	/**
	* Return the font metrics for this size.
	*/
	fontMetrics() {
		if (!this._fontMetrics) this._fontMetrics = getGlobalMetrics(this.size);
		return this._fontMetrics;
	}
	/**
	* Gets the CSS color of the current options object
	*/
	getColor() {
		if (this.phantom) return "transparent";
		else return this.color;
	}
};
/**
* The base size index.
*/
Options.BASESIZE = 6;
var optionsFromSettings = function optionsFromSettings(settings) {
	return new Options({
		style: settings.displayMode ? Style$1.DISPLAY : Style$1.TEXT,
		maxSize: settings.maxSize,
		minRuleThickness: settings.minRuleThickness
	});
};
var displayWrap = function displayWrap(node, settings) {
	if (settings.displayMode) {
		var classes = ["katex-display"];
		if (settings.leqno) classes.push("leqno");
		if (settings.fleqn) classes.push("fleqn");
		node = makeSpan(classes, [node]);
	}
	return node;
};
var buildTree = function buildTree(tree, expression, settings) {
	var options = optionsFromSettings(settings);
	var katexNode;
	if (settings.output === "mathml") return buildMathML(tree, expression, options, settings.displayMode, true);
	else if (settings.output === "html") katexNode = makeSpan(["katex"], [buildHTML(tree, options)]);
	else katexNode = makeSpan(["katex"], [buildMathML(tree, expression, options, settings.displayMode, false), buildHTML(tree, options)]);
	return displayWrap(katexNode, settings);
};
var buildHTMLTree = function buildHTMLTree(tree, expression, settings) {
	return displayWrap(makeSpan(["katex"], [buildHTML(tree, optionsFromSettings(settings))]), settings);
};
/**
* This file provides support to buildMathML.js and buildHTML.js
* for stretchy wide elements rendered from SVG files
* and other CSS trickery.
*/
var stretchyCodePoint = {
	widehat: "^",
	widecheck: "ˇ",
	widetilde: "~",
	utilde: "~",
	overleftarrow: "←",
	underleftarrow: "←",
	xleftarrow: "←",
	overrightarrow: "→",
	underrightarrow: "→",
	xrightarrow: "→",
	underbrace: "⏟",
	overbrace: "⏞",
	overgroup: "⏠",
	undergroup: "⏡",
	overleftrightarrow: "↔",
	underleftrightarrow: "↔",
	xleftrightarrow: "↔",
	Overrightarrow: "⇒",
	xRightarrow: "⇒",
	overleftharpoon: "↼",
	xleftharpoonup: "↼",
	overrightharpoon: "⇀",
	xrightharpoonup: "⇀",
	xLeftarrow: "⇐",
	xLeftrightarrow: "⇔",
	xhookleftarrow: "↩",
	xhookrightarrow: "↪",
	xmapsto: "↦",
	xrightharpoondown: "⇁",
	xleftharpoondown: "↽",
	xrightleftharpoons: "⇌",
	xleftrightharpoons: "⇋",
	xtwoheadleftarrow: "↞",
	xtwoheadrightarrow: "↠",
	xlongequal: "=",
	xtofrom: "⇄",
	xrightleftarrows: "⇄",
	xrightequilibrium: "⇌",
	xleftequilibrium: "⇋",
	"\\cdrightarrow": "→",
	"\\cdleftarrow": "←",
	"\\cdlongequal": "="
};
var stretchyMathML = function stretchyMathML(label) {
	var node = new MathNode("mo", [new TextNode(stretchyCodePoint[label.replace(/^\\/, "")])]);
	node.setAttribute("stretchy", "true");
	return node;
};
var katexImagesData = {
	overrightarrow: [
		["rightarrow"],
		.888,
		522,
		"xMaxYMin"
	],
	overleftarrow: [
		["leftarrow"],
		.888,
		522,
		"xMinYMin"
	],
	underrightarrow: [
		["rightarrow"],
		.888,
		522,
		"xMaxYMin"
	],
	underleftarrow: [
		["leftarrow"],
		.888,
		522,
		"xMinYMin"
	],
	xrightarrow: [
		["rightarrow"],
		1.469,
		522,
		"xMaxYMin"
	],
	"\\cdrightarrow": [
		["rightarrow"],
		3,
		522,
		"xMaxYMin"
	],
	xleftarrow: [
		["leftarrow"],
		1.469,
		522,
		"xMinYMin"
	],
	"\\cdleftarrow": [
		["leftarrow"],
		3,
		522,
		"xMinYMin"
	],
	Overrightarrow: [
		["doublerightarrow"],
		.888,
		560,
		"xMaxYMin"
	],
	xRightarrow: [
		["doublerightarrow"],
		1.526,
		560,
		"xMaxYMin"
	],
	xLeftarrow: [
		["doubleleftarrow"],
		1.526,
		560,
		"xMinYMin"
	],
	overleftharpoon: [
		["leftharpoon"],
		.888,
		522,
		"xMinYMin"
	],
	xleftharpoonup: [
		["leftharpoon"],
		.888,
		522,
		"xMinYMin"
	],
	xleftharpoondown: [
		["leftharpoondown"],
		.888,
		522,
		"xMinYMin"
	],
	overrightharpoon: [
		["rightharpoon"],
		.888,
		522,
		"xMaxYMin"
	],
	xrightharpoonup: [
		["rightharpoon"],
		.888,
		522,
		"xMaxYMin"
	],
	xrightharpoondown: [
		["rightharpoondown"],
		.888,
		522,
		"xMaxYMin"
	],
	xlongequal: [
		["longequal"],
		.888,
		334,
		"xMinYMin"
	],
	"\\cdlongequal": [
		["longequal"],
		3,
		334,
		"xMinYMin"
	],
	xtwoheadleftarrow: [
		["twoheadleftarrow"],
		.888,
		334,
		"xMinYMin"
	],
	xtwoheadrightarrow: [
		["twoheadrightarrow"],
		.888,
		334,
		"xMaxYMin"
	],
	overleftrightarrow: [
		["leftarrow", "rightarrow"],
		.888,
		522
	],
	overbrace: [
		[
			"leftbrace",
			"midbrace",
			"rightbrace"
		],
		1.6,
		548
	],
	underbrace: [
		[
			"leftbraceunder",
			"midbraceunder",
			"rightbraceunder"
		],
		1.6,
		548
	],
	underleftrightarrow: [
		["leftarrow", "rightarrow"],
		.888,
		522
	],
	xleftrightarrow: [
		["leftarrow", "rightarrow"],
		1.75,
		522
	],
	xLeftrightarrow: [
		["doubleleftarrow", "doublerightarrow"],
		1.75,
		560
	],
	xrightleftharpoons: [
		["leftharpoondownplus", "rightharpoonplus"],
		1.75,
		716
	],
	xleftrightharpoons: [
		["leftharpoonplus", "rightharpoondownplus"],
		1.75,
		716
	],
	xhookleftarrow: [
		["leftarrow", "righthook"],
		1.08,
		522
	],
	xhookrightarrow: [
		["lefthook", "rightarrow"],
		1.08,
		522
	],
	overlinesegment: [
		["leftlinesegment", "rightlinesegment"],
		.888,
		522
	],
	underlinesegment: [
		["leftlinesegment", "rightlinesegment"],
		.888,
		522
	],
	overgroup: [
		["leftgroup", "rightgroup"],
		.888,
		342
	],
	undergroup: [
		["leftgroupunder", "rightgroupunder"],
		.888,
		342
	],
	xmapsto: [
		["leftmapsto", "rightarrow"],
		1.5,
		522
	],
	xtofrom: [
		["leftToFrom", "rightToFrom"],
		1.75,
		528
	],
	xrightleftarrows: [
		["baraboveleftarrow", "rightarrowabovebar"],
		1.75,
		901
	],
	xrightequilibrium: [
		["baraboveshortleftharpoon", "rightharpoonaboveshortbar"],
		1.75,
		716
	],
	xleftequilibrium: [
		["shortbaraboveleftharpoon", "shortrightharpoonabovebar"],
		1.75,
		716
	]
};
var wideAccentLabels = new Set([
	"widehat",
	"widecheck",
	"widetilde",
	"utilde"
]);
var stretchySvg = function stretchySvg(group, options) {
	function buildSvgSpan_() {
		var viewBoxWidth = 4e5;
		var label = group.label.slice(1);
		if (wideAccentLabels.has(label)) {
			var grp = group;
			var numChars = grp.base.type === "ordgroup" ? grp.base.body.length : 1;
			var viewBoxHeight;
			var pathName;
			var _height;
			if (numChars > 5) if (label === "widehat" || label === "widecheck") {
				viewBoxHeight = 420;
				viewBoxWidth = 2364;
				_height = .42;
				pathName = label + "4";
			} else {
				viewBoxHeight = 312;
				viewBoxWidth = 2340;
				_height = .34;
				pathName = "tilde4";
			}
			else {
				var imgIndex = [
					1,
					1,
					2,
					2,
					3,
					3
				][numChars];
				if (label === "widehat" || label === "widecheck") {
					viewBoxWidth = [
						0,
						1062,
						2364,
						2364,
						2364
					][imgIndex];
					viewBoxHeight = [
						0,
						239,
						300,
						360,
						420
					][imgIndex];
					_height = [
						0,
						.24,
						.3,
						.3,
						.36,
						.42
					][imgIndex];
					pathName = label + imgIndex;
				} else {
					viewBoxWidth = [
						0,
						600,
						1033,
						2339,
						2340
					][imgIndex];
					viewBoxHeight = [
						0,
						260,
						286,
						306,
						312
					][imgIndex];
					_height = [
						0,
						.26,
						.286,
						.3,
						.306,
						.34
					][imgIndex];
					pathName = "tilde" + imgIndex;
				}
			}
			return {
				span: makeSvgSpan([], [new SvgNode([new PathNode(pathName)], {
					"width": "100%",
					"height": makeEm(_height),
					"viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight,
					"preserveAspectRatio": "none"
				})], options),
				minWidth: 0,
				height: _height
			};
		} else {
			var spans = [];
			var data = katexImagesData[label];
			var [paths, _minWidth, _viewBoxHeight] = data;
			var _height2 = _viewBoxHeight / 1e3;
			var numSvgChildren = paths.length;
			var widthClasses;
			var aligns;
			if (numSvgChildren === 1) {
				var align1 = data[3];
				widthClasses = ["hide-tail"];
				aligns = [align1];
			} else if (numSvgChildren === 2) {
				widthClasses = ["halfarrow-left", "halfarrow-right"];
				aligns = ["xMinYMin", "xMaxYMin"];
			} else if (numSvgChildren === 3) {
				widthClasses = [
					"brace-left",
					"brace-center",
					"brace-right"
				];
				aligns = [
					"xMinYMin",
					"xMidYMin",
					"xMaxYMin"
				];
			} else throw new Error("Correct katexImagesData or update code here to support\n                    " + numSvgChildren + " children.");
			for (var i = 0; i < numSvgChildren; i++) {
				var _svgNode = new SvgNode([new PathNode(paths[i])], {
					"width": "400em",
					"height": makeEm(_height2),
					"viewBox": "0 0 " + viewBoxWidth + " " + _viewBoxHeight,
					"preserveAspectRatio": aligns[i] + " slice"
				});
				var _span = makeSvgSpan([widthClasses[i]], [_svgNode], options);
				if (numSvgChildren === 1) return {
					span: _span,
					minWidth: _minWidth,
					height: _height2
				};
				else {
					_span.style.height = makeEm(_height2);
					spans.push(_span);
				}
			}
			return {
				span: makeSpan(["stretchy"], spans, options),
				minWidth: _minWidth,
				height: _height2
			};
		}
	}
	var { span, minWidth, height } = buildSvgSpan_();
	span.height = height;
	span.style.height = makeEm(height);
	if (minWidth > 0) span.style.minWidth = makeEm(minWidth);
	return span;
};
var stretchyEnclose = function stretchyEnclose(inner, label, topPad, bottomPad, options) {
	var img;
	var totalHeight = inner.height + inner.depth + topPad + bottomPad;
	if (/fbox|color|angl/.test(label)) {
		img = makeSpan(["stretchy", label], [], options);
		if (label === "fbox") {
			var color = options.color && options.getColor();
			if (color) img.style.borderColor = color;
		}
	} else {
		var lines = [];
		if (/^[bx]cancel$/.test(label)) lines.push(new LineNode({
			"x1": "0",
			"y1": "0",
			"x2": "100%",
			"y2": "100%",
			"stroke-width": "0.046em"
		}));
		if (/^x?cancel$/.test(label)) lines.push(new LineNode({
			"x1": "0",
			"y1": "100%",
			"x2": "100%",
			"y2": "0",
			"stroke-width": "0.046em"
		}));
		img = makeSvgSpan([], [new SvgNode(lines, {
			"width": "100%",
			"height": makeEm(totalHeight)
		})], options);
	}
	img.height = totalHeight;
	img.style.height = makeEm(totalHeight);
	return img;
};
/**
* Asserts that the node is of the given type and returns it with stricter
* typing. Throws if the node's type does not match.
*/
function assertNodeType(node, type) {
	if (!node || node.type !== type) throw new Error("Expected node of type " + type + ", but got " + (node ? "node of type " + node.type : String(node)));
	return node;
}
/**
* Returns the node more strictly typed iff it is of the given type. Otherwise,
* returns null.
*/
function assertSymbolNodeType(node) {
	var typedNode = checkSymbolNodeType(node);
	if (!typedNode) throw new Error("Expected node of symbol group type, but got " + (node ? "node of type " + node.type : String(node)));
	return typedNode;
}
/**
* Returns the node more strictly typed iff it is of the given type. Otherwise,
* returns null.
*/
function checkSymbolNodeType(node) {
	if (node && (node.type === "atom" || NON_ATOMS.hasOwnProperty(node.type))) return node;
	return null;
}
var htmlBuilder$a = (grp, options) => {
	var base;
	var group;
	var supSubGroup;
	if (grp && grp.type === "supsub") {
		group = assertNodeType(grp.base, "accent");
		base = group.base;
		grp.base = base;
		supSubGroup = assertSpan(buildGroup$1(grp, options));
		grp.base = group;
	} else {
		group = assertNodeType(grp, "accent");
		base = group.base;
	}
	var body = buildGroup$1(base, options.havingCrampedStyle());
	var mustShift = group.isShifty && isCharacterBox(base);
	var skew = 0;
	if (mustShift) skew = assertSymbolDomNode(buildGroup$1(getBaseElem(base), options.havingCrampedStyle())).skew;
	var accentBelow = group.label === "\\c";
	var clearance = accentBelow ? body.height + body.depth : Math.min(body.height, options.fontMetrics().xHeight);
	var accentBody;
	if (!group.isStretchy) {
		var accent;
		var width;
		if (group.label === "\\vec") {
			accent = staticSvg("vec", options);
			width = svgData.vec[1];
		} else {
			accent = makeOrd({
				type: "textord",
				mode: group.mode,
				text: group.label
			}, options, "textord");
			accent = assertSymbolDomNode(accent);
			accent.italic = 0;
			width = accent.width;
			if (accentBelow) clearance += accent.depth;
		}
		accentBody = makeSpan(["accent-body"], [accent]);
		var accentFull = group.label === "\\textcircled";
		if (accentFull) {
			accentBody.classes.push("accent-full");
			clearance = body.height;
		}
		var left = skew;
		if (!accentFull) left -= width / 2;
		accentBody.style.left = makeEm(left);
		if (group.label === "\\textcircled") accentBody.style.top = ".2em";
		accentBody = makeVList({
			positionType: "firstBaseline",
			children: [
				{
					type: "elem",
					elem: body
				},
				{
					type: "kern",
					size: -clearance
				},
				{
					type: "elem",
					elem: accentBody
				}
			]
		});
	} else {
		accentBody = stretchySvg(group, options);
		accentBody = makeVList({
			positionType: "firstBaseline",
			children: [{
				type: "elem",
				elem: body
			}, {
				type: "elem",
				elem: accentBody,
				wrapperClasses: ["svg-align"],
				wrapperStyle: skew > 0 ? {
					width: "calc(100% - " + makeEm(2 * skew) + ")",
					marginLeft: makeEm(2 * skew)
				} : void 0
			}]
		});
	}
	var accentWrap = makeSpan(["mord", "accent"], [accentBody], options);
	if (supSubGroup) {
		supSubGroup.children[0] = accentWrap;
		supSubGroup.height = Math.max(accentWrap.height, supSubGroup.height);
		supSubGroup.classes[0] = "mord";
		return supSubGroup;
	} else return accentWrap;
};
var mathmlBuilder$9 = (group, options) => {
	var accentNode = group.isStretchy ? stretchyMathML(group.label) : new MathNode("mo", [makeText(group.label, group.mode)]);
	var node = new MathNode("mover", [buildGroup(group.base, options), accentNode]);
	node.setAttribute("accent", "true");
	return node;
};
var NON_STRETCHY_ACCENT_REGEX = new RegExp([
	"\\acute",
	"\\grave",
	"\\ddot",
	"\\tilde",
	"\\bar",
	"\\breve",
	"\\check",
	"\\hat",
	"\\vec",
	"\\dot",
	"\\mathring"
].map((accent) => "\\" + accent).join("|"));
defineFunction({
	type: "accent",
	names: [
		"\\acute",
		"\\grave",
		"\\ddot",
		"\\tilde",
		"\\bar",
		"\\breve",
		"\\check",
		"\\hat",
		"\\vec",
		"\\dot",
		"\\mathring",
		"\\widecheck",
		"\\widehat",
		"\\widetilde",
		"\\overrightarrow",
		"\\overleftarrow",
		"\\Overrightarrow",
		"\\overleftrightarrow",
		"\\overgroup",
		"\\overlinesegment",
		"\\overleftharpoon",
		"\\overrightharpoon"
	],
	props: { numArgs: 1 },
	handler: (context, args) => {
		var base = normalizeArgument(args[0]);
		var isStretchy = !NON_STRETCHY_ACCENT_REGEX.test(context.funcName);
		var isShifty = !isStretchy || context.funcName === "\\widehat" || context.funcName === "\\widetilde" || context.funcName === "\\widecheck";
		return {
			type: "accent",
			mode: context.parser.mode,
			label: context.funcName,
			isStretchy,
			isShifty,
			base
		};
	},
	htmlBuilder: htmlBuilder$a,
	mathmlBuilder: mathmlBuilder$9
});
defineFunction({
	type: "accent",
	names: [
		"\\'",
		"\\`",
		"\\^",
		"\\~",
		"\\=",
		"\\u",
		"\\.",
		"\\\"",
		"\\c",
		"\\r",
		"\\H",
		"\\v",
		"\\textcircled"
	],
	props: {
		numArgs: 1,
		allowedInText: true,
		allowedInMath: true,
		argTypes: ["primitive"]
	},
	handler: (context, args) => {
		var base = args[0];
		var mode = context.parser.mode;
		if (mode === "math") {
			context.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + context.funcName + " works only in text mode");
			mode = "text";
		}
		return {
			type: "accent",
			mode,
			label: context.funcName,
			isStretchy: false,
			isShifty: true,
			base
		};
	},
	htmlBuilder: htmlBuilder$a,
	mathmlBuilder: mathmlBuilder$9
});
defineFunction({
	type: "accentUnder",
	names: [
		"\\underleftarrow",
		"\\underrightarrow",
		"\\underleftrightarrow",
		"\\undergroup",
		"\\underlinesegment",
		"\\utilde"
	],
	props: { numArgs: 1 },
	handler: (_ref, args) => {
		var { parser, funcName } = _ref;
		var base = args[0];
		return {
			type: "accentUnder",
			mode: parser.mode,
			label: funcName,
			base
		};
	},
	htmlBuilder: (group, options) => {
		var innerGroup = buildGroup$1(group.base, options);
		var accentBody = stretchySvg(group, options);
		var kern = group.label === "\\utilde" ? .12 : 0;
		return makeSpan(["mord", "accentunder"], [makeVList({
			positionType: "top",
			positionData: innerGroup.height,
			children: [
				{
					type: "elem",
					elem: accentBody,
					wrapperClasses: ["svg-align"]
				},
				{
					type: "kern",
					size: kern
				},
				{
					type: "elem",
					elem: innerGroup
				}
			]
		})], options);
	},
	mathmlBuilder: (group, options) => {
		var accentNode = stretchyMathML(group.label);
		var node = new MathNode("munder", [buildGroup(group.base, options), accentNode]);
		node.setAttribute("accentunder", "true");
		return node;
	}
});
var paddedNode = (group) => {
	var node = new MathNode("mpadded", group ? [group] : []);
	node.setAttribute("width", "+0.6em");
	node.setAttribute("lspace", "0.3em");
	return node;
};
defineFunction({
	type: "xArrow",
	names: [
		"\\xleftarrow",
		"\\xrightarrow",
		"\\xLeftarrow",
		"\\xRightarrow",
		"\\xleftrightarrow",
		"\\xLeftrightarrow",
		"\\xhookleftarrow",
		"\\xhookrightarrow",
		"\\xmapsto",
		"\\xrightharpoondown",
		"\\xrightharpoonup",
		"\\xleftharpoondown",
		"\\xleftharpoonup",
		"\\xrightleftharpoons",
		"\\xleftrightharpoons",
		"\\xlongequal",
		"\\xtwoheadrightarrow",
		"\\xtwoheadleftarrow",
		"\\xtofrom",
		"\\xrightleftarrows",
		"\\xrightequilibrium",
		"\\xleftequilibrium",
		"\\\\cdrightarrow",
		"\\\\cdleftarrow",
		"\\\\cdlongequal"
	],
	props: {
		numArgs: 1,
		numOptionalArgs: 1
	},
	handler(_ref, args, optArgs) {
		var { parser, funcName } = _ref;
		return {
			type: "xArrow",
			mode: parser.mode,
			label: funcName,
			body: args[0],
			below: optArgs[0]
		};
	},
	htmlBuilder(group, options) {
		var style = options.style;
		var newOptions = options.havingStyle(style.sup());
		var upperGroup = wrapFragment(buildGroup$1(group.body, newOptions, options), options);
		var arrowPrefix = group.label.slice(0, 2) === "\\x" ? "x" : "cd";
		upperGroup.classes.push(arrowPrefix + "-arrow-pad");
		var lowerGroup;
		if (group.below) {
			newOptions = options.havingStyle(style.sub());
			lowerGroup = wrapFragment(buildGroup$1(group.below, newOptions, options), options);
			lowerGroup.classes.push(arrowPrefix + "-arrow-pad");
		}
		var arrowBody = stretchySvg(group, options);
		var arrowShift = -options.fontMetrics().axisHeight + .5 * arrowBody.height;
		var upperShift = -options.fontMetrics().axisHeight - .5 * arrowBody.height - .111;
		if (upperGroup.depth > .25 || group.label === "\\xleftequilibrium") upperShift -= upperGroup.depth;
		var vlist;
		if (lowerGroup) {
			var lowerShift = -options.fontMetrics().axisHeight + lowerGroup.height + .5 * arrowBody.height + .111;
			vlist = makeVList({
				positionType: "individualShift",
				children: [
					{
						type: "elem",
						elem: upperGroup,
						shift: upperShift
					},
					{
						type: "elem",
						elem: arrowBody,
						shift: arrowShift
					},
					{
						type: "elem",
						elem: lowerGroup,
						shift: lowerShift
					}
				]
			});
		} else vlist = makeVList({
			positionType: "individualShift",
			children: [{
				type: "elem",
				elem: upperGroup,
				shift: upperShift
			}, {
				type: "elem",
				elem: arrowBody,
				shift: arrowShift
			}]
		});
		vlist.children[0].children[0].children[1].classes.push("svg-align");
		return makeSpan(["mrel", "x-arrow"], [vlist], options);
	},
	mathmlBuilder(group, options) {
		var arrowNode = stretchyMathML(group.label);
		arrowNode.setAttribute("minsize", group.label.charAt(0) === "x" ? "1.75em" : "3.0em");
		var node;
		if (group.body) {
			var upperNode = paddedNode(buildGroup(group.body, options));
			if (group.below) node = new MathNode("munderover", [
				arrowNode,
				paddedNode(buildGroup(group.below, options)),
				upperNode
			]);
			else node = new MathNode("mover", [arrowNode, upperNode]);
		} else if (group.below) node = new MathNode("munder", [arrowNode, paddedNode(buildGroup(group.below, options))]);
		else {
			node = paddedNode();
			node = new MathNode("mover", [arrowNode, node]);
		}
		return node;
	}
});
function htmlBuilder$9(group, options) {
	var elements = buildExpression$1(group.body, options, true);
	return makeSpan([group.mclass], elements, options);
}
function mathmlBuilder$8(group, options) {
	var node;
	var inner = buildExpression(group.body, options);
	if (group.mclass === "minner") node = new MathNode("mpadded", inner);
	else if (group.mclass === "mord") if (group.isCharacterBox) {
		node = inner[0];
		node.type = "mi";
	} else node = new MathNode("mi", inner);
	else {
		if (group.isCharacterBox) {
			node = inner[0];
			node.type = "mo";
		} else node = new MathNode("mo", inner);
		if (group.mclass === "mbin") {
			node.attributes.lspace = "0.22em";
			node.attributes.rspace = "0.22em";
		} else if (group.mclass === "mpunct") {
			node.attributes.lspace = "0em";
			node.attributes.rspace = "0.17em";
		} else if (group.mclass === "mopen" || group.mclass === "mclose") {
			node.attributes.lspace = "0em";
			node.attributes.rspace = "0em";
		} else if (group.mclass === "minner") {
			node.attributes.lspace = "0.0556em";
			node.attributes.width = "+0.1111em";
		}
	}
	return node;
}
defineFunction({
	type: "mclass",
	names: [
		"\\mathord",
		"\\mathbin",
		"\\mathrel",
		"\\mathopen",
		"\\mathclose",
		"\\mathpunct",
		"\\mathinner"
	],
	props: {
		numArgs: 1,
		primitive: true
	},
	handler(_ref, args) {
		var { parser, funcName } = _ref;
		var body = args[0];
		return {
			type: "mclass",
			mode: parser.mode,
			mclass: "m" + funcName.slice(5),
			body: ordargument(body),
			isCharacterBox: isCharacterBox(body)
		};
	},
	htmlBuilder: htmlBuilder$9,
	mathmlBuilder: mathmlBuilder$8
});
var binrelClass = (arg) => {
	var atom = arg.type === "ordgroup" && arg.body.length ? arg.body[0] : arg;
	if (atom.type === "atom" && (atom.family === "bin" || atom.family === "rel")) return "m" + atom.family;
	else return "mord";
};
defineFunction({
	type: "mclass",
	names: ["\\@binrel"],
	props: { numArgs: 2 },
	handler(_ref2, args) {
		var { parser } = _ref2;
		return {
			type: "mclass",
			mode: parser.mode,
			mclass: binrelClass(args[0]),
			body: ordargument(args[1]),
			isCharacterBox: isCharacterBox(args[1])
		};
	}
});
defineFunction({
	type: "mclass",
	names: [
		"\\stackrel",
		"\\overset",
		"\\underset"
	],
	props: { numArgs: 2 },
	handler(_ref3, args) {
		var { parser, funcName } = _ref3;
		var baseArg = args[1];
		var shiftedArg = args[0];
		var mclass;
		if (funcName !== "\\stackrel") mclass = binrelClass(baseArg);
		else mclass = "mrel";
		var baseOp = {
			type: "op",
			mode: baseArg.mode,
			limits: true,
			alwaysHandleSupSub: true,
			parentIsSupSub: false,
			symbol: false,
			suppressBaseShift: funcName !== "\\stackrel",
			body: ordargument(baseArg)
		};
		var supsub = {
			type: "supsub",
			mode: shiftedArg.mode,
			base: baseOp,
			sup: funcName === "\\underset" ? null : shiftedArg,
			sub: funcName === "\\underset" ? shiftedArg : null
		};
		return {
			type: "mclass",
			mode: parser.mode,
			mclass,
			body: [supsub],
			isCharacterBox: isCharacterBox(supsub)
		};
	},
	htmlBuilder: htmlBuilder$9,
	mathmlBuilder: mathmlBuilder$8
});
defineFunction({
	type: "pmb",
	names: ["\\pmb"],
	props: {
		numArgs: 1,
		allowedInText: true
	},
	handler(_ref, args) {
		var { parser } = _ref;
		return {
			type: "pmb",
			mode: parser.mode,
			mclass: binrelClass(args[0]),
			body: ordargument(args[0])
		};
	},
	htmlBuilder(group, options) {
		var elements = buildExpression$1(group.body, options, true);
		var node = makeSpan([group.mclass], elements, options);
		node.style.textShadow = "0.02em 0.01em 0.04px";
		return node;
	},
	mathmlBuilder(group, style) {
		var node = new MathNode("mstyle", buildExpression(group.body, style));
		node.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px");
		return node;
	}
});
var cdArrowFunctionName = {
	">": "\\\\cdrightarrow",
	"<": "\\\\cdleftarrow",
	"=": "\\\\cdlongequal",
	"A": "\\uparrow",
	"V": "\\downarrow",
	"|": "\\Vert",
	".": "no arrow"
};
var newCell = () => {
	return {
		type: "styling",
		body: [],
		mode: "math",
		style: "display"
	};
};
var isStartOfArrow = (node) => {
	return node.type === "textord" && node.text === "@";
};
var isLabelEnd = (node, endChar) => {
	return (node.type === "mathord" || node.type === "atom") && node.text === endChar;
};
function cdArrow(arrowChar, labels, parser) {
	var funcName = cdArrowFunctionName[arrowChar];
	switch (funcName) {
		case "\\\\cdrightarrow":
		case "\\\\cdleftarrow": return parser.callFunction(funcName, [labels[0]], [labels[1]]);
		case "\\uparrow":
		case "\\downarrow":
			var leftLabel = parser.callFunction("\\\\cdleft", [labels[0]], []);
			var bareArrow = {
				type: "atom",
				text: funcName,
				mode: "math",
				family: "rel"
			};
			var arrowGroup = {
				type: "ordgroup",
				mode: "math",
				body: [
					leftLabel,
					parser.callFunction("\\Big", [bareArrow], []),
					parser.callFunction("\\\\cdright", [labels[1]], [])
				]
			};
			return parser.callFunction("\\\\cdparent", [arrowGroup], []);
		case "\\\\cdlongequal": return parser.callFunction("\\\\cdlongequal", [], []);
		case "\\Vert": return parser.callFunction("\\Big", [{
			type: "textord",
			text: "\\Vert",
			mode: "math"
		}], []);
		default: return {
			type: "textord",
			text: " ",
			mode: "math"
		};
	}
}
function parseCD(parser) {
	var parsedRows = [];
	parser.gullet.beginGroup();
	parser.gullet.macros.set("\\cr", "\\\\\\relax");
	parser.gullet.beginGroup();
	while (true) {
		parsedRows.push(parser.parseExpression(false, "\\\\"));
		parser.gullet.endGroup();
		parser.gullet.beginGroup();
		var next = parser.fetch().text;
		if (next === "&" || next === "\\\\") parser.consume();
		else if (next === "\\end") {
			if (parsedRows[parsedRows.length - 1].length === 0) parsedRows.pop();
			break;
		} else throw new ParseError("Expected \\\\ or \\cr or \\end", parser.nextToken);
	}
	var row = [];
	var body = [row];
	for (var i = 0; i < parsedRows.length; i++) {
		var rowNodes = parsedRows[i];
		var cell = newCell();
		for (var j = 0; j < rowNodes.length; j++) if (!isStartOfArrow(rowNodes[j])) cell.body.push(rowNodes[j]);
		else {
			row.push(cell);
			j += 1;
			var arrowChar = assertSymbolNodeType(rowNodes[j]).text;
			var labels = new Array(2);
			labels[0] = {
				type: "ordgroup",
				mode: "math",
				body: []
			};
			labels[1] = {
				type: "ordgroup",
				mode: "math",
				body: []
			};
			if ("=|.".includes(arrowChar));
			else if ("<>AV".includes(arrowChar)) for (var labelNum = 0; labelNum < 2; labelNum++) {
				var inLabel = true;
				for (var k = j + 1; k < rowNodes.length; k++) {
					if (isLabelEnd(rowNodes[k], arrowChar)) {
						inLabel = false;
						j = k;
						break;
					}
					if (isStartOfArrow(rowNodes[k])) throw new ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[k]);
					labels[labelNum].body.push(rowNodes[k]);
				}
				if (inLabel) throw new ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[j]);
			}
			else throw new ParseError("Expected one of \"<>AV=|.\" after @", rowNodes[j]);
			var wrappedArrow = {
				type: "styling",
				body: [cdArrow(arrowChar, labels, parser)],
				mode: "math",
				style: "display"
			};
			row.push(wrappedArrow);
			cell = newCell();
		}
		if (i % 2 === 0) row.push(cell);
		else row.shift();
		row = [];
		body.push(row);
	}
	parser.gullet.endGroup();
	parser.gullet.endGroup();
	return {
		type: "array",
		mode: "math",
		body,
		arraystretch: 1,
		addJot: true,
		rowGaps: [null],
		cols: new Array(body[0].length).fill({
			type: "align",
			align: "c",
			pregap: .25,
			postgap: .25
		}),
		colSeparationType: "CD",
		hLinesBeforeRow: new Array(body.length + 1).fill([])
	};
}
defineFunction({
	type: "cdlabel",
	names: ["\\\\cdleft", "\\\\cdright"],
	props: { numArgs: 1 },
	handler(_ref, args) {
		var { parser, funcName } = _ref;
		return {
			type: "cdlabel",
			mode: parser.mode,
			side: funcName.slice(4),
			label: args[0]
		};
	},
	htmlBuilder(group, options) {
		var newOptions = options.havingStyle(options.style.sup());
		var label = wrapFragment(buildGroup$1(group.label, newOptions, options), options);
		label.classes.push("cd-label-" + group.side);
		label.style.bottom = makeEm(.8 - label.depth);
		label.height = 0;
		label.depth = 0;
		return label;
	},
	mathmlBuilder(group, options) {
		var label = new MathNode("mrow", [buildGroup(group.label, options)]);
		label = new MathNode("mpadded", [label]);
		label.setAttribute("width", "0");
		if (group.side === "left") label.setAttribute("lspace", "-1width");
		label.setAttribute("voffset", "0.7em");
		label = new MathNode("mstyle", [label]);
		label.setAttribute("displaystyle", "false");
		label.setAttribute("scriptlevel", "1");
		return label;
	}
});
defineFunction({
	type: "cdlabelparent",
	names: ["\\\\cdparent"],
	props: { numArgs: 1 },
	handler(_ref2, args) {
		var { parser } = _ref2;
		return {
			type: "cdlabelparent",
			mode: parser.mode,
			fragment: args[0]
		};
	},
	htmlBuilder(group, options) {
		var parent = wrapFragment(buildGroup$1(group.fragment, options), options);
		parent.classes.push("cd-vert-arrow");
		return parent;
	},
	mathmlBuilder(group, options) {
		return new MathNode("mrow", [buildGroup(group.fragment, options)]);
	}
});
defineFunction({
	type: "textord",
	names: ["\\@char"],
	props: {
		numArgs: 1,
		allowedInText: true
	},
	handler(_ref, args) {
		var { parser } = _ref;
		var group = assertNodeType(args[0], "ordgroup").body;
		var number = "";
		for (var i = 0; i < group.length; i++) {
			var node = assertNodeType(group[i], "textord");
			number += node.text;
		}
		var code = parseInt(number);
		var text;
		if (isNaN(code)) throw new ParseError("\\@char has non-numeric argument " + number);
		else if (code < 0 || code >= 1114111) throw new ParseError("\\@char with invalid code point " + number);
		else if (code <= 65535) text = String.fromCharCode(code);
		else {
			code -= 65536;
			text = String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
		}
		return {
			type: "textord",
			mode: parser.mode,
			text
		};
	}
});
var htmlBuilder$8 = (group, options) => {
	return makeFragment(buildExpression$1(group.body, options.withColor(group.color), false));
};
var mathmlBuilder$7 = (group, options) => {
	var node = new MathNode("mstyle", buildExpression(group.body, options.withColor(group.color)));
	node.setAttribute("mathcolor", group.color);
	return node;
};
defineFunction({
	type: "color",
	names: ["\\textcolor"],
	props: {
		numArgs: 2,
		allowedInText: true,
		argTypes: ["color", "original"]
	},
	handler(_ref, args) {
		var { parser } = _ref;
		var color = assertNodeType(args[0], "color-token").color;
		var body = args[1];
		return {
			type: "color",
			mode: parser.mode,
			color,
			body: ordargument(body)
		};
	},
	htmlBuilder: htmlBuilder$8,
	mathmlBuilder: mathmlBuilder$7
});
defineFunction({
	type: "color",
	names: ["\\color"],
	props: {
		numArgs: 1,
		allowedInText: true,
		argTypes: ["color"]
	},
	handler(_ref2, args) {
		var { parser, breakOnTokenText } = _ref2;
		var color = assertNodeType(args[0], "color-token").color;
		parser.gullet.macros.set("\\current@color", color);
		var body = parser.parseExpression(true, breakOnTokenText);
		return {
			type: "color",
			mode: parser.mode,
			color,
			body
		};
	},
	htmlBuilder: htmlBuilder$8,
	mathmlBuilder: mathmlBuilder$7
});
defineFunction({
	type: "cr",
	names: ["\\\\"],
	props: {
		numArgs: 0,
		numOptionalArgs: 0,
		allowedInText: true
	},
	handler(_ref, args, optArgs) {
		var { parser } = _ref;
		var size = parser.gullet.future().text === "[" ? parser.parseSizeGroup(true) : null;
		var newLine = !parser.settings.displayMode || !parser.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
		return {
			type: "cr",
			mode: parser.mode,
			newLine,
			size: size && assertNodeType(size, "size").value
		};
	},
	htmlBuilder(group, options) {
		var span = makeSpan(["mspace"], [], options);
		if (group.newLine) {
			span.classes.push("newline");
			if (group.size) span.style.marginTop = makeEm(calculateSize(group.size, options));
		}
		return span;
	},
	mathmlBuilder(group, options) {
		var node = new MathNode("mspace");
		if (group.newLine) {
			node.setAttribute("linebreak", "newline");
			if (group.size) node.setAttribute("height", makeEm(calculateSize(group.size, options)));
		}
		return node;
	}
});
var globalMap = {
	"\\global": "\\global",
	"\\long": "\\\\globallong",
	"\\\\globallong": "\\\\globallong",
	"\\def": "\\gdef",
	"\\gdef": "\\gdef",
	"\\edef": "\\xdef",
	"\\xdef": "\\xdef",
	"\\let": "\\\\globallet",
	"\\futurelet": "\\\\globalfuture"
};
var checkControlSequence = (tok) => {
	var name = tok.text;
	if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) throw new ParseError("Expected a control sequence", tok);
	return name;
};
var getRHS = (parser) => {
	var tok = parser.gullet.popToken();
	if (tok.text === "=") {
		tok = parser.gullet.popToken();
		if (tok.text === " ") tok = parser.gullet.popToken();
	}
	return tok;
};
var letCommand = (parser, name, tok, global) => {
	var macro = parser.gullet.macros.get(tok.text);
	if (macro == null) {
		tok.noexpand = true;
		macro = {
			tokens: [tok],
			numArgs: 0,
			unexpandable: !parser.gullet.isExpandable(tok.text)
		};
	}
	parser.gullet.macros.set(name, macro, global);
};
defineFunction({
	type: "internal",
	names: [
		"\\global",
		"\\long",
		"\\\\globallong"
	],
	props: {
		numArgs: 0,
		allowedInText: true
	},
	handler(_ref) {
		var { parser, funcName } = _ref;
		parser.consumeSpaces();
		var token = parser.fetch();
		if (globalMap[token.text]) {
			if (funcName === "\\global" || funcName === "\\\\globallong") token.text = globalMap[token.text];
			return assertNodeType(parser.parseFunction(), "internal");
		}
		throw new ParseError("Invalid token after macro prefix", token);
	}
});
defineFunction({
	type: "internal",
	names: [
		"\\def",
		"\\gdef",
		"\\edef",
		"\\xdef"
	],
	props: {
		numArgs: 0,
		allowedInText: true,
		primitive: true
	},
	handler(_ref2) {
		var { parser, funcName } = _ref2;
		var tok = parser.gullet.popToken();
		var name = tok.text;
		if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) throw new ParseError("Expected a control sequence", tok);
		var numArgs = 0;
		var insert;
		var delimiters = [[]];
		while (parser.gullet.future().text !== "{") {
			tok = parser.gullet.popToken();
			if (tok.text === "#") {
				if (parser.gullet.future().text === "{") {
					insert = parser.gullet.future();
					delimiters[numArgs].push("{");
					break;
				}
				tok = parser.gullet.popToken();
				if (!/^[1-9]$/.test(tok.text)) throw new ParseError("Invalid argument number \"" + tok.text + "\"");
				if (parseInt(tok.text) !== numArgs + 1) throw new ParseError("Argument number \"" + tok.text + "\" out of order");
				numArgs++;
				delimiters.push([]);
			} else if (tok.text === "EOF") throw new ParseError("Expected a macro definition");
			else delimiters[numArgs].push(tok.text);
		}
		var { tokens } = parser.gullet.consumeArg();
		if (insert) tokens.unshift(insert);
		if (funcName === "\\edef" || funcName === "\\xdef") {
			tokens = parser.gullet.expandTokens(tokens);
			tokens.reverse();
		}
		parser.gullet.macros.set(name, {
			tokens,
			numArgs,
			delimiters
		}, funcName === globalMap[funcName]);
		return {
			type: "internal",
			mode: parser.mode
		};
	}
});
defineFunction({
	type: "internal",
	names: ["\\let", "\\\\globallet"],
	props: {
		numArgs: 0,
		allowedInText: true,
		primitive: true
	},
	handler(_ref3) {
		var { parser, funcName } = _ref3;
		var name = checkControlSequence(parser.gullet.popToken());
		parser.gullet.consumeSpaces();
		letCommand(parser, name, getRHS(parser), funcName === "\\\\globallet");
		return {
			type: "internal",
			mode: parser.mode
		};
	}
});
defineFunction({
	type: "internal",
	names: ["\\futurelet", "\\\\globalfuture"],
	props: {
		numArgs: 0,
		allowedInText: true,
		primitive: true
	},
	handler(_ref4) {
		var { parser, funcName } = _ref4;
		var name = checkControlSequence(parser.gullet.popToken());
		var middle = parser.gullet.popToken();
		var tok = parser.gullet.popToken();
		letCommand(parser, name, tok, funcName === "\\\\globalfuture");
		parser.gullet.pushToken(tok);
		parser.gullet.pushToken(middle);
		return {
			type: "internal",
			mode: parser.mode
		};
	}
});
/**
* This file deals with creating delimiters of various sizes. The TeXbook
* discusses these routines on page 441-442, in the "Another subroutine sets box
* x to a specified variable delimiter" paragraph.
*
* There are three main routines here. `makeSmallDelim` makes a delimiter in the
* normal font, but in either text, script, or scriptscript style.
* `makeLargeDelim` makes a delimiter in textstyle, but in one of the Size1,
* Size2, Size3, or Size4 fonts. `makeStackedDelim` makes a delimiter out of
* smaller pieces that are stacked on top of one another.
*
* The functions take a parameter `center`, which determines if the delimiter
* should be centered around the axis.
*
* Then, there are three exposed functions. `sizedDelim` makes a delimiter in
* one of the given sizes. This is used for things like `\bigl`.
* `customSizedDelim` makes a delimiter with a given total height+depth. It is
* called in places like `\sqrt`. `leftRightDelim` makes an appropriate
* delimiter which surrounds an expression of a given height an depth. It is
* used in `\left` and `\right`.
*/
/**
* Get the metrics for a given symbol and font, after transformation (i.e.
* after following replacement from symbols.js)
*/
var getMetrics = function getMetrics(symbol, font, mode) {
	var metrics = getCharacterMetrics(symbols.math[symbol] && symbols.math[symbol].replace || symbol, font, mode);
	if (!metrics) throw new Error("Unsupported symbol " + symbol + " and font size " + font + ".");
	return metrics;
};
/**
* Puts a delimiter span in a given style, and adds appropriate height, depth,
* and maxFontSizes.
*/
var styleWrap = function styleWrap(delim, toStyle, options, classes) {
	var newOptions = options.havingBaseStyle(toStyle);
	var span = makeSpan(classes.concat(newOptions.sizingClasses(options)), [delim], options);
	var delimSizeMultiplier = newOptions.sizeMultiplier / options.sizeMultiplier;
	span.height *= delimSizeMultiplier;
	span.depth *= delimSizeMultiplier;
	span.maxFontSize = newOptions.sizeMultiplier;
	return span;
};
var centerSpan = function centerSpan(span, options, style) {
	var newOptions = options.havingBaseStyle(style);
	var shift = (1 - options.sizeMultiplier / newOptions.sizeMultiplier) * options.fontMetrics().axisHeight;
	span.classes.push("delimcenter");
	span.style.top = makeEm(shift);
	span.height -= shift;
	span.depth += shift;
};
/**
* Makes a small delimiter. This is a delimiter that comes in the Main-Regular
* font, but is restyled to either be in textstyle, scriptstyle, or
* scriptscriptstyle.
*/
var makeSmallDelim = function makeSmallDelim(delim, style, center, options, mode, classes) {
	var span = styleWrap(makeSymbol(delim, "Main-Regular", mode, options), style, options, classes);
	if (center) centerSpan(span, options, style);
	return span;
};
/**
* Builds a symbol in the given font size (note size is an integer)
*/
var mathrmSize = function mathrmSize(value, size, mode, options) {
	return makeSymbol(value, "Size" + size + "-Regular", mode, options);
};
/**
* Makes a large delimiter. This is a delimiter that comes in the Size1, Size2,
* Size3, or Size4 fonts. It is always rendered in textstyle.
*/
var makeLargeDelim = function makeLargeDelim(delim, size, center, options, mode, classes) {
	var inner = mathrmSize(delim, size, mode, options);
	var span = styleWrap(makeSpan(["delimsizing", "size" + size], [inner], options), Style$1.TEXT, options, classes);
	if (center) centerSpan(span, options, Style$1.TEXT);
	return span;
};
/**
* Make a span from a font glyph with the given offset and in the given font.
* This is used in makeStackedDelim to make the stacking pieces for the delimiter.
*/
var makeGlyphSpan = function makeGlyphSpan(symbol, font, mode) {
	var sizeClass;
	if (font === "Size1-Regular") sizeClass = "delim-size1";
	else sizeClass = "delim-size4";
	return {
		type: "elem",
		elem: makeSpan(["delimsizinginner", sizeClass], [makeSpan([], [makeSymbol(symbol, font, mode)])])
	};
};
var makeInner = function makeInner(ch, height, options) {
	var width = fontMetricsData["Size4-Regular"][ch.charCodeAt(0)] ? fontMetricsData["Size4-Regular"][ch.charCodeAt(0)][4] : fontMetricsData["Size1-Regular"][ch.charCodeAt(0)][4];
	var span = makeSvgSpan([], [new SvgNode([new PathNode("inner", innerPath(ch, Math.round(1e3 * height)))], {
		"width": makeEm(width),
		"height": makeEm(height),
		"style": "width:" + makeEm(width),
		"viewBox": "0 0 " + 1e3 * width + " " + Math.round(1e3 * height),
		"preserveAspectRatio": "xMinYMin"
	})], options);
	span.height = height;
	span.style.height = makeEm(height);
	span.style.width = makeEm(width);
	return {
		type: "elem",
		elem: span
	};
};
var lapInEms = .008;
var lap = {
	type: "kern",
	size: -1 * lapInEms
};
var verts = new Set([
	"|",
	"\\lvert",
	"\\rvert",
	"\\vert"
]);
var doubleVerts = new Set([
	"\\|",
	"\\lVert",
	"\\rVert",
	"\\Vert"
]);
/**
* Make a stacked delimiter out of a given delimiter, with the total height at
* least `heightTotal`. This routine is mentioned on page 442 of the TeXbook.
*/
var makeStackedDelim = function makeStackedDelim(delim, heightTotal, center, options, mode, classes) {
	var top;
	var middle;
	var repeat;
	var bottom;
	var svgLabel = "";
	var viewBoxWidth = 0;
	top = repeat = bottom = delim;
	middle = null;
	var font = "Size1-Regular";
	if (delim === "\\uparrow") repeat = bottom = "⏐";
	else if (delim === "\\Uparrow") repeat = bottom = "‖";
	else if (delim === "\\downarrow") top = repeat = "⏐";
	else if (delim === "\\Downarrow") top = repeat = "‖";
	else if (delim === "\\updownarrow") {
		top = "\\uparrow";
		repeat = "⏐";
		bottom = "\\downarrow";
	} else if (delim === "\\Updownarrow") {
		top = "\\Uparrow";
		repeat = "‖";
		bottom = "\\Downarrow";
	} else if (verts.has(delim)) {
		repeat = "∣";
		svgLabel = "vert";
		viewBoxWidth = 333;
	} else if (doubleVerts.has(delim)) {
		repeat = "∥";
		svgLabel = "doublevert";
		viewBoxWidth = 556;
	} else if (delim === "[" || delim === "\\lbrack") {
		top = "⎡";
		repeat = "⎢";
		bottom = "⎣";
		font = "Size4-Regular";
		svgLabel = "lbrack";
		viewBoxWidth = 667;
	} else if (delim === "]" || delim === "\\rbrack") {
		top = "⎤";
		repeat = "⎥";
		bottom = "⎦";
		font = "Size4-Regular";
		svgLabel = "rbrack";
		viewBoxWidth = 667;
	} else if (delim === "\\lfloor" || delim === "⌊") {
		repeat = top = "⎢";
		bottom = "⎣";
		font = "Size4-Regular";
		svgLabel = "lfloor";
		viewBoxWidth = 667;
	} else if (delim === "\\lceil" || delim === "⌈") {
		top = "⎡";
		repeat = bottom = "⎢";
		font = "Size4-Regular";
		svgLabel = "lceil";
		viewBoxWidth = 667;
	} else if (delim === "\\rfloor" || delim === "⌋") {
		repeat = top = "⎥";
		bottom = "⎦";
		font = "Size4-Regular";
		svgLabel = "rfloor";
		viewBoxWidth = 667;
	} else if (delim === "\\rceil" || delim === "⌉") {
		top = "⎤";
		repeat = bottom = "⎥";
		font = "Size4-Regular";
		svgLabel = "rceil";
		viewBoxWidth = 667;
	} else if (delim === "(" || delim === "\\lparen") {
		top = "⎛";
		repeat = "⎜";
		bottom = "⎝";
		font = "Size4-Regular";
		svgLabel = "lparen";
		viewBoxWidth = 875;
	} else if (delim === ")" || delim === "\\rparen") {
		top = "⎞";
		repeat = "⎟";
		bottom = "⎠";
		font = "Size4-Regular";
		svgLabel = "rparen";
		viewBoxWidth = 875;
	} else if (delim === "\\{" || delim === "\\lbrace") {
		top = "⎧";
		middle = "⎨";
		bottom = "⎩";
		repeat = "⎪";
		font = "Size4-Regular";
	} else if (delim === "\\}" || delim === "\\rbrace") {
		top = "⎫";
		middle = "⎬";
		bottom = "⎭";
		repeat = "⎪";
		font = "Size4-Regular";
	} else if (delim === "\\lgroup" || delim === "⟮") {
		top = "⎧";
		bottom = "⎩";
		repeat = "⎪";
		font = "Size4-Regular";
	} else if (delim === "\\rgroup" || delim === "⟯") {
		top = "⎫";
		bottom = "⎭";
		repeat = "⎪";
		font = "Size4-Regular";
	} else if (delim === "\\lmoustache" || delim === "⎰") {
		top = "⎧";
		bottom = "⎭";
		repeat = "⎪";
		font = "Size4-Regular";
	} else if (delim === "\\rmoustache" || delim === "⎱") {
		top = "⎫";
		bottom = "⎩";
		repeat = "⎪";
		font = "Size4-Regular";
	}
	var topMetrics = getMetrics(top, font, mode);
	var topHeightTotal = topMetrics.height + topMetrics.depth;
	var repeatMetrics = getMetrics(repeat, font, mode);
	var repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
	var bottomMetrics = getMetrics(bottom, font, mode);
	var bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
	var middleHeightTotal = 0;
	var middleFactor = 1;
	if (middle !== null) {
		var middleMetrics = getMetrics(middle, font, mode);
		middleHeightTotal = middleMetrics.height + middleMetrics.depth;
		middleFactor = 2;
	}
	var minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal;
	var realHeightTotal = minHeight + Math.max(0, Math.ceil((heightTotal - minHeight) / (middleFactor * repeatHeightTotal))) * middleFactor * repeatHeightTotal;
	var axisHeight = options.fontMetrics().axisHeight;
	if (center) axisHeight *= options.sizeMultiplier;
	var depth = realHeightTotal / 2 - axisHeight;
	var stack = [];
	if (svgLabel.length > 0) {
		var midHeight = realHeightTotal - topHeightTotal - bottomHeightTotal;
		var viewBoxHeight = Math.round(realHeightTotal * 1e3);
		var pathStr = tallDelim(svgLabel, Math.round(midHeight * 1e3));
		var path = new PathNode(svgLabel, pathStr);
		var width = (viewBoxWidth / 1e3).toFixed(3) + "em";
		var height = (viewBoxHeight / 1e3).toFixed(3) + "em";
		var wrapper = makeSvgSpan([], [new SvgNode([path], {
			"width": width,
			"height": height,
			"viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight
		})], options);
		wrapper.height = viewBoxHeight / 1e3;
		wrapper.style.width = width;
		wrapper.style.height = height;
		stack.push({
			type: "elem",
			elem: wrapper
		});
	} else {
		stack.push(makeGlyphSpan(bottom, font, mode));
		stack.push(lap);
		if (middle === null) {
			var innerHeight = realHeightTotal - topHeightTotal - bottomHeightTotal + 2 * lapInEms;
			stack.push(makeInner(repeat, innerHeight, options));
		} else {
			var _innerHeight = (realHeightTotal - topHeightTotal - bottomHeightTotal - middleHeightTotal) / 2 + 2 * lapInEms;
			stack.push(makeInner(repeat, _innerHeight, options));
			stack.push(lap);
			stack.push(makeGlyphSpan(middle, font, mode));
			stack.push(lap);
			stack.push(makeInner(repeat, _innerHeight, options));
		}
		stack.push(lap);
		stack.push(makeGlyphSpan(top, font, mode));
	}
	var newOptions = options.havingBaseStyle(Style$1.TEXT);
	return styleWrap(makeSpan(["delimsizing", "mult"], [makeVList({
		positionType: "bottom",
		positionData: depth,
		children: stack
	})], newOptions), Style$1.TEXT, options, classes);
};
var vbPad = 80;
var emPad = .08;
var sqrtSvg = function sqrtSvg(sqrtName, height, viewBoxHeight, extraVinculum, options) {
	return makeSvgSpan(["hide-tail"], [new SvgNode([new PathNode(sqrtName, sqrtPath(sqrtName, extraVinculum, viewBoxHeight))], {
		"width": "400em",
		"height": makeEm(height),
		"viewBox": "0 0 400000 " + viewBoxHeight,
		"preserveAspectRatio": "xMinYMin slice"
	})], options);
};
/**
* Make a sqrt image of the given height,
*/
var makeSqrtImage = function makeSqrtImage(height, options) {
	var newOptions = options.havingBaseSizing();
	var delim = traverseSequence("\\surd", height * newOptions.sizeMultiplier, stackLargeDelimiterSequence, newOptions);
	var sizeMultiplier = newOptions.sizeMultiplier;
	var extraVinculum = Math.max(0, options.minRuleThickness - options.fontMetrics().sqrtRuleThickness);
	var span;
	var spanHeight = 0;
	var texHeight = 0;
	var viewBoxHeight = 0;
	var advanceWidth;
	if (delim.type === "small") {
		viewBoxHeight = 1e3 + 1e3 * extraVinculum + vbPad;
		if (height < 1) sizeMultiplier = 1;
		else if (height < 1.4) sizeMultiplier = .7;
		spanHeight = (1 + extraVinculum + emPad) / sizeMultiplier;
		texHeight = (1 + extraVinculum) / sizeMultiplier;
		span = sqrtSvg("sqrtMain", spanHeight, viewBoxHeight, extraVinculum, options);
		span.style.minWidth = "0.853em";
		advanceWidth = .833 / sizeMultiplier;
	} else if (delim.type === "large") {
		viewBoxHeight = (1e3 + vbPad) * sizeToMaxHeight[delim.size];
		texHeight = (sizeToMaxHeight[delim.size] + extraVinculum) / sizeMultiplier;
		spanHeight = (sizeToMaxHeight[delim.size] + extraVinculum + emPad) / sizeMultiplier;
		span = sqrtSvg("sqrtSize" + delim.size, spanHeight, viewBoxHeight, extraVinculum, options);
		span.style.minWidth = "1.02em";
		advanceWidth = 1 / sizeMultiplier;
	} else {
		spanHeight = height + extraVinculum + emPad;
		texHeight = height + extraVinculum;
		viewBoxHeight = Math.floor(1e3 * height + extraVinculum) + vbPad;
		span = sqrtSvg("sqrtTall", spanHeight, viewBoxHeight, extraVinculum, options);
		span.style.minWidth = "0.742em";
		advanceWidth = 1.056;
	}
	span.height = texHeight;
	span.style.height = makeEm(spanHeight);
	return {
		span,
		advanceWidth,
		ruleWidth: (options.fontMetrics().sqrtRuleThickness + extraVinculum) * sizeMultiplier
	};
};
var stackLargeDelimiters = new Set([
	"(",
	"\\lparen",
	")",
	"\\rparen",
	"[",
	"\\lbrack",
	"]",
	"\\rbrack",
	"\\{",
	"\\lbrace",
	"\\}",
	"\\rbrace",
	"\\lfloor",
	"\\rfloor",
	"⌊",
	"⌋",
	"\\lceil",
	"\\rceil",
	"⌈",
	"⌉",
	"\\surd"
]);
var stackAlwaysDelimiters = new Set([
	"\\uparrow",
	"\\downarrow",
	"\\updownarrow",
	"\\Uparrow",
	"\\Downarrow",
	"\\Updownarrow",
	"|",
	"\\|",
	"\\vert",
	"\\Vert",
	"\\lvert",
	"\\rvert",
	"\\lVert",
	"\\rVert",
	"\\lgroup",
	"\\rgroup",
	"⟮",
	"⟯",
	"\\lmoustache",
	"\\rmoustache",
	"⎰",
	"⎱"
]);
var stackNeverDelimiters = new Set([
	"<",
	">",
	"\\langle",
	"\\rangle",
	"/",
	"\\backslash",
	"\\lt",
	"\\gt"
]);
var sizeToMaxHeight = [
	0,
	1.2,
	1.8,
	2.4,
	3
];
/**
* Used to create a delimiter of a specific size, where `size` is 1, 2, 3, or 4.
*/
var makeSizedDelim = function makeSizedDelim(delim, size, options, mode, classes) {
	if (delim === "<" || delim === "\\lt" || delim === "⟨") delim = "\\langle";
	else if (delim === ">" || delim === "\\gt" || delim === "⟩") delim = "\\rangle";
	if (stackLargeDelimiters.has(delim) || stackNeverDelimiters.has(delim)) return makeLargeDelim(delim, size, false, options, mode, classes);
	else if (stackAlwaysDelimiters.has(delim)) return makeStackedDelim(delim, sizeToMaxHeight[size], false, options, mode, classes);
	else throw new ParseError("Illegal delimiter: '" + delim + "'");
};
var stackNeverDelimiterSequence = [
	{
		type: "small",
		style: Style$1.SCRIPTSCRIPT
	},
	{
		type: "small",
		style: Style$1.SCRIPT
	},
	{
		type: "small",
		style: Style$1.TEXT
	},
	{
		type: "large",
		size: 1
	},
	{
		type: "large",
		size: 2
	},
	{
		type: "large",
		size: 3
	},
	{
		type: "large",
		size: 4
	}
];
var stackAlwaysDelimiterSequence = [
	{
		type: "small",
		style: Style$1.SCRIPTSCRIPT
	},
	{
		type: "small",
		style: Style$1.SCRIPT
	},
	{
		type: "small",
		style: Style$1.TEXT
	},
	{ type: "stack" }
];
var stackLargeDelimiterSequence = [
	{
		type: "small",
		style: Style$1.SCRIPTSCRIPT
	},
	{
		type: "small",
		style: Style$1.SCRIPT
	},
	{
		type: "small",
		style: Style$1.TEXT
	},
	{
		type: "large",
		size: 1
	},
	{
		type: "large",
		size: 2
	},
	{
		type: "large",
		size: 3
	},
	{
		type: "large",
		size: 4
	},
	{ type: "stack" }
];
/**
* Get the font used in a delimiter based on what kind of delimiter it is.
* TODO(#963) Use more specific font family return type once that is introduced.
*/
var delimTypeToFont = function delimTypeToFont(type) {
	if (type.type === "small") return "Main-Regular";
	else if (type.type === "large") return "Size" + type.size + "-Regular";
	else if (type.type === "stack") return "Size4-Regular";
	else {
		var delimKind = type.type;
		throw new Error("Add support for delim type '" + delimKind + "' here.");
	}
};
/**
* Traverse a sequence of types of delimiters to decide what kind of delimiter
* should be used to create a delimiter of the given height+depth.
*/
var traverseSequence = function traverseSequence(delim, height, sequence, options) {
	for (var i = Math.min(2, 3 - options.style.size); i < sequence.length; i++) {
		var delimType = sequence[i];
		if (delimType.type === "stack") break;
		var metrics = getMetrics(delim, delimTypeToFont(delimType), "math");
		var heightDepth = metrics.height + metrics.depth;
		if (delimType.type === "small") {
			var newOptions = options.havingBaseStyle(delimType.style);
			heightDepth *= newOptions.sizeMultiplier;
		}
		if (heightDepth > height) return delimType;
	}
	return sequence[sequence.length - 1];
};
/**
* Make a delimiter of a given height+depth, with optional centering. Here, we
* traverse the sequences, and create a delimiter that the sequence tells us to.
*/
var makeCustomSizedDelim = function makeCustomSizedDelim(delim, height, center, options, mode, classes) {
	if (delim === "<" || delim === "\\lt" || delim === "⟨") delim = "\\langle";
	else if (delim === ">" || delim === "\\gt" || delim === "⟩") delim = "\\rangle";
	var sequence;
	if (stackNeverDelimiters.has(delim)) sequence = stackNeverDelimiterSequence;
	else if (stackLargeDelimiters.has(delim)) sequence = stackLargeDelimiterSequence;
	else sequence = stackAlwaysDelimiterSequence;
	var delimType = traverseSequence(delim, height, sequence, options);
	if (delimType.type === "small") return makeSmallDelim(delim, delimType.style, center, options, mode, classes);
	else if (delimType.type === "large") return makeLargeDelim(delim, delimType.size, center, options, mode, classes);
	else return makeStackedDelim(delim, height, center, options, mode, classes);
};
/**
* Make a delimiter for use with `\left` and `\right`, given a height and depth
* of an expression that the delimiters surround.
*/
var makeLeftRightDelim = function makeLeftRightDelim(delim, height, depth, options, mode, classes) {
	var axisHeight = options.fontMetrics().axisHeight * options.sizeMultiplier;
	var delimiterFactor = 901;
	var delimiterExtend = 5 / options.fontMetrics().ptPerEm;
	var maxDistFromAxis = Math.max(height - axisHeight, depth + axisHeight);
	return makeCustomSizedDelim(delim, Math.max(maxDistFromAxis / 500 * delimiterFactor, 2 * maxDistFromAxis - delimiterExtend), true, options, mode, classes);
};
var delimiterSizes = {
	"\\bigl": {
		mclass: "mopen",
		size: 1
	},
	"\\Bigl": {
		mclass: "mopen",
		size: 2
	},
	"\\biggl": {
		mclass: "mopen",
		size: 3
	},
	"\\Biggl": {
		mclass: "mopen",
		size: 4
	},
	"\\bigr": {
		mclass: "mclose",
		size: 1
	},
	"\\Bigr": {
		mclass: "mclose",
		size: 2
	},
	"\\biggr": {
		mclass: "mclose",
		size: 3
	},
	"\\Biggr": {
		mclass: "mclose",
		size: 4
	},
	"\\bigm": {
		mclass: "mrel",
		size: 1
	},
	"\\Bigm": {
		mclass: "mrel",
		size: 2
	},
	"\\biggm": {
		mclass: "mrel",
		size: 3
	},
	"\\Biggm": {
		mclass: "mrel",
		size: 4
	},
	"\\big": {
		mclass: "mord",
		size: 1
	},
	"\\Big": {
		mclass: "mord",
		size: 2
	},
	"\\bigg": {
		mclass: "mord",
		size: 3
	},
	"\\Bigg": {
		mclass: "mord",
		size: 4
	}
};
var delimiters = new Set([
	"(",
	"\\lparen",
	")",
	"\\rparen",
	"[",
	"\\lbrack",
	"]",
	"\\rbrack",
	"\\{",
	"\\lbrace",
	"\\}",
	"\\rbrace",
	"\\lfloor",
	"\\rfloor",
	"⌊",
	"⌋",
	"\\lceil",
	"\\rceil",
	"⌈",
	"⌉",
	"<",
	">",
	"\\langle",
	"⟨",
	"\\rangle",
	"⟩",
	"\\lt",
	"\\gt",
	"\\lvert",
	"\\rvert",
	"\\lVert",
	"\\rVert",
	"\\lgroup",
	"\\rgroup",
	"⟮",
	"⟯",
	"\\lmoustache",
	"\\rmoustache",
	"⎰",
	"⎱",
	"/",
	"\\backslash",
	"|",
	"\\vert",
	"\\|",
	"\\Vert",
	"\\uparrow",
	"\\Uparrow",
	"\\downarrow",
	"\\Downarrow",
	"\\updownarrow",
	"\\Updownarrow",
	"."
]);
function checkDelimiter(delim, context) {
	var symDelim = checkSymbolNodeType(delim);
	if (symDelim && delimiters.has(symDelim.text)) return symDelim;
	else if (symDelim) throw new ParseError("Invalid delimiter '" + symDelim.text + "' after '" + context.funcName + "'", delim);
	else throw new ParseError("Invalid delimiter type '" + delim.type + "'", delim);
}
defineFunction({
	type: "delimsizing",
	names: [
		"\\bigl",
		"\\Bigl",
		"\\biggl",
		"\\Biggl",
		"\\bigr",
		"\\Bigr",
		"\\biggr",
		"\\Biggr",
		"\\bigm",
		"\\Bigm",
		"\\biggm",
		"\\Biggm",
		"\\big",
		"\\Big",
		"\\bigg",
		"\\Bigg"
	],
	props: {
		numArgs: 1,
		argTypes: ["primitive"]
	},
	handler: (context, args) => {
		var delim = checkDelimiter(args[0], context);
		return {
			type: "delimsizing",
			mode: context.parser.mode,
			size: delimiterSizes[context.funcName].size,
			mclass: delimiterSizes[context.funcName].mclass,
			delim: delim.text
		};
	},
	htmlBuilder: (group, options) => {
		if (group.delim === ".") return makeSpan([group.mclass]);
		return makeSizedDelim(group.delim, group.size, options, group.mode, [group.mclass]);
	},
	mathmlBuilder: (group) => {
		var children = [];
		if (group.delim !== ".") children.push(makeText(group.delim, group.mode));
		var node = new MathNode("mo", children);
		if (group.mclass === "mopen" || group.mclass === "mclose") node.setAttribute("fence", "true");
		else node.setAttribute("fence", "false");
		node.setAttribute("stretchy", "true");
		var size = makeEm(sizeToMaxHeight[group.size]);
		node.setAttribute("minsize", size);
		node.setAttribute("maxsize", size);
		return node;
	}
});
function assertParsed(group) {
	if (!group.body) throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
defineFunction({
	type: "leftright-right",
	names: ["\\right"],
	props: {
		numArgs: 1,
		primitive: true
	},
	handler: (context, args) => {
		var color = context.parser.gullet.macros.get("\\current@color");
		if (color && typeof color !== "string") throw new ParseError("\\current@color set to non-string in \\right");
		return {
			type: "leftright-right",
			mode: context.parser.mode,
			delim: checkDelimiter(args[0], context).text,
			color
		};
	}
});
defineFunction({
	type: "leftright",
	names: ["\\left"],
	props: {
		numArgs: 1,
		primitive: true
	},
	handler: (context, args) => {
		var delim = checkDelimiter(args[0], context);
		var parser = context.parser;
		++parser.leftrightDepth;
		var body = parser.parseExpression(false);
		--parser.leftrightDepth;
		parser.expect("\\right", false);
		var right = assertNodeType(parser.parseFunction(), "leftright-right");
		return {
			type: "leftright",
			mode: parser.mode,
			body,
			left: delim.text,
			right: right.delim,
			rightColor: right.color
		};
	},
	htmlBuilder: (group, options) => {
		assertParsed(group);
		var inner = buildExpression$1(group.body, options, true, ["mopen", "mclose"]);
		var innerHeight = 0;
		var innerDepth = 0;
		var hadMiddle = false;
		for (var i = 0; i < inner.length; i++) if (inner[i].isMiddle) hadMiddle = true;
		else {
			innerHeight = Math.max(inner[i].height, innerHeight);
			innerDepth = Math.max(inner[i].depth, innerDepth);
		}
		innerHeight *= options.sizeMultiplier;
		innerDepth *= options.sizeMultiplier;
		var leftDelim;
		if (group.left === ".") leftDelim = makeNullDelimiter(options, ["mopen"]);
		else leftDelim = makeLeftRightDelim(group.left, innerHeight, innerDepth, options, group.mode, ["mopen"]);
		inner.unshift(leftDelim);
		if (hadMiddle) for (var _i = 1; _i < inner.length; _i++) {
			var isMiddle = inner[_i].isMiddle;
			if (isMiddle) inner[_i] = makeLeftRightDelim(isMiddle.delim, innerHeight, innerDepth, isMiddle.options, group.mode, []);
		}
		var rightDelim;
		if (group.right === ".") rightDelim = makeNullDelimiter(options, ["mclose"]);
		else {
			var colorOptions = group.rightColor ? options.withColor(group.rightColor) : options;
			rightDelim = makeLeftRightDelim(group.right, innerHeight, innerDepth, colorOptions, group.mode, ["mclose"]);
		}
		inner.push(rightDelim);
		return makeSpan(["minner"], inner, options);
	},
	mathmlBuilder: (group, options) => {
		assertParsed(group);
		var inner = buildExpression(group.body, options);
		if (group.left !== ".") {
			var leftNode = new MathNode("mo", [makeText(group.left, group.mode)]);
			leftNode.setAttribute("fence", "true");
			inner.unshift(leftNode);
		}
		if (group.right !== ".") {
			var rightNode = new MathNode("mo", [makeText(group.right, group.mode)]);
			rightNode.setAttribute("fence", "true");
			if (group.rightColor) rightNode.setAttribute("mathcolor", group.rightColor);
			inner.push(rightNode);
		}
		return makeRow(inner);
	}
});
defineFunction({
	type: "middle",
	names: ["\\middle"],
	props: {
		numArgs: 1,
		primitive: true
	},
	handler: (context, args) => {
		var delim = checkDelimiter(args[0], context);
		if (!context.parser.leftrightDepth) throw new ParseError("\\middle without preceding \\left", delim);
		return {
			type: "middle",
			mode: context.parser.mode,
			delim: delim.text
		};
	},
	htmlBuilder: (group, options) => {
		var middleDelim;
		if (group.delim === ".") middleDelim = makeNullDelimiter(options, []);
		else {
			middleDelim = makeSizedDelim(group.delim, 1, options, group.mode, []);
			var isMiddle = {
				delim: group.delim,
				options
			};
			middleDelim.isMiddle = isMiddle;
		}
		return middleDelim;
	},
	mathmlBuilder: (group, options) => {
		var middleNode = new MathNode("mo", [group.delim === "\\vert" || group.delim === "|" ? makeText("|", "text") : makeText(group.delim, group.mode)]);
		middleNode.setAttribute("fence", "true");
		middleNode.setAttribute("lspace", "0.05em");
		middleNode.setAttribute("rspace", "0.05em");
		return middleNode;
	}
});
var htmlBuilder$7 = (group, options) => {
	var inner = wrapFragment(buildGroup$1(group.body, options), options);
	var label = group.label.slice(1);
	var scale = options.sizeMultiplier;
	var img;
	var imgShift = 0;
	var isSingleChar = isCharacterBox(group.body);
	if (label === "sout") {
		img = makeSpan(["stretchy", "sout"]);
		img.height = options.fontMetrics().defaultRuleThickness / scale;
		imgShift = -.5 * options.fontMetrics().xHeight;
	} else if (label === "phase") {
		var lineWeight = calculateSize({
			number: .6,
			unit: "pt"
		}, options);
		var clearance = calculateSize({
			number: .35,
			unit: "ex"
		}, options);
		var newOptions = options.havingBaseSizing();
		scale = scale / newOptions.sizeMultiplier;
		var angleHeight = inner.height + inner.depth + lineWeight + clearance;
		inner.style.paddingLeft = makeEm(angleHeight / 2 + lineWeight);
		var viewBoxHeight = Math.floor(1e3 * angleHeight * scale);
		img = makeSvgSpan(["hide-tail"], [new SvgNode([new PathNode("phase", phasePath(viewBoxHeight))], {
			"width": "400em",
			"height": makeEm(viewBoxHeight / 1e3),
			"viewBox": "0 0 400000 " + viewBoxHeight,
			"preserveAspectRatio": "xMinYMin slice"
		})], options);
		img.style.height = makeEm(angleHeight);
		imgShift = inner.depth + lineWeight + clearance;
	} else {
		if (/cancel/.test(label)) {
			if (!isSingleChar) inner.classes.push("cancel-pad");
		} else if (label === "angl") inner.classes.push("anglpad");
		else inner.classes.push("boxpad");
		var topPad = 0;
		var bottomPad = 0;
		var ruleThickness = 0;
		if (/box/.test(label)) {
			ruleThickness = Math.max(options.fontMetrics().fboxrule, options.minRuleThickness);
			topPad = options.fontMetrics().fboxsep + (label === "colorbox" ? 0 : ruleThickness);
			bottomPad = topPad;
		} else if (label === "angl") {
			ruleThickness = Math.max(options.fontMetrics().defaultRuleThickness, options.minRuleThickness);
			topPad = 4 * ruleThickness;
			bottomPad = Math.max(0, .25 - inner.depth);
		} else {
			topPad = isSingleChar ? .2 : 0;
			bottomPad = topPad;
		}
		img = stretchyEnclose(inner, label, topPad, bottomPad, options);
		if (/fbox|boxed|fcolorbox/.test(label)) {
			img.style.borderStyle = "solid";
			img.style.borderWidth = makeEm(ruleThickness);
		} else if (label === "angl" && ruleThickness !== .049) {
			img.style.borderTopWidth = makeEm(ruleThickness);
			img.style.borderRightWidth = makeEm(ruleThickness);
		}
		imgShift = inner.depth + bottomPad;
		if (group.backgroundColor) {
			img.style.backgroundColor = group.backgroundColor;
			if (group.borderColor) img.style.borderColor = group.borderColor;
		}
	}
	var vlist;
	if (group.backgroundColor) vlist = makeVList({
		positionType: "individualShift",
		children: [{
			type: "elem",
			elem: img,
			shift: imgShift
		}, {
			type: "elem",
			elem: inner,
			shift: 0
		}]
	});
	else {
		var classes = /cancel|phase/.test(label) ? ["svg-align"] : [];
		vlist = makeVList({
			positionType: "individualShift",
			children: [{
				type: "elem",
				elem: inner,
				shift: 0
			}, {
				type: "elem",
				elem: img,
				shift: imgShift,
				wrapperClasses: classes
			}]
		});
	}
	if (/cancel/.test(label)) {
		vlist.height = inner.height;
		vlist.depth = inner.depth;
	}
	if (/cancel/.test(label) && !isSingleChar) return makeSpan(["mord", "cancel-lap"], [vlist], options);
	else return makeSpan(["mord"], [vlist], options);
};
var mathmlBuilder$6 = (group, options) => {
	var fboxsep = 0;
	var node = new MathNode(group.label.includes("colorbox") ? "mpadded" : "menclose", [buildGroup(group.body, options)]);
	switch (group.label) {
		case "\\cancel":
			node.setAttribute("notation", "updiagonalstrike");
			break;
		case "\\bcancel":
			node.setAttribute("notation", "downdiagonalstrike");
			break;
		case "\\phase":
			node.setAttribute("notation", "phasorangle");
			break;
		case "\\sout":
			node.setAttribute("notation", "horizontalstrike");
			break;
		case "\\fbox":
			node.setAttribute("notation", "box");
			break;
		case "\\angl":
			node.setAttribute("notation", "actuarial");
			break;
		case "\\fcolorbox":
		case "\\colorbox":
			fboxsep = options.fontMetrics().fboxsep * options.fontMetrics().ptPerEm;
			node.setAttribute("width", "+" + 2 * fboxsep + "pt");
			node.setAttribute("height", "+" + 2 * fboxsep + "pt");
			node.setAttribute("lspace", fboxsep + "pt");
			node.setAttribute("voffset", fboxsep + "pt");
			if (group.label === "\\fcolorbox") {
				var thk = Math.max(options.fontMetrics().fboxrule, options.minRuleThickness);
				node.setAttribute("style", "border: " + thk + "em solid " + String(group.borderColor));
			}
			break;
		case "\\xcancel":
			node.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
			break;
	}
	if (group.backgroundColor) node.setAttribute("mathbackground", group.backgroundColor);
	return node;
};
defineFunction({
	type: "enclose",
	names: ["\\colorbox"],
	props: {
		numArgs: 2,
		allowedInText: true,
		argTypes: ["color", "text"]
	},
	handler(_ref, args, optArgs) {
		var { parser, funcName } = _ref;
		var color = assertNodeType(args[0], "color-token").color;
		var body = args[1];
		return {
			type: "enclose",
			mode: parser.mode,
			label: funcName,
			backgroundColor: color,
			body
		};
	},
	htmlBuilder: htmlBuilder$7,
	mathmlBuilder: mathmlBuilder$6
});
defineFunction({
	type: "enclose",
	names: ["\\fcolorbox"],
	props: {
		numArgs: 3,
		allowedInText: true,
		argTypes: [
			"color",
			"color",
			"text"
		]
	},
	handler(_ref2, args, optArgs) {
		var { parser, funcName } = _ref2;
		var borderColor = assertNodeType(args[0], "color-token").color;
		var backgroundColor = assertNodeType(args[1], "color-token").color;
		var body = args[2];
		return {
			type: "enclose",
			mode: parser.mode,
			label: funcName,
			backgroundColor,
			borderColor,
			body
		};
	},
	htmlBuilder: htmlBuilder$7,
	mathmlBuilder: mathmlBuilder$6
});
defineFunction({
	type: "enclose",
	names: ["\\fbox"],
	props: {
		numArgs: 1,
		argTypes: ["hbox"],
		allowedInText: true
	},
	handler(_ref3, args) {
		var { parser } = _ref3;
		return {
			type: "enclose",
			mode: parser.mode,
			label: "\\fbox",
			body: args[0]
		};
	}
});
defineFunction({
	type: "enclose",
	names: [
		"\\cancel",
		"\\bcancel",
		"\\xcancel",
		"\\sout",
		"\\phase"
	],
	props: { numArgs: 1 },
	handler(_ref4, args) {
		var { parser, funcName } = _ref4;
		var body = args[0];
		return {
			type: "enclose",
			mode: parser.mode,
			label: funcName,
			body
		};
	},
	htmlBuilder: htmlBuilder$7,
	mathmlBuilder: mathmlBuilder$6
});
defineFunction({
	type: "enclose",
	names: ["\\angl"],
	props: {
		numArgs: 1,
		argTypes: ["hbox"],
		allowedInText: false
	},
	handler(_ref5, args) {
		var { parser } = _ref5;
		return {
			type: "enclose",
			mode: parser.mode,
			label: "\\angl",
			body: args[0]
		};
	}
});
/**
* All registered environments.
* `environments.js` exports this same dictionary again and makes it public.
* `Parser.js` requires this dictionary via `environments.js`.
*/
var _environments = {};
function defineEnvironment(_ref) {
	var { type, names, props, handler, htmlBuilder, mathmlBuilder } = _ref;
	var data = {
		type,
		numArgs: props.numArgs || 0,
		allowedInText: false,
		numOptionalArgs: 0,
		handler
	};
	for (var i = 0; i < names.length; ++i) _environments[names[i]] = data;
	if (htmlBuilder) _htmlGroupBuilders[type] = htmlBuilder;
	if (mathmlBuilder) _mathmlGroupBuilders[type] = mathmlBuilder;
}
/**
* All registered global/built-in macros.
* `macros.js` exports this same dictionary again and makes it public.
* `Parser.js` requires this dictionary via `macros.js`.
*/
var _macros = {};
function defineMacro(name, body) {
	_macros[name] = body;
}
/**
* Lexing or parsing positional information for error reporting.
* This object is immutable.
*/
var SourceLocation = class SourceLocation {
	constructor(lexer, start, end) {
		this.lexer = lexer;
		this.start = start;
		this.end = end;
	}
	/**
	* Merges two `SourceLocation`s from location providers, given they are
	* provided in order of appearance.
	* - Returns the first one's location if only the first is provided.
	* - Returns a merged range of the first and the last if both are provided
	*   and their lexers match.
	* - Otherwise, returns null.
	*/
	static range(first, second) {
		if (!second) return first && first.loc;
		else if (!first || !first.loc || !second.loc || first.loc.lexer !== second.loc.lexer) return null;
		else return new SourceLocation(first.loc.lexer, first.loc.start, second.loc.end);
	}
};
/**
* The resulting token returned from `lex`.
*
* It consists of the token text plus some position information.
* The position information is essentially a range in an input string,
* but instead of referencing the bare input string, we refer to the lexer.
* That way it is possible to attach extra metadata to the input string,
* like for example a file name or similar.
*
* The position information is optional, so it is OK to construct synthetic
* tokens if appropriate. Not providing available position information may
* lead to degraded error reporting, though.
*/
var Token = class Token {
	constructor(text, loc) {
		this.text = text;
		this.loc = loc;
	}
	/**
	* Given a pair of tokens (this and endToken), compute a `Token` encompassing
	* the whole input range enclosed by these two.
	*/
	range(endToken, text) {
		return new Token(text, SourceLocation.range(this, endToken));
	}
};
function getHLines(parser) {
	var hlineInfo = [];
	parser.consumeSpaces();
	var nxt = parser.fetch().text;
	if (nxt === "\\relax") {
		parser.consume();
		parser.consumeSpaces();
		nxt = parser.fetch().text;
	}
	while (nxt === "\\hline" || nxt === "\\hdashline") {
		parser.consume();
		hlineInfo.push(nxt === "\\hdashline");
		parser.consumeSpaces();
		nxt = parser.fetch().text;
	}
	return hlineInfo;
}
var validateAmsEnvironmentContext = (context) => {
	if (!context.parser.settings.displayMode) throw new ParseError("{" + context.envName + "} can be used only in display mode.");
};
var gatherEnvironments = new Set(["gather", "gather*"]);
function getAutoTag(name) {
	if (!name.includes("ed")) return !name.includes("*");
}
/**
* Parse the body of the environment, with rows delimited by \\ and
* columns delimited by &, and create a nested list in row-major order
* with one group per cell.  If given an optional argument style
* ("text", "display", etc.), then each cell is cast into that style.
*/
function parseArray(parser, _ref, style) {
	var { hskipBeforeAndAfter, addJot, cols, arraystretch, colSeparationType, autoTag, singleRow, emptySingleRow, maxNumCols, leqno } = _ref;
	parser.gullet.beginGroup();
	if (!singleRow) parser.gullet.macros.set("\\cr", "\\\\\\relax");
	if (!arraystretch) {
		var stretch = parser.gullet.expandMacroAsText("\\arraystretch");
		if (stretch == null) arraystretch = 1;
		else {
			arraystretch = parseFloat(stretch);
			if (!arraystretch || arraystretch < 0) throw new ParseError("Invalid \\arraystretch: " + stretch);
		}
	}
	parser.gullet.beginGroup();
	var row = [];
	var body = [row];
	var rowGaps = [];
	var hLinesBeforeRow = [];
	var tags = autoTag != null ? [] : void 0;
	function beginRow() {
		if (autoTag) parser.gullet.macros.set("\\@eqnsw", "1", true);
	}
	function endRow() {
		if (tags) if (parser.gullet.macros.get("\\df@tag")) {
			tags.push(parser.subparse([new Token("\\df@tag")]));
			parser.gullet.macros.set("\\df@tag", void 0, true);
		} else tags.push(Boolean(autoTag) && parser.gullet.macros.get("\\@eqnsw") === "1");
	}
	beginRow();
	hLinesBeforeRow.push(getHLines(parser));
	while (true) {
		var cellBody = parser.parseExpression(false, singleRow ? "\\end" : "\\\\");
		parser.gullet.endGroup();
		parser.gullet.beginGroup();
		var cell = {
			type: "ordgroup",
			mode: parser.mode,
			body: cellBody
		};
		if (style) cell = {
			type: "styling",
			mode: parser.mode,
			style,
			body: [cell]
		};
		row.push(cell);
		var next = parser.fetch().text;
		if (next === "&") {
			if (maxNumCols && row.length === maxNumCols) if (singleRow || colSeparationType) throw new ParseError("Too many tab characters: &", parser.nextToken);
			else parser.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
			parser.consume();
		} else if (next === "\\end") {
			endRow();
			if (row.length === 1 && cell.type === "styling" && cell.body.length === 1 && cell.body[0].type === "ordgroup" && cell.body[0].body.length === 0 && (body.length > 1 || !emptySingleRow)) body.pop();
			if (hLinesBeforeRow.length < body.length + 1) hLinesBeforeRow.push([]);
			break;
		} else if (next === "\\\\") {
			parser.consume();
			var size = void 0;
			if (parser.gullet.future().text !== " ") size = parser.parseSizeGroup(true);
			rowGaps.push(size ? size.value : null);
			endRow();
			hLinesBeforeRow.push(getHLines(parser));
			row = [];
			body.push(row);
			beginRow();
		} else throw new ParseError("Expected & or \\\\ or \\cr or \\end", parser.nextToken);
	}
	parser.gullet.endGroup();
	parser.gullet.endGroup();
	return {
		type: "array",
		mode: parser.mode,
		addJot,
		arraystretch,
		body,
		cols,
		rowGaps,
		hskipBeforeAndAfter,
		hLinesBeforeRow,
		colSeparationType,
		tags,
		leqno
	};
}
function dCellStyle(envName) {
	if (envName.slice(0, 1) === "d") return "display";
	else return "text";
}
var htmlBuilder$6 = function htmlBuilder(group, options) {
	var r;
	var c;
	var nr = group.body.length;
	var hLinesBeforeRow = group.hLinesBeforeRow;
	var nc = 0;
	var body = new Array(nr);
	var hlines = [];
	var ruleThickness = Math.max(options.fontMetrics().arrayRuleWidth, options.minRuleThickness);
	var pt = 1 / options.fontMetrics().ptPerEm;
	var arraycolsep = 5 * pt;
	if (group.colSeparationType && group.colSeparationType === "small") arraycolsep = .2778 * (options.havingStyle(Style$1.SCRIPT).sizeMultiplier / options.sizeMultiplier);
	var baselineskip = group.colSeparationType === "CD" ? calculateSize({
		number: 3,
		unit: "ex"
	}, options) : 12 * pt;
	var jot = 3 * pt;
	var arrayskip = group.arraystretch * baselineskip;
	var arstrutHeight = .7 * arrayskip;
	var arstrutDepth = .3 * arrayskip;
	var totalHeight = 0;
	function setHLinePos(hlinesInGap) {
		for (var i = 0; i < hlinesInGap.length; ++i) {
			if (i > 0) totalHeight += .25;
			hlines.push({
				pos: totalHeight,
				isDashed: hlinesInGap[i]
			});
		}
	}
	setHLinePos(hLinesBeforeRow[0]);
	for (r = 0; r < group.body.length; ++r) {
		var inrow = group.body[r];
		var height = arstrutHeight;
		var depth = arstrutDepth;
		if (nc < inrow.length) nc = inrow.length;
		var outrow = new Array(inrow.length);
		for (c = 0; c < inrow.length; ++c) {
			var elt = buildGroup$1(inrow[c], options);
			if (depth < elt.depth) depth = elt.depth;
			if (height < elt.height) height = elt.height;
			outrow[c] = elt;
		}
		var rowGap = group.rowGaps[r];
		var gap = 0;
		if (rowGap) {
			gap = calculateSize(rowGap, options);
			if (gap > 0) {
				gap += arstrutDepth;
				if (depth < gap) depth = gap;
				gap = 0;
			}
		}
		if (group.addJot) depth += jot;
		outrow.height = height;
		outrow.depth = depth;
		totalHeight += height;
		outrow.pos = totalHeight;
		totalHeight += depth + gap;
		body[r] = outrow;
		setHLinePos(hLinesBeforeRow[r + 1]);
	}
	var offset = totalHeight / 2 + options.fontMetrics().axisHeight;
	var colDescriptions = group.cols || [];
	var cols = [];
	var colSep;
	var colDescrNum;
	var tagSpans = [];
	if (group.tags && group.tags.some((tag) => tag)) for (r = 0; r < nr; ++r) {
		var rw = body[r];
		var shift = rw.pos - offset;
		var tag = group.tags[r];
		var tagSpan = void 0;
		if (tag === true) tagSpan = makeSpan(["eqn-num"], [], options);
		else if (tag === false) tagSpan = makeSpan([], [], options);
		else tagSpan = makeSpan([], buildExpression$1(tag, options, true), options);
		tagSpan.depth = rw.depth;
		tagSpan.height = rw.height;
		tagSpans.push({
			type: "elem",
			elem: tagSpan,
			shift
		});
	}
	for (c = 0, colDescrNum = 0; c < nc || colDescrNum < colDescriptions.length; ++c, ++colDescrNum) {
		var _colDescr3;
		var colDescr = colDescriptions[colDescrNum];
		var firstSeparator = true;
		while (((_colDescr = colDescr) == null ? void 0 : _colDescr.type) === "separator") {
			var _colDescr;
			if (!firstSeparator) {
				colSep = makeSpan(["arraycolsep"], []);
				colSep.style.width = makeEm(options.fontMetrics().doubleRuleSep);
				cols.push(colSep);
			}
			if (colDescr.separator === "|" || colDescr.separator === ":") {
				var lineType = colDescr.separator === "|" ? "solid" : "dashed";
				var separator = makeSpan(["vertical-separator"], [], options);
				separator.style.height = makeEm(totalHeight);
				separator.style.borderRightWidth = makeEm(ruleThickness);
				separator.style.borderRightStyle = lineType;
				separator.style.margin = "0 " + makeEm(-ruleThickness / 2);
				var _shift = totalHeight - offset;
				if (_shift) separator.style.verticalAlign = makeEm(-_shift);
				cols.push(separator);
			} else throw new ParseError("Invalid separator type: " + colDescr.separator);
			colDescrNum++;
			colDescr = colDescriptions[colDescrNum];
			firstSeparator = false;
		}
		if (c >= nc) continue;
		var sepwidth = void 0;
		if (c > 0 || group.hskipBeforeAndAfter) {
			var _colDescr$pregap, _colDescr2;
			sepwidth = (_colDescr$pregap = (_colDescr2 = colDescr) == null ? void 0 : _colDescr2.pregap) != null ? _colDescr$pregap : arraycolsep;
			if (sepwidth !== 0) {
				colSep = makeSpan(["arraycolsep"], []);
				colSep.style.width = makeEm(sepwidth);
				cols.push(colSep);
			}
		}
		var colElems = [];
		for (r = 0; r < nr; ++r) {
			var row = body[r];
			var elem = row[c];
			if (!elem) continue;
			var _shift2 = row.pos - offset;
			elem.depth = row.depth;
			elem.height = row.height;
			colElems.push({
				type: "elem",
				elem,
				shift: _shift2
			});
		}
		var colVList = makeVList({
			positionType: "individualShift",
			children: colElems
		});
		var colSpan = makeSpan(["col-align-" + (((_colDescr3 = colDescr) == null ? void 0 : _colDescr3.align) || "c")], [colVList]);
		cols.push(colSpan);
		if (c < nc - 1 || group.hskipBeforeAndAfter) {
			var _colDescr$postgap, _colDescr4;
			sepwidth = (_colDescr$postgap = (_colDescr4 = colDescr) == null ? void 0 : _colDescr4.postgap) != null ? _colDescr$postgap : arraycolsep;
			if (sepwidth !== 0) {
				colSep = makeSpan(["arraycolsep"], []);
				colSep.style.width = makeEm(sepwidth);
				cols.push(colSep);
			}
		}
	}
	var tableBody = makeSpan(["mtable"], cols);
	if (hlines.length > 0) {
		var line = makeLineSpan("hline", options, ruleThickness);
		var dashes = makeLineSpan("hdashline", options, ruleThickness);
		var vListElems = [{
			type: "elem",
			elem: tableBody,
			shift: 0
		}];
		while (hlines.length > 0) {
			var hline = hlines.pop();
			var lineShift = hline.pos - offset;
			if (hline.isDashed) vListElems.push({
				type: "elem",
				elem: dashes,
				shift: lineShift
			});
			else vListElems.push({
				type: "elem",
				elem: line,
				shift: lineShift
			});
		}
		tableBody = makeVList({
			positionType: "individualShift",
			children: vListElems
		});
	}
	if (tagSpans.length === 0) return makeSpan(["mord"], [tableBody], options);
	else {
		var tagCol = makeSpan(["tag"], [makeVList({
			positionType: "individualShift",
			children: tagSpans
		})], options);
		return makeFragment([tableBody, tagCol]);
	}
};
var alignMap = {
	c: "center ",
	l: "left ",
	r: "right "
};
var mathmlBuilder$5 = function mathmlBuilder(group, options) {
	var tbl = [];
	var glue = new MathNode("mtd", [], ["mtr-glue"]);
	var tag = new MathNode("mtd", [], ["mml-eqn-num"]);
	for (var i = 0; i < group.body.length; i++) {
		var rw = group.body[i];
		var row = [];
		for (var j = 0; j < rw.length; j++) row.push(new MathNode("mtd", [buildGroup(rw[j], options)]));
		if (group.tags && group.tags[i]) {
			row.unshift(glue);
			row.push(glue);
			if (group.leqno) row.unshift(tag);
			else row.push(tag);
		}
		tbl.push(new MathNode("mtr", row));
	}
	var table = new MathNode("mtable", tbl);
	var gap = group.arraystretch === .5 ? .1 : .16 + group.arraystretch - 1 + (group.addJot ? .09 : 0);
	table.setAttribute("rowspacing", makeEm(gap));
	var menclose = "";
	var align = "";
	if (group.cols && group.cols.length > 0) {
		var cols = group.cols;
		var columnLines = "";
		var prevTypeWasAlign = false;
		var iStart = 0;
		var iEnd = cols.length;
		if (cols[0].type === "separator") {
			menclose += "top ";
			iStart = 1;
		}
		if (cols[cols.length - 1].type === "separator") {
			menclose += "bottom ";
			iEnd -= 1;
		}
		for (var _i = iStart; _i < iEnd; _i++) {
			var col = cols[_i];
			if (col.type === "align") {
				align += alignMap[col.align];
				if (prevTypeWasAlign) columnLines += "none ";
				prevTypeWasAlign = true;
			} else if (col.type === "separator") {
				if (prevTypeWasAlign) {
					columnLines += col.separator === "|" ? "solid " : "dashed ";
					prevTypeWasAlign = false;
				}
			}
		}
		table.setAttribute("columnalign", align.trim());
		if (/[sd]/.test(columnLines)) table.setAttribute("columnlines", columnLines.trim());
	}
	if (group.colSeparationType === "align") {
		var _cols = group.cols || [];
		var spacing = "";
		for (var _i2 = 1; _i2 < _cols.length; _i2++) spacing += _i2 % 2 ? "0em " : "1em ";
		table.setAttribute("columnspacing", spacing.trim());
	} else if (group.colSeparationType === "alignat" || group.colSeparationType === "gather") table.setAttribute("columnspacing", "0em");
	else if (group.colSeparationType === "small") table.setAttribute("columnspacing", "0.2778em");
	else if (group.colSeparationType === "CD") table.setAttribute("columnspacing", "0.5em");
	else table.setAttribute("columnspacing", "1em");
	var rowLines = "";
	var hlines = group.hLinesBeforeRow;
	menclose += hlines[0].length > 0 ? "left " : "";
	menclose += hlines[hlines.length - 1].length > 0 ? "right " : "";
	for (var _i3 = 1; _i3 < hlines.length - 1; _i3++) rowLines += hlines[_i3].length === 0 ? "none " : hlines[_i3][0] ? "dashed " : "solid ";
	if (/[sd]/.test(rowLines)) table.setAttribute("rowlines", rowLines.trim());
	if (menclose !== "") {
		table = new MathNode("menclose", [table]);
		table.setAttribute("notation", menclose.trim());
	}
	if (group.arraystretch && group.arraystretch < 1) {
		table = new MathNode("mstyle", [table]);
		table.setAttribute("scriptlevel", "1");
	}
	return table;
};
var alignedHandler = function alignedHandler(context, args) {
	if (!context.envName.includes("ed")) validateAmsEnvironmentContext(context);
	var cols = [];
	var separationType = context.envName.includes("at") ? "alignat" : "align";
	var isSplit = context.envName === "split";
	var res = parseArray(context.parser, {
		cols,
		addJot: true,
		autoTag: isSplit ? void 0 : getAutoTag(context.envName),
		emptySingleRow: true,
		colSeparationType: separationType,
		maxNumCols: isSplit ? 2 : void 0,
		leqno: context.parser.settings.leqno
	}, "display");
	var numMaths = 0;
	var numCols = 0;
	var emptyGroup = {
		type: "ordgroup",
		mode: context.mode,
		body: []
	};
	if (args[0] && args[0].type === "ordgroup") {
		var arg0 = "";
		for (var i = 0; i < args[0].body.length; i++) {
			var textord = assertNodeType(args[0].body[i], "textord");
			arg0 += textord.text;
		}
		numMaths = Number(arg0);
		numCols = numMaths * 2;
	}
	var isAligned = !numCols;
	res.body.forEach(function(row) {
		for (var _i4 = 1; _i4 < row.length; _i4 += 2) assertNodeType(assertNodeType(row[_i4], "styling").body[0], "ordgroup").body.unshift(emptyGroup);
		if (!isAligned) {
			var curMaths = row.length / 2;
			if (numMaths < curMaths) throw new ParseError("Too many math in a row: " + ("expected " + numMaths + ", but got " + curMaths), row[0]);
		} else if (numCols < row.length) numCols = row.length;
	});
	for (var _i5 = 0; _i5 < numCols; ++_i5) {
		var align = "r";
		var pregap = 0;
		if (_i5 % 2 === 1) align = "l";
		else if (_i5 > 0 && isAligned) pregap = 1;
		cols[_i5] = {
			type: "align",
			align,
			pregap,
			postgap: 0
		};
	}
	res.colSeparationType = isAligned ? "align" : "alignat";
	return res;
};
defineEnvironment({
	type: "array",
	names: ["array", "darray"],
	props: { numArgs: 1 },
	handler(context, args) {
		var cols = (checkSymbolNodeType(args[0]) ? [args[0]] : assertNodeType(args[0], "ordgroup").body).map(function(nde) {
			var ca = assertSymbolNodeType(nde).text;
			if ("lcr".includes(ca)) return {
				type: "align",
				align: ca
			};
			else if (ca === "|") return {
				type: "separator",
				separator: "|"
			};
			else if (ca === ":") return {
				type: "separator",
				separator: ":"
			};
			throw new ParseError("Unknown column alignment: " + ca, nde);
		});
		var res = {
			cols,
			hskipBeforeAndAfter: true,
			maxNumCols: cols.length
		};
		return parseArray(context.parser, res, dCellStyle(context.envName));
	},
	htmlBuilder: htmlBuilder$6,
	mathmlBuilder: mathmlBuilder$5
});
defineEnvironment({
	type: "array",
	names: [
		"matrix",
		"pmatrix",
		"bmatrix",
		"Bmatrix",
		"vmatrix",
		"Vmatrix",
		"matrix*",
		"pmatrix*",
		"bmatrix*",
		"Bmatrix*",
		"vmatrix*",
		"Vmatrix*"
	],
	props: { numArgs: 0 },
	handler(context) {
		var delimiters = {
			"matrix": null,
			"pmatrix": ["(", ")"],
			"bmatrix": ["[", "]"],
			"Bmatrix": ["\\{", "\\}"],
			"vmatrix": ["|", "|"],
			"Vmatrix": ["\\Vert", "\\Vert"]
		}[context.envName.replace("*", "")];
		var colAlign = "c";
		var payload = {
			hskipBeforeAndAfter: false,
			cols: [{
				type: "align",
				align: colAlign
			}]
		};
		if (context.envName.charAt(context.envName.length - 1) === "*") {
			var parser = context.parser;
			parser.consumeSpaces();
			if (parser.fetch().text === "[") {
				parser.consume();
				parser.consumeSpaces();
				colAlign = parser.fetch().text;
				if (!"lcr".includes(colAlign)) throw new ParseError("Expected l or c or r", parser.nextToken);
				parser.consume();
				parser.consumeSpaces();
				parser.expect("]");
				parser.consume();
				payload.cols = [{
					type: "align",
					align: colAlign
				}];
			}
		}
		var res = parseArray(context.parser, payload, dCellStyle(context.envName));
		var numCols = Math.max(0, ...res.body.map((row) => row.length));
		res.cols = new Array(numCols).fill({
			type: "align",
			align: colAlign
		});
		return delimiters ? {
			type: "leftright",
			mode: context.mode,
			body: [res],
			left: delimiters[0],
			right: delimiters[1],
			rightColor: void 0
		} : res;
	},
	htmlBuilder: htmlBuilder$6,
	mathmlBuilder: mathmlBuilder$5
});
defineEnvironment({
	type: "array",
	names: ["smallmatrix"],
	props: { numArgs: 0 },
	handler(context) {
		var res = parseArray(context.parser, { arraystretch: .5 }, "script");
		res.colSeparationType = "small";
		return res;
	},
	htmlBuilder: htmlBuilder$6,
	mathmlBuilder: mathmlBuilder$5
});
defineEnvironment({
	type: "array",
	names: ["subarray"],
	props: { numArgs: 1 },
	handler(context, args) {
		var cols = (checkSymbolNodeType(args[0]) ? [args[0]] : assertNodeType(args[0], "ordgroup").body).map(function(nde) {
			var ca = assertSymbolNodeType(nde).text;
			if ("lc".includes(ca)) return {
				type: "align",
				align: ca
			};
			throw new ParseError("Unknown column alignment: " + ca, nde);
		});
		if (cols.length > 1) throw new ParseError("{subarray} can contain only one column");
		var payload = {
			cols,
			hskipBeforeAndAfter: false,
			arraystretch: .5
		};
		var res = parseArray(context.parser, payload, "script");
		if (res.body.length > 0 && res.body[0].length > 1) throw new ParseError("{subarray} can contain only one column");
		return res;
	},
	htmlBuilder: htmlBuilder$6,
	mathmlBuilder: mathmlBuilder$5
});
defineEnvironment({
	type: "array",
	names: [
		"cases",
		"dcases",
		"rcases",
		"drcases"
	],
	props: { numArgs: 0 },
	handler(context) {
		var res = parseArray(context.parser, {
			arraystretch: 1.2,
			cols: [{
				type: "align",
				align: "l",
				pregap: 0,
				postgap: 1
			}, {
				type: "align",
				align: "l",
				pregap: 0,
				postgap: 0
			}]
		}, dCellStyle(context.envName));
		return {
			type: "leftright",
			mode: context.mode,
			body: [res],
			left: context.envName.includes("r") ? "." : "\\{",
			right: context.envName.includes("r") ? "\\}" : ".",
			rightColor: void 0
		};
	},
	htmlBuilder: htmlBuilder$6,
	mathmlBuilder: mathmlBuilder$5
});
defineEnvironment({
	type: "array",
	names: [
		"align",
		"align*",
		"aligned",
		"split"
	],
	props: { numArgs: 0 },
	handler: alignedHandler,
	htmlBuilder: htmlBuilder$6,
	mathmlBuilder: mathmlBuilder$5
});
defineEnvironment({
	type: "array",
	names: [
		"gathered",
		"gather",
		"gather*"
	],
	props: { numArgs: 0 },
	handler(context) {
		if (gatherEnvironments.has(context.envName)) validateAmsEnvironmentContext(context);
		var res = {
			cols: [{
				type: "align",
				align: "c"
			}],
			addJot: true,
			colSeparationType: "gather",
			autoTag: getAutoTag(context.envName),
			emptySingleRow: true,
			leqno: context.parser.settings.leqno
		};
		return parseArray(context.parser, res, "display");
	},
	htmlBuilder: htmlBuilder$6,
	mathmlBuilder: mathmlBuilder$5
});
defineEnvironment({
	type: "array",
	names: [
		"alignat",
		"alignat*",
		"alignedat"
	],
	props: { numArgs: 1 },
	handler: alignedHandler,
	htmlBuilder: htmlBuilder$6,
	mathmlBuilder: mathmlBuilder$5
});
defineEnvironment({
	type: "array",
	names: ["equation", "equation*"],
	props: { numArgs: 0 },
	handler(context) {
		validateAmsEnvironmentContext(context);
		var res = {
			autoTag: getAutoTag(context.envName),
			emptySingleRow: true,
			singleRow: true,
			maxNumCols: 1,
			leqno: context.parser.settings.leqno
		};
		return parseArray(context.parser, res, "display");
	},
	htmlBuilder: htmlBuilder$6,
	mathmlBuilder: mathmlBuilder$5
});
defineEnvironment({
	type: "array",
	names: ["CD"],
	props: { numArgs: 0 },
	handler(context) {
		validateAmsEnvironmentContext(context);
		return parseCD(context.parser);
	},
	htmlBuilder: htmlBuilder$6,
	mathmlBuilder: mathmlBuilder$5
});
defineMacro("\\nonumber", "\\gdef\\@eqnsw{0}");
defineMacro("\\notag", "\\nonumber");
defineFunction({
	type: "text",
	names: ["\\hline", "\\hdashline"],
	props: {
		numArgs: 0,
		allowedInText: true,
		allowedInMath: true
	},
	handler(context, args) {
		throw new ParseError(context.funcName + " valid only within array environment");
	}
});
var environments = _environments;
defineFunction({
	type: "environment",
	names: ["\\begin", "\\end"],
	props: {
		numArgs: 1,
		argTypes: ["text"]
	},
	handler(_ref, args) {
		var { parser, funcName } = _ref;
		var nameGroup = args[0];
		if (nameGroup.type !== "ordgroup") throw new ParseError("Invalid environment name", nameGroup);
		var envName = "";
		for (var i = 0; i < nameGroup.body.length; ++i) envName += assertNodeType(nameGroup.body[i], "textord").text;
		if (funcName === "\\begin") {
			if (!environments.hasOwnProperty(envName)) throw new ParseError("No such environment: " + envName, nameGroup);
			var env = environments[envName];
			var { args: _args, optArgs } = parser.parseArguments("\\begin{" + envName + "}", env);
			var context = {
				mode: parser.mode,
				envName,
				parser
			};
			var result = env.handler(context, _args, optArgs);
			parser.expect("\\end", false);
			var endNameToken = parser.nextToken;
			var end = assertNodeType(parser.parseFunction(), "environment");
			if (end.name !== envName) throw new ParseError("Mismatch: \\begin{" + envName + "} matched by \\end{" + end.name + "}", endNameToken);
			return result;
		}
		return {
			type: "environment",
			mode: parser.mode,
			name: envName,
			nameGroup
		};
	}
});
var htmlBuilder$5 = (group, options) => {
	var font = group.font;
	var newOptions = options.withFont(font);
	return buildGroup$1(group.body, newOptions);
};
var mathmlBuilder$4 = (group, options) => {
	var font = group.font;
	var newOptions = options.withFont(font);
	return buildGroup(group.body, newOptions);
};
var fontAliases = {
	"\\Bbb": "\\mathbb",
	"\\bold": "\\mathbf",
	"\\frak": "\\mathfrak",
	"\\bm": "\\boldsymbol"
};
defineFunction({
	type: "font",
	names: [
		"\\mathrm",
		"\\mathit",
		"\\mathbf",
		"\\mathnormal",
		"\\mathsfit",
		"\\mathbb",
		"\\mathcal",
		"\\mathfrak",
		"\\mathscr",
		"\\mathsf",
		"\\mathtt",
		"\\Bbb",
		"\\bold",
		"\\frak"
	],
	props: {
		numArgs: 1,
		allowedInArgument: true
	},
	handler: (_ref, args) => {
		var { parser, funcName } = _ref;
		var body = normalizeArgument(args[0]);
		var func = funcName;
		if (func in fontAliases) func = fontAliases[func];
		return {
			type: "font",
			mode: parser.mode,
			font: func.slice(1),
			body
		};
	},
	htmlBuilder: htmlBuilder$5,
	mathmlBuilder: mathmlBuilder$4
});
defineFunction({
	type: "mclass",
	names: ["\\boldsymbol", "\\bm"],
	props: { numArgs: 1 },
	handler: (_ref2, args) => {
		var { parser } = _ref2;
		var body = args[0];
		return {
			type: "mclass",
			mode: parser.mode,
			mclass: binrelClass(body),
			body: [{
				type: "font",
				mode: parser.mode,
				font: "boldsymbol",
				body
			}],
			isCharacterBox: isCharacterBox(body)
		};
	}
});
defineFunction({
	type: "font",
	names: [
		"\\rm",
		"\\sf",
		"\\tt",
		"\\bf",
		"\\it",
		"\\cal"
	],
	props: {
		numArgs: 0,
		allowedInText: true
	},
	handler: (_ref3, args) => {
		var { parser, funcName, breakOnTokenText } = _ref3;
		var { mode } = parser;
		var body = parser.parseExpression(true, breakOnTokenText);
		return {
			type: "font",
			mode,
			font: "math" + funcName.slice(1),
			body: {
				type: "ordgroup",
				mode: parser.mode,
				body
			}
		};
	},
	htmlBuilder: htmlBuilder$5,
	mathmlBuilder: mathmlBuilder$4
});
var htmlBuilder$4 = (group, options) => {
	var style = options.style;
	var nstyle = style.fracNum();
	var dstyle = style.fracDen();
	var newOptions = options.havingStyle(nstyle);
	var numerm = buildGroup$1(group.numer, newOptions, options);
	if (group.continued) {
		var hStrut = 8.5 / options.fontMetrics().ptPerEm;
		var dStrut = 3.5 / options.fontMetrics().ptPerEm;
		numerm.height = numerm.height < hStrut ? hStrut : numerm.height;
		numerm.depth = numerm.depth < dStrut ? dStrut : numerm.depth;
	}
	newOptions = options.havingStyle(dstyle);
	var denomm = buildGroup$1(group.denom, newOptions, options);
	var rule;
	var ruleWidth;
	var ruleSpacing;
	if (group.hasBarLine) {
		if (group.barSize) {
			ruleWidth = calculateSize(group.barSize, options);
			rule = makeLineSpan("frac-line", options, ruleWidth);
		} else rule = makeLineSpan("frac-line", options);
		ruleWidth = rule.height;
		ruleSpacing = rule.height;
	} else {
		rule = null;
		ruleWidth = 0;
		ruleSpacing = options.fontMetrics().defaultRuleThickness;
	}
	var numShift;
	var clearance;
	var denomShift;
	if (style.size === Style$1.DISPLAY.size) {
		numShift = options.fontMetrics().num1;
		if (ruleWidth > 0) clearance = 3 * ruleSpacing;
		else clearance = 7 * ruleSpacing;
		denomShift = options.fontMetrics().denom1;
	} else {
		if (ruleWidth > 0) {
			numShift = options.fontMetrics().num2;
			clearance = ruleSpacing;
		} else {
			numShift = options.fontMetrics().num3;
			clearance = 3 * ruleSpacing;
		}
		denomShift = options.fontMetrics().denom2;
	}
	var frac;
	if (!rule) {
		var candidateClearance = numShift - numerm.depth - (denomm.height - denomShift);
		if (candidateClearance < clearance) {
			numShift += .5 * (clearance - candidateClearance);
			denomShift += .5 * (clearance - candidateClearance);
		}
		frac = makeVList({
			positionType: "individualShift",
			children: [{
				type: "elem",
				elem: denomm,
				shift: denomShift
			}, {
				type: "elem",
				elem: numerm,
				shift: -numShift
			}]
		});
	} else {
		var axisHeight = options.fontMetrics().axisHeight;
		if (numShift - numerm.depth - (axisHeight + .5 * ruleWidth) < clearance) numShift += clearance - (numShift - numerm.depth - (axisHeight + .5 * ruleWidth));
		if (axisHeight - .5 * ruleWidth - (denomm.height - denomShift) < clearance) denomShift += clearance - (axisHeight - .5 * ruleWidth - (denomm.height - denomShift));
		var midShift = -(axisHeight - .5 * ruleWidth);
		frac = makeVList({
			positionType: "individualShift",
			children: [
				{
					type: "elem",
					elem: denomm,
					shift: denomShift
				},
				{
					type: "elem",
					elem: rule,
					shift: midShift
				},
				{
					type: "elem",
					elem: numerm,
					shift: -numShift
				}
			]
		});
	}
	newOptions = options.havingStyle(style);
	frac.height *= newOptions.sizeMultiplier / options.sizeMultiplier;
	frac.depth *= newOptions.sizeMultiplier / options.sizeMultiplier;
	var delimSize;
	if (style.size === Style$1.DISPLAY.size) delimSize = options.fontMetrics().delim1;
	else if (style.size === Style$1.SCRIPTSCRIPT.size) delimSize = options.havingStyle(Style$1.SCRIPT).fontMetrics().delim2;
	else delimSize = options.fontMetrics().delim2;
	var leftDelim;
	var rightDelim;
	if (group.leftDelim == null) leftDelim = makeNullDelimiter(options, ["mopen"]);
	else leftDelim = makeCustomSizedDelim(group.leftDelim, delimSize, true, options.havingStyle(style), group.mode, ["mopen"]);
	if (group.continued) rightDelim = makeSpan([]);
	else if (group.rightDelim == null) rightDelim = makeNullDelimiter(options, ["mclose"]);
	else rightDelim = makeCustomSizedDelim(group.rightDelim, delimSize, true, options.havingStyle(style), group.mode, ["mclose"]);
	return makeSpan(["mord"].concat(newOptions.sizingClasses(options)), [
		leftDelim,
		makeSpan(["mfrac"], [frac]),
		rightDelim
	], options);
};
var mathmlBuilder$3 = (group, options) => {
	var node = new MathNode("mfrac", [buildGroup(group.numer, options), buildGroup(group.denom, options)]);
	if (!group.hasBarLine) node.setAttribute("linethickness", "0px");
	else if (group.barSize) {
		var ruleWidth = calculateSize(group.barSize, options);
		node.setAttribute("linethickness", makeEm(ruleWidth));
	}
	if (group.leftDelim != null || group.rightDelim != null) {
		var withDelims = [];
		if (group.leftDelim != null) {
			var leftOp = new MathNode("mo", [new TextNode(group.leftDelim.replace("\\", ""))]);
			leftOp.setAttribute("fence", "true");
			withDelims.push(leftOp);
		}
		withDelims.push(node);
		if (group.rightDelim != null) {
			var rightOp = new MathNode("mo", [new TextNode(group.rightDelim.replace("\\", ""))]);
			rightOp.setAttribute("fence", "true");
			withDelims.push(rightOp);
		}
		return makeRow(withDelims);
	}
	return node;
};
var wrapWithStyle = (frac, style) => {
	if (!style) return frac;
	return {
		type: "styling",
		mode: frac.mode,
		style,
		body: [frac]
	};
};
defineFunction({
	type: "genfrac",
	names: [
		"\\cfrac",
		"\\dfrac",
		"\\frac",
		"\\tfrac",
		"\\dbinom",
		"\\binom",
		"\\tbinom",
		"\\\\atopfrac",
		"\\\\bracefrac",
		"\\\\brackfrac"
	],
	props: {
		numArgs: 2,
		allowedInArgument: true
	},
	handler: (_ref, args) => {
		var { parser, funcName } = _ref;
		var numer = args[0];
		var denom = args[1];
		var hasBarLine;
		var leftDelim = null;
		var rightDelim = null;
		switch (funcName) {
			case "\\cfrac":
			case "\\dfrac":
			case "\\frac":
			case "\\tfrac":
				hasBarLine = true;
				break;
			case "\\\\atopfrac":
				hasBarLine = false;
				break;
			case "\\dbinom":
			case "\\binom":
			case "\\tbinom":
				hasBarLine = false;
				leftDelim = "(";
				rightDelim = ")";
				break;
			case "\\\\bracefrac":
				hasBarLine = false;
				leftDelim = "\\{";
				rightDelim = "\\}";
				break;
			case "\\\\brackfrac":
				hasBarLine = false;
				leftDelim = "[";
				rightDelim = "]";
				break;
			default: throw new Error("Unrecognized genfrac command");
		}
		var continued = funcName === "\\cfrac";
		var style = null;
		if (continued || funcName.startsWith("\\d")) style = "display";
		else if (funcName.startsWith("\\t")) style = "text";
		return wrapWithStyle({
			type: "genfrac",
			mode: parser.mode,
			numer,
			denom,
			continued,
			hasBarLine,
			leftDelim,
			rightDelim,
			barSize: null
		}, style);
	},
	htmlBuilder: htmlBuilder$4,
	mathmlBuilder: mathmlBuilder$3
});
defineFunction({
	type: "infix",
	names: [
		"\\over",
		"\\choose",
		"\\atop",
		"\\brace",
		"\\brack"
	],
	props: {
		numArgs: 0,
		infix: true
	},
	handler(_ref2) {
		var { parser, funcName, token } = _ref2;
		var replaceWith;
		switch (funcName) {
			case "\\over":
				replaceWith = "\\frac";
				break;
			case "\\choose":
				replaceWith = "\\binom";
				break;
			case "\\atop":
				replaceWith = "\\\\atopfrac";
				break;
			case "\\brace":
				replaceWith = "\\\\bracefrac";
				break;
			case "\\brack":
				replaceWith = "\\\\brackfrac";
				break;
			default: throw new Error("Unrecognized infix genfrac command");
		}
		return {
			type: "infix",
			mode: parser.mode,
			replaceWith,
			token
		};
	}
});
var stylArray = [
	"display",
	"text",
	"script",
	"scriptscript"
];
var delimFromValue = function delimFromValue(delimString) {
	var delim = null;
	if (delimString.length > 0) {
		delim = delimString;
		delim = delim === "." ? null : delim;
	}
	return delim;
};
defineFunction({
	type: "genfrac",
	names: ["\\genfrac"],
	props: {
		numArgs: 6,
		allowedInArgument: true,
		argTypes: [
			"math",
			"math",
			"size",
			"text",
			"math",
			"math"
		]
	},
	handler(_ref3, args) {
		var { parser } = _ref3;
		var numer = args[4];
		var denom = args[5];
		var leftNode = normalizeArgument(args[0]);
		var leftDelim = leftNode.type === "atom" && leftNode.family === "open" ? delimFromValue(leftNode.text) : null;
		var rightNode = normalizeArgument(args[1]);
		var rightDelim = rightNode.type === "atom" && rightNode.family === "close" ? delimFromValue(rightNode.text) : null;
		var barNode = assertNodeType(args[2], "size");
		var hasBarLine;
		var barSize = null;
		if (barNode.isBlank) hasBarLine = true;
		else {
			barSize = barNode.value;
			hasBarLine = barSize.number > 0;
		}
		var size = null;
		var styl = args[3];
		if (styl.type === "ordgroup") {
			if (styl.body.length > 0) {
				var textOrd = assertNodeType(styl.body[0], "textord");
				size = stylArray[Number(textOrd.text)];
			}
		} else {
			styl = assertNodeType(styl, "textord");
			size = stylArray[Number(styl.text)];
		}
		return wrapWithStyle({
			type: "genfrac",
			mode: parser.mode,
			numer,
			denom,
			continued: false,
			hasBarLine,
			barSize,
			leftDelim,
			rightDelim
		}, size);
	}
});
defineFunction({
	type: "infix",
	names: ["\\above"],
	props: {
		numArgs: 1,
		argTypes: ["size"],
		infix: true
	},
	handler(_ref4, args) {
		var { parser, funcName, token } = _ref4;
		return {
			type: "infix",
			mode: parser.mode,
			replaceWith: "\\\\abovefrac",
			size: assertNodeType(args[0], "size").value,
			token
		};
	}
});
defineFunction({
	type: "genfrac",
	names: ["\\\\abovefrac"],
	props: {
		numArgs: 3,
		argTypes: [
			"math",
			"size",
			"math"
		]
	},
	handler: (_ref5, args) => {
		var { parser, funcName } = _ref5;
		var numer = args[0];
		var barSize = assertNodeType(args[1], "infix").size;
		if (!barSize) throw new Error("\\\\abovefrac expected size, but got " + String(barSize));
		var denom = args[2];
		var hasBarLine = barSize.number > 0;
		return {
			type: "genfrac",
			mode: parser.mode,
			numer,
			denom,
			continued: false,
			hasBarLine,
			barSize,
			leftDelim: null,
			rightDelim: null
		};
	}
});
var htmlBuilder$3 = (grp, options) => {
	var style = options.style;
	var supSubGroup;
	var group;
	if (grp.type === "supsub") {
		supSubGroup = grp.sup ? buildGroup$1(grp.sup, options.havingStyle(style.sup()), options) : buildGroup$1(grp.sub, options.havingStyle(style.sub()), options);
		group = assertNodeType(grp.base, "horizBrace");
	} else group = assertNodeType(grp, "horizBrace");
	var body = buildGroup$1(group.base, options.havingBaseStyle(Style$1.DISPLAY));
	var braceBody = stretchySvg(group, options);
	var vlist;
	if (group.isOver) {
		vlist = makeVList({
			positionType: "firstBaseline",
			children: [
				{
					type: "elem",
					elem: body
				},
				{
					type: "kern",
					size: .1
				},
				{
					type: "elem",
					elem: braceBody
				}
			]
		});
		vlist.children[0].children[0].children[1].classes.push("svg-align");
	} else {
		vlist = makeVList({
			positionType: "bottom",
			positionData: body.depth + .1 + braceBody.height,
			children: [
				{
					type: "elem",
					elem: braceBody
				},
				{
					type: "kern",
					size: .1
				},
				{
					type: "elem",
					elem: body
				}
			]
		});
		vlist.children[0].children[0].children[0].classes.push("svg-align");
	}
	if (supSubGroup) {
		var vSpan = makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);
		if (group.isOver) vlist = makeVList({
			positionType: "firstBaseline",
			children: [
				{
					type: "elem",
					elem: vSpan
				},
				{
					type: "kern",
					size: .2
				},
				{
					type: "elem",
					elem: supSubGroup
				}
			]
		});
		else vlist = makeVList({
			positionType: "bottom",
			positionData: vSpan.depth + .2 + supSubGroup.height + supSubGroup.depth,
			children: [
				{
					type: "elem",
					elem: supSubGroup
				},
				{
					type: "kern",
					size: .2
				},
				{
					type: "elem",
					elem: vSpan
				}
			]
		});
	}
	return makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);
};
var mathmlBuilder$2 = (group, options) => {
	var accentNode = stretchyMathML(group.label);
	return new MathNode(group.isOver ? "mover" : "munder", [buildGroup(group.base, options), accentNode]);
};
defineFunction({
	type: "horizBrace",
	names: ["\\overbrace", "\\underbrace"],
	props: { numArgs: 1 },
	handler(_ref, args) {
		var { parser, funcName } = _ref;
		return {
			type: "horizBrace",
			mode: parser.mode,
			label: funcName,
			isOver: /^\\over/.test(funcName),
			base: args[0]
		};
	},
	htmlBuilder: htmlBuilder$3,
	mathmlBuilder: mathmlBuilder$2
});
defineFunction({
	type: "href",
	names: ["\\href"],
	props: {
		numArgs: 2,
		argTypes: ["url", "original"],
		allowedInText: true
	},
	handler: (_ref, args) => {
		var { parser } = _ref;
		var body = args[1];
		var href = assertNodeType(args[0], "url").url;
		if (!parser.settings.isTrusted({
			command: "\\href",
			url: href
		})) return parser.formatUnsupportedCmd("\\href");
		return {
			type: "href",
			mode: parser.mode,
			href,
			body: ordargument(body)
		};
	},
	htmlBuilder: (group, options) => {
		var elements = buildExpression$1(group.body, options, false);
		return makeAnchor(group.href, [], elements, options);
	},
	mathmlBuilder: (group, options) => {
		var math = buildExpressionRow(group.body, options);
		if (!(math instanceof MathNode)) math = new MathNode("mrow", [math]);
		math.setAttribute("href", group.href);
		return math;
	}
});
defineFunction({
	type: "href",
	names: ["\\url"],
	props: {
		numArgs: 1,
		argTypes: ["url"],
		allowedInText: true
	},
	handler: (_ref2, args) => {
		var { parser } = _ref2;
		var href = assertNodeType(args[0], "url").url;
		if (!parser.settings.isTrusted({
			command: "\\url",
			url: href
		})) return parser.formatUnsupportedCmd("\\url");
		var chars = [];
		for (var i = 0; i < href.length; i++) {
			var c = href[i];
			if (c === "~") c = "\\textasciitilde";
			chars.push({
				type: "textord",
				mode: "text",
				text: c
			});
		}
		var body = {
			type: "text",
			mode: parser.mode,
			font: "\\texttt",
			body: chars
		};
		return {
			type: "href",
			mode: parser.mode,
			href,
			body: ordargument(body)
		};
	}
});
defineFunction({
	type: "hbox",
	names: ["\\hbox"],
	props: {
		numArgs: 1,
		argTypes: ["text"],
		allowedInText: true,
		primitive: true
	},
	handler(_ref, args) {
		var { parser } = _ref;
		return {
			type: "hbox",
			mode: parser.mode,
			body: ordargument(args[0])
		};
	},
	htmlBuilder(group, options) {
		return makeFragment(buildExpression$1(group.body, options, false));
	},
	mathmlBuilder(group, options) {
		return new MathNode("mrow", buildExpression(group.body, options));
	}
});
defineFunction({
	type: "html",
	names: [
		"\\htmlClass",
		"\\htmlId",
		"\\htmlStyle",
		"\\htmlData"
	],
	props: {
		numArgs: 2,
		argTypes: ["raw", "original"],
		allowedInText: true
	},
	handler: (_ref, args) => {
		var { parser, funcName, token } = _ref;
		var value = assertNodeType(args[0], "raw").string;
		var body = args[1];
		if (parser.settings.strict) parser.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
		var trustContext;
		var attributes = {};
		switch (funcName) {
			case "\\htmlClass":
				attributes.class = value;
				trustContext = {
					command: "\\htmlClass",
					class: value
				};
				break;
			case "\\htmlId":
				attributes.id = value;
				trustContext = {
					command: "\\htmlId",
					id: value
				};
				break;
			case "\\htmlStyle":
				attributes.style = value;
				trustContext = {
					command: "\\htmlStyle",
					style: value
				};
				break;
			case "\\htmlData":
				var data = value.split(",");
				for (var i = 0; i < data.length; i++) {
					var item = data[i];
					var firstEquals = item.indexOf("=");
					if (firstEquals < 0) throw new ParseError("\\htmlData key/value '" + item + "' missing equals sign");
					var key = item.slice(0, firstEquals);
					var _value = item.slice(firstEquals + 1);
					attributes["data-" + key.trim()] = _value;
				}
				trustContext = {
					command: "\\htmlData",
					attributes
				};
				break;
			default: throw new Error("Unrecognized html command");
		}
		if (!parser.settings.isTrusted(trustContext)) return parser.formatUnsupportedCmd(funcName);
		return {
			type: "html",
			mode: parser.mode,
			attributes,
			body: ordargument(body)
		};
	},
	htmlBuilder: (group, options) => {
		var elements = buildExpression$1(group.body, options, false);
		var classes = ["enclosing"];
		if (group.attributes.class) classes.push(...group.attributes.class.trim().split(/\s+/));
		var span = makeSpan(classes, elements, options);
		for (var attr in group.attributes) if (attr !== "class" && group.attributes.hasOwnProperty(attr)) span.setAttribute(attr, group.attributes[attr]);
		return span;
	},
	mathmlBuilder: (group, options) => {
		return buildExpressionRow(group.body, options);
	}
});
defineFunction({
	type: "htmlmathml",
	names: ["\\html@mathml"],
	props: {
		numArgs: 2,
		allowedInArgument: true,
		allowedInText: true
	},
	handler: (_ref, args) => {
		var { parser } = _ref;
		return {
			type: "htmlmathml",
			mode: parser.mode,
			html: ordargument(args[0]),
			mathml: ordargument(args[1])
		};
	},
	htmlBuilder: (group, options) => {
		return makeFragment(buildExpression$1(group.html, options, false));
	},
	mathmlBuilder: (group, options) => {
		return buildExpressionRow(group.mathml, options);
	}
});
var sizeData = function sizeData(str) {
	if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(str)) return {
		number: +str,
		unit: "bp"
	};
	else {
		var match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(str);
		if (!match) throw new ParseError("Invalid size: '" + str + "' in \\includegraphics");
		var data = {
			number: +(match[1] + match[2]),
			unit: match[3]
		};
		if (!validUnit(data)) throw new ParseError("Invalid unit: '" + data.unit + "' in \\includegraphics.");
		return data;
	}
};
defineFunction({
	type: "includegraphics",
	names: ["\\includegraphics"],
	props: {
		numArgs: 1,
		numOptionalArgs: 1,
		argTypes: ["raw", "url"],
		allowedInText: false
	},
	handler: (_ref, args, optArgs) => {
		var { parser } = _ref;
		var width = {
			number: 0,
			unit: "em"
		};
		var height = {
			number: .9,
			unit: "em"
		};
		var totalheight = {
			number: 0,
			unit: "em"
		};
		var alt = "";
		if (optArgs[0]) {
			var attributes = assertNodeType(optArgs[0], "raw").string.split(",");
			for (var i = 0; i < attributes.length; i++) {
				var keyVal = attributes[i].split("=");
				if (keyVal.length === 2) {
					var str = keyVal[1].trim();
					switch (keyVal[0].trim()) {
						case "alt":
							alt = str;
							break;
						case "width":
							width = sizeData(str);
							break;
						case "height":
							height = sizeData(str);
							break;
						case "totalheight":
							totalheight = sizeData(str);
							break;
						default: throw new ParseError("Invalid key: '" + keyVal[0] + "' in \\includegraphics.");
					}
				}
			}
		}
		var src = assertNodeType(args[0], "url").url;
		if (alt === "") {
			alt = src;
			alt = alt.replace(/^.*[\\/]/, "");
			alt = alt.substring(0, alt.lastIndexOf("."));
		}
		if (!parser.settings.isTrusted({
			command: "\\includegraphics",
			url: src
		})) return parser.formatUnsupportedCmd("\\includegraphics");
		return {
			type: "includegraphics",
			mode: parser.mode,
			alt,
			width,
			height,
			totalheight,
			src
		};
	},
	htmlBuilder: (group, options) => {
		var height = calculateSize(group.height, options);
		var depth = 0;
		if (group.totalheight.number > 0) depth = calculateSize(group.totalheight, options) - height;
		var width = 0;
		if (group.width.number > 0) width = calculateSize(group.width, options);
		var style = { height: makeEm(height + depth) };
		if (width > 0) style.width = makeEm(width);
		if (depth > 0) style.verticalAlign = makeEm(-depth);
		var node = new Img(group.src, group.alt, style);
		node.height = height;
		node.depth = depth;
		return node;
	},
	mathmlBuilder: (group, options) => {
		var node = new MathNode("mglyph", []);
		node.setAttribute("alt", group.alt);
		var height = calculateSize(group.height, options);
		var depth = 0;
		if (group.totalheight.number > 0) {
			depth = calculateSize(group.totalheight, options) - height;
			node.setAttribute("valign", makeEm(-depth));
		}
		node.setAttribute("height", makeEm(height + depth));
		if (group.width.number > 0) {
			var width = calculateSize(group.width, options);
			node.setAttribute("width", makeEm(width));
		}
		node.setAttribute("src", group.src);
		return node;
	}
});
defineFunction({
	type: "kern",
	names: [
		"\\kern",
		"\\mkern",
		"\\hskip",
		"\\mskip"
	],
	props: {
		numArgs: 1,
		argTypes: ["size"],
		primitive: true,
		allowedInText: true
	},
	handler(_ref, args) {
		var { parser, funcName } = _ref;
		var size = assertNodeType(args[0], "size");
		if (parser.settings.strict) {
			var mathFunction = funcName[1] === "m";
			var muUnit = size.value.unit === "mu";
			if (mathFunction) {
				if (!muUnit) parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " supports only mu units, " + ("not " + size.value.unit + " units"));
				if (parser.mode !== "math") parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " works only in math mode");
			} else if (muUnit) parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " doesn't support mu units");
		}
		return {
			type: "kern",
			mode: parser.mode,
			dimension: size.value
		};
	},
	htmlBuilder(group, options) {
		return makeGlue(group.dimension, options);
	},
	mathmlBuilder(group, options) {
		return new SpaceNode(calculateSize(group.dimension, options));
	}
});
defineFunction({
	type: "lap",
	names: [
		"\\mathllap",
		"\\mathrlap",
		"\\mathclap"
	],
	props: {
		numArgs: 1,
		allowedInText: true
	},
	handler: (_ref, args) => {
		var { parser, funcName } = _ref;
		var body = args[0];
		return {
			type: "lap",
			mode: parser.mode,
			alignment: funcName.slice(5),
			body
		};
	},
	htmlBuilder: (group, options) => {
		var inner;
		if (group.alignment === "clap") {
			inner = makeSpan([], [buildGroup$1(group.body, options)]);
			inner = makeSpan(["inner"], [inner], options);
		} else inner = makeSpan(["inner"], [buildGroup$1(group.body, options)]);
		var fix = makeSpan(["fix"], []);
		var node = makeSpan([group.alignment], [inner, fix], options);
		var strut = makeSpan(["strut"]);
		strut.style.height = makeEm(node.height + node.depth);
		if (node.depth) strut.style.verticalAlign = makeEm(-node.depth);
		node.children.unshift(strut);
		node = makeSpan(["thinbox"], [node], options);
		return makeSpan(["mord", "vbox"], [node], options);
	},
	mathmlBuilder: (group, options) => {
		var node = new MathNode("mpadded", [buildGroup(group.body, options)]);
		if (group.alignment !== "rlap") {
			var offset = group.alignment === "llap" ? "-1" : "-0.5";
			node.setAttribute("lspace", offset + "width");
		}
		node.setAttribute("width", "0px");
		return node;
	}
});
defineFunction({
	type: "styling",
	names: ["\\(", "$"],
	props: {
		numArgs: 0,
		allowedInText: true,
		allowedInMath: false
	},
	handler(_ref, args) {
		var { funcName, parser } = _ref;
		var outerMode = parser.mode;
		parser.switchMode("math");
		var close = funcName === "\\(" ? "\\)" : "$";
		var body = parser.parseExpression(false, close);
		parser.expect(close);
		parser.switchMode(outerMode);
		return {
			type: "styling",
			mode: parser.mode,
			style: "text",
			body
		};
	}
});
defineFunction({
	type: "text",
	names: ["\\)", "\\]"],
	props: {
		numArgs: 0,
		allowedInText: true,
		allowedInMath: false
	},
	handler(context, args) {
		throw new ParseError("Mismatched " + context.funcName);
	}
});
var chooseMathStyle = (group, options) => {
	switch (options.style.size) {
		case Style$1.DISPLAY.size: return group.display;
		case Style$1.TEXT.size: return group.text;
		case Style$1.SCRIPT.size: return group.script;
		case Style$1.SCRIPTSCRIPT.size: return group.scriptscript;
		default: return group.text;
	}
};
defineFunction({
	type: "mathchoice",
	names: ["\\mathchoice"],
	props: {
		numArgs: 4,
		primitive: true
	},
	handler: (_ref, args) => {
		var { parser } = _ref;
		return {
			type: "mathchoice",
			mode: parser.mode,
			display: ordargument(args[0]),
			text: ordargument(args[1]),
			script: ordargument(args[2]),
			scriptscript: ordargument(args[3])
		};
	},
	htmlBuilder: (group, options) => {
		return makeFragment(buildExpression$1(chooseMathStyle(group, options), options, false));
	},
	mathmlBuilder: (group, options) => {
		return buildExpressionRow(chooseMathStyle(group, options), options);
	}
});
var assembleSupSub = (base, supGroup, subGroup, options, style, slant, baseShift) => {
	base = makeSpan([], [base]);
	var subIsSingleCharacter = subGroup && isCharacterBox(subGroup);
	var sub;
	var sup;
	if (supGroup) {
		var elem = buildGroup$1(supGroup, options.havingStyle(style.sup()), options);
		sup = {
			elem,
			kern: Math.max(options.fontMetrics().bigOpSpacing1, options.fontMetrics().bigOpSpacing3 - elem.depth)
		};
	}
	if (subGroup) {
		var _elem = buildGroup$1(subGroup, options.havingStyle(style.sub()), options);
		sub = {
			elem: _elem,
			kern: Math.max(options.fontMetrics().bigOpSpacing2, options.fontMetrics().bigOpSpacing4 - _elem.height)
		};
	}
	var finalGroup;
	if (sup && sub) finalGroup = makeVList({
		positionType: "bottom",
		positionData: options.fontMetrics().bigOpSpacing5 + sub.elem.height + sub.elem.depth + sub.kern + base.depth + baseShift,
		children: [
			{
				type: "kern",
				size: options.fontMetrics().bigOpSpacing5
			},
			{
				type: "elem",
				elem: sub.elem,
				marginLeft: makeEm(-slant)
			},
			{
				type: "kern",
				size: sub.kern
			},
			{
				type: "elem",
				elem: base
			},
			{
				type: "kern",
				size: sup.kern
			},
			{
				type: "elem",
				elem: sup.elem,
				marginLeft: makeEm(slant)
			},
			{
				type: "kern",
				size: options.fontMetrics().bigOpSpacing5
			}
		]
	});
	else if (sub) finalGroup = makeVList({
		positionType: "top",
		positionData: base.height - baseShift,
		children: [
			{
				type: "kern",
				size: options.fontMetrics().bigOpSpacing5
			},
			{
				type: "elem",
				elem: sub.elem,
				marginLeft: makeEm(-slant)
			},
			{
				type: "kern",
				size: sub.kern
			},
			{
				type: "elem",
				elem: base
			}
		]
	});
	else if (sup) finalGroup = makeVList({
		positionType: "bottom",
		positionData: base.depth + baseShift,
		children: [
			{
				type: "elem",
				elem: base
			},
			{
				type: "kern",
				size: sup.kern
			},
			{
				type: "elem",
				elem: sup.elem,
				marginLeft: makeEm(slant)
			},
			{
				type: "kern",
				size: options.fontMetrics().bigOpSpacing5
			}
		]
	});
	else return base;
	var parts = [finalGroup];
	if (sub && slant !== 0 && !subIsSingleCharacter) {
		var spacer = makeSpan(["mspace"], [], options);
		spacer.style.marginRight = makeEm(slant);
		parts.unshift(spacer);
	}
	return makeSpan(["mop", "op-limits"], parts, options);
};
var noSuccessor = new Set(["\\smallint"]);
var htmlBuilder$2 = (grp, options) => {
	var supGroup;
	var subGroup;
	var hasLimits = false;
	var group;
	if (grp.type === "supsub") {
		supGroup = grp.sup;
		subGroup = grp.sub;
		group = assertNodeType(grp.base, "op");
		hasLimits = true;
	} else group = assertNodeType(grp, "op");
	var style = options.style;
	var large = false;
	if (style.size === Style$1.DISPLAY.size && group.symbol && !noSuccessor.has(group.name)) large = true;
	var base;
	if (group.symbol) {
		var fontName = large ? "Size2-Regular" : "Size1-Regular";
		var stash = "";
		if (group.name === "\\oiint" || group.name === "\\oiiint") {
			stash = group.name.slice(1);
			group.name = stash === "oiint" ? "\\iint" : "\\iiint";
		}
		base = makeSymbol(group.name, fontName, "math", options, [
			"mop",
			"op-symbol",
			large ? "large-op" : "small-op"
		]);
		if (stash.length > 0) {
			var italic = base.italic;
			var oval = staticSvg(stash + "Size" + (large ? "2" : "1"), options);
			base = makeVList({
				positionType: "individualShift",
				children: [{
					type: "elem",
					elem: base,
					shift: 0
				}, {
					type: "elem",
					elem: oval,
					shift: large ? .08 : 0
				}]
			});
			group.name = "\\" + stash;
			base.classes.unshift("mop");
			base.italic = italic;
		}
	} else if (group.body) {
		var inner = buildExpression$1(group.body, options, true);
		if (inner.length === 1 && inner[0] instanceof SymbolNode) {
			base = inner[0];
			base.classes[0] = "mop";
		} else base = makeSpan(["mop"], inner, options);
	} else {
		var output = [];
		for (var i = 1; i < group.name.length; i++) output.push(mathsym(group.name[i], group.mode, options));
		base = makeSpan(["mop"], output, options);
	}
	var baseShift = 0;
	var slant = 0;
	if ((base instanceof SymbolNode || group.name === "\\oiint" || group.name === "\\oiiint") && !group.suppressBaseShift) {
		baseShift = (base.height - base.depth) / 2 - options.fontMetrics().axisHeight;
		slant = base.italic || 0;
	}
	if (hasLimits) return assembleSupSub(base, supGroup, subGroup, options, style, slant, baseShift);
	else {
		if (baseShift) {
			base.style.position = "relative";
			base.style.top = makeEm(baseShift);
		}
		return base;
	}
};
var mathmlBuilder$1 = (group, options) => {
	var node;
	if (group.symbol) {
		node = new MathNode("mo", [makeText(group.name, group.mode)]);
		if (noSuccessor.has(group.name)) node.setAttribute("largeop", "false");
	} else if (group.body) node = new MathNode("mo", buildExpression(group.body, options));
	else {
		node = new MathNode("mi", [new TextNode(group.name.slice(1))]);
		var operator = new MathNode("mo", [makeText("⁡", "text")]);
		if (group.parentIsSupSub) node = new MathNode("mrow", [node, operator]);
		else node = newDocumentFragment([node, operator]);
	}
	return node;
};
var singleCharBigOps = {
	"∏": "\\prod",
	"∐": "\\coprod",
	"∑": "\\sum",
	"⋀": "\\bigwedge",
	"⋁": "\\bigvee",
	"⋂": "\\bigcap",
	"⋃": "\\bigcup",
	"⨀": "\\bigodot",
	"⨁": "\\bigoplus",
	"⨂": "\\bigotimes",
	"⨄": "\\biguplus",
	"⨆": "\\bigsqcup"
};
defineFunction({
	type: "op",
	names: [
		"\\coprod",
		"\\bigvee",
		"\\bigwedge",
		"\\biguplus",
		"\\bigcap",
		"\\bigcup",
		"\\intop",
		"\\prod",
		"\\sum",
		"\\bigotimes",
		"\\bigoplus",
		"\\bigodot",
		"\\bigsqcup",
		"\\smallint",
		"∏",
		"∐",
		"∑",
		"⋀",
		"⋁",
		"⋂",
		"⋃",
		"⨀",
		"⨁",
		"⨂",
		"⨄",
		"⨆"
	],
	props: { numArgs: 0 },
	handler: (_ref, args) => {
		var { parser, funcName } = _ref;
		var fName = funcName;
		if (fName.length === 1) fName = singleCharBigOps[fName];
		return {
			type: "op",
			mode: parser.mode,
			limits: true,
			parentIsSupSub: false,
			symbol: true,
			name: fName
		};
	},
	htmlBuilder: htmlBuilder$2,
	mathmlBuilder: mathmlBuilder$1
});
defineFunction({
	type: "op",
	names: ["\\mathop"],
	props: {
		numArgs: 1,
		primitive: true
	},
	handler: (_ref2, args) => {
		var { parser } = _ref2;
		var body = args[0];
		return {
			type: "op",
			mode: parser.mode,
			limits: false,
			parentIsSupSub: false,
			symbol: false,
			body: ordargument(body)
		};
	},
	htmlBuilder: htmlBuilder$2,
	mathmlBuilder: mathmlBuilder$1
});
var singleCharIntegrals = {
	"∫": "\\int",
	"∬": "\\iint",
	"∭": "\\iiint",
	"∮": "\\oint",
	"∯": "\\oiint",
	"∰": "\\oiiint"
};
defineFunction({
	type: "op",
	names: [
		"\\arcsin",
		"\\arccos",
		"\\arctan",
		"\\arctg",
		"\\arcctg",
		"\\arg",
		"\\ch",
		"\\cos",
		"\\cosec",
		"\\cosh",
		"\\cot",
		"\\cotg",
		"\\coth",
		"\\csc",
		"\\ctg",
		"\\cth",
		"\\deg",
		"\\dim",
		"\\exp",
		"\\hom",
		"\\ker",
		"\\lg",
		"\\ln",
		"\\log",
		"\\sec",
		"\\sin",
		"\\sinh",
		"\\sh",
		"\\tan",
		"\\tanh",
		"\\tg",
		"\\th"
	],
	props: { numArgs: 0 },
	handler(_ref3) {
		var { parser, funcName } = _ref3;
		return {
			type: "op",
			mode: parser.mode,
			limits: false,
			parentIsSupSub: false,
			symbol: false,
			name: funcName
		};
	},
	htmlBuilder: htmlBuilder$2,
	mathmlBuilder: mathmlBuilder$1
});
defineFunction({
	type: "op",
	names: [
		"\\det",
		"\\gcd",
		"\\inf",
		"\\lim",
		"\\max",
		"\\min",
		"\\Pr",
		"\\sup"
	],
	props: { numArgs: 0 },
	handler(_ref4) {
		var { parser, funcName } = _ref4;
		return {
			type: "op",
			mode: parser.mode,
			limits: true,
			parentIsSupSub: false,
			symbol: false,
			name: funcName
		};
	},
	htmlBuilder: htmlBuilder$2,
	mathmlBuilder: mathmlBuilder$1
});
defineFunction({
	type: "op",
	names: [
		"\\int",
		"\\iint",
		"\\iiint",
		"\\oint",
		"\\oiint",
		"\\oiiint",
		"∫",
		"∬",
		"∭",
		"∮",
		"∯",
		"∰"
	],
	props: {
		numArgs: 0,
		allowedInArgument: true
	},
	handler(_ref5) {
		var { parser, funcName } = _ref5;
		var fName = funcName;
		if (fName.length === 1) fName = singleCharIntegrals[fName];
		return {
			type: "op",
			mode: parser.mode,
			limits: false,
			parentIsSupSub: false,
			symbol: true,
			name: fName
		};
	},
	htmlBuilder: htmlBuilder$2,
	mathmlBuilder: mathmlBuilder$1
});
var htmlBuilder$1 = (grp, options) => {
	var supGroup;
	var subGroup;
	var hasLimits = false;
	var group;
	if (grp.type === "supsub") {
		supGroup = grp.sup;
		subGroup = grp.sub;
		group = assertNodeType(grp.base, "operatorname");
		hasLimits = true;
	} else group = assertNodeType(grp, "operatorname");
	var base;
	if (group.body.length > 0) {
		var expression = buildExpression$1(group.body.map((child) => {
			var childText = "text" in child ? child.text : void 0;
			if (typeof childText === "string") return {
				type: "textord",
				mode: child.mode,
				text: childText
			};
			else return child;
		}), options.withFont("mathrm"), true);
		for (var i = 0; i < expression.length; i++) {
			var child = expression[i];
			if (child instanceof SymbolNode) child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
		}
		base = makeSpan(["mop"], expression, options);
	} else base = makeSpan(["mop"], [], options);
	if (hasLimits) return assembleSupSub(base, supGroup, subGroup, options, options.style, 0, 0);
	else return base;
};
var mathmlBuilder = (group, options) => {
	var expression = buildExpression(group.body, options.withFont("mathrm"));
	var isAllString = true;
	for (var i = 0; i < expression.length; i++) {
		var node = expression[i];
		if (node instanceof SpaceNode);
		else if (node instanceof MathNode) switch (node.type) {
			case "mi":
			case "mn":
			case "mspace":
			case "mtext": break;
			case "mo":
				var child = node.children[0];
				if (node.children.length === 1 && child instanceof TextNode) child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
				else isAllString = false;
				break;
			default: isAllString = false;
		}
		else isAllString = false;
	}
	if (isAllString) expression = [new TextNode(expression.map((node) => node.toText()).join(""))];
	var identifier = new MathNode("mi", expression);
	identifier.setAttribute("mathvariant", "normal");
	var operator = new MathNode("mo", [makeText("⁡", "text")]);
	if (group.parentIsSupSub) return new MathNode("mrow", [identifier, operator]);
	else return newDocumentFragment([identifier, operator]);
};
defineFunction({
	type: "operatorname",
	names: ["\\operatorname@", "\\operatornamewithlimits"],
	props: { numArgs: 1 },
	handler: (_ref, args) => {
		var { parser, funcName } = _ref;
		var body = args[0];
		return {
			type: "operatorname",
			mode: parser.mode,
			body: ordargument(body),
			alwaysHandleSupSub: funcName === "\\operatornamewithlimits",
			limits: false,
			parentIsSupSub: false
		};
	},
	htmlBuilder: htmlBuilder$1,
	mathmlBuilder
});
defineMacro("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
defineFunctionBuilders({
	type: "ordgroup",
	htmlBuilder(group, options) {
		if (group.semisimple) return makeFragment(buildExpression$1(group.body, options, false));
		return makeSpan(["mord"], buildExpression$1(group.body, options, true), options);
	},
	mathmlBuilder(group, options) {
		return buildExpressionRow(group.body, options, true);
	}
});
defineFunction({
	type: "overline",
	names: ["\\overline"],
	props: { numArgs: 1 },
	handler(_ref, args) {
		var { parser } = _ref;
		var body = args[0];
		return {
			type: "overline",
			mode: parser.mode,
			body
		};
	},
	htmlBuilder(group, options) {
		var innerGroup = buildGroup$1(group.body, options.havingCrampedStyle());
		var line = makeLineSpan("overline-line", options);
		var defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
		return makeSpan(["mord", "overline"], [makeVList({
			positionType: "firstBaseline",
			children: [
				{
					type: "elem",
					elem: innerGroup
				},
				{
					type: "kern",
					size: 3 * defaultRuleThickness
				},
				{
					type: "elem",
					elem: line
				},
				{
					type: "kern",
					size: defaultRuleThickness
				}
			]
		})], options);
	},
	mathmlBuilder(group, options) {
		var operator = new MathNode("mo", [new TextNode("‾")]);
		operator.setAttribute("stretchy", "true");
		var node = new MathNode("mover", [buildGroup(group.body, options), operator]);
		node.setAttribute("accent", "true");
		return node;
	}
});
defineFunction({
	type: "phantom",
	names: ["\\phantom"],
	props: {
		numArgs: 1,
		allowedInText: true
	},
	handler: (_ref, args) => {
		var { parser } = _ref;
		var body = args[0];
		return {
			type: "phantom",
			mode: parser.mode,
			body: ordargument(body)
		};
	},
	htmlBuilder: (group, options) => {
		return makeFragment(buildExpression$1(group.body, options.withPhantom(), false));
	},
	mathmlBuilder: (group, options) => {
		return new MathNode("mphantom", buildExpression(group.body, options));
	}
});
defineMacro("\\hphantom", "\\smash{\\phantom{#1}}");
defineFunction({
	type: "vphantom",
	names: ["\\vphantom"],
	props: {
		numArgs: 1,
		allowedInText: true
	},
	handler: (_ref2, args) => {
		var { parser } = _ref2;
		var body = args[0];
		return {
			type: "vphantom",
			mode: parser.mode,
			body
		};
	},
	htmlBuilder: (group, options) => {
		return makeSpan(["mord", "rlap"], [makeSpan(["inner"], [buildGroup$1(group.body, options.withPhantom())]), makeSpan(["fix"], [])], options);
	},
	mathmlBuilder: (group, options) => {
		var node = new MathNode("mpadded", [new MathNode("mphantom", buildExpression(ordargument(group.body), options))]);
		node.setAttribute("width", "0px");
		return node;
	}
});
defineFunction({
	type: "raisebox",
	names: ["\\raisebox"],
	props: {
		numArgs: 2,
		argTypes: ["size", "hbox"],
		allowedInText: true
	},
	handler(_ref, args) {
		var { parser } = _ref;
		var amount = assertNodeType(args[0], "size").value;
		var body = args[1];
		return {
			type: "raisebox",
			mode: parser.mode,
			dy: amount,
			body
		};
	},
	htmlBuilder(group, options) {
		var body = buildGroup$1(group.body, options);
		return makeVList({
			positionType: "shift",
			positionData: -calculateSize(group.dy, options),
			children: [{
				type: "elem",
				elem: body
			}]
		});
	},
	mathmlBuilder(group, options) {
		var node = new MathNode("mpadded", [buildGroup(group.body, options)]);
		var dy = group.dy.number + group.dy.unit;
		node.setAttribute("voffset", dy);
		return node;
	}
});
defineFunction({
	type: "internal",
	names: ["\\relax"],
	props: {
		numArgs: 0,
		allowedInText: true,
		allowedInArgument: true
	},
	handler(_ref) {
		var { parser } = _ref;
		return {
			type: "internal",
			mode: parser.mode
		};
	}
});
defineFunction({
	type: "rule",
	names: ["\\rule"],
	props: {
		numArgs: 2,
		numOptionalArgs: 1,
		allowedInText: true,
		allowedInMath: true,
		argTypes: [
			"size",
			"size",
			"size"
		]
	},
	handler(_ref, args, optArgs) {
		var { parser } = _ref;
		var shift = optArgs[0];
		var width = assertNodeType(args[0], "size");
		var height = assertNodeType(args[1], "size");
		return {
			type: "rule",
			mode: parser.mode,
			shift: shift && assertNodeType(shift, "size").value,
			width: width.value,
			height: height.value
		};
	},
	htmlBuilder(group, options) {
		var rule = makeSpan(["mord", "rule"], [], options);
		var width = calculateSize(group.width, options);
		var height = calculateSize(group.height, options);
		var shift = group.shift ? calculateSize(group.shift, options) : 0;
		rule.style.borderRightWidth = makeEm(width);
		rule.style.borderTopWidth = makeEm(height);
		rule.style.bottom = makeEm(shift);
		rule.width = width;
		rule.height = height + shift;
		rule.depth = -shift;
		rule.maxFontSize = height * 1.125 * options.sizeMultiplier;
		return rule;
	},
	mathmlBuilder(group, options) {
		var width = calculateSize(group.width, options);
		var height = calculateSize(group.height, options);
		var shift = group.shift ? calculateSize(group.shift, options) : 0;
		var color = options.color && options.getColor() || "black";
		var rule = new MathNode("mspace");
		rule.setAttribute("mathbackground", color);
		rule.setAttribute("width", makeEm(width));
		rule.setAttribute("height", makeEm(height));
		var wrapper = new MathNode("mpadded", [rule]);
		if (shift >= 0) wrapper.setAttribute("height", makeEm(shift));
		else {
			wrapper.setAttribute("height", makeEm(shift));
			wrapper.setAttribute("depth", makeEm(-shift));
		}
		wrapper.setAttribute("voffset", makeEm(shift));
		return wrapper;
	}
});
function sizingGroup(value, options, baseOptions) {
	var inner = buildExpression$1(value, options, false);
	var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;
	for (var i = 0; i < inner.length; i++) {
		var pos = inner[i].classes.indexOf("sizing");
		if (pos < 0) Array.prototype.push.apply(inner[i].classes, options.sizingClasses(baseOptions));
		else if (inner[i].classes[pos + 1] === "reset-size" + options.size) inner[i].classes[pos + 1] = "reset-size" + baseOptions.size;
		inner[i].height *= multiplier;
		inner[i].depth *= multiplier;
	}
	return makeFragment(inner);
}
var sizeFuncs = [
	"\\tiny",
	"\\sixptsize",
	"\\scriptsize",
	"\\footnotesize",
	"\\small",
	"\\normalsize",
	"\\large",
	"\\Large",
	"\\LARGE",
	"\\huge",
	"\\Huge"
];
var htmlBuilder = (group, options) => {
	var newOptions = options.havingSize(group.size);
	return sizingGroup(group.body, newOptions, options);
};
defineFunction({
	type: "sizing",
	names: sizeFuncs,
	props: {
		numArgs: 0,
		allowedInText: true
	},
	handler: (_ref, args) => {
		var { breakOnTokenText, funcName, parser } = _ref;
		var body = parser.parseExpression(false, breakOnTokenText);
		return {
			type: "sizing",
			mode: parser.mode,
			size: sizeFuncs.indexOf(funcName) + 1,
			body
		};
	},
	htmlBuilder,
	mathmlBuilder: (group, options) => {
		var newOptions = options.havingSize(group.size);
		var node = new MathNode("mstyle", buildExpression(group.body, newOptions));
		node.setAttribute("mathsize", makeEm(newOptions.sizeMultiplier));
		return node;
	}
});
defineFunction({
	type: "smash",
	names: ["\\smash"],
	props: {
		numArgs: 1,
		numOptionalArgs: 1,
		allowedInText: true
	},
	handler: (_ref, args, optArgs) => {
		var { parser } = _ref;
		var smashHeight = false;
		var smashDepth = false;
		var tbArg = optArgs[0] && assertNodeType(optArgs[0], "ordgroup");
		if (tbArg) {
			var letter = "";
			for (var i = 0; i < tbArg.body.length; ++i) {
				var node = tbArg.body[i];
				letter = assertSymbolNodeType(node).text;
				if (letter === "t") smashHeight = true;
				else if (letter === "b") smashDepth = true;
				else {
					smashHeight = false;
					smashDepth = false;
					break;
				}
			}
		} else {
			smashHeight = true;
			smashDepth = true;
		}
		var body = args[0];
		return {
			type: "smash",
			mode: parser.mode,
			body,
			smashHeight,
			smashDepth
		};
	},
	htmlBuilder: (group, options) => {
		var node = makeSpan([], [buildGroup$1(group.body, options)]);
		if (!group.smashHeight && !group.smashDepth) return node;
		if (group.smashHeight) node.height = 0;
		if (group.smashDepth) node.depth = 0;
		if (group.smashHeight && group.smashDepth) return makeSpan(["mord", "smash"], [node], options);
		if (node.children) for (var i = 0; i < node.children.length; i++) {
			if (group.smashHeight) node.children[i].height = 0;
			if (group.smashDepth) node.children[i].depth = 0;
		}
		return makeSpan(["mord"], [makeVList({
			positionType: "firstBaseline",
			children: [{
				type: "elem",
				elem: node
			}]
		})], options);
	},
	mathmlBuilder: (group, options) => {
		var node = new MathNode("mpadded", [buildGroup(group.body, options)]);
		if (group.smashHeight) node.setAttribute("height", "0px");
		if (group.smashDepth) node.setAttribute("depth", "0px");
		return node;
	}
});
defineFunction({
	type: "sqrt",
	names: ["\\sqrt"],
	props: {
		numArgs: 1,
		numOptionalArgs: 1
	},
	handler(_ref, args, optArgs) {
		var { parser } = _ref;
		var index = optArgs[0];
		var body = args[0];
		return {
			type: "sqrt",
			mode: parser.mode,
			body,
			index
		};
	},
	htmlBuilder(group, options) {
		var inner = buildGroup$1(group.body, options.havingCrampedStyle());
		if (inner.height === 0) inner.height = options.fontMetrics().xHeight;
		inner = wrapFragment(inner, options);
		var theta = options.fontMetrics().defaultRuleThickness;
		var phi = theta;
		if (options.style.id < Style$1.TEXT.id) phi = options.fontMetrics().xHeight;
		var lineClearance = theta + phi / 4;
		var { span: img, ruleWidth, advanceWidth } = makeSqrtImage(inner.height + inner.depth + lineClearance + theta, options);
		var delimDepth = img.height - ruleWidth;
		if (delimDepth > inner.height + inner.depth + lineClearance) lineClearance = (lineClearance + delimDepth - inner.height - inner.depth) / 2;
		var imgShift = img.height - inner.height - lineClearance - ruleWidth;
		inner.style.paddingLeft = makeEm(advanceWidth);
		var body = makeVList({
			positionType: "firstBaseline",
			children: [
				{
					type: "elem",
					elem: inner,
					wrapperClasses: ["svg-align"]
				},
				{
					type: "kern",
					size: -(inner.height + imgShift)
				},
				{
					type: "elem",
					elem: img
				},
				{
					type: "kern",
					size: ruleWidth
				}
			]
		});
		if (!group.index) return makeSpan(["mord", "sqrt"], [body], options);
		else {
			var newOptions = options.havingStyle(Style$1.SCRIPTSCRIPT);
			var rootm = buildGroup$1(group.index, newOptions, options);
			return makeSpan(["mord", "sqrt"], [makeSpan(["root"], [makeVList({
				positionType: "shift",
				positionData: -(.6 * (body.height - body.depth)),
				children: [{
					type: "elem",
					elem: rootm
				}]
			})]), body], options);
		}
	},
	mathmlBuilder(group, options) {
		var { body, index } = group;
		return index ? new MathNode("mroot", [buildGroup(body, options), buildGroup(index, options)]) : new MathNode("msqrt", [buildGroup(body, options)]);
	}
});
var styleMap = {
	"display": Style$1.DISPLAY,
	"text": Style$1.TEXT,
	"script": Style$1.SCRIPT,
	"scriptscript": Style$1.SCRIPTSCRIPT
};
defineFunction({
	type: "styling",
	names: [
		"\\displaystyle",
		"\\textstyle",
		"\\scriptstyle",
		"\\scriptscriptstyle"
	],
	props: {
		numArgs: 0,
		allowedInText: true,
		primitive: true
	},
	handler(_ref, args) {
		var { breakOnTokenText, funcName, parser } = _ref;
		var body = parser.parseExpression(true, breakOnTokenText);
		var style = funcName.slice(1, funcName.length - 5);
		return {
			type: "styling",
			mode: parser.mode,
			style,
			body
		};
	},
	htmlBuilder(group, options) {
		var newStyle = styleMap[group.style];
		var newOptions = options.havingStyle(newStyle).withFont("");
		return sizingGroup(group.body, newOptions, options);
	},
	mathmlBuilder(group, options) {
		var newStyle = styleMap[group.style];
		var newOptions = options.havingStyle(newStyle);
		var node = new MathNode("mstyle", buildExpression(group.body, newOptions));
		var attr = {
			"display": ["0", "true"],
			"text": ["0", "false"],
			"script": ["1", "false"],
			"scriptscript": ["2", "false"]
		}[group.style];
		node.setAttribute("scriptlevel", attr[0]);
		node.setAttribute("displaystyle", attr[1]);
		return node;
	}
});
/**
* Sometimes, groups perform special rules when they have superscripts or
* subscripts attached to them. This function lets the `supsub` group know that
* Sometimes, groups perform special rules when they have superscripts or
* its inner element should handle the superscripts and subscripts instead of
* handling them itself.
*/
var htmlBuilderDelegate = function htmlBuilderDelegate(group, options) {
	var base = group.base;
	if (!base) return null;
	else if (base.type === "op") return base.limits && (options.style.size === Style$1.DISPLAY.size || base.alwaysHandleSupSub) ? htmlBuilder$2 : null;
	else if (base.type === "operatorname") return base.alwaysHandleSupSub && (options.style.size === Style$1.DISPLAY.size || base.limits) ? htmlBuilder$1 : null;
	else if (base.type === "accent") return isCharacterBox(base.base) ? htmlBuilder$a : null;
	else if (base.type === "horizBrace") return !group.sub === base.isOver ? htmlBuilder$3 : null;
	else return null;
};
defineFunctionBuilders({
	type: "supsub",
	htmlBuilder(group, options) {
		var builderDelegate = htmlBuilderDelegate(group, options);
		if (builderDelegate) return builderDelegate(group, options);
		var { base: valueBase, sup: valueSup, sub: valueSub } = group;
		var base = buildGroup$1(valueBase, options);
		var supm;
		var subm;
		var metrics = options.fontMetrics();
		var supShift = 0;
		var subShift = 0;
		var isCharBox = valueBase && isCharacterBox(valueBase);
		if (valueSup) {
			var newOptions = options.havingStyle(options.style.sup());
			supm = buildGroup$1(valueSup, newOptions, options);
			if (!isCharBox) supShift = base.height - newOptions.fontMetrics().supDrop * newOptions.sizeMultiplier / options.sizeMultiplier;
		}
		if (valueSub) {
			var _newOptions = options.havingStyle(options.style.sub());
			subm = buildGroup$1(valueSub, _newOptions, options);
			if (!isCharBox) subShift = base.depth + _newOptions.fontMetrics().subDrop * _newOptions.sizeMultiplier / options.sizeMultiplier;
		}
		var minSupShift;
		if (options.style === Style$1.DISPLAY) minSupShift = metrics.sup1;
		else if (options.style.cramped) minSupShift = metrics.sup3;
		else minSupShift = metrics.sup2;
		var multiplier = options.sizeMultiplier;
		var marginRight = makeEm(.5 / metrics.ptPerEm / multiplier);
		var marginLeft = null;
		if (subm) {
			var isOiint = group.base && group.base.type === "op" && group.base.name && (group.base.name === "\\oiint" || group.base.name === "\\oiiint");
			if (base instanceof SymbolNode || isOiint) marginLeft = makeEm(-base.italic);
		}
		var supsub;
		if (supm && subm) {
			supShift = Math.max(supShift, minSupShift, supm.depth + .25 * metrics.xHeight);
			subShift = Math.max(subShift, metrics.sub2);
			var maxWidth = 4 * metrics.defaultRuleThickness;
			if (supShift - supm.depth - (subm.height - subShift) < maxWidth) {
				subShift = maxWidth - (supShift - supm.depth) + subm.height;
				var psi = .8 * metrics.xHeight - (supShift - supm.depth);
				if (psi > 0) {
					supShift += psi;
					subShift -= psi;
				}
			}
			supsub = makeVList({
				positionType: "individualShift",
				children: [{
					type: "elem",
					elem: subm,
					shift: subShift,
					marginRight,
					marginLeft
				}, {
					type: "elem",
					elem: supm,
					shift: -supShift,
					marginRight
				}]
			});
		} else if (subm) {
			subShift = Math.max(subShift, metrics.sub1, subm.height - .8 * metrics.xHeight);
			supsub = makeVList({
				positionType: "shift",
				positionData: subShift,
				children: [{
					type: "elem",
					elem: subm,
					marginLeft,
					marginRight
				}]
			});
		} else if (supm) {
			supShift = Math.max(supShift, minSupShift, supm.depth + .25 * metrics.xHeight);
			supsub = makeVList({
				positionType: "shift",
				positionData: -supShift,
				children: [{
					type: "elem",
					elem: supm,
					marginRight
				}]
			});
		} else throw new Error("supsub must have either sup or sub.");
		return makeSpan([getTypeOfDomTree(base, "right") || "mord"], [base, makeSpan(["msupsub"], [supsub])], options);
	},
	mathmlBuilder(group, options) {
		var isBrace = false;
		var isOver;
		var isSup;
		if (group.base && group.base.type === "horizBrace") {
			isSup = !!group.sup;
			if (isSup === group.base.isOver) {
				isBrace = true;
				isOver = group.base.isOver;
			}
		}
		if (group.base && (group.base.type === "op" || group.base.type === "operatorname")) group.base.parentIsSupSub = true;
		var children = [buildGroup(group.base, options)];
		if (group.sub) children.push(buildGroup(group.sub, options));
		if (group.sup) children.push(buildGroup(group.sup, options));
		var nodeType;
		if (isBrace) nodeType = isOver ? "mover" : "munder";
		else if (!group.sub) {
			var base = group.base;
			if (base && base.type === "op" && base.limits && (options.style === Style$1.DISPLAY || base.alwaysHandleSupSub)) nodeType = "mover";
			else if (base && base.type === "operatorname" && base.alwaysHandleSupSub && (base.limits || options.style === Style$1.DISPLAY)) nodeType = "mover";
			else nodeType = "msup";
		} else if (!group.sup) {
			var _base = group.base;
			if (_base && _base.type === "op" && _base.limits && (options.style === Style$1.DISPLAY || _base.alwaysHandleSupSub)) nodeType = "munder";
			else if (_base && _base.type === "operatorname" && _base.alwaysHandleSupSub && (_base.limits || options.style === Style$1.DISPLAY)) nodeType = "munder";
			else nodeType = "msub";
		} else {
			var _base2 = group.base;
			if (_base2 && _base2.type === "op" && _base2.limits && options.style === Style$1.DISPLAY) nodeType = "munderover";
			else if (_base2 && _base2.type === "operatorname" && _base2.alwaysHandleSupSub && (options.style === Style$1.DISPLAY || _base2.limits)) nodeType = "munderover";
			else nodeType = "msubsup";
		}
		return new MathNode(nodeType, children);
	}
});
defineFunctionBuilders({
	type: "atom",
	htmlBuilder(group, options) {
		return mathsym(group.text, group.mode, options, ["m" + group.family]);
	},
	mathmlBuilder(group, options) {
		var node = new MathNode("mo", [makeText(group.text, group.mode)]);
		if (group.family === "bin") {
			var variant = getVariant(group, options);
			if (variant === "bold-italic") node.setAttribute("mathvariant", variant);
		} else if (group.family === "punct") node.setAttribute("separator", "true");
		else if (group.family === "open" || group.family === "close") node.setAttribute("stretchy", "false");
		return node;
	}
});
var defaultVariant = {
	"mi": "italic",
	"mn": "normal",
	"mtext": "normal"
};
defineFunctionBuilders({
	type: "mathord",
	htmlBuilder(group, options) {
		return makeOrd(group, options, "mathord");
	},
	mathmlBuilder(group, options) {
		var node = new MathNode("mi", [makeText(group.text, group.mode, options)]);
		var variant = getVariant(group, options) || "italic";
		if (variant !== defaultVariant[node.type]) node.setAttribute("mathvariant", variant);
		return node;
	}
});
defineFunctionBuilders({
	type: "textord",
	htmlBuilder(group, options) {
		return makeOrd(group, options, "textord");
	},
	mathmlBuilder(group, options) {
		var text = makeText(group.text, group.mode, options);
		var variant = getVariant(group, options) || "normal";
		var node;
		if (group.mode === "text") node = new MathNode("mtext", [text]);
		else if (/[0-9]/.test(group.text)) node = new MathNode("mn", [text]);
		else if (group.text === "\\prime") node = new MathNode("mo", [text]);
		else node = new MathNode("mi", [text]);
		if (variant !== defaultVariant[node.type]) node.setAttribute("mathvariant", variant);
		return node;
	}
});
var cssSpace = {
	"\\nobreak": "nobreak",
	"\\allowbreak": "allowbreak"
};
var regularSpace = {
	" ": {},
	"\\ ": {},
	"~": { className: "nobreak" },
	"\\space": {},
	"\\nobreakspace": { className: "nobreak" }
};
defineFunctionBuilders({
	type: "spacing",
	htmlBuilder(group, options) {
		if (regularSpace.hasOwnProperty(group.text)) {
			var className = regularSpace[group.text].className || "";
			if (group.mode === "text") {
				var ord = makeOrd(group, options, "textord");
				ord.classes.push(className);
				return ord;
			} else return makeSpan(["mspace", className], [mathsym(group.text, group.mode, options)], options);
		} else if (cssSpace.hasOwnProperty(group.text)) return makeSpan(["mspace", cssSpace[group.text]], [], options);
		else throw new ParseError("Unknown type of space \"" + group.text + "\"");
	},
	mathmlBuilder(group, options) {
		var node;
		if (regularSpace.hasOwnProperty(group.text)) node = new MathNode("mtext", [new TextNode("\xA0")]);
		else if (cssSpace.hasOwnProperty(group.text)) return new MathNode("mspace");
		else throw new ParseError("Unknown type of space \"" + group.text + "\"");
		return node;
	}
});
var pad = () => {
	var padNode = new MathNode("mtd", []);
	padNode.setAttribute("width", "50%");
	return padNode;
};
defineFunctionBuilders({
	type: "tag",
	mathmlBuilder(group, options) {
		var table = new MathNode("mtable", [new MathNode("mtr", [
			pad(),
			new MathNode("mtd", [buildExpressionRow(group.body, options)]),
			pad(),
			new MathNode("mtd", [buildExpressionRow(group.tag, options)])
		])]);
		table.setAttribute("width", "100%");
		return table;
	}
});
var textFontFamilies = {
	"\\text": void 0,
	"\\textrm": "textrm",
	"\\textsf": "textsf",
	"\\texttt": "texttt",
	"\\textnormal": "textrm"
};
var textFontWeights = {
	"\\textbf": "textbf",
	"\\textmd": "textmd"
};
var textFontShapes = {
	"\\textit": "textit",
	"\\textup": "textup"
};
var optionsWithFont = (group, options) => {
	var font = group.font;
	if (!font) return options;
	else if (textFontFamilies[font]) return options.withTextFontFamily(textFontFamilies[font]);
	else if (textFontWeights[font]) return options.withTextFontWeight(textFontWeights[font]);
	else if (font === "\\emph") return options.fontShape === "textit" ? options.withTextFontShape("textup") : options.withTextFontShape("textit");
	return options.withTextFontShape(textFontShapes[font]);
};
defineFunction({
	type: "text",
	names: [
		"\\text",
		"\\textrm",
		"\\textsf",
		"\\texttt",
		"\\textnormal",
		"\\textbf",
		"\\textmd",
		"\\textit",
		"\\textup",
		"\\emph"
	],
	props: {
		numArgs: 1,
		argTypes: ["text"],
		allowedInArgument: true,
		allowedInText: true
	},
	handler(_ref, args) {
		var { parser, funcName } = _ref;
		var body = args[0];
		return {
			type: "text",
			mode: parser.mode,
			body: ordargument(body),
			font: funcName
		};
	},
	htmlBuilder(group, options) {
		var newOptions = optionsWithFont(group, options);
		return makeSpan(["mord", "text"], buildExpression$1(group.body, newOptions, true), newOptions);
	},
	mathmlBuilder(group, options) {
		var newOptions = optionsWithFont(group, options);
		return buildExpressionRow(group.body, newOptions);
	}
});
defineFunction({
	type: "underline",
	names: ["\\underline"],
	props: {
		numArgs: 1,
		allowedInText: true
	},
	handler(_ref, args) {
		var { parser } = _ref;
		return {
			type: "underline",
			mode: parser.mode,
			body: args[0]
		};
	},
	htmlBuilder(group, options) {
		var innerGroup = buildGroup$1(group.body, options);
		var line = makeLineSpan("underline-line", options);
		var defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
		return makeSpan(["mord", "underline"], [makeVList({
			positionType: "top",
			positionData: innerGroup.height,
			children: [
				{
					type: "kern",
					size: defaultRuleThickness
				},
				{
					type: "elem",
					elem: line
				},
				{
					type: "kern",
					size: 3 * defaultRuleThickness
				},
				{
					type: "elem",
					elem: innerGroup
				}
			]
		})], options);
	},
	mathmlBuilder(group, options) {
		var operator = new MathNode("mo", [new TextNode("‾")]);
		operator.setAttribute("stretchy", "true");
		var node = new MathNode("munder", [buildGroup(group.body, options), operator]);
		node.setAttribute("accentunder", "true");
		return node;
	}
});
defineFunction({
	type: "vcenter",
	names: ["\\vcenter"],
	props: {
		numArgs: 1,
		argTypes: ["original"],
		allowedInText: false
	},
	handler(_ref, args) {
		var { parser } = _ref;
		return {
			type: "vcenter",
			mode: parser.mode,
			body: args[0]
		};
	},
	htmlBuilder(group, options) {
		var body = buildGroup$1(group.body, options);
		var axisHeight = options.fontMetrics().axisHeight;
		return makeVList({
			positionType: "shift",
			positionData: .5 * (body.height - axisHeight - (body.depth + axisHeight)),
			children: [{
				type: "elem",
				elem: body
			}]
		});
	},
	mathmlBuilder(group, options) {
		return new MathNode("mpadded", [buildGroup(group.body, options)], ["vcenter"]);
	}
});
defineFunction({
	type: "verb",
	names: ["\\verb"],
	props: {
		numArgs: 0,
		allowedInText: true
	},
	handler(context, args, optArgs) {
		throw new ParseError("\\verb ended by end of line instead of matching delimiter");
	},
	htmlBuilder(group, options) {
		var text = makeVerb(group);
		var body = [];
		var newOptions = options.havingStyle(options.style.text());
		for (var i = 0; i < text.length; i++) {
			var c = text[i];
			if (c === "~") c = "\\textasciitilde";
			body.push(makeSymbol(c, "Typewriter-Regular", group.mode, newOptions, ["mord", "texttt"]));
		}
		return makeSpan(["mord", "text"].concat(newOptions.sizingClasses(options)), tryCombineChars(body), newOptions);
	},
	mathmlBuilder(group, options) {
		var node = new MathNode("mtext", [new TextNode(makeVerb(group))]);
		node.setAttribute("mathvariant", "monospace");
		return node;
	}
});
/**
* Converts verb group into body string.
*
* \verb* replaces each space with an open box \u2423
* \verb replaces each space with a no-break space \xA0
*/
var makeVerb = (group) => group.body.replace(/ /g, group.star ? "␣" : "\xA0");
/** Include this to ensure that all functions are defined. */
var functions = _functions;
/**
* The Lexer class handles tokenizing the input in various ways. Since our
* parser expects us to be able to backtrack, the lexer allows lexing from any
* given starting point.
*
* Its main exposed function is the `lex` function, which takes a position to
* lex from and a type of token to lex. It defers to the appropriate `_innerLex`
* function.
*
* The various `_innerLex` functions perform the actual lexing of different
* kinds.
*/
var spaceRegexString = "[ \r\n	]";
var controlWordRegexString = "\\\\[a-zA-Z@]+";
var controlSymbolRegexString = "\\\\[^\ud800-\udfff]";
var controlWordWhitespaceRegexString = "(" + controlWordRegexString + ")" + spaceRegexString + "*";
var controlSpaceRegexString = "\\\\(\n|[ \r	]+\n?)[ \r	]*";
var combiningDiacriticalMarkString = "[̀-ͯ]";
var combiningDiacriticalMarksEndRegex = new RegExp(combiningDiacriticalMarkString + "+$");
var tokenRegexString = "(" + spaceRegexString + "+)|" + (controlSpaceRegexString + "|") + "([!-\\[\\]-‧‪-퟿豈-￿]" + (combiningDiacriticalMarkString + "*") + "|[\ud800-\udbff][\udc00-\udfff]" + (combiningDiacriticalMarkString + "*") + "|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + ("|" + controlWordWhitespaceRegexString) + ("|" + controlSymbolRegexString + ")");
/** Main Lexer class */
var Lexer = class {
	constructor(input, settings) {
		this.input = input;
		this.settings = settings;
		this.tokenRegex = new RegExp(tokenRegexString, "g");
		this.catcodes = {
			"%": 14,
			"~": 13
		};
	}
	setCatcode(char, code) {
		this.catcodes[char] = code;
	}
	/**
	* This function lexes a single token.
	*/
	lex() {
		var input = this.input;
		var pos = this.tokenRegex.lastIndex;
		if (pos === input.length) return new Token("EOF", new SourceLocation(this, pos, pos));
		var match = this.tokenRegex.exec(input);
		if (match === null || match.index !== pos) throw new ParseError("Unexpected character: '" + input[pos] + "'", new Token(input[pos], new SourceLocation(this, pos, pos + 1)));
		var text = match[6] || match[3] || (match[2] ? "\\ " : " ");
		if (this.catcodes[text] === 14) {
			var nlIndex = input.indexOf("\n", this.tokenRegex.lastIndex);
			if (nlIndex === -1) {
				this.tokenRegex.lastIndex = input.length;
				this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)");
			} else this.tokenRegex.lastIndex = nlIndex + 1;
			return this.lex();
		}
		return new Token(text, new SourceLocation(this, pos, this.tokenRegex.lastIndex));
	}
};
/**
* A `Namespace` refers to a space of nameable things like macros or lengths,
* which can be `set` either globally or local to a nested group, using an
* undo stack similar to how TeX implements this functionality.
* Performance-wise, `get` and local `set` take constant time, while global
* `set` takes time proportional to the depth of group nesting.
*/
var Namespace = class {
	/**
	* Both arguments are optional.  The first argument is an object of
	* built-in mappings which never change.  The second argument is an object
	* of initial (global-level) mappings, which will constantly change
	* according to any global/top-level `set`s done.
	*/
	constructor(builtins, globalMacros) {
		if (builtins === void 0) builtins = {};
		if (globalMacros === void 0) globalMacros = {};
		this.current = globalMacros;
		this.builtins = builtins;
		this.undefStack = [];
	}
	/**
	* Start a new nested group, affecting future local `set`s.
	*/
	beginGroup() {
		this.undefStack.push({});
	}
	/**
	* End current nested group, restoring values before the group began.
	*/
	endGroup() {
		if (this.undefStack.length === 0) throw new ParseError("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
		var undefs = this.undefStack.pop();
		for (var undef in undefs) if (undefs.hasOwnProperty(undef)) if (undefs[undef] == null) delete this.current[undef];
		else this.current[undef] = undefs[undef];
	}
	/**
	* Ends all currently nested groups (if any), restoring values before the
	* groups began.  Useful in case of an error in the middle of parsing.
	*/
	endGroups() {
		while (this.undefStack.length > 0) this.endGroup();
	}
	/**
	* Detect whether `name` has a definition.  Equivalent to
	* `get(name) != null`.
	*/
	has(name) {
		return this.current.hasOwnProperty(name) || this.builtins.hasOwnProperty(name);
	}
	/**
	* Get the current value of a name, or `undefined` if there is no value.
	*
	* Note: Do not use `if (namespace.get(...))` to detect whether a macro
	* is defined, as the definition may be the empty string which evaluates
	* to `false` in JavaScript.  Use `if (namespace.get(...) != null)` or
	* `if (namespace.has(...))`.
	*/
	get(name) {
		if (this.current.hasOwnProperty(name)) return this.current[name];
		else return this.builtins[name];
	}
	/**
	* Set the current value of a name, and optionally set it globally too.
	* Local set() sets the current value and (when appropriate) adds an undo
	* operation to the undo stack.  Global set() may change the undo
	* operation at every level, so takes time linear in their number.
	* A value of undefined means to delete existing definitions.
	*/
	set(name, value, global) {
		if (global === void 0) global = false;
		if (global) {
			for (var i = 0; i < this.undefStack.length; i++) delete this.undefStack[i][name];
			if (this.undefStack.length > 0) this.undefStack[this.undefStack.length - 1][name] = value;
		} else {
			var top = this.undefStack[this.undefStack.length - 1];
			if (top && !top.hasOwnProperty(name)) top[name] = this.current[name];
		}
		if (value == null) delete this.current[name];
		else this.current[name] = value;
	}
};
/**
* Predefined macros for KaTeX.
* This can be used to define some commands in terms of others.
*/
var macros = _macros;
defineMacro("\\noexpand", function(context) {
	var t = context.popToken();
	if (context.isExpandable(t.text)) {
		t.noexpand = true;
		t.treatAsRelax = true;
	}
	return {
		tokens: [t],
		numArgs: 0
	};
});
defineMacro("\\expandafter", function(context) {
	var t = context.popToken();
	context.expandOnce(true);
	return {
		tokens: [t],
		numArgs: 0
	};
});
defineMacro("\\@firstoftwo", function(context) {
	return {
		tokens: context.consumeArgs(2)[0],
		numArgs: 0
	};
});
defineMacro("\\@secondoftwo", function(context) {
	return {
		tokens: context.consumeArgs(2)[1],
		numArgs: 0
	};
});
defineMacro("\\@ifnextchar", function(context) {
	var args = context.consumeArgs(3);
	context.consumeSpaces();
	var nextToken = context.future();
	if (args[0].length === 1 && args[0][0].text === nextToken.text) return {
		tokens: args[1],
		numArgs: 0
	};
	else return {
		tokens: args[2],
		numArgs: 0
	};
});
defineMacro("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
defineMacro("\\TextOrMath", function(context) {
	var args = context.consumeArgs(2);
	if (context.mode === "text") return {
		tokens: args[0],
		numArgs: 0
	};
	else return {
		tokens: args[1],
		numArgs: 0
	};
});
var digitToNumber = {
	"0": 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"a": 10,
	"A": 10,
	"b": 11,
	"B": 11,
	"c": 12,
	"C": 12,
	"d": 13,
	"D": 13,
	"e": 14,
	"E": 14,
	"f": 15,
	"F": 15
};
defineMacro("\\char", function(context) {
	var token = context.popToken();
	var base;
	var number = 0;
	if (token.text === "'") {
		base = 8;
		token = context.popToken();
	} else if (token.text === "\"") {
		base = 16;
		token = context.popToken();
	} else if (token.text === "`") {
		token = context.popToken();
		if (token.text[0] === "\\") number = token.text.charCodeAt(1);
		else if (token.text === "EOF") throw new ParseError("\\char` missing argument");
		else number = token.text.charCodeAt(0);
	} else base = 10;
	if (base) {
		number = digitToNumber[token.text];
		if (number == null || number >= base) throw new ParseError("Invalid base-" + base + " digit " + token.text);
		var digit;
		while ((digit = digitToNumber[context.future().text]) != null && digit < base) {
			number *= base;
			number += digit;
			context.popToken();
		}
	}
	return "\\@char{" + number + "}";
});
var newcommand = (context, existsOK, nonexistsOK, skipIfExists) => {
	var arg = context.consumeArg().tokens;
	if (arg.length !== 1) throw new ParseError("\\newcommand's first argument must be a macro name");
	var name = arg[0].text;
	var exists = context.isDefined(name);
	if (exists && !existsOK) throw new ParseError("\\newcommand{" + name + "} attempting to redefine " + (name + "; use \\renewcommand"));
	if (!exists && !nonexistsOK) throw new ParseError("\\renewcommand{" + name + "} when command " + name + " does not yet exist; use \\newcommand");
	var numArgs = 0;
	arg = context.consumeArg().tokens;
	if (arg.length === 1 && arg[0].text === "[") {
		var argText = "";
		var token = context.expandNextToken();
		while (token.text !== "]" && token.text !== "EOF") {
			argText += token.text;
			token = context.expandNextToken();
		}
		if (!argText.match(/^\s*[0-9]+\s*$/)) throw new ParseError("Invalid number of arguments: " + argText);
		numArgs = parseInt(argText);
		arg = context.consumeArg().tokens;
	}
	if (!(exists && skipIfExists)) context.macros.set(name, {
		tokens: arg,
		numArgs
	});
	return "";
};
defineMacro("\\newcommand", (context) => newcommand(context, false, true, false));
defineMacro("\\renewcommand", (context) => newcommand(context, true, false, false));
defineMacro("\\providecommand", (context) => newcommand(context, true, true, true));
defineMacro("\\message", (context) => {
	var arg = context.consumeArgs(1)[0];
	console.log(arg.reverse().map((token) => token.text).join(""));
	return "";
});
defineMacro("\\errmessage", (context) => {
	var arg = context.consumeArgs(1)[0];
	console.error(arg.reverse().map((token) => token.text).join(""));
	return "";
});
defineMacro("\\show", (context) => {
	var tok = context.popToken();
	var name = tok.text;
	console.log(tok, context.macros.get(name), functions[name], symbols.math[name], symbols.text[name]);
	return "";
});
defineMacro("\\bgroup", "{");
defineMacro("\\egroup", "}");
defineMacro("~", "\\nobreakspace");
defineMacro("\\lq", "`");
defineMacro("\\rq", "'");
defineMacro("\\aa", "\\r a");
defineMacro("\\AA", "\\r A");
defineMacro("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}");
defineMacro("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
defineMacro("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}");
defineMacro("ℬ", "\\mathscr{B}");
defineMacro("ℰ", "\\mathscr{E}");
defineMacro("ℱ", "\\mathscr{F}");
defineMacro("ℋ", "\\mathscr{H}");
defineMacro("ℐ", "\\mathscr{I}");
defineMacro("ℒ", "\\mathscr{L}");
defineMacro("ℳ", "\\mathscr{M}");
defineMacro("ℛ", "\\mathscr{R}");
defineMacro("ℭ", "\\mathfrak{C}");
defineMacro("ℌ", "\\mathfrak{H}");
defineMacro("ℨ", "\\mathfrak{Z}");
defineMacro("\\Bbbk", "\\Bbb{k}");
defineMacro("·", "\\cdotp");
defineMacro("\\llap", "\\mathllap{\\textrm{#1}}");
defineMacro("\\rlap", "\\mathrlap{\\textrm{#1}}");
defineMacro("\\clap", "\\mathclap{\\textrm{#1}}");
defineMacro("\\mathstrut", "\\vphantom{(}");
defineMacro("\\underbar", "\\underline{\\text{#1}}");
defineMacro("\\not", "\\html@mathml{\\mathrel{\\mathrlap\\@not}\\nobreak}{\\char\"338}");
defineMacro("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}");
defineMacro("\\ne", "\\neq");
defineMacro("≠", "\\neq");
defineMacro("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}");
defineMacro("∉", "\\notin");
defineMacro("≘", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}");
defineMacro("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}");
defineMacro("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}");
defineMacro("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}");
defineMacro("≝", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}");
defineMacro("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}");
defineMacro("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}");
defineMacro("⟂", "\\perp");
defineMacro("‼", "\\mathclose{!\\mkern-0.8mu!}");
defineMacro("∌", "\\notni");
defineMacro("⌜", "\\ulcorner");
defineMacro("⌝", "\\urcorner");
defineMacro("⌞", "\\llcorner");
defineMacro("⌟", "\\lrcorner");
defineMacro("©", "\\copyright");
defineMacro("®", "\\textregistered");
defineMacro("\\ulcorner", "\\html@mathml{\\@ulcorner}{\\mathop{\\char\"231c}}");
defineMacro("\\urcorner", "\\html@mathml{\\@urcorner}{\\mathop{\\char\"231d}}");
defineMacro("\\llcorner", "\\html@mathml{\\@llcorner}{\\mathop{\\char\"231e}}");
defineMacro("\\lrcorner", "\\html@mathml{\\@lrcorner}{\\mathop{\\char\"231f}}");
defineMacro("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
defineMacro("⋮", "\\vdots");
defineMacro("\\varGamma", "\\mathit{\\Gamma}");
defineMacro("\\varDelta", "\\mathit{\\Delta}");
defineMacro("\\varTheta", "\\mathit{\\Theta}");
defineMacro("\\varLambda", "\\mathit{\\Lambda}");
defineMacro("\\varXi", "\\mathit{\\Xi}");
defineMacro("\\varPi", "\\mathit{\\Pi}");
defineMacro("\\varSigma", "\\mathit{\\Sigma}");
defineMacro("\\varUpsilon", "\\mathit{\\Upsilon}");
defineMacro("\\varPhi", "\\mathit{\\Phi}");
defineMacro("\\varPsi", "\\mathit{\\Psi}");
defineMacro("\\varOmega", "\\mathit{\\Omega}");
defineMacro("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
defineMacro("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
defineMacro("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
defineMacro("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
defineMacro("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
defineMacro("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
defineMacro("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");
defineMacro("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
var dotsByToken = {
	",": "\\dotsc",
	"\\not": "\\dotsb",
	"+": "\\dotsb",
	"=": "\\dotsb",
	"<": "\\dotsb",
	">": "\\dotsb",
	"-": "\\dotsb",
	"*": "\\dotsb",
	":": "\\dotsb",
	"\\DOTSB": "\\dotsb",
	"\\coprod": "\\dotsb",
	"\\bigvee": "\\dotsb",
	"\\bigwedge": "\\dotsb",
	"\\biguplus": "\\dotsb",
	"\\bigcap": "\\dotsb",
	"\\bigcup": "\\dotsb",
	"\\prod": "\\dotsb",
	"\\sum": "\\dotsb",
	"\\bigotimes": "\\dotsb",
	"\\bigoplus": "\\dotsb",
	"\\bigodot": "\\dotsb",
	"\\bigsqcup": "\\dotsb",
	"\\And": "\\dotsb",
	"\\longrightarrow": "\\dotsb",
	"\\Longrightarrow": "\\dotsb",
	"\\longleftarrow": "\\dotsb",
	"\\Longleftarrow": "\\dotsb",
	"\\longleftrightarrow": "\\dotsb",
	"\\Longleftrightarrow": "\\dotsb",
	"\\mapsto": "\\dotsb",
	"\\longmapsto": "\\dotsb",
	"\\hookrightarrow": "\\dotsb",
	"\\doteq": "\\dotsb",
	"\\mathbin": "\\dotsb",
	"\\mathrel": "\\dotsb",
	"\\relbar": "\\dotsb",
	"\\Relbar": "\\dotsb",
	"\\xrightarrow": "\\dotsb",
	"\\xleftarrow": "\\dotsb",
	"\\DOTSI": "\\dotsi",
	"\\int": "\\dotsi",
	"\\oint": "\\dotsi",
	"\\iint": "\\dotsi",
	"\\iiint": "\\dotsi",
	"\\iiiint": "\\dotsi",
	"\\idotsint": "\\dotsi",
	"\\DOTSX": "\\dotsx"
};
var dotsbGroups = new Set(["bin", "rel"]);
defineMacro("\\dots", function(context) {
	var thedots = "\\dotso";
	var next = context.expandAfterFuture().text;
	if (next in dotsByToken) thedots = dotsByToken[next];
	else if (next.slice(0, 4) === "\\not") thedots = "\\dotsb";
	else if (next in symbols.math) {
		if (dotsbGroups.has(symbols.math[next].group)) thedots = "\\dotsb";
	}
	return thedots;
});
var spaceAfterDots = {
	")": true,
	"]": true,
	"\\rbrack": true,
	"\\}": true,
	"\\rbrace": true,
	"\\rangle": true,
	"\\rceil": true,
	"\\rfloor": true,
	"\\rgroup": true,
	"\\rmoustache": true,
	"\\right": true,
	"\\bigr": true,
	"\\biggr": true,
	"\\Bigr": true,
	"\\Biggr": true,
	"$": true,
	";": true,
	".": true,
	",": true
};
defineMacro("\\dotso", function(context) {
	if (context.future().text in spaceAfterDots) return "\\ldots\\,";
	else return "\\ldots";
});
defineMacro("\\dotsc", function(context) {
	var next = context.future().text;
	if (next in spaceAfterDots && next !== ",") return "\\ldots\\,";
	else return "\\ldots";
});
defineMacro("\\cdots", function(context) {
	if (context.future().text in spaceAfterDots) return "\\@cdots\\,";
	else return "\\@cdots";
});
defineMacro("\\dotsb", "\\cdots");
defineMacro("\\dotsm", "\\cdots");
defineMacro("\\dotsi", "\\!\\cdots");
defineMacro("\\dotsx", "\\ldots\\,");
defineMacro("\\DOTSI", "\\relax");
defineMacro("\\DOTSB", "\\relax");
defineMacro("\\DOTSX", "\\relax");
defineMacro("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
defineMacro("\\,", "\\tmspace+{3mu}{.1667em}");
defineMacro("\\thinspace", "\\,");
defineMacro("\\>", "\\mskip{4mu}");
defineMacro("\\:", "\\tmspace+{4mu}{.2222em}");
defineMacro("\\medspace", "\\:");
defineMacro("\\;", "\\tmspace+{5mu}{.2777em}");
defineMacro("\\thickspace", "\\;");
defineMacro("\\!", "\\tmspace-{3mu}{.1667em}");
defineMacro("\\negthinspace", "\\!");
defineMacro("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
defineMacro("\\negthickspace", "\\tmspace-{5mu}{.277em}");
defineMacro("\\enspace", "\\kern.5em ");
defineMacro("\\enskip", "\\hskip.5em\\relax");
defineMacro("\\quad", "\\hskip1em\\relax");
defineMacro("\\qquad", "\\hskip2em\\relax");
defineMacro("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
defineMacro("\\tag@paren", "\\tag@literal{({#1})}");
defineMacro("\\tag@literal", (context) => {
	if (context.macros.get("\\df@tag")) throw new ParseError("Multiple \\tag");
	return "\\gdef\\df@tag{\\text{#1}}";
});
defineMacro("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
defineMacro("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
defineMacro("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
defineMacro("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
defineMacro("\\newline", "\\\\\\relax");
defineMacro("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
var latexRaiseA = makeEm(fontMetricsData["Main-Regular"]["T".charCodeAt(0)][1] - .7 * fontMetricsData["Main-Regular"]["A".charCodeAt(0)][1]);
defineMacro("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
defineMacro("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
defineMacro("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
defineMacro("\\@hspace", "\\hskip #1\\relax");
defineMacro("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
defineMacro("\\ordinarycolon", ":");
defineMacro("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
defineMacro("\\dblcolon", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char\"2237}}");
defineMacro("\\coloneqq", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char\"2254}}");
defineMacro("\\Coloneqq", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char\"2237\\char\"3d}}");
defineMacro("\\coloneq", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char\"3a\\char\"2212}}");
defineMacro("\\Coloneq", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char\"2237\\char\"2212}}");
defineMacro("\\eqqcolon", "\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char\"2255}}");
defineMacro("\\Eqqcolon", "\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char\"3d\\char\"2237}}");
defineMacro("\\eqcolon", "\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char\"2239}}");
defineMacro("\\Eqcolon", "\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char\"2212\\char\"2237}}");
defineMacro("\\colonapprox", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char\"3a\\char\"2248}}");
defineMacro("\\Colonapprox", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char\"2237\\char\"2248}}");
defineMacro("\\colonsim", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char\"3a\\char\"223c}}");
defineMacro("\\Colonsim", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char\"2237\\char\"223c}}");
defineMacro("∷", "\\dblcolon");
defineMacro("∹", "\\eqcolon");
defineMacro("≔", "\\coloneqq");
defineMacro("≕", "\\eqqcolon");
defineMacro("⩴", "\\Coloneqq");
defineMacro("\\ratio", "\\vcentcolon");
defineMacro("\\coloncolon", "\\dblcolon");
defineMacro("\\colonequals", "\\coloneqq");
defineMacro("\\coloncolonequals", "\\Coloneqq");
defineMacro("\\equalscolon", "\\eqqcolon");
defineMacro("\\equalscoloncolon", "\\Eqqcolon");
defineMacro("\\colonminus", "\\coloneq");
defineMacro("\\coloncolonminus", "\\Coloneq");
defineMacro("\\minuscolon", "\\eqcolon");
defineMacro("\\minuscoloncolon", "\\Eqcolon");
defineMacro("\\coloncolonapprox", "\\Colonapprox");
defineMacro("\\coloncolonsim", "\\Colonsim");
defineMacro("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
defineMacro("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
defineMacro("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
defineMacro("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
defineMacro("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}");
defineMacro("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
defineMacro("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
defineMacro("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
defineMacro("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
defineMacro("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
defineMacro("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
defineMacro("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
defineMacro("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
defineMacro("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}");
defineMacro("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}");
defineMacro("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}");
defineMacro("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}");
defineMacro("\\nleqq", "\\html@mathml{\\@nleqq}{≰}");
defineMacro("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}");
defineMacro("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}");
defineMacro("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}");
defineMacro("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}");
defineMacro("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}");
defineMacro("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}");
defineMacro("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}");
defineMacro("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}");
defineMacro("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}");
defineMacro("\\imath", "\\html@mathml{\\@imath}{ı}");
defineMacro("\\jmath", "\\html@mathml{\\@jmath}{ȷ}");
defineMacro("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}");
defineMacro("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}");
defineMacro("⟦", "\\llbracket");
defineMacro("⟧", "\\rrbracket");
defineMacro("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}");
defineMacro("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}");
defineMacro("⦃", "\\lBrace");
defineMacro("⦄", "\\rBrace");
defineMacro("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}");
defineMacro("⦵", "\\minuso");
defineMacro("\\darr", "\\downarrow");
defineMacro("\\dArr", "\\Downarrow");
defineMacro("\\Darr", "\\Downarrow");
defineMacro("\\lang", "\\langle");
defineMacro("\\rang", "\\rangle");
defineMacro("\\uarr", "\\uparrow");
defineMacro("\\uArr", "\\Uparrow");
defineMacro("\\Uarr", "\\Uparrow");
defineMacro("\\N", "\\mathbb{N}");
defineMacro("\\R", "\\mathbb{R}");
defineMacro("\\Z", "\\mathbb{Z}");
defineMacro("\\alef", "\\aleph");
defineMacro("\\alefsym", "\\aleph");
defineMacro("\\Alpha", "\\mathrm{A}");
defineMacro("\\Beta", "\\mathrm{B}");
defineMacro("\\bull", "\\bullet");
defineMacro("\\Chi", "\\mathrm{X}");
defineMacro("\\clubs", "\\clubsuit");
defineMacro("\\cnums", "\\mathbb{C}");
defineMacro("\\Complex", "\\mathbb{C}");
defineMacro("\\Dagger", "\\ddagger");
defineMacro("\\diamonds", "\\diamondsuit");
defineMacro("\\empty", "\\emptyset");
defineMacro("\\Epsilon", "\\mathrm{E}");
defineMacro("\\Eta", "\\mathrm{H}");
defineMacro("\\exist", "\\exists");
defineMacro("\\harr", "\\leftrightarrow");
defineMacro("\\hArr", "\\Leftrightarrow");
defineMacro("\\Harr", "\\Leftrightarrow");
defineMacro("\\hearts", "\\heartsuit");
defineMacro("\\image", "\\Im");
defineMacro("\\infin", "\\infty");
defineMacro("\\Iota", "\\mathrm{I}");
defineMacro("\\isin", "\\in");
defineMacro("\\Kappa", "\\mathrm{K}");
defineMacro("\\larr", "\\leftarrow");
defineMacro("\\lArr", "\\Leftarrow");
defineMacro("\\Larr", "\\Leftarrow");
defineMacro("\\lrarr", "\\leftrightarrow");
defineMacro("\\lrArr", "\\Leftrightarrow");
defineMacro("\\Lrarr", "\\Leftrightarrow");
defineMacro("\\Mu", "\\mathrm{M}");
defineMacro("\\natnums", "\\mathbb{N}");
defineMacro("\\Nu", "\\mathrm{N}");
defineMacro("\\Omicron", "\\mathrm{O}");
defineMacro("\\plusmn", "\\pm");
defineMacro("\\rarr", "\\rightarrow");
defineMacro("\\rArr", "\\Rightarrow");
defineMacro("\\Rarr", "\\Rightarrow");
defineMacro("\\real", "\\Re");
defineMacro("\\reals", "\\mathbb{R}");
defineMacro("\\Reals", "\\mathbb{R}");
defineMacro("\\Rho", "\\mathrm{P}");
defineMacro("\\sdot", "\\cdot");
defineMacro("\\sect", "\\S");
defineMacro("\\spades", "\\spadesuit");
defineMacro("\\sub", "\\subset");
defineMacro("\\sube", "\\subseteq");
defineMacro("\\supe", "\\supseteq");
defineMacro("\\Tau", "\\mathrm{T}");
defineMacro("\\thetasym", "\\vartheta");
defineMacro("\\weierp", "\\wp");
defineMacro("\\Zeta", "\\mathrm{Z}");
defineMacro("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
defineMacro("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
defineMacro("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
defineMacro("\\bra", "\\mathinner{\\langle{#1}|}");
defineMacro("\\ket", "\\mathinner{|{#1}\\rangle}");
defineMacro("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
defineMacro("\\Bra", "\\left\\langle#1\\right|");
defineMacro("\\Ket", "\\left|#1\\right\\rangle");
var braketHelper = (one) => (context) => {
	var left = context.consumeArg().tokens;
	var middle = context.consumeArg().tokens;
	var middleDouble = context.consumeArg().tokens;
	var right = context.consumeArg().tokens;
	var oldMiddle = context.macros.get("|");
	var oldMiddleDouble = context.macros.get("\\|");
	context.macros.beginGroup();
	var midMacro = (double) => (context) => {
		if (one) {
			context.macros.set("|", oldMiddle);
			if (middleDouble.length) context.macros.set("\\|", oldMiddleDouble);
		}
		var doubled = double;
		if (!double && middleDouble.length) {
			if (context.future().text === "|") {
				context.popToken();
				doubled = true;
			}
		}
		return {
			tokens: doubled ? middleDouble : middle,
			numArgs: 0
		};
	};
	context.macros.set("|", midMacro(false));
	if (middleDouble.length) context.macros.set("\\|", midMacro(true));
	var arg = context.consumeArg().tokens;
	var expanded = context.expandTokens([
		...right,
		...arg,
		...left
	]);
	context.macros.endGroup();
	return {
		tokens: expanded.reverse(),
		numArgs: 0
	};
};
defineMacro("\\bra@ket", braketHelper(false));
defineMacro("\\bra@set", braketHelper(true));
defineMacro("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
defineMacro("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
defineMacro("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
defineMacro("\\angln", "{\\angl n}");
defineMacro("\\blue", "\\textcolor{##6495ed}{#1}");
defineMacro("\\orange", "\\textcolor{##ffa500}{#1}");
defineMacro("\\pink", "\\textcolor{##ff00af}{#1}");
defineMacro("\\red", "\\textcolor{##df0030}{#1}");
defineMacro("\\green", "\\textcolor{##28ae7b}{#1}");
defineMacro("\\gray", "\\textcolor{gray}{#1}");
defineMacro("\\purple", "\\textcolor{##9d38bd}{#1}");
defineMacro("\\blueA", "\\textcolor{##ccfaff}{#1}");
defineMacro("\\blueB", "\\textcolor{##80f6ff}{#1}");
defineMacro("\\blueC", "\\textcolor{##63d9ea}{#1}");
defineMacro("\\blueD", "\\textcolor{##11accd}{#1}");
defineMacro("\\blueE", "\\textcolor{##0c7f99}{#1}");
defineMacro("\\tealA", "\\textcolor{##94fff5}{#1}");
defineMacro("\\tealB", "\\textcolor{##26edd5}{#1}");
defineMacro("\\tealC", "\\textcolor{##01d1c1}{#1}");
defineMacro("\\tealD", "\\textcolor{##01a995}{#1}");
defineMacro("\\tealE", "\\textcolor{##208170}{#1}");
defineMacro("\\greenA", "\\textcolor{##b6ffb0}{#1}");
defineMacro("\\greenB", "\\textcolor{##8af281}{#1}");
defineMacro("\\greenC", "\\textcolor{##74cf70}{#1}");
defineMacro("\\greenD", "\\textcolor{##1fab54}{#1}");
defineMacro("\\greenE", "\\textcolor{##0d923f}{#1}");
defineMacro("\\goldA", "\\textcolor{##ffd0a9}{#1}");
defineMacro("\\goldB", "\\textcolor{##ffbb71}{#1}");
defineMacro("\\goldC", "\\textcolor{##ff9c39}{#1}");
defineMacro("\\goldD", "\\textcolor{##e07d10}{#1}");
defineMacro("\\goldE", "\\textcolor{##a75a05}{#1}");
defineMacro("\\redA", "\\textcolor{##fca9a9}{#1}");
defineMacro("\\redB", "\\textcolor{##ff8482}{#1}");
defineMacro("\\redC", "\\textcolor{##f9685d}{#1}");
defineMacro("\\redD", "\\textcolor{##e84d39}{#1}");
defineMacro("\\redE", "\\textcolor{##bc2612}{#1}");
defineMacro("\\maroonA", "\\textcolor{##ffbde0}{#1}");
defineMacro("\\maroonB", "\\textcolor{##ff92c6}{#1}");
defineMacro("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
defineMacro("\\maroonD", "\\textcolor{##ca337c}{#1}");
defineMacro("\\maroonE", "\\textcolor{##9e034e}{#1}");
defineMacro("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
defineMacro("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
defineMacro("\\purpleC", "\\textcolor{##aa87ff}{#1}");
defineMacro("\\purpleD", "\\textcolor{##7854ab}{#1}");
defineMacro("\\purpleE", "\\textcolor{##543b78}{#1}");
defineMacro("\\mintA", "\\textcolor{##f5f9e8}{#1}");
defineMacro("\\mintB", "\\textcolor{##edf2df}{#1}");
defineMacro("\\mintC", "\\textcolor{##e0e5cc}{#1}");
defineMacro("\\grayA", "\\textcolor{##f6f7f7}{#1}");
defineMacro("\\grayB", "\\textcolor{##f0f1f2}{#1}");
defineMacro("\\grayC", "\\textcolor{##e3e5e6}{#1}");
defineMacro("\\grayD", "\\textcolor{##d6d8da}{#1}");
defineMacro("\\grayE", "\\textcolor{##babec2}{#1}");
defineMacro("\\grayF", "\\textcolor{##888d93}{#1}");
defineMacro("\\grayG", "\\textcolor{##626569}{#1}");
defineMacro("\\grayH", "\\textcolor{##3b3e40}{#1}");
defineMacro("\\grayI", "\\textcolor{##21242c}{#1}");
defineMacro("\\kaBlue", "\\textcolor{##314453}{#1}");
defineMacro("\\kaGreen", "\\textcolor{##71B307}{#1}");
/**
* This file contains the “gullet” where macros are expanded
* until only non-macro tokens remain.
*/
var implicitCommands = {
	"^": true,
	"_": true,
	"\\limits": true,
	"\\nolimits": true
};
var MacroExpander = class {
	constructor(input, settings, mode) {
		this.settings = settings;
		this.expansionCount = 0;
		this.feed(input);
		this.macros = new Namespace(macros, settings.macros);
		this.mode = mode;
		this.stack = [];
	}
	/**
	* Feed a new input string to the same MacroExpander
	* (with existing macros etc.).
	*/
	feed(input) {
		this.lexer = new Lexer(input, this.settings);
	}
	/**
	* Switches between "text" and "math" modes.
	*/
	switchMode(newMode) {
		this.mode = newMode;
	}
	/**
	* Start a new group nesting within all namespaces.
	*/
	beginGroup() {
		this.macros.beginGroup();
	}
	/**
	* End current group nesting within all namespaces.
	*/
	endGroup() {
		this.macros.endGroup();
	}
	/**
	* Ends all currently nested groups (if any), restoring values before the
	* groups began.  Useful in case of an error in the middle of parsing.
	*/
	endGroups() {
		this.macros.endGroups();
	}
	/**
	* Returns the topmost token on the stack, without expanding it.
	* Similar in behavior to TeX's `\futurelet`.
	*/
	future() {
		if (this.stack.length === 0) this.pushToken(this.lexer.lex());
		return this.stack[this.stack.length - 1];
	}
	/**
	* Remove and return the next unexpanded token.
	*/
	popToken() {
		this.future();
		return this.stack.pop();
	}
	/**
	* Add a given token to the token stack.  In particular, this get be used
	* to put back a token returned from one of the other methods.
	*/
	pushToken(token) {
		this.stack.push(token);
	}
	/**
	* Append an array of tokens to the token stack.
	*/
	pushTokens(tokens) {
		this.stack.push(...tokens);
	}
	/**
	* Find an macro argument without expanding tokens and append the array of
	* tokens to the token stack. Uses Token as a container for the result.
	*/
	scanArgument(isOptional) {
		var start;
		var end;
		var tokens;
		if (isOptional) {
			this.consumeSpaces();
			if (this.future().text !== "[") return null;
			start = this.popToken();
			({tokens, end} = this.consumeArg(["]"]));
		} else ({tokens, start, end} = this.consumeArg());
		this.pushToken(new Token("EOF", end.loc));
		this.pushTokens(tokens);
		return new Token("", SourceLocation.range(start, end));
	}
	/**
	* Consume all following space tokens, without expansion.
	*/
	consumeSpaces() {
		for (;;) if (this.future().text === " ") this.stack.pop();
		else break;
	}
	/**
	* Consume an argument from the token stream, and return the resulting array
	* of tokens and start/end token.
	*/
	consumeArg(delims) {
		var tokens = [];
		var isDelimited = delims && delims.length > 0;
		if (!isDelimited) this.consumeSpaces();
		var start = this.future();
		var tok;
		var depth = 0;
		var match = 0;
		do {
			tok = this.popToken();
			tokens.push(tok);
			if (tok.text === "{") ++depth;
			else if (tok.text === "}") {
				--depth;
				if (depth === -1) throw new ParseError("Extra }", tok);
			} else if (tok.text === "EOF") throw new ParseError("Unexpected end of input in a macro argument, expected '" + (delims && isDelimited ? delims[match] : "}") + "'", tok);
			if (delims && isDelimited) if ((depth === 0 || depth === 1 && delims[match] === "{") && tok.text === delims[match]) {
				++match;
				if (match === delims.length) {
					tokens.splice(-match, match);
					break;
				}
			} else match = 0;
		} while (depth !== 0 || isDelimited);
		if (start.text === "{" && tokens[tokens.length - 1].text === "}") {
			tokens.pop();
			tokens.shift();
		}
		tokens.reverse();
		return {
			tokens,
			start,
			end: tok
		};
	}
	/**
	* Consume the specified number of (delimited) arguments from the token
	* stream and return the resulting array of arguments.
	*/
	consumeArgs(numArgs, delimiters) {
		if (delimiters) {
			if (delimiters.length !== numArgs + 1) throw new ParseError("The length of delimiters doesn't match the number of args!");
			var delims = delimiters[0];
			for (var i = 0; i < delims.length; i++) {
				var tok = this.popToken();
				if (delims[i] !== tok.text) throw new ParseError("Use of the macro doesn't match its definition", tok);
			}
		}
		var args = [];
		for (var _i = 0; _i < numArgs; _i++) args.push(this.consumeArg(delimiters && delimiters[_i + 1]).tokens);
		return args;
	}
	/**
	* Increment `expansionCount` by the specified amount.
	* Throw an error if it exceeds `maxExpand`.
	*/
	countExpansion(amount) {
		this.expansionCount += amount;
		if (this.expansionCount > this.settings.maxExpand) throw new ParseError("Too many expansions: infinite loop or need to increase maxExpand setting");
	}
	/**
	* Expand the next token only once if possible.
	*
	* If the token is expanded, the resulting tokens will be pushed onto
	* the stack in reverse order, and the number of such tokens will be
	* returned.  This number might be zero or positive.
	*
	* If not, the return value is `false`, and the next token remains at the
	* top of the stack.
	*
	* In either case, the next token will be on the top of the stack,
	* or the stack will be empty (in case of empty expansion
	* and no other tokens).
	*
	* Used to implement `expandAfterFuture` and `expandNextToken`.
	*
	* If expandableOnly, only expandable tokens are expanded and
	* an undefined control sequence results in an error.
	*/
	expandOnce(expandableOnly) {
		var topToken = this.popToken();
		var name = topToken.text;
		var expansion = !topToken.noexpand ? this._getExpansion(name) : null;
		if (expansion == null || expandableOnly && expansion.unexpandable) {
			if (expandableOnly && expansion == null && name[0] === "\\" && !this.isDefined(name)) throw new ParseError("Undefined control sequence: " + name);
			this.pushToken(topToken);
			return false;
		}
		this.countExpansion(1);
		var tokens = expansion.tokens;
		var args = this.consumeArgs(expansion.numArgs, expansion.delimiters);
		if (expansion.numArgs) {
			tokens = tokens.slice();
			for (var i = tokens.length - 1; i >= 0; --i) {
				var tok = tokens[i];
				if (tok.text === "#") {
					if (i === 0) throw new ParseError("Incomplete placeholder at end of macro body", tok);
					tok = tokens[--i];
					if (tok.text === "#") tokens.splice(i + 1, 1);
					else if (/^[1-9]$/.test(tok.text)) tokens.splice(i, 2, ...args[+tok.text - 1]);
					else throw new ParseError("Not a valid argument number", tok);
				}
			}
		}
		this.pushTokens(tokens);
		return tokens.length;
	}
	/**
	* Expand the next token only once (if possible), and return the resulting
	* top token on the stack (without removing anything from the stack).
	* Similar in behavior to TeX's `\expandafter\futurelet`.
	* Equivalent to expandOnce() followed by future().
	*/
	expandAfterFuture() {
		this.expandOnce();
		return this.future();
	}
	/**
	* Recursively expand first token, then return first non-expandable token.
	*/
	expandNextToken() {
		for (;;) if (this.expandOnce() === false) {
			var token = this.stack.pop();
			if (token.treatAsRelax) token.text = "\\relax";
			return token;
		}
	}
	/**
	* Fully expand the given macro name and return the resulting list of
	* tokens, or return `undefined` if no such macro is defined.
	*/
	expandMacro(name) {
		return this.macros.has(name) ? this.expandTokens([new Token(name)]) : void 0;
	}
	/**
	* Fully expand the given token stream and return the resulting list of
	* tokens.  Note that the input tokens are in reverse order, but the
	* output tokens are in forward order.
	*/
	expandTokens(tokens) {
		var output = [];
		var oldStackLength = this.stack.length;
		this.pushTokens(tokens);
		while (this.stack.length > oldStackLength) if (this.expandOnce(true) === false) {
			var token = this.stack.pop();
			if (token.treatAsRelax) {
				token.noexpand = false;
				token.treatAsRelax = false;
			}
			output.push(token);
		}
		this.countExpansion(output.length);
		return output;
	}
	/**
	* Fully expand the given macro name and return the result as a string,
	* or return `undefined` if no such macro is defined.
	*/
	expandMacroAsText(name) {
		var tokens = this.expandMacro(name);
		if (tokens) return tokens.map((token) => token.text).join("");
		else return tokens;
	}
	/**
	* Returns the expanded macro as a reversed array of tokens and a macro
	* argument count.  Or returns `null` if no such macro.
	*/
	_getExpansion(name) {
		var definition = this.macros.get(name);
		if (definition == null) return definition;
		if (name.length === 1) {
			var catcode = this.lexer.catcodes[name];
			if (catcode != null && catcode !== 13) return;
		}
		var expansion = typeof definition === "function" ? definition(this) : definition;
		if (typeof expansion === "string") {
			var numArgs = 0;
			if (expansion.includes("#")) {
				var stripped = expansion.replace(/##/g, "");
				while (stripped.includes("#" + (numArgs + 1))) ++numArgs;
			}
			var bodyLexer = new Lexer(expansion, this.settings);
			var tokens = [];
			var tok = bodyLexer.lex();
			while (tok.text !== "EOF") {
				tokens.push(tok);
				tok = bodyLexer.lex();
			}
			tokens.reverse();
			return {
				tokens,
				numArgs
			};
		}
		return expansion;
	}
	/**
	* Determine whether a command is currently "defined" (has some
	* functionality), meaning that it's a macro (in the current group),
	* a function, a symbol, or one of the special commands listed in
	* `implicitCommands`.
	*/
	isDefined(name) {
		return this.macros.has(name) || functions.hasOwnProperty(name) || symbols.math.hasOwnProperty(name) || symbols.text.hasOwnProperty(name) || implicitCommands.hasOwnProperty(name);
	}
	/**
	* Determine whether a command is expandable.
	*/
	isExpandable(name) {
		var macro = this.macros.get(name);
		return macro != null ? typeof macro === "string" || typeof macro === "function" || !macro.unexpandable : functions.hasOwnProperty(name) && !functions[name].primitive;
	}
};
var unicodeSubRegEx = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/;
var uSubsAndSups = Object.freeze({
	"₊": "+",
	"₋": "-",
	"₌": "=",
	"₍": "(",
	"₎": ")",
	"₀": "0",
	"₁": "1",
	"₂": "2",
	"₃": "3",
	"₄": "4",
	"₅": "5",
	"₆": "6",
	"₇": "7",
	"₈": "8",
	"₉": "9",
	"ₐ": "a",
	"ₑ": "e",
	"ₕ": "h",
	"ᵢ": "i",
	"ⱼ": "j",
	"ₖ": "k",
	"ₗ": "l",
	"ₘ": "m",
	"ₙ": "n",
	"ₒ": "o",
	"ₚ": "p",
	"ᵣ": "r",
	"ₛ": "s",
	"ₜ": "t",
	"ᵤ": "u",
	"ᵥ": "v",
	"ₓ": "x",
	"ᵦ": "β",
	"ᵧ": "γ",
	"ᵨ": "ρ",
	"ᵩ": "ϕ",
	"ᵪ": "χ",
	"⁺": "+",
	"⁻": "-",
	"⁼": "=",
	"⁽": "(",
	"⁾": ")",
	"⁰": "0",
	"¹": "1",
	"²": "2",
	"³": "3",
	"⁴": "4",
	"⁵": "5",
	"⁶": "6",
	"⁷": "7",
	"⁸": "8",
	"⁹": "9",
	"ᴬ": "A",
	"ᴮ": "B",
	"ᴰ": "D",
	"ᴱ": "E",
	"ᴳ": "G",
	"ᴴ": "H",
	"ᴵ": "I",
	"ᴶ": "J",
	"ᴷ": "K",
	"ᴸ": "L",
	"ᴹ": "M",
	"ᴺ": "N",
	"ᴼ": "O",
	"ᴾ": "P",
	"ᴿ": "R",
	"ᵀ": "T",
	"ᵁ": "U",
	"ⱽ": "V",
	"ᵂ": "W",
	"ᵃ": "a",
	"ᵇ": "b",
	"ᶜ": "c",
	"ᵈ": "d",
	"ᵉ": "e",
	"ᶠ": "f",
	"ᵍ": "g",
	"ʰ": "h",
	"ⁱ": "i",
	"ʲ": "j",
	"ᵏ": "k",
	"ˡ": "l",
	"ᵐ": "m",
	"ⁿ": "n",
	"ᵒ": "o",
	"ᵖ": "p",
	"ʳ": "r",
	"ˢ": "s",
	"ᵗ": "t",
	"ᵘ": "u",
	"ᵛ": "v",
	"ʷ": "w",
	"ˣ": "x",
	"ʸ": "y",
	"ᶻ": "z",
	"ᵝ": "β",
	"ᵞ": "γ",
	"ᵟ": "δ",
	"ᵠ": "ϕ",
	"ᵡ": "χ",
	"ᶿ": "θ"
});
var unicodeAccents = {
	"́": {
		"text": "\\'",
		"math": "\\acute"
	},
	"̀": {
		"text": "\\`",
		"math": "\\grave"
	},
	"̈": {
		"text": "\\\"",
		"math": "\\ddot"
	},
	"̃": {
		"text": "\\~",
		"math": "\\tilde"
	},
	"̄": {
		"text": "\\=",
		"math": "\\bar"
	},
	"̆": {
		"text": "\\u",
		"math": "\\breve"
	},
	"̌": {
		"text": "\\v",
		"math": "\\check"
	},
	"̂": {
		"text": "\\^",
		"math": "\\hat"
	},
	"̇": {
		"text": "\\.",
		"math": "\\dot"
	},
	"̊": {
		"text": "\\r",
		"math": "\\mathring"
	},
	"̋": { "text": "\\H" },
	"̧": { "text": "\\c" }
};
var unicodeSymbols = {
	"á": "á",
	"à": "à",
	"ä": "ä",
	"ǟ": "ǟ",
	"ã": "ã",
	"ā": "ā",
	"ă": "ă",
	"ắ": "ắ",
	"ằ": "ằ",
	"ẵ": "ẵ",
	"ǎ": "ǎ",
	"â": "â",
	"ấ": "ấ",
	"ầ": "ầ",
	"ẫ": "ẫ",
	"ȧ": "ȧ",
	"ǡ": "ǡ",
	"å": "å",
	"ǻ": "ǻ",
	"ḃ": "ḃ",
	"ć": "ć",
	"ḉ": "ḉ",
	"č": "č",
	"ĉ": "ĉ",
	"ċ": "ċ",
	"ç": "ç",
	"ď": "ď",
	"ḋ": "ḋ",
	"ḑ": "ḑ",
	"é": "é",
	"è": "è",
	"ë": "ë",
	"ẽ": "ẽ",
	"ē": "ē",
	"ḗ": "ḗ",
	"ḕ": "ḕ",
	"ĕ": "ĕ",
	"ḝ": "ḝ",
	"ě": "ě",
	"ê": "ê",
	"ế": "ế",
	"ề": "ề",
	"ễ": "ễ",
	"ė": "ė",
	"ȩ": "ȩ",
	"ḟ": "ḟ",
	"ǵ": "ǵ",
	"ḡ": "ḡ",
	"ğ": "ğ",
	"ǧ": "ǧ",
	"ĝ": "ĝ",
	"ġ": "ġ",
	"ģ": "ģ",
	"ḧ": "ḧ",
	"ȟ": "ȟ",
	"ĥ": "ĥ",
	"ḣ": "ḣ",
	"ḩ": "ḩ",
	"í": "í",
	"ì": "ì",
	"ï": "ï",
	"ḯ": "ḯ",
	"ĩ": "ĩ",
	"ī": "ī",
	"ĭ": "ĭ",
	"ǐ": "ǐ",
	"î": "î",
	"ǰ": "ǰ",
	"ĵ": "ĵ",
	"ḱ": "ḱ",
	"ǩ": "ǩ",
	"ķ": "ķ",
	"ĺ": "ĺ",
	"ľ": "ľ",
	"ļ": "ļ",
	"ḿ": "ḿ",
	"ṁ": "ṁ",
	"ń": "ń",
	"ǹ": "ǹ",
	"ñ": "ñ",
	"ň": "ň",
	"ṅ": "ṅ",
	"ņ": "ņ",
	"ó": "ó",
	"ò": "ò",
	"ö": "ö",
	"ȫ": "ȫ",
	"õ": "õ",
	"ṍ": "ṍ",
	"ṏ": "ṏ",
	"ȭ": "ȭ",
	"ō": "ō",
	"ṓ": "ṓ",
	"ṑ": "ṑ",
	"ŏ": "ŏ",
	"ǒ": "ǒ",
	"ô": "ô",
	"ố": "ố",
	"ồ": "ồ",
	"ỗ": "ỗ",
	"ȯ": "ȯ",
	"ȱ": "ȱ",
	"ő": "ő",
	"ṕ": "ṕ",
	"ṗ": "ṗ",
	"ŕ": "ŕ",
	"ř": "ř",
	"ṙ": "ṙ",
	"ŗ": "ŗ",
	"ś": "ś",
	"ṥ": "ṥ",
	"š": "š",
	"ṧ": "ṧ",
	"ŝ": "ŝ",
	"ṡ": "ṡ",
	"ş": "ş",
	"ẗ": "ẗ",
	"ť": "ť",
	"ṫ": "ṫ",
	"ţ": "ţ",
	"ú": "ú",
	"ù": "ù",
	"ü": "ü",
	"ǘ": "ǘ",
	"ǜ": "ǜ",
	"ǖ": "ǖ",
	"ǚ": "ǚ",
	"ũ": "ũ",
	"ṹ": "ṹ",
	"ū": "ū",
	"ṻ": "ṻ",
	"ŭ": "ŭ",
	"ǔ": "ǔ",
	"û": "û",
	"ů": "ů",
	"ű": "ű",
	"ṽ": "ṽ",
	"ẃ": "ẃ",
	"ẁ": "ẁ",
	"ẅ": "ẅ",
	"ŵ": "ŵ",
	"ẇ": "ẇ",
	"ẘ": "ẘ",
	"ẍ": "ẍ",
	"ẋ": "ẋ",
	"ý": "ý",
	"ỳ": "ỳ",
	"ÿ": "ÿ",
	"ỹ": "ỹ",
	"ȳ": "ȳ",
	"ŷ": "ŷ",
	"ẏ": "ẏ",
	"ẙ": "ẙ",
	"ź": "ź",
	"ž": "ž",
	"ẑ": "ẑ",
	"ż": "ż",
	"Á": "Á",
	"À": "À",
	"Ä": "Ä",
	"Ǟ": "Ǟ",
	"Ã": "Ã",
	"Ā": "Ā",
	"Ă": "Ă",
	"Ắ": "Ắ",
	"Ằ": "Ằ",
	"Ẵ": "Ẵ",
	"Ǎ": "Ǎ",
	"Â": "Â",
	"Ấ": "Ấ",
	"Ầ": "Ầ",
	"Ẫ": "Ẫ",
	"Ȧ": "Ȧ",
	"Ǡ": "Ǡ",
	"Å": "Å",
	"Ǻ": "Ǻ",
	"Ḃ": "Ḃ",
	"Ć": "Ć",
	"Ḉ": "Ḉ",
	"Č": "Č",
	"Ĉ": "Ĉ",
	"Ċ": "Ċ",
	"Ç": "Ç",
	"Ď": "Ď",
	"Ḋ": "Ḋ",
	"Ḑ": "Ḑ",
	"É": "É",
	"È": "È",
	"Ë": "Ë",
	"Ẽ": "Ẽ",
	"Ē": "Ē",
	"Ḗ": "Ḗ",
	"Ḕ": "Ḕ",
	"Ĕ": "Ĕ",
	"Ḝ": "Ḝ",
	"Ě": "Ě",
	"Ê": "Ê",
	"Ế": "Ế",
	"Ề": "Ề",
	"Ễ": "Ễ",
	"Ė": "Ė",
	"Ȩ": "Ȩ",
	"Ḟ": "Ḟ",
	"Ǵ": "Ǵ",
	"Ḡ": "Ḡ",
	"Ğ": "Ğ",
	"Ǧ": "Ǧ",
	"Ĝ": "Ĝ",
	"Ġ": "Ġ",
	"Ģ": "Ģ",
	"Ḧ": "Ḧ",
	"Ȟ": "Ȟ",
	"Ĥ": "Ĥ",
	"Ḣ": "Ḣ",
	"Ḩ": "Ḩ",
	"Í": "Í",
	"Ì": "Ì",
	"Ï": "Ï",
	"Ḯ": "Ḯ",
	"Ĩ": "Ĩ",
	"Ī": "Ī",
	"Ĭ": "Ĭ",
	"Ǐ": "Ǐ",
	"Î": "Î",
	"İ": "İ",
	"Ĵ": "Ĵ",
	"Ḱ": "Ḱ",
	"Ǩ": "Ǩ",
	"Ķ": "Ķ",
	"Ĺ": "Ĺ",
	"Ľ": "Ľ",
	"Ļ": "Ļ",
	"Ḿ": "Ḿ",
	"Ṁ": "Ṁ",
	"Ń": "Ń",
	"Ǹ": "Ǹ",
	"Ñ": "Ñ",
	"Ň": "Ň",
	"Ṅ": "Ṅ",
	"Ņ": "Ņ",
	"Ó": "Ó",
	"Ò": "Ò",
	"Ö": "Ö",
	"Ȫ": "Ȫ",
	"Õ": "Õ",
	"Ṍ": "Ṍ",
	"Ṏ": "Ṏ",
	"Ȭ": "Ȭ",
	"Ō": "Ō",
	"Ṓ": "Ṓ",
	"Ṑ": "Ṑ",
	"Ŏ": "Ŏ",
	"Ǒ": "Ǒ",
	"Ô": "Ô",
	"Ố": "Ố",
	"Ồ": "Ồ",
	"Ỗ": "Ỗ",
	"Ȯ": "Ȯ",
	"Ȱ": "Ȱ",
	"Ő": "Ő",
	"Ṕ": "Ṕ",
	"Ṗ": "Ṗ",
	"Ŕ": "Ŕ",
	"Ř": "Ř",
	"Ṙ": "Ṙ",
	"Ŗ": "Ŗ",
	"Ś": "Ś",
	"Ṥ": "Ṥ",
	"Š": "Š",
	"Ṧ": "Ṧ",
	"Ŝ": "Ŝ",
	"Ṡ": "Ṡ",
	"Ş": "Ş",
	"Ť": "Ť",
	"Ṫ": "Ṫ",
	"Ţ": "Ţ",
	"Ú": "Ú",
	"Ù": "Ù",
	"Ü": "Ü",
	"Ǘ": "Ǘ",
	"Ǜ": "Ǜ",
	"Ǖ": "Ǖ",
	"Ǚ": "Ǚ",
	"Ũ": "Ũ",
	"Ṹ": "Ṹ",
	"Ū": "Ū",
	"Ṻ": "Ṻ",
	"Ŭ": "Ŭ",
	"Ǔ": "Ǔ",
	"Û": "Û",
	"Ů": "Ů",
	"Ű": "Ű",
	"Ṽ": "Ṽ",
	"Ẃ": "Ẃ",
	"Ẁ": "Ẁ",
	"Ẅ": "Ẅ",
	"Ŵ": "Ŵ",
	"Ẇ": "Ẇ",
	"Ẍ": "Ẍ",
	"Ẋ": "Ẋ",
	"Ý": "Ý",
	"Ỳ": "Ỳ",
	"Ÿ": "Ÿ",
	"Ỹ": "Ỹ",
	"Ȳ": "Ȳ",
	"Ŷ": "Ŷ",
	"Ẏ": "Ẏ",
	"Ź": "Ź",
	"Ž": "Ž",
	"Ẑ": "Ẑ",
	"Ż": "Ż",
	"ά": "ά",
	"ὰ": "ὰ",
	"ᾱ": "ᾱ",
	"ᾰ": "ᾰ",
	"έ": "έ",
	"ὲ": "ὲ",
	"ή": "ή",
	"ὴ": "ὴ",
	"ί": "ί",
	"ὶ": "ὶ",
	"ϊ": "ϊ",
	"ΐ": "ΐ",
	"ῒ": "ῒ",
	"ῑ": "ῑ",
	"ῐ": "ῐ",
	"ό": "ό",
	"ὸ": "ὸ",
	"ύ": "ύ",
	"ὺ": "ὺ",
	"ϋ": "ϋ",
	"ΰ": "ΰ",
	"ῢ": "ῢ",
	"ῡ": "ῡ",
	"ῠ": "ῠ",
	"ώ": "ώ",
	"ὼ": "ὼ",
	"Ύ": "Ύ",
	"Ὺ": "Ὺ",
	"Ϋ": "Ϋ",
	"Ῡ": "Ῡ",
	"Ῠ": "Ῠ",
	"Ώ": "Ώ",
	"Ὼ": "Ὼ"
};
/**
* This file contains the parser used to parse out a TeX expression from the
* input. Since TeX isn't context-free, standard parsers don't work particularly
* well.
*
* The strategy of this parser is as such:
*
* The main functions (the `.parse...` ones) take a position in the current
* parse string to parse tokens from. The lexer (found in Lexer.js, stored at
* this.gullet.lexer) also supports pulling out tokens at arbitrary places. When
* individual tokens are needed at a position, the lexer is called to pull out a
* token, which is then used.
*
* The parser has a property called "mode" indicating the mode that
* the parser is currently in. Currently it has to be one of "math" or
* "text", which denotes whether the current environment is a math-y
* one or a text-y one (e.g. inside \text). Currently, this serves to
* limit the functions which can be used in text mode.
*
* The main functions then return an object which contains the useful data that
* was parsed at its given point, and a new position at the end of the parsed
* data. The main functions can call each other and continue the parsing by
* using the returned position as a new starting point.
*
* There are also extra `.handle...` functions, which pull out some reused
* functionality into self-contained functions.
*
* The functions return ParseNodes.
*/
var Parser = class Parser {
	constructor(input, settings) {
		this.mode = "math";
		this.gullet = new MacroExpander(input, settings, this.mode);
		this.settings = settings;
		this.leftrightDepth = 0;
		this.nextToken = null;
	}
	/**
	* Checks a result to make sure it has the right type, and throws an
	* appropriate error otherwise.
	*/
	expect(text, consume) {
		if (consume === void 0) consume = true;
		if (this.fetch().text !== text) throw new ParseError("Expected '" + text + "', got '" + this.fetch().text + "'", this.fetch());
		if (consume) this.consume();
	}
	/**
	* Discards the current lookahead token, considering it consumed.
	*/
	consume() {
		this.nextToken = null;
	}
	/**
	* Return the current lookahead token, or if there isn't one (at the
	* beginning, or if the previous lookahead token was consume()d),
	* fetch the next token as the new lookahead token and return it.
	*/
	fetch() {
		if (this.nextToken == null) this.nextToken = this.gullet.expandNextToken();
		return this.nextToken;
	}
	/**
	* Switches between "text" and "math" modes.
	*/
	switchMode(newMode) {
		this.mode = newMode;
		this.gullet.switchMode(newMode);
	}
	/**
	* Main parsing function, which parses an entire input.
	*/
	parse() {
		if (!this.settings.globalGroup) this.gullet.beginGroup();
		if (this.settings.colorIsTextColor) this.gullet.macros.set("\\color", "\\textcolor");
		try {
			var parse = this.parseExpression(false);
			this.expect("EOF");
			if (!this.settings.globalGroup) this.gullet.endGroup();
			return parse;
		} finally {
			this.gullet.endGroups();
		}
	}
	/**
	* Fully parse a separate sequence of tokens as a separate job.
	* Tokens should be specified in reverse order, as in a MacroDefinition.
	*/
	subparse(tokens) {
		var oldToken = this.nextToken;
		this.consume();
		this.gullet.pushToken(new Token("}"));
		this.gullet.pushTokens(tokens);
		var parse = this.parseExpression(false);
		this.expect("}");
		this.nextToken = oldToken;
		return parse;
	}
	/**
	* Parses an "expression", which is a list of atoms.
	*
	* `breakOnInfix`: Should the parsing stop when we hit infix nodes? This
	*                 happens when functions have higher precedence than infix
	*                 nodes in implicit parses.
	*
	* `breakOnTokenText`: The text of the token that the expression should end
	*                     with, or `null` if something else should end the
	*                     expression.
	*/
	parseExpression(breakOnInfix, breakOnTokenText) {
		var body = [];
		while (true) {
			if (this.mode === "math") this.consumeSpaces();
			var lex = this.fetch();
			if (Parser.endOfExpression.has(lex.text)) break;
			if (breakOnTokenText && lex.text === breakOnTokenText) break;
			if (breakOnInfix && functions[lex.text] && functions[lex.text].infix) break;
			var atom = this.parseAtom(breakOnTokenText);
			if (!atom) break;
			else if (atom.type === "internal") continue;
			body.push(atom);
		}
		if (this.mode === "text") this.formLigatures(body);
		return this.handleInfixNodes(body);
	}
	/**
	* Rewrites infix operators such as \over with corresponding commands such
	* as \frac.
	*
	* There can only be one infix operator per group.  If there's more than one
	* then the expression is ambiguous.  This can be resolved by adding {}.
	*/
	handleInfixNodes(body) {
		var overIndex = -1;
		var funcName;
		for (var i = 0; i < body.length; i++) {
			var node = body[i];
			if (node.type === "infix") {
				if (overIndex !== -1) throw new ParseError("only one infix operator per group", node.token);
				overIndex = i;
				funcName = node.replaceWith;
			}
		}
		if (overIndex !== -1 && funcName) {
			var numerNode;
			var denomNode;
			var numerBody = body.slice(0, overIndex);
			var denomBody = body.slice(overIndex + 1);
			if (numerBody.length === 1 && numerBody[0].type === "ordgroup") numerNode = numerBody[0];
			else numerNode = {
				type: "ordgroup",
				mode: this.mode,
				body: numerBody
			};
			if (denomBody.length === 1 && denomBody[0].type === "ordgroup") denomNode = denomBody[0];
			else denomNode = {
				type: "ordgroup",
				mode: this.mode,
				body: denomBody
			};
			var _node;
			if (funcName === "\\\\abovefrac") _node = this.callFunction(funcName, [
				numerNode,
				body[overIndex],
				denomNode
			], []);
			else _node = this.callFunction(funcName, [numerNode, denomNode], []);
			return [_node];
		} else return body;
	}
	/**
	* Handle a subscript or superscript with nice errors.
	*/
	handleSupSubscript(name) {
		var symbolToken = this.fetch();
		var symbol = symbolToken.text;
		this.consume();
		this.consumeSpaces();
		var group;
		do {
			var _group;
			group = this.parseGroup(name);
		} while (((_group = group) == null ? void 0 : _group.type) === "internal");
		if (!group) throw new ParseError("Expected group after '" + symbol + "'", symbolToken);
		return group;
	}
	/**
	* Converts the textual input of an unsupported command into a text node
	* contained within a color node whose color is determined by errorColor
	*/
	formatUnsupportedCmd(text) {
		var textordArray = [];
		for (var i = 0; i < text.length; i++) textordArray.push({
			type: "textord",
			mode: "text",
			text: text[i]
		});
		var textNode = {
			type: "text",
			mode: this.mode,
			body: textordArray
		};
		return {
			type: "color",
			mode: this.mode,
			color: this.settings.errorColor,
			body: [textNode]
		};
	}
	/**
	* Parses a group with optional super/subscripts.
	*/
	parseAtom(breakOnTokenText) {
		var base = this.parseGroup("atom", breakOnTokenText);
		if ((base == null ? void 0 : base.type) === "internal") return base;
		if (this.mode === "text") return base;
		var superscript;
		var subscript;
		while (true) {
			this.consumeSpaces();
			var lex = this.fetch();
			if (lex.text === "\\limits" || lex.text === "\\nolimits") {
				if (base && base.type === "op") {
					base.limits = lex.text === "\\limits";
					base.alwaysHandleSupSub = true;
				} else if (base && base.type === "operatorname") {
					if (base.alwaysHandleSupSub) base.limits = lex.text === "\\limits";
				} else throw new ParseError("Limit controls must follow a math operator", lex);
				this.consume();
			} else if (lex.text === "^") {
				if (superscript) throw new ParseError("Double superscript", lex);
				superscript = this.handleSupSubscript("superscript");
			} else if (lex.text === "_") {
				if (subscript) throw new ParseError("Double subscript", lex);
				subscript = this.handleSupSubscript("subscript");
			} else if (lex.text === "'") {
				if (superscript) throw new ParseError("Double superscript", lex);
				var prime = {
					type: "textord",
					mode: this.mode,
					text: "\\prime"
				};
				var primes = [prime];
				this.consume();
				while (this.fetch().text === "'") {
					primes.push(prime);
					this.consume();
				}
				if (this.fetch().text === "^") primes.push(this.handleSupSubscript("superscript"));
				superscript = {
					type: "ordgroup",
					mode: this.mode,
					body: primes
				};
			} else if (uSubsAndSups[lex.text]) {
				var isSub = unicodeSubRegEx.test(lex.text);
				var subsupTokens = [];
				subsupTokens.push(new Token(uSubsAndSups[lex.text]));
				this.consume();
				while (true) {
					var token = this.fetch().text;
					if (!uSubsAndSups[token]) break;
					if (unicodeSubRegEx.test(token) !== isSub) break;
					subsupTokens.unshift(new Token(uSubsAndSups[token]));
					this.consume();
				}
				var body = this.subparse(subsupTokens);
				if (isSub) subscript = {
					type: "ordgroup",
					mode: "math",
					body
				};
				else superscript = {
					type: "ordgroup",
					mode: "math",
					body
				};
			} else break;
		}
		if (superscript || subscript) return {
			type: "supsub",
			mode: this.mode,
			base,
			sup: superscript,
			sub: subscript
		};
		else return base;
	}
	/**
	* Parses an entire function, including its base and all of its arguments.
	*/
	parseFunction(breakOnTokenText, name) {
		var token = this.fetch();
		var func = token.text;
		var funcData = functions[func];
		if (!funcData) return null;
		this.consume();
		if (name && name !== "atom" && !funcData.allowedInArgument) throw new ParseError("Got function '" + func + "' with no arguments" + (name ? " as " + name : ""), token);
		else if (this.mode === "text" && !funcData.allowedInText) throw new ParseError("Can't use function '" + func + "' in text mode", token);
		else if (this.mode === "math" && funcData.allowedInMath === false) throw new ParseError("Can't use function '" + func + "' in math mode", token);
		var { args, optArgs } = this.parseArguments(func, funcData);
		return this.callFunction(func, args, optArgs, token, breakOnTokenText);
	}
	/**
	* Call a function handler with a suitable context and arguments.
	*/
	callFunction(name, args, optArgs, token, breakOnTokenText) {
		var context = {
			funcName: name,
			parser: this,
			token,
			breakOnTokenText
		};
		var func = functions[name];
		if (func && func.handler) return func.handler(context, args, optArgs);
		else throw new ParseError("No function handler for " + name);
	}
	/**
	* Parses the arguments of a function or environment
	*/
	parseArguments(func, funcData) {
		var totalArgs = funcData.numArgs + funcData.numOptionalArgs;
		if (totalArgs === 0) return {
			args: [],
			optArgs: []
		};
		var args = [];
		var optArgs = [];
		for (var i = 0; i < totalArgs; i++) {
			var argType = funcData.argTypes && funcData.argTypes[i];
			var isOptional = i < funcData.numOptionalArgs;
			if ("primitive" in funcData && funcData.primitive && argType == null || funcData.type === "sqrt" && i === 1 && optArgs[0] == null) argType = "primitive";
			var arg = this.parseGroupOfType("argument to '" + func + "'", argType, isOptional);
			if (isOptional) optArgs.push(arg);
			else if (arg != null) args.push(arg);
			else throw new ParseError("Null argument, please report this as a bug");
		}
		return {
			args,
			optArgs
		};
	}
	/**
	* Parses a group when the mode is changing.
	*/
	parseGroupOfType(name, type, optional) {
		switch (type) {
			case "color": return this.parseColorGroup(optional);
			case "size": return this.parseSizeGroup(optional);
			case "url": return this.parseUrlGroup(optional);
			case "math":
			case "text": return this.parseArgumentGroup(optional, type);
			case "hbox":
				var group = this.parseArgumentGroup(optional, "text");
				return group != null ? {
					type: "styling",
					mode: group.mode,
					body: [group],
					style: "text"
				} : null;
			case "raw":
				var token = this.parseStringGroup("raw", optional);
				return token != null ? {
					type: "raw",
					mode: "text",
					string: token.text
				} : null;
			case "primitive":
				if (optional) throw new ParseError("A primitive argument cannot be optional");
				var _group2 = this.parseGroup(name);
				if (_group2 == null) throw new ParseError("Expected group as " + name, this.fetch());
				return _group2;
			case "original":
			case null:
			case void 0: return this.parseArgumentGroup(optional);
			default: throw new ParseError("Unknown group type as " + name, this.fetch());
		}
	}
	/**
	* Discard any space tokens, fetching the next non-space token.
	*/
	consumeSpaces() {
		while (this.fetch().text === " ") this.consume();
	}
	/**
	* Parses a group, essentially returning the string formed by the
	* brace-enclosed tokens plus some position information.
	*/
	parseStringGroup(modeName, optional) {
		var argToken = this.gullet.scanArgument(optional);
		if (argToken == null) return null;
		var str = "";
		var nextToken;
		while ((nextToken = this.fetch()).text !== "EOF") {
			str += nextToken.text;
			this.consume();
		}
		this.consume();
		argToken.text = str;
		return argToken;
	}
	/**
	* Parses a regex-delimited group: the largest sequence of tokens
	* whose concatenated strings match `regex`. Returns the string
	* formed by the tokens plus some position information.
	*/
	parseRegexGroup(regex, modeName) {
		var firstToken = this.fetch();
		var lastToken = firstToken;
		var str = "";
		var nextToken;
		while ((nextToken = this.fetch()).text !== "EOF" && regex.test(str + nextToken.text)) {
			lastToken = nextToken;
			str += lastToken.text;
			this.consume();
		}
		if (str === "") throw new ParseError("Invalid " + modeName + ": '" + firstToken.text + "'", firstToken);
		return firstToken.range(lastToken, str);
	}
	/**
	* Parses a color description.
	*/
	parseColorGroup(optional) {
		var res = this.parseStringGroup("color", optional);
		if (res == null) return null;
		var match = /^(#[a-f0-9]{3,4}|#[a-f0-9]{6}|#[a-f0-9]{8}|[a-f0-9]{6}|[a-z]+)$/i.exec(res.text);
		if (!match) throw new ParseError("Invalid color: '" + res.text + "'", res);
		var color = match[0];
		if (/^[0-9a-f]{6}$/i.test(color)) color = "#" + color;
		return {
			type: "color-token",
			mode: this.mode,
			color
		};
	}
	/**
	* Parses a size specification, consisting of magnitude and unit.
	*/
	parseSizeGroup(optional) {
		var res;
		var isBlank = false;
		this.gullet.consumeSpaces();
		if (!optional && this.gullet.future().text !== "{") res = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size");
		else res = this.parseStringGroup("size", optional);
		if (!res) return null;
		if (!optional && res.text.length === 0) {
			res.text = "0pt";
			isBlank = true;
		}
		var match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(res.text);
		if (!match) throw new ParseError("Invalid size: '" + res.text + "'", res);
		var data = {
			number: +(match[1] + match[2]),
			unit: match[3]
		};
		if (!validUnit(data)) throw new ParseError("Invalid unit: '" + data.unit + "'", res);
		return {
			type: "size",
			mode: this.mode,
			value: data,
			isBlank
		};
	}
	/**
	* Parses an URL, checking escaped letters and allowed protocols,
	* and setting the catcode of % as an active character (as in \hyperref).
	*/
	parseUrlGroup(optional) {
		this.gullet.lexer.setCatcode("%", 13);
		this.gullet.lexer.setCatcode("~", 12);
		var res = this.parseStringGroup("url", optional);
		this.gullet.lexer.setCatcode("%", 14);
		this.gullet.lexer.setCatcode("~", 13);
		if (res == null) return null;
		var url = res.text.replace(/\\([#$%&~_^{}])/g, "$1");
		return {
			type: "url",
			mode: this.mode,
			url
		};
	}
	/**
	* Parses an argument with the mode specified.
	*/
	parseArgumentGroup(optional, mode) {
		var argToken = this.gullet.scanArgument(optional);
		if (argToken == null) return null;
		var outerMode = this.mode;
		if (mode) this.switchMode(mode);
		this.gullet.beginGroup();
		var expression = this.parseExpression(false, "EOF");
		this.expect("EOF");
		this.gullet.endGroup();
		var result = {
			type: "ordgroup",
			mode: this.mode,
			loc: argToken.loc,
			body: expression
		};
		if (mode) this.switchMode(outerMode);
		return result;
	}
	/**
	* Parses an ordinary group, which is either a single nucleus (like "x")
	* or an expression in braces (like "{x+y}") or an implicit group, a group
	* that starts at the current position, and ends right before a higher explicit
	* group ends, or at EOF.
	*/
	parseGroup(name, breakOnTokenText) {
		var firstToken = this.fetch();
		var text = firstToken.text;
		var result;
		if (text === "{" || text === "\\begingroup") {
			this.consume();
			var groupEnd = text === "{" ? "}" : "\\endgroup";
			this.gullet.beginGroup();
			var expression = this.parseExpression(false, groupEnd);
			var lastToken = this.fetch();
			this.expect(groupEnd);
			this.gullet.endGroup();
			result = {
				type: "ordgroup",
				mode: this.mode,
				loc: SourceLocation.range(firstToken, lastToken),
				body: expression,
				semisimple: text === "\\begingroup" || void 0
			};
		} else {
			result = this.parseFunction(breakOnTokenText, name) || this.parseSymbol();
			if (result == null && text[0] === "\\" && !implicitCommands.hasOwnProperty(text)) {
				if (this.settings.throwOnError) throw new ParseError("Undefined control sequence: " + text, firstToken);
				result = this.formatUnsupportedCmd(text);
				this.consume();
			}
		}
		return result;
	}
	/**
	* Form ligature-like combinations of characters for text mode.
	* This includes inputs like "--", "---", "``" and "''".
	* The result will simply replace multiple textord nodes with a single
	* character in each value by a single textord node having multiple
	* characters in its value.  The representation is still ASCII source.
	* The group will be modified in place.
	*/
	formLigatures(group) {
		var n = group.length - 1;
		for (var i = 0; i < n; ++i) {
			var a = group[i];
			if (a.type !== "textord") continue;
			var v = a.text;
			var next = group[i + 1];
			if (!next || next.type !== "textord") continue;
			if (v === "-" && next.text === "-") {
				var afterNext = group[i + 2];
				if (i + 1 < n && afterNext && afterNext.type === "textord" && afterNext.text === "-") {
					group.splice(i, 3, {
						type: "textord",
						mode: "text",
						loc: SourceLocation.range(a, afterNext),
						text: "---"
					});
					n -= 2;
				} else {
					group.splice(i, 2, {
						type: "textord",
						mode: "text",
						loc: SourceLocation.range(a, next),
						text: "--"
					});
					n -= 1;
				}
			}
			if ((v === "'" || v === "`") && next.text === v) {
				group.splice(i, 2, {
					type: "textord",
					mode: "text",
					loc: SourceLocation.range(a, next),
					text: v + v
				});
				n -= 1;
			}
		}
	}
	/**
	* Parse a single symbol out of the string. Here, we handle single character
	* symbols and special functions like \verb.
	*/
	parseSymbol() {
		var nucleus = this.fetch();
		var text = nucleus.text;
		if (/^\\verb[^a-zA-Z]/.test(text)) {
			this.consume();
			var arg = text.slice(5);
			var star = arg.charAt(0) === "*";
			if (star) arg = arg.slice(1);
			if (arg.length < 2 || arg.charAt(0) !== arg.slice(-1)) throw new ParseError("\\verb assertion failed --\n                    please report what input caused this bug");
			arg = arg.slice(1, -1);
			return {
				type: "verb",
				mode: "text",
				body: arg,
				star
			};
		}
		if (unicodeSymbols.hasOwnProperty(text[0]) && !symbols[this.mode][text[0]]) {
			if (this.settings.strict && this.mode === "math") this.settings.reportNonstrict("unicodeTextInMathMode", "Accented Unicode text character \"" + text[0] + "\" used in math mode", nucleus);
			text = unicodeSymbols[text[0]] + text.slice(1);
		}
		var match = combiningDiacriticalMarksEndRegex.exec(text);
		if (match) {
			text = text.substring(0, match.index);
			if (text === "i") text = "ı";
			else if (text === "j") text = "ȷ";
		}
		var symbol;
		if (symbols[this.mode][text]) {
			if (this.settings.strict && this.mode === "math" && extraLatin.includes(text)) this.settings.reportNonstrict("unicodeTextInMathMode", "Latin-1/Unicode text character \"" + text[0] + "\" used in math mode", nucleus);
			var group = symbols[this.mode][text].group;
			var loc = SourceLocation.range(nucleus);
			var s;
			if (ATOMS.hasOwnProperty(group)) {
				var family = group;
				s = {
					type: "atom",
					mode: this.mode,
					family,
					loc,
					text
				};
			} else s = {
				type: group,
				mode: this.mode,
				loc,
				text
			};
			symbol = s;
		} else if (text.charCodeAt(0) >= 128) {
			if (this.settings.strict) {
				if (!supportedCodepoint(text.charCodeAt(0))) this.settings.reportNonstrict("unknownSymbol", "Unrecognized Unicode character \"" + text[0] + "\"" + (" (" + text.charCodeAt(0) + ")"), nucleus);
				else if (this.mode === "math") this.settings.reportNonstrict("unicodeTextInMathMode", "Unicode text character \"" + text[0] + "\" used in math mode", nucleus);
			}
			symbol = {
				type: "textord",
				mode: "text",
				loc: SourceLocation.range(nucleus),
				text
			};
		} else return null;
		this.consume();
		if (match) for (var i = 0; i < match[0].length; i++) {
			var accent = match[0][i];
			if (!unicodeAccents[accent]) throw new ParseError("Unknown accent ' " + accent + "'", nucleus);
			var command = unicodeAccents[accent][this.mode] || unicodeAccents[accent].text;
			if (!command) throw new ParseError("Accent " + accent + " unsupported in " + this.mode + " mode", nucleus);
			symbol = {
				type: "accent",
				mode: this.mode,
				loc: SourceLocation.range(nucleus),
				label: command,
				isStretchy: false,
				isShifty: true,
				base: symbol
			};
		}
		return symbol;
	}
};
Parser.endOfExpression = new Set([
	"}",
	"\\endgroup",
	"\\end",
	"\\right",
	"&"
]);
/**
* Provides a single function for parsing an expression using a Parser
* TODO(emily): Remove this
*/
/**
* Parses an expression using a Parser, then returns the parsed result.
*/
var parseTree = function parseTree(toParse, settings) {
	if (!(typeof toParse === "string" || toParse instanceof String)) throw new TypeError("KaTeX can only parse string typed expression");
	var parser = new Parser(toParse, settings);
	delete parser.gullet.macros.current["\\df@tag"];
	var tree = parser.parse();
	delete parser.gullet.macros.current["\\current@color"];
	delete parser.gullet.macros.current["\\color"];
	if (parser.gullet.macros.get("\\df@tag")) {
		if (!settings.displayMode) throw new ParseError("\\tag works only in display equations");
		tree = [{
			type: "tag",
			mode: "text",
			body: tree,
			tag: parser.subparse([new Token("\\df@tag")])
		}];
	}
	return tree;
};
/**
* Parse and build an expression, and place that expression in the DOM node
* given.
*/
var render = function render(expression, baseNode, options) {
	baseNode.textContent = "";
	var node = renderToDomTree(expression, options).toNode();
	baseNode.appendChild(node);
};
if (typeof document !== "undefined") {
	if (document.compatMode !== "CSS1Compat") {
		typeof console !== "undefined" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype.");
		render = function render() {
			throw new ParseError("KaTeX doesn't work in quirks mode.");
		};
	}
}
/**
* Parse and build an expression, and return the markup for that.
*/
var renderToString = function renderToString(expression, options) {
	return renderToDomTree(expression, options).toMarkup();
};
/**
* Parse an expression and return the parse tree.
*/
var generateParseTree = function generateParseTree(expression, options) {
	return parseTree(expression, new Settings(options));
};
/**
* If the given error is a KaTeX ParseError and options.throwOnError is false,
* renders the invalid LaTeX as a span with hover title giving the KaTeX
* error message.  Otherwise, simply throws the error.
*/
var renderError = function renderError(error, expression, options) {
	if (options.throwOnError || !(error instanceof ParseError)) throw error;
	var node = makeSpan(["katex-error"], [new SymbolNode(expression)]);
	node.setAttribute("title", error.toString());
	node.setAttribute("style", "color:" + options.errorColor);
	return node;
};
/**
* Generates and returns the katex build tree. This is used for advanced
* use cases (like rendering to custom output).
*/
var renderToDomTree = function renderToDomTree(expression, options) {
	var settings = new Settings(options);
	try {
		return buildTree(parseTree(expression, settings), expression, settings);
	} catch (error) {
		return renderError(error, expression, settings);
	}
};
var katex = {
	version: "0.16.37",
	render,
	renderToString,
	ParseError,
	SETTINGS_SCHEMA,
	__parse: generateParseTree,
	__renderToDomTree: renderToDomTree,
	__renderToHTMLTree: function renderToHTMLTree(expression, options) {
		var settings = new Settings(options);
		try {
			return buildHTMLTree(parseTree(expression, settings), expression, settings);
		} catch (error) {
			return renderError(error, expression, settings);
		}
	},
	__setFontMetrics: setFontMetrics,
	__defineSymbol: defineSymbol,
	__defineFunction: defineFunction,
	__defineMacro: defineMacro,
	__domTree: {
		Span,
		Anchor,
		SymbolNode,
		SvgNode,
		PathNode,
		LineNode
	}
};
//#endregion
//#region node_modules/mdast-util-math/lib/index.js
/**
* @typedef {import('hast').Element} HastElement
* @typedef {import('hast').ElementContent} HastElementContent
* @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
* @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
* @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
* @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
* @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
* @typedef {import('../index.js').InlineMath} InlineMath
* @typedef {import('../index.js').Math} Math
*
* @typedef ToOptions
*   Configuration.
* @property {boolean | null | undefined} [singleDollarTextMath=true]
*   Whether to support math (text) with a single dollar (default: `true`).
*
*   Single dollars work in Pandoc and many other places, but often interfere
*   with “normal” dollars in text.
*   If you turn this off, you can still use two or more dollars for text math.
*/
/**
* Create an extension for `mdast-util-from-markdown`.
*
* @returns {FromMarkdownExtension}
*   Extension for `mdast-util-from-markdown`.
*/
function mathFromMarkdown() {
	return {
		enter: {
			mathFlow: enterMathFlow,
			mathFlowFenceMeta: enterMathFlowMeta,
			mathText: enterMathText
		},
		exit: {
			mathFlow: exitMathFlow,
			mathFlowFence: exitMathFlowFence,
			mathFlowFenceMeta: exitMathFlowMeta,
			mathFlowValue: exitMathData,
			mathText: exitMathText,
			mathTextData: exitMathData
		}
	};
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function enterMathFlow(token) {
		this.enter({
			type: "math",
			meta: null,
			value: "",
			data: {
				hName: "pre",
				hChildren: [{
					type: "element",
					tagName: "code",
					properties: { className: ["language-math", "math-display"] },
					children: []
				}]
			}
		}, token);
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function enterMathFlowMeta() {
		this.buffer();
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function exitMathFlowMeta() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.type;
		node.meta = data;
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function exitMathFlowFence() {
		if (this.data.mathFlowInside) return;
		this.buffer();
		this.data.mathFlowInside = true;
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function exitMathFlow(token) {
		const data = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
		const node = this.stack[this.stack.length - 1];
		node.type;
		this.exit(token);
		node.value = data;
		const code = node.data.hChildren[0];
		code.type;
		code.tagName;
		code.children.push({
			type: "text",
			value: data
		});
		this.data.mathFlowInside = void 0;
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function enterMathText(token) {
		this.enter({
			type: "inlineMath",
			value: "",
			data: {
				hName: "code",
				hProperties: { className: ["language-math", "math-inline"] },
				hChildren: []
			}
		}, token);
		this.buffer();
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function exitMathText(token) {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.type;
		this.exit(token);
		node.value = data;
		node.data.hChildren.push({
			type: "text",
			value: data
		});
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function exitMathData(token) {
		this.config.enter.data.call(this, token);
		this.config.exit.data.call(this, token);
	}
}
/**
* Create an extension for `mdast-util-to-markdown`.
*
* @param {ToOptions | null | undefined} [options]
*   Configuration (optional).
* @returns {ToMarkdownExtension}
*   Extension for `mdast-util-to-markdown`.
*/
function mathToMarkdown(options) {
	let single = (options || {}).singleDollarTextMath;
	if (single === null || single === void 0) single = true;
	inlineMath.peek = inlineMathPeek;
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "\n",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "$",
				after: single ? void 0 : "\\$",
				inConstruct: "phrasing"
			},
			{
				character: "$",
				inConstruct: "mathFlowMeta"
			},
			{
				atBreak: true,
				character: "$",
				after: "\\$"
			}
		],
		handlers: {
			math,
			inlineMath
		}
	};
	/**
	* @type {ToMarkdownHandle}
	* @param {Math} node
	*/
	function math(node, _, state, info) {
		const raw = node.value || "";
		const tracker = state.createTracker(info);
		const sequence = "$".repeat(Math.max(longestStreak(raw, "$") + 1, 2));
		const exit = state.enter("mathFlow");
		let value = tracker.move(sequence);
		if (node.meta) {
			const subexit = state.enter("mathFlowMeta");
			value += tracker.move(state.safe(node.meta, {
				after: "\n",
				before: value,
				encode: ["$"],
				...tracker.current()
			}));
			subexit();
		}
		value += tracker.move("\n");
		if (raw) value += tracker.move(raw + "\n");
		value += tracker.move(sequence);
		exit();
		return value;
	}
	/**
	* @type {ToMarkdownHandle}
	* @param {InlineMath} node
	*/
	function inlineMath(node, _, state) {
		let value = node.value || "";
		let size = 1;
		if (!single) size++;
		while (new RegExp("(^|[^$])" + "\\$".repeat(size) + "([^$]|$)").test(value)) size++;
		const sequence = "$".repeat(size);
		if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^\$|\$$/.test(value))) value = " " + value + " ";
		let index = -1;
		while (++index < state.unsafe.length) {
			const pattern = state.unsafe[index];
			if (!pattern.atBreak) continue;
			const expression = state.compilePattern(pattern);
			/** @type {RegExpExecArray | null} */
			let match;
			while (match = expression.exec(value)) {
				let position = match.index;
				if (value.codePointAt(position) === 10 && value.codePointAt(position - 1) === 13) position--;
				value = value.slice(0, position) + " " + value.slice(match.index + 1);
			}
		}
		return sequence + value + sequence;
	}
	/**
	* @returns {string}
	*/
	function inlineMathPeek() {
		return "$";
	}
}
//#endregion
//#region node_modules/micromark-extension-math/lib/math-flow.js
/**
* @import {Construct, State, TokenizeContext, Tokenizer} from 'micromark-util-types'
*/
/** @type {Construct} */
var mathFlow = {
	tokenize: tokenizeMathFenced,
	concrete: true,
	name: "mathFlow"
};
/** @type {Construct} */
var nonLazyContinuation = {
	tokenize: tokenizeNonLazyContinuation,
	partial: true
};
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeMathFenced(effects, ok, nok) {
	const self = this;
	const tail = self.events[self.events.length - 1];
	const initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
	let sizeOpen = 0;
	return start;
	/**
	* Start of math.
	*
	* ```markdown
	* > | $$
	*     ^
	*   | \frac{1}{2}
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("mathFlow");
		effects.enter("mathFlowFence");
		effects.enter("mathFlowFenceSequence");
		return sequenceOpen(code);
	}
	/**
	* In opening fence sequence.
	*
	* ```markdown
	* > | $$
	*      ^
	*   | \frac{1}{2}
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function sequenceOpen(code) {
		if (code === 36) {
			effects.consume(code);
			sizeOpen++;
			return sequenceOpen;
		}
		if (sizeOpen < 2) return nok(code);
		effects.exit("mathFlowFenceSequence");
		return factorySpace(effects, metaBefore, "whitespace")(code);
	}
	/**
	* In opening fence, before meta.
	*
	* ```markdown
	* > | $$asciimath
	*       ^
	*   | x < y
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function metaBefore(code) {
		if (code === null || markdownLineEnding(code)) return metaAfter(code);
		effects.enter("mathFlowFenceMeta");
		effects.enter("chunkString", { contentType: "string" });
		return meta(code);
	}
	/**
	* In meta.
	*
	* ```markdown
	* > | $$asciimath
	*        ^
	*   | x < y
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function meta(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("chunkString");
			effects.exit("mathFlowFenceMeta");
			return metaAfter(code);
		}
		if (code === 36) return nok(code);
		effects.consume(code);
		return meta;
	}
	/**
	* After meta.
	*
	* ```markdown
	* > | $$
	*       ^
	*   | \frac{1}{2}
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function metaAfter(code) {
		effects.exit("mathFlowFence");
		if (self.interrupt) return ok(code);
		return effects.attempt(nonLazyContinuation, beforeNonLazyContinuation, after)(code);
	}
	/**
	* After eol/eof in math, at a non-lazy closing fence or content.
	*
	* ```markdown
	*   | $$
	* > | \frac{1}{2}
	*     ^
	* > | $$
	*     ^
	* ```
	*
	* @type {State}
	*/
	function beforeNonLazyContinuation(code) {
		return effects.attempt({
			tokenize: tokenizeClosingFence,
			partial: true
		}, after, contentStart)(code);
	}
	/**
	* Before math content, definitely not before a closing fence.
	*
	* ```markdown
	*   | $$
	* > | \frac{1}{2}
	*     ^
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function contentStart(code) {
		return (initialSize ? factorySpace(effects, beforeContentChunk, "linePrefix", initialSize + 1) : beforeContentChunk)(code);
	}
	/**
	* Before math content, after optional prefix.
	*
	* ```markdown
	*   | $$
	* > | \frac{1}{2}
	*     ^
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function beforeContentChunk(code) {
		if (code === null) return after(code);
		if (markdownLineEnding(code)) return effects.attempt(nonLazyContinuation, beforeNonLazyContinuation, after)(code);
		effects.enter("mathFlowValue");
		return contentChunk(code);
	}
	/**
	* In math content.
	*
	* ```markdown
	*   | $$
	* > | \frac{1}{2}
	*      ^
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function contentChunk(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("mathFlowValue");
			return beforeContentChunk(code);
		}
		effects.consume(code);
		return contentChunk;
	}
	/**
	* After math (ha!).
	*
	* ```markdown
	*   | $$
	*   | \frac{1}{2}
	* > | $$
	*       ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		effects.exit("mathFlow");
		return ok(code);
	}
	/** @type {Tokenizer} */
	function tokenizeClosingFence(effects, ok, nok) {
		let size = 0;
		/**
		* Before closing fence, at optional whitespace.
		*
		* ```markdown
		*   | $$
		*   | \frac{1}{2}
		* > | $$
		*     ^
		* ```
		*/
		return factorySpace(effects, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
		/**
		* In closing fence, after optional whitespace, at sequence.
		*
		* ```markdown
		*   | $$
		*   | \frac{1}{2}
		* > | $$
		*     ^
		* ```
		*
		* @type {State}
		*/
		function beforeSequenceClose(code) {
			effects.enter("mathFlowFence");
			effects.enter("mathFlowFenceSequence");
			return sequenceClose(code);
		}
		/**
		* In closing fence sequence.
		*
		* ```markdown
		*   | $$
		*   | \frac{1}{2}
		* > | $$
		*      ^
		* ```
		*
		* @type {State}
		*/
		function sequenceClose(code) {
			if (code === 36) {
				size++;
				effects.consume(code);
				return sequenceClose;
			}
			if (size < sizeOpen) return nok(code);
			effects.exit("mathFlowFenceSequence");
			return factorySpace(effects, afterSequenceClose, "whitespace")(code);
		}
		/**
		* After closing fence sequence, after optional whitespace.
		*
		* ```markdown
		*   | $$
		*   | \frac{1}{2}
		* > | $$
		*       ^
		* ```
		*
		* @type {State}
		*/
		function afterSequenceClose(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("mathFlowFence");
				return ok(code);
			}
			return nok(code);
		}
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeNonLazyContinuation(effects, ok, nok) {
	const self = this;
	return start;
	/** @type {State} */
	function start(code) {
		if (code === null) return ok(code);
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return lineStart;
	}
	/** @type {State} */
	function lineStart(code) {
		return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
	}
}
//#endregion
//#region node_modules/micromark-extension-math/lib/math-text.js
/**
* @import {Options} from 'micromark-extension-math'
* @import {Construct, Previous, Resolver, State, Token, TokenizeContext, Tokenizer} from 'micromark-util-types'
*/
/**
* @param {Options | null | undefined} [options={}]
*   Configuration (default: `{}`).
* @returns {Construct}
*   Construct.
*/
function mathText(options) {
	let single = (options || {}).singleDollarTextMath;
	if (single === null || single === void 0) single = true;
	return {
		tokenize: tokenizeMathText,
		resolve: resolveMathText,
		previous,
		name: "mathText"
	};
	/**
	* @this {TokenizeContext}
	* @type {Tokenizer}
	*/
	function tokenizeMathText(effects, ok, nok) {
		let sizeOpen = 0;
		/** @type {number} */
		let size;
		/** @type {Token} */
		let token;
		return start;
		/**
		* Start of math (text).
		*
		* ```markdown
		* > | $a$
		*     ^
		* > | \$a$
		*      ^
		* ```
		*
		* @type {State}
		*/
		function start(code) {
			effects.enter("mathText");
			effects.enter("mathTextSequence");
			return sequenceOpen(code);
		}
		/**
		* In opening sequence.
		*
		* ```markdown
		* > | $a$
		*     ^
		* ```
		*
		* @type {State}
		*/
		function sequenceOpen(code) {
			if (code === 36) {
				effects.consume(code);
				sizeOpen++;
				return sequenceOpen;
			}
			if (sizeOpen < 2 && !single) return nok(code);
			effects.exit("mathTextSequence");
			return between(code);
		}
		/**
		* Between something and something else.
		*
		* ```markdown
		* > | $a$
		*      ^^
		* ```
		*
		* @type {State}
		*/
		function between(code) {
			if (code === null) return nok(code);
			if (code === 36) {
				token = effects.enter("mathTextSequence");
				size = 0;
				return sequenceClose(code);
			}
			if (code === 32) {
				effects.enter("space");
				effects.consume(code);
				effects.exit("space");
				return between;
			}
			if (markdownLineEnding(code)) {
				effects.enter("lineEnding");
				effects.consume(code);
				effects.exit("lineEnding");
				return between;
			}
			effects.enter("mathTextData");
			return data(code);
		}
		/**
		* In data.
		*
		* ```markdown
		* > | $a$
		*      ^
		* ```
		*
		* @type {State}
		*/
		function data(code) {
			if (code === null || code === 32 || code === 36 || markdownLineEnding(code)) {
				effects.exit("mathTextData");
				return between(code);
			}
			effects.consume(code);
			return data;
		}
		/**
		* In closing sequence.
		*
		* ```markdown
		* > | `a`
		*       ^
		* ```
		*
		* @type {State}
		*/
		function sequenceClose(code) {
			if (code === 36) {
				effects.consume(code);
				size++;
				return sequenceClose;
			}
			if (size === sizeOpen) {
				effects.exit("mathTextSequence");
				effects.exit("mathText");
				return ok(code);
			}
			token.type = "mathTextData";
			return data(code);
		}
	}
}
/** @type {Resolver} */
function resolveMathText(events) {
	let tailExitIndex = events.length - 4;
	let headEnterIndex = 3;
	/** @type {number} */
	let index;
	/** @type {number | undefined} */
	let enter;
	if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
		index = headEnterIndex;
		while (++index < tailExitIndex) if (events[index][1].type === "mathTextData") {
			events[tailExitIndex][1].type = "mathTextPadding";
			events[headEnterIndex][1].type = "mathTextPadding";
			headEnterIndex += 2;
			tailExitIndex -= 2;
			break;
		}
	}
	index = headEnterIndex - 1;
	tailExitIndex++;
	while (++index <= tailExitIndex) if (enter === void 0) {
		if (index !== tailExitIndex && events[index][1].type !== "lineEnding") enter = index;
	} else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
		events[enter][1].type = "mathTextData";
		if (index !== enter + 2) {
			events[enter][1].end = events[index - 1][1].end;
			events.splice(enter + 2, index - enter - 2);
			tailExitIndex -= index - enter - 2;
			index = enter + 2;
		}
		enter = void 0;
	}
	return events;
}
/**
* @this {TokenizeContext}
* @type {Previous}
*/
function previous(code) {
	return code !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
}
//#endregion
//#region node_modules/micromark-extension-math/lib/syntax.js
/**
* @import {Options} from 'micromark-extension-math'
* @import {Extension} from 'micromark-util-types'
*/
/**
* Create an extension for `micromark` to enable math syntax.
*
* @param {Options | null | undefined} [options={}]
*   Configuration (default: `{}`).
* @returns {Extension}
*   Extension for `micromark` that can be passed in `extensions`, to
*   enable math syntax.
*/
function math(options) {
	return {
		flow: { [36]: mathFlow },
		text: { [36]: mathText(options) }
	};
}
//#endregion
//#region node_modules/remark-math/lib/index.js
/**
* @typedef {import('mdast').Root} Root
* @typedef {import('mdast-util-math').ToOptions} Options
* @typedef {import('unified').Processor<Root>} Processor
*/
/** @type {Readonly<Options>} */
var emptyOptions = {};
/**
* Add support for math.
*
* @param {Readonly<Options> | null | undefined} [options]
*   Configuration (optional).
* @returns {undefined}
*   Nothing.
*/
function remarkMath(options) {
	const self = this;
	const settings = options || emptyOptions;
	const data = self.data();
	const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
	const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
	const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
	micromarkExtensions.push(math(settings));
	fromMarkdownExtensions.push(mathFromMarkdown());
	toMarkdownExtensions.push(mathToMarkdown(settings));
}
//#endregion
//#region node_modules/@milkdown/plugin-clipboard/lib/index.js
function isPureText(content) {
	if (!content) return false;
	if (Array.isArray(content)) {
		if (content.length > 1) return false;
		return isPureText(content[0]);
	}
	const child = content.content;
	if (child) return isPureText(child);
	return content.type === "text";
}
function withMeta$1(plugin, meta) {
	Object.assign(plugin, { meta: {
		package: "@milkdown/plugin-clipboard",
		...meta
	} });
	return plugin;
}
var clipboard = $prose((ctx) => {
	const schema = ctx.get(schemaCtx);
	ctx.update(editorViewOptionsCtx, (prev) => ({
		...prev,
		editable: prev.editable ?? (() => true)
	}));
	return new Plugin({
		key: new PluginKey("MILKDOWN_CLIPBOARD"),
		props: {
			handlePaste: (view, event) => {
				const parser = ctx.get(parserCtx);
				const editable = view.props.editable?.(view.state);
				const { clipboardData } = event;
				if (!editable || !clipboardData) return false;
				if (view.state.selection.$from.node().type.spec.code) return false;
				const text = clipboardData.getData("text/plain");
				const vscodeData = clipboardData.getData("vscode-editor-data");
				if (vscodeData) {
					const language = JSON.parse(vscodeData)?.mode;
					if (text && language) {
						const { tr } = view.state;
						const codeBlock = getNodeFromSchema("code_block", schema);
						tr.replaceSelectionWith(codeBlock.create({ language })).setSelection(TextSelection.near(tr.doc.resolve(Math.max(0, tr.selection.from - 2)))).insertText(text.replace(/\r\n?/g, "\n"));
						view.dispatch(tr);
						return true;
					}
				}
				const html = clipboardData.getData("text/html");
				if (html.length === 0 && text.length === 0) return false;
				const domParser = DOMParser.fromSchema(schema);
				let dom;
				if (html.length === 0) {
					const slice2 = parser(text);
					if (!slice2 || typeof slice2 === "string") return false;
					dom = DOMSerializer.fromSchema(schema).serializeFragment(slice2.content);
				} else {
					const template = document.createElement("template");
					template.innerHTML = html;
					dom = template.content.cloneNode(true);
					template.remove();
				}
				const slice = domParser.parseSlice(dom);
				const node = isTextOnlySlice(slice);
				if (node) {
					view.dispatch(view.state.tr.replaceSelectionWith(node, true));
					return true;
				}
				try {
					view.dispatch(view.state.tr.replaceSelection(slice));
					return true;
				} catch {
					return false;
				}
			},
			clipboardTextSerializer: (slice) => {
				const serializer = ctx.get(serializerCtx);
				if (isPureText(slice.content.toJSON())) return slice.content.textBetween(0, slice.content.size, "\n\n");
				const doc = schema.topNodeType.createAndFill(void 0, slice.content);
				if (!doc) return "";
				return serializer(doc);
			}
		}
	});
});
withMeta$1(clipboard, { displayName: "Prose<clipboard>" });
//#endregion
//#region node_modules/@milkdown/plugin-history/lib/index.js
function withMeta(plugin, meta) {
	Object.assign(plugin, { meta: {
		package: "@milkdown/plugin-history",
		...meta
	} });
	return plugin;
}
var undoCommand = $command("Undo", () => () => undo);
withMeta(undoCommand, { displayName: "Command<undo>" });
var redoCommand = $command("Redo", () => () => redo);
withMeta(redoCommand, { displayName: "Command<redo>" });
var historyProviderConfig = $ctx({}, "historyProviderConfig");
withMeta(historyProviderConfig, { displayName: "Ctx<historyProviderConfig>" });
var historyProviderPlugin = $prose((ctx) => history$1(ctx.get(historyProviderConfig.key)));
withMeta(historyProviderPlugin, { displayName: "Ctx<historyProviderPlugin>" });
var historyKeymap = $useKeymap("historyKeymap", {
	Undo: {
		shortcuts: "Mod-z",
		command: (ctx) => {
			const commands = ctx.get(commandsCtx);
			return () => commands.call(undoCommand.key);
		}
	},
	Redo: {
		shortcuts: ["Mod-y", "Shift-Mod-z"],
		command: (ctx) => {
			const commands = ctx.get(commandsCtx);
			return () => commands.call(redoCommand.key);
		}
	}
});
withMeta(historyKeymap.ctx, { displayName: "KeymapCtx<history>" });
withMeta(historyKeymap.shortcuts, { displayName: "Keymap<history>" });
var history = [
	historyProviderConfig,
	historyProviderPlugin,
	historyKeymap,
	undoCommand,
	redoCommand
].flat();
//#endregion
//#region node_modules/@milkdown/plugin-indent/lib/index.js
function updateIndent(tr, options) {
	const { doc, selection } = tr;
	if (!doc || !selection) return tr;
	if (!(selection instanceof TextSelection || selection instanceof AllSelection)) return tr;
	const { to } = selection;
	const text = options.type === "space" ? Array(options.size).fill(" ").join("") : "	";
	return tr.insertText(text, to);
}
var indentConfig = $ctx({
	type: "space",
	size: 2
}, "indentConfig");
indentConfig.meta = {
	package: "@milkdown/plugin-indent",
	displayName: "Ctx<indentConfig>"
};
var indentPlugin = $shortcut((ctx) => ({ Tab: (state, dispatch) => {
	const config = ctx.get(indentConfig.key);
	const { tr } = state;
	const _tr = updateIndent(tr, config);
	if (_tr.docChanged) {
		dispatch?.(_tr);
		return true;
	}
	return false;
} }));
indentPlugin.meta = {
	package: "@milkdown/plugin-indent",
	displayName: "Shortcut<indent>"
};
var indent = [indentConfig, indentPlugin];
//#endregion
//#region node_modules/@milkdown/plugin-listener/lib/index.js
var ListenerManager = class {
	constructor() {
		this.beforeMountedListeners = [];
		this.mountedListeners = [];
		this.updatedListeners = [];
		this.selectionUpdatedListeners = [];
		this.markdownUpdatedListeners = [];
		this.blurListeners = [];
		this.focusListeners = [];
		this.destroyListeners = [];
		this.beforeMount = (fn) => {
			this.beforeMountedListeners.push(fn);
			return this;
		};
		this.mounted = (fn) => {
			this.mountedListeners.push(fn);
			return this;
		};
		this.updated = (fn) => {
			this.updatedListeners.push(fn);
			return this;
		};
	}
	get listeners() {
		return {
			beforeMount: this.beforeMountedListeners,
			mounted: this.mountedListeners,
			updated: this.updatedListeners,
			markdownUpdated: this.markdownUpdatedListeners,
			blur: this.blurListeners,
			focus: this.focusListeners,
			destroy: this.destroyListeners,
			selectionUpdated: this.selectionUpdatedListeners
		};
	}
	markdownUpdated(fn) {
		this.markdownUpdatedListeners.push(fn);
		return this;
	}
	blur(fn) {
		this.blurListeners.push(fn);
		return this;
	}
	focus(fn) {
		this.focusListeners.push(fn);
		return this;
	}
	destroy(fn) {
		this.destroyListeners.push(fn);
		return this;
	}
	selectionUpdated(fn) {
		this.selectionUpdatedListeners.push(fn);
		return this;
	}
};
var listenerCtx = createSlice(new ListenerManager(), "listener");
var key = new PluginKey("MILKDOWN_LISTENER");
var listener = (ctx) => {
	ctx.inject(listenerCtx, new ListenerManager());
	return async () => {
		await ctx.wait(InitReady);
		const { listeners } = ctx.get(listenerCtx);
		listeners.beforeMount.forEach((fn) => fn(ctx));
		await ctx.wait(SerializerReady);
		const serializer = ctx.get(serializerCtx);
		let prevDoc = null;
		let prevMarkdown = null;
		let prevSelection = null;
		const plugin = new Plugin({
			key,
			view: () => {
				return { destroy: () => {
					listeners.destroy.forEach((fn) => fn(ctx));
				} };
			},
			props: { handleDOMEvents: {
				focus: () => {
					listeners.focus.forEach((fn) => fn(ctx));
					return false;
				},
				blur: () => {
					listeners.blur.forEach((fn) => fn(ctx));
					return false;
				}
			} },
			state: {
				init: (_, instance) => {
					prevDoc = instance.doc;
					prevMarkdown = serializer(instance.doc);
				},
				apply: (tr) => {
					const currentSelection = tr.selection;
					if (!prevSelection && currentSelection || prevSelection && !currentSelection.eq(prevSelection)) {
						listeners.selectionUpdated.forEach((fn) => {
							fn(ctx, currentSelection, prevSelection);
						});
						prevSelection = currentSelection;
					}
					if (!(tr.docChanged || tr.storedMarksSet) || tr.getMeta("addToHistory") === false) return;
					return debounce(() => {
						const { doc } = tr;
						if (listeners.updated.length > 0 && prevDoc && !prevDoc.eq(doc)) listeners.updated.forEach((fn) => {
							fn(ctx, doc, prevDoc);
						});
						if (listeners.markdownUpdated.length > 0 && prevDoc && !prevDoc.eq(doc)) {
							const markdown = serializer(doc);
							listeners.markdownUpdated.forEach((fn) => {
								fn(ctx, markdown, prevMarkdown);
							});
							prevMarkdown = markdown;
						}
						prevDoc = doc;
					}, 200)();
				}
			}
		});
		ctx.update(prosePluginsCtx, (x) => x.concat(plugin));
		await ctx.wait(EditorViewReady);
		listeners.mounted.forEach((fn) => fn(ctx));
	};
};
listener.meta = {
	package: "@milkdown/plugin-listener",
	displayName: "Listener"
};
//#endregion
//#region node_modules/@milkdown/plugin-trailing/lib/index.js
var trailingConfig = $ctx({
	shouldAppend: (lastNode) => {
		if (!lastNode) return false;
		if (["heading", "paragraph"].includes(lastNode.type.name)) return false;
		return true;
	},
	getNode: (state) => state.schema.nodes.paragraph.create()
}, "trailingConfig");
trailingConfig.meta = {
	package: "@milkdown/plugin-trailing",
	displayName: "Ctx<trailingConfig>"
};
var trailingPlugin = $prose((ctx) => {
	const trailingPluginKey = new PluginKey("MILKDOWN_TRAILING");
	const { shouldAppend, getNode } = ctx.get(trailingConfig.key);
	const plugin = new Plugin({
		key: trailingPluginKey,
		state: {
			init: (_, state) => {
				const lastNode = state.tr.doc.lastChild;
				return shouldAppend(lastNode, state);
			},
			apply: (tr, value, _, state) => {
				if (!tr.docChanged) return value;
				const lastNode = tr.doc.lastChild;
				return shouldAppend(lastNode, state);
			}
		},
		appendTransaction: (_, __, state) => {
			const { doc, tr } = state;
			const nodeType = getNode?.(state);
			const shouldInsertNodeAtEnd = plugin.getState(state);
			const endPosition = doc.content.size;
			if (!shouldInsertNodeAtEnd || !nodeType) return;
			return tr.insert(endPosition, nodeType);
		}
	});
	return plugin;
});
trailingPlugin.meta = {
	package: "@milkdown/plugin-trailing",
	displayName: "Prose<trailing>"
};
var trailing = [trailingConfig, trailingPlugin];
//#endregion
//#region node_modules/@milkdown/crepe/lib/esm/index.js
var CrepeFeature = /* @__PURE__ */ ((CrepeFeature2) => {
	CrepeFeature2["CodeMirror"] = "code-mirror";
	CrepeFeature2["ListItem"] = "list-item";
	CrepeFeature2["LinkTooltip"] = "link-tooltip";
	CrepeFeature2["Cursor"] = "cursor";
	CrepeFeature2["ImageBlock"] = "image-block";
	CrepeFeature2["BlockEdit"] = "block-edit";
	CrepeFeature2["Toolbar"] = "toolbar";
	CrepeFeature2["Placeholder"] = "placeholder";
	CrepeFeature2["Table"] = "table";
	CrepeFeature2["Latex"] = "latex";
	return CrepeFeature2;
})(CrepeFeature || {});
var defaultFeatures = {
	["cursor"]: true,
	["list-item"]: true,
	["link-tooltip"]: true,
	["image-block"]: true,
	["block-edit"]: true,
	["placeholder"]: true,
	["toolbar"]: true,
	["code-mirror"]: true,
	["table"]: true,
	["latex"]: true
};
var alignCenterIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      d="M4.25 20.5C4.0375 20.5 3.85942 20.4281 3.71575 20.2843C3.57192 20.1404 3.5 19.9622 3.5 19.7498C3.5 19.5371 3.57192 19.359 3.71575 19.2155C3.85942 19.0718 4.0375 19 4.25 19H19.75C19.9625 19 20.1406 19.0719 20.2843 19.2158C20.4281 19.3596 20.5 19.5378 20.5 19.7502C20.5 19.9629 20.4281 20.141 20.2843 20.2845C20.1406 20.4282 19.9625 20.5 19.75 20.5H4.25ZM8.25 16.625C8.0375 16.625 7.85942 16.5531 7.71575 16.4093C7.57192 16.2654 7.5 16.0872 7.5 15.8748C7.5 15.6621 7.57192 15.484 7.71575 15.3405C7.85942 15.1968 8.0375 15.125 8.25 15.125H15.75C15.9625 15.125 16.1406 15.1969 16.2843 15.3408C16.4281 15.4846 16.5 15.6628 16.5 15.8753C16.5 16.0879 16.4281 16.266 16.2843 16.4095C16.1406 16.5532 15.9625 16.625 15.75 16.625H8.25ZM4.25 12.75C4.0375 12.75 3.85942 12.6781 3.71575 12.5343C3.57192 12.3904 3.5 12.2122 3.5 11.9998C3.5 11.7871 3.57192 11.609 3.71575 11.4655C3.85942 11.3218 4.0375 11.25 4.25 11.25H19.75C19.9625 11.25 20.1406 11.3219 20.2843 11.4658C20.4281 11.6096 20.5 11.7878 20.5 12.0003C20.5 12.2129 20.4281 12.391 20.2843 12.5345C20.1406 12.6782 19.9625 12.75 19.75 12.75H4.25ZM8.25 8.875C8.0375 8.875 7.85942 8.80308 7.71575 8.65925C7.57192 8.51542 7.5 8.33725 7.5 8.12475C7.5 7.91208 7.57192 7.734 7.71575 7.5905C7.85942 7.44683 8.0375 7.375 8.25 7.375H15.75C15.9625 7.375 16.1406 7.44692 16.2843 7.59075C16.4281 7.73458 16.5 7.91275 16.5 8.12525C16.5 8.33792 16.4281 8.516 16.2843 8.6595C16.1406 8.80317 15.9625 8.875 15.75 8.875H8.25ZM4.25 5C4.0375 5 3.85942 4.92808 3.71575 4.78425C3.57192 4.64042 3.5 4.46225 3.5 4.24975C3.5 4.03708 3.57192 3.859 3.71575 3.7155C3.85942 3.57183 4.0375 3.5 4.25 3.5H19.75C19.9625 3.5 20.1406 3.57192 20.2843 3.71575C20.4281 3.85958 20.5 4.03775 20.5 4.25025C20.5 4.46292 20.4281 4.641 20.2843 4.7845C20.1406 4.92817 19.9625 5 19.75 5H4.25Z"
    />
  </svg>
`;
var alignLeftIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      d="M4.25 20.5C4.0375 20.5 3.85942 20.4281 3.71575 20.2843C3.57192 20.1404 3.5 19.9622 3.5 19.7498C3.5 19.5371 3.57192 19.359 3.71575 19.2155C3.85942 19.0718 4.0375 19 4.25 19H19.75C19.9625 19 20.1406 19.0719 20.2843 19.2158C20.4281 19.3596 20.5 19.5378 20.5 19.7502C20.5 19.9629 20.4281 20.141 20.2843 20.2845C20.1406 20.4282 19.9625 20.5 19.75 20.5H4.25ZM4.25 16.625C4.0375 16.625 3.85942 16.5531 3.71575 16.4093C3.57192 16.2654 3.5 16.0872 3.5 15.8748C3.5 15.6621 3.57192 15.484 3.71575 15.3405C3.85942 15.1968 4.0375 15.125 4.25 15.125H13.75C13.9625 15.125 14.1406 15.1969 14.2843 15.3408C14.4281 15.4846 14.5 15.6628 14.5 15.8753C14.5 16.0879 14.4281 16.266 14.2843 16.4095C14.1406 16.5532 13.9625 16.625 13.75 16.625H4.25ZM4.25 12.75C4.0375 12.75 3.85942 12.6781 3.71575 12.5343C3.57192 12.3904 3.5 12.2122 3.5 11.9998C3.5 11.7871 3.57192 11.609 3.71575 11.4655C3.85942 11.3218 4.0375 11.25 4.25 11.25H19.75C19.9625 11.25 20.1406 11.3219 20.2843 11.4658C20.4281 11.6096 20.5 11.7878 20.5 12.0003C20.5 12.2129 20.4281 12.391 20.2843 12.5345C20.1406 12.6782 19.9625 12.75 19.75 12.75H4.25ZM4.25 8.875C4.0375 8.875 3.85942 8.80308 3.71575 8.65925C3.57192 8.51542 3.5 8.33725 3.5 8.12475C3.5 7.91208 3.57192 7.734 3.71575 7.5905C3.85942 7.44683 4.0375 7.375 4.25 7.375H13.75C13.9625 7.375 14.1406 7.44692 14.2843 7.59075C14.4281 7.73458 14.5 7.91275 14.5 8.12525C14.5 8.33792 14.4281 8.516 14.2843 8.6595C14.1406 8.80317 13.9625 8.875 13.75 8.875H4.25ZM4.25 5C4.0375 5 3.85942 4.92808 3.71575 4.78425C3.57192 4.64042 3.5 4.46225 3.5 4.24975C3.5 4.03708 3.57192 3.859 3.71575 3.7155C3.85942 3.57183 4.0375 3.5 4.25 3.5H19.75C19.9625 3.5 20.1406 3.57192 20.2843 3.71575C20.4281 3.85958 20.5 4.03775 20.5 4.25025C20.5 4.46292 20.4281 4.641 20.2843 4.7845C20.1406 4.92817 19.9625 5 19.75 5H4.25Z"
    />
  </svg>
`;
var alignRightIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      d="M4.25 5C4.0375 5 3.85942 4.92808 3.71575 4.78425C3.57192 4.64042 3.5 4.46225 3.5 4.24975C3.5 4.03708 3.57192 3.859 3.71575 3.7155C3.85942 3.57183 4.0375 3.5 4.25 3.5H19.75C19.9625 3.5 20.1406 3.57192 20.2843 3.71575C20.4281 3.85958 20.5 4.03775 20.5 4.25025C20.5 4.46292 20.4281 4.641 20.2843 4.7845C20.1406 4.92817 19.9625 5 19.75 5H4.25ZM10.25 8.875C10.0375 8.875 9.85942 8.80308 9.71575 8.65925C9.57192 8.51542 9.5 8.33725 9.5 8.12475C9.5 7.91208 9.57192 7.734 9.71575 7.5905C9.85942 7.44683 10.0375 7.375 10.25 7.375H19.75C19.9625 7.375 20.1406 7.44692 20.2843 7.59075C20.4281 7.73458 20.5 7.91275 20.5 8.12525C20.5 8.33792 20.4281 8.516 20.2843 8.6595C20.1406 8.80317 19.9625 8.875 19.75 8.875H10.25ZM4.25 12.75C4.0375 12.75 3.85942 12.6781 3.71575 12.5343C3.57192 12.3904 3.5 12.2122 3.5 11.9998C3.5 11.7871 3.57192 11.609 3.71575 11.4655C3.85942 11.3218 4.0375 11.25 4.25 11.25H19.75C19.9625 11.25 20.1406 11.3219 20.2843 11.4658C20.4281 11.6096 20.5 11.7878 20.5 12.0003C20.5 12.2129 20.4281 12.391 20.2843 12.5345C20.1406 12.6782 19.9625 12.75 19.75 12.75H4.25ZM10.25 16.625C10.0375 16.625 9.85942 16.5531 9.71575 16.4093C9.57192 16.2654 9.5 16.0872 9.5 15.8748C9.5 15.6621 9.57192 15.484 9.71575 15.3405C9.85942 15.1968 10.0375 15.125 10.25 15.125H19.75C19.9625 15.125 20.1406 15.1969 20.2843 15.3408C20.4281 15.4846 20.5 15.6628 20.5 15.8753C20.5 16.0879 20.4281 16.266 20.2843 16.4095C20.1406 16.5532 19.9625 16.625 19.75 16.625H10.25ZM4.25 20.5C4.0375 20.5 3.85942 20.4281 3.71575 20.2843C3.57192 20.1404 3.5 19.9622 3.5 19.7498C3.5 19.5371 3.57192 19.359 3.71575 19.2155C3.85942 19.0718 4.0375 19 4.25 19H19.75C19.9625 19 20.1406 19.0719 20.2843 19.2158C20.4281 19.3596 20.5 19.5378 20.5 19.7502C20.5 19.9629 20.4281 20.141 20.2843 20.2845C20.1406 20.4282 19.9625 20.5 19.75 20.5H4.25Z"
    />
  </svg>
`;
var boldIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      d="M8.85758 18.625C8.4358 18.625 8.07715 18.4772 7.78163 18.1817C7.48613 17.8862 7.33838 17.5275 7.33838 17.1058V6.8942C7.33838 6.47242 7.48613 6.11377 7.78163 5.81825C8.07715 5.52275 8.4358 5.375 8.85758 5.375H12.1999C13.2191 5.375 14.1406 5.69231 14.9643 6.32693C15.788 6.96154 16.1999 7.81603 16.1999 8.89038C16.1999 9.63779 16.0194 10.2471 15.6585 10.7183C15.2976 11.1894 14.9088 11.5314 14.4922 11.7442C15.005 11.9211 15.4947 12.2708 15.9614 12.7933C16.428 13.3157 16.6614 14.0192 16.6614 14.9038C16.6614 16.182 16.1902 17.1217 15.2479 17.723C14.3056 18.3243 13.3563 18.625 12.3999 18.625H8.85758ZM9.4883 16.6327H12.3191C13.1063 16.6327 13.6627 16.4141 13.9884 15.9769C14.314 15.5397 14.4768 15.1205 14.4768 14.7192C14.4768 14.3179 14.314 13.8987 13.9884 13.4615C13.6627 13.0243 13.0909 12.8057 12.273 12.8057H9.4883V16.6327ZM9.4883 10.875H12.0826C12.6903 10.875 13.172 10.7013 13.5278 10.3539C13.8836 10.0064 14.0615 9.59037 14.0615 9.10575C14.0615 8.59035 13.8733 8.16918 13.497 7.84225C13.1207 7.51533 12.6595 7.35188 12.1133 7.35188H9.4883V10.875Z"
    />
  </svg>
`;
var bulletIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_952_6527)">
      <circle cx="12" cy="12" r="3" />
    </g>
    <defs>
      <clipPath id="clip0_952_6527">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var bulletListIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_977_8070)">
      <path
        d="M4 10.5C3.17 10.5 2.5 11.17 2.5 12C2.5 12.83 3.17 13.5 4 13.5C4.83 13.5 5.5 12.83 5.5 12C5.5 11.17 4.83 10.5 4 10.5ZM4 4.5C3.17 4.5 2.5 5.17 2.5 6C2.5 6.83 3.17 7.5 4 7.5C4.83 7.5 5.5 6.83 5.5 6C5.5 5.17 4.83 4.5 4 4.5ZM4 16.5C3.17 16.5 2.5 17.18 2.5 18C2.5 18.82 3.18 19.5 4 19.5C4.82 19.5 5.5 18.82 5.5 18C5.5 17.18 4.83 16.5 4 16.5ZM8 19H20C20.55 19 21 18.55 21 18C21 17.45 20.55 17 20 17H8C7.45 17 7 17.45 7 18C7 18.55 7.45 19 8 19ZM8 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H8C7.45 11 7 11.45 7 12C7 12.55 7.45 13 8 13ZM7 6C7 6.55 7.45 7 8 7H20C20.55 7 21 6.55 21 6C21 5.45 20.55 5 20 5H8C7.45 5 7 5.45 7 6Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_977_8070">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var captionIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29zm1-6v3.08L13.08 16H20V4H4v12z"
    />
  </svg>
`;
var checkBoxCheckedIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_1803_1151)">
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10.71 16.29C10.32 16.68 9.69 16.68 9.3 16.29L5.71 12.7C5.32 12.31 5.32 11.68 5.71 11.29C6.1 10.9 6.73 10.9 7.12 11.29L10 14.17L16.88 7.29C17.27 6.9 17.9 6.9 18.29 7.29C18.68 7.68 18.68 8.31 18.29 8.7L10.71 16.29Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_1803_1151">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var checkBoxUncheckedIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_1803_535)">
      <path
        d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H18C18.55 5 19 5.45 19 6V18C19 18.55 18.55 19 18 19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_1803_535">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var chevronDownIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
`;
var clearIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_1098_15553)">
      <path
        d="M18.3007 5.70973C17.9107 5.31973 17.2807 5.31973 16.8907 5.70973L12.0007 10.5897L7.1107 5.69973C6.7207 5.30973 6.0907 5.30973 5.7007 5.69973C5.3107 6.08973 5.3107 6.71973 5.7007 7.10973L10.5907 11.9997L5.7007 16.8897C5.3107 17.2797 5.3107 17.9097 5.7007 18.2997C6.0907 18.6897 6.7207 18.6897 7.1107 18.2997L12.0007 13.4097L16.8907 18.2997C17.2807 18.6897 17.9107 18.6897 18.3007 18.2997C18.6907 17.9097 18.6907 17.2797 18.3007 16.8897L13.4107 11.9997L18.3007 7.10973C18.6807 6.72973 18.6807 6.08973 18.3007 5.70973Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_1098_15553">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var codeIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_977_8081)">
      <path
        d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_977_8081">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var confirmIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#clip0_1013_1606)">
      <path
        d="M9.00012 16.1998L5.50012 12.6998C5.11012 12.3098 4.49012 12.3098 4.10012 12.6998C3.71012 13.0898 3.71012 13.7098 4.10012 14.0998L8.29012 18.2898C8.68012 18.6798 9.31012 18.6798 9.70012 18.2898L20.3001 7.69982C20.6901 7.30982 20.6901 6.68982 20.3001 6.29982C19.9101 5.90982 19.2901 5.90982 18.9001 6.29982L9.00012 16.1998Z"
        fill="#817567"
      />
    </g>
    <defs>
      <clipPath id="clip0_1013_1606">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var copyIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="none"
  >
    <path
      d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
    />
  </svg>
`;
var dividerIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_977_7900)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19 13H5C4.45 13 4 12.55 4 12C4 11.45 4.45 11 5 11H19C19.55 11 20 11.45 20 12C20 12.55 19.55 13 19 13Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_977_7900">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var dragHandleIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      d="M3.5 9.83366C3.35833 9.83366 3.23961 9.78571 3.14383 9.68983C3.04794 9.59394 3 9.47516 3 9.33349C3 9.19171 3.04794 9.07299 3.14383 8.97733C3.23961 8.88155 3.35833 8.83366 3.5 8.83366H12.5C12.6417 8.83366 12.7604 8.8816 12.8562 8.97749C12.9521 9.07338 13 9.19216 13 9.33383C13 9.4756 12.9521 9.59433 12.8562 9.68999C12.7604 9.78577 12.6417 9.83366 12.5 9.83366H3.5ZM3.5 7.16699C3.35833 7.16699 3.23961 7.11905 3.14383 7.02316C3.04794 6.92727 3 6.80849 3 6.66683C3 6.52505 3.04794 6.40633 3.14383 6.31066C3.23961 6.21488 3.35833 6.16699 3.5 6.16699H12.5C12.6417 6.16699 12.7604 6.21494 12.8562 6.31083C12.9521 6.40671 13 6.52549 13 6.66716C13 6.80894 12.9521 6.92766 12.8562 7.02333C12.7604 7.1191 12.6417 7.16699 12.5 7.16699H3.5Z"
    />
  </svg>
`;
var editIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_1013_1585)">
      <path
        d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_1013_1585">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var h1Icon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_992_5553)">
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM12 17H14V7H10V9H12V17Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_992_5553">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var h2Icon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_992_5559)">
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM15 15H11V13H13C14.1 13 15 12.11 15 11V9C15 7.89 14.1 7 13 7H9V9H13V11H11C9.9 11 9 11.89 9 13V17H15V15Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_992_5559">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var h3Icon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_992_5565)">
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM15 15V13.5C15 12.67 14.33 12 13.5 12C14.33 12 15 11.33 15 10.5V9C15 7.89 14.1 7 13 7H9V9H13V11H11V13H13V15H9V17H13C14.1 17 15 16.11 15 15Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_992_5565">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var h4Icon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_977_7757)">
      <path
        d="M19.04 3H5.04004C3.94004 3 3.04004 3.9 3.04004 5V19C3.04004 20.1 3.94004 21 5.04004 21H19.04C20.14 21 21.04 20.1 21.04 19V5C21.04 3.9 20.14 3 19.04 3ZM19.04 19H5.04004V5H19.04V19ZM13.04 17H15.04V7H13.04V11H11.04V7H9.04004V13H13.04V17Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_977_7757">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var h5Icon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_977_7760)">
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM15 15V13C15 11.89 14.1 11 13 11H11V9H15V7H9V13H13V15H9V17H13C14.1 17 15 16.11 15 15Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_977_7760">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var h6Icon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_977_7763)">
      <path
        d="M11 17H13C14.1 17 15 16.11 15 15V13C15 11.89 14.1 11 13 11H11V9H15V7H11C9.9 7 9 7.89 9 9V15C9 16.11 9.9 17 11 17ZM11 13H13V15H11V13ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_977_7763">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var imageIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_977_8075)">
      <path
        d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14.14 11.86L11.14 15.73L9 13.14L6 17H18L14.14 11.86Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_977_8075">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var italicIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      d="M6.29811 18.625C6.04505 18.625 5.83115 18.5375 5.65641 18.3626C5.48166 18.1877 5.39429 17.9736 5.39429 17.7203C5.39429 17.467 5.48166 17.2532 5.65641 17.0788C5.83115 16.9045 6.04505 16.8173 6.29811 16.8173H9.21159L12.452 7.18265H9.53851C9.28545 7.18265 9.07155 7.0952 8.89681 6.9203C8.72206 6.7454 8.63469 6.5313 8.63469 6.278C8.63469 6.02472 8.72206 5.81089 8.89681 5.63652C9.07155 5.46217 9.28545 5.375 9.53851 5.375H16.8847C17.1377 5.375 17.3516 5.46245 17.5264 5.63735C17.7011 5.81225 17.7885 6.02634 17.7885 6.27962C17.7885 6.53293 17.7011 6.74676 17.5264 6.92113C17.3516 7.09548 17.1377 7.18265 16.8847 7.18265H14.2789L11.0385 16.8173H13.6443C13.8973 16.8173 14.1112 16.9048 14.286 17.0797C14.4607 17.2546 14.5481 17.4687 14.5481 17.722C14.5481 17.9752 14.4607 18.1891 14.286 18.3634C14.1112 18.5378 13.8973 18.625 13.6443 18.625H6.29811Z"
    />
  </svg>
`;
var linkIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      d="M17.0385 19.5003V16.5388H14.0769V15.0388H17.0385V12.0773H18.5384V15.0388H21.5V16.5388H18.5384V19.5003H17.0385ZM10.8077 16.5388H7.03845C5.78282 16.5388 4.7125 16.0963 3.8275 15.2114C2.9425 14.3266 2.5 13.2564 2.5 12.0009C2.5 10.7454 2.9425 9.67504 3.8275 8.78979C4.7125 7.90454 5.78282 7.46191 7.03845 7.46191H10.8077V8.96186H7.03845C6.1987 8.96186 5.48235 9.25834 4.8894 9.85129C4.29645 10.4442 3.99998 11.1606 3.99998 12.0003C3.99998 12.8401 4.29645 13.5564 4.8894 14.1494C5.48235 14.7423 6.1987 15.0388 7.03845 15.0388H10.8077V16.5388ZM8.25 12.7503V11.2504H15.75V12.7503H8.25ZM21.5 12.0003H20C20 11.1606 19.7035 10.4442 19.1106 9.85129C18.5176 9.25834 17.8013 8.96186 16.9615 8.96186H13.1923V7.46191H16.9615C18.2171 7.46191 19.2875 7.90441 20.1725 8.78939C21.0575 9.67439 21.5 10.7447 21.5 12.0003Z"
    />
  </svg>
`;
var menuIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_971_7680)">
      <path
        d="M11 18C11 19.1 10.1 20 9 20C7.9 20 7 19.1 7 18C7 16.9 7.9 16 9 16C10.1 16 11 16.9 11 18ZM9 10C7.9 10 7 10.9 7 12C7 13.1 7.9 14 9 14C10.1 14 11 13.1 11 12C11 10.9 10.1 10 9 10ZM9 4C7.9 4 7 4.9 7 6C7 7.1 7.9 8 9 8C10.1 8 11 7.1 11 6C11 4.9 10.1 4 9 4ZM15 8C16.1 8 17 7.1 17 6C17 4.9 16.1 4 15 4C13.9 4 13 4.9 13 6C13 7.1 13.9 8 15 8ZM15 10C13.9 10 13 10.9 13 12C13 13.1 13.9 14 15 14C16.1 14 17 13.1 17 12C17 10.9 16.1 10 15 10ZM15 16C13.9 16 13 16.9 13 18C13 19.1 13.9 20 15 20C16.1 20 17 19.1 17 18C17 16.9 16.1 16 15 16Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_971_7680">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var orderedListIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_977_8067)">
      <path
        d="M8 7H20C20.55 7 21 6.55 21 6C21 5.45 20.55 5 20 5H8C7.45 5 7 5.45 7 6C7 6.55 7.45 7 8 7ZM20 17H8C7.45 17 7 17.45 7 18C7 18.55 7.45 19 8 19H20C20.55 19 21 18.55 21 18C21 17.45 20.55 17 20 17ZM20 11H8C7.45 11 7 11.45 7 12C7 12.55 7.45 13 8 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11ZM4.5 16H2.5C2.22 16 2 16.22 2 16.5C2 16.78 2.22 17 2.5 17H4V17.5H3.5C3.22 17.5 3 17.72 3 18C3 18.28 3.22 18.5 3.5 18.5H4V19H2.5C2.22 19 2 19.22 2 19.5C2 19.78 2.22 20 2.5 20H4.5C4.78 20 5 19.78 5 19.5V16.5C5 16.22 4.78 16 4.5 16ZM2.5 5H3V7.5C3 7.78 3.22 8 3.5 8C3.78 8 4 7.78 4 7.5V4.5C4 4.22 3.78 4 3.5 4H2.5C2.22 4 2 4.22 2 4.5C2 4.78 2.22 5 2.5 5ZM4.5 10H2.5C2.22 10 2 10.22 2 10.5C2 10.78 2.22 11 2.5 11H3.8L2.12 12.96C2.04 13.05 2 13.17 2 13.28V13.5C2 13.78 2.22 14 2.5 14H4.5C4.78 14 5 13.78 5 13.5C5 13.22 4.78 13 4.5 13H3.2L4.88 11.04C4.96 10.95 5 10.83 5 10.72V10.5C5 10.22 4.78 10 4.5 10Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_977_8067">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var plusIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_971_7676)">
      <path
        d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_971_7676">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var quoteIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_977_7897)">
      <path
        d="M7.17 17C7.68 17 8.15 16.71 8.37 16.26L9.79 13.42C9.93 13.14 10 12.84 10 12.53V8C10 7.45 9.55 7 9 7H5C4.45 7 4 7.45 4 8V12C4 12.55 4.45 13 5 13H7L5.97 15.06C5.52 15.95 6.17 17 7.17 17ZM17.17 17C17.68 17 18.15 16.71 18.37 16.26L19.79 13.42C19.93 13.14 20 12.84 20 12.53V8C20 7.45 19.55 7 19 7H15C14.45 7 14 7.45 14 8V12C14 12.55 14.45 13 15 13H17L15.97 15.06C15.52 15.95 16.17 17 17.17 17Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_977_7897">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var removeIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      d="M7.30775 20.4997C6.81058 20.4997 6.385 20.3227 6.031 19.9687C5.677 19.6147 5.5 19.1892 5.5 18.692V5.99973H5.25C5.0375 5.99973 4.85942 5.92782 4.71575 5.78398C4.57192 5.64015 4.5 5.46198 4.5 5.24948C4.5 5.03682 4.57192 4.85873 4.71575 4.71523C4.85942 4.57157 5.0375 4.49973 5.25 4.49973H9C9 4.2549 9.08625 4.04624 9.25875 3.87374C9.43108 3.7014 9.63967 3.61523 9.8845 3.61523H14.1155C14.3603 3.61523 14.5689 3.7014 14.7413 3.87374C14.9138 4.04624 15 4.2549 15 4.49973H18.75C18.9625 4.49973 19.1406 4.57165 19.2843 4.71548C19.4281 4.85932 19.5 5.03748 19.5 5.24998C19.5 5.46265 19.4281 5.64073 19.2843 5.78423C19.1406 5.9279 18.9625 5.99973 18.75 5.99973H18.5V18.692C18.5 19.1892 18.323 19.6147 17.969 19.9687C17.615 20.3227 17.1894 20.4997 16.6923 20.4997H7.30775ZM17 5.99973H7V18.692C7 18.7818 7.02883 18.8556 7.0865 18.9132C7.14417 18.9709 7.21792 18.9997 7.30775 18.9997H16.6923C16.7821 18.9997 16.8558 18.9709 16.9135 18.9132C16.9712 18.8556 17 18.7818 17 18.692V5.99973ZM10.1543 16.9997C10.3668 16.9997 10.5448 16.9279 10.6885 16.7842C10.832 16.6404 10.9037 16.4622 10.9037 16.2497V8.74973C10.9037 8.53723 10.8318 8.35907 10.688 8.21523C10.5443 8.07157 10.3662 7.99973 10.1535 7.99973C9.941 7.99973 9.76292 8.07157 9.61925 8.21523C9.47575 8.35907 9.404 8.53723 9.404 8.74973V16.2497C9.404 16.4622 9.47583 16.6404 9.6195 16.7842C9.76333 16.9279 9.94158 16.9997 10.1543 16.9997ZM13.8465 16.9997C14.059 16.9997 14.2371 16.9279 14.3807 16.7842C14.5243 16.6404 14.596 16.4622 14.596 16.2497V8.74973C14.596 8.53723 14.5242 8.35907 14.3805 8.21523C14.2367 8.07157 14.0584 7.99973 13.8458 7.99973C13.6333 7.99973 13.4552 8.07157 13.3115 8.21523C13.168 8.35907 13.0962 8.53723 13.0962 8.74973V16.2497C13.0962 16.4622 13.1682 16.6404 13.312 16.7842C13.4557 16.9279 13.6338 16.9997 13.8465 16.9997Z"
    />
  </svg>
`;
var searchIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
`;
var strikethroughIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      d="M3.25 13.7404C3.0375 13.7404 2.85938 13.6684 2.71563 13.5246C2.57188 13.3808 2.5 13.2026 2.5 12.99C2.5 12.7774 2.57188 12.5993 2.71563 12.4558C2.85938 12.3122 3.0375 12.2404 3.25 12.2404H20.75C20.9625 12.2404 21.1406 12.3123 21.2843 12.4561C21.4281 12.5999 21.5 12.7781 21.5 12.9907C21.5 13.2033 21.4281 13.3814 21.2843 13.525C21.1406 13.6686 20.9625 13.7404 20.75 13.7404H3.25ZM10.9423 10.2596V6.62495H6.5673C6.2735 6.62495 6.02377 6.52201 5.8181 6.31613C5.61245 6.11026 5.50963 5.86027 5.50963 5.56615C5.50963 5.27205 5.61245 5.02083 5.8181 4.8125C6.02377 4.60417 6.2735 4.5 6.5673 4.5H17.4423C17.7361 4.5 17.9858 4.60294 18.1915 4.80883C18.3971 5.01471 18.5 5.2647 18.5 5.5588C18.5 5.85292 18.3971 6.10413 18.1915 6.31245C17.9858 6.52078 17.7361 6.62495 17.4423 6.62495H13.0673V10.2596H10.9423ZM10.9423 15.7211H13.0673V18.4423C13.0673 18.7361 12.9643 18.9858 12.7584 19.1915C12.5526 19.3971 12.3026 19.5 12.0085 19.5C11.7144 19.5 11.4631 19.3962 11.2548 19.1887C11.0465 18.9811 10.9423 18.7291 10.9423 18.4327V15.7211Z"
    />
  </svg>
`;
var tableIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_977_8078)">
      <path
        d="M20 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 5V8H5V5H20ZM15 19H10V10H15V19ZM5 10H8V19H5V10ZM17 19V10H20V19H17Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_977_8078">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var textIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g clip-path="url(#clip0_992_5547)">
      <path
        d="M5 5.5C5 6.33 5.67 7 6.5 7H10.5V17.5C10.5 18.33 11.17 19 12 19C12.83 19 13.5 18.33 13.5 17.5V7H17.5C18.33 7 19 6.33 19 5.5C19 4.67 18.33 4 17.5 4H6.5C5.67 4 5 4.67 5 5.5Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_992_5547">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
`;
var todoListIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      d="M5.66936 16.3389L9.39244 12.6158C9.54115 12.4671 9.71679 12.3937 9.91936 12.3957C10.1219 12.3976 10.2975 12.4761 10.4463 12.6312C10.5847 12.7823 10.654 12.9585 10.654 13.1599C10.654 13.3613 10.5847 13.5363 10.4463 13.6851L6.32704 17.8197C6.14627 18.0004 5.93538 18.0908 5.69436 18.0908C5.45333 18.0908 5.24243 18.0004 5.06166 17.8197L3.01744 15.7754C2.87899 15.637 2.81136 15.4629 2.81456 15.2533C2.81776 15.0437 2.88859 14.8697 3.02706 14.7312C3.16551 14.5928 3.34008 14.5235 3.55076 14.5235C3.76144 14.5235 3.93494 14.5928 4.07126 14.7312L5.66936 16.3389ZM5.66936 8.72359L9.39244 5.00049C9.54115 4.85177 9.71679 4.77838 9.91936 4.78031C10.1219 4.78223 10.2975 4.86075 10.4463 5.01586C10.5847 5.16691 10.654 5.34314 10.654 5.54454C10.654 5.74592 10.5847 5.92097 10.4463 6.06969L6.32704 10.2043C6.14627 10.3851 5.93538 10.4755 5.69436 10.4755C5.45333 10.4755 5.24243 10.3851 5.06166 10.2043L3.01744 8.16009C2.87899 8.02162 2.81136 7.84759 2.81456 7.63799C2.81776 7.42837 2.88859 7.25433 3.02706 7.11586C3.16551 6.97741 3.34008 6.90819 3.55076 6.90819C3.76144 6.90819 3.93494 6.97741 4.07126 7.11586L5.66936 8.72359ZM13.7597 16.5581C13.5472 16.5581 13.3691 16.4862 13.2253 16.3424C13.0816 16.1986 13.0097 16.0204 13.0097 15.8078C13.0097 15.5952 13.0816 15.4171 13.2253 15.2735C13.3691 15.13 13.5472 15.0582 13.7597 15.0582H20.7597C20.9722 15.0582 21.1503 15.1301 21.2941 15.2739C21.4378 15.4177 21.5097 15.5959 21.5097 15.8085C21.5097 16.0211 21.4378 16.1992 21.2941 16.3427C21.1503 16.4863 20.9722 16.5581 20.7597 16.5581H13.7597ZM13.7597 8.94276C13.5472 8.94276 13.3691 8.87085 13.2253 8.72704C13.0816 8.58324 13.0097 8.40504 13.0097 8.19244C13.0097 7.97985 13.0816 7.80177 13.2253 7.65819C13.3691 7.5146 13.5472 7.44281 13.7597 7.44281H20.7597C20.9722 7.44281 21.1503 7.51471 21.2941 7.65851C21.4378 7.80233 21.5097 7.98053 21.5097 8.19311C21.5097 8.40571 21.4378 8.5838 21.2941 8.72739C21.1503 8.87097 20.9722 8.94276 20.7597 8.94276H13.7597Z"
    />
  </svg>
`;
var functionsIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M7 19v-.808L13.096 12L7 5.808V5h10v1.25H9.102L14.727 12l-5.625 5.77H17V19z"
    />
  </svg>
`;
var visibilityOffIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
  >
    <path
      d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"
    />
  </svg>
`;
var defaultConfig = { [CrepeFeature.CodeMirror]: {
	theme: oneDark,
	languages,
	expandIcon: chevronDownIcon,
	searchIcon,
	clearSearchIcon: clearIcon,
	searchPlaceholder: "Search language",
	noResultText: "No result",
	previewToggleIcon: (previewOnlyMode) => previewOnlyMode ? editIcon : visibilityOffIcon
} };
var FeaturesCtx = createSlice([], "FeaturesCtx");
var CrepeCtx = createSlice({}, "CrepeCtx");
function useCrepe(ctx) {
	return ctx.get("CrepeCtx");
}
function useCrepeFeatures(ctx) {
	return ctx.use("FeaturesCtx");
}
function crepeFeatureConfig(feature) {
	return (ctx) => {
		useCrepeFeatures(ctx).update((features) => {
			if (features.includes(feature)) return features;
			return [...features, feature];
		});
	};
}
function isInCodeBlock(selection) {
	return selection.$from.parent.type.name === "code_block";
}
function isInList(selection) {
	var _a;
	const type = (_a = selection.$from.node(selection.$from.depth - 1)) == null ? void 0 : _a.type;
	return (type == null ? void 0 : type.name) === "list_item";
}
var __typeError$5 = (msg) => {
	throw TypeError(msg);
};
var __accessCheck$5 = (obj, member, msg) => member.has(obj) || __typeError$5("Cannot " + msg);
var __privateGet$5 = (obj, member, getter) => (__accessCheck$5(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$5 = (obj, member, value) => member.has(obj) ? __typeError$5("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$5 = (obj, member, value, setter) => (__accessCheck$5(obj, member, "write to private field"), member.set(obj, value), value);
var _groups, _getGroupInstance;
var GroupBuilder = class {
	constructor() {
		__privateAdd$5(this, _groups, []);
		this.clear = () => {
			__privateSet$5(this, _groups, []);
			return this;
		};
		__privateAdd$5(this, _getGroupInstance, (group) => {
			const groupInstance = {
				group,
				addItem: (key, item) => {
					const data = {
						...item,
						key
					};
					group.items.push(data);
					return groupInstance;
				},
				clear: () => {
					group.items = [];
					return groupInstance;
				}
			};
			return groupInstance;
		});
		this.addGroup = (key, label) => {
			const group = {
				key,
				label,
				items: []
			};
			__privateGet$5(this, _groups).push(group);
			return __privateGet$5(this, _getGroupInstance).call(this, group);
		};
		this.getGroup = (key) => {
			const group = __privateGet$5(this, _groups).find((group2) => group2.key === key);
			if (!group) throw new Error(`Group with key ${key} not found`);
			return __privateGet$5(this, _getGroupInstance).call(this, group);
		};
		this.build = () => {
			return __privateGet$5(this, _groups);
		};
	}
};
_groups = /* @__PURE__ */ new WeakMap();
_getGroupInstance = /* @__PURE__ */ new WeakMap();
function getGroups$1(filter, config, ctx) {
	var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb;
	const flags = ctx && useCrepeFeatures(ctx).get();
	const isLatexEnabled = flags == null ? void 0 : flags.includes(CrepeFeature.Latex);
	const isImageBlockEnabled = flags == null ? void 0 : flags.includes(CrepeFeature.ImageBlock);
	const isTableEnabled = flags == null ? void 0 : flags.includes(CrepeFeature.Table);
	const groupBuilder = new GroupBuilder();
	if ((config == null ? void 0 : config.textGroup) !== null) {
		const textGroup = groupBuilder.addGroup("text", (_b = (_a = config == null ? void 0 : config.textGroup) == null ? void 0 : _a.label) != null ? _b : "Text");
		if (((_c = config == null ? void 0 : config.textGroup) == null ? void 0 : _c.text) !== null) textGroup.addItem("text", {
			label: (_f = (_e = (_d = config == null ? void 0 : config.textGroup) == null ? void 0 : _d.text) == null ? void 0 : _e.label) != null ? _f : "Text",
			icon: (_i = (_h = (_g = config == null ? void 0 : config.textGroup) == null ? void 0 : _g.text) == null ? void 0 : _h.icon) != null ? _i : textIcon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const paragraph = paragraphSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(setBlockTypeCommand.key, { nodeType: paragraph });
			}
		});
		if (((_j = config == null ? void 0 : config.textGroup) == null ? void 0 : _j.h1) !== null) textGroup.addItem("h1", {
			label: (_m = (_l = (_k = config == null ? void 0 : config.textGroup) == null ? void 0 : _k.h1) == null ? void 0 : _l.label) != null ? _m : "Heading 1",
			icon: (_p = (_o = (_n = config == null ? void 0 : config.textGroup) == null ? void 0 : _n.h1) == null ? void 0 : _o.icon) != null ? _p : h1Icon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const heading = headingSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(setBlockTypeCommand.key, {
					nodeType: heading,
					attrs: { level: 1 }
				});
			}
		});
		if (((_q = config == null ? void 0 : config.textGroup) == null ? void 0 : _q.h2) !== null) textGroup.addItem("h2", {
			label: (_t = (_s = (_r = config == null ? void 0 : config.textGroup) == null ? void 0 : _r.h2) == null ? void 0 : _s.label) != null ? _t : "Heading 2",
			icon: (_w = (_v = (_u = config == null ? void 0 : config.textGroup) == null ? void 0 : _u.h2) == null ? void 0 : _v.icon) != null ? _w : h2Icon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const heading = headingSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(setBlockTypeCommand.key, {
					nodeType: heading,
					attrs: { level: 2 }
				});
			}
		});
		if (((_x = config == null ? void 0 : config.textGroup) == null ? void 0 : _x.h3) !== null) textGroup.addItem("h3", {
			label: (_A = (_z = (_y = config == null ? void 0 : config.textGroup) == null ? void 0 : _y.h3) == null ? void 0 : _z.label) != null ? _A : "Heading 3",
			icon: (_D = (_C = (_B = config == null ? void 0 : config.textGroup) == null ? void 0 : _B.h3) == null ? void 0 : _C.icon) != null ? _D : h3Icon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const heading = headingSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(setBlockTypeCommand.key, {
					nodeType: heading,
					attrs: { level: 3 }
				});
			}
		});
		if (((_E = config == null ? void 0 : config.textGroup) == null ? void 0 : _E.h4) !== null) textGroup.addItem("h4", {
			label: (_H = (_G = (_F = config == null ? void 0 : config.textGroup) == null ? void 0 : _F.h4) == null ? void 0 : _G.label) != null ? _H : "Heading 4",
			icon: (_K = (_J = (_I = config == null ? void 0 : config.textGroup) == null ? void 0 : _I.h4) == null ? void 0 : _J.icon) != null ? _K : h4Icon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const heading = headingSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(setBlockTypeCommand.key, {
					nodeType: heading,
					attrs: { level: 4 }
				});
			}
		});
		if (((_L = config == null ? void 0 : config.textGroup) == null ? void 0 : _L.h5) !== null) textGroup.addItem("h5", {
			label: (_O = (_N = (_M = config == null ? void 0 : config.textGroup) == null ? void 0 : _M.h5) == null ? void 0 : _N.label) != null ? _O : "Heading 5",
			icon: (_R = (_Q = (_P = config == null ? void 0 : config.textGroup) == null ? void 0 : _P.h5) == null ? void 0 : _Q.icon) != null ? _R : h5Icon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const heading = headingSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(setBlockTypeCommand.key, {
					nodeType: heading,
					attrs: { level: 5 }
				});
			}
		});
		if (((_S = config == null ? void 0 : config.textGroup) == null ? void 0 : _S.h6) !== null) textGroup.addItem("h6", {
			label: (_V = (_U = (_T = config == null ? void 0 : config.textGroup) == null ? void 0 : _T.h6) == null ? void 0 : _U.label) != null ? _V : "Heading 6",
			icon: (_Y = (_X = (_W = config == null ? void 0 : config.textGroup) == null ? void 0 : _W.h6) == null ? void 0 : _X.icon) != null ? _Y : h6Icon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const heading = headingSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(setBlockTypeCommand.key, {
					nodeType: heading,
					attrs: { level: 6 }
				});
			}
		});
		if (((_Z = config == null ? void 0 : config.textGroup) == null ? void 0 : _Z.quote) !== null) textGroup.addItem("quote", {
			label: (_aa = (_$ = (__ = config == null ? void 0 : config.textGroup) == null ? void 0 : __.quote) == null ? void 0 : _$.label) != null ? _aa : "Quote",
			icon: (_da = (_ca = (_ba = config == null ? void 0 : config.textGroup) == null ? void 0 : _ba.quote) == null ? void 0 : _ca.icon) != null ? _da : quoteIcon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const blockquote = blockquoteSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(wrapInBlockTypeCommand.key, { nodeType: blockquote });
			}
		});
		if (((_ea = config == null ? void 0 : config.textGroup) == null ? void 0 : _ea.divider) !== null) textGroup.addItem("divider", {
			label: (_ha = (_ga = (_fa = config == null ? void 0 : config.textGroup) == null ? void 0 : _fa.divider) == null ? void 0 : _ga.label) != null ? _ha : "Divider",
			icon: (_ka = (_ja = (_ia = config == null ? void 0 : config.textGroup) == null ? void 0 : _ia.divider) == null ? void 0 : _ja.icon) != null ? _ka : dividerIcon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const hr = hrSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(addBlockTypeCommand.key, { nodeType: hr });
			}
		});
	}
	if ((config == null ? void 0 : config.listGroup) !== null) {
		const listGroup = groupBuilder.addGroup("list", (_ma = (_la = config == null ? void 0 : config.listGroup) == null ? void 0 : _la.label) != null ? _ma : "List");
		if (((_na = config == null ? void 0 : config.listGroup) == null ? void 0 : _na.bulletList) !== null) listGroup.addItem("bullet-list", {
			label: (_qa = (_pa = (_oa = config == null ? void 0 : config.listGroup) == null ? void 0 : _oa.bulletList) == null ? void 0 : _pa.label) != null ? _qa : "Bullet List",
			icon: (_ta = (_sa = (_ra = config == null ? void 0 : config.listGroup) == null ? void 0 : _ra.bulletList) == null ? void 0 : _sa.icon) != null ? _ta : bulletListIcon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const bulletList = bulletListSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(wrapInBlockTypeCommand.key, { nodeType: bulletList });
			}
		});
		if (((_ua = config == null ? void 0 : config.listGroup) == null ? void 0 : _ua.orderedList) !== null) listGroup.addItem("ordered-list", {
			label: (_xa = (_wa = (_va = config == null ? void 0 : config.listGroup) == null ? void 0 : _va.orderedList) == null ? void 0 : _wa.label) != null ? _xa : "Ordered List",
			icon: (_Aa = (_za = (_ya = config == null ? void 0 : config.listGroup) == null ? void 0 : _ya.orderedList) == null ? void 0 : _za.icon) != null ? _Aa : orderedListIcon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const orderedList = orderedListSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(wrapInBlockTypeCommand.key, { nodeType: orderedList });
			}
		});
		if (((_Ba = config == null ? void 0 : config.listGroup) == null ? void 0 : _Ba.taskList) !== null) listGroup.addItem("task-list", {
			label: (_Ea = (_Da = (_Ca = config == null ? void 0 : config.listGroup) == null ? void 0 : _Ca.taskList) == null ? void 0 : _Da.label) != null ? _Ea : "Task List",
			icon: (_Ha = (_Ga = (_Fa = config == null ? void 0 : config.listGroup) == null ? void 0 : _Fa.taskList) == null ? void 0 : _Ga.icon) != null ? _Ha : todoListIcon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const listItem = listItemSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(wrapInBlockTypeCommand.key, {
					nodeType: listItem,
					attrs: { checked: false }
				});
			}
		});
	}
	if ((config == null ? void 0 : config.advancedGroup) !== null) {
		const advancedGroup = groupBuilder.addGroup("advanced", (_Ja = (_Ia = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _Ia.label) != null ? _Ja : "Advanced");
		if (((_Ka = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _Ka.image) !== null && isImageBlockEnabled) advancedGroup.addItem("image", {
			label: (_Na = (_Ma = (_La = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _La.image) == null ? void 0 : _Ma.label) != null ? _Na : "Image",
			icon: (_Qa = (_Pa = (_Oa = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _Oa.image) == null ? void 0 : _Pa.icon) != null ? _Qa : imageIcon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const imageBlock = imageBlockSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(addBlockTypeCommand.key, { nodeType: imageBlock });
			}
		});
		if (((_Ra = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _Ra.codeBlock) !== null) advancedGroup.addItem("code", {
			label: (_Ua = (_Ta = (_Sa = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _Sa.codeBlock) == null ? void 0 : _Ta.label) != null ? _Ua : "Code",
			icon: (_Xa = (_Wa = (_Va = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _Va.codeBlock) == null ? void 0 : _Wa.icon) != null ? _Xa : codeIcon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const codeBlock = codeBlockSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(setBlockTypeCommand.key, { nodeType: codeBlock });
			}
		});
		if (((_Ya = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _Ya.table) !== null && isTableEnabled) advancedGroup.addItem("table", {
			label: (_$a = (__a = (_Za = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _Za.table) == null ? void 0 : __a.label) != null ? _$a : "Table",
			icon: (_cb = (_bb = (_ab = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _ab.table) == null ? void 0 : _bb.icon) != null ? _cb : tableIcon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const view = ctx2.get(editorViewCtx);
				commands.call(clearTextInCurrentBlockCommand.key);
				const { from } = view.state.selection;
				commands.call(addBlockTypeCommand.key, { nodeType: createTable(ctx2, 3, 3) });
				commands.call(selectTextNearPosCommand.key, { pos: from });
			}
		});
		if (((_db = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _db.math) !== null && isLatexEnabled) advancedGroup.addItem("math", {
			label: (_gb = (_fb = (_eb = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _eb.math) == null ? void 0 : _fb.label) != null ? _gb : "Math",
			icon: (_jb = (_ib = (_hb = config == null ? void 0 : config.advancedGroup) == null ? void 0 : _hb.math) == null ? void 0 : _ib.icon) != null ? _jb : functionsIcon,
			onRun: (ctx2) => {
				const commands = ctx2.get(commandsCtx);
				const codeBlock = codeBlockSchema.type(ctx2);
				commands.call(clearTextInCurrentBlockCommand.key);
				commands.call(addBlockTypeCommand.key, {
					nodeType: codeBlock,
					attrs: { language: "LaTex" }
				});
			}
		});
	}
	(_kb = config == null ? void 0 : config.buildMenu) == null || _kb.call(config, groupBuilder);
	let groups = groupBuilder.build();
	if (filter) groups = groups.map((group) => {
		const items2 = group.items.filter((item) => item.label.toLowerCase().includes(filter.toLowerCase()));
		return {
			...group,
			items: items2
		};
	}).filter((group) => group.items.length > 0);
	const items = groups.flatMap((groups2) => groups2.items);
	items.forEach((item, index) => {
		Object.assign(item, { index });
	});
	groups.reduce((acc, group) => {
		const end = acc + group.items.length;
		Object.assign(group, { range: [acc, end] });
		return end;
	}, 0);
	return {
		groups,
		size: items.length
	};
}
var Menu = (0, vue_exports.defineComponent)({
	props: {
		ctx: {
			type: Object,
			required: true
		},
		show: {
			type: Object,
			required: true
		},
		filter: {
			type: Object,
			required: true
		},
		hide: {
			type: Function,
			required: true
		},
		config: {
			type: Object,
			required: false
		}
	},
	setup({ ctx, show, filter, hide, config }) {
		const host = (0, vue_exports.ref)();
		const groupInfo = (0, vue_exports.computed)(() => getGroups$1(filter.value, config, ctx));
		const hoverIndex = (0, vue_exports.ref)(0);
		const prevMousePosition = (0, vue_exports.ref)({
			x: -999,
			y: -999
		});
		const onPointerMove = (e) => {
			const { x, y } = e;
			prevMousePosition.value = {
				x,
				y
			};
		};
		(0, vue_exports.watch)([groupInfo, show], () => {
			const { size } = groupInfo.value;
			if (size === 0 && show.value) hide();
			else if (hoverIndex.value >= size) hoverIndex.value = 0;
		});
		const onHover = (index, after) => {
			const prevHoverIndex = hoverIndex.value;
			const next = typeof index === "function" ? index(prevHoverIndex) : index;
			after?.(next);
			hoverIndex.value = next;
		};
		const scrollToIndex = (index) => {
			var _a, _b;
			const target = (_a = host.value) == null ? void 0 : _a.querySelector(`[data-index="${index}"]`);
			const scrollRoot = (_b = host.value) == null ? void 0 : _b.querySelector(".menu-groups");
			if (!target || !scrollRoot) return;
			scrollRoot.scrollTop = target.offsetTop - scrollRoot.offsetTop;
		};
		const runByIndex = (index) => {
			const item = groupInfo.value.groups.flatMap((group) => group.items).at(index);
			if (item && ctx) item.onRun(ctx);
			hide();
		};
		const onKeydown = (e) => {
			const { size, groups } = groupInfo.value;
			if (e.key === "Escape") {
				e.preventDefault();
				hide?.();
				return;
			}
			if (e.key === "ArrowDown") {
				e.preventDefault();
				return onHover((index) => index < size - 1 ? index + 1 : index, scrollToIndex);
			}
			if (e.key === "ArrowUp") {
				e.preventDefault();
				return onHover((index) => index <= 0 ? index : index - 1, scrollToIndex);
			}
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				return onHover((index) => {
					const group = groups.find((group2) => group2.range[0] <= index && group2.range[1] > index);
					if (!group) return index;
					const prevGroup = groups[groups.indexOf(group) - 1];
					if (!prevGroup) return index;
					return prevGroup.range[1] - 1;
				}, scrollToIndex);
			}
			if (e.key === "ArrowRight") {
				e.preventDefault();
				return onHover((index) => {
					const group = groups.find((group2) => group2.range[0] <= index && group2.range[1] > index);
					if (!group) return index;
					const nextGroup = groups[groups.indexOf(group) + 1];
					if (!nextGroup) return index;
					return nextGroup.range[0];
				}, scrollToIndex);
			}
			if (e.key === "Enter") {
				e.preventDefault();
				runByIndex(hoverIndex.value);
			}
		};
		const getOnPointerEnter = (index) => (e) => {
			const prevPos = prevMousePosition.value;
			if (!prevPos) return;
			const { x, y } = e;
			if (x === prevPos.x && y === prevPos.y) return;
			onHover(index);
		};
		(0, vue_exports.watchEffect)(() => {
			if (show.value) window.addEventListener("keydown", onKeydown, { capture: true });
			else window.removeEventListener("keydown", onKeydown, { capture: true });
		});
		(0, vue_exports.onUnmounted)(() => {
			window.removeEventListener("keydown", onKeydown, { capture: true });
		});
		return () => {
			return /* @__PURE__ */ (0, vue_exports.h)("div", {
				ref: host,
				onPointerdown: (e) => e.preventDefault()
			}, /* @__PURE__ */ (0, vue_exports.h)("nav", { class: "tab-group" }, /* @__PURE__ */ (0, vue_exports.h)("ul", null, groupInfo.value.groups.map((group) => /* @__PURE__ */ (0, vue_exports.h)("li", {
				key: group.key,
				onPointerdown: () => onHover(group.range[0], scrollToIndex),
				class: hoverIndex.value >= group.range[0] && hoverIndex.value < group.range[1] ? "selected" : ""
			}, group.label)))), /* @__PURE__ */ (0, vue_exports.h)("div", {
				class: "menu-groups",
				onPointermove: onPointerMove
			}, groupInfo.value.groups.map((group) => /* @__PURE__ */ (0, vue_exports.h)("div", {
				key: group.key,
				class: "menu-group"
			}, /* @__PURE__ */ (0, vue_exports.h)("h6", null, group.label), /* @__PURE__ */ (0, vue_exports.h)("ul", null, group.items.map((item) => /* @__PURE__ */ (0, vue_exports.h)("li", {
				key: item.key,
				"data-index": item.index,
				class: hoverIndex.value === item.index ? "hover" : "",
				onPointerenter: getOnPointerEnter(item.index),
				onPointerdown: () => {
					var _a, _b;
					(_b = (_a = host.value) == null ? void 0 : _a.querySelector(`[data-index="${item.index}"]`)) == null || _b.classList.add("active");
				},
				onPointerup: () => {
					var _a, _b;
					(_b = (_a = host.value) == null ? void 0 : _a.querySelector(`[data-index="${item.index}"]`)) == null || _b.classList.remove("active");
					runByIndex(item.index);
				}
			}, /* @__PURE__ */ (0, vue_exports.h)(Icon, { icon: item.icon }), /* @__PURE__ */ (0, vue_exports.h)("span", null, item.label))))))));
		};
	}
});
var __typeError$4 = (msg) => {
	throw TypeError(msg);
};
var __accessCheck$4 = (obj, member, msg) => member.has(obj) || __typeError$4("Cannot " + msg);
var __privateGet$4 = (obj, member, getter) => (__accessCheck$4(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$4 = (obj, member, value) => member.has(obj) ? __typeError$4("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$4 = (obj, member, value, setter) => (__accessCheck$4(obj, member, "write to private field"), member.set(obj, value), value);
var _content$3, _app$3, _filter, _slashProvider, _programmaticallyPos;
var menu = slashFactory("CREPE_MENU");
var menuAPI = $ctx({
	show: () => {},
	hide: () => {}
}, "menuAPICtx");
function configureMenu(ctx, config) {
	ctx.set(menu.key, { view: (view) => new MenuView(ctx, view, config) });
}
var MenuView = class {
	constructor(ctx, view, config) {
		__privateAdd$4(this, _content$3);
		__privateAdd$4(this, _app$3);
		__privateAdd$4(this, _filter);
		__privateAdd$4(this, _slashProvider);
		__privateAdd$4(this, _programmaticallyPos, null);
		this.update = (view) => {
			__privateGet$4(this, _slashProvider).update(view);
		};
		this.show = (pos) => {
			__privateSet$4(this, _programmaticallyPos, pos);
			__privateGet$4(this, _filter).value = "";
			__privateGet$4(this, _slashProvider).show();
		};
		this.hide = () => {
			__privateSet$4(this, _programmaticallyPos, null);
			__privateGet$4(this, _slashProvider).hide();
		};
		this.destroy = () => {
			__privateGet$4(this, _slashProvider).destroy();
			__privateGet$4(this, _app$3).unmount();
			__privateGet$4(this, _content$3).remove();
		};
		const content = document.createElement("div");
		content.classList.add("milkdown-slash-menu");
		const show = (0, vue_exports.ref)(false);
		const filter = (0, vue_exports.ref)("");
		__privateSet$4(this, _filter, filter);
		const hide = this.hide;
		const app = (0, vue_exports.createApp)(Menu, {
			ctx,
			config,
			show,
			filter,
			hide
		});
		__privateSet$4(this, _app$3, app);
		app.mount(content);
		__privateSet$4(this, _content$3, content);
		const self = this;
		__privateSet$4(this, _slashProvider, new SlashProvider({
			content: __privateGet$4(this, _content$3),
			debounce: 20,
			shouldShow(view2) {
				if (isInCodeBlock(view2.state.selection) || isInList(view2.state.selection)) return false;
				const currentText = this.getContent(view2, (node) => ["paragraph", "heading"].includes(node.type.name));
				if (currentText == null) return false;
				if (!isSelectionAtEndOfNode(view2.state.selection)) return false;
				const pos = __privateGet$4(self, _programmaticallyPos);
				filter.value = currentText.startsWith("/") ? currentText.slice(1) : currentText;
				if (typeof pos === "number") {
					const maxSize = view2.state.doc.nodeSize - 2;
					const validPos = Math.min(pos, maxSize);
					if (view2.state.doc.resolve(validPos).node() !== view2.state.doc.resolve(view2.state.selection.from).node()) {
						__privateSet$4(self, _programmaticallyPos, null);
						return false;
					}
					return true;
				}
				if (!currentText.startsWith("/")) return false;
				return true;
			},
			offset: 10
		}));
		__privateGet$4(this, _slashProvider).onShow = () => {
			show.value = true;
		};
		__privateGet$4(this, _slashProvider).onHide = () => {
			show.value = false;
		};
		this.update(view);
		ctx.set(menuAPI.key, {
			show: (pos) => this.show(pos),
			hide: () => this.hide()
		});
	}
};
_content$3 = /* @__PURE__ */ new WeakMap();
_app$3 = /* @__PURE__ */ new WeakMap();
_filter = /* @__PURE__ */ new WeakMap();
_slashProvider = /* @__PURE__ */ new WeakMap();
_programmaticallyPos = /* @__PURE__ */ new WeakMap();
function isSelectionAtEndOfNode(selection) {
	if (!(selection instanceof TextSelection)) return false;
	const { $head } = selection;
	const parent = $head.parent;
	return $head.parentOffset === parent.content.size;
}
var BlockHandle = (0, vue_exports.defineComponent)({
	props: {
		onAdd: {
			type: Function,
			required: true
		},
		addIcon: {
			type: String,
			required: true
		},
		handleIcon: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const addButton = (0, vue_exports.ref)();
		return () => {
			return /* @__PURE__ */ (0, vue_exports.h)(vue_exports.Fragment, null, /* @__PURE__ */ (0, vue_exports.h)("div", {
				ref: addButton,
				class: "operation-item",
				onPointerdown: (e) => {
					var _a;
					e.preventDefault();
					e.stopPropagation();
					(_a = addButton.value) == null || _a.classList.add("active");
				},
				onPointerup: (e) => {
					var _a;
					e.preventDefault();
					e.stopPropagation();
					(_a = addButton.value) == null || _a.classList.remove("active");
					props.onAdd();
				}
			}, /* @__PURE__ */ (0, vue_exports.h)(Icon, { icon: props.addIcon })), /* @__PURE__ */ (0, vue_exports.h)("div", { class: "operation-item" }, /* @__PURE__ */ (0, vue_exports.h)(Icon, { icon: props.handleIcon })));
		};
	}
});
var __typeError$3 = (msg) => {
	throw TypeError(msg);
};
var __accessCheck$3 = (obj, member, msg) => member.has(obj) || __typeError$3("Cannot " + msg);
var __privateGet$3 = (obj, member, getter) => (__accessCheck$3(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$3 = (obj, member, value) => member.has(obj) ? __typeError$3("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$3 = (obj, member, value, setter) => (__accessCheck$3(obj, member, "write to private field"), member.set(obj, value), value);
var _content$2, _provider$1, _app$2, _ctx;
var BlockHandleView = class {
	constructor(ctx, config) {
		__privateAdd$3(this, _content$2);
		__privateAdd$3(this, _provider$1);
		__privateAdd$3(this, _app$2);
		__privateAdd$3(this, _ctx);
		this.update = () => {
			__privateGet$3(this, _provider$1).update();
		};
		this.destroy = () => {
			__privateGet$3(this, _provider$1).destroy();
			__privateGet$3(this, _content$2).remove();
			__privateGet$3(this, _app$2).unmount();
		};
		this.onAdd = () => {
			const ctx = __privateGet$3(this, _ctx);
			const view = ctx.get(editorViewCtx);
			if (!view.hasFocus()) view.focus();
			const { state, dispatch } = view;
			const active = __privateGet$3(this, _provider$1).active;
			if (!active) return;
			const pos = active.$pos.pos + active.node.nodeSize;
			let tr = state.tr.insert(pos, paragraphSchema.type(ctx).create());
			tr = tr.setSelection(TextSelection.near(tr.doc.resolve(pos)));
			dispatch(tr.scrollIntoView());
			__privateGet$3(this, _provider$1).hide();
			ctx.get(menuAPI.key).show(tr.selection.from);
		};
		var _a, _b, _c;
		__privateSet$3(this, _ctx, ctx);
		const content = document.createElement("div");
		content.classList.add("milkdown-block-handle");
		const app = (0, vue_exports.createApp)(BlockHandle, {
			onAdd: this.onAdd,
			addIcon: (_a = config == null ? void 0 : config.handleAddIcon) != null ? _a : plusIcon,
			handleIcon: (_b = config == null ? void 0 : config.handleDragIcon) != null ? _b : menuIcon
		});
		app.mount(content);
		__privateSet$3(this, _app$2, app);
		__privateSet$3(this, _content$2, content);
		const blockProviderOptions = (_c = config == null ? void 0 : config.blockHandle) != null ? _c : {};
		__privateSet$3(this, _provider$1, new BlockProvider({
			ctx,
			content,
			getOffset: () => 16,
			getPlacement: ({ active, blockDom }) => {
				if (active.node.type.name === "heading") return "left";
				let totalDescendant = 0;
				active.node.descendants((node) => {
					totalDescendant += node.childCount;
				});
				const dom = active.el;
				const domRect = dom.getBoundingClientRect();
				const handleRect = blockDom.getBoundingClientRect();
				const style = window.getComputedStyle(dom);
				const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
				const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
				const height = domRect.height - paddingTop - paddingBottom;
				const handleHeight = handleRect.height;
				return totalDescendant > 2 || handleHeight < height ? "left-start" : "left";
			},
			...blockProviderOptions
		}));
		this.update();
	}
};
_content$2 = /* @__PURE__ */ new WeakMap();
_provider$1 = /* @__PURE__ */ new WeakMap();
_app$2 = /* @__PURE__ */ new WeakMap();
_ctx = /* @__PURE__ */ new WeakMap();
function configureBlockHandle(ctx, config) {
	ctx.set(blockConfig.key, { filterNodes: (pos) => {
		if (findParent((node) => [
			"table",
			"blockquote",
			"math_inline"
		].includes(node.type.name))(pos)) return false;
		return true;
	} });
	ctx.set(block.key, { view: () => new BlockHandleView(ctx, config) });
}
var blockEdit = (editor, config) => {
	editor.config(crepeFeatureConfig(CrepeFeature.BlockEdit)).config((ctx) => configureBlockHandle(ctx, config)).config((ctx) => configureMenu(ctx, config)).use(menuAPI).use(block).use(menu);
};
var codeMirror = (editor, config = {}) => {
	editor.config(crepeFeatureConfig(CrepeFeature.CodeMirror)).config((ctx) => {
		const { languages = [], theme } = config;
		const extensions = [keymap$1.of(defaultKeymap.concat(indentWithTab)), basicSetup];
		if (theme) extensions.push(theme);
		if (config.extensions) extensions.push(...config.extensions);
		ctx.update(codeBlockConfig.key, (defaultConfig) => {
			var _a;
			return {
				extensions,
				languages,
				expandIcon: config.expandIcon || chevronDownIcon,
				searchIcon: config.searchIcon || searchIcon,
				clearSearchIcon: config.clearSearchIcon || clearIcon,
				searchPlaceholder: config.searchPlaceholder || "Search language",
				copyText: config.copyText || "Copy",
				copyIcon: config.copyIcon || copyIcon,
				onCopy: config.onCopy || (() => {}),
				noResultText: config.noResultText || "No result",
				renderLanguage: config.renderLanguage || defaultConfig.renderLanguage,
				renderPreview: config.renderPreview || defaultConfig.renderPreview,
				previewToggleButton: (previewOnlyMode) => {
					var _a2, _b;
					return [((_a2 = config.previewToggleIcon) == null ? void 0 : _a2.call(config, previewOnlyMode)) || (previewOnlyMode ? editIcon : visibilityOffIcon), ((_b = config.previewToggleText) == null ? void 0 : _b.call(config, previewOnlyMode)) || (previewOnlyMode ? "Edit" : "Hide")].map((v) => v.trim()).join(" ");
				},
				previewLabel: config.previewLabel || defaultConfig.previewLabel,
				previewLoading: config.previewLoading || defaultConfig.previewLoading,
				previewOnlyByDefault: (_a = config.previewOnlyByDefault) != null ? _a : defaultConfig.previewOnlyByDefault
			};
		});
	}).use(codeBlockComponent);
};
var cursor = (editor, config) => {
	editor.config(crepeFeatureConfig(CrepeFeature.Cursor)).config((ctx) => {
		ctx.update(dropIndicatorConfig.key, () => {
			var _a, _b;
			return {
				class: "crepe-drop-cursor",
				width: (_a = config == null ? void 0 : config.width) != null ? _a : 4,
				color: (_b = config == null ? void 0 : config.color) != null ? _b : false
			};
		});
	}).use(cursor$1);
	if ((config == null ? void 0 : config.virtual) === false) return;
	const virtualCursor = createVirtualCursor();
	editor.use($prose(() => virtualCursor));
};
var imageBlock = (editor, config) => {
	editor.config(crepeFeatureConfig(CrepeFeature.ImageBlock)).config((ctx) => {
		ctx.update(inlineImageConfig.key, (value) => {
			var _a, _b, _c, _d, _e, _f;
			return {
				uploadButton: (_a = config == null ? void 0 : config.inlineUploadButton) != null ? _a : "Upload",
				imageIcon: (_b = config == null ? void 0 : config.inlineImageIcon) != null ? _b : imageIcon,
				confirmButton: (_c = config == null ? void 0 : config.inlineConfirmButton) != null ? _c : confirmIcon,
				uploadPlaceholderText: (_d = config == null ? void 0 : config.inlineUploadPlaceholderText) != null ? _d : "or paste link",
				onUpload: (_f = (_e = config == null ? void 0 : config.inlineOnUpload) != null ? _e : config == null ? void 0 : config.onUpload) != null ? _f : value.onUpload,
				proxyDomURL: config == null ? void 0 : config.proxyDomURL
			};
		});
		ctx.update(imageBlockConfig.key, (value) => {
			var _a, _b, _c, _d, _e, _f, _g, _h, _i;
			return {
				uploadButton: (_a = config == null ? void 0 : config.blockUploadButton) != null ? _a : "Upload file",
				imageIcon: (_b = config == null ? void 0 : config.blockImageIcon) != null ? _b : imageIcon,
				captionIcon: (_c = config == null ? void 0 : config.blockCaptionIcon) != null ? _c : captionIcon,
				confirmButton: (_d = config == null ? void 0 : config.blockConfirmButton) != null ? _d : "Confirm",
				captionPlaceholderText: (_e = config == null ? void 0 : config.blockCaptionPlaceholderText) != null ? _e : "Write Image Caption",
				uploadPlaceholderText: (_f = config == null ? void 0 : config.blockUploadPlaceholderText) != null ? _f : "or paste link",
				onUpload: (_h = (_g = config == null ? void 0 : config.blockOnUpload) != null ? _g : config == null ? void 0 : config.onUpload) != null ? _h : value.onUpload,
				proxyDomURL: config == null ? void 0 : config.proxyDomURL,
				onImageLoadError: (_i = config == null ? void 0 : config.onImageLoadError) != null ? _i : value.onImageLoadError
			};
		});
	}).use(imageBlockComponent).use(imageInlineComponent);
};
var blockLatexSchema = codeBlockSchema.extendSchema((prev) => {
	return (ctx) => {
		const baseSchema = prev(ctx);
		return {
			...baseSchema,
			toMarkdown: {
				match: baseSchema.toMarkdown.match,
				runner: (state, node) => {
					var _a, _b;
					if (((_a = node.attrs.language) != null ? _a : "").toLowerCase() === "latex") state.addNode("math", void 0, ((_b = node.content.firstChild) == null ? void 0 : _b.text) || "");
					else return baseSchema.toMarkdown.runner(state, node);
				}
			}
		};
	};
});
var mathInlineId = "math_inline";
var mathInlineSchema = $nodeSchema(mathInlineId, () => ({
	group: "inline",
	inline: true,
	draggable: true,
	atom: true,
	attrs: { value: { default: "" } },
	parseDOM: [{
		tag: `span[data-type="${mathInlineId}"]`,
		getAttrs: (dom) => {
			var _a;
			return { value: (_a = dom.dataset.value) != null ? _a : "" };
		}
	}],
	toDOM: (node) => {
		const code = node.attrs.value;
		const dom = document.createElement("span");
		dom.dataset.type = mathInlineId;
		dom.dataset.value = code;
		katex.render(code, dom, { throwOnError: false });
		return dom;
	},
	parseMarkdown: {
		match: (node) => node.type === "inlineMath",
		runner: (state, node, type) => {
			state.addNode(type, { value: node.value });
		}
	},
	toMarkdown: {
		match: (node) => node.type.name === mathInlineId,
		runner: (state, node) => {
			state.addNode("inlineMath", void 0, node.attrs.value);
		}
	}
}));
var toggleLatexCommand = $command("ToggleLatex", (ctx) => {
	return () => (state, dispatch) => {
		const { hasNode: hasLatex, pos: latexPos, target: latexNode } = findNodeInSelection(state, mathInlineSchema.type(ctx));
		const { selection, doc, tr } = state;
		if (!hasLatex) {
			const text = doc.textBetween(selection.from, selection.to);
			let _tr2 = tr.replaceSelectionWith(mathInlineSchema.type(ctx).create({ value: text }));
			if (dispatch) dispatch(_tr2.setSelection(NodeSelection.create(_tr2.doc, selection.from)));
			return true;
		}
		const { from, to } = selection;
		if (!latexNode || latexPos < 0) return false;
		let _tr = tr.delete(latexPos, latexPos + 1);
		const content = latexNode.attrs.value;
		_tr = _tr.insertText(content, latexPos);
		if (dispatch) dispatch(_tr.setSelection(TextSelection.create(_tr.doc, from, to + content.length - 1)));
		return true;
	};
});
var inlineLatexTooltip = tooltipFactory("INLINE_LATEX");
var LatexTooltip = (0, vue_exports.defineComponent)({
	props: {
		config: {
			type: Object,
			required: true
		},
		innerView: {
			type: Object,
			required: true
		},
		updateValue: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		const innerViewRef = (el) => {
			if (!el || !(el instanceof HTMLElement)) return;
			while (el.firstChild) el.removeChild(el.firstChild);
			if (props.innerView.value) el.appendChild(props.innerView.value.dom);
		};
		const onUpdate = (e) => {
			e.preventDefault();
			props.updateValue.value();
		};
		return () => {
			return /* @__PURE__ */ (0, vue_exports.h)("div", { class: "container" }, props.innerView && /* @__PURE__ */ (0, vue_exports.h)("div", { ref: innerViewRef }), /* @__PURE__ */ (0, vue_exports.h)("button", {
				type: "button",
				onPointerdown: onUpdate
			}, /* @__PURE__ */ (0, vue_exports.h)(Icon, { icon: props.config.inlineEditConfirm })));
		};
	}
});
var __typeError$2 = (msg) => {
	throw TypeError(msg);
};
var __accessCheck$2 = (obj, member, msg) => member.has(obj) || __typeError$2("Cannot " + msg);
var __privateGet$2 = (obj, member, getter) => (__accessCheck$2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$2 = (obj, member, value) => member.has(obj) ? __typeError$2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$2 = (obj, member, value, setter) => (__accessCheck$2(obj, member, "write to private field"), member.set(obj, value), value);
var _content$1, _provider, _dom, _innerView, _updateValue, _app$1, _onHide, _shouldShow;
var LatexInlineTooltip = class {
	constructor(ctx, view, config) {
		this.ctx = ctx;
		__privateAdd$2(this, _content$1);
		__privateAdd$2(this, _provider);
		__privateAdd$2(this, _dom);
		__privateAdd$2(this, _innerView, (0, vue_exports.shallowRef)(null));
		__privateAdd$2(this, _updateValue, (0, vue_exports.shallowRef)(() => {}));
		__privateAdd$2(this, _app$1);
		__privateAdd$2(this, _onHide, () => {
			if (__privateGet$2(this, _innerView).value) {
				__privateGet$2(this, _innerView).value.destroy();
				__privateGet$2(this, _innerView).value = null;
			}
		});
		__privateAdd$2(this, _shouldShow, (view) => {
			const shouldShow = () => {
				const { selection, schema } = view.state;
				if (selection.empty) return false;
				if (!(selection instanceof NodeSelection)) return false;
				const node = selection.node;
				if (node.type.name !== mathInlineId) return false;
				const textFrom = selection.from;
				const paragraph = schema.nodes.paragraph.create(null, schema.text(node.attrs.value));
				const innerView = new EditorView(__privateGet$2(this, _dom), { state: EditorState.create({
					doc: paragraph,
					schema: new Schema({ nodes: {
						doc: { content: "block+" },
						paragraph: {
							content: "inline*",
							group: "block",
							parseDOM: [{ tag: "p" }],
							toDOM() {
								return ["p", 0];
							}
						},
						text: { group: "inline" }
					} }),
					plugins: [keymap({
						"Mod-z": undo,
						"Mod-Z": redo,
						"Mod-y": redo,
						Enter: () => {
							__privateGet$2(this, _updateValue).value();
							return true;
						}
					})]
				}) });
				__privateGet$2(this, _innerView).value = innerView;
				__privateGet$2(this, _updateValue).value = () => {
					const { tr } = view.state;
					tr.setNodeAttribute(textFrom, "value", innerView.state.doc.textContent);
					view.dispatch(tr);
					requestAnimationFrame(() => {
						view.focus();
					});
				};
				return true;
			};
			const show = shouldShow();
			if (!show) __privateGet$2(this, _onHide).call(this);
			return show;
		});
		this.update = (view, prevState) => {
			__privateGet$2(this, _provider).update(view, prevState);
		};
		this.destroy = () => {
			__privateGet$2(this, _app$1).unmount();
			__privateGet$2(this, _provider).destroy();
			__privateGet$2(this, _content$1).remove();
		};
		const content = document.createElement("div");
		content.className = "milkdown-latex-inline-edit";
		__privateSet$2(this, _content$1, content);
		__privateSet$2(this, _app$1, (0, vue_exports.createApp)(LatexTooltip, {
			config,
			innerView: __privateGet$2(this, _innerView),
			updateValue: __privateGet$2(this, _updateValue)
		}));
		__privateGet$2(this, _app$1).mount(content);
		__privateSet$2(this, _provider, new TooltipProvider({
			debounce: 0,
			content: __privateGet$2(this, _content$1),
			shouldShow: __privateGet$2(this, _shouldShow),
			offset: 10,
			floatingUIOptions: { placement: "bottom" }
		}));
		__privateGet$2(this, _provider).update(view);
		__privateSet$2(this, _dom, document.createElement("div"));
	}
};
_content$1 = /* @__PURE__ */ new WeakMap();
_provider = /* @__PURE__ */ new WeakMap();
_dom = /* @__PURE__ */ new WeakMap();
_innerView = /* @__PURE__ */ new WeakMap();
_updateValue = /* @__PURE__ */ new WeakMap();
_app$1 = /* @__PURE__ */ new WeakMap();
_onHide = /* @__PURE__ */ new WeakMap();
_shouldShow = /* @__PURE__ */ new WeakMap();
var mathInlineInputRule = $inputRule((ctx) => nodeRule(/(?:\$)([^$]+)(?:\$)$/, mathInlineSchema.type(ctx), { getAttr: (match) => {
	var _a;
	return { value: (_a = match[1]) != null ? _a : "" };
} }));
var mathBlockInputRule = $inputRule((ctx) => textblockTypeInputRule(/^\$\$[\s\n]$/, codeBlockSchema.type(ctx), () => ({ language: "LaTeX" })));
var remarkMathPlugin = $remark("remarkMath", () => remarkMath);
function visitMathBlock(ast) {
	return visit(ast, "math", (node, index, parent) => {
		const { value } = node;
		const newNode = {
			type: "code",
			lang: "LaTeX",
			value
		};
		parent.children.splice(index, 1, newNode);
	});
}
var remarkMathBlockPlugin = $remark("remarkMathBlock", () => () => visitMathBlock);
var latex = (editor, config) => {
	editor.config(crepeFeatureConfig(CrepeFeature.Latex)).config((ctx) => {
		if (!useCrepeFeatures(ctx).get().includes(CrepeFeature.CodeMirror)) throw new Error("You need to enable CodeMirror to use LaTeX feature");
		ctx.update(codeBlockConfig.key, (prev) => ({
			...prev,
			renderPreview: (language, content, applyPreview) => {
				if (language.toLowerCase() === "latex" && content.length > 0) return renderLatex(content, config == null ? void 0 : config.katexOptions);
				const renderPreview = prev.renderPreview;
				return renderPreview(language, content, applyPreview);
			}
		}));
		ctx.set(inlineLatexTooltip.key, { view: (view) => {
			var _a;
			return new LatexInlineTooltip(ctx, view, {
				inlineEditConfirm: (_a = config == null ? void 0 : config.inlineEditConfirm) != null ? _a : confirmIcon,
				...config
			});
		} });
	}).use(remarkMathPlugin).use(remarkMathBlockPlugin).use(mathInlineSchema).use(inlineLatexTooltip).use(mathInlineInputRule).use(mathBlockInputRule).use(blockLatexSchema).use(toggleLatexCommand);
};
function renderLatex(content, options) {
	return katex.renderToString(content, {
		...options,
		throwOnError: false,
		displayMode: true
	});
}
var linkTooltip = (editor, config) => {
	editor.config(crepeFeatureConfig(CrepeFeature.LinkTooltip)).config(configureLinkTooltip).config((ctx) => {
		ctx.update(linkTooltipConfig.key, (prev) => {
			var _a, _b, _c, _d, _e, _f;
			return {
				...prev,
				linkIcon: (_a = config == null ? void 0 : config.linkIcon) != null ? _a : copyIcon,
				editButton: (_b = config == null ? void 0 : config.editButton) != null ? _b : editIcon,
				removeButton: (_c = config == null ? void 0 : config.removeButton) != null ? _c : removeIcon,
				confirmButton: (_d = config == null ? void 0 : config.confirmButton) != null ? _d : confirmIcon,
				inputPlaceholder: (_e = config == null ? void 0 : config.inputPlaceholder) != null ? _e : "Paste link...",
				onCopyLink: (_f = config == null ? void 0 : config.onCopyLink) != null ? _f : (() => {})
			};
		});
	}).use(linkTooltipPlugin);
};
function configureListItem(ctx, config) {
	ctx.set(listItemBlockConfig.key, { renderLabel: ({ label, listType, checked }) => {
		var _a, _b, _c;
		if (checked == null) {
			if (listType === "bullet") return (_a = config == null ? void 0 : config.bulletIcon) != null ? _a : bulletIcon;
			return label;
		}
		if (checked) return (_b = config == null ? void 0 : config.checkBoxCheckedIcon) != null ? _b : checkBoxCheckedIcon;
		return (_c = config == null ? void 0 : config.checkBoxUncheckedIcon) != null ? _c : checkBoxUncheckedIcon;
	} });
}
var listItem = (editor, config) => {
	editor.config(crepeFeatureConfig(CrepeFeature.ListItem)).config((ctx) => configureListItem(ctx, config)).use(listItemBlockComponent);
};
function isDocEmpty(doc) {
	var _a;
	return doc.childCount <= 1 && !((_a = doc.firstChild) == null ? void 0 : _a.content.size);
}
function createPlaceholderDecoration(state, placeholderText) {
	const { selection } = state;
	if (!selection.empty) return null;
	const $pos = selection.$anchor;
	const node = $pos.parent;
	if (node.content.size > 0) return null;
	if (findParent((node2) => node2.type.name === "table")($pos)) return null;
	const before = $pos.before();
	return Decoration.node(before, before + node.nodeSize, {
		class: "crepe-placeholder",
		"data-placeholder": placeholderText
	});
}
var placeholderConfig = $ctx({
	text: "Please enter...",
	mode: "block"
}, "placeholderConfigCtx");
var placeholderPlugin = $prose((ctx) => {
	return new Plugin({
		key: new PluginKey("CREPE_PLACEHOLDER"),
		props: { decorations: (state) => {
			var _a;
			if (useCrepe(ctx).readonly) return null;
			const config = ctx.get(placeholderConfig.key);
			if (config.mode === "doc" && !isDocEmpty(state.doc)) return null;
			if (isInCodeBlock(state.selection) || isInList(state.selection)) return null;
			const deco = createPlaceholderDecoration(state, (_a = config.text) != null ? _a : "Please enter...");
			if (!deco) return null;
			return DecorationSet.create(state.doc, [deco]);
		} }
	});
});
var placeholder = (editor, config) => {
	editor.config(crepeFeatureConfig(CrepeFeature.Placeholder)).config((ctx) => {
		if (config) ctx.update(placeholderConfig.key, (prev) => {
			return {
				...prev,
				...config
			};
		});
	}).use(placeholderPlugin).use(placeholderConfig);
};
var table = (editor, config) => {
	editor.config(crepeFeatureConfig(CrepeFeature.Table)).config((ctx) => {
		ctx.update(tableBlockConfig.key, (defaultConfig) => ({
			...defaultConfig,
			renderButton: (renderType) => {
				var _a, _b, _c, _d, _e, _f, _g, _h, _i;
				switch (renderType) {
					case "add_row": return (_a = config == null ? void 0 : config.addRowIcon) != null ? _a : plusIcon;
					case "add_col": return (_b = config == null ? void 0 : config.addColIcon) != null ? _b : plusIcon;
					case "delete_row": return (_c = config == null ? void 0 : config.deleteRowIcon) != null ? _c : removeIcon;
					case "delete_col": return (_d = config == null ? void 0 : config.deleteColIcon) != null ? _d : removeIcon;
					case "align_col_left": return (_e = config == null ? void 0 : config.alignLeftIcon) != null ? _e : alignLeftIcon;
					case "align_col_center": return (_f = config == null ? void 0 : config.alignCenterIcon) != null ? _f : alignCenterIcon;
					case "align_col_right": return (_g = config == null ? void 0 : config.alignRightIcon) != null ? _g : alignRightIcon;
					case "col_drag_handle": return (_h = config == null ? void 0 : config.colDragHandleIcon) != null ? _h : dragHandleIcon;
					case "row_drag_handle": return (_i = config == null ? void 0 : config.rowDragHandleIcon) != null ? _i : dragHandleIcon;
				}
			}
		}));
	}).use(tableBlock);
};
function getGroups(config, ctx) {
	var _a, _b, _c, _d, _e, _f, _g;
	const groupBuilder = new GroupBuilder();
	groupBuilder.addGroup("formatting", "Formatting").addItem("bold", {
		icon: (_a = config == null ? void 0 : config.boldIcon) != null ? _a : boldIcon,
		active: (ctx2) => {
			return ctx2.get(commandsCtx).call(isMarkSelectedCommand.key, strongSchema.type(ctx2));
		},
		onRun: (ctx2) => {
			ctx2.get(commandsCtx).call(toggleStrongCommand.key);
		}
	}).addItem("italic", {
		icon: (_b = config == null ? void 0 : config.italicIcon) != null ? _b : italicIcon,
		active: (ctx2) => {
			return ctx2.get(commandsCtx).call(isMarkSelectedCommand.key, emphasisSchema.type(ctx2));
		},
		onRun: (ctx2) => {
			ctx2.get(commandsCtx).call(toggleEmphasisCommand.key);
		}
	}).addItem("strikethrough", {
		icon: (_c = config == null ? void 0 : config.strikethroughIcon) != null ? _c : strikethroughIcon,
		active: (ctx2) => {
			return ctx2.get(commandsCtx).call(isMarkSelectedCommand.key, strikethroughSchema.type(ctx2));
		},
		onRun: (ctx2) => {
			ctx2.get(commandsCtx).call(toggleStrikethroughCommand.key);
		}
	});
	const functionGroup = groupBuilder.addGroup("function", "Function");
	functionGroup.addItem("code", {
		icon: (_d = config == null ? void 0 : config.codeIcon) != null ? _d : codeIcon,
		active: (ctx2) => {
			return ctx2.get(commandsCtx).call(isMarkSelectedCommand.key, inlineCodeSchema.type(ctx2));
		},
		onRun: (ctx2) => {
			ctx2.get(commandsCtx).call(toggleInlineCodeCommand.key);
		}
	});
	const flags = ctx && useCrepeFeatures(ctx).get();
	if (flags == null ? void 0 : flags.includes(CrepeFeature.Latex)) functionGroup.addItem("latex", {
		icon: (_e = config == null ? void 0 : config.latexIcon) != null ? _e : functionsIcon,
		active: (ctx2) => {
			return ctx2.get(commandsCtx).call(isNodeSelectedCommand.key, mathInlineSchema.type(ctx2));
		},
		onRun: (ctx2) => {
			ctx2.get(commandsCtx).call(toggleLatexCommand.key);
		}
	});
	functionGroup.addItem("link", {
		icon: (_f = config == null ? void 0 : config.linkIcon) != null ? _f : linkIcon,
		active: (ctx2) => {
			return ctx2.get(commandsCtx).call(isMarkSelectedCommand.key, linkSchema.type(ctx2));
		},
		onRun: (ctx2) => {
			ctx2.get(commandsCtx).call(toggleLinkCommand.key);
		}
	});
	(_g = config == null ? void 0 : config.buildToolbar) == null || _g.call(config, groupBuilder);
	return groupBuilder.build();
}
var Toolbar = (0, vue_exports.defineComponent)({
	props: {
		ctx: {
			type: Object,
			required: true
		},
		hide: {
			type: Function,
			required: true
		},
		show: {
			type: Object,
			required: true
		},
		selection: {
			type: Object,
			required: true
		},
		config: {
			type: Object,
			required: false
		}
	},
	setup(props) {
		const { ctx, config } = props;
		const onClick = (fn) => (e) => {
			e.preventDefault();
			ctx && fn(ctx);
		};
		function checkActive(checker) {
			props.selection.value;
			if (ctx.get(editorCtx).status !== EditorStatus.Created) return false;
			return checker(ctx);
		}
		const groupInfo = (0, vue_exports.computed)(() => getGroups(config, ctx));
		return () => {
			return /* @__PURE__ */ (0, vue_exports.h)(vue_exports.Fragment, null, groupInfo.value.map((group) => {
				return group.items.map((item) => {
					return /* @__PURE__ */ (0, vue_exports.h)("button", {
						type: "button",
						class: clsx("toolbar-item", ctx && checkActive(item.active) && "active"),
						onPointerdown: onClick(item.onRun)
					}, /* @__PURE__ */ (0, vue_exports.h)(Icon, { icon: item.icon }));
				});
			}).reduce((acc, curr, index) => {
				if (index === 0) acc.push(...curr);
				else acc.push(/* @__PURE__ */ (0, vue_exports.h)("div", { class: "divider" }), ...curr);
				return acc;
			}, []));
		};
	}
});
var __typeError$1 = (msg) => {
	throw TypeError(msg);
};
var __accessCheck$1 = (obj, member, msg) => member.has(obj) || __typeError$1("Cannot " + msg);
var __privateGet$1 = (obj, member, getter) => (__accessCheck$1(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$1 = (obj, member, value) => member.has(obj) ? __typeError$1("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$1 = (obj, member, value, setter) => (__accessCheck$1(obj, member, "write to private field"), member.set(obj, value), value);
var _tooltipProvider, _content, _app, _selection, _show;
var toolbarTooltip = tooltipFactory("CREPE_TOOLBAR");
var ToolbarView = class {
	constructor(ctx, view, config) {
		__privateAdd$1(this, _tooltipProvider);
		__privateAdd$1(this, _content);
		__privateAdd$1(this, _app);
		__privateAdd$1(this, _selection);
		__privateAdd$1(this, _show, (0, vue_exports.ref)(false));
		this.update = (view, prevState) => {
			__privateGet$1(this, _tooltipProvider).update(view, prevState);
			__privateGet$1(this, _selection).value = view.state.selection;
		};
		this.destroy = () => {
			__privateGet$1(this, _tooltipProvider).destroy();
			__privateGet$1(this, _app).unmount();
			__privateGet$1(this, _content).remove();
		};
		this.hide = () => {
			__privateGet$1(this, _tooltipProvider).hide();
		};
		const content = document.createElement("div");
		content.className = "milkdown-toolbar";
		__privateSet$1(this, _selection, (0, vue_exports.shallowRef)(view.state.selection));
		const app = (0, vue_exports.createApp)(Toolbar, {
			ctx,
			hide: this.hide,
			config,
			selection: __privateGet$1(this, _selection),
			show: __privateGet$1(this, _show)
		});
		app.mount(content);
		__privateSet$1(this, _content, content);
		__privateSet$1(this, _app, app);
		__privateSet$1(this, _tooltipProvider, new TooltipProvider({
			content: __privateGet$1(this, _content),
			debounce: 20,
			offset: 10,
			shouldShow(view2) {
				const { doc, selection } = view2.state;
				const { empty, from, to } = selection;
				const isEmptyTextBlock = !doc.textBetween(from, to).length && selection instanceof TextSelection;
				const isNotTextBlock = !(selection instanceof TextSelection);
				const activeElement = view2.dom.getRootNode().activeElement;
				const isTooltipChildren = content.contains(activeElement);
				const notHasFocus = !view2.hasFocus() && !isTooltipChildren;
				const isReadonly = !view2.editable;
				if (notHasFocus || isNotTextBlock || empty || isEmptyTextBlock || isReadonly) return false;
				return true;
			}
		}));
		__privateGet$1(this, _tooltipProvider).onShow = () => {
			__privateGet$1(this, _show).value = true;
		};
		__privateGet$1(this, _tooltipProvider).onHide = () => {
			__privateGet$1(this, _show).value = false;
		};
		this.update(view);
	}
};
_tooltipProvider = /* @__PURE__ */ new WeakMap();
_content = /* @__PURE__ */ new WeakMap();
_app = /* @__PURE__ */ new WeakMap();
_selection = /* @__PURE__ */ new WeakMap();
_show = /* @__PURE__ */ new WeakMap();
var toolbar = (editor, config) => {
	editor.config(crepeFeatureConfig(CrepeFeature.Toolbar)).config((ctx) => {
		ctx.set(toolbarTooltip.key, { view: (view) => new ToolbarView(ctx, view, config) });
	}).use(toolbarTooltip);
};
function loadFeature(feature, editor, config) {
	switch (feature) {
		case CrepeFeature.CodeMirror: return codeMirror(editor, config);
		case CrepeFeature.ListItem: return listItem(editor, config);
		case CrepeFeature.LinkTooltip: return linkTooltip(editor, config);
		case CrepeFeature.ImageBlock: return imageBlock(editor, config);
		case CrepeFeature.Cursor: return cursor(editor, config);
		case CrepeFeature.BlockEdit: return blockEdit(editor, config);
		case CrepeFeature.Placeholder: return placeholder(editor, config);
		case CrepeFeature.Toolbar: return toolbar(editor, config);
		case CrepeFeature.Table: return table(editor, config);
		case CrepeFeature.Latex: return latex(editor, config);
	}
}
var __typeError = (msg) => {
	throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var _editor, _rootElement, _editable;
var CrepeBuilder = class {
	constructor({ root, defaultValue = "" } = {}) {
		__privateAdd(this, _editor);
		__privateAdd(this, _rootElement);
		__privateAdd(this, _editable, true);
		this.addFeature = (feature, config) => {
			feature(__privateGet(this, _editor), config);
			return this;
		};
		this.create = () => {
			return __privateGet(this, _editor).create();
		};
		this.destroy = () => {
			return __privateGet(this, _editor).destroy();
		};
		this.setReadonly = (value) => {
			__privateSet(this, _editable, !value);
			__privateGet(this, _editor).action((ctx) => {
				if (__privateGet(this, _editor).status === EditorStatus.Created) ctx.get(editorViewCtx).setProps({ editable: () => !value });
			});
			return this;
		};
		this.getMarkdown = () => {
			return __privateGet(this, _editor).action(getMarkdown());
		};
		this.on = (fn) => {
			if (__privateGet(this, _editor).status !== EditorStatus.Created) {
				__privateGet(this, _editor).config((ctx) => {
					fn(ctx.get(listenerCtx));
				});
				return this;
			}
			__privateGet(this, _editor).action((ctx) => {
				fn(ctx.get(listenerCtx));
			});
			return this;
		};
		var _a;
		__privateSet(this, _rootElement, (_a = typeof root === "string" ? document.querySelector(root) : root) != null ? _a : document.body);
		__privateSet(this, _editor, Editor.make().config((ctx) => {
			ctx.inject(CrepeCtx, this);
			ctx.inject(FeaturesCtx, []);
		}).config((ctx) => {
			ctx.set(rootCtx, __privateGet(this, _rootElement));
			ctx.set(defaultValueCtx, defaultValue);
			ctx.set(editorViewOptionsCtx, { editable: () => __privateGet(this, _editable) });
			ctx.update(indentConfig.key, (value) => ({
				...value,
				size: 4
			}));
		}).use(commonmark).use(listener).use(history).use(indent).use(trailing).use(clipboard).use(gfm));
	}
	get editor() {
		return __privateGet(this, _editor);
	}
	get readonly() {
		return !__privateGet(this, _editable);
	}
};
_editor = /* @__PURE__ */ new WeakMap();
_rootElement = /* @__PURE__ */ new WeakMap();
_editable = /* @__PURE__ */ new WeakMap();
var Crepe = class extends CrepeBuilder {
	constructor({ features = {}, featureConfigs = {}, ...crepeBuilderConfig } = {}) {
		super(crepeBuilderConfig);
		const finalConfigs = defaultsDeep(featureConfigs, defaultConfig);
		Object.entries({
			...defaultFeatures,
			...features
		}).filter(([, enabled]) => enabled).map(([feature]) => feature).forEach((feature) => {
			const config = finalConfigs[feature];
			loadFeature(feature, this.editor, config);
		});
	}
};
Crepe.Feature = CrepeFeature;
//#endregion
export { useCrepeFeatures as a, useCrepe as i, CrepeBuilder as n, CrepeFeature as r, Crepe as t };

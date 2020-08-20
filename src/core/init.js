// Initialize a jQuery object
import jQuery from "../core.js";
//window.document
import document from "../var/document.js";
import rsingleTag from "./var/rsingleTag.js";

import "../traversing/findFilter.js";

// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	//匹配<>标签or #...
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	/**
	 * 用法：
	 * jQuery(html,ownerDocument)用所提供的html代码创建DOM元素，对于jQuery(html,ownerDocument)，参数html可以是单标签或者是多层标签之间的嵌套。第二个参数用于创建新DOM元素的文档对象，如果不传入则默认为当前的文档对象。
	 * jQuery(selector,context)简要的说是：接收一个css选择器表达式(selector)和可选的选择器上下文(context),返回一个包含了匹配的DOM元素的jQuery对象。
	 * jQuery(object)如果传入的是一个object对象，则把该对象封装到jQuery对象中并返回。
	 * jQuery(callback)当传进去的参数是函数的时候，则在document对象上绑定一个ready事件监听函数，当DOM结构加载完成的时候执行
	 * jQuery(jQueryObject)当传进去的参数是一个jQuery对象的时候，则创建该jQuery对象的一个副本并返回。副本与传入的jQuery对象引用完全相同的元素
	 * jQuery()如果不传入任何的参数，则返回一个空的jQuery对象，属性length为0
	 * 实现：
	 * -- 先匹配字符串传入的
	 * 1. 先匹配标签类的，多标签(使用innerHTML)，单标签(createElement，再使用jQuery.prototype的func加属性)，对应处理
	 * 2. 匹配#id（getElementById）
	 * 3. 匹配css选择器
	 * -- 如果传入的是dom直接转化未jquery对象 {index: dom, length: n}
	 * -- $(function(){}) 保证dom挂载，
	 */////////
	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {

			// 单标签的情况
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {

				// 多标签和id的情况，把id处理提取到外部；jquerythis.find里id处理
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			// match只能匹配到html标签与#id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					// new init(),so this is a return of new init()实例化，这里处理的是元素作为参数的 in src/core/parseHTML.js
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					// 这里就是新建的标签元素
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							// 使用jquery原型方法自动赋值，如果原型方法存在
							if ( typeof this[ match ] === "function" ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {

								// in src/attributes/attr.js
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			// context不存在或者其的jquery版本号存在即是jquery对象
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		//////// nodeType属性可以判断是不是dom元素
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		// func时间ready处理
		} else if ( typeof selector === "function" ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		// 是jquery对象or普通对象转换成jquery对象
		//////// [].push.call((arr = {0: 'a', length: 1}), 'b'),arr的length自动累加
		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
// 实例化是new init()，它就有jQuery的实例方法
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );

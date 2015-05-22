(function($, undefined) {
    var uuid = 0,
    runiqueId = /^ui-id-\d+$/;
    $.ui = $.ui || {};
    if ($.ui.version) {
        return
    }
    $.extend($.ui, {
        version: "1.10.0",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    $.fn.extend({
        _focus: $.fn.focus,
        focus: function(delay, fn) {
            return typeof delay === "number" ? this.each(function() {
                var elem = this;
                setTimeout(function() {
                    $(elem).focus();
                    if (fn) {
                        fn.call(elem)
                    }
                },
                delay)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var scrollParent;
            if (($.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                scrollParent = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test($.css(this, "position")) && (/(auto|scroll)/).test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"))
                }).eq(0)
            } else {
                scrollParent = this.parents().filter(function() {
                    return (/(auto|scroll)/).test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent
        },
        zIndex: function(zIndex) {
            if (zIndex !== undefined) {
                return this.css("zIndex", zIndex)
            }
            if (this.length) {
                var elem = $(this[0]),
                position,
                value;
                while (elem.length && elem[0] !== document) {
                    position = elem.css("position");
                    if (position === "absolute" || position === "relative" || position === "fixed") {
                        value = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(value) && value !== 0) {
                            return value
                        }
                    }
                    elem = elem.parent()
                }
            }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                if (!this.id) {
                    this.id = "ui-id-" + (++uuid)
                }
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                if (runiqueId.test(this.id)) {
                    $(this).removeAttr("id")
                }
            })
        }
    });
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !! img && visible(img)
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled: "a" === nodeName ? element.href || isTabIndexNotNaN: isTabIndexNotNaN) && visible(element)
    }
    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
            return $.css(this, "visibility") === "hidden"
        }).length
    }
    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !! $.data(elem, dataName)
            }
        }) : function(elem, i, match) {
            return !! $.data(elem, match[3])
        },
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")))
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex"),
            isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
        }
    });
    if (!$("<a>").outerWidth(1).jquery) {
        $.each(["Width", "Height"],
        function(i, name) {
            var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
            type = name.toLowerCase(),
            orig = {
                innerWidth: $.fn.innerWidth,
                innerHeight: $.fn.innerHeight,
                outerWidth: $.fn.outerWidth,
                outerHeight: $.fn.outerHeight
            };
            function reduce(elem, size, border, margin) {
                $.each(side,
                function() {
                    size -= parseFloat($.css(elem, "padding" + this)) || 0;
                    if (border) {
                        size -= parseFloat($.css(elem, "border" + this + "Width")) || 0
                    }
                    if (margin) {
                        size -= parseFloat($.css(elem, "margin" + this)) || 0
                    }
                });
                return size
            }
            $.fn["inner" + name] = function(size) {
                if (size === undefined) {
                    return orig["inner" + name].call(this)
                }
                return this.each(function() {
                    $(this).css(type, reduce(this, size) + "px")
                })
            };
            $.fn["outer" + name] = function(size, margin) {
                if (typeof size !== "number") {
                    return orig["outer" + name].call(this, size)
                }
                return this.each(function() {
                    $(this).css(type, reduce(this, size, true, margin) + "px")
                })
            }
        })
    }
    if (!$.fn.addBack) {
        $.fn.addBack = function(selector) {
            return this.add(selector == null ? this.prevObject: this.prevObject.filter(selector))
        }
    }
    if ($("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        $.fn.removeData = (function(removeData) {
            return function(key) {
                if (arguments.length) {
                    return removeData.call(this, $.camelCase(key))
                } else {
                    return removeData.call(this)
                }
            }
        })($.fn.removeData)
    }
    $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    $.support.selectstart = "onselectstart" in document.createElement("div");
    $.fn.extend({
        disableSelection: function() {
            return this.bind(($.support.selectstart ? "selectstart": "mousedown") + ".ui-disableSelection",
            function(event) {
                event.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    });
    $.extend($.ui, {
        plugin: {
            add: function(module, option, set) {
                var i, proto = $.ui[module].prototype;
                for (i in set) {
                    proto.plugins[i] = proto.plugins[i] || [];
                    proto.plugins[i].push([option, set[i]])
                }
            },
            call: function(instance, name, args) {
                var i, set = instance.plugins[name];
                if (!set || !instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11) {
                    return
                }
                for (i = 0; i < set.length; i++) {
                    if (instance.options[set[i][0]]) {
                        set[i][1].apply(instance.element, args)
                    }
                }
            }
        },
        hasScroll: function(el, a) {
            if ($(el).css("overflow") === "hidden") {
                return false
            }
            var scroll = (a && a === "left") ? "scrollLeft": "scrollTop",
            has = false;
            if (el[scroll] > 0) {
                return true
            }
            el[scroll] = 1;
            has = (el[scroll] > 0);
            el[scroll] = 0;
            return has
        }
    })
})(jQuery); (function($, undefined) {
    var uuid = 0,
    slice = Array.prototype.slice,
    _cleanData = $.cleanData;
    $.cleanData = function(elems) {
        for (var i = 0,
        elem; (elem = elems[i]) != null; i++) {
            try {
                $(elem).triggerHandler("remove")
            } catch(e) {}
        }
        _cleanData(elems)
    };
    $.widget = function(name, base, prototype) {
        var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {},
        namespace = name.split(".")[0];
        name = name.split(".")[1];
        fullName = namespace + "-" + name;
        if (!prototype) {
            prototype = base;
            base = $.Widget
        }
        $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !! $.data(elem, fullName)
        };
        $[namespace] = $[namespace] || {};
        existingConstructor = $[namespace][name];
        constructor = $[namespace][name] = function(options, element) {
            if (!this._createWidget) {
                return new constructor(options, element)
            }
            if (arguments.length) {
                this._createWidget(options, element)
            }
        };
        $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({},
            prototype),
            _childConstructors: []
        });
        basePrototype = new base();
        basePrototype.options = $.widget.extend({},
        basePrototype.options);
        $.each(prototype,
        function(prop, value) {
            if (!$.isFunction(value)) {
                proxiedPrototype[prop] = value;
                return
            }
            proxiedPrototype[prop] = (function() {
                var _super = function() {
                    return base.prototype[prop].apply(this, arguments)
                },
                _superApply = function(args) {
                    return base.prototype[prop].apply(this, args)
                };
                return function() {
                    var __super = this._super,
                    __superApply = this._superApply,
                    returnValue;
                    this._super = _super;
                    this._superApply = _superApply;
                    returnValue = value.apply(this, arguments);
                    this._super = __super;
                    this._superApply = __superApply;
                    return returnValue
                }
            })()
        });
        constructor.prototype = $.widget.extend(basePrototype, {
            widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix: name
        },
        proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        });
        if (existingConstructor) {
            $.each(existingConstructor._childConstructors,
            function(i, child) {
                var childPrototype = child.prototype;
                $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto)
            });
            delete existingConstructor._childConstructors
        } else {
            base._childConstructors.push(constructor)
        }
        $.widget.bridge(name, constructor)
    };
    $.widget.extend = function(target) {
        var input = slice.call(arguments, 1),
        inputIndex = 0,
        inputLength = input.length,
        key,
        value;
        for (; inputIndex < inputLength; inputIndex++) {
            for (key in input[inputIndex]) {
                value = input[inputIndex][key];
                if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
                    if ($.isPlainObject(value)) {
                        target[key] = $.isPlainObject(target[key]) ? $.widget.extend({},
                        target[key], value) : $.widget.extend({},
                        value)
                    } else {
                        target[key] = value
                    }
                }
            }
        }
        return target
    };
    $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function(options) {
            var isMethodCall = typeof options === "string",
            args = slice.call(arguments, 1),
            returnValue = this;
            options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options;
            if (isMethodCall) {
                this.each(function() {
                    var methodValue, instance = $.data(this, fullName);
                    if (!instance) {
                        return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'")
                    }
                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        return $.error("no such method '" + options + "' for " + name + " widget instance")
                    }
                    methodValue = instance[options].apply(instance, args);
                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
                        return false
                    }
                })
            } else {
                this.each(function() {
                    var instance = $.data(this, fullName);
                    if (instance) {
                        instance.option(options || {})._init()
                    } else {
                        $.data(this, fullName, new object(options, this))
                    }
                })
            }
            return returnValue
        }
    };
    $.Widget = function() {};
    $.Widget._childConstructors = [];
    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0];
            this.element = $(element);
            this.uuid = uuid++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = $.widget.extend({},
            this.options, this._getCreateOptions(), options);
            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();
            if (element !== this) {
                $.data(element, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function(event) {
                        if (event.target === element) {
                            this.destroy()
                        }
                    }
                });
                this.document = $(element.style ? element.ownerDocument: element.document || element);
                this.window = $(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: $.noop,
        widget: function() {
            return this.element
        },
        option: function(key, value) {
            var options = key,
            parts, curOption, i;
            if (arguments.length === 0) {
                return $.widget.extend({},
                this.options)
            }
            if (typeof key === "string") {
                options = {};
                parts = key.split(".");
                key = parts.shift();
                if (parts.length) {
                    curOption = options[key] = $.widget.extend({},
                    this.options[key]);
                    for (i = 0; i < parts.length - 1; i++) {
                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]]
                    }
                    key = parts.pop();
                    if (value === undefined) {
                        return curOption[key] === undefined ? null: curOption[key]
                    }
                    curOption[key] = value
                } else {
                    if (value === undefined) {
                        return this.options[key] === undefined ? null: this.options[key]
                    }
                    options[key] = value
                }
            }
            this._setOptions(options);
            return this
        },
        _setOptions: function(options) {
            var key;
            for (key in options) {
                this._setOption(key, options[key])
            }
            return this
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            if (key === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!value).attr("aria-disabled", value);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus")
            }
            return this
        },
        enable: function() {
            return this._setOption("disabled", false)
        },
        disable: function() {
            return this._setOption("disabled", true)
        },
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
            if (typeof suppressDisabledCheck !== "boolean") {
                handlers = element;
                element = suppressDisabledCheck;
                suppressDisabledCheck = false
            }
            if (!handlers) {
                handlers = element;
                element = this.element;
                delegateElement = this.widget()
            } else {
                element = delegateElement = $(element);
                this.bindings = this.bindings.add(element)
            }
            $.each(handlers,
            function(event, handler) {
                function handlerProxy() {
                    if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
                        return
                    }
                    return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments)
                }
                if (typeof handler !== "string") {
                    handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++
                }
                var match = event.match(/^(\w+)\s*(.*)$/),
                eventName = match[1] + instance.eventNamespace,
                selector = match[2];
                if (selector) {
                    delegateElement.delegate(selector, eventName, handlerProxy)
                } else {
                    element.bind(eventName, handlerProxy)
                }
            })
        },
        _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            element.unbind(eventName).undelegate(eventName)
        },
        _delay: function(handler, delay) {
            function handlerProxy() {
                return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments)
            }
            var instance = this;
            return setTimeout(handlerProxy, delay || 0)
        },
        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element);
            this._on(element, {
                mouseenter: function(event) {
                    $(event.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(event) {
                    $(event.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(element) {
            this.focusable = this.focusable.add(element);
            this._on(element, {
                focusin: function(event) {
                    $(event.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(type, event, data) {
            var prop, orig, callback = this.options[type];
            data = data || {};
            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ? type: this.widgetEventPrefix + type).toLowerCase();
            event.target = this.element[0];
            orig = event.originalEvent;
            if (orig) {
                for (prop in orig) {
                    if (! (prop in event)) {
                        event[prop] = orig[prop]
                    }
                }
            }
            this.element.trigger(event, data);
            return ! ($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented())
        }
    };
    $.each({
        show: "fadeIn",
        hide: "fadeOut"
    },
    function(method, defaultEffect) {
        $.Widget.prototype["_" + method] = function(element, options, callback) {
            if (typeof options === "string") {
                options = {
                    effect: options
                }
            }
            var hasOptions, effectName = !options ? method: options === true || typeof options === "number" ? defaultEffect: options.effect || defaultEffect;
            options = options || {};
            if (typeof options === "number") {
                options = {
                    duration: options
                }
            }
            hasOptions = !$.isEmptyObject(options);
            options.complete = callback;
            if (options.delay) {
                element.delay(options.delay)
            }
            if (hasOptions && $.effects && $.effects.effect[effectName]) {
                element[method](options)
            } else if (effectName !== method && element[effectName]) {
                element[effectName](options.duration, options.easing, callback)
            } else {
                element.queue(function(next) {
                    $(this)[method]();
                    if (callback) {
                        callback.call(element[0])
                    }
                    next()
                })
            }
        }
    })
})(jQuery); (function($, undefined) {
    var mouseHandled = false;
    $(document).mouseup(function() {
        mouseHandled = false
    });
    $.widget("ui.mouse", {
        version: "1.10.0",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var that = this;
            this.element.bind("mousedown." + this.widgetName,
            function(event) {
                return that._mouseDown(event)
            }).bind("click." + this.widgetName,
            function(event) {
                if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
                    $.removeData(event.target, that.widgetName + ".preventClickEvent");
                    event.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            }
        },
        _mouseDown: function(event) {
            if (mouseHandled) {
                return
            } (this._mouseStarted && this._mouseUp(event));
            this._mouseDownEvent = event;
            var that = this,
            btnIsLeft = (event.which === 1),
            elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length: false);
            if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    that.mouseDelayMet = true
                },
                this.options.delay)
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(event) !== false);
                if (!this._mouseStarted) {
                    event.preventDefault();
                    return true
                }
            }
            if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
                $.removeData(event.target, this.widgetName + ".preventClickEvent")
            }
            this._mouseMoveDelegate = function(event) {
                return that._mouseMove(event)
            };
            this._mouseUpDelegate = function(event) {
                return that._mouseUp(event)
            };
            $(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            event.preventDefault();
            mouseHandled = true;
            return true
        },
        _mouseMove: function(event) {
            if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
                return this._mouseUp(event)
            }
            if (this._mouseStarted) {
                this._mouseDrag(event);
                return event.preventDefault()
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, event) !== false); (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event))
            }
            return ! this._mouseStarted
        },
        _mouseUp: function(event) {
            $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (event.target === this._mouseDownEvent.target) {
                    $.data(event.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(event)
            }
            return false
        },
        _mouseDistanceMet: function(event) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true
        }
    })
})(jQuery); (jQuery.effects || (function($, undefined) {
    var dataSpace = "ui-effects-";
    $.effects = {
        effect: {}
    }; (function(jQuery, undefined) {
        var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
        stringParsers = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(execResult) {
                return [execResult[1], execResult[2], execResult[3], execResult[4]]
            }
        },
        {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(execResult) {
                return [execResult[1] * 2.55, execResult[2] * 2.55, execResult[3] * 2.55, execResult[4]]
            }
        },
        {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(execResult) {
                return [parseInt(execResult[1], 16), parseInt(execResult[2], 16), parseInt(execResult[3], 16)]
            }
        },
        {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(execResult) {
                return [parseInt(execResult[1] + execResult[1], 16), parseInt(execResult[2] + execResult[2], 16), parseInt(execResult[3] + execResult[3], 16)]
            }
        },
        {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(execResult) {
                return [execResult[1], execResult[2] / 100, execResult[3] / 100, execResult[4]]
            }
        }],
        color = jQuery.Color = function(color, green, blue, alpha) {
            return new jQuery.Color.fn.parse(color, green, blue, alpha)
        },
        spaces = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        },
        propTypes = {
            "byte": {
                floor: true,
                max: 255
            },
            "percent": {
                max: 1
            },
            "degrees": {
                mod: 360,
                floor: true
            }
        },
        support = color.support = {},
        supportElem = jQuery("<p>")[0],
        colors,
        each = jQuery.each;
        supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
        support.rgba = supportElem.style.backgroundColor.indexOf("rgba") > -1;
        each(spaces,
        function(spaceName, space) {
            space.cache = "_" + spaceName;
            space.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        });
        function clamp(value, prop, allowEmpty) {
            var type = propTypes[prop.type] || {};
            if (value == null) {
                return (allowEmpty || !prop.def) ? null: prop.def
            }
            value = type.floor ? ~~value: parseFloat(value);
            if (isNaN(value)) {
                return prop.def
            }
            if (type.mod) {
                return (value + type.mod) % type.mod
            }
            return 0 > value ? 0 : type.max < value ? type.max: value
        }
        function stringParse(string) {
            var inst = color(),
            rgba = inst._rgba = [];
            string = string.toLowerCase();
            each(stringParsers,
            function(i, parser) {
                var parsed, match = parser.re.exec(string),
                values = match && parser.parse(match),
                spaceName = parser.space || "rgba";
                if (values) {
                    parsed = inst[spaceName](values);
                    inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache];
                    rgba = inst._rgba = parsed._rgba;
                    return false
                }
            });
            if (rgba.length) {
                if (rgba.join() === "0,0,0,0") {
                    jQuery.extend(rgba, colors.transparent)
                }
                return inst
            }
            return colors[string]
        }
        color.fn = jQuery.extend(color.prototype, {
            parse: function(red, green, blue, alpha) {
                if (red === undefined) {
                    this._rgba = [null, null, null, null];
                    return this
                }
                if (red.jquery || red.nodeType) {
                    red = jQuery(red).css(green);
                    green = undefined
                }
                var inst = this,
                type = jQuery.type(red),
                rgba = this._rgba = [];
                if (green !== undefined) {
                    red = [red, green, blue, alpha];
                    type = "array"
                }
                if (type === "string") {
                    return this.parse(stringParse(red) || colors._default)
                }
                if (type === "array") {
                    each(spaces.rgba.props,
                    function(key, prop) {
                        rgba[prop.idx] = clamp(red[prop.idx], prop)
                    });
                    return this
                }
                if (type === "object") {
                    if (red instanceof color) {
                        each(spaces,
                        function(spaceName, space) {
                            if (red[space.cache]) {
                                inst[space.cache] = red[space.cache].slice()
                            }
                        })
                    } else {
                        each(spaces,
                        function(spaceName, space) {
                            var cache = space.cache;
                            each(space.props,
                            function(key, prop) {
                                if (!inst[cache] && space.to) {
                                    if (key === "alpha" || red[key] == null) {
                                        return
                                    }
                                    inst[cache] = space.to(inst._rgba)
                                }
                                inst[cache][prop.idx] = clamp(red[key], prop, true)
                            });
                            if (inst[cache] && jQuery.inArray(null, inst[cache].slice(0, 3)) < 0) {
                                inst[cache][3] = 1;
                                if (space.from) {
                                    inst._rgba = space.from(inst[cache])
                                }
                            }
                        })
                    }
                    return this
                }
            },
            is: function(compare) {
                var is = color(compare),
                same = true,
                inst = this;
                each(spaces,
                function(_, space) {
                    var localCache, isCache = is[space.cache];
                    if (isCache) {
                        localCache = inst[space.cache] || space.to && space.to(inst._rgba) || [];
                        each(space.props,
                        function(_, prop) {
                            if (isCache[prop.idx] != null) {
                                same = (isCache[prop.idx] === localCache[prop.idx]);
                                return same
                            }
                        })
                    }
                    return same
                });
                return same
            },
            _space: function() {
                var used = [],
                inst = this;
                each(spaces,
                function(spaceName, space) {
                    if (inst[space.cache]) {
                        used.push(spaceName)
                    }
                });
                return used.pop()
            },
            transition: function(other, distance) {
                var end = color(other),
                spaceName = end._space(),
                space = spaces[spaceName],
                startColor = this.alpha() === 0 ? color("transparent") : this,
                start = startColor[space.cache] || space.to(startColor._rgba),
                result = start.slice();
                end = end[space.cache];
                each(space.props,
                function(key, prop) {
                    var index = prop.idx,
                    startValue = start[index],
                    endValue = end[index],
                    type = propTypes[prop.type] || {};
                    if (endValue === null) {
                        return
                    }
                    if (startValue === null) {
                        result[index] = endValue
                    } else {
                        if (type.mod) {
                            if (endValue - startValue > type.mod / 2) {
                                startValue += type.mod
                            } else if (startValue - endValue > type.mod / 2) {
                                startValue -= type.mod
                            }
                        }
                        result[index] = clamp((endValue - startValue) * distance + startValue, prop)
                    }
                });
                return this[spaceName](result)
            },
            blend: function(opaque) {
                if (this._rgba[3] === 1) {
                    return this
                }
                var rgb = this._rgba.slice(),
                a = rgb.pop(),
                blend = color(opaque)._rgba;
                return color(jQuery.map(rgb,
                function(v, i) {
                    return (1 - a) * blend[i] + a * v
                }))
            },
            toRgbaString: function() {
                var prefix = "rgba(",
                rgba = jQuery.map(this._rgba,
                function(v, i) {
                    return v == null ? (i > 2 ? 1 : 0) : v
                });
                if (rgba[3] === 1) {
                    rgba.pop();
                    prefix = "rgb("
                }
                return prefix + rgba.join() + ")"
            },
            toHslaString: function() {
                var prefix = "hsla(",
                hsla = jQuery.map(this.hsla(),
                function(v, i) {
                    if (v == null) {
                        v = i > 2 ? 1 : 0
                    }
                    if (i && i < 3) {
                        v = Math.round(v * 100) + "%"
                    }
                    return v
                });
                if (hsla[3] === 1) {
                    hsla.pop();
                    prefix = "hsl("
                }
                return prefix + hsla.join() + ")"
            },
            toHexString: function(includeAlpha) {
                var rgba = this._rgba.slice(),
                alpha = rgba.pop();
                if (includeAlpha) {
                    rgba.push(~~ (alpha * 255))
                }
                return "#" + jQuery.map(rgba,
                function(v) {
                    v = (v || 0).toString(16);
                    return v.length === 1 ? "0" + v: v
                }).join("")
            },
            toString: function() {
                return this._rgba[3] === 0 ? "transparent": this.toRgbaString()
            }
        });
        color.fn.parse.prototype = color.fn;
        function hue2rgb(p, q, h) {
            h = (h + 1) % 1;
            if (h * 6 < 1) {
                return p + (q - p) * h * 6
            }
            if (h * 2 < 1) {
                return q
            }
            if (h * 3 < 2) {
                return p + (q - p) * ((2 / 3) - h) * 6
            }
            return p
        }
        spaces.hsla.to = function(rgba) {
            if (rgba[0] == null || rgba[1] == null || rgba[2] == null) {
                return [null, null, null, rgba[3]]
            }
            var r = rgba[0] / 255,
            g = rgba[1] / 255,
            b = rgba[2] / 255,
            a = rgba[3],
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            diff = max - min,
            add = max + min,
            l = add * 0.5,
            h,
            s;
            if (min === max) {
                h = 0
            } else if (r === max) {
                h = (60 * (g - b) / diff) + 360
            } else if (g === max) {
                h = (60 * (b - r) / diff) + 120
            } else {
                h = (60 * (r - g) / diff) + 240
            }
            if (diff === 0) {
                s = 0
            } else if (l <= 0.5) {
                s = diff / add
            } else {
                s = diff / (2 - add)
            }
            return [Math.round(h) % 360, s, l, a == null ? 1 : a]
        };
        spaces.hsla.from = function(hsla) {
            if (hsla[0] == null || hsla[1] == null || hsla[2] == null) {
                return [null, null, null, hsla[3]]
            }
            var h = hsla[0] / 360,
            s = hsla[1],
            l = hsla[2],
            a = hsla[3],
            q = l <= 0.5 ? l * (1 + s) : l + s - l * s,
            p = 2 * l - q;
            return [Math.round(hue2rgb(p, q, h + (1 / 3)) * 255), Math.round(hue2rgb(p, q, h) * 255), Math.round(hue2rgb(p, q, h - (1 / 3)) * 255), a]
        };
        each(spaces,
        function(spaceName, space) {
            var props = space.props,
            cache = space.cache,
            to = space.to,
            from = space.from;
            color.fn[spaceName] = function(value) {
                if (to && !this[cache]) {
                    this[cache] = to(this._rgba)
                }
                if (value === undefined) {
                    return this[cache].slice()
                }
                var ret, type = jQuery.type(value),
                arr = (type === "array" || type === "object") ? value: arguments,
                local = this[cache].slice();
                each(props,
                function(key, prop) {
                    var val = arr[type === "object" ? key: prop.idx];
                    if (val == null) {
                        val = local[prop.idx]
                    }
                    local[prop.idx] = clamp(val, prop)
                });
                if (from) {
                    ret = color(from(local));
                    ret[cache] = local;
                    return ret
                } else {
                    return color(local)
                }
            };
            each(props,
            function(key, prop) {
                if (color.fn[key]) {
                    return
                }
                color.fn[key] = function(value) {
                    var vtype = jQuery.type(value),
                    fn = (key === "alpha" ? (this._hsla ? "hsla": "rgba") : spaceName),
                    local = this[fn](),
                    cur = local[prop.idx],
                    match;
                    if (vtype === "undefined") {
                        return cur
                    }
                    if (vtype === "function") {
                        value = value.call(this, cur);
                        vtype = jQuery.type(value)
                    }
                    if (value == null && prop.empty) {
                        return this
                    }
                    if (vtype === "string") {
                        match = rplusequals.exec(value);
                        if (match) {
                            value = cur + parseFloat(match[2]) * (match[1] === "+" ? 1 : -1)
                        }
                    }
                    local[prop.idx] = value;
                    return this[fn](local)
                }
            })
        });
        color.hook = function(hook) {
            var hooks = hook.split(" ");
            each(hooks,
            function(i, hook) {
                jQuery.cssHooks[hook] = {
                    set: function(elem, value) {
                        var parsed, curElem, backgroundColor = "";
                        if (value !== "transparent" && (jQuery.type(value) !== "string" || (parsed = stringParse(value)))) {
                            value = color(parsed || value);
                            if (!support.rgba && value._rgba[3] !== 1) {
                                curElem = hook === "backgroundColor" ? elem.parentNode: elem;
                                while ((backgroundColor === "" || backgroundColor === "transparent") && curElem && curElem.style) {
                                    try {
                                        backgroundColor = jQuery.css(curElem, "backgroundColor");
                                        curElem = curElem.parentNode
                                    } catch(e) {}
                                }
                                value = value.blend(backgroundColor && backgroundColor !== "transparent" ? backgroundColor: "_default")
                            }
                            value = value.toRgbaString()
                        }
                        try {
                            elem.style[hook] = value
                        } catch(e) {}
                    }
                };
                jQuery.fx.step[hook] = function(fx) {
                    if (!fx.colorInit) {
                        fx.start = color(fx.elem, hook);
                        fx.end = color(fx.end);
                        fx.colorInit = true
                    }
                    jQuery.cssHooks[hook].set(fx.elem, fx.start.transition(fx.end, fx.pos))
                }
            })
        };
        color.hook(stepHooks);
        jQuery.cssHooks.borderColor = {
            expand: function(value) {
                var expanded = {};
                each(["Top", "Right", "Bottom", "Left"],
                function(i, part) {
                    expanded["border" + part + "Color"] = value
                });
                return expanded
            }
        };
        colors = jQuery.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    })(jQuery); (function() {
        var classAnimationActions = ["add", "remove", "toggle"],
        shorthandStyles = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        $.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"],
        function(_, prop) {
            $.fx.step[prop] = function(fx) {
                if (fx.end !== "none" && !fx.setAttr || fx.pos === 1 && !fx.setAttr) {
                    jQuery.style(fx.elem, prop, fx.end);
                    fx.setAttr = true
                }
            }
        });
        function getElementStyles(elem) {
            var key, len, style = elem.ownerDocument.defaultView ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : elem.currentStyle,
            styles = {};
            if (style && style.length && style[0] && style[style[0]]) {
                len = style.length;
                while (len--) {
                    key = style[len];
                    if (typeof style[key] === "string") {
                        styles[$.camelCase(key)] = style[key]
                    }
                }
            } else {
                for (key in style) {
                    if (typeof style[key] === "string") {
                        styles[key] = style[key]
                    }
                }
            }
            return styles
        }
        function styleDifference(oldStyle, newStyle) {
            var diff = {},
            name, value;
            for (name in newStyle) {
                value = newStyle[name];
                if (oldStyle[name] !== value) {
                    if (!shorthandStyles[name]) {
                        if ($.fx.step[name] || !isNaN(parseFloat(value))) {
                            diff[name] = value
                        }
                    }
                }
            }
            return diff
        }
        if (!$.fn.addBack) {
            $.fn.addBack = function(selector) {
                return this.add(selector == null ? this.prevObject: this.prevObject.filter(selector))
            }
        }
        $.effects.animateClass = function(value, duration, easing, callback) {
            var o = $.speed(duration, easing, callback);
            return this.queue(function() {
                var animated = $(this),
                baseClass = animated.attr("class") || "",
                applyClassChange,
                allAnimations = o.children ? animated.find("*").addBack() : animated;
                allAnimations = allAnimations.map(function() {
                    var el = $(this);
                    return {
                        el: el,
                        start: getElementStyles(this)
                    }
                });
                applyClassChange = function() {
                    $.each(classAnimationActions,
                    function(i, action) {
                        if (value[action]) {
                            animated[action + "Class"](value[action])
                        }
                    })
                };
                applyClassChange();
                allAnimations = allAnimations.map(function() {
                    this.end = getElementStyles(this.el[0]);
                    this.diff = styleDifference(this.start, this.end);
                    return this
                });
                animated.attr("class", baseClass);
                allAnimations = allAnimations.map(function() {
                    var styleInfo = this,
                    dfd = $.Deferred(),
                    opts = $.extend({},
                    o, {
                        queue: false,
                        complete: function() {
                            dfd.resolve(styleInfo)
                        }
                    });
                    this.el.animate(this.diff, opts);
                    return dfd.promise()
                });
                $.when.apply($, allAnimations.get()).done(function() {
                    applyClassChange();
                    $.each(arguments,
                    function() {
                        var el = this.el;
                        $.each(this.diff,
                        function(key) {
                            el.css(key, "")
                        })
                    });
                    o.complete.call(animated[0])
                })
            })
        };
        $.fn.extend({
            _addClass: $.fn.addClass,
            addClass: function(classNames, speed, easing, callback) {
                return speed ? $.effects.animateClass.call(this, {
                    add: classNames
                },
                speed, easing, callback) : this._addClass(classNames)
            },
            _removeClass: $.fn.removeClass,
            removeClass: function(classNames, speed, easing, callback) {
                return speed ? $.effects.animateClass.call(this, {
                    remove: classNames
                },
                speed, easing, callback) : this._removeClass(classNames)
            },
            _toggleClass: $.fn.toggleClass,
            toggleClass: function(classNames, force, speed, easing, callback) {
                if (typeof force === "boolean" || force === undefined) {
                    if (!speed) {
                        return this._toggleClass(classNames, force)
                    } else {
                        return $.effects.animateClass.call(this, (force ? {
                            add: classNames
                        }: {
                            remove: classNames
                        }), speed, easing, callback)
                    }
                } else {
                    return $.effects.animateClass.call(this, {
                        toggle: classNames
                    },
                    force, speed, easing)
                }
            },
            switchClass: function(remove, add, speed, easing, callback) {
                return $.effects.animateClass.call(this, {
                    add: add,
                    remove: remove
                },
                speed, easing, callback)
            }
        })
    })(); (function() {
        $.extend($.effects, {
            version: "1.10.0",
            save: function(element, set) {
                for (var i = 0; i < set.length; i++) {
                    if (set[i] !== null) {
                        element.data(dataSpace + set[i], element[0].style[set[i]])
                    }
                }
            },
            restore: function(element, set) {
                var val, i;
                for (i = 0; i < set.length; i++) {
                    if (set[i] !== null) {
                        val = element.data(dataSpace + set[i]);
                        if (val === undefined) {
                            val = ""
                        }
                        element.css(set[i], val)
                    }
                }
            },
            setMode: function(el, mode) {
                if (mode === "toggle") {
                    mode = el.is(":hidden") ? "show": "hide"
                }
                return mode
            },
            getBaseline: function(origin, original) {
                var y, x;
                switch (origin[0]) {
                case "top":
                    y = 0;
                    break;
                case "middle":
                    y = 0.5;
                    break;
                case "bottom":
                    y = 1;
                    break;
                default:
                    y = origin[0] / original.height
                }
                switch (origin[1]) {
                case "left":
                    x = 0;
                    break;
                case "center":
                    x = 0.5;
                    break;
                case "right":
                    x = 1;
                    break;
                default:
                    x = origin[1] / original.width
                }
                return {
                    x: x,
                    y: y
                }
            },
            createWrapper: function(element) {
                if (element.parent().is(".ui-effects-wrapper")) {
                    return element.parent()
                }
                var props = {
                    width: element.outerWidth(true),
                    height: element.outerHeight(true),
                    "float": element.css("float")
                },
                wrapper = $("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }),
                size = {
                    width: element.width(),
                    height: element.height()
                },
                active = document.activeElement;
                try {
                    active.id
                } catch(e) {
                    active = document.body
                }
                element.wrap(wrapper);
                if (element[0] === active || $.contains(element[0], active)) {
                    $(active).focus()
                }
                wrapper = element.parent();
                if (element.css("position") === "static") {
                    wrapper.css({
                        position: "relative"
                    });
                    element.css({
                        position: "relative"
                    })
                } else {
                    $.extend(props, {
                        position: element.css("position"),
                        zIndex: element.css("z-index")
                    });
                    $.each(["top", "left", "bottom", "right"],
                    function(i, pos) {
                        props[pos] = element.css(pos);
                        if (isNaN(parseInt(props[pos], 10))) {
                            props[pos] = "auto"
                        }
                    });
                    element.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })
                }
                element.css(size);
                return wrapper.css(props).show()
            },
            removeWrapper: function(element) {
                var active = document.activeElement;
                if (element.parent().is(".ui-effects-wrapper")) {
                    element.parent().replaceWith(element);
                    if (element[0] === active || $.contains(element[0], active)) {
                        $(active).focus()
                    }
                }
                return element
            },
            setTransition: function(element, list, factor, value) {
                value = value || {};
                $.each(list,
                function(i, x) {
                    var unit = element.cssUnit(x);
                    if (unit[0] > 0) {
                        value[x] = unit[0] * factor + unit[1]
                    }
                });
                return value
            }
        });
        function _normalizeArguments(effect, options, speed, callback) {
            if ($.isPlainObject(effect)) {
                options = effect;
                effect = effect.effect
            }
            effect = {
                effect: effect
            };
            if (options == null) {
                options = {}
            }
            if ($.isFunction(options)) {
                callback = options;
                speed = null;
                options = {}
            }
            if (typeof options === "number" || $.fx.speeds[options]) {
                callback = speed;
                speed = options;
                options = {}
            }
            if ($.isFunction(speed)) {
                callback = speed;
                speed = null
            }
            if (options) {
                $.extend(effect, options)
            }
            speed = speed || options.duration;
            effect.duration = $.fx.off ? 0 : typeof speed === "number" ? speed: speed in $.fx.speeds ? $.fx.speeds[speed] : $.fx.speeds._default;
            effect.complete = callback || options.complete;
            return effect
        }
        function standardSpeed(speed) {
            if (!speed || typeof speed === "number" || $.fx.speeds[speed]) {
                return true
            }
            return typeof speed === "string" && !$.effects.effect[speed]
        }
        $.fn.extend({
            effect: function() {
                var args = _normalizeArguments.apply(this, arguments),
                mode = args.mode,
                queue = args.queue,
                effectMethod = $.effects.effect[args.effect];
                if ($.fx.off || !effectMethod) {
                    if (mode) {
                        return this[mode](args.duration, args.complete)
                    } else {
                        return this.each(function() {
                            if (args.complete) {
                                args.complete.call(this)
                            }
                        })
                    }
                }
                function run(next) {
                    var elem = $(this),
                    complete = args.complete,
                    mode = args.mode;
                    function done() {
                        if ($.isFunction(complete)) {
                            complete.call(elem[0])
                        }
                        if ($.isFunction(next)) {
                            next()
                        }
                    }
                    if (elem.is(":hidden") ? mode === "hide": mode === "show") {
                        done()
                    } else {
                        effectMethod.call(elem[0], args, done)
                    }
                }
                return queue === false ? this.each(run) : this.queue(queue || "fx", run)
            },
            _show: $.fn.show,
            show: function(speed) {
                if (standardSpeed(speed)) {
                    return this._show.apply(this, arguments)
                } else {
                    var args = _normalizeArguments.apply(this, arguments);
                    args.mode = "show";
                    return this.effect.call(this, args)
                }
            },
            _hide: $.fn.hide,
            hide: function(speed) {
                if (standardSpeed(speed)) {
                    return this._hide.apply(this, arguments)
                } else {
                    var args = _normalizeArguments.apply(this, arguments);
                    args.mode = "hide";
                    return this.effect.call(this, args)
                }
            },
            __toggle: $.fn.toggle,
            toggle: function(speed) {
                if (standardSpeed(speed) || typeof speed === "boolean" || $.isFunction(speed)) {
                    return this.__toggle.apply(this, arguments)
                } else {
                    var args = _normalizeArguments.apply(this, arguments);
                    args.mode = "toggle";
                    return this.effect.call(this, args)
                }
            },
            cssUnit: function(key) {
                var style = this.css(key),
                val = [];
                $.each(["em", "px", "%", "pt"],
                function(i, unit) {
                    if (style.indexOf(unit) > 0) {
                        val = [parseFloat(style), unit]
                    }
                });
                return val
            }
        })
    })(); (function() {
        var baseEasings = {};
        $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"],
        function(i, name) {
            baseEasings[name] = function(p) {
                return Math.pow(p, i + 2)
            }
        });
        $.extend(baseEasings, {
            Sine: function(p) {
                return 1 - Math.cos(p * Math.PI / 2)
            },
            Circ: function(p) {
                return 1 - Math.sqrt(1 - p * p)
            },
            Elastic: function(p) {
                return p === 0 || p === 1 ? p: -Math.pow(2, 8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15)
            },
            Back: function(p) {
                return p * p * (3 * p - 2)
            },
            Bounce: function(p) {
                var pow2, bounce = 4;
                while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
                return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2)
            }
        });
        $.each(baseEasings,
        function(name, easeIn) {
            $.easing["easeIn" + name] = easeIn;
            $.easing["easeOut" + name] = function(p) {
                return 1 - easeIn(1 - p)
            };
            $.easing["easeInOut" + name] = function(p) {
                return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn(p * -2 + 2) / 2
            }
        })
    })()
})(jQuery)); (function($, undefined) {
    var rvertical = /up|down|vertical/,
    rpositivemotion = /up|left|vertical|horizontal/;
    $.effects.effect.blind = function(o, done) {
        var el = $(this),
        props = ["position", "top", "bottom", "left", "right", "height", "width"],
        mode = $.effects.setMode(el, o.mode || "hide"),
        direction = o.direction || "up",
        vertical = rvertical.test(direction),
        ref = vertical ? "height": "width",
        ref2 = vertical ? "top": "left",
        motion = rpositivemotion.test(direction),
        animation = {},
        show = mode === "show",
        wrapper,
        distance,
        margin;
        if (el.parent().is(".ui-effects-wrapper")) {
            $.effects.save(el.parent(), props)
        } else {
            $.effects.save(el, props)
        }
        el.show();
        wrapper = $.effects.createWrapper(el).css({
            overflow: "hidden"
        });
        distance = wrapper[ref]();
        margin = parseFloat(wrapper.css(ref2)) || 0;
        animation[ref] = show ? distance: 0;
        if (!motion) {
            el.css(vertical ? "bottom": "right", 0).css(vertical ? "top": "left", "auto").css({
                position: "absolute"
            });
            animation[ref2] = show ? margin: distance + margin
        }
        if (show) {
            wrapper.css(ref, 0);
            if (!motion) {
                wrapper.css(ref2, margin + distance)
            }
        }
        wrapper.animate(animation, {
            duration: o.duration,
            easing: o.easing,
            queue: false,
            complete: function() {
                if (mode === "hide") {
                    el.hide()
                }
                $.effects.restore(el, props);
                $.effects.removeWrapper(el);
                done()
            }
        })
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.bounce = function(o, done) {
        var el = $(this),
        props = ["position", "top", "bottom", "left", "right", "height", "width"],
        mode = $.effects.setMode(el, o.mode || "effect"),
        hide = mode === "hide",
        show = mode === "show",
        direction = o.direction || "up",
        distance = o.distance,
        times = o.times || 5,
        anims = times * 2 + (show || hide ? 1 : 0),
        speed = o.duration / anims,
        easing = o.easing,
        ref = (direction === "up" || direction === "down") ? "top": "left",
        motion = (direction === "up" || direction === "left"),
        i,
        upAnim,
        downAnim,
        queue = el.queue(),
        queuelen = queue.length;
        if (show || hide) {
            props.push("opacity")
        }
        $.effects.save(el, props);
        el.show();
        $.effects.createWrapper(el);
        if (!distance) {
            distance = el[ref === "top" ? "outerHeight": "outerWidth"]() / 3
        }
        if (show) {
            downAnim = {
                opacity: 1
            };
            downAnim[ref] = 0;
            el.css("opacity", 0).css(ref, motion ? -distance * 2 : distance * 2).animate(downAnim, speed, easing)
        }
        if (hide) {
            distance = distance / Math.pow(2, times - 1)
        }
        downAnim = {};
        downAnim[ref] = 0;
        for (i = 0; i < times; i++) {
            upAnim = {};
            upAnim[ref] = (motion ? "-=": "+=") + distance;
            el.animate(upAnim, speed, easing).animate(downAnim, speed, easing);
            distance = hide ? distance * 2 : distance / 2
        }
        if (hide) {
            upAnim = {
                opacity: 0
            };
            upAnim[ref] = (motion ? "-=": "+=") + distance;
            el.animate(upAnim, speed, easing)
        }
        el.queue(function() {
            if (hide) {
                el.hide()
            }
            $.effects.restore(el, props);
            $.effects.removeWrapper(el);
            done()
        });
        if (queuelen > 1) {
            queue.splice.apply(queue, [1, 0].concat(queue.splice(queuelen, anims + 1)))
        }
        el.dequeue()
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.clip = function(o, done) {
        var el = $(this),
        props = ["position", "top", "bottom", "left", "right", "height", "width"],
        mode = $.effects.setMode(el, o.mode || "hide"),
        show = mode === "show",
        direction = o.direction || "vertical",
        vert = direction === "vertical",
        size = vert ? "height": "width",
        position = vert ? "top": "left",
        animation = {},
        wrapper,
        animate,
        distance;
        $.effects.save(el, props);
        el.show();
        wrapper = $.effects.createWrapper(el).css({
            overflow: "hidden"
        });
        animate = (el[0].tagName === "IMG") ? wrapper: el;
        distance = animate[size]();
        if (show) {
            animate.css(size, 0);
            animate.css(position, distance / 2)
        }
        animation[size] = show ? distance: 0;
        animation[position] = show ? 0 : distance / 2;
        animate.animate(animation, {
            queue: false,
            duration: o.duration,
            easing: o.easing,
            complete: function() {
                if (!show) {
                    el.hide()
                }
                $.effects.restore(el, props);
                $.effects.removeWrapper(el);
                done()
            }
        })
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.drop = function(o, done) {
        var el = $(this),
        props = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
        mode = $.effects.setMode(el, o.mode || "hide"),
        show = mode === "show",
        direction = o.direction || "left",
        ref = (direction === "up" || direction === "down") ? "top": "left",
        motion = (direction === "up" || direction === "left") ? "pos": "neg",
        animation = {
            opacity: show ? 1 : 0
        },
        distance;
        $.effects.save(el, props);
        el.show();
        $.effects.createWrapper(el);
        distance = o.distance || el[ref === "top" ? "outerHeight": "outerWidth"](true) / 2;
        if (show) {
            el.css("opacity", 0).css(ref, motion === "pos" ? -distance: distance)
        }
        animation[ref] = (show ? (motion === "pos" ? "+=": "-=") : (motion === "pos" ? "-=": "+=")) + distance;
        el.animate(animation, {
            queue: false,
            duration: o.duration,
            easing: o.easing,
            complete: function() {
                if (mode === "hide") {
                    el.hide()
                }
                $.effects.restore(el, props);
                $.effects.removeWrapper(el);
                done()
            }
        })
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.explode = function(o, done) {
        var rows = o.pieces ? Math.round(Math.sqrt(o.pieces)) : 3,
        cells = rows,
        el = $(this),
        mode = $.effects.setMode(el, o.mode || "hide"),
        show = mode === "show",
        offset = el.show().css("visibility", "hidden").offset(),
        width = Math.ceil(el.outerWidth() / cells),
        height = Math.ceil(el.outerHeight() / rows),
        pieces = [],
        i,
        j,
        left,
        top,
        mx,
        my;
        function childComplete() {
            pieces.push(this);
            if (pieces.length === rows * cells) {
                animComplete()
            }
        }
        for (i = 0; i < rows; i++) {
            top = offset.top + i * height;
            my = i - (rows - 1) / 2;
            for (j = 0; j < cells; j++) {
                left = offset.left + j * width;
                mx = j - (cells - 1) / 2;
                el.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -j * width,
                    top: -i * height
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: width,
                    height: height,
                    left: left + (show ? mx * width: 0),
                    top: top + (show ? my * height: 0),
                    opacity: show ? 0 : 1
                }).animate({
                    left: left + (show ? 0 : mx * width),
                    top: top + (show ? 0 : my * height),
                    opacity: show ? 1 : 0
                },
                o.duration || 500, o.easing, childComplete)
            }
        }
        function animComplete() {
            el.css({
                visibility: "visible"
            });
            $(pieces).remove();
            if (!show) {
                el.hide()
            }
            done()
        }
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.fade = function(o, done) {
        var el = $(this),
        mode = $.effects.setMode(el, o.mode || "toggle");
        el.animate({
            opacity: mode
        },
        {
            queue: false,
            duration: o.duration,
            easing: o.easing,
            complete: done
        })
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.fold = function(o, done) {
        var el = $(this),
        props = ["position", "top", "bottom", "left", "right", "height", "width"],
        mode = $.effects.setMode(el, o.mode || "hide"),
        show = mode === "show",
        hide = mode === "hide",
        size = o.size || 15,
        percent = /([0-9]+)%/.exec(size),
        horizFirst = !!o.horizFirst,
        widthFirst = show !== horizFirst,
        ref = widthFirst ? ["width", "height"] : ["height", "width"],
        duration = o.duration / 2,
        wrapper,
        distance,
        animation1 = {},
        animation2 = {};
        $.effects.save(el, props);
        el.show();
        wrapper = $.effects.createWrapper(el).css({
            overflow: "hidden"
        });
        distance = widthFirst ? [wrapper.width(), wrapper.height()] : [wrapper.height(), wrapper.width()];
        if (percent) {
            size = parseInt(percent[1], 10) / 100 * distance[hide ? 0 : 1]
        }
        if (show) {
            wrapper.css(horizFirst ? {
                height: 0,
                width: size
            }: {
                height: size,
                width: 0
            })
        }
        animation1[ref[0]] = show ? distance[0] : size;
        animation2[ref[1]] = show ? distance[1] : 0;
        wrapper.animate(animation1, duration, o.easing).animate(animation2, duration, o.easing,
        function() {
            if (hide) {
                el.hide()
            }
            $.effects.restore(el, props);
            $.effects.removeWrapper(el);
            done()
        })
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.highlight = function(o, done) {
        var elem = $(this),
        props = ["backgroundImage", "backgroundColor", "opacity"],
        mode = $.effects.setMode(elem, o.mode || "show"),
        animation = {
            backgroundColor: elem.css("backgroundColor")
        };
        if (mode === "hide") {
            animation.opacity = 0
        }
        $.effects.save(elem, props);
        elem.show().css({
            backgroundImage: "none",
            backgroundColor: o.color || "#ffff99"
        }).animate(animation, {
            queue: false,
            duration: o.duration,
            easing: o.easing,
            complete: function() {
                if (mode === "hide") {
                    elem.hide()
                }
                $.effects.restore(elem, props);
                done()
            }
        })
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.pulsate = function(o, done) {
        var elem = $(this),
        mode = $.effects.setMode(elem, o.mode || "show"),
        show = mode === "show",
        hide = mode === "hide",
        showhide = (show || mode === "hide"),
        anims = ((o.times || 5) * 2) + (showhide ? 1 : 0),
        duration = o.duration / anims,
        animateTo = 0,
        queue = elem.queue(),
        queuelen = queue.length,
        i;
        if (show || !elem.is(":visible")) {
            elem.css("opacity", 0).show();
            animateTo = 1
        }
        for (i = 1; i < anims; i++) {
            elem.animate({
                opacity: animateTo
            },
            duration, o.easing);
            animateTo = 1 - animateTo
        }
        elem.animate({
            opacity: animateTo
        },
        duration, o.easing);
        elem.queue(function() {
            if (hide) {
                elem.hide()
            }
            done()
        });
        if (queuelen > 1) {
            queue.splice.apply(queue, [1, 0].concat(queue.splice(queuelen, anims + 1)))
        }
        elem.dequeue()
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.puff = function(o, done) {
        var elem = $(this),
        mode = $.effects.setMode(elem, o.mode || "hide"),
        hide = mode === "hide",
        percent = parseInt(o.percent, 10) || 150,
        factor = percent / 100,
        original = {
            height: elem.height(),
            width: elem.width(),
            outerHeight: elem.outerHeight(),
            outerWidth: elem.outerWidth()
        };
        $.extend(o, {
            effect: "scale",
            queue: false,
            fade: true,
            mode: mode,
            complete: done,
            percent: hide ? percent: 100,
            from: hide ? original: {
                height: original.height * factor,
                width: original.width * factor,
                outerHeight: original.outerHeight * factor,
                outerWidth: original.outerWidth * factor
            }
        });
        elem.effect(o)
    };
    $.effects.effect.scale = function(o, done) {
        var el = $(this),
        options = $.extend(true, {},
        o),
        mode = $.effects.setMode(el, o.mode || "effect"),
        percent = parseInt(o.percent, 10) || (parseInt(o.percent, 10) === 0 ? 0 : (mode === "hide" ? 0 : 100)),
        direction = o.direction || "both",
        origin = o.origin,
        original = {
            height: el.height(),
            width: el.width(),
            outerHeight: el.outerHeight(),
            outerWidth: el.outerWidth()
        },
        factor = {
            y: direction !== "horizontal" ? (percent / 100) : 1,
            x: direction !== "vertical" ? (percent / 100) : 1
        };
        options.effect = "size";
        options.queue = false;
        options.complete = done;
        if (mode !== "effect") {
            options.origin = origin || ["middle", "center"];
            options.restore = true
        }
        options.from = o.from || (mode === "show" ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        }: original);
        options.to = {
            height: original.height * factor.y,
            width: original.width * factor.x,
            outerHeight: original.outerHeight * factor.y,
            outerWidth: original.outerWidth * factor.x
        };
        if (options.fade) {
            if (mode === "show") {
                options.from.opacity = 0;
                options.to.opacity = 1
            }
            if (mode === "hide") {
                options.from.opacity = 1;
                options.to.opacity = 0
            }
        }
        el.effect(options)
    };
    $.effects.effect.size = function(o, done) {
        var original, baseline, factor, el = $(this),
        props0 = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
        props1 = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
        props2 = ["width", "height", "overflow"],
        cProps = ["fontSize"],
        vProps = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
        hProps = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
        mode = $.effects.setMode(el, o.mode || "effect"),
        restore = o.restore || mode !== "effect",
        scale = o.scale || "both",
        origin = o.origin || ["middle", "center"],
        position = el.css("position"),
        props = restore ? props0: props1,
        zero = {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        };
        if (mode === "show") {
            el.show()
        }
        original = {
            height: el.height(),
            width: el.width(),
            outerHeight: el.outerHeight(),
            outerWidth: el.outerWidth()
        };
        if (o.mode === "toggle" && mode === "show") {
            el.from = o.to || zero;
            el.to = o.from || original
        } else {
            el.from = o.from || (mode === "show" ? zero: original);
            el.to = o.to || (mode === "hide" ? zero: original)
        }
        factor = {
            from: {
                y: el.from.height / original.height,
                x: el.from.width / original.width
            },
            to: {
                y: el.to.height / original.height,
                x: el.to.width / original.width
            }
        };
        if (scale === "box" || scale === "both") {
            if (factor.from.y !== factor.to.y) {
                props = props.concat(vProps);
                el.from = $.effects.setTransition(el, vProps, factor.from.y, el.from);
                el.to = $.effects.setTransition(el, vProps, factor.to.y, el.to)
            }
            if (factor.from.x !== factor.to.x) {
                props = props.concat(hProps);
                el.from = $.effects.setTransition(el, hProps, factor.from.x, el.from);
                el.to = $.effects.setTransition(el, hProps, factor.to.x, el.to)
            }
        }
        if (scale === "content" || scale === "both") {
            if (factor.from.y !== factor.to.y) {
                props = props.concat(cProps).concat(props2);
                el.from = $.effects.setTransition(el, cProps, factor.from.y, el.from);
                el.to = $.effects.setTransition(el, cProps, factor.to.y, el.to)
            }
        }
        $.effects.save(el, props);
        el.show();
        $.effects.createWrapper(el);
        el.css("overflow", "hidden").css(el.from);
        if (origin) {
            baseline = $.effects.getBaseline(origin, original);
            el.from.top = (original.outerHeight - el.outerHeight()) * baseline.y;
            el.from.left = (original.outerWidth - el.outerWidth()) * baseline.x;
            el.to.top = (original.outerHeight - el.to.outerHeight) * baseline.y;
            el.to.left = (original.outerWidth - el.to.outerWidth) * baseline.x
        }
        el.css(el.from);
        if (scale === "content" || scale === "both") {
            vProps = vProps.concat(["marginTop", "marginBottom"]).concat(cProps);
            hProps = hProps.concat(["marginLeft", "marginRight"]);
            props2 = props0.concat(vProps).concat(hProps);
            el.find("*[width]").each(function() {
                var child = $(this),
                c_original = {
                    height: child.height(),
                    width: child.width(),
                    outerHeight: child.outerHeight(),
                    outerWidth: child.outerWidth()
                };
                if (restore) {
                    $.effects.save(child, props2)
                }
                child.from = {
                    height: c_original.height * factor.from.y,
                    width: c_original.width * factor.from.x,
                    outerHeight: c_original.outerHeight * factor.from.y,
                    outerWidth: c_original.outerWidth * factor.from.x
                };
                child.to = {
                    height: c_original.height * factor.to.y,
                    width: c_original.width * factor.to.x,
                    outerHeight: c_original.height * factor.to.y,
                    outerWidth: c_original.width * factor.to.x
                };
                if (factor.from.y !== factor.to.y) {
                    child.from = $.effects.setTransition(child, vProps, factor.from.y, child.from);
                    child.to = $.effects.setTransition(child, vProps, factor.to.y, child.to)
                }
                if (factor.from.x !== factor.to.x) {
                    child.from = $.effects.setTransition(child, hProps, factor.from.x, child.from);
                    child.to = $.effects.setTransition(child, hProps, factor.to.x, child.to)
                }
                child.css(child.from);
                child.animate(child.to, o.duration, o.easing,
                function() {
                    if (restore) {
                        $.effects.restore(child, props2)
                    }
                })
            })
        }
        el.animate(el.to, {
            queue: false,
            duration: o.duration,
            easing: o.easing,
            complete: function() {
                if (el.to.opacity === 0) {
                    el.css("opacity", el.from.opacity)
                }
                if (mode === "hide") {
                    el.hide()
                }
                $.effects.restore(el, props);
                if (!restore) {
                    if (position === "static") {
                        el.css({
                            position: "relative",
                            top: el.to.top,
                            left: el.to.left
                        })
                    } else {
                        $.each(["top", "left"],
                        function(idx, pos) {
                            el.css(pos,
                            function(_, str) {
                                var val = parseInt(str, 10),
                                toRef = idx ? el.to.left: el.to.top;
                                if (str === "auto") {
                                    return toRef + "px"
                                }
                                return val + toRef + "px"
                            })
                        })
                    }
                }
                $.effects.removeWrapper(el);
                done()
            }
        })
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.shake = function(o, done) {
        var el = $(this),
        props = ["position", "top", "bottom", "left", "right", "height", "width"],
        mode = $.effects.setMode(el, o.mode || "effect"),
        direction = o.direction || "left",
        distance = o.distance || 20,
        times = o.times || 3,
        anims = times * 2 + 1,
        speed = Math.round(o.duration / anims),
        ref = (direction === "up" || direction === "down") ? "top": "left",
        positiveMotion = (direction === "up" || direction === "left"),
        animation = {},
        animation1 = {},
        animation2 = {},
        i,
        queue = el.queue(),
        queuelen = queue.length;
        $.effects.save(el, props);
        el.show();
        $.effects.createWrapper(el);
        animation[ref] = (positiveMotion ? "-=": "+=") + distance;
        animation1[ref] = (positiveMotion ? "+=": "-=") + distance * 2;
        animation2[ref] = (positiveMotion ? "-=": "+=") + distance * 2;
        el.animate(animation, speed, o.easing);
        for (i = 1; i < times; i++) {
            el.animate(animation1, speed, o.easing).animate(animation2, speed, o.easing)
        }
        el.animate(animation1, speed, o.easing).animate(animation, speed / 2, o.easing).queue(function() {
            if (mode === "hide") {
                el.hide()
            }
            $.effects.restore(el, props);
            $.effects.removeWrapper(el);
            done()
        });
        if (queuelen > 1) {
            queue.splice.apply(queue, [1, 0].concat(queue.splice(queuelen, anims + 1)))
        }
        el.dequeue()
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.slide = function(o, done) {
        var el = $(this),
        props = ["position", "top", "bottom", "left", "right", "width", "height"],
        mode = $.effects.setMode(el, o.mode || "show"),
        show = mode === "show",
        direction = o.direction || "left",
        ref = (direction === "up" || direction === "down") ? "top": "left",
        positiveMotion = (direction === "up" || direction === "left"),
        distance,
        animation = {};
        $.effects.save(el, props);
        el.show();
        distance = o.distance || el[ref === "top" ? "outerHeight": "outerWidth"](true);
        $.effects.createWrapper(el).css({
            overflow: "hidden"
        });
        if (show) {
            el.css(ref, positiveMotion ? (isNaN(distance) ? "-" + distance: -distance) : distance)
        }
        animation[ref] = (show ? (positiveMotion ? "+=": "-=") : (positiveMotion ? "-=": "+=")) + distance;
        el.animate(animation, {
            queue: false,
            duration: o.duration,
            easing: o.easing,
            complete: function() {
                if (mode === "hide") {
                    el.hide()
                }
                $.effects.restore(el, props);
                $.effects.removeWrapper(el);
                done()
            }
        })
    }
})(jQuery); (function($, undefined) {
    $.effects.effect.transfer = function(o, done) {
        var elem = $(this),
        target = $(o.to),
        targetFixed = target.css("position") === "fixed",
        body = $("body"),
        fixTop = targetFixed ? body.scrollTop() : 0,
        fixLeft = targetFixed ? body.scrollLeft() : 0,
        endPosition = target.offset(),
        animation = {
            top: endPosition.top - fixTop,
            left: endPosition.left - fixLeft,
            height: target.innerHeight(),
            width: target.innerWidth()
        },
        startPosition = elem.offset(),
        transfer = $("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(o.className).css({
            top: startPosition.top - fixTop,
            left: startPosition.left - fixLeft,
            height: elem.innerHeight(),
            width: elem.innerWidth(),
            position: targetFixed ? "fixed": "absolute"
        }).animate(animation, o.duration, o.easing,
        function() {
            transfer.remove();
            done()
        })
    }
})(jQuery); (function($, undefined) {
    $.widget("ui.draggable", $.ui.mouse, {
        version: "1.10.0",
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            if (this.options.helper === "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
            if (this.options.addClasses) {
                this.element.addClass("ui-draggable")
            }
            if (this.options.disabled) {
                this.element.addClass("ui-draggable-disabled")
            }
            this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy()
        },
        _mouseCapture: function(event) {
            var o = this.options;
            if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
                return false
            }
            this.handle = this._getHandle(event);
            if (!this.handle) {
                return false
            }
            $(o.iframeFix === true ? "iframe": o.iframeFix).each(function() {
                $("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css($(this).offset()).appendTo("body")
            });
            return true
        },
        _mouseStart: function(event) {
            var o = this.options;
            this.helper = this._createHelper(event);
            this.helper.addClass("ui-draggable-dragging");
            this._cacheHelperProportions();
            if ($.ui.ddmanager) {
                $.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            $.extend(this.offset, {
                click: {
                    left: event.pageX - this.offset.left,
                    top: event.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(event);
            this.originalPageX = event.pageX;
            this.originalPageY = event.pageY; (o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));
            if (o.containment) {
                this._setContainment()
            }
            if (this._trigger("start", event) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if ($.ui.ddmanager && !o.dropBehaviour) {
                $.ui.ddmanager.prepareOffsets(this, event)
            }
            this._mouseDrag(event, true);
            if ($.ui.ddmanager) {
                $.ui.ddmanager.dragStart(this, event)
            }
            return true
        },
        _mouseDrag: function(event, noPropagation) {
            this.position = this._generatePosition(event);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!noPropagation) {
                var ui = this._uiHash();
                if (this._trigger("drag", event, ui) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = ui.position
            }
            if (!this.options.axis || this.options.axis !== "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis !== "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            if ($.ui.ddmanager) {
                $.ui.ddmanager.drag(this, event)
            }
            return false
        },
        _mouseStop: function(event) {
            var element, that = this,
            elementInDom = false,
            dropped = false;
            if ($.ui.ddmanager && !this.options.dropBehaviour) {
                dropped = $.ui.ddmanager.drop(this, event)
            }
            if (this.dropped) {
                dropped = this.dropped;
                this.dropped = false
            }
            element = this.element[0];
            while (element && (element = element.parentNode)) {
                if (element === document) {
                    elementInDom = true
                }
            }
            if (!elementInDom && this.options.helper === "original") {
                return false
            }
            if ((this.options.revert === "invalid" && !dropped) || (this.options.revert === "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
                $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10),
                function() {
                    if (that._trigger("stop", event) !== false) {
                        that._clear()
                    }
                })
            } else {
                if (this._trigger("stop", event) !== false) {
                    this._clear()
                }
            }
            return false
        },
        _mouseUp: function(event) {
            $("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            });
            if ($.ui.ddmanager) {
                $.ui.ddmanager.dragStop(this, event)
            }
            return $.ui.mouse.prototype._mouseUp.call(this, event)
        },
        cancel: function() {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        },
        _getHandle: function(event) {
            var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true: false;
            $(this.options.handle, this.element).find("*").addBack().each(function() {
                if (this === event.target) {
                    handle = true
                }
            });
            return handle
        },
        _createHelper: function(event) {
            var o = this.options,
            helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);
            if (!helper.parents("body").length) {
                helper.appendTo((o.appendTo === "parent" ? this.element[0].parentNode: o.appendTo))
            }
            if (helper[0] !== this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {
                helper.css("position", "absolute")
            }
            return helper
        },
        _adjustOffsetFromHelper: function(obj) {
            if (typeof obj === "string") {
                obj = obj.split(" ")
            }
            if ($.isArray(obj)) {
                obj = {
                    left: +obj[0],
                    top: +obj[1] || 0
                }
            }
            if ("left" in obj) {
                this.offset.click.left = obj.left + this.margins.left
            }
            if ("right" in obj) {
                this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left
            }
            if ("top" in obj) {
                this.offset.click.top = obj.top + this.margins.top
            }
            if ("bottom" in obj) {
                this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top
            }
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var po = this.offsetParent.offset();
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
                po.left += this.scrollParent.scrollLeft();
                po.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] === document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {
                po = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition === "relative") {
                var p = this.element.position();
                return {
                    top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0),
                right: (parseInt(this.element.css("marginRight"), 10) || 0),
                bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var over, c, ce, o = this.options;
            if (o.containment === "parent") {
                o.containment = this.helper[0].parentNode
            }
            if (o.containment === "document" || o.containment === "window") {
                this.containment = [o.containment === "document" ? 0 : $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, o.containment === "document" ? 0 : $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (o.containment === "document" ? 0 : $(window).scrollLeft()) + $(o.containment === "document" ? document: window).width() - this.helperProportions.width - this.margins.left, (o.containment === "document" ? 0 : $(window).scrollTop()) + ($(o.containment === "document" ? document: window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (! (/^(document|window|parent)$/).test(o.containment) && o.containment.constructor !== Array) {
                c = $(o.containment);
                ce = c[0];
                if (!ce) {
                    return
                }
                over = ($(ce).css("overflow") !== "hidden");
                this.containment = [(parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0), (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0), (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
                this.relative_container = c
            } else if (o.containment.constructor === Array) {
                this.containment = o.containment
            }
        },
        _convertPositionTo: function(d, pos) {
            if (!pos) {
                pos = this.position
            }
            var mod = d === "absolute" ? 1 : -1,
            scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
            return {
                top: (pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())) * mod)),
                left: (pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod))
            }
        },
        _generatePosition: function(event) {
            var containment, co, top, left, o = this.options,
            scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName),
            pageX = event.pageX,
            pageY = event.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (this.relative_container) {
                        co = this.relative_container.offset();
                        containment = [this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top]
                    } else {
                        containment = this.containment
                    }
                    if (event.pageX - this.offset.click.left < containment[0]) {
                        pageX = containment[0] + this.offset.click.left
                    }
                    if (event.pageY - this.offset.click.top < containment[1]) {
                        pageY = containment[1] + this.offset.click.top
                    }
                    if (event.pageX - this.offset.click.left > containment[2]) {
                        pageX = containment[2] + this.offset.click.left
                    }
                    if (event.pageY - this.offset.click.top > containment[3]) {
                        pageY = containment[3] + this.offset.click.top
                    }
                }
                if (o.grid) {
                    top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
                    pageY = containment ? ((top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]) ? top: ((top - this.offset.click.top >= containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
                    left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
                    pageX = containment ? ((left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]) ? left: ((left - this.offset.click.left >= containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left
                }
            }
            return {
                top: (pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())))),
                left: (pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())))
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function(type, event, ui) {
            ui = ui || this._uiHash();
            $.ui.plugin.call(this, type, [event, ui]);
            if (type === "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return $.Widget.prototype._trigger.call(this, type, event, ui)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    $.ui.plugin.add("draggable", "connectToSortable", {
        start: function(event, ui) {
            var inst = $(this).data("ui-draggable"),
            o = inst.options,
            uiSortable = $.extend({},
            ui, {
                item: inst.element
            });
            inst.sortables = [];
            $(o.connectToSortable).each(function() {
                var sortable = $.data(this, "ui-sortable");
                if (sortable && !sortable.options.disabled) {
                    inst.sortables.push({
                        instance: sortable,
                        shouldRevert: sortable.options.revert
                    });
                    sortable.refreshPositions();
                    sortable._trigger("activate", event, uiSortable)
                }
            })
        },
        stop: function(event, ui) {
            var inst = $(this).data("ui-draggable"),
            uiSortable = $.extend({},
            ui, {
                item: inst.element
            });
            $.each(inst.sortables,
            function() {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    inst.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = true
                    }
                    this.instance._mouseStop(event);
                    this.instance.options.helper = this.instance.options._helper;
                    if (inst.options.helper === "original") {
                        this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", event, uiSortable)
                }
            })
        },
        drag: function(event, ui) {
            var inst = $(this).data("ui-draggable"),
            that = this;
            $.each(inst.sortables,
            function() {
                var innermostIntersecting = false,
                thisSortable = this;
                this.instance.positionAbs = inst.positionAbs;
                this.instance.helperProportions = inst.helperProportions;
                this.instance.offset.click = inst.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    innermostIntersecting = true;
                    $.each(inst.sortables,
                    function() {
                        this.instance.positionAbs = inst.positionAbs;
                        this.instance.helperProportions = inst.helperProportions;
                        this.instance.offset.click = inst.offset.click;
                        if (this !== thisSortable && this.instance._intersectsWith(this.instance.containerCache) && $.ui.contains(thisSortable.instance.element[0], this.instance.element[0])) {
                            innermostIntersecting = false
                        }
                        return innermostIntersecting
                    })
                }
                if (innermostIntersecting) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = $(that).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function() {
                            return ui.helper[0]
                        };
                        event.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(event, true);
                        this.instance._mouseStart(event, true, true);
                        this.instance.offset.click.top = inst.offset.click.top;
                        this.instance.offset.click.left = inst.offset.click.left;
                        this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;
                        inst._trigger("toSortable", event);
                        inst.dropped = this.instance.element;
                        inst.currentItem = inst.element;
                        this.instance.fromOutside = inst
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(event)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", event, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(event, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        inst._trigger("fromSortable", event);
                        inst.dropped = false
                    }
                }
            })
        }
    });
    $.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var t = $("body"),
            o = $(this).data("ui-draggable").options;
            if (t.css("cursor")) {
                o._cursor = t.css("cursor")
            }
            t.css("cursor", o.cursor)
        },
        stop: function() {
            var o = $(this).data("ui-draggable").options;
            if (o._cursor) {
                $("body").css("cursor", o._cursor)
            }
        }
    });
    $.ui.plugin.add("draggable", "opacity", {
        start: function(event, ui) {
            var t = $(ui.helper),
            o = $(this).data("ui-draggable").options;
            if (t.css("opacity")) {
                o._opacity = t.css("opacity")
            }
            t.css("opacity", o.opacity)
        },
        stop: function(event, ui) {
            var o = $(this).data("ui-draggable").options;
            if (o._opacity) {
                $(ui.helper).css("opacity", o._opacity)
            }
        }
    });
    $.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var i = $(this).data("ui-draggable");
            if (i.scrollParent[0] !== document && i.scrollParent[0].tagName !== "HTML") {
                i.overflowOffset = i.scrollParent.offset()
            }
        },
        drag: function(event) {
            var i = $(this).data("ui-draggable"),
            o = i.options,
            scrolled = false;
            if (i.scrollParent[0] !== document && i.scrollParent[0].tagName !== "HTML") {
                if (!o.axis || o.axis !== "x") {
                    if ((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
                        i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed
                    } else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
                        i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed
                    }
                }
                if (!o.axis || o.axis !== "y") {
                    if ((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
                        i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed
                    } else if (event.pageX - i.overflowOffset.left < o.scrollSensitivity) {
                        i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed
                    }
                }
            } else {
                if (!o.axis || o.axis !== "x") {
                    if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
                        scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed)
                    } else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
                        scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed)
                    }
                }
                if (!o.axis || o.axis !== "y") {
                    if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
                        scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed)
                    } else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
                        scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed)
                    }
                }
            }
            if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
                $.ui.ddmanager.prepareOffsets(i, event)
            }
        }
    });
    $.ui.plugin.add("draggable", "snap", {
        start: function() {
            var i = $(this).data("ui-draggable"),
            o = i.options;
            i.snapElements = [];
            $(o.snap.constructor !== String ? (o.snap.items || ":data(ui-draggable)") : o.snap).each(function() {
                var $t = $(this),
                $o = $t.offset();
                if (this !== i.element[0]) {
                    i.snapElements.push({
                        item: this,
                        width: $t.outerWidth(),
                        height: $t.outerHeight(),
                        top: $o.top,
                        left: $o.left
                    })
                }
            })
        },
        drag: function(event, ui) {
            var ts, bs, ls, rs, l, r, t, b, i, first, inst = $(this).data("ui-draggable"),
            o = inst.options,
            d = o.snapTolerance,
            x1 = ui.offset.left,
            x2 = x1 + inst.helperProportions.width,
            y1 = ui.offset.top,
            y2 = y1 + inst.helperProportions.height;
            for (i = inst.snapElements.length - 1; i >= 0; i--) {
                l = inst.snapElements[i].left;
                r = l + inst.snapElements[i].width;
                t = inst.snapElements[i].top;
                b = t + inst.snapElements[i].height;
                if (! ((l - d < x1 && x1 < r + d && t - d < y1 && y1 < b + d) || (l - d < x1 && x1 < r + d && t - d < y2 && y2 < b + d) || (l - d < x2 && x2 < r + d && t - d < y1 && y1 < b + d) || (l - d < x2 && x2 < r + d && t - d < y2 && y2 < b + d))) {
                    if (inst.snapElements[i].snapping) { (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
                            snapItem: inst.snapElements[i].item
                        })))
                    }
                    inst.snapElements[i].snapping = false;
                    continue
                }
                if (o.snapMode !== "inner") {
                    ts = Math.abs(t - y2) <= d;
                    bs = Math.abs(b - y1) <= d;
                    ls = Math.abs(l - x2) <= d;
                    rs = Math.abs(r - x1) <= d;
                    if (ts) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: t - inst.helperProportions.height,
                            left: 0
                        }).top - inst.margins.top
                    }
                    if (bs) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: b,
                            left: 0
                        }).top - inst.margins.top
                    }
                    if (ls) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: l - inst.helperProportions.width
                        }).left - inst.margins.left
                    }
                    if (rs) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: r
                        }).left - inst.margins.left
                    }
                }
                first = (ts || bs || ls || rs);
                if (o.snapMode !== "outer") {
                    ts = Math.abs(t - y1) <= d;
                    bs = Math.abs(b - y2) <= d;
                    ls = Math.abs(l - x1) <= d;
                    rs = Math.abs(r - x2) <= d;
                    if (ts) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: t,
                            left: 0
                        }).top - inst.margins.top
                    }
                    if (bs) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: b - inst.helperProportions.height,
                            left: 0
                        }).top - inst.margins.top
                    }
                    if (ls) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: l
                        }).left - inst.margins.left
                    }
                    if (rs) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: r - inst.helperProportions.width
                        }).left - inst.margins.left
                    }
                }
                if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) { (inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
                        snapItem: inst.snapElements[i].item
                    })))
                }
                inst.snapElements[i].snapping = (ts || bs || ls || rs || first)
            }
        }
    });
    $.ui.plugin.add("draggable", "stack", {
        start: function() {
            var min, o = $(this).data("ui-draggable").options,
            group = $.makeArray($(o.stack)).sort(function(a, b) {
                return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0)
            });
            if (!group.length) {
                return
            }
            min = parseInt(group[0].style.zIndex, 10) || 0;
            $(group).each(function(i) {
                this.style.zIndex = min + i
            });
            this[0].style.zIndex = min + group.length
        }
    });
    $.ui.plugin.add("draggable", "zIndex", {
        start: function(event, ui) {
            var t = $(ui.helper),
            o = $(this).data("ui-draggable").options;
            if (t.css("zIndex")) {
                o._zIndex = t.css("zIndex")
            }
            t.css("zIndex", o.zIndex)
        },
        stop: function(event, ui) {
            var o = $(this).data("ui-draggable").options;
            if (o._zIndex) {
                $(ui.helper).css("zIndex", o._zIndex)
            }
        }
    })
})(jQuery); (function($, undefined) {
    $.extend($.ui, {
        datepicker: {
            version: "1.10.0"
        }
    });
    var PROP_NAME = "datepicker",
    dpuuid = new Date().getTime(),
    instActive;
    function Datepicker() {
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        $.extend(this._defaults, this.regional[""]);
        this.dpDiv = bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(settings) {
            extendRemove(this._defaults, settings || {});
            return this
        },
        _attachDatepicker: function(target, settings) {
            var nodeName, inline, inst;
            nodeName = target.nodeName.toLowerCase();
            inline = (nodeName === "div" || nodeName === "span");
            if (!target.id) {
                this.uuid += 1;
                target.id = "dp" + this.uuid
            }
            inst = this._newInst($(target), inline);
            inst.settings = $.extend({},
            settings || {});
            if (nodeName === "input") {
                this._connectDatepicker(target, inst)
            } else if (inline) {
                this._inlineDatepicker(target, inst)
            }
        },
        _newInst: function(target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: (!inline ? this.dpDiv: bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))
            }
        },
        _connectDatepicker: function(target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(input, inst);
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp);
            this._autoSize(inst);
            $.data(target, PROP_NAME, inst);
            if (inst.settings.disabled) {
                this._disableDatepicker(target)
            }
        },
        _attachments: function(input, inst) {
            var showOn, buttonText, buttonImage, appendText = this._get(inst, "appendText"),
            isRTL = this._get(inst, "isRTL");
            if (inst.append) {
                inst.append.remove()
            }
            if (appendText) {
                inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
                input[isRTL ? "before": "after"](inst.append)
            }
            input.unbind("focus", this._showDatepicker);
            if (inst.trigger) {
                inst.trigger.remove()
            }
            showOn = this._get(inst, "showOn");
            if (showOn === "focus" || showOn === "both") {
                input.focus(this._showDatepicker)
            }
            if (showOn === "button" || showOn === "both") {
                buttonText = this._get(inst, "buttonText");
                buttonImage = this._get(inst, "buttonImage");
                inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) : $("<button type='button'></button>").addClass(this._triggerClass).html(!buttonImage ? buttonText: $("<img/>").attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                })));
                input[isRTL ? "before": "after"](inst.trigger);
                inst.trigger.click(function() {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
                        $.datepicker._hideDatepicker()
                    } else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
                        $.datepicker._hideDatepicker();
                        $.datepicker._showDatepicker(input[0])
                    } else {
                        $.datepicker._showDatepicker(input[0])
                    }
                    return false
                })
            }
        },
        _autoSize: function(inst) {
            if (this._get(inst, "autoSize") && !inst.inline) {
                var findMax, max, maxI, i, date = new Date(2009, 12 - 1, 20),
                dateFormat = this._get(inst, "dateFormat");
                if (dateFormat.match(/[DM]/)) {
                    findMax = function(names) {
                        max = 0;
                        maxI = 0;
                        for (i = 0; i < names.length; i++) {
                            if (names[i].length > max) {
                                max = names[i].length;
                                maxI = i
                            }
                        }
                        return maxI
                    };
                    date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? "monthNames": "monthNamesShort"))));
                    date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? "dayNames": "dayNamesShort"))) + 20 - date.getDay())
                }
                inst.input.attr("size", this._formatDate(inst, date).length)
            }
        },
        _inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName)) {
                return
            }
            divSpan.addClass(this.markerClassName).append(inst.dpDiv);
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst), true);
            this._updateDatepicker(inst);
            this._updateAlternate(inst);
            if (inst.settings.disabled) {
                this._disableDatepicker(target)
            }
            inst.dpDiv.css("display", "block")
        },
        _dialogDatepicker: function(input, date, onSelect, settings, pos) {
            var id, browserWidth, browserHeight, scrollX, scrollY, inst = this._dialogInst;
            if (!inst) {
                this.uuid += 1;
                id = "dp" + this.uuid;
                this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>");
                this._dialogInput.keydown(this._doKeyDown);
                $("body").append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst)
            }
            extendRemove(inst.settings, settings || {});
            date = (date && date.constructor === Date ? this._formatDate(inst, date) : date);
            this._dialogInput.val(date);
            this._pos = (pos ? (pos.length ? pos: [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                browserWidth = document.documentElement.clientWidth;
                browserHeight = document.documentElement.clientHeight;
                scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY]
            }
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI) {
                $.blockUI(this.dpDiv)
            }
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this
        },
        _destroyDatepicker: function(target) {
            var nodeName, $target = $(target),
            inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName === "input") {
                inst.append.remove();
                inst.trigger.remove();
                $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
            } else if (nodeName === "div" || nodeName === "span") {
                $target.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function(target) {
            var nodeName, inline, $target = $(target),
            inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            nodeName = target.nodeName.toLowerCase();
            if (nodeName === "input") {
                target.disabled = false;
                inst.trigger.filter("button").each(function() {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else if (nodeName === "div" || nodeName === "span") {
                inline = $target.children("." + this._inlineClass);
                inline.children().removeClass("ui-state-disabled");
                inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false)
            }
            this._disabledInputs = $.map(this._disabledInputs,
            function(value) {
                return (value === target ? null: value)
            })
        },
        _disableDatepicker: function(target) {
            var nodeName, inline, $target = $(target),
            inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            nodeName = target.nodeName.toLowerCase();
            if (nodeName === "input") {
                target.disabled = true;
                inst.trigger.filter("button").each(function() {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else if (nodeName === "div" || nodeName === "span") {
                inline = $target.children("." + this._inlineClass);
                inline.children().addClass("ui-state-disabled");
                inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true)
            }
            this._disabledInputs = $.map(this._disabledInputs,
            function(value) {
                return (value === target ? null: value)
            });
            this._disabledInputs[this._disabledInputs.length] = target
        },
        _isDisabledDatepicker: function(target) {
            if (!target) {
                return false
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] === target) {
                    return true
                }
            }
            return false
        },
        _getInst: function(target) {
            try {
                return $.data(target, PROP_NAME)
            } catch(err) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(target, name, value) {
            var settings, date, minDate, maxDate, inst = this._getInst(target);
            if (arguments.length === 2 && typeof name === "string") {
                return (name === "defaults" ? $.extend({},
                $.datepicker._defaults) : (inst ? (name === "all" ? $.extend({},
                inst.settings) : this._get(inst, name)) : null))
            }
            settings = name || {};
            if (typeof name === "string") {
                settings = {};
                settings[name] = value
            }
            if (inst) {
                if (this._curInst === inst) {
                    this._hideDatepicker()
                }
                date = this._getDateDatepicker(target, true);
                minDate = this._getMinMaxDate(inst, "min");
                maxDate = this._getMinMaxDate(inst, "max");
                extendRemove(inst.settings, settings);
                if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
                    inst.settings.minDate = this._formatDate(inst, minDate)
                }
                if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
                    inst.settings.maxDate = this._formatDate(inst, maxDate)
                }
                if ("disabled" in settings) {
                    if (settings.disabled) {
                        this._disableDatepicker(target)
                    } else {
                        this._enableDatepicker(target)
                    }
                }
                this._attachments($(target), inst);
                this._autoSize(inst);
                this._setDate(inst, date);
                this._updateAlternate(inst);
                this._updateDatepicker(inst)
            }
        },
        _changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function(target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst)
            }
        },
        _setDateDatepicker: function(target, date) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date);
                this._updateDatepicker(inst);
                this._updateAlternate(inst)
            }
        },
        _getDateDatepicker: function(target, noDefault) {
            var inst = this._getInst(target);
            if (inst && !inst.inline) {
                this._setDateFromField(inst, noDefault)
            }
            return (inst ? this._getDate(inst) : null)
        },
        _doKeyDown: function(event) {
            var onSelect, dateStr, sel, inst = $.datepicker._getInst(event.target),
            handled = true,
            isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            inst._keyEvent = true;
            if ($.datepicker._datepickerShowing) {
                switch (event.keyCode) {
                case 9:
                    $.datepicker._hideDatepicker();
                    handled = false;
                    break;
                case 13:
                    sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
                    if (sel[0]) {
                        $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0])
                    }
                    onSelect = $.datepicker._get(inst, "onSelect");
                    if (onSelect) {
                        dateStr = $.datepicker._formatDate(inst);
                        onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
                    } else {
                        $.datepicker._hideDatepicker()
                    }
                    return false;
                case 27:
                    $.datepicker._hideDatepicker();
                    break;
                case 33:
                    $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
                    break;
                case 34:
                    $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
                    break;
                case 35:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._clearDate(event.target)
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 36:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._gotoToday(event.target)
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 37:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    if (event.originalEvent.altKey) {
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M")
                    }
                    break;
                case 38:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, -7, "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 39:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    if (event.originalEvent.altKey) {
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M")
                    }
                    break;
                case 40:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, +7, "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                default:
                    handled = false
                }
            } else if (event.keyCode === 36 && event.ctrlKey) {
                $.datepicker._showDatepicker(this)
            } else {
                handled = false
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation()
            }
        },
        _doKeyPress: function(event) {
            var chars, chr, inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, "constrainInput")) {
                chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
                chr = String.fromCharCode(event.charCode == null ? event.keyCode: event.charCode);
                return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1)
            }
        },
        _doKeyUp: function(event) {
            var date, inst = $.datepicker._getInst(event.target);
            if (inst.input.val() !== inst.lastVal) {
                try {
                    date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), (inst.input ? inst.input.val() : null), $.datepicker._getFormatConfig(inst));
                    if (date) {
                        $.datepicker._setDateFromField(inst);
                        $.datepicker._updateAlternate(inst);
                        $.datepicker._updateDatepicker(inst)
                    }
                } catch(err) {}
            }
            return true
        },
        _showDatepicker: function(input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() !== "input") {
                input = $("input", input.parentNode)[0]
            }
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) {
                return
            }
            var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;
            inst = $.datepicker._getInst(input);
            if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
                $.datepicker._curInst.dpDiv.stop(true, true);
                if (inst && $.datepicker._datepickerShowing) {
                    $.datepicker._hideDatepicker($.datepicker._curInst.input[0])
                }
            }
            beforeShow = $.datepicker._get(inst, "beforeShow");
            beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
            if (beforeShowSettings === false) {
                return
            }
            extendRemove(inst.settings, beforeShowSettings);
            inst.lastVal = null;
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog) {
                input.value = ""
            }
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight
            }
            isFixed = false;
            $(input).parents().each(function() {
                isFixed |= $(this).css("position") === "fixed";
                return ! isFixed
            });
            offset = {
                left: $.datepicker._pos[0],
                top: $.datepicker._pos[1]
            };
            $.datepicker._pos = null;
            inst.dpDiv.empty();
            inst.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            $.datepicker._updateDatepicker(inst);
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ? "static": (isFixed ? "fixed": "absolute")),
                display: "none",
                left: offset.left + "px",
                top: offset.top + "px"
            });
            if (!inst.inline) {
                showAnim = $.datepicker._get(inst, "showAnim");
                duration = $.datepicker._get(inst, "duration");
                inst.dpDiv.zIndex($(input).zIndex() + 100000);
                $.datepicker._datepickerShowing = true;
                if ($.effects && $.effects.effect[showAnim]) {
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration)
                } else {
                    inst.dpDiv[showAnim || "show"](showAnim ? duration: null)
                }
                if (inst.input.is(":visible") && !inst.input.is(":disabled")) {
                    inst.input.focus()
                }
                $.datepicker._curInst = inst
            }
        },
        _updateDatepicker: function(inst) {
            this.maxRows = 4;
            instActive = inst;
            inst.dpDiv.empty().append(this._generateHTML(inst));
            this._attachHandlers(inst);
            inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var origyearshtml, numMonths = this._getNumberOfMonths(inst),
            cols = numMonths[1],
            width = 17;
            inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            if (cols > 1) {
                inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em")
            }
            inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add": "remove") + "Class"]("ui-datepicker-multi");
            inst.dpDiv[(this._get(inst, "isRTL") ? "add": "remove") + "Class"]("ui-datepicker-rtl");
            if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && inst.input[0] !== document.activeElement) {
                inst.input.focus()
            }
            if (inst.yearshtml) {
                origyearshtml = inst.yearshtml;
                setTimeout(function() {
                    if (origyearshtml === inst.yearshtml && inst.yearshtml) {
                        inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml)
                    }
                    origyearshtml = inst.yearshtml = null
                },
                0)
            }
        },
        _getBorders: function(elem) {
            var convert = function(value) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                } [value] || value
            };
            return [parseFloat(convert(elem.css("border-left-width"))), parseFloat(convert(elem.css("border-top-width")))]
        },
        _checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth(),
            dpHeight = inst.dpDiv.outerHeight(),
            inputWidth = inst.input ? inst.input.outerWidth() : 0,
            inputHeight = inst.input ? inst.input.outerHeight() : 0,
            viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
            viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
            offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left === inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top === (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
            offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
            offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);
            return offset
        },
        _findPos: function(obj) {
            var position, inst = this._getInst(obj),
            isRTL = this._get(inst, "isRTL");
            while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
                obj = obj[isRTL ? "previousSibling": "nextSibling"]
            }
            position = $(obj).offset();
            return [position.left, position.top]
        },
        _hideDatepicker: function(input) {
            var showAnim, duration, postProcess, onClose, inst = this._curInst;
            if (!inst || (input && inst !== $.data(input, PROP_NAME))) {
                return
            }
            if (this._datepickerShowing) {
                showAnim = this._get(inst, "showAnim");
                duration = this._get(inst, "duration");
                postProcess = function() {
                    $.datepicker._tidyDialog(inst)
                };
                if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim])) {
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[(showAnim === "slideDown" ? "slideUp": (showAnim === "fadeIn" ? "fadeOut": "hide"))]((showAnim ? duration: null), postProcess)
                }
                if (!showAnim) {
                    postProcess()
                }
                this._datepickerShowing = false;
                onClose = this._get(inst, "onClose");
                if (onClose) {
                    onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst])
                }
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if ($.blockUI) {
                        $.unblockUI();
                        $("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(event) {
            if (!$.datepicker._curInst) {
                return
            }
            var $target = $(event.target),
            inst = $.datepicker._getInst($target[0]);
            if ((($target[0].id !== $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length === 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))) || ($target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst)) {
                $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(id, offset, period) {
            var target = $(id),
            inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return
            }
            this._adjustInstDate(inst, offset + (period === "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
            this._updateDatepicker(inst)
        },
        _gotoToday: function(id) {
            var date, target = $(id),
            inst = this._getInst(target[0]);
            if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear
            } else {
                date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear()
            }
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _selectMonthYear: function(id, select, period) {
            var target = $(id),
            inst = this._getInst(target[0]);
            inst["selected" + (period === "M" ? "Month": "Year")] = inst["draw" + (period === "M" ? "Month": "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _selectDay: function(id, month, year, td) {
            var inst, target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return
            }
            inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $("a", td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
        },
        _clearDate: function(id) {
            var target = $(id);
            this._selectDate(target, "")
        },
        _selectDate: function(id, dateStr) {
            var onSelect, target = $(id),
            inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr: this._formatDate(inst));
            if (inst.input) {
                inst.input.val(dateStr)
            }
            this._updateAlternate(inst);
            onSelect = this._get(inst, "onSelect");
            if (onSelect) {
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
            } else if (inst.input) {
                inst.input.trigger("change")
            }
            if (inst.inline) {
                this._updateDatepicker(inst)
            } else {
                this._hideDatepicker();
                this._lastInput = inst.input[0];
                if (typeof(inst.input[0]) !== "object") {
                    inst.input.focus()
                }
                this._lastInput = null
            }
        },
        _updateAlternate: function(inst) {
            var altFormat, date, dateStr, altField = this._get(inst, "altField");
            if (altField) {
                altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
                date = this._getDate(inst);
                dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function() {
                    $(this).val(dateStr)
                })
            }
        },
        noWeekends: function(date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ""]
        },
        iso8601Week: function(date) {
            var time, checkDate = new Date(date.getTime());
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1
        },
        parseDate: function(format, value, settings) {
            if (format == null || value == null) {
                throw "Invalid arguments"
            }
            value = (typeof value === "object" ? value.toString() : value + "");
            if (value === "") {
                return null
            }
            var iFormat, dim, extra, iValue = 0,
            shortYearCutoffTemp = (settings ? settings.shortYearCutoff: null) || this._defaults.shortYearCutoff,
            shortYearCutoff = (typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp: new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10)),
            dayNamesShort = (settings ? settings.dayNamesShort: null) || this._defaults.dayNamesShort,
            dayNames = (settings ? settings.dayNames: null) || this._defaults.dayNames,
            monthNamesShort = (settings ? settings.monthNamesShort: null) || this._defaults.monthNamesShort,
            monthNames = (settings ? settings.monthNames: null) || this._defaults.monthNames,
            year = -1,
            month = -1,
            day = -1,
            doy = -1,
            literal = false,
            date,
            lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                if (matches) {
                    iFormat++
                }
                return matches
            },
            getNumber = function(match) {
                var isDoubled = lookAhead(match),
                size = (match === "@" ? 14 : (match === "!" ? 20 : (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
                digits = new RegExp("^\\d{1," + size + "}"),
                num = value.substring(iValue).match(digits);
                if (!num) {
                    throw "Missing number at position " + iValue
                }
                iValue += num[0].length;
                return parseInt(num[0], 10)
            },
            getName = function(match, shortNames, longNames) {
                var index = -1,
                names = $.map(lookAhead(match) ? longNames: shortNames,
                function(v, k) {
                    return [[k, v]]
                }).sort(function(a, b) {
                    return - (a[1].length - b[1].length)
                });
                $.each(names,
                function(i, pair) {
                    var name = pair[1];
                    if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                        index = pair[0];
                        iValue += name.length;
                        return false
                    }
                });
                if (index !== -1) {
                    return index + 1
                } else {
                    throw "Unknown name at position " + iValue
                }
            },
            checkLiteral = function() {
                if (value.charAt(iValue) !== format.charAt(iFormat)) {
                    throw "Unexpected literal at position " + iValue
                }
                iValue++
            };
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        checkLiteral()
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", dayNamesShort, dayNames);
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", monthNamesShort, monthNames);
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        date = new Date(getNumber("@"));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "!":
                        date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral()
                        } else {
                            literal = true
                        }
                        break;
                    default:
                        checkLiteral()
                    }
                }
            }
            if (iValue < value.length) {
                extra = value.substr(iValue);
                if (!/^\s+/.test(extra)) {
                    throw "Extra/unparsed characters found in date: " + extra
                }
            }
            if (year === -1) {
                year = new Date().getFullYear()
            } else if (year < 100) {
                year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim) {
                        break
                    }
                    month++;
                    day -= dim
                } while ( true )
            }
            date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                throw "Invalid date"
            }
            return date
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function(format, date, settings) {
            if (!date) {
                return ""
            }
            var iFormat, dayNamesShort = (settings ? settings.dayNamesShort: null) || this._defaults.dayNamesShort,
            dayNames = (settings ? settings.dayNames: null) || this._defaults.dayNames,
            monthNamesShort = (settings ? settings.monthNamesShort: null) || this._defaults.monthNamesShort,
            monthNames = (settings ? settings.monthNames: null) || this._defaults.monthNames,
            lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                if (matches) {
                    iFormat++
                }
                return matches
            },
            formatNumber = function(match, value, len) {
                var num = "" + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = "0" + num
                    }
                }
                return num
            },
            formatName = function(match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value])
            },
            output = "",
            literal = false;
            if (date) {
                for (iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                            literal = false
                        } else {
                            output += format.charAt(iFormat)
                        }
                    } else {
                        switch (format.charAt(iFormat)) {
                        case "d":
                            output += formatNumber("d", date.getDate(), 2);
                            break;
                        case "D":
                            output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                            break;
                        case "o":
                            output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case "m":
                            output += formatNumber("m", date.getMonth() + 1, 2);
                            break;
                        case "M":
                            output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                            break;
                        case "y":
                            output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0": "") + date.getYear() % 100);
                            break;
                        case "@":
                            output += date.getTime();
                            break;
                        case "!":
                            output += date.getTime() * 10000 + this._ticksTo1970;
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                output += "'"
                            } else {
                                literal = true
                            }
                            break;
                        default:
                            output += format.charAt(iFormat)
                        }
                    }
                }
            }
            return output
        },
        _possibleChars: function(format) {
            var iFormat, chars = "",
            literal = false,
            lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        chars += format.charAt(iFormat)
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        chars += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        if (lookAhead("'")) {
                            chars += "'"
                        } else {
                            literal = true
                        }
                        break;
                    default:
                        chars += format.charAt(iFormat)
                    }
                }
            }
            return chars
        },
        _get: function(inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
        },
        _setDateFromField: function(inst, noDefault) {
            if (inst.input.val() === inst.lastVal) {
                return
            }
            var dateFormat = this._get(inst, "dateFormat"),
            dates = inst.lastVal = inst.input ? inst.input.val() : null,
            defaultDate = this._getDefaultDate(inst),
            date = defaultDate,
            settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate
            } catch(event) {
                dates = (noDefault ? "": dates)
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst)
        },
        _getDefaultDate: function(inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()))
        },
        _determineDate: function(inst, date, defaultDate) {
            var offsetNumeric = function(offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date
            },
            offsetString = function(offset) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
                } catch(e) {}
                var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date(),
                year = date.getFullYear(),
                month = date.getMonth(),
                day = date.getDate(),
                pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || "d") {
                    case "d":
                    case "D":
                        day += parseInt(matches[1], 10);
                        break;
                    case "w":
                    case "W":
                        day += parseInt(matches[1], 10) * 7;
                        break;
                    case "m":
                    case "M":
                        month += parseInt(matches[1], 10);
                        day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                        break;
                    case "y":
                    case "Y":
                        year += parseInt(matches[1], 10);
                        day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                        break
                    }
                    matches = pattern.exec(offset)
                }
                return new Date(year, month, day)
            },
            newDate = (date == null || date === "" ? defaultDate: (typeof date === "string" ? offsetString(date) : (typeof date === "number" ? (isNaN(date) ? defaultDate: offsetNumeric(date)) : new Date(date.getTime()))));
            newDate = (newDate && newDate.toString() === "Invalid Date" ? defaultDate: newDate);
            if (newDate) {
                newDate.setHours(0);
                newDate.setMinutes(0);
                newDate.setSeconds(0);
                newDate.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(newDate)
        },
        _daylightSavingAdjust: function(date) {
            if (!date) {
                return null
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date
        },
        _setDate: function(inst, date, noChange) {
            var clear = !date,
            origMonth = inst.selectedMonth,
            origYear = inst.selectedYear,
            newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
            inst.selectedDay = inst.currentDay = newDate.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
            if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
                this._notifyChange(inst)
            }
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? "": this._formatDate(inst))
            }
        },
        _getDate: function(inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() === "") ? null: this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate
        },
        _attachHandlers: function(inst) {
            var stepMonths = this._get(inst, "stepMonths"),
            id = "#" + inst.id.replace(/\\\\/g, "\\");
            inst.dpDiv.find("[data-handler]").map(function() {
                var handler = {
                    prev: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(id, -stepMonths, "M")
                    },
                    next: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(id, +stepMonths, "M")
                    },
                    hide: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
                    },
                    today: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._gotoToday(id)
                    },
                    selectDay: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                        return false
                    },
                    selectMonth: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(id, this, "M");
                        return false
                    },
                    selectYear: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(id, this, "Y");
                        return false
                    }
                };
                $(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(inst) {
            var maxDraw, prevText, prev, nextText, next, currentText, gotoDate, controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin, monthNames, monthNamesShort, beforeShowDay, showOtherMonths, selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate, cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows, printDate, dRow, tbody, daySettings, otherMonth, unselectable, tempDate = new Date(),
            today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())),
            isRTL = this._get(inst, "isRTL"),
            showButtonPanel = this._get(inst, "showButtonPanel"),
            hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
            navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
            numMonths = this._getNumberOfMonths(inst),
            showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
            stepMonths = this._get(inst, "stepMonths"),
            isMultiMonth = (numMonths[0] !== 1 || numMonths[1] !== 1),
            currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay))),
            minDate = this._getMinMaxDate(inst, "min"),
            maxDate = this._getMinMaxDate(inst, "max"),
            drawMonth = inst.drawMonth - showCurrentAtPos,
            drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--
            }
            if (maxDate) {
                maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate: maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            prevText = this._get(inst, "prevText");
            prevText = (!navigationAsDateFormat ? prevText: this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
            prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" + " title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e": "w") + "'>" + prevText + "</span></a>": (hideIfNoPrevNext ? "": "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e": "w") + "'>" + prevText + "</span></a>"));
            nextText = this._get(inst, "nextText");
            nextText = (!navigationAsDateFormat ? nextText: this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
            next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" + " title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w": "e") + "'>" + nextText + "</span></a>": (hideIfNoPrevNext ? "": "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w": "e") + "'>" + nextText + "</span></a>"));
            currentText = this._get(inst, "currentText");
            gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate: today);
            currentText = (!navigationAsDateFormat ? currentText: this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            controls = (!inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>": "");
            buttonPanel = (showButtonPanel) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls: "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" + ">" + currentText + "</button>": "") + (isRTL ? "": controls) + "</div>": "";
            firstDay = parseInt(this._get(inst, "firstDay"), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            showWeek = this._get(inst, "showWeek");
            dayNames = this._get(inst, "dayNames");
            dayNamesMin = this._get(inst, "dayNamesMin");
            monthNames = this._get(inst, "monthNames");
            monthNamesShort = this._get(inst, "monthNamesShort");
            beforeShowDay = this._get(inst, "beforeShowDay");
            showOtherMonths = this._get(inst, "showOtherMonths");
            selectOtherMonths = this._get(inst, "selectOtherMonths");
            defaultDate = this._getDefaultDate(inst);
            html = "";
            dow;
            for (row = 0; row < numMonths[0]; row++) {
                group = "";
                this.maxRows = 4;
                for (col = 0; col < numMonths[1]; col++) {
                    selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    cornerClass = " ui-corner-all";
                    calender = "";
                    if (isMultiMonth) {
                        calender += "<div class='ui-datepicker-group";
                        if (numMonths[1] > 1) {
                            switch (col) {
                            case 0:
                                calender += " ui-datepicker-group-first";
                                cornerClass = " ui-corner-" + (isRTL ? "right": "left");
                                break;
                            case numMonths[1] - 1 : calender += " ui-datepicker-group-last";
                                cornerClass = " ui-corner-" + (isRTL ? "left": "right");
                                break;
                            default:
                                calender += " ui-datepicker-group-middle";
                                cornerClass = "";
                                break
                            }
                        }
                        calender += "'>"
                    }
                    calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && row === 0 ? (isRTL ? next: prev) : "") + (/all|right/.test(cornerClass) && row === 0 ? (isRTL ? prev: next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>";
                    thead = (showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>": "");
                    for (dow = 0; dow < 7; dow++) {
                        day = (dow + firstDay) % 7;
                        thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'": "") + ">" + "<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>"
                    }
                    calender += thead + "</tr></thead><tbody>";
                    daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)
                    }
                    leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    curRows = Math.ceil((leadDays + daysInMonth) / 7);
                    numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows: curRows: curRows);
                    this.maxRows = numRows;
                    printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (dRow = 0; dRow < numRows; dRow++) {
                        calender += "<tr>";
                        tbody = (!showWeek ? "": "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>");
                        for (dow = 0; dow < 7; dow++) {
                            daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
                            otherMonth = (printDate.getMonth() !== drawMonth);
                            unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                            tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end": "") + (otherMonth ? " ui-datepicker-other-month": "") + ((printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime()) ? " " + this._dayOverClass: "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled": "") + (otherMonth && !showOtherMonths ? "": " " + daySettings[1] + (printDate.getTime() === currentDate.getTime() ? " " + this._currentClass: "") + (printDate.getTime() === today.getTime() ? " ui-datepicker-today": "")) + "'" + ((!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2] + "'": "") + (unselectable ? "": " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + (otherMonth && !showOtherMonths ? " ": (unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>": "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight": "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active": "") + (otherMonth ? " ui-priority-secondary": "") + "' href='#'>" + printDate.getDate() + "</a>")) + "</td>";
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate)
                        }
                        calender += tbody + "</tr>"
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++
                    }
                    calender += "</tbody></table>" + (isMultiMonth ? "</div>" + ((numMonths[0] > 0 && col === numMonths[1] - 1) ? "<div class='ui-datepicker-row-break'></div>": "") : "");
                    group += calender
                }
                html += group
            }
            html += buttonPanel;
            inst._keyEvent = false;
            return html
        },
        _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
            var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear, changeMonth = this._get(inst, "changeMonth"),
            changeYear = this._get(inst, "changeYear"),
            showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
            html = "<div class='ui-datepicker-title'>",
            monthHtml = "";
            if (secondary || !changeMonth) {
                monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>"
            } else {
                inMinYear = (minDate && minDate.getFullYear() === drawYear);
                inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
                monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                for (month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                        monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'": "") + ">" + monthNamesShort[month] + "</option>"
                    }
                }
                monthHtml += "</select>"
            }
            if (!showMonthAfterYear) {
                html += monthHtml + (secondary || !(changeMonth && changeYear) ? " ": "")
            }
            if (!inst.yearshtml) {
                inst.yearshtml = "";
                if (secondary || !changeYear) {
                    html += "<span class='ui-datepicker-year'>" + drawYear + "</span>"
                } else {
                    years = this._get(inst, "yearRange").split(":");
                    thisYear = new Date().getFullYear();
                    determineYear = function(value) {
                        var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
                        return (isNaN(year) ? thisYear: year)
                    };
                    year = determineYear(years[0]);
                    endYear = Math.max(year, determineYear(years[1] || ""));
                    year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                    endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                    inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                    for (; year <= endYear; year++) {
                        inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'": "") + ">" + year + "</option>"
                    }
                    inst.yearshtml += "</select>";
                    html += inst.yearshtml;
                    inst.yearshtml = null
                }
            }
            html += this._get(inst, "yearSuffix");
            if (showMonthAfterYear) {
                html += (secondary || !(changeMonth && changeYear) ? " ": "") + monthHtml
            }
            html += "</div>";
            return html
        },
        _adjustInstDate: function(inst, offset, period) {
            var year = inst.drawYear + (period === "Y" ? offset: 0),
            month = inst.drawMonth + (period === "M" ? offset: 0),
            day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset: 0),
            date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period === "M" || period === "Y") {
                this._notifyChange(inst)
            }
        },
        _restrictMinMax: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, "min"),
            maxDate = this._getMinMaxDate(inst, "max"),
            newDate = (minDate && date < minDate ? minDate: date);
            return (maxDate && newDate > maxDate ? maxDate: newDate)
        },
        _notifyChange: function(inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            if (onChange) {
                onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst])
            }
        },
        _getNumberOfMonths: function(inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return (numMonths == null ? [1, 1] : (typeof numMonths === "number" ? [1, numMonths] : numMonths))
        },
        _getMinMaxDate: function(inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
        },
        _getDaysInMonth: function(year, month) {
            return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate()
        },
        _getFirstDayOfMonth: function(year, month) {
            return new Date(year, month, 1).getDay()
        },
        _canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst),
            date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset: numMonths[0] * numMonths[1]), 1));
            if (offset < 0) {
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()))
            }
            return this._isInRange(inst, date)
        },
        _isInRange: function(inst, date) {
            var yearSplit, currentYear, minDate = this._getMinMaxDate(inst, "min"),
            maxDate = this._getMinMaxDate(inst, "max"),
            minYear = null,
            maxYear = null,
            years = this._get(inst, "yearRange");
            if (years) {
                yearSplit = years.split(":");
                currentYear = new Date().getFullYear();
                minYear = parseInt(yearSplit[0], 10) + currentYear;
                maxYear = parseInt(yearSplit[1], 10) + currentYear
            }
            return ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear))
        },
        _getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            shortYearCutoff = (typeof shortYearCutoff !== "string" ? shortYearCutoff: new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            }
        },
        _formatDate: function(inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear
            }
            var date = (day ? (typeof day === "object" ? day: this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
        }
    });
    function bindHover(dpDiv) {
        var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return dpDiv.delegate(selector, "mouseout",
        function() {
            $(this).removeClass("ui-state-hover");
            if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                $(this).removeClass("ui-datepicker-prev-hover")
            }
            if (this.className.indexOf("ui-datepicker-next") !== -1) {
                $(this).removeClass("ui-datepicker-next-hover")
            }
        }).delegate(selector, "mouseover",
        function() {
            if (!$.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {
                $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                $(this).addClass("ui-state-hover");
                if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                    $(this).addClass("ui-datepicker-prev-hover")
                }
                if (this.className.indexOf("ui-datepicker-next") !== -1) {
                    $(this).addClass("ui-datepicker-next-hover")
                }
            }
        })
    }
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null) {
                target[name] = props[name]
            }
        }
        return target
    }
    $.fn.datepicker = function(options) {
        if (!this.length) {
            return this
        }
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick);
            $.datepicker.initialized = true
        }
        if ($("#" + $.datepicker._mainDivId).length === 0) {
            $("body").append($.datepicker.dpDiv)
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        return this.each(function() {
            typeof options === "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        })
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.10.0";
    window["DP_jQuery_" + dpuuid] = $
})(jQuery); (function($) {
    $.ui.timepicker = $.ui.timepicker || {};
    if ($.ui.timepicker.version) {
        return
    }
    $.extend($.ui, {
        timepicker: {
            version: "1.1.1"
        }
    });
    function Timepicker() {
        this.regional = [];
        this.regional[''] = {
            currentText: 'Now',
            closeText: 'Done',
            amNames: ['AM', 'A'],
            pmNames: ['PM', 'P'],
            timeFormat: 'HH:mm',
            timeSuffix: '',
            timeOnlyTitle: 'Choose Time',
            timeText: 'Time',
            hourText: 'Hour',
            minuteText: 'Minute',
            secondText: 'Second',
            millisecText: 'Millisecond',
            timezoneText: 'Time Zone',
            isRTL: false
        };
        this._defaults = {
            showButtonPanel: true,
            timeOnly: false,
            showHour: true,
            showMinute: true,
            showSecond: false,
            showMillisec: false,
            showTimezone: false,
            showTime: true,
            stepHour: 1,
            stepMinute: 1,
            stepSecond: 1,
            stepMillisec: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            timezone: null,
            useLocalTimezone: false,
            defaultTimezone: "+0000",
            hourMin: 0,
            minuteMin: 0,
            secondMin: 0,
            millisecMin: 0,
            hourMax: 23,
            minuteMax: 59,
            secondMax: 59,
            millisecMax: 999,
            minDateTime: null,
            maxDateTime: null,
            onSelect: null,
            hourGrid: 0,
            minuteGrid: 0,
            secondGrid: 0,
            millisecGrid: 0,
            alwaysSetTime: true,
            separator: ' ',
            altFieldTimeOnly: true,
            altTimeFormat: null,
            altSeparator: null,
            altTimeSuffix: null,
            pickerTimeFormat: null,
            pickerTimeSuffix: null,
            showTimepicker: true,
            timezoneIso8601: false,
            timezoneList: null,
            addSliderAccess: false,
            sliderAccessArgs: null,
            controlType: 'slider',
            defaultValue: null,
            parse: 'strict'
        };
        $.extend(this._defaults, this.regional[''])
    }
    $.extend(Timepicker.prototype, {
        $input: null,
        $altInput: null,
        $timeObj: null,
        inst: null,
        hour_slider: null,
        minute_slider: null,
        second_slider: null,
        millisec_slider: null,
        timezone_select: null,
        hour: 0,
        minute: 0,
        second: 0,
        millisec: 0,
        timezone: null,
        defaultTimezone: "+0000",
        hourMinOriginal: null,
        minuteMinOriginal: null,
        secondMinOriginal: null,
        millisecMinOriginal: null,
        hourMaxOriginal: null,
        minuteMaxOriginal: null,
        secondMaxOriginal: null,
        millisecMaxOriginal: null,
        ampm: '',
        formattedDate: '',
        formattedTime: '',
        formattedDateTime: '',
        timezoneList: null,
        units: ['hour', 'minute', 'second', 'millisec'],
        control: null,
        setDefaults: function(settings) {
            extendRemove(this._defaults, settings || {});
            return this
        },
        _newInst: function($input, o) {
            var tp_inst = new Timepicker(),
            inlineSettings = {},
            fns = {},
            overrides,
            i;
            for (var attrName in this._defaults) {
                if (this._defaults.hasOwnProperty(attrName)) {
                    var attrValue = $input.attr('time:' + attrName);
                    if (attrValue) {
                        try {
                            inlineSettings[attrName] = eval(attrValue)
                        } catch(err) {
                            inlineSettings[attrName] = attrValue
                        }
                    }
                }
            }
            overrides = {
                beforeShow: function(input, dp_inst) {
                    if ($.isFunction(tp_inst._defaults.evnts.beforeShow)) {
                        return tp_inst._defaults.evnts.beforeShow.call($input[0], input, dp_inst, tp_inst)
                    }
                },
                onChangeMonthYear: function(year, month, dp_inst) {
                    tp_inst._updateDateTime(dp_inst);
                    if ($.isFunction(tp_inst._defaults.evnts.onChangeMonthYear)) {
                        tp_inst._defaults.evnts.onChangeMonthYear.call($input[0], year, month, dp_inst, tp_inst)
                    }
                },
                onClose: function(dateText, dp_inst) {
                    if (tp_inst.timeDefined === true && $input.val() !== '') {
                        tp_inst._updateDateTime(dp_inst)
                    }
                    if ($.isFunction(tp_inst._defaults.evnts.onClose)) {
                        tp_inst._defaults.evnts.onClose.call($input[0], dateText, dp_inst, tp_inst)
                    }
                }
            };
            for (i in overrides) {
                if (overrides.hasOwnProperty(i)) {
                    fns[i] = o[i] || null
                }
            }
            tp_inst._defaults = $.extend({},
            this._defaults, inlineSettings, o, overrides, {
                evnts: fns,
                timepicker: tp_inst
            });
            tp_inst.amNames = $.map(tp_inst._defaults.amNames,
            function(val) {
                return val.toUpperCase()
            });
            tp_inst.pmNames = $.map(tp_inst._defaults.pmNames,
            function(val) {
                return val.toUpperCase()
            });
            if (typeof(tp_inst._defaults.controlType) === 'string') {
                if ($.fn[tp_inst._defaults.controlType] === undefined) {
                    tp_inst._defaults.controlType = 'select'
                }
                tp_inst.control = tp_inst._controls[tp_inst._defaults.controlType]
            } else {
                tp_inst.control = tp_inst._defaults.controlType
            }
            if (tp_inst._defaults.timezoneList === null) {
                var timezoneList = ['-1200', '-1100', '-1000', '-0930', '-0900', '-0800', '-0700', '-0600', '-0500', '-0430', '-0400', '-0330', '-0300', '-0200', '-0100', '+0000', '+0100', '+0200', '+0300', '+0330', '+0400', '+0430', '+0500', '+0530', '+0545', '+0600', '+0630', '+0700', '+0800', '+0845', '+0900', '+0930', '+1000', '+1030', '+1100', '+1130', '+1200', '+1245', '+1300', '+1400'];
                if (tp_inst._defaults.timezoneIso8601) {
                    timezoneList = $.map(timezoneList,
                    function(val) {
                        return val == '+0000' ? 'Z': (val.substring(0, 3) + ':' + val.substring(3))
                    })
                }
                tp_inst._defaults.timezoneList = timezoneList
            }
            tp_inst.timezone = tp_inst._defaults.timezone;
            tp_inst.hour = tp_inst._defaults.hour;
            tp_inst.minute = tp_inst._defaults.minute;
            tp_inst.second = tp_inst._defaults.second;
            tp_inst.millisec = tp_inst._defaults.millisec;
            tp_inst.ampm = '';
            tp_inst.$input = $input;
            if (o.altField) {
                tp_inst.$altInput = $(o.altField).css({
                    cursor: 'pointer'
                }).focus(function() {
                    $input.trigger("focus")
                })
            }
            if (tp_inst._defaults.minDate === 0 || tp_inst._defaults.minDateTime === 0) {
                tp_inst._defaults.minDate = new Date()
            }
            if (tp_inst._defaults.maxDate === 0 || tp_inst._defaults.maxDateTime === 0) {
                tp_inst._defaults.maxDate = new Date()
            }
            if (tp_inst._defaults.minDate !== undefined && tp_inst._defaults.minDate instanceof Date) {
                tp_inst._defaults.minDateTime = new Date(tp_inst._defaults.minDate.getTime())
            }
            if (tp_inst._defaults.minDateTime !== undefined && tp_inst._defaults.minDateTime instanceof Date) {
                tp_inst._defaults.minDate = new Date(tp_inst._defaults.minDateTime.getTime())
            }
            if (tp_inst._defaults.maxDate !== undefined && tp_inst._defaults.maxDate instanceof Date) {
                tp_inst._defaults.maxDateTime = new Date(tp_inst._defaults.maxDate.getTime())
            }
            if (tp_inst._defaults.maxDateTime !== undefined && tp_inst._defaults.maxDateTime instanceof Date) {
                tp_inst._defaults.maxDate = new Date(tp_inst._defaults.maxDateTime.getTime())
            }
            tp_inst.$input.bind('focus',
            function() {
                tp_inst._onFocus()
            });
            return tp_inst
        },
        _addTimePicker: function(dp_inst) {
            var currDT = (this.$altInput && this._defaults.altFieldTimeOnly) ? this.$input.val() + ' ' + this.$altInput.val() : this.$input.val();
            this.timeDefined = this._parseTime(currDT);
            this._limitMinMaxDateTime(dp_inst, false);
            this._injectTimePicker()
        },
        _parseTime: function(timeString, withDate) {
            if (!this.inst) {
                this.inst = $.datepicker._getInst(this.$input[0])
            }
            if (withDate || !this._defaults.timeOnly) {
                var dp_dateFormat = $.datepicker._get(this.inst, 'dateFormat');
                try {
                    var parseRes = parseDateTimeInternal(dp_dateFormat, this._defaults.timeFormat, timeString, $.datepicker._getFormatConfig(this.inst), this._defaults);
                    if (!parseRes.timeObj) {
                        return false
                    }
                    $.extend(this, parseRes.timeObj)
                } catch(err) {
                    $.datepicker.log("Error parsing the date/time string: " + err + "\ndate/time string = " + timeString + "\ntimeFormat = " + this._defaults.timeFormat + "\ndateFormat = " + dp_dateFormat);
                    return false
                }
                return true
            } else {
                var timeObj = $.datepicker.parseTime(this._defaults.timeFormat, timeString, this._defaults);
                if (!timeObj) {
                    return false
                }
                $.extend(this, timeObj);
                return true
            }
        },
        _injectTimePicker: function() {
            var $dp = this.inst.dpDiv,
            o = this.inst.settings,
            tp_inst = this,
            litem = '',
            uitem = '',
            max = {},
            gridSize = {},
            size = null;
            if ($dp.find("div.ui-timepicker-div").length === 0 && o.showTimepicker) {
                var noDisplay = ' style="display:none;"',
                html = '<div class="ui-timepicker-div' + (o.isRTL ? ' ui-timepicker-rtl': '') + '"><dl>' + '<dt class="ui_tpicker_time_label"' + ((o.showTime) ? '': noDisplay) + '>' + o.timeText + '</dt>' + '<dd class="ui_tpicker_time"' + ((o.showTime) ? '': noDisplay) + '></dd>';
                for (var i = 0,
                l = this.units.length; i < l; i++) {
                    litem = this.units[i];
                    uitem = litem.substr(0, 1).toUpperCase() + litem.substr(1);
                    max[litem] = parseInt((o[litem + 'Max'] - ((o[litem + 'Max'] - o[litem + 'Min']) % o['step' + uitem])), 10);
                    gridSize[litem] = 0;
                    html += '<dt class="ui_tpicker_' + litem + '_label"' + ((o['show' + uitem]) ? '': noDisplay) + '>' + o[litem + 'Text'] + '</dt>' + '<dd class="ui_tpicker_' + litem + '"><div class="ui_tpicker_' + litem + '_slider"' + ((o['show' + uitem]) ? '': noDisplay) + '></div>';
                    if (o['show' + uitem] && o[litem + 'Grid'] > 0) {
                        html += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';
                        if (litem == 'hour') {
                            for (var h = o[litem + 'Min']; h <= max[litem]; h += parseInt(o[litem + 'Grid'], 10)) {
                                gridSize[litem]++;
                                var tmph = $.datepicker.formatTime(useAmpm(o.pickerTimeFormat || o.timeFormat) ? 'hht': 'HH', {
                                    hour: h
                                },
                                o);
                                html += '<td data-for="' + litem + '">' + tmph + '</td>'
                            }
                        } else {
                            for (var m = o[litem + 'Min']; m <= max[litem]; m += parseInt(o[litem + 'Grid'], 10)) {
                                gridSize[litem]++;
                                html += '<td data-for="' + litem + '">' + ((m < 10) ? '0': '') + m + '</td>'
                            }
                        }
                        html += '</tr></table></div>'
                    }
                    html += '</dd>'
                }
                html += '<dt class="ui_tpicker_timezone_label"' + ((o.showTimezone) ? '': noDisplay) + '>' + o.timezoneText + '</dt>';
                html += '<dd class="ui_tpicker_timezone" ' + ((o.showTimezone) ? '': noDisplay) + '></dd>';
                html += '</dl></div>';
                var $tp = $(html);
                if (o.timeOnly === true) {
                    $tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all">' + '<div class="ui-datepicker-title">' + o.timeOnlyTitle + '</div>' + '</div>');
                    $dp.find('.ui-datepicker-header, .ui-datepicker-calendar').hide()
                }
                for (var i = 0,
                l = tp_inst.units.length; i < l; i++) {
                    litem = tp_inst.units[i];
                    uitem = litem.substr(0, 1).toUpperCase() + litem.substr(1);
                    tp_inst[litem + '_slider'] = tp_inst.control.create(tp_inst, $tp.find('.ui_tpicker_' + litem + '_slider'), litem, tp_inst[litem], o[litem + 'Min'], max[litem], o['step' + uitem]);
                    if (o['show' + uitem] && o[litem + 'Grid'] > 0) {
                        size = 100 * gridSize[litem] * o[litem + 'Grid'] / (max[litem] - o[litem + 'Min']);
                        $tp.find('.ui_tpicker_' + litem + ' table').css({
                            width: size + "%",
                            marginLeft: o.isRTL ? '0': ((size / ( - 2 * gridSize[litem])) + "%"),
                            marginRight: o.isRTL ? ((size / ( - 2 * gridSize[litem])) + "%") : '0',
                            borderCollapse: 'collapse'
                        }).find("td").click(function(e) {
                            var $t = $(this),
                            h = $t.html(),
                            n = parseInt(h.replace(/[^0-9]/g), 10),
                            ap = h.replace(/[^apm]/ig),
                            f = $t.data('for');
                            if (f == 'hour') {
                                if (ap.indexOf('p') !== -1 && n < 12) {
                                    n += 12
                                } else {
                                    if (ap.indexOf('a') !== -1 && n === 12) {
                                        n = 0
                                    }
                                }
                            }
                            tp_inst.control.value(tp_inst, tp_inst[f + '_slider'], litem, n);
                            tp_inst._onTimeChange();
                            tp_inst._onSelectHandler()
                        }).css({
                            cursor: 'pointer',
                            width: (100 / gridSize[litem]) + '%',
                            textAlign: 'center',
                            overflow: 'hidden'
                        })
                    }
                }
                this.timezone_select = $tp.find('.ui_tpicker_timezone').append('<select></select>').find("select");
                $.fn.append.apply(this.timezone_select, $.map(o.timezoneList,
                function(val, idx) {
                    return $("<option ></option>").val(typeof val == "object" ? val.value: val).text(typeof val == "object" ? val.label: val)
                }));
                if (typeof(this.timezone) != "undefined" && this.timezone !== null && this.timezone !== "") {
                    var local_date = new Date(this.inst.selectedYear, this.inst.selectedMonth, this.inst.selectedDay, 12);
                    var local_timezone = $.timepicker.timeZoneOffsetString(local_date);
                    if (local_timezone == this.timezone) {
                        selectLocalTimeZone(tp_inst)
                    } else {
                        this.timezone_select.val(this.timezone)
                    }
                } else {
                    if (typeof(this.hour) != "undefined" && this.hour !== null && this.hour !== "") {
                        this.timezone_select.val(o.defaultTimezone)
                    } else {
                        selectLocalTimeZone(tp_inst)
                    }
                }
                this.timezone_select.change(function() {
                    tp_inst._defaults.useLocalTimezone = false;
                    tp_inst._onTimeChange()
                });
                var $buttonPanel = $dp.find('.ui-datepicker-buttonpane');
                if ($buttonPanel.length) {
                    $buttonPanel.before($tp)
                } else {
                    $dp.append($tp)
                }
                this.$timeObj = $tp.find('.ui_tpicker_time');
                if (this.inst !== null) {
                    var timeDefined = this.timeDefined;
                    this._onTimeChange();
                    this.timeDefined = timeDefined
                }
                if (this._defaults.addSliderAccess) {
                    var sliderAccessArgs = this._defaults.sliderAccessArgs,
                    rtl = this._defaults.isRTL;
                    sliderAccessArgs.isRTL = rtl;
                    setTimeout(function() {
                        if ($tp.find('.ui-slider-access').length === 0) {
                            $tp.find('.ui-slider:visible').sliderAccess(sliderAccessArgs);
                            var sliderAccessWidth = $tp.find('.ui-slider-access:eq(0)').outerWidth(true);
                            if (sliderAccessWidth) {
                                $tp.find('table:visible').each(function() {
                                    var $g = $(this),
                                    oldWidth = $g.outerWidth(),
                                    oldMarginLeft = $g.css(rtl ? 'marginRight': 'marginLeft').toString().replace('%', ''),
                                    newWidth = oldWidth - sliderAccessWidth,
                                    newMarginLeft = ((oldMarginLeft * newWidth) / oldWidth) + '%',
                                    css = {
                                        width: newWidth,
                                        marginRight: 0,
                                        marginLeft: 0
                                    };
                                    css[rtl ? 'marginRight': 'marginLeft'] = newMarginLeft;
                                    $g.css(css)
                                })
                            }
                        }
                    },
                    10)
                }
            }
        },
        _limitMinMaxDateTime: function(dp_inst, adjustSliders) {
            var o = this._defaults,
            dp_date = new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay);
            if (!this._defaults.showTimepicker) {
                return
            }
            if ($.datepicker._get(dp_inst, 'minDateTime') !== null && $.datepicker._get(dp_inst, 'minDateTime') !== undefined && dp_date) {
                var minDateTime = $.datepicker._get(dp_inst, 'minDateTime'),
                minDateTimeDate = new Date(minDateTime.getFullYear(), minDateTime.getMonth(), minDateTime.getDate(), 0, 0, 0, 0);
                if (this.hourMinOriginal === null || this.minuteMinOriginal === null || this.secondMinOriginal === null || this.millisecMinOriginal === null) {
                    this.hourMinOriginal = o.hourMin;
                    this.minuteMinOriginal = o.minuteMin;
                    this.secondMinOriginal = o.secondMin;
                    this.millisecMinOriginal = o.millisecMin
                }
                if (dp_inst.settings.timeOnly || minDateTimeDate.getTime() == dp_date.getTime()) {
                    this._defaults.hourMin = minDateTime.getHours();
                    if (this.hour <= this._defaults.hourMin) {
                        this.hour = this._defaults.hourMin;
                        this._defaults.minuteMin = minDateTime.getMinutes();
                        if (this.minute <= this._defaults.minuteMin) {
                            this.minute = this._defaults.minuteMin;
                            this._defaults.secondMin = minDateTime.getSeconds();
                            if (this.second <= this._defaults.secondMin) {
                                this.second = this._defaults.secondMin;
                                this._defaults.millisecMin = minDateTime.getMilliseconds()
                            } else {
                                if (this.millisec < this._defaults.millisecMin) {
                                    this.millisec = this._defaults.millisecMin
                                }
                                this._defaults.millisecMin = this.millisecMinOriginal
                            }
                        } else {
                            this._defaults.secondMin = this.secondMinOriginal;
                            this._defaults.millisecMin = this.millisecMinOriginal
                        }
                    } else {
                        this._defaults.minuteMin = this.minuteMinOriginal;
                        this._defaults.secondMin = this.secondMinOriginal;
                        this._defaults.millisecMin = this.millisecMinOriginal
                    }
                } else {
                    this._defaults.hourMin = this.hourMinOriginal;
                    this._defaults.minuteMin = this.minuteMinOriginal;
                    this._defaults.secondMin = this.secondMinOriginal;
                    this._defaults.millisecMin = this.millisecMinOriginal
                }
            }
            if ($.datepicker._get(dp_inst, 'maxDateTime') !== null && $.datepicker._get(dp_inst, 'maxDateTime') !== undefined && dp_date) {
                var maxDateTime = $.datepicker._get(dp_inst, 'maxDateTime'),
                maxDateTimeDate = new Date(maxDateTime.getFullYear(), maxDateTime.getMonth(), maxDateTime.getDate(), 0, 0, 0, 0);
                if (this.hourMaxOriginal === null || this.minuteMaxOriginal === null || this.secondMaxOriginal === null) {
                    this.hourMaxOriginal = o.hourMax;
                    this.minuteMaxOriginal = o.minuteMax;
                    this.secondMaxOriginal = o.secondMax;
                    this.millisecMaxOriginal = o.millisecMax
                }
                if (dp_inst.settings.timeOnly || maxDateTimeDate.getTime() == dp_date.getTime()) {
                    this._defaults.hourMax = maxDateTime.getHours();
                    if (this.hour >= this._defaults.hourMax) {
                        this.hour = this._defaults.hourMax;
                        this._defaults.minuteMax = maxDateTime.getMinutes();
                        if (this.minute >= this._defaults.minuteMax) {
                            this.minute = this._defaults.minuteMax;
                            this._defaults.secondMax = maxDateTime.getSeconds()
                        } else if (this.second >= this._defaults.secondMax) {
                            this.second = this._defaults.secondMax;
                            this._defaults.millisecMax = maxDateTime.getMilliseconds()
                        } else {
                            if (this.millisec > this._defaults.millisecMax) {
                                this.millisec = this._defaults.millisecMax
                            }
                            this._defaults.millisecMax = this.millisecMaxOriginal
                        }
                    } else {
                        this._defaults.minuteMax = this.minuteMaxOriginal;
                        this._defaults.secondMax = this.secondMaxOriginal;
                        this._defaults.millisecMax = this.millisecMaxOriginal
                    }
                } else {
                    this._defaults.hourMax = this.hourMaxOriginal;
                    this._defaults.minuteMax = this.minuteMaxOriginal;
                    this._defaults.secondMax = this.secondMaxOriginal;
                    this._defaults.millisecMax = this.millisecMaxOriginal
                }
            }
            if (adjustSliders !== undefined && adjustSliders === true) {
                var hourMax = parseInt((this._defaults.hourMax - ((this._defaults.hourMax - this._defaults.hourMin) % this._defaults.stepHour)), 10),
                minMax = parseInt((this._defaults.minuteMax - ((this._defaults.minuteMax - this._defaults.minuteMin) % this._defaults.stepMinute)), 10),
                secMax = parseInt((this._defaults.secondMax - ((this._defaults.secondMax - this._defaults.secondMin) % this._defaults.stepSecond)), 10),
                millisecMax = parseInt((this._defaults.millisecMax - ((this._defaults.millisecMax - this._defaults.millisecMin) % this._defaults.stepMillisec)), 10);
                if (this.hour_slider) {
                    this.control.options(this, this.hour_slider, 'hour', {
                        min: this._defaults.hourMin,
                        max: hourMax
                    });
                    this.control.value(this, this.hour_slider, 'hour', this.hour)
                }
                if (this.minute_slider) {
                    this.control.options(this, this.minute_slider, 'minute', {
                        min: this._defaults.minuteMin,
                        max: minMax
                    });
                    this.control.value(this, this.minute_slider, 'minute', this.minute)
                }
                if (this.second_slider) {
                    this.control.options(this, this.second_slider, 'second', {
                        min: this._defaults.secondMin,
                        max: secMax
                    });
                    this.control.value(this, this.second_slider, 'second', this.second)
                }
                if (this.millisec_slider) {
                    this.control.options(this, this.millisec_slider, 'millisec', {
                        min: this._defaults.millisecMin,
                        max: millisecMax
                    });
                    this.control.value(this, this.millisec_slider, 'millisec', this.millisec)
                }
            }
        },
        _onTimeChange: function() {
            var hour = (this.hour_slider) ? this.control.value(this, this.hour_slider, 'hour') : false,
            minute = (this.minute_slider) ? this.control.value(this, this.minute_slider, 'minute') : false,
            second = (this.second_slider) ? this.control.value(this, this.second_slider, 'second') : false,
            millisec = (this.millisec_slider) ? this.control.value(this, this.millisec_slider, 'millisec') : false,
            timezone = (this.timezone_select) ? this.timezone_select.val() : false,
            o = this._defaults,
            pickerTimeFormat = o.pickerTimeFormat || o.timeFormat,
            pickerTimeSuffix = o.pickerTimeSuffix || o.timeSuffix;
            if (typeof(hour) == 'object') {
                hour = false
            }
            if (typeof(minute) == 'object') {
                minute = false
            }
            if (typeof(second) == 'object') {
                second = false
            }
            if (typeof(millisec) == 'object') {
                millisec = false
            }
            if (typeof(timezone) == 'object') {
                timezone = false
            }
            if (hour !== false) {
                hour = parseInt(hour, 10)
            }
            if (minute !== false) {
                minute = parseInt(minute, 10)
            }
            if (second !== false) {
                second = parseInt(second, 10)
            }
            if (millisec !== false) {
                millisec = parseInt(millisec, 10)
            }
            var ampm = o[hour < 12 ? 'amNames': 'pmNames'][0];
            var hasChanged = (hour != this.hour || minute != this.minute || second != this.second || millisec != this.millisec || (this.ampm.length > 0 && (hour < 12) != ($.inArray(this.ampm.toUpperCase(), this.amNames) !== -1)) || ((this.timezone === null && timezone != this.defaultTimezone) || (this.timezone !== null && timezone != this.timezone)));
            if (hasChanged) {
                if (hour !== false) {
                    this.hour = hour
                }
                if (minute !== false) {
                    this.minute = minute
                }
                if (second !== false) {
                    this.second = second
                }
                if (millisec !== false) {
                    this.millisec = millisec
                }
                if (timezone !== false) {
                    this.timezone = timezone
                }
                if (!this.inst) {
                    this.inst = $.datepicker._getInst(this.$input[0])
                }
                this._limitMinMaxDateTime(this.inst, true)
            }
            if (useAmpm(o.timeFormat)) {
                this.ampm = ampm
            }
            this.formattedTime = $.datepicker.formatTime(o.timeFormat, this, o);
            if (this.$timeObj) {
                if (pickerTimeFormat === o.timeFormat) {
                    this.$timeObj.text(this.formattedTime + pickerTimeSuffix)
                } else {
                    this.$timeObj.text($.datepicker.formatTime(pickerTimeFormat, this, o) + pickerTimeSuffix)
                }
            }
            this.timeDefined = true;
            if (hasChanged) {
                this._updateDateTime()
            }
        },
        _onSelectHandler: function() {
            var onSelect = this._defaults.onSelect || this.inst.settings.onSelect;
            var inputEl = this.$input ? this.$input[0] : null;
            if (onSelect && inputEl) {
                onSelect.apply(inputEl, [this.formattedDateTime, this])
            }
        },
        _updateDateTime: function(dp_inst) {
            dp_inst = this.inst || dp_inst;
            var dt = $.datepicker._daylightSavingAdjust(new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay)),
            dateFmt = $.datepicker._get(dp_inst, 'dateFormat'),
            formatCfg = $.datepicker._getFormatConfig(dp_inst),
            timeAvailable = dt !== null && this.timeDefined;
            this.formattedDate = $.datepicker.formatDate(dateFmt, (dt === null ? new Date() : dt), formatCfg);
            var formattedDateTime = this.formattedDate;
            if (this._defaults.timeOnly === true) {
                formattedDateTime = this.formattedTime
            } else if (this._defaults.timeOnly !== true && (this._defaults.alwaysSetTime || timeAvailable)) {
                formattedDateTime += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix
            }
            this.formattedDateTime = formattedDateTime;
            if (!this._defaults.showTimepicker) {
                this.$input.val(this.formattedDate)
            } else if (this.$altInput && this._defaults.altFieldTimeOnly === true) {
                this.$altInput.val(this.formattedTime);
                this.$input.val(this.formattedDate)
            } else if (this.$altInput) {
                this.$input.val(formattedDateTime);
                var altFormattedDateTime = '',
                altSeparator = this._defaults.altSeparator ? this._defaults.altSeparator: this._defaults.separator,
                altTimeSuffix = this._defaults.altTimeSuffix ? this._defaults.altTimeSuffix: this._defaults.timeSuffix;
                if (this._defaults.altFormat) altFormattedDateTime = $.datepicker.formatDate(this._defaults.altFormat, (dt === null ? new Date() : dt), formatCfg);
                else altFormattedDateTime = this.formattedDate;
                if (altFormattedDateTime) altFormattedDateTime += altSeparator;
                if (this._defaults.altTimeFormat) altFormattedDateTime += $.datepicker.formatTime(this._defaults.altTimeFormat, this, this._defaults) + altTimeSuffix;
                else altFormattedDateTime += this.formattedTime + altTimeSuffix;
                this.$altInput.val(altFormattedDateTime)
            } else {
                this.$input.val(formattedDateTime)
            }
            this.$input.trigger("change")
        },
        _onFocus: function() {
            if (!this.$input.val() && this._defaults.defaultValue) {
                this.$input.val(this._defaults.defaultValue);
                var inst = $.datepicker._getInst(this.$input.get(0)),
                tp_inst = $.datepicker._get(inst, 'timepicker');
                if (tp_inst) {
                    if (tp_inst._defaults.timeOnly && (inst.input.val() != inst.lastVal)) {
                        try {
                            $.datepicker._updateDatepicker(inst)
                        } catch(err) {
                            $.datepicker.log(err)
                        }
                    }
                }
            }
        },
        _controls: {
            slider: {
                create: function(tp_inst, obj, unit, val, min, max, step) {
                    var rtl = tp_inst._defaults.isRTL;
                    return obj.prop('slide', null).slider({
                        orientation: "horizontal",
                        value: rtl ? val * -1 : val,
                        min: rtl ? max * -1 : min,
                        max: rtl ? min * -1 : max,
                        step: step,
                        slide: function(event, ui) {
                            tp_inst.control.value(tp_inst, $(this), unit, rtl ? ui.value * -1 : ui.value);
                            tp_inst._onTimeChange()
                        },
                        stop: function(event, ui) {
                            tp_inst._onSelectHandler()
                        }
                    })
                },
                options: function(tp_inst, obj, unit, opts, val) {
                    if (tp_inst._defaults.isRTL) {
                        if (typeof(opts) == 'string') {
                            if (opts == 'min' || opts == 'max') {
                                if (val !== undefined) return obj.slider(opts, val * -1);
                                return Math.abs(obj.slider(opts))
                            }
                            return obj.slider(opts)
                        }
                        var min = opts.min,
                        max = opts.max;
                        opts.min = opts.max = null;
                        if (min !== undefined) opts.max = min * -1;
                        if (max !== undefined) opts.min = max * -1;
                        return obj.slider(opts)
                    }
                    if (typeof(opts) == 'string' && val !== undefined) return obj.slider(opts, val);
                    return obj.slider(opts)
                },
                value: function(tp_inst, obj, unit, val) {
                    if (tp_inst._defaults.isRTL) {
                        if (val !== undefined) return obj.slider('value', val * -1);
                        return Math.abs(obj.slider('value'))
                    }
                    if (val !== undefined) return obj.slider('value', val);
                    return obj.slider('value')
                }
            },
            select: {
                create: function(tp_inst, obj, unit, val, min, max, step) {
                    var sel = '<select class="ui-timepicker-select" data-unit="' + unit + '" data-min="' + min + '" data-max="' + max + '" data-step="' + step + '">',
                    ul = tp_inst._defaults.timeFormat.indexOf('t') !== -1 ? 'toLowerCase': 'toUpperCase',
                    m = 0;
                    for (var i = min; i <= max; i += step) {
                        sel += '<option value="' + i + '"' + (i == val ? ' selected': '') + '>';
                        if (unit == 'hour' && useAmpm(tp_inst._defaults.pickerTimeFormat || tp_inst._defaults.timeFormat)) sel += $.datepicker.formatTime("hh TT", {
                            hour: i
                        },
                        tp_inst._defaults);
                        else if (unit == 'millisec' || i >= 10) sel += i;
                        else sel += '0' + i.toString();
                        sel += '</option>'
                    }
                    sel += '</select>';
                    obj.children('select').remove();
                    $(sel).appendTo(obj).change(function(e) {
                        tp_inst._onTimeChange();
                        tp_inst._onSelectHandler()
                    });
                    return obj
                },
                options: function(tp_inst, obj, unit, opts, val) {
                    var o = {},
                    $t = obj.children('select');
                    if (typeof(opts) == 'string') {
                        if (val === undefined) return $t.data(opts);
                        o[opts] = val
                    } else o = opts;
                    return tp_inst.control.create(tp_inst, obj, $t.data('unit'), $t.val(), o.min || $t.data('min'), o.max || $t.data('max'), o.step || $t.data('step'))
                },
                value: function(tp_inst, obj, unit, val) {
                    var $t = obj.children('select');
                    if (val !== undefined) return $t.val(val);
                    return $t.val()
                }
            }
        }
    });
    $.fn.extend({
        timepicker: function(o) {
            o = o || {};
            var tmp_args = Array.prototype.slice.call(arguments);
            if (typeof o == 'object') {
                tmp_args[0] = $.extend(o, {
                    timeOnly: true
                })
            }
            return $(this).each(function() {
                $.fn.datetimepicker.apply($(this), tmp_args)
            })
        },
        datetimepicker: function(o) {
            o = o || {};
            var tmp_args = arguments;
            if (typeof(o) == 'string') {
                if (o == 'getDate') {
                    return $.fn.datepicker.apply($(this[0]), tmp_args)
                } else {
                    return this.each(function() {
                        var $t = $(this);
                        $t.datepicker.apply($t, tmp_args)
                    })
                }
            } else {
                return this.each(function() {
                    var $t = $(this);
                    $t.datepicker($.timepicker._newInst($t, o)._defaults)
                })
            }
        }
    });
    $.datepicker.parseDateTime = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) {
        var parseRes = parseDateTimeInternal(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings);
        if (parseRes.timeObj) {
            var t = parseRes.timeObj;
            parseRes.date.setHours(t.hour, t.minute, t.second, t.millisec)
        }
        return parseRes.date
    };
    $.datepicker.parseTime = function(timeFormat, timeString, options) {
        var o = extendRemove(extendRemove({},
        $.timepicker._defaults), options || {});
        var strictParse = function(f, s, o) {
            var getPatternAmpm = function(amNames, pmNames) {
                var markers = [];
                if (amNames) {
                    $.merge(markers, amNames)
                }
                if (pmNames) {
                    $.merge(markers, pmNames)
                }
                markers = $.map(markers,
                function(val) {
                    return val.replace(/[.*+?|()\[\]{}\\]/g, '\\$&')
                });
                return '(' + markers.join('|') + ')?'
            };
            var getFormatPositions = function(timeFormat) {
                var finds = timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z|'.*?')/g),
                orders = {
                    h: -1,
                    m: -1,
                    s: -1,
                    l: -1,
                    t: -1,
                    z: -1
                };
                if (finds) {
                    for (var i = 0; i < finds.length; i++) {
                        if (orders[finds[i].toString().charAt(0)] == -1) {
                            orders[finds[i].toString().charAt(0)] = i + 1
                        }
                    }
                }
                return orders
            };
            var regstr = '^' + f.toString().replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[lz]|'.*?')/g,
            function(match) {
                switch (match.charAt(0).toLowerCase()) {
                case 'h':
                    return '(\\d?\\d)';
                case 'm':
                    return '(\\d?\\d)';
                case 's':
                    return '(\\d?\\d)';
                case 'l':
                    return '(\\d?\\d?\\d)';
                case 'z':
                    return '(z|[-+]\\d\\d:?\\d\\d|\\S+)?';
                case 't':
                    return getPatternAmpm(o.amNames, o.pmNames);
                default:
                    return '(' + match.replace(/\'/g, "").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g,
                    function(m) {
                        return "\\" + m
                    }) + ')?'
                }
            }).replace(/\s/g, '\\s?') + o.timeSuffix + '$',
            order = getFormatPositions(f),
            ampm = '',
            treg;
            treg = s.match(new RegExp(regstr, 'i'));
            var resTime = {
                hour: 0,
                minute: 0,
                second: 0,
                millisec: 0
            };
            if (treg) {
                if (order.t !== -1) {
                    if (treg[order.t] === undefined || treg[order.t].length === 0) {
                        ampm = '';
                        resTime.ampm = ''
                    } else {
                        ampm = $.inArray(treg[order.t].toUpperCase(), o.amNames) !== -1 ? 'AM': 'PM';
                        resTime.ampm = o[ampm == 'AM' ? 'amNames': 'pmNames'][0]
                    }
                }
                if (order.h !== -1) {
                    if (ampm == 'AM' && treg[order.h] == '12') {
                        resTime.hour = 0
                    } else {
                        if (ampm == 'PM' && treg[order.h] != '12') {
                            resTime.hour = parseInt(treg[order.h], 10) + 12
                        } else {
                            resTime.hour = Number(treg[order.h])
                        }
                    }
                }
                if (order.m !== -1) {
                    resTime.minute = Number(treg[order.m])
                }
                if (order.s !== -1) {
                    resTime.second = Number(treg[order.s])
                }
                if (order.l !== -1) {
                    resTime.millisec = Number(treg[order.l])
                }
                if (order.z !== -1 && treg[order.z] !== undefined) {
                    var tz = treg[order.z].toUpperCase();
                    switch (tz.length) {
                    case 1:
                        tz = o.timezoneIso8601 ? 'Z': '+0000';
                        break;
                    case 5:
                        if (o.timezoneIso8601) {
                            tz = tz.substring(1) == '0000' ? 'Z': tz.substring(0, 3) + ':' + tz.substring(3)
                        }
                        break;
                    case 6:
                        if (!o.timezoneIso8601) {
                            tz = tz == 'Z' || tz.substring(1) == '00:00' ? '+0000': tz.replace(/:/, '')
                        } else {
                            if (tz.substring(1) == '00:00') {
                                tz = 'Z'
                            }
                        }
                        break
                    }
                    resTime.timezone = tz
                }
                return resTime
            }
            return false
        };
        var looseParse = function(f, s, o) {
            try {
                var d = new Date('2012-01-01 ' + s);
                return {
                    hour: d.getHours(),
                    minutes: d.getMinutes(),
                    seconds: d.getSeconds(),
                    millisec: d.getMilliseconds(),
                    timezone: $.timepicker.timeZoneOffsetString(d)
                }
            } catch(err) {
                try {
                    return strictParse(f, s, o)
                } catch(err2) {
                    $.datepicker.log("Unable to parse \ntimeString: " + s + "\ntimeFormat: " + f)
                }
            }
            return false
        };
        if (typeof o.parse === "function") {
            return o.parse(timeFormat, timeString, o)
        }
        if (o.parse === 'loose') {
            return looseParse(timeFormat, timeString, o)
        }
        return strictParse(timeFormat, timeString, o)
    };
    $.datepicker.formatTime = function(format, time, options) {
        options = options || {};
        options = $.extend({},
        $.timepicker._defaults, options);
        time = $.extend({
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            timezone: '+0000'
        },
        time);
        var tmptime = format,
        ampmName = options.amNames[0],
        hour = parseInt(time.hour, 10);
        if (hour > 11) {
            ampmName = options.pmNames[0]
        }
        tmptime = tmptime.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[lz]|('.*?'|".*?"))/g,
        function(match) {
            switch (match) {
            case 'HH':
                return ('0' + hour).slice( - 2);
            case 'H':
                return hour;
            case 'hh':
                return ('0' + convert24to12(hour)).slice( - 2);
            case 'h':
                return convert24to12(hour);
            case 'mm':
                return ('0' + time.minute).slice( - 2);
            case 'm':
                return time.minute;
            case 'ss':
                return ('0' + time.second).slice( - 2);
            case 's':
                return time.second;
            case 'l':
                return ('00' + time.millisec).slice( - 3);
            case 'z':
                return time.timezone === null ? options.defaultTimezone: time.timezone;
            case 'T':
                return ampmName.charAt(0).toUpperCase();
            case 'TT':
                return ampmName.toUpperCase();
            case 't':
                return ampmName.charAt(0).toLowerCase();
            case 'tt':
                return ampmName.toLowerCase();
            default:
                return match.replace(/\'/g, "") || "'"
            }
        });
        tmptime = $.trim(tmptime);
        return tmptime
    };
    $.datepicker._base_selectDate = $.datepicker._selectDate;
    $.datepicker._selectDate = function(id, dateStr) {
        var inst = this._getInst($(id)[0]),
        tp_inst = this._get(inst, 'timepicker');
        if (tp_inst) {
            tp_inst._limitMinMaxDateTime(inst, true);
            inst.inline = inst.stay_open = true;
            this._base_selectDate(id, dateStr);
            inst.inline = inst.stay_open = false;
            this._notifyChange(inst);
            this._updateDatepicker(inst)
        } else {
            this._base_selectDate(id, dateStr)
        }
    };
    $.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function(inst) {
        var input = inst.input[0];
        if ($.datepicker._curInst && $.datepicker._curInst != inst && $.datepicker._datepickerShowing && $.datepicker._lastInput != input) {
            return
        }
        if (typeof(inst.stay_open) !== 'boolean' || inst.stay_open === false) {
            this._base_updateDatepicker(inst);
            var tp_inst = this._get(inst, 'timepicker');
            if (tp_inst) {
                tp_inst._addTimePicker(inst);
                if (tp_inst._defaults.useLocalTimezone) {
                    var date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay, 12);
                    selectLocalTimeZone(tp_inst, date);
                    tp_inst._onTimeChange()
                }
            }
        }
    };
    $.datepicker._base_doKeyPress = $.datepicker._doKeyPress;
    $.datepicker._doKeyPress = function(event) {
        var inst = $.datepicker._getInst(event.target),
        tp_inst = $.datepicker._get(inst, 'timepicker');
        if (tp_inst) {
            if ($.datepicker._get(inst, 'constrainInput')) {
                var ampm = useAmpm(tp_inst._defaults.timeFormat),
                dateChars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat')),
                datetimeChars = tp_inst._defaults.timeFormat.toString().replace(/[hms]/g, '').replace(/TT/g, ampm ? 'APM': '').replace(/Tt/g, ampm ? 'AaPpMm': '').replace(/tT/g, ampm ? 'AaPpMm': '').replace(/T/g, ampm ? 'AP': '').replace(/tt/g, ampm ? 'apm': '').replace(/t/g, ampm ? 'ap': '') + " " + tp_inst._defaults.separator + tp_inst._defaults.timeSuffix + (tp_inst._defaults.showTimezone ? tp_inst._defaults.timezoneList.join('') : '') + (tp_inst._defaults.amNames.join('')) + (tp_inst._defaults.pmNames.join('')) + dateChars,
                chr = String.fromCharCode(event.charCode === undefined ? event.keyCode: event.charCode);
                return event.ctrlKey || (chr < ' ' || !dateChars || datetimeChars.indexOf(chr) > -1)
            }
        }
        return $.datepicker._base_doKeyPress(event)
    };
    $.datepicker._base_updateAlternate = $.datepicker._updateAlternate;
    $.datepicker._updateAlternate = function(inst) {
        var tp_inst = this._get(inst, 'timepicker');
        if (tp_inst) {
            var altField = tp_inst._defaults.altField;
            if (altField) {
                var altFormat = tp_inst._defaults.altFormat || tp_inst._defaults.dateFormat,
                date = this._getDate(inst),
                formatCfg = $.datepicker._getFormatConfig(inst),
                altFormattedDateTime = '',
                altSeparator = tp_inst._defaults.altSeparator ? tp_inst._defaults.altSeparator: tp_inst._defaults.separator,
                altTimeSuffix = tp_inst._defaults.altTimeSuffix ? tp_inst._defaults.altTimeSuffix: tp_inst._defaults.timeSuffix,
                altTimeFormat = tp_inst._defaults.altTimeFormat !== null ? tp_inst._defaults.altTimeFormat: tp_inst._defaults.timeFormat;
                altFormattedDateTime += $.datepicker.formatTime(altTimeFormat, tp_inst, tp_inst._defaults) + altTimeSuffix;
                if (!tp_inst._defaults.timeOnly && !tp_inst._defaults.altFieldTimeOnly) {
                    if (tp_inst._defaults.altFormat) altFormattedDateTime = $.datepicker.formatDate(tp_inst._defaults.altFormat, (date === null ? new Date() : date), formatCfg) + altSeparator + altFormattedDateTime;
                    else altFormattedDateTime = tp_inst.formattedDate + altSeparator + altFormattedDateTime
                }
                $(altField).val(altFormattedDateTime)
            }
        } else {
            $.datepicker._base_updateAlternate(inst)
        }
    };
    $.datepicker._base_doKeyUp = $.datepicker._doKeyUp;
    $.datepicker._doKeyUp = function(event) {
        var inst = $.datepicker._getInst(event.target),
        tp_inst = $.datepicker._get(inst, 'timepicker');
        if (tp_inst) {
            if (tp_inst._defaults.timeOnly && (inst.input.val() != inst.lastVal)) {
                try {
                    $.datepicker._updateDatepicker(inst)
                } catch(err) {
                    $.datepicker.log(err)
                }
            }
        }
        return $.datepicker._base_doKeyUp(event)
    };
    $.datepicker._base_gotoToday = $.datepicker._gotoToday;
    $.datepicker._gotoToday = function(id) {
        var inst = this._getInst($(id)[0]),
        $dp = inst.dpDiv;
        this._base_gotoToday(id);
        var tp_inst = this._get(inst, 'timepicker');
        selectLocalTimeZone(tp_inst);
        var now = new Date();
        this._setTime(inst, now);
        $('.ui-datepicker-today', $dp).click()
    };
    $.datepicker._disableTimepickerDatepicker = function(target) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, 'timepicker');
        $(target).datepicker('getDate');
        if (tp_inst) {
            tp_inst._defaults.showTimepicker = false;
            tp_inst._updateDateTime(inst)
        }
    };
    $.datepicker._enableTimepickerDatepicker = function(target) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, 'timepicker');
        $(target).datepicker('getDate');
        if (tp_inst) {
            tp_inst._defaults.showTimepicker = true;
            tp_inst._addTimePicker(inst);
            tp_inst._updateDateTime(inst)
        }
    };
    $.datepicker._setTime = function(inst, date) {
        var tp_inst = this._get(inst, 'timepicker');
        if (tp_inst) {
            var defaults = tp_inst._defaults;
            tp_inst.hour = date ? date.getHours() : defaults.hour;
            tp_inst.minute = date ? date.getMinutes() : defaults.minute;
            tp_inst.second = date ? date.getSeconds() : defaults.second;
            tp_inst.millisec = date ? date.getMilliseconds() : defaults.millisec;
            tp_inst._limitMinMaxDateTime(inst, true);
            tp_inst._onTimeChange();
            tp_inst._updateDateTime(inst)
        }
    };
    $.datepicker._setTimeDatepicker = function(target, date, withDate) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, 'timepicker');
        if (tp_inst) {
            this._setDateFromField(inst);
            var tp_date;
            if (date) {
                if (typeof date == "string") {
                    tp_inst._parseTime(date, withDate);
                    tp_date = new Date();
                    tp_date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec)
                } else {
                    tp_date = new Date(date.getTime())
                }
                if (tp_date.toString() == 'Invalid Date') {
                    tp_date = undefined
                }
                this._setTime(inst, tp_date)
            }
        }
    };
    $.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker;
    $.datepicker._setDateDatepicker = function(target, date) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_date = (date instanceof Date) ? new Date(date.getTime()) : date;
        this._updateDatepicker(inst);
        this._base_setDateDatepicker.apply(this, arguments);
        this._setTimeDatepicker(target, tp_date, true)
    };
    $.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker;
    $.datepicker._getDateDatepicker = function(target, noDefault) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, 'timepicker');
        if (tp_inst) {
            if (inst.lastVal === undefined) {
                this._setDateFromField(inst, noDefault)
            }
            var date = this._getDate(inst);
            if (date && tp_inst._parseTime($(target).val(), tp_inst.timeOnly)) {
                date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec)
            }
            return date
        }
        return this._base_getDateDatepicker(target, noDefault)
    };
    $.datepicker._base_parseDate = $.datepicker.parseDate;
    $.datepicker.parseDate = function(format, value, settings) {
        var date;
        try {
            date = this._base_parseDate(format, value, settings)
        } catch(err) {
            date = this._base_parseDate(format, value.substring(0, value.length - (err.length - err.indexOf(':') - 2)), settings);
            $.datepicker.log("Error parsing the date string: " + err + "\ndate string = " + value + "\ndate format = " + format)
        }
        return date
    };
    $.datepicker._base_formatDate = $.datepicker._formatDate;
    $.datepicker._formatDate = function(inst, day, month, year) {
        var tp_inst = this._get(inst, 'timepicker');
        if (tp_inst) {
            tp_inst._updateDateTime(inst);
            return tp_inst.$input.val()
        }
        return this._base_formatDate(inst)
    };
    $.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker;
    $.datepicker._optionDatepicker = function(target, name, value) {
        var inst = this._getInst(target),
        name_clone;
        if (!inst) {
            return null
        }
        var tp_inst = this._get(inst, 'timepicker');
        if (tp_inst) {
            var min = null,
            max = null,
            onselect = null,
            overrides = tp_inst._defaults.evnts,
            fns = {},
            prop;
            if (typeof name == 'string') {
                if (name === 'minDate' || name === 'minDateTime') {
                    min = value
                } else if (name === 'maxDate' || name === 'maxDateTime') {
                    max = value
                } else if (name === 'onSelect') {
                    onselect = value
                } else if (overrides.hasOwnProperty(name)) {
                    if (typeof(value) === 'undefined') {
                        return overrides[name]
                    }
                    fns[name] = value;
                    name_clone = {}
                }
            } else if (typeof name == 'object') {
                if (name.minDate) {
                    min = name.minDate
                } else if (name.minDateTime) {
                    min = name.minDateTime
                } else if (name.maxDate) {
                    max = name.maxDate
                } else if (name.maxDateTime) {
                    max = name.maxDateTime
                }
                for (prop in overrides) {
                    if (overrides.hasOwnProperty(prop) && name[prop]) {
                        fns[prop] = name[prop]
                    }
                }
            }
            for (prop in fns) {
                if (fns.hasOwnProperty(prop)) {
                    overrides[prop] = fns[prop];
                    if (!name_clone) {
                        name_clone = $.extend({},
                        name)
                    }
                    delete name_clone[prop]
                }
            }
            if (name_clone && isEmptyObject(name_clone)) {
                return
            }
            if (min) {
                if (min === 0) {
                    min = new Date()
                } else {
                    min = new Date(min)
                }
                tp_inst._defaults.minDate = min;
                tp_inst._defaults.minDateTime = min
            } else if (max) {
                if (max === 0) {
                    max = new Date()
                } else {
                    max = new Date(max)
                }
                tp_inst._defaults.maxDate = max;
                tp_inst._defaults.maxDateTime = max
            } else if (onselect) {
                tp_inst._defaults.onSelect = onselect
            }
        }
        if (value === undefined) {
            return this._base_optionDatepicker.call($.datepicker, target, name)
        }
        return this._base_optionDatepicker.call($.datepicker, target, name_clone || name, value)
    };
    var isEmptyObject = function(obj) {
        var prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(obj)) {
                return false
            }
        }
        return true
    };
    var extendRemove = function(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] === null || props[name] === undefined) {
                target[name] = props[name]
            }
        }
        return target
    };
    var useAmpm = function(timeFormat) {
        return (timeFormat.indexOf('t') !== -1 && timeFormat.indexOf('h') !== -1)
    };
    var convert24to12 = function(hour) {
        if (hour > 12) {
            hour = hour - 12
        }
        if (hour == 0) {
            hour = 12
        }
        return String(hour)
    };
    var splitDateTime = function(dateFormat, dateTimeString, dateSettings, timeSettings) {
        try {
            var separator = timeSettings && timeSettings.separator ? timeSettings.separator: $.timepicker._defaults.separator,
            format = timeSettings && timeSettings.timeFormat ? timeSettings.timeFormat: $.timepicker._defaults.timeFormat,
            timeParts = format.split(separator),
            timePartsLen = timeParts.length,
            allParts = dateTimeString.split(separator),
            allPartsLen = allParts.length;
            if (allPartsLen > 1) {
                return [allParts.splice(0, allPartsLen - timePartsLen).join(separator), allParts.splice(0, timePartsLen).join(separator)]
            }
        } catch(err) {
            $.datepicker.log('Could not split the date from the time. Please check the following datetimepicker options' + "\nthrown error: " + err + "\ndateTimeString" + dateTimeString + "\ndateFormat = " + dateFormat + "\nseparator = " + timeSettings.separator + "\ntimeFormat = " + timeSettings.timeFormat);
            if (err.indexOf(":") >= 0) {
                var dateStringLength = dateTimeString.length - (err.length - err.indexOf(':') - 2),
                timeString = dateTimeString.substring(dateStringLength);
                return [$.trim(dateTimeString.substring(0, dateStringLength)), $.trim(dateTimeString.substring(dateStringLength))]
            } else {
                throw err
            }
        }
        return [dateTimeString, '']
    };
    var parseDateTimeInternal = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) {
        var date;
        var splitRes = splitDateTime(dateFormat, dateTimeString, dateSettings, timeSettings);
        date = $.datepicker._base_parseDate(dateFormat, splitRes[0], dateSettings);
        if (splitRes[1] !== '') {
            var timeString = splitRes[1],
            parsedTime = $.datepicker.parseTime(timeFormat, timeString, timeSettings);
            if (parsedTime === null) {
                throw 'Wrong time format'
            }
            return {
                date: date,
                timeObj: parsedTime
            }
        } else {
            return {
                date: date
            }
        }
    };
    var selectLocalTimeZone = function(tp_inst, date) {
        if (tp_inst && tp_inst.timezone_select) {
            tp_inst._defaults.useLocalTimezone = true;
            var now = typeof date !== 'undefined' ? date: new Date();
            var tzoffset = $.timepicker.timeZoneOffsetString(now);
            if (tp_inst._defaults.timezoneIso8601) {
                tzoffset = tzoffset.substring(0, 3) + ':' + tzoffset.substring(3)
            }
            tp_inst.timezone_select.val(tzoffset)
        }
    };
    $.timepicker = new Timepicker();
    $.timepicker.timeZoneOffsetString = function(date) {
        var off = date.getTimezoneOffset() * -1,
        minutes = off % 60,
        hours = (off - minutes) / 60;
        return (off >= 0 ? '+': '-') + ('0' + (hours * 101).toString()).substr( - 2) + ('0' + (minutes * 101).toString()).substr( - 2)
    };
    $.timepicker.timeRange = function(startTime, endTime, options) {
        return $.timepicker.handleRange('timepicker', startTime, endTime, options)
    };
    $.timepicker.dateTimeRange = function(startTime, endTime, options) {
        $.timepicker.dateRange(startTime, endTime, options, 'datetimepicker')
    };
    $.timepicker.dateRange = function(startTime, endTime, options, method) {
        method = method || 'datepicker';
        $.timepicker.handleRange(method, startTime, endTime, options)
    };
    $.timepicker.handleRange = function(method, startTime, endTime, options) {
        $.fn[method].call(startTime, $.extend({
            onClose: function(dateText, inst) {
                checkDates(this, endTime, dateText)
            },
            onSelect: function(selectedDateTime) {
                selected(this, endTime, 'minDate')
            }
        },
        options, options.start));
        $.fn[method].call(endTime, $.extend({
            onClose: function(dateText, inst) {
                checkDates(this, startTime, dateText)
            },
            onSelect: function(selectedDateTime) {
                selected(this, startTime, 'maxDate')
            }
        },
        options, options.end));
        if (method != 'timepicker' && options.reformat) {
            $([startTime, endTime]).each(function() {
                var format = $(this)[method].call($(this), 'option', 'dateFormat'),
                date = new Date($(this).val());
                if ($(this).val() && date) {
                    $(this).val($.datepicker.formatDate(format, date))
                }
            })
        }
        checkDates(startTime, endTime, startTime.val());
        function checkDates(changed, other, dateText) {
            if (other.val() && (new Date(startTime.val()) > new Date(endTime.val()))) {
                other.val(dateText)
            }
        }
        selected(startTime, endTime, 'minDate');
        selected(endTime, startTime, 'maxDate');
        function selected(changed, other, option) {
            if (!$(changed).val()) {
                return
            }
            var date = $(changed)[method].call($(changed), 'getDate');
            if (date.getTime) {
                $(other)[method].call($(other), 'option', option, date)
            }
        }
        return $([startTime.get(0), endTime.get(0)])
    };
    $.timepicker.version = "1.1.1"
})(jQuery);
jQuery(function($) {
    $.datepicker.regional['zh-CN'] = {
        closeText: '关闭',
        prevText: '<上月',
        nextText: '下月>',
        currentText: '今天',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        weekHeader: '周',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '年'
    };
    $.datepicker.setDefaults($.datepicker.regional['zh-CN'])
}); (function($) {
    $.timepicker.regional['zh-CN'] = {
        timeOnlyTitle: '选择时间',
        timeText: '时间',
        hourText: '小时',
        minuteText: '分钟',
        secondText: '秒钟',
        millisecText: '微秒',
        timezoneText: '时区',
        currentText: '现在时间',
        closeText: '关闭',
        timeFormat: 'HH:mm',
        amNames: ['AM', 'A'],
        pmNames: ['PM', 'P'],
        isRTL: false
    };
    $.timepicker.setDefaults($.timepicker.regional['zh-CN'])
})(jQuery); (function($, undefined) {
    var numPages = 5;
    $.widget("ui.slider", $.ui.mouse, {
        version: "1.10.0",
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function() {
            var i, handleCount, o = this.options,
            existingHandles = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
            handle = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
            handles = [];
            this._keySliding = false;
            this._mouseSliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider" + " ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all");
            this.range = $([]);
            if (o.range) {
                if (o.range === true) {
                    if (!o.values) {
                        o.values = [this._valueMin(), this._valueMin()]
                    } else if (o.values.length && o.values.length !== 2) {
                        o.values = [o.values[0], o.values[0]]
                    } else if ($.isArray(o.values)) {
                        o.values = o.values.slice(0)
                    }
                }
                this.range = $("<div></div>").appendTo(this.element).addClass("ui-slider-range" + " ui-widget-header" + ((o.range === "min" || o.range === "max") ? " ui-slider-range-" + o.range: ""))
            }
            handleCount = (o.values && o.values.length) || 1;
            for (i = existingHandles.length; i < handleCount; i++) {
                handles.push(handle)
            }
            this.handles = existingHandles.add($(handles.join("")).appendTo(this.element));
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function(event) {
                event.preventDefault()
            }).mouseenter(function() {
                if (!o.disabled) {
                    $(this).addClass("ui-state-hover")
                }
            }).mouseleave(function() {
                $(this).removeClass("ui-state-hover")
            }).focus(function() {
                if (!o.disabled) {
                    $(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    $(this).addClass("ui-state-focus")
                } else {
                    $(this).blur()
                }
            }).blur(function() {
                $(this).removeClass("ui-state-focus")
            });
            this.handles.each(function(i) {
                $(this).data("ui-slider-handle-index", i)
            });
            this._setOption("disabled", o.disabled);
            this._on(this.handles, this._handleEvents);
            this._refreshValue();
            this._animateOff = false
        },
        _destroy: function() {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider" + " ui-slider-horizontal" + " ui-slider-vertical" + " ui-widget" + " ui-widget-content" + " ui-corner-all");
            this._mouseDestroy()
        },
        _mouseCapture: function(event) {
            var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle, that = this,
            o = this.options;
            if (o.disabled) {
                return false
            }
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            position = {
                x: event.pageX,
                y: event.pageY
            };
            normValue = this._normValueFromMouse(position);
            distance = this._valueMax() - this._valueMin() + 1;
            this.handles.each(function(i) {
                var thisDistance = Math.abs(normValue - that.values(i));
                if ((distance > thisDistance) || (distance === thisDistance && (i === that._lastChangedValue || that.values(i) === o.min))) {
                    distance = thisDistance;
                    closestHandle = $(this);
                    index = i
                }
            });
            allowed = this._start(event, index);
            if (allowed === false) {
                return false
            }
            this._mouseSliding = true;
            this._handleIndex = index;
            closestHandle.addClass("ui-state-active").focus();
            offset = closestHandle.offset();
            mouseOverHandle = !$(event.target).parents().addBack().is(".ui-slider-handle");
            this._clickOffset = mouseOverHandle ? {
                left: 0,
                top: 0
            }: {
                left: event.pageX - offset.left - (closestHandle.width() / 2),
                top: event.pageY - offset.top - (closestHandle.height() / 2) - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
            };
            if (!this.handles.hasClass("ui-state-hover")) {
                this._slide(event, index, normValue)
            }
            this._animateOff = true;
            return true
        },
        _mouseStart: function() {
            return true
        },
        _mouseDrag: function(event) {
            var position = {
                x: event.pageX,
                y: event.pageY
            },
            normValue = this._normValueFromMouse(position);
            this._slide(event, this._handleIndex, normValue);
            return false
        },
        _mouseStop: function(event) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(event, this._handleIndex);
            this._change(event, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            this._animateOff = false;
            return false
        },
        _detectOrientation: function() {
            this.orientation = (this.options.orientation === "vertical") ? "vertical": "horizontal"
        },
        _normValueFromMouse: function(position) {
            var pixelTotal, pixelMouse, percentMouse, valueTotal, valueMouse;
            if (this.orientation === "horizontal") {
                pixelTotal = this.elementSize.width;
                pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left: 0)
            } else {
                pixelTotal = this.elementSize.height;
                pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top: 0)
            }
            percentMouse = (pixelMouse / pixelTotal);
            if (percentMouse > 1) {
                percentMouse = 1
            }
            if (percentMouse < 0) {
                percentMouse = 0
            }
            if (this.orientation === "vertical") {
                percentMouse = 1 - percentMouse
            }
            valueTotal = this._valueMax() - this._valueMin();
            valueMouse = this._valueMin() + percentMouse * valueTotal;
            return this._trimAlignValue(valueMouse)
        },
        _start: function(event, index) {
            var uiHash = {
                handle: this.handles[index],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                uiHash.value = this.values(index);
                uiHash.values = this.values()
            }
            return this._trigger("start", event, uiHash)
        },
        _slide: function(event, index, newVal) {
            var otherVal, newValues, allowed;
            if (this.options.values && this.options.values.length) {
                otherVal = this.values(index ? 0 : 1);
                if ((this.options.values.length === 2 && this.options.range === true) && ((index === 0 && newVal > otherVal) || (index === 1 && newVal < otherVal))) {
                    newVal = otherVal
                }
                if (newVal !== this.values(index)) {
                    newValues = this.values();
                    newValues[index] = newVal;
                    allowed = this._trigger("slide", event, {
                        handle: this.handles[index],
                        value: newVal,
                        values: newValues
                    });
                    otherVal = this.values(index ? 0 : 1);
                    if (allowed !== false) {
                        this.values(index, newVal, true)
                    }
                }
            } else {
                if (newVal !== this.value()) {
                    allowed = this._trigger("slide", event, {
                        handle: this.handles[index],
                        value: newVal
                    });
                    if (allowed !== false) {
                        this.value(newVal)
                    }
                }
            }
        },
        _stop: function(event, index) {
            var uiHash = {
                handle: this.handles[index],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                uiHash.value = this.values(index);
                uiHash.values = this.values()
            }
            this._trigger("stop", event, uiHash)
        },
        _change: function(event, index) {
            if (!this._keySliding && !this._mouseSliding) {
                var uiHash = {
                    handle: this.handles[index],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    uiHash.value = this.values(index);
                    uiHash.values = this.values()
                }
                this._lastChangedValue = index;
                this._trigger("change", event, uiHash)
            }
        },
        value: function(newValue) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(newValue);
                this._refreshValue();
                this._change(null, 0);
                return
            }
            return this._value()
        },
        values: function(index, newValue) {
            var vals, newValues, i;
            if (arguments.length > 1) {
                this.options.values[index] = this._trimAlignValue(newValue);
                this._refreshValue();
                this._change(null, index);
                return
            }
            if (arguments.length) {
                if ($.isArray(arguments[0])) {
                    vals = this.options.values;
                    newValues = arguments[0];
                    for (i = 0; i < vals.length; i += 1) {
                        vals[i] = this._trimAlignValue(newValues[i]);
                        this._change(null, i)
                    }
                    this._refreshValue()
                } else {
                    if (this.options.values && this.options.values.length) {
                        return this._values(index)
                    } else {
                        return this.value()
                    }
                }
            } else {
                return this._values()
            }
        },
        _setOption: function(key, value) {
            var i, valsLength = 0;
            if ($.isArray(this.options.values)) {
                valsLength = this.options.values.length
            }
            $.Widget.prototype._setOption.apply(this, arguments);
            switch (key) {
            case "disabled":
                if (value) {
                    this.handles.filter(".ui-state-focus").blur();
                    this.handles.removeClass("ui-state-hover");
                    this.handles.prop("disabled", true)
                } else {
                    this.handles.prop("disabled", false)
                }
                break;
            case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                break;
            case "value":
                this._animateOff = true;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = false;
                break;
            case "values":
                this._animateOff = true;
                this._refreshValue();
                for (i = 0; i < valsLength; i += 1) {
                    this._change(null, i)
                }
                this._animateOff = false;
                break;
            case "min":
            case "max":
                this._animateOff = true;
                this._refreshValue();
                this._animateOff = false;
                break
            }
        },
        _value: function() {
            var val = this.options.value;
            val = this._trimAlignValue(val);
            return val
        },
        _values: function(index) {
            var val, vals, i;
            if (arguments.length) {
                val = this.options.values[index];
                val = this._trimAlignValue(val);
                return val
            } else {
                vals = this.options.values.slice();
                for (i = 0; i < vals.length; i += 1) {
                    vals[i] = this._trimAlignValue(vals[i])
                }
                return vals
            }
        },
        _trimAlignValue: function(val) {
            if (val <= this._valueMin()) {
                return this._valueMin()
            }
            if (val >= this._valueMax()) {
                return this._valueMax()
            }
            var step = (this.options.step > 0) ? this.options.step: 1,
            valModStep = (val - this._valueMin()) % step,
            alignValue = val - valModStep;
            if (Math.abs(valModStep) * 2 >= step) {
                alignValue += (valModStep > 0) ? step: ( - step)
            }
            return parseFloat(alignValue.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var lastValPercent, valPercent, value, valueMin, valueMax, oRange = this.options.range,
            o = this.options,
            that = this,
            animate = (!this._animateOff) ? o.animate: false,
            _set = {};
            if (this.options.values && this.options.values.length) {
                this.handles.each(function(i) {
                    valPercent = (that.values(i) - that._valueMin()) / (that._valueMax() - that._valueMin()) * 100;
                    _set[that.orientation === "horizontal" ? "left": "bottom"] = valPercent + "%";
                    $(this).stop(1, 1)[animate ? "animate": "css"](_set, o.animate);
                    if (that.options.range === true) {
                        if (that.orientation === "horizontal") {
                            if (i === 0) {
                                that.range.stop(1, 1)[animate ? "animate": "css"]({
                                    left: valPercent + "%"
                                },
                                o.animate)
                            }
                            if (i === 1) {
                                that.range[animate ? "animate": "css"]({
                                    width: (valPercent - lastValPercent) + "%"
                                },
                                {
                                    queue: false,
                                    duration: o.animate
                                })
                            }
                        } else {
                            if (i === 0) {
                                that.range.stop(1, 1)[animate ? "animate": "css"]({
                                    bottom: (valPercent) + "%"
                                },
                                o.animate)
                            }
                            if (i === 1) {
                                that.range[animate ? "animate": "css"]({
                                    height: (valPercent - lastValPercent) + "%"
                                },
                                {
                                    queue: false,
                                    duration: o.animate
                                })
                            }
                        }
                    }
                    lastValPercent = valPercent
                })
            } else {
                value = this.value();
                valueMin = this._valueMin();
                valueMax = this._valueMax();
                valPercent = (valueMax !== valueMin) ? (value - valueMin) / (valueMax - valueMin) * 100 : 0;
                _set[this.orientation === "horizontal" ? "left": "bottom"] = valPercent + "%";
                this.handle.stop(1, 1)[animate ? "animate": "css"](_set, o.animate);
                if (oRange === "min" && this.orientation === "horizontal") {
                    this.range.stop(1, 1)[animate ? "animate": "css"]({
                        width: valPercent + "%"
                    },
                    o.animate)
                }
                if (oRange === "max" && this.orientation === "horizontal") {
                    this.range[animate ? "animate": "css"]({
                        width: (100 - valPercent) + "%"
                    },
                    {
                        queue: false,
                        duration: o.animate
                    })
                }
                if (oRange === "min" && this.orientation === "vertical") {
                    this.range.stop(1, 1)[animate ? "animate": "css"]({
                        height: valPercent + "%"
                    },
                    o.animate)
                }
                if (oRange === "max" && this.orientation === "vertical") {
                    this.range[animate ? "animate": "css"]({
                        height: (100 - valPercent) + "%"
                    },
                    {
                        queue: false,
                        duration: o.animate
                    })
                }
            }
        },
        _handleEvents: {
            keydown: function(event) {
                var allowed, curVal, newVal, step, index = $(event.target).data("ui-slider-handle-index");
                switch (event.keyCode) {
                case $.ui.keyCode.HOME:
                case $.ui.keyCode.END:
                case $.ui.keyCode.PAGE_UP:
                case $.ui.keyCode.PAGE_DOWN:
                case $.ui.keyCode.UP:
                case $.ui.keyCode.RIGHT:
                case $.ui.keyCode.DOWN:
                case $.ui.keyCode.LEFT:
                    event.preventDefault();
                    if (!this._keySliding) {
                        this._keySliding = true;
                        $(event.target).addClass("ui-state-active");
                        allowed = this._start(event, index);
                        if (allowed === false) {
                            return
                        }
                    }
                    break
                }
                step = this.options.step;
                if (this.options.values && this.options.values.length) {
                    curVal = newVal = this.values(index)
                } else {
                    curVal = newVal = this.value()
                }
                switch (event.keyCode) {
                case $.ui.keyCode.HOME:
                    newVal = this._valueMin();
                    break;
                case $.ui.keyCode.END:
                    newVal = this._valueMax();
                    break;
                case $.ui.keyCode.PAGE_UP:
                    newVal = this._trimAlignValue(curVal + ((this._valueMax() - this._valueMin()) / numPages));
                    break;
                case $.ui.keyCode.PAGE_DOWN:
                    newVal = this._trimAlignValue(curVal - ((this._valueMax() - this._valueMin()) / numPages));
                    break;
                case $.ui.keyCode.UP:
                case $.ui.keyCode.RIGHT:
                    if (curVal === this._valueMax()) {
                        return
                    }
                    newVal = this._trimAlignValue(curVal + step);
                    break;
                case $.ui.keyCode.DOWN:
                case $.ui.keyCode.LEFT:
                    if (curVal === this._valueMin()) {
                        return
                    }
                    newVal = this._trimAlignValue(curVal - step);
                    break
                }
                this._slide(event, index, newVal)
            },
            keyup: function(event) {
                var index = $(event.target).data("ui-slider-handle-index");
                if (this._keySliding) {
                    this._keySliding = false;
                    this._stop(event, index);
                    this._change(event, index);
                    $(event.target).removeClass("ui-state-active")
                }
            }
        }
    })
} (jQuery)); (function($, undefined) {
    function num(v) {
        return parseInt(v, 10) || 0
    }
    function isNumber(value) {
        return ! isNaN(parseInt(value, 10))
    }
    $.widget("ui.resizable", $.ui.mouse, {
        version: "1.10.0",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function() {
            var n, i, handle, axis, hname, that = this,
            o = this.options;
            this.element.addClass("ui-resizable");
            $.extend(this, {
                _aspectRatio: !!(o.aspectRatio),
                aspectRatio: o.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper": null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                this.element.wrap($("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = o.handles || (!$(".ui-resizable-handle", this.element).length ? "e,s,se": {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor === String) {
                if (this.handles === "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                n = this.handles.split(",");
                this.handles = {};
                for (i = 0; i < n.length; i++) {
                    handle = $.trim(n[i]);
                    hname = "ui-resizable-" + handle;
                    axis = $("<div class='ui-resizable-handle " + hname + "'></div>");
                    axis.css({
                        zIndex: o.zIndex
                    });
                    if ("se" === handle) {
                        axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[handle] = ".ui-resizable-" + handle;
                    this.element.append(axis)
                }
            }
            this._renderAxis = function(target) {
                var i, axis, padPos, padWrapper;
                target = target || this.element;
                for (i in this.handles) {
                    if (this.handles[i].constructor === String) {
                        this.handles[i] = $(this.handles[i], this.element).show()
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        axis = $(this.handles[i], this.element);
                        padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();
                        padPos = ["padding", /ne|nw|n/.test(i) ? "Top": /se|sw|s/.test(i) ? "Bottom": /^e$/.test(i) ? "Right": "Left"].join("");
                        target.css(padPos, padWrapper);
                        this._proportionallyResize()
                    }
                    if (!$(this.handles[i]).length) {
                        continue
                    }
                }
            };
            this._renderAxis(this.element);
            this._handles = $(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                if (!that.resizing) {
                    if (this.className) {
                        axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    that.axis = axis && axis[1] ? axis[1] : "se"
                }
            });
            if (o.autoHide) {
                this._handles.hide();
                $(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    if (o.disabled) {
                        return
                    }
                    $(this).removeClass("ui-resizable-autohide");
                    that._handles.show()
                }).mouseleave(function() {
                    if (o.disabled) {
                        return
                    }
                    if (!that.resizing) {
                        $(this).addClass("ui-resizable-autohide");
                        that._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var wrapper, _destroy = function(exp) {
                $(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                _destroy(this.element);
                wrapper = this.element;
                this.originalElement.css({
                    position: wrapper.css("position"),
                    width: wrapper.outerWidth(),
                    height: wrapper.outerHeight(),
                    top: wrapper.css("top"),
                    left: wrapper.css("left")
                }).insertAfter(wrapper);
                wrapper.remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            _destroy(this.originalElement);
            return this
        },
        _mouseCapture: function(event) {
            var i, handle, capture = false;
            for (i in this.handles) {
                handle = $(this.handles[i])[0];
                if (handle === event.target || $.contains(handle, event.target)) {
                    capture = true
                }
            }
            return ! this.options.disabled && capture
        },
        _mouseStart: function(event) {
            var curleft, curtop, cursor, o = this.options,
            iniPos = this.element.position(),
            el = this.element;
            this.resizing = true;
            if ((/absolute/).test(el.css("position"))) {
                el.css({
                    position: "absolute",
                    top: el.css("top"),
                    left: el.css("left")
                })
            } else if (el.is(".ui-draggable")) {
                el.css({
                    position: "absolute",
                    top: iniPos.top,
                    left: iniPos.left
                })
            }
            this._renderProxy();
            curleft = num(this.helper.css("left"));
            curtop = num(this.helper.css("top"));
            if (o.containment) {
                curleft += $(o.containment).scrollLeft() || 0;
                curtop += $(o.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: curleft,
                top: curtop
            };
            this.size = this._helper ? {
                width: el.outerWidth(),
                height: el.outerHeight()
            }: {
                width: el.width(),
                height: el.height()
            };
            this.originalSize = this._helper ? {
                width: el.outerWidth(),
                height: el.outerHeight()
            }: {
                width: el.width(),
                height: el.height()
            };
            this.originalPosition = {
                left: curleft,
                top: curtop
            };
            this.sizeDiff = {
                width: el.outerWidth() - el.width(),
                height: el.outerHeight() - el.height()
            };
            this.originalMousePosition = {
                left: event.pageX,
                top: event.pageY
            };
            this.aspectRatio = (typeof o.aspectRatio === "number") ? o.aspectRatio: ((this.originalSize.width / this.originalSize.height) || 1);
            cursor = $(".ui-resizable-" + this.axis).css("cursor");
            $("body").css("cursor", cursor === "auto" ? this.axis + "-resize": cursor);
            el.addClass("ui-resizable-resizing");
            this._propagate("start", event);
            return true
        },
        _mouseDrag: function(event) {
            var data, el = this.helper,
            props = {},
            smp = this.originalMousePosition,
            a = this.axis,
            prevTop = this.position.top,
            prevLeft = this.position.left,
            prevWidth = this.size.width,
            prevHeight = this.size.height,
            dx = (event.pageX - smp.left) || 0,
            dy = (event.pageY - smp.top) || 0,
            trigger = this._change[a];
            if (!trigger) {
                return false
            }
            data = trigger.apply(this, [event, dx, dy]);
            this._updateVirtualBoundaries(event.shiftKey);
            if (this._aspectRatio || event.shiftKey) {
                data = this._updateRatio(data, event)
            }
            data = this._respectSize(data, event);
            this._updateCache(data);
            this._propagate("resize", event);
            if (this.position.top !== prevTop) {
                props.top = this.position.top + "px"
            }
            if (this.position.left !== prevLeft) {
                props.left = this.position.left + "px"
            }
            if (this.size.width !== prevWidth) {
                props.width = this.size.width + "px"
            }
            if (this.size.height !== prevHeight) {
                props.height = this.size.height + "px"
            }
            el.css(props);
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            if (!$.isEmptyObject(props)) {
                this._trigger("resize", event, this.ui())
            }
            return false
        },
        _mouseStop: function(event) {
            this.resizing = false;
            var pr, ista, soffseth, soffsetw, s, left, top, o = this.options,
            that = this;
            if (this._helper) {
                pr = this._proportionallyResizeElements;
                ista = pr.length && (/textarea/i).test(pr[0].nodeName);
                soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
                soffsetw = ista ? 0 : that.sizeDiff.width;
                s = {
                    width: (that.helper.width() - soffsetw),
                    height: (that.helper.height() - soffseth)
                };
                left = (parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left)) || null;
                top = (parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top)) || null;
                if (!o.animate) {
                    this.element.css($.extend(s, {
                        top: top,
                        left: left
                    }))
                }
                that.helper.height(that.size.height);
                that.helper.width(that.size.width);
                if (this._helper && !o.animate) {
                    this._proportionallyResize()
                }
            }
            $("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", event);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        },
        _updateVirtualBoundaries: function(forceAspectRatio) {
            var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b, o = this.options;
            b = {
                minWidth: isNumber(o.minWidth) ? o.minWidth: 0,
                maxWidth: isNumber(o.maxWidth) ? o.maxWidth: Infinity,
                minHeight: isNumber(o.minHeight) ? o.minHeight: 0,
                maxHeight: isNumber(o.maxHeight) ? o.maxHeight: Infinity
            };
            if (this._aspectRatio || forceAspectRatio) {
                pMinWidth = b.minHeight * this.aspectRatio;
                pMinHeight = b.minWidth / this.aspectRatio;
                pMaxWidth = b.maxHeight * this.aspectRatio;
                pMaxHeight = b.maxWidth / this.aspectRatio;
                if (pMinWidth > b.minWidth) {
                    b.minWidth = pMinWidth
                }
                if (pMinHeight > b.minHeight) {
                    b.minHeight = pMinHeight
                }
                if (pMaxWidth < b.maxWidth) {
                    b.maxWidth = pMaxWidth
                }
                if (pMaxHeight < b.maxHeight) {
                    b.maxHeight = pMaxHeight
                }
            }
            this._vBoundaries = b
        },
        _updateCache: function(data) {
            this.offset = this.helper.offset();
            if (isNumber(data.left)) {
                this.position.left = data.left
            }
            if (isNumber(data.top)) {
                this.position.top = data.top
            }
            if (isNumber(data.height)) {
                this.size.height = data.height
            }
            if (isNumber(data.width)) {
                this.size.width = data.width
            }
        },
        _updateRatio: function(data) {
            var cpos = this.position,
            csize = this.size,
            a = this.axis;
            if (isNumber(data.height)) {
                data.width = (data.height * this.aspectRatio)
            } else if (isNumber(data.width)) {
                data.height = (data.width / this.aspectRatio)
            }
            if (a === "sw") {
                data.left = cpos.left + (csize.width - data.width);
                data.top = null
            }
            if (a === "nw") {
                data.top = cpos.top + (csize.height - data.height);
                data.left = cpos.left + (csize.width - data.width)
            }
            return data
        },
        _respectSize: function(data) {
            var o = this._vBoundaries,
            a = this.axis,
            ismaxw = isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width),
            ismaxh = isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),
            isminw = isNumber(data.width) && o.minWidth && (o.minWidth > data.width),
            isminh = isNumber(data.height) && o.minHeight && (o.minHeight > data.height),
            dw = this.originalPosition.left + this.originalSize.width,
            dh = this.position.top + this.size.height,
            cw = /sw|nw|w/.test(a),
            ch = /nw|ne|n/.test(a);
            if (isminw) {
                data.width = o.minWidth
            }
            if (isminh) {
                data.height = o.minHeight
            }
            if (ismaxw) {
                data.width = o.maxWidth
            }
            if (ismaxh) {
                data.height = o.maxHeight
            }
            if (isminw && cw) {
                data.left = dw - o.minWidth
            }
            if (ismaxw && cw) {
                data.left = dw - o.maxWidth
            }
            if (isminh && ch) {
                data.top = dh - o.minHeight
            }
            if (ismaxh && ch) {
                data.top = dh - o.maxHeight
            }
            if (!data.width && !data.height && !data.left && data.top) {
                data.top = null
            } else if (!data.width && !data.height && !data.top && data.left) {
                data.left = null
            }
            return data
        },
        _proportionallyResize: function() {
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var i, j, borders, paddings, prel, element = this.helper || this.element;
            for (i = 0; i < this._proportionallyResizeElements.length; i++) {
                prel = this._proportionallyResizeElements[i];
                if (!this.borderDif) {
                    this.borderDif = [];
                    borders = [prel.css("borderTopWidth"), prel.css("borderRightWidth"), prel.css("borderBottomWidth"), prel.css("borderLeftWidth")];
                    paddings = [prel.css("paddingTop"), prel.css("paddingRight"), prel.css("paddingBottom"), prel.css("paddingLeft")];
                    for (j = 0; j < borders.length; j++) {
                        this.borderDif[j] = (parseInt(borders[j], 10) || 0) + (parseInt(paddings[j], 10) || 0)
                    }
                }
                prel.css({
                    height: (element.height() - this.borderDif[0] - this.borderDif[2]) || 0,
                    width: (element.width() - this.borderDif[1] - this.borderDif[3]) || 0
                })
            }
        },
        _renderProxy: function() {
            var el = this.element,
            o = this.options;
            this.elementOffset = el.offset();
            if (this._helper) {
                this.helper = this.helper || $("<div style='overflow:hidden;'></div>");
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++o.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function(event, dx) {
                return {
                    width: this.originalSize.width + dx
                }
            },
            w: function(event, dx) {
                var cs = this.originalSize,
                sp = this.originalPosition;
                return {
                    left: sp.left + dx,
                    width: cs.width - dx
                }
            },
            n: function(event, dx, dy) {
                var cs = this.originalSize,
                sp = this.originalPosition;
                return {
                    top: sp.top + dy,
                    height: cs.height - dy
                }
            },
            s: function(event, dx, dy) {
                return {
                    height: this.originalSize.height + dy
                }
            },
            se: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]))
            },
            sw: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]))
            },
            ne: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]))
            },
            nw: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]))
            }
        },
        _propagate: function(n, event) {
            $.ui.plugin.call(this, n, [event, this.ui()]); (n !== "resize" && this._trigger(n, event, this.ui()))
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    $.ui.plugin.add("resizable", "animate", {
        stop: function(event) {
            var that = $(this).data("ui-resizable"),
            o = that.options,
            pr = that._proportionallyResizeElements,
            ista = pr.length && (/textarea/i).test(pr[0].nodeName),
            soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
            soffsetw = ista ? 0 : that.sizeDiff.width,
            style = {
                width: (that.size.width - soffsetw),
                height: (that.size.height - soffseth)
            },
            left = (parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left)) || null,
            top = (parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top)) || null;
            that.element.animate($.extend(style, top && left ? {
                top: top,
                left: left
            }: {}), {
                duration: o.animateDuration,
                easing: o.animateEasing,
                step: function() {
                    var data = {
                        width: parseInt(that.element.css("width"), 10),
                        height: parseInt(that.element.css("height"), 10),
                        top: parseInt(that.element.css("top"), 10),
                        left: parseInt(that.element.css("left"), 10)
                    };
                    if (pr && pr.length) {
                        $(pr[0]).css({
                            width: data.width,
                            height: data.height
                        })
                    }
                    that._updateCache(data);
                    that._propagate("resize", event)
                }
            })
        }
    });
    $.ui.plugin.add("resizable", "containment", {
        start: function() {
            var element, p, co, ch, cw, width, height, that = $(this).data("ui-resizable"),
            o = that.options,
            el = that.element,
            oc = o.containment,
            ce = (oc instanceof $) ? oc.get(0) : (/parent/.test(oc)) ? el.parent().get(0) : oc;
            if (!ce) {
                return
            }
            that.containerElement = $(ce);
            if (/document/.test(oc) || oc === document) {
                that.containerOffset = {
                    left: 0,
                    top: 0
                };
                that.containerPosition = {
                    left: 0,
                    top: 0
                };
                that.parentData = {
                    element: $(document),
                    left: 0,
                    top: 0,
                    width: $(document).width(),
                    height: $(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                element = $(ce);
                p = [];
                $(["Top", "Right", "Left", "Bottom"]).each(function(i, name) {
                    p[i] = num(element.css("padding" + name))
                });
                that.containerOffset = element.offset();
                that.containerPosition = element.position();
                that.containerSize = {
                    height: (element.innerHeight() - p[3]),
                    width: (element.innerWidth() - p[1])
                };
                co = that.containerOffset;
                ch = that.containerSize.height;
                cw = that.containerSize.width;
                width = ($.ui.hasScroll(ce, "left") ? ce.scrollWidth: cw);
                height = ($.ui.hasScroll(ce) ? ce.scrollHeight: ch);
                that.parentData = {
                    element: ce,
                    left: co.left,
                    top: co.top,
                    width: width,
                    height: height
                }
            }
        },
        resize: function(event) {
            var woset, hoset, isParent, isOffsetRelative, that = $(this).data("ui-resizable"),
            o = that.options,
            co = that.containerOffset,
            cp = that.position,
            pRatio = that._aspectRatio || event.shiftKey,
            cop = {
                top: 0,
                left: 0
            },
            ce = that.containerElement;
            if (ce[0] !== document && (/static/).test(ce.css("position"))) {
                cop = co
            }
            if (cp.left < (that._helper ? co.left: 0)) {
                that.size.width = that.size.width + (that._helper ? (that.position.left - co.left) : (that.position.left - cop.left));
                if (pRatio) {
                    that.size.height = that.size.width / that.aspectRatio
                }
                that.position.left = o.helper ? co.left: 0
            }
            if (cp.top < (that._helper ? co.top: 0)) {
                that.size.height = that.size.height + (that._helper ? (that.position.top - co.top) : that.position.top);
                if (pRatio) {
                    that.size.width = that.size.height * that.aspectRatio
                }
                that.position.top = that._helper ? co.top: 0
            }
            that.offset.left = that.parentData.left + that.position.left;
            that.offset.top = that.parentData.top + that.position.top;
            woset = Math.abs((that._helper ? that.offset.left - cop.left: (that.offset.left - cop.left)) + that.sizeDiff.width);
            hoset = Math.abs((that._helper ? that.offset.top - cop.top: (that.offset.top - co.top)) + that.sizeDiff.height);
            isParent = that.containerElement.get(0) === that.element.parent().get(0);
            isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position"));
            if (isParent && isOffsetRelative) {
                woset -= that.parentData.left
            }
            if (woset + that.size.width >= that.parentData.width) {
                that.size.width = that.parentData.width - woset;
                if (pRatio) {
                    that.size.height = that.size.width / that.aspectRatio
                }
            }
            if (hoset + that.size.height >= that.parentData.height) {
                that.size.height = that.parentData.height - hoset;
                if (pRatio) {
                    that.size.width = that.size.height * that.aspectRatio
                }
            }
        },
        stop: function() {
            var that = $(this).data("ui-resizable"),
            o = that.options,
            co = that.containerOffset,
            cop = that.containerPosition,
            ce = that.containerElement,
            helper = $(that.helper),
            ho = helper.offset(),
            w = helper.outerWidth() - that.sizeDiff.width,
            h = helper.outerHeight() - that.sizeDiff.height;
            if (that._helper && !o.animate && (/relative/).test(ce.css("position"))) {
                $(this).css({
                    left: ho.left - cop.left - co.left,
                    width: w,
                    height: h
                })
            }
            if (that._helper && !o.animate && (/static/).test(ce.css("position"))) {
                $(this).css({
                    left: ho.left - cop.left - co.left,
                    width: w,
                    height: h
                })
            }
        }
    });
    $.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var that = $(this).data("ui-resizable"),
            o = that.options,
            _store = function(exp) {
                $(exp).each(function() {
                    var el = $(this);
                    el.data("ui-resizable-alsoresize", {
                        width: parseInt(el.width(), 10),
                        height: parseInt(el.height(), 10),
                        left: parseInt(el.css("left"), 10),
                        top: parseInt(el.css("top"), 10)
                    })
                })
            };
            if (typeof(o.alsoResize) === "object" && !o.alsoResize.parentNode) {
                if (o.alsoResize.length) {
                    o.alsoResize = o.alsoResize[0];
                    _store(o.alsoResize)
                } else {
                    $.each(o.alsoResize,
                    function(exp) {
                        _store(exp)
                    })
                }
            } else {
                _store(o.alsoResize)
            }
        },
        resize: function(event, ui) {
            var that = $(this).data("ui-resizable"),
            o = that.options,
            os = that.originalSize,
            op = that.originalPosition,
            delta = {
                height: (that.size.height - os.height) || 0,
                width: (that.size.width - os.width) || 0,
                top: (that.position.top - op.top) || 0,
                left: (that.position.left - op.left) || 0
            },
            _alsoResize = function(exp, c) {
                $(exp).each(function() {
                    var el = $(this),
                    start = $(this).data("ui-resizable-alsoresize"),
                    style = {},
                    css = c && c.length ? c: el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    $.each(css,
                    function(i, prop) {
                        var sum = (start[prop] || 0) + (delta[prop] || 0);
                        if (sum && sum >= 0) {
                            style[prop] = sum || null
                        }
                    });
                    el.css(style)
                })
            };
            if (typeof(o.alsoResize) === "object" && !o.alsoResize.nodeType) {
                $.each(o.alsoResize,
                function(exp, c) {
                    _alsoResize(exp, c)
                })
            } else {
                _alsoResize(o.alsoResize)
            }
        },
        stop: function() {
            $(this).removeData("resizable-alsoresize")
        }
    });
    $.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var that = $(this).data("ui-resizable"),
            o = that.options,
            cs = that.size;
            that.ghost = that.originalElement.clone();
            that.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: cs.height,
                width: cs.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof o.ghost === "string" ? o.ghost: "");
            that.ghost.appendTo(that.helper)
        },
        resize: function() {
            var that = $(this).data("ui-resizable");
            if (that.ghost) {
                that.ghost.css({
                    position: "relative",
                    height: that.size.height,
                    width: that.size.width
                })
            }
        },
        stop: function() {
            var that = $(this).data("ui-resizable");
            if (that.ghost && that.helper) {
                that.helper.get(0).removeChild(that.ghost.get(0))
            }
        }
    });
    $.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var that = $(this).data("ui-resizable"),
            o = that.options,
            cs = that.size,
            os = that.originalSize,
            op = that.originalPosition,
            a = that.axis,
            grid = typeof o.grid === "number" ? [o.grid, o.grid] : o.grid,
            gridX = (grid[0] || 1),
            gridY = (grid[1] || 1),
            ox = Math.round((cs.width - os.width) / gridX) * gridX,
            oy = Math.round((cs.height - os.height) / gridY) * gridY,
            newWidth = os.width + ox,
            newHeight = os.height + oy,
            isMaxWidth = o.maxWidth && (o.maxWidth < newWidth),
            isMaxHeight = o.maxHeight && (o.maxHeight < newHeight),
            isMinWidth = o.minWidth && (o.minWidth > newWidth),
            isMinHeight = o.minHeight && (o.minHeight > newHeight);
            o.grid = grid;
            if (isMinWidth) {
                newWidth = newWidth + gridX
            }
            if (isMinHeight) {
                newHeight = newHeight + gridY
            }
            if (isMaxWidth) {
                newWidth = newWidth - gridX
            }
            if (isMaxHeight) {
                newHeight = newHeight - gridY
            }
            if (/^(se|s|e)$/.test(a)) {
                that.size.width = newWidth;
                that.size.height = newHeight
            } else if (/^(ne)$/.test(a)) {
                that.size.width = newWidth;
                that.size.height = newHeight;
                that.position.top = op.top - oy
            } else if (/^(sw)$/.test(a)) {
                that.size.width = newWidth;
                that.size.height = newHeight;
                that.position.left = op.left - ox
            } else {
                that.size.width = newWidth;
                that.size.height = newHeight;
                that.position.top = op.top - oy;
                that.position.left = op.left - ox
            }
        }
    })
})(jQuery); (function($, undefined) {
    var sizeRelatedOptions = {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
    },
    resizableRelatedOptions = {
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true
    };
    $.widget("ui.dialog", {
        version: "1.10.0",
        options: {
            appendTo: "body",
            autoOpen: true,
            buttons: [],
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            modal: false,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(pos) {
                    var topOffset = $(this).css(pos).offset().top;
                    if (topOffset < 0) {
                        $(this).css("top", pos.top - topOffset)
                    }
                }
            },
            resizable: true,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            };
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            };
            this.originalTitle = this.element.attr("title");
            this.options.title = this.options.title || this.originalTitle;
            this._createWrapper();
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);
            this._createTitlebar();
            this._createButtonPane();
            if (this.options.draggable && $.fn.draggable) {
                this._makeDraggable()
            }
            if (this.options.resizable && $.fn.resizable) {
                this._makeResizable()
            }
            this._isOpen = false
        },
        _init: function() {
            if (this.options.autoOpen) {
                this.open()
            }
        },
        _appendTo: function() {
            var element = this.options.appendTo;
            if (element && (element.jquery || element.nodeType)) {
                return $(element)
            }
            return this.document.find(element || "body").eq(0)
        },
        _destroy: function() {
            var next, originalPosition = this.originalPosition;
            this._destroyOverlay();
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();
            this.uiDialog.stop(true, true).remove();
            if (this.originalTitle) {
                this.element.attr("title", this.originalTitle)
            }
            next = originalPosition.parent.children().eq(originalPosition.index);
            if (next.length && next[0] !== this.element[0]) {
                next.before(this.element)
            } else {
                originalPosition.parent.append(this.element)
            }
        },
        widget: function() {
            return this.uiDialog
        },
        disable: $.noop,
        enable: $.noop,
        close: function(event) {
            var that = this;
            if (!this._isOpen || this._trigger("beforeClose", event) === false) {
                return
            }
            this._isOpen = false;
            this._destroyOverlay();
            if (!this.opener.filter(":focusable").focus().length) {
                $(this.document[0].activeElement).blur()
            }
            this._hide(this.uiDialog, this.options.hide,
            function() {
                that._trigger("close", event)
            })
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(event, silent) {
            var moved = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
            if (moved && !silent) {
                this._trigger("focus", event)
            }
            return moved
        },
        open: function() {
            if (this._isOpen) {
                if (this._moveToTop()) {
                    this._focusTabbable()
                }
                return
            }
            this.opener = $(this.document[0].activeElement);
            this._size();
            this._position();
            this._createOverlay();
            this._moveToTop(null, true);
            this._show(this.uiDialog, this.options.show);
            this._focusTabbable();
            this._isOpen = true;
            this._trigger("open");
            this._trigger("focus")
        },
        _focusTabbable: function() {
            var hasFocus = this.element.find("[autofocus]");
            if (!hasFocus.length) {
                hasFocus = this.element.find(":tabbable")
            }
            if (!hasFocus.length) {
                hasFocus = this.uiDialogButtonPane.find(":tabbable")
            }
            if (!hasFocus.length) {
                hasFocus = this.uiDialogTitlebarClose.filter(":tabbable")
            }
            if (!hasFocus.length) {
                hasFocus = this.uiDialog
            }
            hasFocus.eq(0).focus()
        },
        _keepFocus: function(event) {
            function checkFocus() {
                var activeElement = this.document[0].activeElement,
                isActive = this.uiDialog[0] === activeElement || $.contains(this.uiDialog[0], activeElement);
                if (!isActive) {
                    this._focusTabbable()
                }
            }
            event.preventDefault();
            checkFocus.call(this);
            this._delay(checkFocus)
        },
        _createWrapper: function() {
            this.uiDialog = $("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo());
            this._on(this.uiDialog, {
                keydown: function(event) {
                    if (this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE) {
                        event.preventDefault();
                        this.close(event);
                        return
                    }
                    if (event.keyCode !== $.ui.keyCode.TAB) {
                        return
                    }
                    var tabbables = this.uiDialog.find(":tabbable"),
                    first = tabbables.filter(":first"),
                    last = tabbables.filter(":last");
                    if ((event.target === last[0] || event.target === this.uiDialog[0]) && !event.shiftKey) {
                        first.focus(1);
                        event.preventDefault()
                    } else if ((event.target === first[0] || event.target === this.uiDialog[0]) && event.shiftKey) {
                        last.focus(1);
                        event.preventDefault()
                    }
                },
                mousedown: function(event) {
                    if (this._moveToTop(event)) {
                        this._focusTabbable()
                    }
                }
            });
            if (!this.element.find("[aria-describedby]").length) {
                this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            }
        },
        _createTitlebar: function() {
            var uiDialogTitle;
            this.uiDialogTitlebar = $("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);
            this._on(this.uiDialogTitlebar, {
                mousedown: function(event) {
                    if (!$(event.target).closest(".ui-dialog-titlebar-close")) {
                        this.uiDialog.focus()
                    }
                }
            });
            this.uiDialogTitlebarClose = $("<button></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: false
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);
            this._on(this.uiDialogTitlebarClose, {
                click: function(event) {
                    event.preventDefault();
                    this.close(event)
                }
            });
            uiDialogTitle = $("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);
            this._title(uiDialogTitle);
            this.uiDialog.attr({
                "aria-labelledby": uiDialogTitle.attr("id")
            })
        },
        _title: function(title) {
            if (!this.options.title) {
                title.html(" ")
            }
            title.text(this.options.title)
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = $("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            this.uiButtonSet = $("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);
            this._createButtons()
        },
        _createButtons: function() {
            var that = this,
            buttons = this.options.buttons;
            this.uiDialogButtonPane.remove();
            this.uiButtonSet.empty();
            if ($.isEmptyObject(buttons)) {
                this.uiDialog.removeClass("ui-dialog-buttons");
                return
            }
            $.each(buttons,
            function(name, props) {
                var click, buttonOptions;
                props = $.isFunction(props) ? {
                    click: props,
                    text: name
                }: props;
                props = $.extend({
                    type: "button"
                },
                props);
                click = props.click;
                props.click = function() {
                    click.apply(that.element[0], arguments)
                };
                buttonOptions = {
                    icons: props.icons,
                    text: props.showText
                };
                delete props.icons;
                delete props.showText;
                $("<button></button>", props).button(buttonOptions).appendTo(that.uiButtonSet)
            });
            this.uiDialog.addClass("ui-dialog-buttons");
            this.uiDialogButtonPane.appendTo(this.uiDialog)
        },
        _makeDraggable: function() {
            var that = this,
            options = this.options;
            function filteredUi(ui) {
                return {
                    position: ui.position,
                    offset: ui.offset
                }
            }
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(event, ui) {
                    $(this).addClass("ui-dialog-dragging");
                    that._trigger("dragStart", event, filteredUi(ui))
                },
                drag: function(event, ui) {
                    that._trigger("drag", event, filteredUi(ui))
                },
                stop: function(event, ui) {
                    options.position = [ui.position.left - that.document.scrollLeft(), ui.position.top - that.document.scrollTop()];
                    $(this).removeClass("ui-dialog-dragging");
                    that._trigger("dragStop", event, filteredUi(ui))
                }
            })
        },
        _makeResizable: function() {
            var that = this,
            options = this.options,
            handles = options.resizable,
            position = this.uiDialog.css("position"),
            resizeHandles = typeof handles === "string" ? handles: "n,e,s,w,se,sw,ne,nw";
            function filteredUi(ui) {
                return {
                    originalPosition: ui.originalPosition,
                    originalSize: ui.originalSize,
                    position: ui.position,
                    size: ui.size
                }
            }
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: options.maxWidth,
                maxHeight: options.maxHeight,
                minWidth: options.minWidth,
                minHeight: this._minHeight(),
                handles: resizeHandles,
                start: function(event, ui) {
                    $(this).addClass("ui-dialog-resizing");
                    that._trigger("resizeStart", event, filteredUi(ui))
                },
                resize: function(event, ui) {
                    that._trigger("resize", event, filteredUi(ui))
                },
                stop: function(event, ui) {
                    options.height = $(this).height();
                    options.width = $(this).width();
                    $(this).removeClass("ui-dialog-resizing");
                    that._trigger("resizeStop", event, filteredUi(ui))
                }
            }).css("position", position)
        },
        _minHeight: function() {
            var options = this.options;
            return options.height === "auto" ? options.minHeight: Math.min(options.minHeight, options.height)
        },
        _position: function() {
            var isVisible = this.uiDialog.is(":visible");
            if (!isVisible) {
                this.uiDialog.show()
            }
            this.uiDialog.position(this.options.position);
            if (!isVisible) {
                this.uiDialog.hide()
            }
        },
        _setOptions: function(options) {
            var that = this,
            resize = false,
            resizableOptions = {};
            $.each(options,
            function(key, value) {
                that._setOption(key, value);
                if (key in sizeRelatedOptions) {
                    resize = true
                }
                if (key in resizableRelatedOptions) {
                    resizableOptions[key] = value
                }
            });
            if (resize) {
                this._size();
                this._position()
            }
            if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", resizableOptions)
            }
        },
        _setOption: function(key, value) {
            var isDraggable, isResizable, uiDialog = this.uiDialog;
            if (key === "dialogClass") {
                uiDialog.removeClass(this.options.dialogClass).addClass(value)
            }
            if (key === "disabled") {
                return
            }
            this._super(key, value);
            if (key === "appendTo") {
                this.uiDialog.appendTo(this._appendTo())
            }
            if (key === "buttons") {
                this._createButtons()
            }
            if (key === "closeText") {
                this.uiDialogTitlebarClose.button({
                    label: "" + value
                })
            }
            if (key === "draggable") {
                isDraggable = uiDialog.is(":data(ui-draggable)");
                if (isDraggable && !value) {
                    uiDialog.draggable("destroy")
                }
                if (!isDraggable && value) {
                    this._makeDraggable()
                }
            }
            if (key === "position") {
                this._position()
            }
            if (key === "resizable") {
                isResizable = uiDialog.is(":data(ui-resizable)");
                if (isResizable && !value) {
                    uiDialog.resizable("destroy")
                }
                if (isResizable && typeof value === "string") {
                    uiDialog.resizable("option", "handles", value)
                }
                if (!isResizable && value !== false) {
                    this._makeResizable()
                }
            }
            if (key === "title") {
                this._title(this.uiDialogTitlebar.find(".ui-dialog-title"))
            }
        },
        _size: function() {
            var nonContentHeight, minContentHeight, maxContentHeight, options = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            });
            if (options.minWidth > options.width) {
                options.width = options.minWidth
            }
            nonContentHeight = this.uiDialog.css({
                height: "auto",
                width: options.width
            }).outerHeight();
            minContentHeight = Math.max(0, options.minHeight - nonContentHeight);
            maxContentHeight = typeof options.maxHeight === "number" ? Math.max(0, options.maxHeight - nonContentHeight) : "none";
            if (options.height === "auto") {
                this.element.css({
                    minHeight: minContentHeight,
                    maxHeight: maxContentHeight,
                    height: "auto"
                })
            } else {
                this.element.height(Math.max(0, options.height - nonContentHeight))
            }
            if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        },
        _createOverlay: function() {
            if (!this.options.modal) {
                return
            }
            if (!$.ui.dialog.overlayInstances) {
                this._delay(function() {
                    if ($.ui.dialog.overlayInstances) {
                        this._on(this.document, {
                            focusin: function(event) {
                                if (!$(event.target).closest(".ui-dialog").length) {
                                    event.preventDefault();
                                    $(".ui-dialog:visible:last .ui-dialog-content").data("ui-dialog")._focusTabbable()
                                }
                            }
                        })
                    }
                })
            }
            this.overlay = $("<div>").addClass("ui-widget-overlay ui-front").appendTo(this.document[0].body);
            this._on(this.overlay, {
                mousedown: "_keepFocus"
            });
            $.ui.dialog.overlayInstances++
        },
        _destroyOverlay: function() {
            if (!this.options.modal) {
                return
            }
            $.ui.dialog.overlayInstances--;
            if (!$.ui.dialog.overlayInstances) {
                this._off(this.document, "focusin")
            }
            this.overlay.remove()
        }
    });
    $.ui.dialog.overlayInstances = 0;
    if ($.uiBackCompat !== false) {
        $.widget("ui.dialog", $.ui.dialog, {
            _position: function() {
                var position = this.options.position,
                myAt = [],
                offset = [0, 0],
                isVisible;
                if (position) {
                    if (typeof position === "string" || (typeof position === "object" && "0" in position)) {
                        myAt = position.split ? position.split(" ") : [position[0], position[1]];
                        if (myAt.length === 1) {
                            myAt[1] = myAt[0]
                        }
                        $.each(["left", "top"],
                        function(i, offsetPosition) {
                            if ( + myAt[i] === myAt[i]) {
                                offset[i] = myAt[i];
                                myAt[i] = offsetPosition
                            }
                        });
                        position = {
                            my: myAt[0] + (offset[0] < 0 ? offset[0] : "+" + offset[0]) + " " + myAt[1] + (offset[1] < 0 ? offset[1] : "+" + offset[1]),
                            at: myAt.join(" ")
                        }
                    }
                    position = $.extend({},
                    $.ui.dialog.prototype.options.position, position)
                } else {
                    position = $.ui.dialog.prototype.options.position
                }
                isVisible = this.uiDialog.is(":visible");
                if (!isVisible) {
                    this.uiDialog.show()
                }
                this.uiDialog.position(position);
                if (!isVisible) {
                    this.uiDialog.hide()
                }
            }
        })
    }
} (jQuery)); (function($, undefined) {
    $.ui = $.ui || {};
    var cachedScrollbarWidth, max = Math.max,
    abs = Math.abs,
    round = Math.round,
    rhorizontal = /left|center|right/,
    rvertical = /top|center|bottom/,
    roffset = /[\+\-]\d+%?/,
    rposition = /^\w+/,
    rpercent = /%$/,
    _position = $.fn.position;
    function getOffsets(offsets, width, height) {
        return [parseInt(offsets[0], 10) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseInt(offsets[1], 10) * (rpercent.test(offsets[1]) ? height / 100 : 1)]
    }
    function parseCss(element, property) {
        return parseInt($.css(element, property), 10) || 0
    }
    function getDimensions(elem) {
        var raw = elem[0];
        if (raw.nodeType === 9) {
            return {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            }
        }
        if ($.isWindow(raw)) {
            return {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: elem.scrollTop(),
                    left: elem.scrollLeft()
                }
            }
        }
        if (raw.preventDefault) {
            return {
                width: 0,
                height: 0,
                offset: {
                    top: raw.pageY,
                    left: raw.pageX
                }
            }
        }
        return {
            width: elem.outerWidth(),
            height: elem.outerHeight(),
            offset: elem.offset()
        }
    }
    $.position = {
        scrollbarWidth: function() {
            if (cachedScrollbarWidth !== undefined) {
                return cachedScrollbarWidth
            }
            var w1, w2, div = $("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
            innerDiv = div.children()[0];
            $("body").append(div);
            w1 = innerDiv.offsetWidth;
            div.css("overflow", "scroll");
            w2 = innerDiv.offsetWidth;
            if (w1 === w2) {
                w2 = div[0].clientWidth
            }
            div.remove();
            return (cachedScrollbarWidth = w1 - w2)
        },
        getScrollInfo: function(within) {
            var overflowX = within.isWindow ? "": within.element.css("overflow-x"),
            overflowY = within.isWindow ? "": within.element.css("overflow-y"),
            hasOverflowX = overflowX === "scroll" || (overflowX === "auto" && within.width < within.element[0].scrollWidth),
            hasOverflowY = overflowY === "scroll" || (overflowY === "auto" && within.height < within.element[0].scrollHeight);
            return {
                width: hasOverflowX ? $.position.scrollbarWidth() : 0,
                height: hasOverflowY ? $.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(element) {
            var withinElement = $(element || window),
            isWindow = $.isWindow(withinElement[0]);
            return {
                element: withinElement,
                isWindow: isWindow,
                offset: withinElement.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: withinElement.scrollLeft(),
                scrollTop: withinElement.scrollTop(),
                width: isWindow ? withinElement.width() : withinElement.outerWidth(),
                height: isWindow ? withinElement.height() : withinElement.outerHeight()
            }
        }
    };
    $.fn.position = function(options) {
        if (!options || !options.of) {
            return _position.apply(this, arguments)
        }
        options = $.extend({},
        options);
        var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions, target = $(options.of),
        within = $.position.getWithinInfo(options.within),
        scrollInfo = $.position.getScrollInfo(within),
        collision = (options.collision || "flip").split(" "),
        offsets = {};
        dimensions = getDimensions(target);
        if (target[0].preventDefault) {
            options.at = "left top"
        }
        targetWidth = dimensions.width;
        targetHeight = dimensions.height;
        targetOffset = dimensions.offset;
        basePosition = $.extend({},
        targetOffset);
        $.each(["my", "at"],
        function() {
            var pos = (options[this] || "").split(" "),
            horizontalOffset,
            verticalOffset;
            if (pos.length === 1) {
                pos = rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"]
            }
            pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
            pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";
            horizontalOffset = roffset.exec(pos[0]);
            verticalOffset = roffset.exec(pos[1]);
            offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0];
            options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]]
        });
        if (collision.length === 1) {
            collision[1] = collision[0]
        }
        if (options.at[0] === "right") {
            basePosition.left += targetWidth
        } else if (options.at[0] === "center") {
            basePosition.left += targetWidth / 2
        }
        if (options.at[1] === "bottom") {
            basePosition.top += targetHeight
        } else if (options.at[1] === "center") {
            basePosition.top += targetHeight / 2
        }
        atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
        basePosition.left += atOffset[0];
        basePosition.top += atOffset[1];
        return this.each(function() {
            var collisionPosition, using, elem = $(this),
            elemWidth = elem.outerWidth(),
            elemHeight = elem.outerHeight(),
            marginLeft = parseCss(this, "marginLeft"),
            marginTop = parseCss(this, "marginTop"),
            collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width,
            collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height,
            position = $.extend({},
            basePosition),
            myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
            if (options.my[0] === "right") {
                position.left -= elemWidth
            } else if (options.my[0] === "center") {
                position.left -= elemWidth / 2
            }
            if (options.my[1] === "bottom") {
                position.top -= elemHeight
            } else if (options.my[1] === "center") {
                position.top -= elemHeight / 2
            }
            position.left += myOffset[0];
            position.top += myOffset[1];
            if (!$.support.offsetFractions) {
                position.left = round(position.left);
                position.top = round(position.top)
            }
            collisionPosition = {
                marginLeft: marginLeft,
                marginTop: marginTop
            };
            $.each(["left", "top"],
            function(i, dir) {
                if ($.ui.position[collision[i]]) {
                    $.ui.position[collision[i]][dir](position, {
                        targetWidth: targetWidth,
                        targetHeight: targetHeight,
                        elemWidth: elemWidth,
                        elemHeight: elemHeight,
                        collisionPosition: collisionPosition,
                        collisionWidth: collisionWidth,
                        collisionHeight: collisionHeight,
                        offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                        my: options.my,
                        at: options.at,
                        within: within,
                        elem: elem
                    })
                }
            });
            if (options.using) {
                using = function(props) {
                    var left = targetOffset.left - position.left,
                    right = left + targetWidth - elemWidth,
                    top = targetOffset.top - position.top,
                    bottom = top + targetHeight - elemHeight,
                    feedback = {
                        target: {
                            element: target,
                            left: targetOffset.left,
                            top: targetOffset.top,
                            width: targetWidth,
                            height: targetHeight
                        },
                        element: {
                            element: elem,
                            left: position.left,
                            top: position.top,
                            width: elemWidth,
                            height: elemHeight
                        },
                        horizontal: right < 0 ? "left": left > 0 ? "right": "center",
                        vertical: bottom < 0 ? "top": top > 0 ? "bottom": "middle"
                    };
                    if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
                        feedback.horizontal = "center"
                    }
                    if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
                        feedback.vertical = "middle"
                    }
                    if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
                        feedback.important = "horizontal"
                    } else {
                        feedback.important = "vertical"
                    }
                    options.using.call(this, props, feedback)
                }
            }
            elem.offset($.extend(position, {
                using: using
            }))
        })
    };
    $.ui.position = {
        fit: {
            left: function(position, data) {
                var within = data.within,
                withinOffset = within.isWindow ? within.scrollLeft: within.offset.left,
                outerWidth = within.width,
                collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                overLeft = withinOffset - collisionPosLeft,
                overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
                newOverRight;
                if (data.collisionWidth > outerWidth) {
                    if (overLeft > 0 && overRight <= 0) {
                        newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
                        position.left += overLeft - newOverRight
                    } else if (overRight > 0 && overLeft <= 0) {
                        position.left = withinOffset
                    } else {
                        if (overLeft > overRight) {
                            position.left = withinOffset + outerWidth - data.collisionWidth
                        } else {
                            position.left = withinOffset
                        }
                    }
                } else if (overLeft > 0) {
                    position.left += overLeft
                } else if (overRight > 0) {
                    position.left -= overRight
                } else {
                    position.left = max(position.left - collisionPosLeft, position.left)
                }
            },
            top: function(position, data) {
                var within = data.within,
                withinOffset = within.isWindow ? within.scrollTop: within.offset.top,
                outerHeight = data.within.height,
                collisionPosTop = position.top - data.collisionPosition.marginTop,
                overTop = withinOffset - collisionPosTop,
                overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
                newOverBottom;
                if (data.collisionHeight > outerHeight) {
                    if (overTop > 0 && overBottom <= 0) {
                        newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
                        position.top += overTop - newOverBottom
                    } else if (overBottom > 0 && overTop <= 0) {
                        position.top = withinOffset
                    } else {
                        if (overTop > overBottom) {
                            position.top = withinOffset + outerHeight - data.collisionHeight
                        } else {
                            position.top = withinOffset
                        }
                    }
                } else if (overTop > 0) {
                    position.top += overTop
                } else if (overBottom > 0) {
                    position.top -= overBottom
                } else {
                    position.top = max(position.top - collisionPosTop, position.top)
                }
            }
        },
        flip: {
            left: function(position, data) {
                var within = data.within,
                withinOffset = within.offset.left + within.scrollLeft,
                outerWidth = within.width,
                offsetLeft = within.isWindow ? within.scrollLeft: within.offset.left,
                collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                overLeft = collisionPosLeft - offsetLeft,
                overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                myOffset = data.my[0] === "left" ? -data.elemWidth: data.my[0] === "right" ? data.elemWidth: 0,
                atOffset = data.at[0] === "left" ? data.targetWidth: data.at[0] === "right" ? -data.targetWidth: 0,
                offset = -2 * data.offset[0],
                newOverRight,
                newOverLeft;
                if (overLeft < 0) {
                    newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
                    if (newOverRight < 0 || newOverRight < abs(overLeft)) {
                        position.left += myOffset + atOffset + offset
                    }
                } else if (overRight > 0) {
                    newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
                    if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
                        position.left += myOffset + atOffset + offset
                    }
                }
            },
            top: function(position, data) {
                var within = data.within,
                withinOffset = within.offset.top + within.scrollTop,
                outerHeight = within.height,
                offsetTop = within.isWindow ? within.scrollTop: within.offset.top,
                collisionPosTop = position.top - data.collisionPosition.marginTop,
                overTop = collisionPosTop - offsetTop,
                overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                top = data.my[1] === "top",
                myOffset = top ? -data.elemHeight: data.my[1] === "bottom" ? data.elemHeight: 0,
                atOffset = data.at[1] === "top" ? data.targetHeight: data.at[1] === "bottom" ? -data.targetHeight: 0,
                offset = -2 * data.offset[1],
                newOverTop,
                newOverBottom;
                if (overTop < 0) {
                    newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
                    if ((position.top + myOffset + atOffset + offset) > overTop && (newOverBottom < 0 || newOverBottom < abs(overTop))) {
                        position.top += myOffset + atOffset + offset
                    }
                } else if (overBottom > 0) {
                    newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
                    if ((position.top + myOffset + atOffset + offset) > overBottom && (newOverTop > 0 || abs(newOverTop) < overBottom)) {
                        position.top += myOffset + atOffset + offset
                    }
                }
            }
        },
        flipfit: {
            left: function() {
                $.ui.position.flip.left.apply(this, arguments);
                $.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                $.ui.position.flip.top.apply(this, arguments);
                $.ui.position.fit.top.apply(this, arguments)
            }
        }
    }; (function() {
        var testElement, testElementParent, testElementStyle, offsetLeft, i, body = document.getElementsByTagName("body")[0],
        div = document.createElement("div");
        testElement = document.createElement(body ? "div": "body");
        testElementStyle = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        };
        if (body) {
            $.extend(testElementStyle, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            })
        }
        for (i in testElementStyle) {
            testElement.style[i] = testElementStyle[i]
        }
        testElement.appendChild(div);
        testElementParent = body || document.documentElement;
        testElementParent.insertBefore(testElement, testElementParent.firstChild);
        div.style.cssText = "position: absolute; left: 10.7432222px;";
        offsetLeft = $(div).offset().left;
        $.support.offsetFractions = offsetLeft > 10 && offsetLeft < 11;
        testElement.innerHTML = "";
        testElementParent.removeChild(testElement)
    })()
} (jQuery)); (function($, undefined) {
    var lastActive, startXPos, startYPos, clickDragged, baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",
    stateClasses = "ui-state-hover ui-state-active ",
    typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
    formResetHandler = function() {
        var buttons = $(this).find(":ui-button");
        setTimeout(function() {
            buttons.button("refresh")
        },
        1)
    },
    radioGroup = function(radio) {
        var name = radio.name,
        form = radio.form,
        radios = $([]);
        if (name) {
            name = name.replace(/'/g, "\\'");
            if (form) {
                radios = $(form).find("[name='" + name + "']")
            } else {
                radios = $("[name='" + name + "']", radio.ownerDocument).filter(function() {
                    return ! this.form
                })
            }
        }
        return radios
    };
    $.widget("ui.button", {
        version: "1.10.0",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, formResetHandler);
            if (typeof this.options.disabled !== "boolean") {
                this.options.disabled = !!this.element.prop("disabled")
            } else {
                this.element.prop("disabled", this.options.disabled)
            }
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var that = this,
            options = this.options,
            toggleButton = this.type === "checkbox" || this.type === "radio",
            activeClass = !toggleButton ? "ui-state-active": "",
            focusClass = "ui-state-focus";
            if (options.label === null) {
                options.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html())
            }
            this._hoverable(this.buttonElement);
            this.buttonElement.addClass(baseClasses).attr("role", "button").bind("mouseenter" + this.eventNamespace,
            function() {
                if (options.disabled) {
                    return
                }
                if (this === lastActive) {
                    $(this).addClass("ui-state-active")
                }
            }).bind("mouseleave" + this.eventNamespace,
            function() {
                if (options.disabled) {
                    return
                }
                $(this).removeClass(activeClass)
            }).bind("click" + this.eventNamespace,
            function(event) {
                if (options.disabled) {
                    event.preventDefault();
                    event.stopImmediatePropagation()
                }
            });
            this.element.bind("focus" + this.eventNamespace,
            function() {
                that.buttonElement.addClass(focusClass)
            }).bind("blur" + this.eventNamespace,
            function() {
                that.buttonElement.removeClass(focusClass)
            });
            if (toggleButton) {
                this.element.bind("change" + this.eventNamespace,
                function() {
                    if (clickDragged) {
                        return
                    }
                    that.refresh()
                });
                this.buttonElement.bind("mousedown" + this.eventNamespace,
                function(event) {
                    if (options.disabled) {
                        return
                    }
                    clickDragged = false;
                    startXPos = event.pageX;
                    startYPos = event.pageY
                }).bind("mouseup" + this.eventNamespace,
                function(event) {
                    if (options.disabled) {
                        return
                    }
                    if (startXPos !== event.pageX || startYPos !== event.pageY) {
                        clickDragged = true
                    }
                })
            }
            if (this.type === "checkbox") {
                this.buttonElement.bind("click" + this.eventNamespace,
                function() {
                    if (options.disabled || clickDragged) {
                        return false
                    }
                })
            } else if (this.type === "radio") {
                this.buttonElement.bind("click" + this.eventNamespace,
                function() {
                    if (options.disabled || clickDragged) {
                        return false
                    }
                    $(this).addClass("ui-state-active");
                    that.buttonElement.attr("aria-pressed", "true");
                    var radio = that.element[0];
                    radioGroup(radio).not(radio).map(function() {
                        return $(this).button("widget")[0]
                    }).removeClass("ui-state-active").attr("aria-pressed", "false")
                })
            } else {
                this.buttonElement.bind("mousedown" + this.eventNamespace,
                function() {
                    if (options.disabled) {
                        return false
                    }
                    $(this).addClass("ui-state-active");
                    lastActive = this;
                    that.document.one("mouseup",
                    function() {
                        lastActive = null
                    })
                }).bind("mouseup" + this.eventNamespace,
                function() {
                    if (options.disabled) {
                        return false
                    }
                    $(this).removeClass("ui-state-active")
                }).bind("keydown" + this.eventNamespace,
                function(event) {
                    if (options.disabled) {
                        return false
                    }
                    if (event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER) {
                        $(this).addClass("ui-state-active")
                    }
                }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace,
                function() {
                    $(this).removeClass("ui-state-active")
                });
                if (this.buttonElement.is("a")) {
                    this.buttonElement.keyup(function(event) {
                        if (event.keyCode === $.ui.keyCode.SPACE) {
                            $(this).click()
                        }
                    })
                }
            }
            this._setOption("disabled", options.disabled);
            this._resetButton()
        },
        _determineButtonType: function() {
            var ancestor, labelSelector, checked;
            if (this.element.is("[type=checkbox]")) {
                this.type = "checkbox"
            } else if (this.element.is("[type=radio]")) {
                this.type = "radio"
            } else if (this.element.is("input")) {
                this.type = "input"
            } else {
                this.type = "button"
            }
            if (this.type === "checkbox" || this.type === "radio") {
                ancestor = this.element.parents().last();
                labelSelector = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = ancestor.find(labelSelector);
                if (!this.buttonElement.length) {
                    ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings();
                    this.buttonElement = ancestor.filter(labelSelector);
                    if (!this.buttonElement.length) {
                        this.buttonElement = ancestor.find(labelSelector)
                    }
                }
                this.element.addClass("ui-helper-hidden-accessible");
                checked = this.element.is(":checked");
                if (checked) {
                    this.buttonElement.addClass("ui-state-active")
                }
                this.buttonElement.prop("aria-pressed", checked)
            } else {
                this.buttonElement = this.element
            }
        },
        widget: function() {
            return this.buttonElement
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass(baseClasses + " " + stateClasses + " " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            if (!this.hasTitle) {
                this.buttonElement.removeAttr("title")
            }
        },
        _setOption: function(key, value) {
            this._super(key, value);
            if (key === "disabled") {
                if (value) {
                    this.element.prop("disabled", true)
                } else {
                    this.element.prop("disabled", false)
                }
                return
            }
            this._resetButton()
        },
        refresh: function() {
            var isDisabled = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            if (isDisabled !== this.options.disabled) {
                this._setOption("disabled", isDisabled)
            }
            if (this.type === "radio") {
                radioGroup(this.element[0]).each(function() {
                    if ($(this).is(":checked")) {
                        $(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true")
                    } else {
                        $(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                    }
                })
            } else if (this.type === "checkbox") {
                if (this.element.is(":checked")) {
                    this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true")
                } else {
                    this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false")
                }
            }
        },
        _resetButton: function() {
            if (this.type === "input") {
                if (this.options.label) {
                    this.element.val(this.options.label)
                }
                return
            }
            var buttonElement = this.buttonElement.removeClass(typeClasses),
            buttonText = $("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(),
            icons = this.options.icons,
            multipleIcons = icons.primary && icons.secondary,
            buttonClasses = [];
            if (icons.primary || icons.secondary) {
                if (this.options.text) {
                    buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s": (icons.primary ? "-primary": "-secondary")))
                }
                if (icons.primary) {
                    buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>")
                }
                if (icons.secondary) {
                    buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>")
                }
                if (!this.options.text) {
                    buttonClasses.push(multipleIcons ? "ui-button-icons-only": "ui-button-icon-only");
                    if (!this.hasTitle) {
                        buttonElement.attr("title", $.trim(buttonText))
                    }
                }
            } else {
                buttonClasses.push("ui-button-text-only")
            }
            buttonElement.addClass(buttonClasses.join(" "))
        }
    });
    $.widget("ui.buttonset", {
        version: "1.10.0",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(key, value) {
            if (key === "disabled") {
                this.buttons.button("option", key, value)
            }
            this._super(key, value)
        },
        refresh: function() {
            var rtl = this.element.css("direction") === "rtl";
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return $(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(rtl ? "ui-corner-right": "ui-corner-left").end().filter(":last").addClass(rtl ? "ui-corner-left": "ui-corner-right").end().end()
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function() {
                return $(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
} (jQuery));
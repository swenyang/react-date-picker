(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("react-ultra-select"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "react-ultra-select"], factory);
	else if(typeof exports === 'object')
		exports["react-ultra-date-picker"] = factory(require("react"), require("react-dom"), require("react-ultra-select"));
	else
		root["react-ultra-date-picker"] = factory(root["react"], root["react-dom"], root["react-ultra-select"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addLocaleConfig = exports.translateHour = exports.isPm = exports.padStartWith0 = exports.daysInMonth = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactUltraSelect = __webpack_require__(4);

	var _reactUltraSelect2 = _interopRequireDefault(_reactUltraSelect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var daysInMonth = exports.daysInMonth = function daysInMonth(year, month) {
	    return new Date(year, month, 0).getDate();
	};

	var padStartWith0 = exports.padStartWith0 = function padStartWith0(num) {
	    return num >= 10 ? num.toString() : '0' + num;
	};

	var isPm = exports.isPm = function isPm(date) {
	    return date.getHours() >= 12;
	};

	var translateHour = exports.translateHour = function translateHour(hour, use24hours) {
	    return use24hours ? padStartWith0(hour) : hour % 12 === 0 ? '12' : padStartWith0(hour % 12);
	};

	var localeConfigs = {
	    'en': {
	        order: ['month', 'date', 'year', 'hour', 'minute', 'ampm'],
	        year: function year(_year) {
	            return _year;
	        },
	        month: function month(_month) {
	            return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][_month];
	        },
	        date: function date(_date) {
	            return _date;
	        },
	        am: 'AM',
	        pm: 'PM',
	        hour: translateHour,
	        minute: function minute(_minute) {
	            return padStartWith0(_minute);
	        },
	        confirmButton: 'CONFIRM'
	    },
	    'zh-cn': {
	        order: ['year', 'month', 'date', 'ampm', 'hour', 'minute'],
	        year: function year(_year2) {
	            return _year2 + '年';
	        },
	        month: function month(_month2) {
	            return _month2 + 1 + '月';
	        },
	        date: function date(_date2) {
	            return _date2 + '日';
	        },
	        am: '上午',
	        pm: '下午',
	        hour: translateHour,
	        minute: function minute(_minute2) {
	            return padStartWith0(_minute2);
	        },
	        confirmButton: '确定'
	    }
	};

	// to keep this library size small, expose a function to expand localeConfigs on demand
	var addLocaleConfig = exports.addLocaleConfig = function addLocaleConfig(name, config) {
	    localeConfigs[name] = config;
	};

	var dateStringProp = function dateStringProp(props, propName, componentName) {
	    if (!props[propName]) return;
	    if (Number.isNaN(new Date(props[propName]))) {
	        return new Error(componentName + ': ' + propName + ' invalid date string provided.');
	    }
	};

	var DatePicker = function (_Component) {
	    _inherits(DatePicker, _Component);

	    function DatePicker(props) {
	        _classCallCheck(this, DatePicker);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatePicker).call(this, props));

	        _this.getTitle = _this.getTitle.bind(_this);
	        _this.onSelect = _this.onSelect.bind(_this);
	        _this.onDidSelect = _this.onDidSelect.bind(_this);

	        _this.state = _this.calColumnsAndKeys(_this.getDefaults(props));
	        return _this;
	    }

	    _createClass(DatePicker, [{
	        key: 'getDefaults',
	        value: function getDefaults(props) {
	            props = props || this.props;
	            var defaultDate = props.defaultDate ? new Date(props.defaultDate) : new Date();
	            return {
	                year: defaultDate.getFullYear(),
	                month: defaultDate.getMonth(),
	                date: defaultDate.getDate(),
	                ampm: isPm(defaultDate) ? 'pm' : 'am',
	                hour: defaultDate.getHours(),
	                minute: defaultDate.getMinutes()
	            };
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var hasChanged = false;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = Object.keys(nextProps)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    if (nextProps[key] !== this.props[key]) {
	                        hasChanged = true;
	                        break;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            if (hasChanged) {
	                var defaults = this.getDefaults(nextProps);
	                this.setState(this.calColumnsAndKeys(defaults, nextProps));
	            }
	        }
	    }, {
	        key: 'getPrefix',
	        value: function getPrefix(i) {
	            if (i === 0) return '';
	            switch (this.state.keys[i]) {
	                case 'hour':
	                case 'ampm':
	                    return ' ';
	                case 'minute':
	                    return ':';
	                default:
	                    return '-';
	            }
	        }
	    }, {
	        key: 'getTitle',
	        value: function getTitle(selectedValues) {
	            var _this2 = this;

	            return _react2.default.createElement(
	                'span',
	                null,
	                selectedValues.map(function (e, i) {
	                    return _react2.default.createElement(
	                        'span',
	                        { key: i },
	                        _this2.getPrefix(i),
	                        e.value
	                    );
	                })
	            );
	        }
	    }, {
	        key: 'getValueFromState',
	        value: function getValueFromState(key, defaultIndex) {
	            var state = this.state;
	            var columnIndex = state.keys.findIndex(function (e) {
	                return e === key;
	            });
	            defaultIndex = typeof defaultIndex === 'number' ? defaultIndex : state.columns[columnIndex].defaultIndex;
	            return state.columns[columnIndex].list[defaultIndex].key;
	        }
	    }, {
	        key: 'calColumnsAndKeys',
	        value: function calColumnsAndKeys(defaults, props) {
	            props = props || this.props;
	            var _props = props;
	            var type = _props.type;
	            var use24hours = _props.use24hours;
	            var min = _props.min;
	            var max = _props.max;
	            var locale = _props.locale;
	            // 1. select keys
	            // WARNING: keys in selectedKeys should be arranged in order to ensure DatePicker work properly
	            // year -> month -> date -> ampm -> hour -> minute
	            // that is, from bigger scope to smaller scope

	            var selectedKeys = void 0;
	            switch (type) {
	                case 'date':
	                    selectedKeys = ['year', 'month', 'date'];
	                    break;
	                case 'datetime':
	                    if (use24hours) {
	                        selectedKeys = ['year', 'month', 'date', 'hour', 'minute'];
	                    } else {
	                        selectedKeys = ['year', 'month', 'date', 'ampm', 'hour', 'minute'];
	                    }
	                    break;
	                case 'time':
	                    if (use24hours) {
	                        selectedKeys = ['hour', 'minute'];
	                    } else {
	                        selectedKeys = ['ampm', 'hour', 'minute'];
	                    }
	                    break;
	                case 'month':
	                    selectedKeys = ['year', 'month'];
	                    break;
	            }
	            // 2. calculate range for each
	            var columnsDict = {};
	            var minDate = new Date('' + min);
	            var maxDate = new Date('' + max);
	            for (var i = 0, l = selectedKeys.length; i < l; i++) {
	                switch (selectedKeys[i]) {
	                    case 'year':
	                        columnsDict[selectedKeys[i]] = this.calYear(minDate, maxDate, defaults);
	                        break;
	                    case 'month':
	                        columnsDict[selectedKeys[i]] = this.calMonth(minDate, maxDate, defaults);
	                        break;
	                    case 'date':
	                        columnsDict[selectedKeys[i]] = this.calDate(minDate, maxDate, defaults);
	                        break;
	                    case 'ampm':
	                        columnsDict[selectedKeys[i]] = this.calAMPM(minDate, maxDate, defaults);
	                        break;
	                    case 'hour':
	                        columnsDict[selectedKeys[i]] = this.calHour(minDate, maxDate, defaults);
	                        break;
	                    case 'minute':
	                        columnsDict[selectedKeys[i]] = this.calMinute(minDate, maxDate, defaults);
	                        break;
	                }
	            }
	            // 3. order columns
	            var config = localeConfigs[locale];
	            var columns = [];
	            var keys = [];
	            for (var _i = 0, _l = config.order.length; _i < _l; _i++) {
	                if (columnsDict[config.order[_i]]) {
	                    columns.push(columnsDict[config.order[_i]]);
	                    keys.push(config.order[_i]);
	                }
	            }
	            return {
	                keys: keys,
	                columns: columns
	            };
	        }
	    }, {
	        key: 'newDate',
	        value: function newDate(year, month, date, hour, minute) {
	            return new Date(year, month, date, hour, minute);
	        }
	    }, {
	        key: 'onSelect',
	        value: function onSelect(index, selectedValue) {
	            var defaults = this.getDefaults();
	            var newIndex = this.state.columns[index].list.findIndex(function (e) {
	                return e.key === selectedValue.key;
	            });
	            for (var i = 0, l = this.state.keys.length; i < l; i++) {
	                var key = this.state.keys[i];
	                defaults[key] = this.getValueFromState(key, i === index ? newIndex : null);
	            }
	            this.setState(this.calColumnsAndKeys(defaults));

	            if (this.props.onSelect) {
	                this.props.onSelect(this.date);
	            }
	        }
	    }, {
	        key: 'onDidSelect',
	        value: function onDidSelect(index, selectedValue) {
	            if (this.props.onDidSelect) {
	                this.props.onDidSelect(this.date);
	            }
	        }
	    }, {
	        key: 'inDateRange',
	        value: function inDateRange(d, min, max) {
	            return d.getTime() >= min.getTime() && d.getTime() <= max.getTime();
	        }
	    }, {
	        key: 'calYear',
	        value: function calYear(min, max, defaults) {
	            var ret = { list: [], defaultIndex: -1 };
	            for (var i = min.getFullYear(), l = max.getFullYear(), index = 0; i <= l; i++) {
	                var dMin = this.newDate(i, 1, 1, 0, 0);
	                var dMax = this.newDate(i, 12, 31, 23, 59);
	                if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
	                    ret.list.push({
	                        key: i,
	                        value: localeConfigs[this.props.locale].year(i)
	                    });
	                    if (i === defaults.year) {
	                        ret.defaultIndex = index;
	                    }
	                    index++;
	                }
	            }
	            if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1;
	            if (ret.list.length > 0) defaults.year = ret.list[ret.defaultIndex].key;
	            return ret;
	        }
	    }, {
	        key: 'calMonth',
	        value: function calMonth(min, max, defaults) {
	            var ret = { list: [], defaultIndex: -1 };
	            for (var i = 0, index = 0; i < 12; i++) {
	                var dMin = this.newDate(defaults.year, i, 1, 0, 0);
	                var dMax = this.newDate(defaults.year, i, daysInMonth(defaults.year, i + 1), 23, 59);
	                if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
	                    ret.list.push({
	                        key: i,
	                        value: localeConfigs[this.props.locale].month(i)
	                    });
	                    if (i === defaults.month) {
	                        ret.defaultIndex = index;
	                    }
	                    index++;
	                }
	            }
	            if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1;
	            if (ret.list.length > 0) defaults.month = ret.list[ret.defaultIndex].key;
	            return ret;
	        }
	    }, {
	        key: 'calDate',
	        value: function calDate(min, max, defaults) {
	            var ret = { list: [], defaultIndex: -1 };
	            var days = daysInMonth(defaults.year, defaults.month);
	            for (var i = 1, index = 0; i <= days; i++) {
	                var dMin = this.newDate(defaults.year, defaults.month, i, 0, 0);
	                var dMax = this.newDate(defaults.year, defaults.month, i, 23, 59);
	                if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
	                    ret.list.push({
	                        key: i,
	                        value: localeConfigs[this.props.locale].date(i)
	                    });
	                    if (i === defaults.date) {
	                        ret.defaultIndex = index;
	                    }
	                    index++;
	                }
	            }
	            if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1;
	            if (ret.list.length > 0) defaults.date = ret.list[ret.defaultIndex].key;
	            return ret;
	        }
	    }, {
	        key: 'calAMPM',
	        value: function calAMPM(min, max, defaults) {
	            var ret = { list: [], defaultIndex: -1 };
	            var index = 0;
	            var dMin = this.newDate(defaults.year, defaults.month, defaults.date, 0, 0);
	            var dMax = this.newDate(defaults.year, defaults.month, defaults.date, 11, 59);
	            if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
	                ret.list.push({
	                    key: 'am',
	                    value: localeConfigs[this.props.locale].am
	                });
	                if (defaults.ampm === 'am') {
	                    ret.defaultIndex = index;
	                }
	                index++;
	            }
	            dMin = this.newDate(defaults.year, defaults.month, defaults.date, 12, 0);
	            dMax = this.newDate(defaults.year, defaults.month, defaults.date, 23, 59);
	            if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
	                ret.list.push({
	                    key: 'pm',
	                    value: localeConfigs[this.props.locale].pm
	                });
	                if (defaults.ampm === 'pm') {
	                    ret.defaultIndex = index;
	                }
	            }
	            if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1;
	            if (ret.list.length > 0) defaults.ampm = ret.list[ret.defaultIndex].key;
	            return ret;
	        }
	    }, {
	        key: 'calHour',
	        value: function calHour(min, max, defaults) {
	            var ret = { list: [], defaultIndex: -1 };
	            var start = void 0,
	                end = void 0;
	            if (this.props.use24hours) {
	                start = 0;
	                end = 23;
	            } else {
	                start = 0;
	                end = 11;
	            }
	            for (var i = start, index = 0; i <= end; i++) {
	                var hours = i;
	                if (!this.props.use24hours && defaults.ampm === 'pm') {
	                    hours += 12;
	                }
	                var dMin = this.newDate(defaults.year, defaults.month, defaults.date, hours, 0);
	                var dMax = this.newDate(defaults.year, defaults.month, defaults.date, hours, 59);
	                if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
	                    ret.list.push({
	                        key: hours,
	                        value: localeConfigs[this.props.locale].hour(hours, this.props.use24hours)
	                    });
	                    if (hours === defaults.hour) {
	                        ret.defaultIndex = index;
	                    }
	                    index++;
	                }
	            }
	            if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1;
	            if (ret.list.length > 0) defaults.hour = ret.list[ret.defaultIndex].key;
	            return ret;
	        }
	    }, {
	        key: 'calMinute',
	        value: function calMinute(min, max, defaults) {
	            var ret = { list: [], defaultIndex: -1 };
	            for (var i = 0, index = 0; i < 60; i++) {
	                var d = this.newDate(defaults.year, defaults.month, defaults.date, defaults.hour, i);
	                if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
	                    ret.list.push({
	                        key: i,
	                        value: localeConfigs[this.props.locale].minute(i)
	                    });
	                    if (i === defaults.minute) {
	                        ret.defaultIndex = index;
	                    }
	                    index++;
	                }
	            }
	            if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1;
	            if (ret.list.length > 0) defaults.minute = ret.list[ret.defaultIndex].key;
	            return ret;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var copyColumns = [],
	                columns = this.state.columns;
	            for (var i = 0, l = columns.length; i < l; i++) {
	                copyColumns.push({ list: [].concat(_toConsumableArray(columns[i].list)), defaultIndex: columns[i].defaultIndex });
	            }
	            return _react2.default.createElement(_reactUltraSelect2.default, { columns: copyColumns,
	                onSelect: this.onSelect,
	                onDidSelect: this.onDidSelect,
	                confirmButton: localeConfigs[this.props.locale].confirmButton,
	                getTitle: this.props.getTitle || this.getTitle,
	                getStaticText: this.props.getStaticText || this.getTitle
	            });
	        }
	    }, {
	        key: 'date',
	        get: function get() {
	            var defaults = this.getDefaults();
	            for (var i = 0, l = this.state.keys.length; i < l; i++) {
	                var key = this.state.keys[i];
	                defaults[key] = this.getValueFromState(key, null);
	            }
	            return this.newDate(defaults.year, defaults.month, defaults.date, defaults.hour, defaults.minute);
	        }
	    }]);

	    return DatePicker;
	}(_react.Component);

	DatePicker.propTypes = {
	    max: dateStringProp,
	    min: dateStringProp,
	    defaultDate: dateStringProp,
	    type: _react.PropTypes.oneOf(['date', 'datetime', 'time', 'month']),
	    locale: _react.PropTypes.string,
	    use24hours: _react.PropTypes.bool,
	    onSelect: _react.PropTypes.func,
	    onDidSelect: _react.PropTypes.func,
	    getTitle: _react.PropTypes.func,
	    getStaticText: _react.PropTypes.func
	};
	DatePicker.defaultProps = {
	    min: '01 Jan 1970',
	    max: '19 Jan 2038 03:14',
	    type: 'date',
	    locale: 'en',
	    use24hours: false
	};
	exports.default = DatePicker;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;
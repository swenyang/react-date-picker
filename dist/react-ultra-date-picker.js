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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactUltraSelect = __webpack_require__(4);

	var _reactUltraSelect2 = _interopRequireDefault(_reactUltraSelect);

	var _deepEqual = __webpack_require__(5);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	//import UltraSelect from './UltraSelect'


	// http://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
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

	var enConfig = {
	    order: ['month', 'date', 'year', 'hour', 'minute', 'ampm'],
	    year: function year(_year) {
	        return _year;
	    },
	    month: function month(_month) {
	        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][_month];
	    },
	    date: function date(_date) {
	        return padStartWith0(_date);
	    },
	    am: 'AM',
	    pm: 'PM',
	    hour: translateHour,
	    minute: function minute(_minute) {
	        return padStartWith0(_minute);
	    },
	    confirmButton: 'Confirm',
	    cancelButton: 'Cancel',
	    dateLabel: function dateLabel(outOfRange, date, type, use24) {
	        if (outOfRange) {
	            return 'Date out of range';
	        }
	        switch (type) {
	            case 'time':
	                return enConfig.hour(date.getHours(), use24) + ':' + enConfig.minute(date.getMinutes()) + (use24 ? '' : ' ' + (date.getHours() < 12 ? enConfig.am : enConfig.pm));
	            case 'month':
	                return enConfig.month(date.getMonth()) + ' ' + enConfig.year(date.getFullYear());
	            case 'datetime':
	                return enConfig.month(date.getMonth()) + ' ' + enConfig.date(date.getDate()) + ' ' + enConfig.year(date.getFullYear()) + ' ' + enConfig.hour(date.getHours(), use24) + ':' + enConfig.minute(date.getMinutes()) + (use24 ? '' : ' ' + (date.getHours() < 12 ? enConfig.am : enConfig.pm));
	            case 'date':
	                return enConfig.month(date.getMonth()) + ' ' + enConfig.date(date.getDate()) + ' ' + enConfig.year(date.getFullYear());
	            default:
	                break;
	        }
	    }
	};

	var zhCNConfig = {
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
	    confirmButton: '确定',
	    cancelButton: '取消',
	    dateLabel: function dateLabel(outOfRange, date, type, use24) {
	        if (outOfRange) {
	            return '日期不在选择范围内';
	        }
	        switch (type) {
	            case 'time':
	                return '' + (use24 ? '' : date.getHours() < 12 ? zhCNConfig.am : zhCNConfig.pm) + zhCNConfig.hour(date.getHours(), use24) + ':' + zhCNConfig.minute(date.getMinutes());
	            case 'month':
	                return '' + zhCNConfig.year(date.getFullYear()) + zhCNConfig.month(date.getMonth());
	            case 'datetime':
	                return '' + zhCNConfig.year(date.getFullYear()) + zhCNConfig.month(date.getMonth()) + zhCNConfig.date(date.getDate()) + ' ' + (use24 ? '' : date.getHours() < 12 ? zhCNConfig.am : zhCNConfig.pm) + zhCNConfig.hour(date.getHours(), use24) + ':' + zhCNConfig.minute(date.getMinutes());
	            case 'date':
	                return '' + zhCNConfig.year(date.getFullYear()) + zhCNConfig.month(date.getMonth()) + zhCNConfig.date(date.getDate());
	            default:
	                break;
	        }
	    }
	};

	var localeConfigs = {
	    'en': enConfig,
	    'zh-cn': zhCNConfig
	};

	// to keep this library size small, expose a function to expand localeConfigs on demand
	var addLocaleConfig = exports.addLocaleConfig = function addLocaleConfig(name, config) {
	    if (config && config.order instanceof Array && typeof config.year === 'function' && typeof config.month === 'function' && typeof config.date === 'function' && typeof config.hour === 'function' && typeof config.minute === 'function' && typeof config.dateLabel === 'function') {
	        localeConfigs[name] = config;
	    } else {
	        console.error('addLocaleConfig: invalid locale config provided');
	    }
	};

	var dateStringProp = function dateStringProp(props, propName, componentName) {
	    if (!props[propName]) return;
	    if (typeof props[propName] === 'number') {
	        return;
	    }
	    if (typeof props[propName] !== 'string') {
	        return new Error(componentName + ': ' + propName + ' invalid date string provided.');
	    }
	    if (props.type === 'time') {
	        if (props[propName].match(/\d{2}:\d{2}/) && props[propName].length === 5) {
	            return;
	        }
	    }
	    if (Number.isNaN(new Date(props[propName]))) {
	        return new Error(componentName + ': ' + propName + ' invalid date string provided.');
	    }
	};

	var localeProp = function localeProp(props, propName, componentName) {
	    if (typeof props[propName] === 'string' && localeConfigs[props[propName]]) {
	        return;
	    }
	    return new Error(componentName + ': ' + propName + ' invalid value provided.');
	};

	var DatePicker = function (_Component) {
	    _inherits(DatePicker, _Component);

	    function DatePicker(props) {
	        _classCallCheck(this, DatePicker);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatePicker).call(this, props));

	        _this.getStaticText = _this.getStaticText.bind(_this);
	        _this.getTitle = _this.getTitle.bind(_this);
	        _this.onSelect = _this.onSelect.bind(_this);
	        _this.onDidSelect = _this.onDidSelect.bind(_this);
	        _this.onOpen = _this.onOpen.bind(_this);
	        _this.onCancel = _this.onCancel.bind(_this);

	        var minDate = _this.parseDateString(props.min, props.type);
	        var maxDate = _this.parseDateString(props.max, props.type);
	        var defaultDate = _this.getDefaultDate(props);
	        _this.state = _this.calColumnsAndKeys(_this.props, defaultDate, minDate, maxDate);
	        return _this;
	    }

	    _createClass(DatePicker, [{
	        key: 'parseDateString',
	        value: function parseDateString(dateString, type) {
	            var ret = void 0;
	            if (type === 'time') {
	                ret = new Date();
	                if (dateString.match(/\d{2}:\d{2}/) && dateString.length === 5) {
	                    ret.setHours(parseInt(dateString.substring(0, 2)));
	                    ret.setMinutes(parseInt(dateString.substring(3, 5)));
	                } else {
	                    var temp = new Date(dateString);
	                    ret.setHours(temp.getHours());
	                    ret.setMinutes(temp.getMinutes());
	                }
	            } else if (type === 'date') {
	                ret = new Date(dateString);
	                ret.setHours(0);
	                ret.setMinutes(0);
	            } else if (type === 'month') {
	                ret = new Date(dateString);
	                ret.setDate(1);
	                ret.setHours(0);
	                ret.setMinutes(0);
	            } else if (type === 'datetime') {
	                ret = new Date(dateString);
	            }
	            ret.setSeconds(0);
	            ret.setMilliseconds(0);
	            return ret;
	        }
	    }, {
	        key: 'getDefaultDate',
	        value: function getDefaultDate(props) {
	            props = props || this.props;
	            return this.parseDateString(props.defaultDate ? props.defaultDate : props.min, props.type);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var minDate = this.parseDateString(nextProps.min, nextProps.type);
	            var maxDate = this.parseDateString(nextProps.max, nextProps.type);
	            var defaultDate = this.getDefaultDate(nextProps);
	            this.setState(this.calColumnsAndKeys(nextProps, defaultDate, minDate, maxDate));
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            if (Object.keys(this.props).length !== Object.keys(nextProps).length) {
	                return true;
	            }
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = Object.keys(nextProps)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    if (!key.startsWith('on') && nextProps[key] !== this.props[key]) {
	                        return true;
	                    }
	                }
	                //console.log('equal props')
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

	            if (Object.keys(this.state).length !== Object.keys(nextState).length) {
	                return true;
	            }
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = Object.keys(nextState)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var _key = _step2.value;

	                    if (_key === 'keys' || _key === 'columns') {
	                        if (!(0, _deepEqual2.default)(nextState[_key], this.state[_key])) {
	                            return true;
	                        }
	                    } else if (_key === 'defaultDate' || _key === 'minDate' || _key === 'maxDate') {
	                        if (nextState[_key].getTime() !== this.state[_key].getTime()) {
	                            return true;
	                        }
	                    } else if (nextState[_key] !== this.state[_key]) {
	                        return true;
	                    }
	                }
	                //console.log('no need to update')
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            return false;
	        }
	    }, {
	        key: 'getTitle',
	        value: function getTitle() {
	            return this.props.title;
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
	        key: 'getStaticText',
	        value: function getStaticText(selectedValues) {
	            var locale = localeConfigs[this.props.locale];
	            if (!locale) return;
	            return locale.dateLabel(this.state.outOfRange, this.state.defaultDate, this.props.type, this.props.use24hours);
	        }
	    }, {
	        key: 'calColumnsAndKeys',
	        value: function calColumnsAndKeys(props, defaultDate, minDate, maxDate) {
	            props = props || this.props;
	            var _props = props;
	            var type = _props.type;
	            var use24hours = _props.use24hours;
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
	            // set min or max as default if out of range
	            var outOfRange = false;
	            if (defaultDate < minDate) {
	                outOfRange = true;
	                defaultDate = minDate;
	            } else if (defaultDate > maxDate) {
	                outOfRange = true;
	                defaultDate = maxDate;
	            }
	            for (var i = 0, l = selectedKeys.length; i < l; i++) {
	                switch (selectedKeys[i]) {
	                    case 'year':
	                        columnsDict[selectedKeys[i]] = this.calYear(minDate, maxDate, defaultDate, locale);
	                        break;
	                    case 'month':
	                        columnsDict[selectedKeys[i]] = this.calMonth(minDate, maxDate, defaultDate, locale);
	                        break;
	                    case 'date':
	                        columnsDict[selectedKeys[i]] = this.calDate(minDate, maxDate, defaultDate, locale);
	                        break;
	                    case 'ampm':
	                        columnsDict[selectedKeys[i]] = this.calAMPM(minDate, maxDate, defaultDate, locale);
	                        break;
	                    case 'hour':
	                        var ampm = void 0;
	                        if (columnsDict.ampm) {
	                            ampm = columnsDict.ampm.list[columnsDict.ampm.defaultIndex].key;
	                        }
	                        columnsDict[selectedKeys[i]] = this.calHour(minDate, maxDate, defaultDate, ampm, locale, use24hours);
	                        break;
	                    case 'minute':
	                        columnsDict[selectedKeys[i]] = this.calMinute(minDate, maxDate, defaultDate, locale);
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
	                columns: columns,
	                outOfRange: outOfRange,
	                defaultDate: defaultDate,
	                minDate: minDate,
	                maxDate: maxDate
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
	            var _this2 = this;

	            var date = new Date(this.state.defaultDate.getTime());
	            var values = this.refs.select.selectedValues;
	            // use sequence to ensure correctness
	            var sequence = ['year', 'month', 'date', 'ampm', 'hour', 'minute'];

	            var _loop = function _loop(i) {
	                var realIndex = _this2.state.keys.findIndex(function (e) {
	                    return e === sequence[i];
	                });
	                if (realIndex === -1) {
	                    return 'continue';
	                }
	                switch (sequence[i]) {
	                    case 'year':
	                        date.setFullYear(values[realIndex].key);
	                        break;
	                    case 'month':
	                        date.setDate(1); // incase Apr 31 becomes May 01
	                        date.setMonth(values[realIndex].key);
	                        break;
	                    case 'date':
	                        var days = daysInMonth(date.getFullYear(), date.getMonth() + 1);
	                        if (values[realIndex].key > days) {
	                            date.setDate(days);
	                        } else {
	                            date.setDate(values[realIndex].key);
	                        }
	                        break;
	                    case 'minute':
	                        date.setMinutes(values[realIndex].key);
	                        break;
	                    case 'hour':
	                        if (!_this2.props.use24hours) {
	                            var ampmIndex = _this2.state.keys.findIndex(function (e) {
	                                return e === 'ampm';
	                            });
	                            var ampm = _this2.refs.select.selectedValues[ampmIndex].key;
	                            if (ampm === 'pm' && values[realIndex].key < 12) {
	                                date.setHours(values[realIndex].key + 12);
	                                break;
	                            } else if (ampm === 'am' && values[realIndex].key >= 12) {
	                                date.setHours(values[realIndex].key - 12);
	                                break;
	                            }
	                        }
	                        date.setHours(values[realIndex].key);
	                        break;
	                    case 'ampm':
	                    default:
	                        break;
	                }
	            };

	            for (var i = 0; i < sequence.length; i++) {
	                var _ret = _loop(i);

	                if (_ret === 'continue') continue;
	            }
	            if (date < this.state.minDate) {
	                date = this.state.minDate;
	            }
	            if (date > this.state.maxDate) {
	                date = this.state.maxDate;
	            }
	            //console.log('select new date', date)
	            this.setState(this.calColumnsAndKeys(this.props, date, this.state.minDate, this.state.maxDate));

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
	        key: 'onOpen',
	        value: function onOpen() {
	            this._onOpenDate = this.state.defaultDate;
	            if (this.props.onOpen) {
	                this.props.onOpen();
	            }
	        }
	    }, {
	        key: 'onCancel',
	        value: function onCancel() {
	            if (this._onOpenDate) {
	                this.setState(this.calColumnsAndKeys(this.props, this._onOpenDate, this.state.minDate, this.state.maxDate));
	                this._onOpenDate = null;

	                if (this.props.onCancel) {
	                    this.props.onCancel();
	                }
	            }
	        }
	    }, {
	        key: 'intersects',
	        value: function intersects(min1, max1, min2, max2) {
	            return !(max1.getTime() < min2.getTime() || min1.getTime() > max2.getTime());
	        }
	    }, {
	        key: 'calYear',
	        value: function calYear(min, max, defaults, locale) {
	            var ret = { list: [], defaultIndex: -1 };
	            for (var i = min.getFullYear(), l = max.getFullYear(), index = 0; i <= l; i++) {
	                var dMin = this.newDate(i, 1, 1, 0, 0);
	                var dMax = this.newDate(i, 12, 31, 23, 59);
	                if (this.intersects(dMin, dMax, min, max)) {
	                    ret.list.push({
	                        key: i,
	                        value: localeConfigs[locale].year(i)
	                    });
	                    if (i === defaults.getFullYear()) {
	                        ret.defaultIndex = index;
	                    }
	                    index++;
	                }
	            }
	            return ret;
	        }
	    }, {
	        key: 'calMonth',
	        value: function calMonth(min, max, defaults, locale) {
	            var ret = { list: [], defaultIndex: -1 };
	            for (var i = 0, index = 0; i < 12; i++) {
	                var dMin = this.newDate(defaults.getFullYear(), i, 1, 0, 0);
	                var dMax = this.newDate(defaults.getFullYear(), i, daysInMonth(defaults.getFullYear(), i + 1), 23, 59);
	                if (this.intersects(dMin, dMax, min, max)) {
	                    ret.list.push({
	                        key: i,
	                        value: localeConfigs[locale].month(i)
	                    });
	                    if (i === defaults.getMonth()) {
	                        ret.defaultIndex = index;
	                    }
	                    index++;
	                }
	            }
	            return ret;
	        }
	    }, {
	        key: 'calDate',
	        value: function calDate(min, max, defaults, locale) {
	            var ret = { list: [], defaultIndex: -1 };
	            var days = daysInMonth(defaults.getFullYear(), defaults.getMonth() + 1);
	            for (var i = 1, index = 0; i <= days; i++) {
	                var dMin = this.newDate(defaults.getFullYear(), defaults.getMonth(), i, 0, 0);
	                var dMax = this.newDate(defaults.getFullYear(), defaults.getMonth(), i, 23, 59);
	                if (this.intersects(dMin, dMax, min, max)) {
	                    ret.list.push({
	                        key: i,
	                        value: localeConfigs[locale].date(i)
	                    });
	                    if (i === defaults.getDate()) {
	                        ret.defaultIndex = index;
	                    }
	                    index++;
	                }
	            }
	            return ret;
	        }
	    }, {
	        key: 'calAMPM',
	        value: function calAMPM(min, max, defaults, locale) {
	            var ret = { list: [], defaultIndex: -1 };
	            var index = 0;
	            var dMin = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), 0, 0);
	            var dMax = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), 11, 59);
	            if (this.intersects(dMin, dMax, min, max)) {
	                ret.list.push({
	                    key: 'am',
	                    value: localeConfigs[locale].am
	                });
	                if (defaults.getHours() < 12) {
	                    ret.defaultIndex = index;
	                }
	                index++;
	            }
	            dMin = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), 12, 0);
	            dMax = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), 23, 59);
	            if (this.intersects(dMin, dMax, min, max)) {
	                ret.list.push({
	                    key: 'pm',
	                    value: localeConfigs[locale].pm
	                });
	                if (defaults.getHours() >= 12) {
	                    ret.defaultIndex = index;
	                }
	            }
	            return ret;
	        }
	    }, {
	        key: 'calHour',
	        value: function calHour(min, max, defaults, ampm, locale, use24hours) {
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
	                if (!this.props.use24hours && ampm === 'pm') {
	                    hours += 12;
	                }
	                var dMin = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), hours, 0);
	                var dMax = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), hours, 59);
	                if (this.intersects(dMin, dMax, min, max)) {
	                    ret.list.push({
	                        key: hours,
	                        value: localeConfigs[locale].hour(hours, use24hours)
	                    });
	                    if (hours === defaults.getHours()) {
	                        ret.defaultIndex = index;
	                    }
	                    index++;
	                }
	            }
	            return ret;
	        }
	    }, {
	        key: 'calMinute',
	        value: function calMinute(min, max, defaults, locale) {
	            var ret = { list: [], defaultIndex: -1 };
	            for (var i = 0, index = 0; i < 60; i++) {
	                var d = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), defaults.getHours(), i);
	                if (this.intersects(d, d, min, max)) {
	                    ret.list.push({
	                        key: i,
	                        value: localeConfigs[locale].minute(i)
	                    });
	                    if (i === defaults.getMinutes()) {
	                        ret.defaultIndex = index;
	                    }
	                    index++;
	                }
	            }
	            return ret;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var locale = localeConfigs[this.props.locale];

	            return _react2.default.createElement(_reactUltraSelect2.default, _extends({}, this.props, { columns: this.state.columns, ref: 'select',
	                confirmButton: locale.confirmButton,
	                cancelButton: locale.cancelButton,
	                onSelect: this.onSelect,
	                onDidSelect: this.onDidSelect,
	                getStaticText: this.getStaticText,
	                getTitle: this.getTitle,
	                onOpen: this.onOpen,
	                onCancel: this.onCancel }));
	        }
	    }, {
	        key: 'date',
	        get: function get() {
	            return this.state.outOfRange ? Number.NaN : this.state.defaultDate;
	        }
	    }]);

	    return DatePicker;
	}(_react.Component);

	DatePicker.propTypes = {
	    max: dateStringProp,
	    min: dateStringProp,
	    defaultDate: dateStringProp,
	    type: _react.PropTypes.oneOf(['date', 'datetime', 'time', 'month']),
	    locale: localeProp,
	    use24hours: _react.PropTypes.bool,

	    title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
	    onSelect: _react.PropTypes.func,
	    onDidSelect: _react.PropTypes.func
	};
	DatePicker.defaultProps = {
	    min: '01 Jan 1970 00:00',
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(6);
	var isArguments = __webpack_require__(7);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ }
/******/ ])
});
;
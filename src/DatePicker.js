import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import UltraSelect from 'react-ultra-select'

export const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

export const padStartWith0 = (num) => num >= 10 ? num.toString() : `0${num}`

export const isPm = (date) => date.getHours() >= 12

export const translateHour =  (hour, use24hours) =>
    use24hours ? padStartWith0(hour) : ((hour % 12) === 0 ? '12' : padStartWith0(hour % 12))

const localeConfigs = {
    'en': {
        order: ['month', 'date', 'year', 'hour', 'minute', 'ampm'],
        year: year => year,
        month: month => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month],
        date: date => date,
        am: 'AM',
        pm: 'PM',
        hour: translateHour,
        minute: minute => padStartWith0(minute),
        confirmButton: 'CONFIRM',
    },
    'zh-cn': {
        order: ['year', 'month', 'date', 'ampm', 'hour', 'minute'],
        year: year => `${year}年`,
        month: month => `${month+1}月`,
        date: date => `${date}日`,
        am: '上午',
        pm: '下午',
        hour: translateHour,
        minute: minute => padStartWith0(minute),
        confirmButton: '确定',
    },
}

// to keep this library size small, expose a function to expand localeConfigs on demand
export const addLocaleConfig = (name, config) => {
    localeConfigs[name] = config
}

const dateStringProp = (props, propName, componentName) => {
    if (!props[propName]) return
    if (Number.isNaN(new Date(props[propName]))) {
        return new Error(`${componentName}: ${propName} invalid date string provided.`)
    }
}

class DatePicker extends Component {
    static propTypes = {
        max: dateStringProp,
        min: dateStringProp,
        defaultDate: dateStringProp,
        type: PropTypes.oneOf(['date', 'datetime', 'time', 'month']),
        locale: PropTypes.string,
        use24hours: PropTypes.bool,

        onSelect: PropTypes.func,
        onDidSelect: PropTypes.func,
        // props inherited from UltraSelect
        getTitle: PropTypes.func,
        getStaticText: PropTypes.func,
        rowsVisible: PropTypes.number,
        rowHeight: PropTypes.number,
        rowHeightUnit: PropTypes.string,
        backdrop: PropTypes.bool,
    }

    static defaultProps = {
        min: '01 Jan 1970',
        max: '19 Jan 2038 03:14',
        type: 'date',
        locale: 'en',
        use24hours: false,
    }

    constructor(props) {
        super(props)
        this.getTitle = this.getTitle.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onDidSelect = this.onDidSelect.bind(this)

        this.state = this.calColumnsAndKeys(this.getDefaults(props))
    }

    getDefaults(props) {
        props = props || this.props
        let defaultDate = props.defaultDate ? new Date(props.defaultDate) : new Date()
        return {
            year: defaultDate.getFullYear(),
            month: defaultDate.getMonth(),
            date: defaultDate.getDate(),
            ampm: isPm(defaultDate) ? 'pm' : 'am',
            hour: defaultDate.getHours(),
            minute: defaultDate.getMinutes(),
        }
    }

    componentWillReceiveProps(nextProps) {
        let hasChanged = false
        for (let key of Object.keys(nextProps)) {
            if (nextProps[key] !== this.props[key]) {
                hasChanged = true
                break
            }
        }
        if (hasChanged) {
            let defaults = this.getDefaults(nextProps)
            this.setState(this.calColumnsAndKeys(defaults, nextProps))
        }
    }

    getPrefix(i) {
        if (i === 0) return ''
        switch (this.state.keys[i]) {
            case 'hour':
            case 'ampm': return ' '
            case 'minute': return ':'
            default: return '-'
        }
    }

    getTitle(selectedValues) {
        return <span>{
            selectedValues.map((e, i) =>
                <span key={i}>
                    {this.getPrefix(i)}{e.value}
                </span>)
        }</span>
    }

    getValueFromState(key, defaultIndex) {
        let state = this.state
        let columnIndex = state.keys.findIndex(e => e === key)
        defaultIndex = typeof defaultIndex === 'number' ? defaultIndex : state.columns[columnIndex].defaultIndex
        return state.columns[columnIndex].list[defaultIndex].key
    }

    calColumnsAndKeys(defaults, props) {
        props = props || this.props
        const {type, use24hours, min, max, locale} = props
        // 1. select keys
        // WARNING: keys in selectedKeys should be arranged in order to ensure DatePicker work properly
        // year -> month -> date -> ampm -> hour -> minute
        // that is, from bigger scope to smaller scope
        let selectedKeys
        switch (type) {
            case 'date':
                selectedKeys = ['year', 'month', 'date']
                break
            case 'datetime':
                if (use24hours) {
                    selectedKeys = ['year', 'month', 'date', 'hour', 'minute']
                }
                else {
                    selectedKeys = ['year', 'month', 'date', 'ampm', 'hour', 'minute']
                }
                break
            case 'time':
                if (use24hours) {
                    selectedKeys = ['hour', 'minute']
                }
                else {
                    selectedKeys = ['ampm', 'hour', 'minute']
                }
                break
            case 'month':
                selectedKeys = ['year', 'month']
                break
        }
        // 2. calculate range for each
        let columnsDict = {}
        let minDate = new Date(`${min}`)
        let maxDate = new Date(`${max}`)
        for (let i = 0, l = selectedKeys.length; i < l; i++) {
            switch (selectedKeys[i]) {
                case 'year':
                    columnsDict[selectedKeys[i]] = this.calYear(minDate, maxDate, defaults)
                    break
                case 'month':
                    columnsDict[selectedKeys[i]] = this.calMonth(minDate, maxDate, defaults)
                    break
                case 'date':
                    columnsDict[selectedKeys[i]] = this.calDate(minDate, maxDate, defaults)
                    break
                case 'ampm':
                    columnsDict[selectedKeys[i]] = this.calAMPM(minDate, maxDate, defaults)
                    break
                case 'hour':
                    columnsDict[selectedKeys[i]] = this.calHour(minDate, maxDate, defaults)
                    break
                case 'minute':
                    columnsDict[selectedKeys[i]] = this.calMinute(minDate, maxDate, defaults)
                    break
            }
        }
        // 3. order columns
        let config = localeConfigs[locale]
        let columns = []
        let keys = []
        for (let i = 0, l = config.order.length; i < l; i++) {
            if (columnsDict[config.order[i]]) {
                columns.push(columnsDict[config.order[i]])
                keys.push(config.order[i])
            }
        }
        return {
            keys,
            columns
        }
    }

    newDate(year, month, date, hour, minute) {
        return new Date(year, month, date, hour, minute)
    }

    get date() {
        let defaults = this.getDefaults()
        for (let i = 0, l = this.state.keys.length; i < l; i++) {
            let key = this.state.keys[i]
            defaults[key] = this.getValueFromState(key, null)
        }
        return this.newDate(defaults.year, defaults.month, defaults.date, defaults.hour, defaults.minute)
    }

    onSelect(index, selectedValue) {
        let defaults = this.getDefaults()
        let newIndex = this.state.columns[index].list.findIndex(e => e.key === selectedValue.key)
        for (let i = 0, l = this.state.keys.length; i < l; i++) {
            let key = this.state.keys[i]
            defaults[key] = this.getValueFromState(key, i === index ? newIndex : null)
        }
        this.setState(this.calColumnsAndKeys(defaults))

        if (this.props.onSelect) {
            this.props.onSelect(this.date)
        }
    }

    onDidSelect(index, selectedValue) {
        if (this.props.onDidSelect) {
            this.props.onDidSelect(this.date)
        }
    }

    inDateRange(d, min, max) {
        return d.getTime() >= min.getTime() && d.getTime() <= max.getTime()
    }

    calYear(min, max, defaults) {
        let ret = {list:[], defaultIndex:-1}
        for (let i = min.getFullYear(), l = max.getFullYear(), index = 0; i <= l; i++) {
            let dMin = this.newDate(i, 1, 1, 0, 0)
            let dMax = this.newDate(i, 12, 31, 23, 59)
            if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[this.props.locale].year(i)
                })
                if (i === defaults.year) {
                    ret.defaultIndex = index
                }
                index++
            }
        }
        if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1
        if (ret.list.length > 0) defaults.year = ret.list[ret.defaultIndex].key
        return ret
    }

    calMonth(min, max, defaults) {
        let ret = {list:[], defaultIndex:-1}
        for (let i = 0, index = 0; i < 12; i++) {
            let dMin = this.newDate(defaults.year, i, 1, 0, 0)
            let dMax = this.newDate(defaults.year, i, daysInMonth(defaults.year, i + 1), 23, 59)
            if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[this.props.locale].month(i)
                })
                if (i === defaults.month) {
                    ret.defaultIndex = index
                }
                index++
            }
        }
        if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1
        if (ret.list.length > 0) defaults.month = ret.list[ret.defaultIndex].key
        return ret
    }

    calDate(min, max, defaults) {
        let ret = {list:[], defaultIndex:-1}
        let days = daysInMonth(defaults.year, defaults.month)
        for (let i = 1, index = 0; i <= days; i++) {
            let dMin = this.newDate(defaults.year, defaults.month, i, 0, 0)
            let dMax = this.newDate(defaults.year, defaults.month, i, 23, 59)
            if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[this.props.locale].date(i)
                })
                if (i === defaults.date) {
                    ret.defaultIndex = index
                }
                index++
            }
        }
        if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1
        if (ret.list.length > 0) defaults.date = ret.list[ret.defaultIndex].key
        return ret
    }

    calAMPM(min, max, defaults) {
        let ret = {list:[], defaultIndex:-1}
        let index = 0
        let dMin = this.newDate(defaults.year, defaults.month, defaults.date, 0, 0)
        let dMax = this.newDate(defaults.year, defaults.month, defaults.date, 11, 59)
        if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
            ret.list.push({
                key: 'am',
                value: localeConfigs[this.props.locale].am
            })
            if (defaults.ampm === 'am') {
                ret.defaultIndex = index
            }
            index++
        }
        dMin = this.newDate(defaults.year, defaults.month, defaults.date, 12, 0)
        dMax = this.newDate(defaults.year, defaults.month, defaults.date, 23, 59)
        if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
            ret.list.push({
                key: 'pm',
                value: localeConfigs[this.props.locale].pm
            })
            if (defaults.ampm === 'pm') {
                ret.defaultIndex = index
            }
        }
        if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1
        if (ret.list.length > 0) defaults.ampm = ret.list[ret.defaultIndex].key
        return ret
    }

    calHour(min, max, defaults) {
        let ret = {list:[], defaultIndex:-1}
        let start, end
        if (this.props.use24hours) {
            start = 0
            end = 23
        }
        else {
            start = 0
            end = 11
        }
        for (let i = start, index = 0; i <= end; i++) {
            let hours = i
            if (!this.props.use24hours && defaults.ampm === 'pm') {
                hours += 12
            }
            let dMin = this.newDate(defaults.year, defaults.month, defaults.date, hours, 0)
            let dMax = this.newDate(defaults.year, defaults.month, defaults.date, hours, 59)
            if (this.inDateRange(dMin, min, max) || this.inDateRange(dMax, min, max)) {
                ret.list.push({
                    key: hours,
                    value: localeConfigs[this.props.locale].hour(hours, this.props.use24hours)
                })
                if (hours === defaults.hour) {
                    ret.defaultIndex = index
                }
                index++
            }
        }
        if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1
        if (ret.list.length > 0) defaults.hour = ret.list[ret.defaultIndex].key
        return ret
    }

    calMinute(min, max, defaults) {
        let ret = {list:[], defaultIndex:-1}
        for (let i = 0, index = 0; i < 60; i++) {
            let d = this.newDate(defaults.year, defaults.month, defaults.date, defaults.hour, i)
            if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[this.props.locale].minute(i)
                })
                if (i === defaults.minute) {
                    ret.defaultIndex = index
                }
                index++
            }
        }
        if (ret.defaultIndex === -1) ret.defaultIndex = ret.list.length - 1
        if (ret.list.length > 0) defaults.minute = ret.list[ret.defaultIndex].key
        return ret
    }

    render() {
        let copyColumns = [], columns = this.state.columns
        for (let i = 0, l = columns.length; i < l; i++) {
            copyColumns.push({list: [...columns[i].list], defaultIndex: columns[i].defaultIndex})
        }
        return <UltraSelect columns={copyColumns}
                            onSelect={this.onSelect}
                            onDidSelect={this.onDidSelect}
                            confirmButton={localeConfigs[this.props.locale].confirmButton}
                            getTitle={this.props.getTitle || this.getTitle}
                            getStaticText={this.props.getStaticText || this.getTitle}
                            rowsVisible={this.props.rowsVisible}
                            rowHeight={this.props.rowHeight}
                            rowHeightUnit={this.props.rowHeightUnit}
                            backdrop={this.props.backdrop}
        ></UltraSelect>
    }
}

export default DatePicker

import React, { Component, PropTypes } from 'react'
import UltraSelect from 'react-ultra-select'
// import UltraSelect from './UltraSelect'
import equal from 'deep-equal'

// http://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
export const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

export const padStartWith0 = num => num >= 10 ? num.toString() : `0${num}`

export const isPm = (date) => date.getHours() >= 12

export const translateHour = (hour, use24hours) => {
    if (use24hours) {
        return padStartWith0(hour)
    }
    if (hour % 12 === 0) {
        return '12'
    }
    return padStartWith0(hour % 12)
}

const enConfig = {
    order: ['month', 'date', 'year', 'hour', 'minute', 'ampm'],
    year: year => year,
    month: month => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month],
    date: date => padStartWith0(date),
    am: 'AM',
    pm: 'PM',
    hour: translateHour,
    minute: minute => padStartWith0(minute),
    confirmButton: 'Confirm',
    cancelButton: 'Cancel',
    dateLabel: (outOfRange, date, type, use24) => {
        if (outOfRange) {
            return 'Date out of range'
        }
        switch (type) {
        case 'time':
            return `${enConfig.hour(date.getHours(), use24)}:${enConfig.minute(date.getMinutes())}${use24 ? '' : ` ${(date.getHours() < 12 ? enConfig.am : enConfig.pm)}`}`
        case 'month':
            return `${enConfig.month(date.getMonth())} ${enConfig.year(date.getFullYear())}`
        case 'datetime':
            return `${enConfig.month(date.getMonth())} ${enConfig.date(date.getDate())} ${enConfig.year(date.getFullYear())} ${enConfig.hour(date.getHours(), use24)}:${enConfig.minute(date.getMinutes())}${use24 ? '' : ` ${(date.getHours() < 12 ? enConfig.am : enConfig.pm)}`}`
        case 'date':
            return `${enConfig.month(date.getMonth())} ${enConfig.date(date.getDate())} ${enConfig.year(date.getFullYear())}`
        default:
            return ''
        }
    },
}

const zhCNConfig = {
    order: ['year', 'month', 'date', 'ampm', 'hour', 'minute'],
    year: year => `${year}年`,
    month: month => `${month + 1}月`,
    date: date => `${date}日`,
    am: '上午',
    pm: '下午',
    hour: translateHour,
    minute: minute => padStartWith0(minute),
    confirmButton: '确定',
    cancelButton: '取消',
    dateLabel: (outOfRange, date, type, use24) => {
        if (outOfRange) {
            return '日期不在选择范围内'
        }
        let ampmStr = ''
        if (!use24) {
            ampmStr = date.getHours() < 12 ? zhCNConfig.am : zhCNConfig.pm
        }
        switch (type) {
        case 'time':
            return `${ampmStr}${zhCNConfig.hour(date.getHours(), use24)}:${zhCNConfig.minute(date.getMinutes())}`
        case 'month':
            return `${zhCNConfig.year(date.getFullYear())}${zhCNConfig.month(date.getMonth())}`
        case 'datetime':
            return `${zhCNConfig.year(date.getFullYear())}${zhCNConfig.month(date.getMonth())}${zhCNConfig.date(date.getDate())} ${ampmStr}${zhCNConfig.hour(date.getHours(), use24)}:${zhCNConfig.minute(date.getMinutes())}`
        case 'date':
            return `${zhCNConfig.year(date.getFullYear())}${zhCNConfig.month(date.getMonth())}${zhCNConfig.date(date.getDate())}`
        default:
            return ''
        }
    },
}

const localeConfigs = {
    en: enConfig,
    'zh-cn': zhCNConfig,
}

// to keep this library size small, expose a function to expand localeConfigs on demand
export const addLocaleConfig = (name, config) => {
    if (config && config.order instanceof Array
        && typeof config.year === 'function'
        && typeof config.month === 'function'
        && typeof config.date === 'function'
        && typeof config.hour === 'function'
        && typeof config.minute === 'function'
        && typeof config.dateLabel === 'function'
    ) {
        localeConfigs[name] = config
    }
    else {
        console.error('addLocaleConfig: invalid locale config provided')
    }
}

const dateStringProp = (props, propName, componentName) => {
    if (!props[propName]) return null
    if (typeof props[propName] === 'number') {
        return null
    }
    if (typeof props[propName] !== 'string') {
        return new Error(`${componentName}: ${propName} invalid date string provided.`)
    }
    if (props.type === 'time') {
        if (props[propName].match(/\d{2}:\d{2}/) && props[propName].length === 5) {
            return null
        }
    }
    if (Number.isNaN(new Date(props[propName]))) {
        return new Error(`${componentName}: ${propName} invalid date string provided.`)
    }
    return null
}

const localeProp = (props, propName, componentName) => {
    if (typeof props[propName] === 'string' && localeConfigs[props[propName]]) {
        return null
    }
    return new Error(`${componentName}: ${propName} invalid value provided.`)
}

class DatePicker extends Component {
    static propTypes = {
        max: dateStringProp,
        min: dateStringProp,
        defaultDate: dateStringProp,
        type: PropTypes.oneOf(['date', 'datetime', 'time', 'month']),
        locale: localeProp,
        use24hours: PropTypes.bool,

        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        onSelect: PropTypes.func,
        onDidSelect: PropTypes.func,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
    }

    static defaultProps = {
        min: '01 Jan 1970 00:00',
        max: '19 Jan 2038 03:14',
        type: 'date',
        locale: 'en',
        use24hours: false,
    }

    constructor(props) {
        super(props)
        this.getStaticText = this.getStaticText.bind(this)
        this.getTitle = this.getTitle.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onDidSelect = this.onDidSelect.bind(this)
        this.onOpen = this.onOpen.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onConfirm = this.onConfirm.bind(this)
        this.onCancel = this.onCancel.bind(this)

        const minDate = this.parseDateString(props.min, props.type)
        const maxDate = this.parseDateString(props.max, props.type)
        const defaultDate = this.getDefaultDate(props)
        this.state = this.calColumnsAndKeys(this.props, defaultDate, minDate, maxDate)
    }

    componentWillReceiveProps(nextProps) {
        const minDate = this.parseDateString(nextProps.min, nextProps.type)
        const maxDate = this.parseDateString(nextProps.max, nextProps.type)
        const defaultDate = this.getDefaultDate(nextProps)
        this.setState(this.calColumnsAndKeys(nextProps, defaultDate, minDate, maxDate))
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (Object.keys(this.props).length !== Object.keys(nextProps).length) {
            return true
        }
        for (const key of Object.keys(nextProps)) {
            if (!key.startsWith('on') && nextProps[key] !== this.props[key]) {
                return true
            }
        }
        // console.log('equal props')

        if (Object.keys(this.state).length !== Object.keys(nextState).length) {
            return true
        }
        for (const key of Object.keys(nextState)) {
            if (key === 'keys' || key === 'columns') {
                if (!equal(nextState[key], this.state[key])) {
                    return true
                }
            }
            else if (key === 'defaultDate' || key === 'minDate' || key === 'maxDate') {
                if (nextState[key].getTime() !== this.state[key].getTime()) {
                    return true
                }
            }
            else if (nextState[key] !== this.state[key]) {
                return true
            }
        }
        // console.log('no need to update')
        return false
    }

    onSelect() {
        let date = new Date(this.state.defaultDate.getTime())
        const values = this.refs.select.selectedValues
        // use sequence to ensure correctness
        const sequence = ['year', 'month', 'date', 'ampm', 'hour', 'minute']
        for (let i = 0; i < sequence.length; i++) {
            const realIndex = this.state.keys.findIndex(e => e === sequence[i])
            if (realIndex !== -1) {
                switch (sequence[i]) {
                case 'year':
                    date.setFullYear(values[realIndex].key)
                    break
                case 'month':
                    date.setDate(1) // incase Apr 31 becomes May 01
                    date.setMonth(values[realIndex].key)
                    break
                case 'date': {
                    const days = daysInMonth(date.getFullYear(), date.getMonth() + 1)
                    if (values[realIndex].key > days) {
                        date.setDate(days)
                    }
                    else {
                        date.setDate(values[realIndex].key)
                    }
                    break
                }
                case 'minute':
                    date.setMinutes(values[realIndex].key)
                    break
                case 'hour':
                    if (!this.props.use24hours) {
                        const ampmIndex = this.state.keys.findIndex(e => e === 'ampm')
                        const ampm = this.refs.select.selectedValues[ampmIndex].key
                        if (ampm === 'pm' && values[realIndex].key < 12) {
                            date.setHours(values[realIndex].key + 12)
                            break
                        }
                        else if (ampm === 'am' && values[realIndex].key >= 12) {
                            date.setHours(values[realIndex].key - 12)
                            break
                        }
                    }
                    date.setHours(values[realIndex].key)
                    break
                case 'ampm':
                default:
                    break
                }
            }
        }
        if (date < this.state.minDate) {
            date = this.state.minDate
        }
        if (date > this.state.maxDate) {
            date = this.state.maxDate
        }
        // console.log('select new date', date)
        this.setState(this.calColumnsAndKeys(this.props, date, this.state.minDate, this.state.maxDate))

        if (this.props.onSelect) {
            this.props.onSelect(this.date)
        }
    }

    onDidSelect() {
        if (this.props.onDidSelect) {
            this.props.onDidSelect(this.date)
        }
    }

    onOpen() {
        this.mOnOpenDate = this.state.defaultDate
        if (this.props.onOpen) {
            this.props.onOpen(this.date)
        }
    }

    onClose() {
        if (this.props.onClose) {
            this.props.onClose(this.date)
        }
    }

    onConfirm() {
        if (this.props.onConfirm) {
            this.props.onConfirm(this.date)
        }
    }

    onCancel() {
        if (this.mOnOpenDate) {
            this.setState(this.calColumnsAndKeys(this.props, this.mOnOpenDate, this.state.minDate, this.state.maxDate))
            this.mOnOpenDate = null

            if (this.props.onCancel) {
                this.props.onCancel(this.date)
            }
        }
    }

    getTitle() {
        return this.props.title
    }

    getStaticText() {
        const locale = localeConfigs[this.props.locale]
        if (!locale) return null
        return locale.dateLabel(this.state.outOfRange, this.state.defaultDate, this.props.type, this.props.use24hours)
    }

    getDefaultDate(props) {
        const p = props || this.props
        return this.parseDateString(p.defaultDate ? p.defaultDate : p.min, p.type)
    }

    parseDateString(dateString, type) {
        let ret
        if (type === 'time') {
            ret = new Date()
            if (dateString.match(/\d{2}:\d{2}/) && dateString.length === 5) {
                ret.setHours(parseInt(dateString.substring(0, 2), 10))
                ret.setMinutes(parseInt(dateString.substring(3, 5), 10))
            }
            else {
                const temp = new Date(dateString)
                ret.setHours(temp.getHours())
                ret.setMinutes(temp.getMinutes())
            }
        }
        else if (type === 'date') {
            ret = new Date(dateString)
            ret.setHours(0)
            ret.setMinutes(0)
        }
        else if (type === 'month') {
            ret = new Date(dateString)
            ret.setDate(1)
            ret.setHours(0)
            ret.setMinutes(0)
        }
        else if (type === 'datetime') {
            ret = new Date(dateString)
        }
        ret.setSeconds(0)
        ret.setMilliseconds(0)
        return ret
    }

    calColumnsAndKeys(p, d, minDate, maxDate) {
        const props = p || this.props
        let defaultDate = d
        const { type, use24hours, locale } = props
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
        default:
            break
        }
        // 2. calculate range for each
        const columnsDict = {}
        // set min or max as default if out of range
        let outOfRange = false
        if (defaultDate < minDate) {
            outOfRange = true
            defaultDate = minDate
        }
        else if (defaultDate > maxDate) {
            outOfRange = true
            defaultDate = maxDate
        }
        for (let i = 0, l = selectedKeys.length; i < l; i++) {
            switch (selectedKeys[i]) {
            case 'year':
                columnsDict[selectedKeys[i]] = this.calYear(minDate, maxDate, defaultDate, locale)
                break
            case 'month':
                columnsDict[selectedKeys[i]] = this.calMonth(minDate, maxDate, defaultDate, locale)
                break
            case 'date':
                columnsDict[selectedKeys[i]] = this.calDate(minDate, maxDate, defaultDate, locale)
                break
            case 'ampm':
                columnsDict[selectedKeys[i]] = this.calAMPM(minDate, maxDate, defaultDate, locale)
                break
            case 'hour': {
                let ampm
                if (columnsDict.ampm) {
                    ampm = columnsDict.ampm.list[columnsDict.ampm.defaultIndex].key
                }
                columnsDict[selectedKeys[i]] = this.calHour(minDate, maxDate, defaultDate, ampm, locale, use24hours)
                break
            }
            case 'minute':
                columnsDict[selectedKeys[i]] = this.calMinute(minDate, maxDate, defaultDate, locale)
                break
            default:
                break
            }
        }
        // 3. order columns
        const config = localeConfigs[locale]
        const columns = []
        const keys = []
        for (let i = 0, l = config.order.length; i < l; i++) {
            if (columnsDict[config.order[i]]) {
                columns.push(columnsDict[config.order[i]])
                keys.push(config.order[i])
            }
        }
        return {
            keys,
            columns,
            outOfRange,
            defaultDate,
            minDate,
            maxDate,
        }
    }

    newDate(year, month, date, hour, minute) {
        return new Date(year, month, date, hour, minute)
    }

    get date() {
        return this.state.outOfRange ? Number.NaN : this.state.defaultDate
    }

    intersects(min1, max1, min2, max2) {
        return !(max1.getTime() < min2.getTime() || min1.getTime() > max2.getTime())
    }

    calYear(min, max, defaults, locale) {
        const ret = { list: [], defaultIndex: -1 }
        for (let i = min.getFullYear(), l = max.getFullYear(), index = 0; i <= l; i++) {
            const dMin = this.newDate(i, 0, 1, 0, 0)
            const dMax = this.newDate(i, 11, 31, 23, 59)
            if (this.intersects(dMin, dMax, min, max)) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[locale].year(i),
                })
                if (i === defaults.getFullYear()) {
                    ret.defaultIndex = index
                }
                index++
            }
        }
        return ret
    }

    calMonth(min, max, defaults, locale) {
        const ret = { list: [], defaultIndex: -1 }
        for (let i = 0, index = 0; i < 12; i++) {
            const dMin = this.newDate(defaults.getFullYear(), i, 1, 0, 0)
            const dMax = this.newDate(defaults.getFullYear(), i, daysInMonth(defaults.getFullYear(), i + 1), 23, 59)
            if (this.intersects(dMin, dMax, min, max)) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[locale].month(i),
                })
                if (i === defaults.getMonth()) {
                    ret.defaultIndex = index
                }
                index++
            }
        }
        return ret
    }

    calDate(min, max, defaults, locale) {
        const ret = { list: [], defaultIndex: -1 }
        const days = daysInMonth(defaults.getFullYear(), defaults.getMonth() + 1)
        for (let i = 1, index = 0; i <= days; i++) {
            const dMin = this.newDate(defaults.getFullYear(), defaults.getMonth(), i, 0, 0)
            const dMax = this.newDate(defaults.getFullYear(), defaults.getMonth(), i, 23, 59)
            if (this.intersects(dMin, dMax, min, max)) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[locale].date(i),
                })
                if (i === defaults.getDate()) {
                    ret.defaultIndex = index
                }
                index++
            }
        }
        return ret
    }

    calAMPM(min, max, defaults, locale) {
        const ret = { list: [], defaultIndex: -1 }
        let index = 0
        let dMin = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), 0, 0)
        let dMax = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), 11, 59)
        if (this.intersects(dMin, dMax, min, max)) {
            ret.list.push({
                key: 'am',
                value: localeConfigs[locale].am,
            })
            if (defaults.getHours() < 12) {
                ret.defaultIndex = index
            }
            index++
        }
        dMin = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), 12, 0)
        dMax = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), 23, 59)
        if (this.intersects(dMin, dMax, min, max)) {
            ret.list.push({
                key: 'pm',
                value: localeConfigs[locale].pm,
            })
            if (defaults.getHours() >= 12) {
                ret.defaultIndex = index
            }
        }
        return ret
    }

    calHour(min, max, defaults, ampm, locale, use24hours) {
        const ret = { list: [], defaultIndex: -1 }
        let start
        let end
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
            if (!this.props.use24hours && ampm === 'pm') {
                hours += 12
            }
            const dMin = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), hours, 0)
            const dMax = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), hours, 59)
            if (this.intersects(dMin, dMax, min, max)) {
                ret.list.push({
                    key: hours,
                    value: localeConfigs[locale].hour(hours, use24hours),
                })
                if (hours === defaults.getHours()) {
                    ret.defaultIndex = index
                }
                index++
            }
        }
        return ret
    }

    calMinute(min, max, defaults, locale) {
        const ret = { list: [], defaultIndex: -1 }
        for (let i = 0, index = 0; i < 60; i++) {
            const d = this.newDate(defaults.getFullYear(), defaults.getMonth(), defaults.getDate(), defaults.getHours(), i)
            if (this.intersects(d, d, min, max)) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[locale].minute(i),
                })
                if (i === defaults.getMinutes()) {
                    ret.defaultIndex = index
                }
                index++
            }
        }
        return ret
    }

    mOnOpenDate

    render() {
        const locale = localeConfigs[this.props.locale]

        return (
            <UltraSelect
                columns={this.state.columns} ref="select"
                confirmButton={locale.confirmButton}
                cancelButton={locale.cancelButton}
                getStaticText={this.getStaticText}
                getTitle={this.getTitle}
                {...this.props}
                onSelect={this.onSelect}
                onDidSelect={this.onDidSelect}
                onOpen={this.onOpen}
                onClose={this.onClose}
                onConfirm={this.onConfirm}
                onCancel={this.onCancel}
            ></UltraSelect>
        )
    }
}

export default DatePicker

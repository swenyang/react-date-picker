import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import UltraSelect from './UltraSelect'

import './DatePicker.less'

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate()
}

function padStart(num) {
    return num >= 10 ? num.toString() : `0${num}`
}

const localeConfigs = {
    en: {
        order: ['month', 'date', 'year', 'hour', 'minute', 'ampm'],
        year: year => year,
        month: month => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month],
        date: date => date,
        am: 'AM',
        pm: 'PM',
        hour: (hour, use24hours) => use24hours ? padStart(hour) : (hour === 0 ? '12' : padStart(hour)),
        minute: minute => padStart(minute),
        confirmButton: 'CONFIRM',
    }
}

class DatePicker extends Component {
    static propTypes = {
        max: PropTypes.string,
        min: PropTypes.string,
        defaultDate: PropTypes.string,
        type: PropTypes.oneOf(['date', 'datetime', 'time', 'month']),
        locale: PropTypes.oneOf(['en', 'zh-cn', 'zh-tw']),
        use24hours: PropTypes.bool,
        onSelect: PropTypes.func,
        onDidSelect: PropTypes.func,
    }

    static defaultProps = {
        min: '1950-01-01',
        max: '2049-12-31',
        type: 'date',
        locale: 'en',
        use24hours: false,
    }

    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this)
        this.onDidSelect = this.onDidSelect.bind(this)

        this.state = this.calColumnsAndKeys(this.getDefaults(props))
    }

    getDefaults(props) {
        props = props || this.props
        let defaultDate = props.defaultDate ? new Date(props.defaultDate) : new Date()
        return {
            year: defaultDate.getFullYear(),
            month: defaultDate.getMonth() + 1,
            date: props.defaultDate ? defaultDate.getDate() : 1,
            ampm: defaultDate.getHours() >= 12 ? 'pm' : 'am',
            hour: defaultDate.getHours(),
            minute: defaultDate.getMinutes(),
        }
    }

    getValueFromState(key, defaultIndex) {
        let state = this.state
        let columnIndex = state.keys.findIndex(e => e === key)
        defaultIndex = typeof defaultIndex === 'number' ? defaultIndex : state.columns[columnIndex].defaultIndex
        return state.columns[columnIndex].list[defaultIndex].key
    }

    calColumnsAndKeys(defaults) {
        const {type, use24hours, min, max, locale} = this.props
        // 1. select keys
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
        // 2. calculate range
        let columnsDict = {}
        let reg = /\d{1,2}:\d{1,2}$/
        let minDate = new Date(`${min} ${min.match(reg) ? '' : '00:00'}`)
        let maxDate = new Date(`${max} ${max.match(reg) ? '' : '23:59'}`)
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

    get date() {
        let defaults = this.getDefaults()
        for (let i = 0, l = this.state.keys.length; i < l; i++) {
            let key = this.state.keys[i]
            defaults[key] = this.getValueFromState(key, null)
        }
        let hour = defaults.hour % 12
        if (defaults.ampm === 'pm') hour += 12
        return new Date(`${defaults.year}-${defaults.month}-${defaults.date} ${hour}:${defaults.minute}`)
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

    calYear(min, max, defaults) {
        let ret = {list:[], defaultIndex:-1}
        for (let i = min.getFullYear(), l = max.getFullYear(), index = 0; i <= l; i++, index++) {
            ret.list.push({
                key: i,
                value: localeConfigs[this.props.locale].year(i)
            })
            if (i === defaults.year) {
                ret.defaultIndex = index
            }
        }
        ret.defaultIndex = (ret.defaultIndex === -1) ? ret.list.length - 1 : ret.defaultIndex
        return ret
    }

    calMonth(min, max, defaults) {
        let ret = {list:[], defaultIndex:-1}
        for (let i = 1, index = 0; i <= 12; i++, index++) {
            let d = new Date(`${defaults.year}-${i}-1`)
            if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[this.props.locale].month(i - 1)
                })
                if (i === defaults.month) {
                    ret.defaultIndex = index
                }
            }
        }
        ret.defaultIndex = (ret.defaultIndex === -1) ? ret.list.length - 1 : ret.defaultIndex
        return ret
    }

    calDate(min, max, defaults) {
        let ret = {list:[], defaultIndex:-1}
        let days = daysInMonth(defaults.year, defaults.month)
        for (let i = 1, index = 0; i <= days; i++, index++) {
            let d = new Date(`${defaults.year}-${defaults.month}-${i}`)
            if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[this.props.locale].date(i)
                })
                if (i === defaults.date) {
                    ret.defaultIndex = index
                }
            }
        }
        ret.defaultIndex = (ret.defaultIndex === -1) ? ret.list.length - 1 : ret.defaultIndex
        return ret
    }

    calAMPM(min, max, defaults) {
        let ret = {list:[], defaultIndex:-1}
        let hour = defaults.hour % 12
        let index = 0
        let d = new Date(`${defaults.year}-${defaults.month}-${defaults.date} ${hour}:${defaults.minute}`)
        if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
            ret.list.push({
                key: 'am',
                value: localeConfigs[this.props.locale].am
            })
            if (defaults.ampm === 'am') {
                ret.defaultIndex = index
            }
            index++
        }
        d = new Date(`${defaults.year}-${defaults.month}-${defaults.date} ${hour+12}:${defaults.minute}`)
        if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
            ret.list.push({
                key: 'pm',
                value: localeConfigs[this.props.locale].pm
            })
            if (defaults.ampm === 'pm') {
                ret.defaultIndex = index
            }
        }
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
        for (let i = start, index = 0; i <= end; i++, index++) {
            let hours = (!this.props.use24hours && defaults.ampm === 'pm') ? i+12 : i
            let d = new Date(`${defaults.year}-${defaults.month}-${defaults.date} ${hours}:00`)
            if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[this.props.locale].hour(i, this.props.use24hours)
                })
                if (i === defaults.hour) {
                    ret.defaultIndex = index
                }
            }
        }
        ret.defaultIndex = (ret.defaultIndex === -1) ? ret.list.length - 1 : ret.defaultIndex
        return ret
    }

    calMinute(min, max, defaults) {
        let ret = {list:[], defaultIndex:-1}
        for (let i = 0; i < 60; i++) {
            let d = new Date(`${defaults.year}-${defaults.month}-${defaults.date} ${defaults.hour}:${i}`)
            if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[this.props.locale].minute(i)
                })
                if (i === defaults.minute) {
                    ret.defaultIndex = i
                }
            }
        }
        ret.defaultIndex = (ret.defaultIndex === -1) ? ret.list.length - 1 : ret.defaultIndex
        return ret
    }

    render() {
        let copyColumns = [], columns = this.state.columns
        for (let i = 0, l = columns.length; i < l; i++) {
            copyColumns.push({list: [...columns[i].list], defaultIndex: columns[i].defaultIndex})
        }
        return <UltraSelect columns={copyColumns} onSelect={this.onSelect} onDidSelect={this.onDidSelect}
                    confirmButton={localeConfigs[this.props.locale].confirmButton}></UltraSelect>
    }
}

export default DatePicker

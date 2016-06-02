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

    _keysInOrder

    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this)
        this.onDidSelect = this.onDidSelect.bind(this)

        let defaultDate = props.defaultDate ? new Date(props.defaultDate) : new Date()
        this.state = {
            year: defaultDate.getFullYear(),
            month: defaultDate.getMonth() + 1,
            date: defaultDate.getDate(),
            ampm: defaultDate.getHours() >= 12 ? 'pm' : 'am',
            hour: defaultDate.getHours(),
            minute: defaultDate.getMinutes(),
        }
    }

    get date() {
        // TODO: this.state is not accurate date, here use UltraSelect's state
        if (this.refs.select) {
            let selectedValues = this.refs.select.selectedValues
            let tmp = {}
            for (let i = 0, l = selectedValues.length; i < l; i++) {
                tmp[this._keysInOrder[i]] = selectedValues[i].key
            }
            let str = tmp.year || (new Date()).getFullYear()
            if (tmp.month) {
                str += `-${tmp.month}`
                if (tmp.date) {
                    str += `-${tmp.date}`
                }
            }
            if (typeof tmp.hour === 'number') {
                str += ` ${tmp.hour}:${typeof tmp.minute === 'number' ? tmp.minute : '00'}`
            }
            return new Date(str)
        }
    }

    onSelect(index, selectedValue) {
        this.setState({
            ...this.state,
            [this._keysInOrder[index]]: selectedValue.key
        })
        if (this.props.onSelect) {
            this.props.onSelect(this.refs.select.selectedValues)
        }
    }

    onDidSelect(index, selectedValue) {
        if (this.props.onDidSelect) {
            this.props.onDidSelect(this.refs.select.selectedValues)
        }
    }

    calYear(min, max) {
        let ret = {list:[], defaultIndex:-1}
        for (let i = min.getFullYear(), l = max.getFullYear(), index = 0; i <= l; i++, index++) {
            ret.list.push({
                key: i,
                value: localeConfigs[this.props.locale].year(i)
            })
            if (i === this.state.year) {
                ret.defaultIndex = index
            }
        }
        ret.defaultIndex = (ret.defaultIndex === -1) ? ret.list.length - 1 : ret.defaultIndex
        return ret
    }

    calMonth(min, max) {
        let ret = {list:[], defaultIndex:-1}
        for (let i = 1, index = 0; i <= 12; i++, index++) {
            let d = new Date(`${this.state.year}-${i}-1`)
            if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[this.props.locale].month(i - 1)
                })
                if (i === this.state.month) {
                    ret.defaultIndex = index
                }
            }
            else break
        }
        ret.defaultIndex = (ret.defaultIndex === -1) ? ret.list.length - 1 : ret.defaultIndex
        return ret
    }

    calDate(min, max) {
        let ret = {list:[], defaultIndex:-1}
        let days = daysInMonth(this.state.year, this.state.month)
        for (let i = 1, index = 0; i <= days; i++, index++) {
            let d = new Date(`${this.state.year}-${this.state.month}-${i}`)
            if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[this.props.locale].date(i)
                })
                if (i === this.state.date) {
                    ret.defaultIndex = index
                }
            }
            else break
        }
        ret.defaultIndex = (ret.defaultIndex === -1) ? ret.list.length - 1 : ret.defaultIndex
        return ret
    }

    calAMPM(min, max) {
        return {
            list: [
                {
                    key: 'am',
                    value: localeConfigs[this.props.locale].am,
                },
                {
                    key: 'pm',
                    value: localeConfigs[this.props.locale].pm,
                },
            ],
            defaultIndex: this.state.ampm === 'am' ? 0 : 1
        }
    }

    calHour(min, max) {
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
            let hours = (!this.props.use24hours && this.state.ampm === 'pm') ? i+12 : i
            let d = new Date(`${this.state.year}-${this.state.month}-${this.state.date} ${hours}:00`)
            if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
                ret.list.push({
                    key: hours,
                    value: localeConfigs[this.props.locale].hour(i, this.props.use24hours)
                })
                if (hours === this.state.hour) {
                    ret.defaultIndex = index
                }
            }
            else break
        }
        ret.defaultIndex = (ret.defaultIndex === -1) ? ret.list.length - 1 : ret.defaultIndex
        return ret
    }

    calMinute(min, max) {
        let ret = {list:[], defaultIndex:-1}
        for (let i = 0; i < 60; i++) {
            let d = new Date(`${this.state.year}-${this.state.month}-${this.state.date} ${this.state.hour}:${i}`)
            if (d.getTime() >= min.getTime() && d.getTime() <= max.getTime()) {
                ret.list.push({
                    key: i,
                    value: localeConfigs[this.props.locale].minute(i)
                })
                if (i === this.state.minute) {
                    ret.defaultIndex = i
                }
            }
            else break
        }
        ret.defaultIndex = (ret.defaultIndex === -1) ? ret.list.length - 1 : ret.defaultIndex
        return ret
    }

    render() {
        const {props} = this
        // 1. select keys
        let keys
        switch (props.type) {
            case 'date':
                keys = ['year', 'month', 'date']
                break
            case 'datetime':
                if (props.use24hours) {
                    keys = ['year', 'month', 'date', 'hour', 'minute']
                }
                else {
                    keys = ['year', 'month', 'date', 'ampm', 'hour', 'minute']
                }
                break
            case 'time':
                if (props.use24hours) {
                    keys = ['hour', 'minute']
                }
                else {
                    keys = ['ampm', 'hour', 'minute']
                }
                break
            case 'month':
                keys = ['year', 'month']
                break
        }
        // 2. calculate range
        let columnsDict = {}
        let reg = /\d{1,2}:\d{1,2}$/
        let min = new Date(`${props.min} ${props.min.match(reg) ? '' : '00:00'}`)
        let max = new Date(`${props.max} ${props.max.match(reg) ? '' : '23:59'}`)
        for (let i = 0, l = keys.length; i < l; i++) {
            switch (keys[i]) {
                case 'year':
                    columnsDict[keys[i]] = this.calYear(min, max)
                    break
                case 'month':
                    columnsDict[keys[i]] = this.calMonth(min, max)
                    break
                case 'date':
                    columnsDict[keys[i]] = this.calDate(min, max)
                    break
                case 'ampm':
                    columnsDict[keys[i]] = this.calAMPM(min, max)
                    break
                case 'hour':
                    columnsDict[keys[i]] = this.calHour(min, max)
                    break
                case 'minute':
                    columnsDict[keys[i]] = this.calMinute(min, max)
                    break
            }
        }
        // 3. order columns
        let locale = localeConfigs[props.locale]
        let finalColumns = []
        this._keysInOrder = []
        for (let i = 0, l = locale.order.length; i < l; i++) {
            if (columnsDict[locale.order[i]]) {
                finalColumns.push(columnsDict[locale.order[i]])
                this._keysInOrder.push(locale.order[i])
            }
        }

        return <UltraSelect ref="select" columns={finalColumns} onSelect={this.onSelect} onDidSelect={this.onDidSelect}
                    confirmButton={locale.confirmButton}></UltraSelect>
    }
}

export default DatePicker

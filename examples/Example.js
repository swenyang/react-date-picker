import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import reactPerf from 'react-addons-perf'

import DatePicker, { addLocaleConfig, padStartWith0, translateHour } from '../src/DatePicker'
// import DatePicker,{addLocaleConfig, padStartWith0, translateHour} from '../dist/react-ultra-date-picker'

import './Example.less'

/* global window */
window.reactPerf = reactPerf

const jaConfig = {
    order: ['year', 'month', 'date', 'ampm', 'hour', 'minute'],
    year: year => `${year}年`,
    month: month => `${month + 1}月`,
    date: date => `${date}日`,
    am: '朝',
    pm: '午後',
    hour: translateHour,
    minute: minute => padStartWith0(minute),
    confirmButton: '決定します',
    cancelButton: 'キャンセル',
    dateLabel: (outOfRange, date, type, use24) => {
        if (outOfRange) {
            return '日付を範囲で選択されていません'
        }
        let ampmStr = ''
        if (!use24) {
            ampmStr = date.getHours() < 12 ? jaConfig.am : jaConfig.pm
        }
        switch (type) {
        case 'time':
            return `${ampmStr}${jaConfig.hour(date.getHours(), use24)}:${jaConfig.minute(date.getMinutes())}`
        case 'month':
            return `${jaConfig.year(date.getFullYear())}${jaConfig.month(date.getMonth())}`
        case 'datetime':
            return `${jaConfig.year(date.getFullYear())}${jaConfig.month(date.getMonth())}${jaConfig.date(date.getDate())} ${ampmStr}${jaConfig.hour(date.getHours(), use24)}:${jaConfig.minute(date.getMinutes())}`
        case 'date':
            return `${jaConfig.year(date.getFullYear())}${jaConfig.month(date.getMonth())}${jaConfig.date(date.getDate())}`
        default:
            return ''
        }
    },
}
addLocaleConfig('ja', jaConfig)

class Example extends Component {
    constructor(props) {
        super(props)

        this.onSelectType = this.onSelectType.bind(this)
        this.onSetMin = this.onSetMin.bind(this)
        this.onSetMax = this.onSetMax.bind(this)
        this.onSetDefault = this.onSetDefault.bind(this)
        this.onSelect24 = this.onSelect24.bind(this)
        this.onSelectLocale = this.onSelectLocale.bind(this)

        this.state = {
            type: 'date',
            min: ('30 Sep 2016 03:10'),
            max: ('19 Sep 2017 13:14'),
            // default: (new Date()).toDateString(),
            use24: false,
            locale: 'en',
        }

        window.example = this
    }

    onSelectType(e) {
        this.setState({
            ...this.state,
            type: e.target.value,
        })
    }

    onSetMin(e) {
        const d = new Date(e.target.value)
        if (!Number.isNaN(d.getDate()) || (this.state.type === 'time' && e.target.value.match(/\d{2}:\d{2}/) && e.target.value.length === 5)) {
            this.setState({
                ...this.state,
                min: e.target.value,
            })
        }
    }

    onSetMax(e) {
        const d = new Date(e.target.value)
        if (!Number.isNaN(d.getDate()) || (this.state.type === 'time' && e.target.value.match(/\d{2}:\d{2}/) && e.target.value.length === 5)) {
            this.setState({
                ...this.state,
                max: e.target.value,
            })
        }
    }

    onSetDefault(e) {
        const d = new Date(e.target.value)
        if (!Number.isNaN(d.getDate()) || e.target.value === '' || (this.state.type === 'time' && e.target.value.match(/\d{2}:\d{2}/) && e.target.value.length === 5)) {
            this.setState({
                ...this.state,
                default: e.target.value,
            })
        }
    }

    onSelect24(e) {
        this.setState({
            ...this.state,
            use24: e.target.value === 'yes',
        })
    }

    onSelectLocale(e) {
        this.setState({
            ...this.state,
            locale: e.target.value,
        })
    }

    getStaticText(selectedValues) {
        return (<span>Select a month: {
            selectedValues.map((e, i) =>
                <div key={i}>
                    {e.value}
                </div>)
        }</span>)
    }

    render() {
        return (
            <div id="example">
                <h2 id="header">React Ultra Date Picker Examples</h2>
                <div className="selection">
                    <div className="option-elem"><b>Select a Date Picker type: </b><br />
                        <input type="radio" name="type" value="date" onChange={this.onSelectType} checked={this.state.type === 'date'} />date
                        <input type="radio" name="type" value="datetime" onChange={this.onSelectType} checked={this.state.type === 'datetime'} />datetime
                        <input type="radio" name="type" value="month" onChange={this.onSelectType} checked={this.state.type === 'month'} />month
                        <input type="radio" name="type" value="time" onChange={this.onSelectType} checked={this.state.type === 'time'} />time
                    </div>

                    <div className="option-elem"><b>Set the min, max and default date: </b><br />
                        <table>
                            <tbody>
                                <tr>
                                    <td>Minimum:</td>
                                    <td style={{ width: '100%' }}><input type="input" style={{ width: '100%' }} defaultValue={this.state.min} onChange={this.onSetMin} /><br /></td>
                                </tr>
                                <tr>
                                    <td>Maximum:</td>
                                    <td style={{ width: '100%' }}><input type="input" style={{ width: '100%' }} defaultValue={this.state.max} onChange={this.onSetMax} /><br /></td>
                                </tr>
                                <tr>
                                    <td>Default:</td>
                                    <td style={{ width: '100%' }}><input type="input" style={{ width: '100%' }} defaultValue={this.state.default} onChange={this.onSetDefault} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="option-elem"><b>Use 24-hour system: </b><br />
                        <input type="radio" name="use24" value="yes" onChange={this.onSelect24} checked={this.state.use24} />Yes
                        <input type="radio" name="use24" value="no" onChange={this.onSelect24} checked={!this.state.use24} />No
                    </div>

                    <div className="option-elem"><b>Language locale: </b><br />
                        <input type="radio" name="locale" value="en" onChange={this.onSelectLocale} checked={this.state.locale === 'en'} />en
                        <input type="radio" name="locale" value="zh-cn" onChange={this.onSelectLocale} checked={this.state.locale === 'zh-cn'} />zh-cn
                    </div>

                    <b>Result:</b><br />
                    <DatePicker
                        ref="picker" type={this.state.type} min={this.state.min} use24hours={this.state.use24}
                        max={this.state.max} defaultDate={this.state.default} locale={this.state.locale}
                    ></DatePicker>
                </div>

                <div className="selection">
                    <b>Cutomizing a locale (Japan):</b><br />
                    <DatePicker
                        type={this.state.type} locale="ja" min={this.state.min} use24hours={this.state.use24}
                        max={this.state.max} defaultDate={this.state.default}
                    ></DatePicker>
                    <br /><br />
                    <b>Source Code:</b>
                    <pre style={{ whiteSpace: 'pre-wrap' }}><code>
                        {`import DatePicker,{addLocaleConfig, padStartWith0, translateHour} from 'react-ultra-date-picker'

const jaConfig = {
    order: ['year', 'month', 'date', 'ampm', 'hour', 'minute'],
    year: year => \`\${year}年\`,
    month: month => \`\${month + 1}月\`,
    date: date => \`\${date}日\`,
    am: '朝',
    pm: '午後',
    hour: translateHour,
    minute: minute => padStartWith0(minute),
    confirmButton: '決定します',
    cancelButton: 'キャンセル',
    dateLabel: (outOfRange, date, type, use24) => {
        if (outOfRange) {
            return '日付を範囲で選択されていません'
        }
        let ampmStr = ''
        if (!use24) {
            ampmStr = date.getHours() < 12 ? jaConfig.am : jaConfig.pm
        }
        switch (type) {
        case 'time':
            return \`\${ampmStr}\${jaConfig.hour(date.getHours(), use24)}:\${jaConfig.minute(date.getMinutes())}\`
        case 'month':
            return \`\${jaConfig.year(date.getFullYear())}\${jaConfig.month(date.getMonth())}\`
        case 'datetime':
            return \`\${jaConfig.year(date.getFullYear())}\${jaConfig.month(date.getMonth())}\${jaConfig.date(date.getDate())} \${ampmStr}\${jaConfig.hour(date.getHours(), use24)}:\${jaConfig.minute(date.getMinutes())}\`
        case 'date':
            return \`\${jaConfig.year(date.getFullYear())}\${jaConfig.month(date.getMonth())}\${jaConfig.date(date.getDate())}\`
        default:
            return ''
        }
    },
}
addLocaleConfig('ja', jaConfig)`}
                    </code></pre>
                </div>

                <div className="selection">
                    <b>Cutomizing title or text: </b><br />
                    <DatePicker
                        type="month" title={<b>SCROLL TO SELECT A MONTH</b>}
                        getStaticText={this.getStaticText}
                    ></DatePicker>
                </div>
            </div>
        )
    }
}

/* global document */
ReactDOM.render(<Example />, document.getElementById('root'))

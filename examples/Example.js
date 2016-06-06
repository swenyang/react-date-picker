import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import DatePicker,{addLocaleConfig, padStartWith0, translateHour} from '../src/DatePicker'
//import DatePicker,{addLocaleConfig, padStartWith0, translateHour} from '../dist/react-ultra-date-picker'

import "./Example.less"

addLocaleConfig('ja', {
    order: ['year', 'month', 'date', 'ampm', 'hour', 'minute'],
    year: year => `${year}年`,
    month: month => `${month+1}月`,
    date: date => `${date}日`,
    am: '朝',
    pm: '午後',
    hour: translateHour,
    minute: minute => padStartWith0(minute),
    confirmButton: '決定します',
})

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
            type: 'datetime',
            min: ('01 Jun 2015'),
            max: ('19 Sep 2017 03:14'),
            default: (new Date()).toDateString(),
            use24: false,
            locale: 'en',
        }
    }

    onSelectType(e) {
        this.setState({
            ...this.state,
            type: e.target.value
        })
    }

    onSetMin(e) {
        let d = new Date(e.target.value)
        if (!Number.isNaN(d.getDate())) {
            this.setState({
                ...this.state,
                min: e.target.value
            })
        }
    }

    onSetMax(e) {
        let d = new Date(e.target.value)
        if (!Number.isNaN(d.getDate())) {
            this.setState({
                ...this.state,
                max: e.target.value
            })
        }
    }

    onSetDefault(e) {
        let d = new Date(e.target.value)
        if (!Number.isNaN(d.getDate())) {
            this.setState({
                ...this.state,
                default: e.target.value
            })
        }
    }

    onSelect24(e) {
        this.setState({
            ...this.state,
            use24: e.target.value === 'yes'
        })
    }

    onSelectLocale(e) {
        this.setState({
            ...this.state,
            locale: e.target.value
        })
    }

    getStaticText(selectedValues) {
        return <span>Select a month: {
            selectedValues.map((e, i) =>
                <div key={i}>
                    {e.value}
                </div>)
        }</span>
    }

    getTitle(selectedValues) {
        return <b>SCROLL TO SELECT A MONTH</b>
    }

    render() {
        return <div id="example">
                <h2 id="header">React Ultra Date Picker Examples</h2>
                <div className="selection">
                    <div className="option-elem"><b>Select a Date Picker type: </b><br/>
                        <input type="radio" name="type" value="date" onChange={this.onSelectType} checked={this.state.type === 'date'}/>date
                        <input type="radio" name="type" value="datetime" onChange={this.onSelectType} checked={this.state.type === 'datetime'}/>datetime
                        <input type="radio" name="type" value="month" onChange={this.onSelectType} checked={this.state.type === 'month'}/>month
                        <input type="radio" name="type" value="time" onChange={this.onSelectType} checked={this.state.type === 'time'}/>time
                    </div>

                    <div className="option-elem"><b>Set the min, max and default date: </b><br/>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Minimum:</td>
                                    <td style={{width:"100%"}}><input type="input" style={{width:"100%"}} value={this.state.min} onChange={this.onSetMin}/><br/></td>
                                </tr>
                                <tr>
                                    <td>Maximum:</td>
                                    <td style={{width:"100%"}}><input type="input" style={{width:"100%"}} value={this.state.max} onChange={this.onSetMax}/><br/></td>
                                </tr>
                                <tr>
                                    <td>Default:</td>
                                    <td style={{width:"100%"}}><input type="input" style={{width:"100%"}} value={this.state.default} onChange={this.onSetDefault}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="option-elem"><b>Use 24-hour system: </b><br/>
                        <small>(switching this prop has bugs now, but works fine on static or after scrolling)</small><br/>
                        <input type="radio" name="use24" value="yes" onChange={this.onSelect24} checked={this.state.use24}/>Yes
                        <input type="radio" name="use24" value="no" onChange={this.onSelect24} checked={!this.state.use24}/>No
                    </div>

                    <div className="option-elem"><b>Language locale: </b><br/>
                        <small>(switching this prop has bugs now, but works fine on static or after scrolling)</small><br/>
                        <input type="radio" name="locale" value="en" onChange={this.onSelectLocale} checked={this.state.locale === 'en'}/>en
                        <input type="radio" name="locale" value="zh-cn" onChange={this.onSelectLocale} checked={this.state.locale === 'zh-cn'}/>zh-cn
                    </div>

                    <b>Result:</b><br/>
                    <DatePicker type={this.state.type} locale="en" min={this.state.min} use24hours={this.state.use24}
                                max={this.state.max} defaultDate={this.state.default} locale={this.state.locale}></DatePicker>
                </div>

                <div className="selection">
                    <b>Cutomizing a locale:</b>
                    <pre style={{whiteSpace:"pre-wrap"}}><code>
                        {`import DatePicker,{addLocaleConfig, padStartWith0, translateHour} from 'react-ultra-date-picker'

addLocaleConfig('ja', {
    order: ['year', 'month', 'date', 'ampm', 'hour', 'minute'],
    year: year => \`\${year}年\`,
    month: month => \`\${month+1}月\`,
    date: date => \`\${date}日\`,
    am: '朝',
    pm: '午後',
    hour: translateHour,
    minute: minute => padStartWith0(minute),
    confirmButton: '決定します',
})`}
                    </code></pre>
                    <b>Result:</b><br/>
                    <DatePicker locale="ja" type="time"></DatePicker>
                </div>

                <div className="selection">
                    <b>Cutomizing title or text: </b><br/>
                    <DatePicker type="month" getTitle={this.getTitle}
                                                          getStaticText={this.getStaticText}></DatePicker>
                </div>
            </div>
    }
}

ReactDOM.render(<Example />, document.getElementById("root"))

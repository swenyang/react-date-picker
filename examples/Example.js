import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import DatePicker,{addLocaleConfig, padStartWith0} from '../src/DatePicker'
//import DatePicker,{addLocaleConfig, padStartWith0} from '../dist/react-ultra-date-picker'

import "./Example.less"

addLocaleConfig('zh-tw', {
    order: ['year', 'month', 'date', 'ampm', 'hour', 'minute'],
    year: year => `${year}年`,
    month: month => `${month+1}月`,
    date: date => `${date}日`,
    am: '上午',
    pm: '下午',
    hour: (hour, use24hours) => use24hours ? padStart(hour) : (hour === 0 ? '12' : padStartWith0(hour)),
    minute: minute => padStartWith0(minute),
    confirmButton: '好',
})

class Example extends Component {

    onDidSelect() {
        console.log(this.refs.dp.date)
    }

    render() {
        return <div>
                <div>Hello world!</div>
                click <DatePicker ref='dp' type="datetime" locale="zh-tw" use24hours={false} defaultDate="2012-2-29"
                                  min="2014-02-28 14:32" max="2016-3-2 20:29"
                                  onDidSelect={this.onDidSelect.bind(this)}
        ></DatePicker> to select
            </div>
    }
}

ReactDOM.render(<Example />, document.getElementById("root"))

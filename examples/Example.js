import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import DatePicker from '../src/DatePicker'

import "./Example.less"

class Example extends Component {
    render() {
        return <div>
                <div>Hello world!</div>
                click <DatePicker type="time" max='2016-5-30'></DatePicker> to select
            </div>
    }
}

ReactDOM.render(<Example />, document.getElementById("root"))

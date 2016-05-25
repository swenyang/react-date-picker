import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import DatePicker from '../src/DatePicker'

import "./Example.less"

class Example extends Component {
    render() {
        return <DatePicker></DatePicker>
    }
}

ReactDOM.render(<Example />, document.getElementById("root"))

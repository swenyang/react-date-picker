import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import DatePicker from '../src/DatePicker'

import "./Example.less"

class Example extends Component {

    onDidSelect() {
        console.log(this.refs.dp.date)
    }

    render() {
        return <div>
                <div>Hello world!</div>
                click <DatePicker ref='dp' type="month"
                                  onDidSelect={this.onDidSelect.bind(this)}></DatePicker> to select
            </div>
    }
}

ReactDOM.render(<Example />, document.getElementById("root"))

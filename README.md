# React Ultra Date Picker
An iOS like, comprehensive date picker component for React.

If you are looking for a React Date Picker working on mobile platforms, this one would be a good choice. After browsing a lot of React Date Picker projects on GitHub, I found that most of them are PC-oriented, so I decided to write one for mobile platforms. This is how [React Ultra Select][1] and [React Ultra Date Picker][2] come.

# Features

- **Supporting 4 Types of Date Picker**

	- `date`

		Default type, you can select year, month and date with this type.

	- `datetime`

		You can select year, month, date, hour and minute with this type.

	- `time`

		You can select hour and minute with this type.

	- `month`

		You can select year and month with this type.

- **Precise Date Range(aka min date and max date)**

	Comprehensive support of date range for all Date Picker types.

- **24-hour System and Non-24-hour System**

	Both two time system are supported.

- **Flexible Locale Configs**

	Exposed a very convinient API for custom locale config. Using this API, you can not only arrange order, but also decide how each year/month/date/ampm/hour/minute element is displayed.

- **Setting Default Date**

	Just give the default date string and React Ultra Date Picker would handle it automatically.

- **Selection Events**

	Every time it selects a date, it will emit an `onSelect` event. Every time it stops scrolling, it will emit an `onDidSelect` event.

- **Customizing**

	You can customize how the title and text is displayed.

# How to use

This component relies on some libraries, import them into your project first.

```
npm i react --save
npm i react-dom --save
npm i iscroll --save
npm i iscroll-react --save
npm i react-ultra-select --save
```

Using it in your project:
```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import DatePicker from 'react-ultra-date-picker'

class SomeComponent extends Component {
	render() {
		return <DatePicker></DatePicker>
	}
}
```

Note that you should pack `iscroll-probe` instead of `iscroll` in your production code, cause this component use `iscroll-probe` to calculate scroll offset and selected indecies. In your [Webpack][3] config:

```js
module.exports = {
	entry: {
		bundle: "./src/index.js",
		vendor: [
            "react",
            "react-dom",
			"iscroll/build/iscroll-probe",
			// ...
		],
	},
	// ...
}
```

# Props

 <table>
    <thead>
        <tr>
            <td><b>Prop Name</b></td>
            <td><b>Default Value</b></td>
            <td><b>Type</b></td>
            <td><b>Description</b></td>
            <td><b>Example</b></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`max`</td>
            <td>`'1970-01-01'`</td>
            <td>String</td>
            <td>Maximum date you can select, should be a string which `new Date(max)` can parse to a `Date` Object. If you don't specify time, a `'00:00'` will be appended.</td>
            <td>`'2016-8-2 1:29'`</td>
        </tr>
        <tr>
            <td>`min`</td>
            <td>`'2038-01-19 03:14'`</td>
            <td>String</td>
            <td>Minimum date you can select, should be a string which `new Date(max)` can parse to a `Date` Object. If you don't specify time, a `'23:59'` will be appended.</td>
            <td>`'2016-8-2 1:29'`</td>
        </tr>
        <tr>
            <td>`defaultDate`</td>
            <td>Current date on constructor</td>
            <td>String</td>
            <td>Default selected date, same as above two.</td>
            <td>`'2015-2-20'`</td>
        </tr>
        <tr>
            <td>`type`</td>
            <td>`'date'`</td>
            <td>One string of `date`, `datetime`, `month` and `time`</td>
            <td>Decide which type of date to select.</td>
            <td>`'datetime'`</td>
        </tr>
        <tr>
            <td>`locale`</td>
            <td>`'en'`</td>
            <td>One string of `en` or `zh-cn`, or locale name added by `addLocaleConfig`</td>
            <td>Tells which date locale config to use.</td>
            <td>`'zh-cn'`</td>
        </tr>
        <tr>
            <td>`use24hours`</td>
            <td>`false`</td>
            <td>Boolean</td>
            <td>Whether to use 24-hour system.</td>
            <td>`true`</td>
        </tr>
        <tr>
            <td>`onSelect`</td>
            <td></td>
            <td>Function</td>
            <td>Will be called with a `Date` Object when selection is made.</td>
            <td>`(date) => console.log(date)`</td>
        </tr>
        <tr>
            <td>`onDidSelect`</td>
            <td></td>
            <td>Function</td>
            <td>Will be called with a `Date` Object when selection is made and scrolling stops.</td>
            <td>`(date) => console.log(date)`</td>
        </tr>
        <tr>
            <td>`getTitle`</td>
            <td></td>
            <td>Function</td>
            <td>A function to set the bottom title, will be called with an array of selected values</td>
            <td>`(selectedValues) => <div>Please select</div>`</td>
        </tr>
        <tr>
            <td>`getStaticText`</td>
            <td></td>
            <td>Function</td>
            <td>A function to set the text in collapse state, will be called with an array of selected values</td>
            <td>`(selectedValues) => <div>Please select</div>`</td>
        </tr>
    </tbody>
</table>

# Functions

- `addLocaleConfig(name, config)`

	Add a locale config to the Date Picker, so you can specify locale other than `en` and `zh-cn`. The config keys includes:
	<table>
        <thead>
            <tr>
                <td><b>Key</b></td>
                <td><b>Type</b></td>
                <td><b>Description</b></td>
                <td><b>Example Value</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>`order`</td>
                <td>Array</td>
                <td>The order of `year`, `month`, `date`, `ampm`, `hour` and `minute` in selection</td>
                <td>`['month', 'date', 'year', 'hour', 'minute', 'ampm']`</td>
            </tr>
            <tr>
                <td>`year`</td>
                <td>Function</td>
                <td>A function generates `year` string.</td>
                <td>`year => year`</td>
            </tr>
            <tr>
                <td>`month`</td>
                <td>Function</td>
                <td>A function generates `month` string.</td>
                <td>`month => month + 1`</td>
            </tr>
            <tr>
                <td>`date`</td>
                <td>Function</td>
                <td>A function generates `date` string.</td>
                <td>`date => date`</td>
            </tr>
            <tr>
                <td>`am`</td>
                <td>String</td>
                <td>A string for `am`, probably in different languages.</td>
                <td>`'AM'`</td>
            </tr>
            <tr>
                <td>`pm`</td>
                <td>String</td>
                <td>A string for `pm`, probably in different languages.</td>
                <td>`'PM'`</td>
            </tr>
            <tr>
                <td>`hour`</td>
                <td>Function</td>
                <td>A function generates `hour` string.</td>
                <td>`hour => hour`</td>
            </tr>
            <tr>
                <td>`minute`</td>
                <td>Function</td>
                <td>A function generates `minute` string.</td>
                <td>`minute => minute`</td>
            </tr>
            <tr>
                <td>`confirmButton`</td>
                <td>String</td>
                <td>A string for the confirm button label, probably in different languages.</td>
                <td>`'OK'`</td>
            </tr>
        </tbody>
    </table>

	For example, adding a `zh-tw` locale config would be like below:

	```js
	import DatePicker,{addLocaleConfig, padStartWith0} from 'react-ultra-date-picker'

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
	```

- `padStartWith0(num)`

	Pad a number smaller than 10 with a `0` at the start.

- `daysInMonth(year, month)`

	Calculates how many days in given year and month. Referenced from [StackOverflow][4]. Returns a Number.

- `isPm(date)`

	Whether a given date is in p.m. or not. Returns a Boolean.

- `DatePicker.date`

    Get the current selected date, a javascript `Date` Object will be returned. You can call `getFullYear()`, `getMonth()`, `getDate()`, `getHour()` or `getMinute()` depending on your needs.

    ```js
    this.refs.datePicker.date
    ```

# Examples

- Online

	Open <https://swenyang.github.io/react-date-picker> to see online demo.

- Local

	Clone this repo, and run `npm run examples`. Then navigate to <http://localhost:8080> to see examples.

# TODO

- Implementing more features in the web APIs of the INPUT DATE elemnent

[1]: https://github.com/swenyang/react-ultra-select
[2]: https://github.com/swenyang/react-date-picker
[3]: https://webpack.github.io
[4]: http://stackoverflow.com/questions/315760/what-is-the-best-way-to-determine-the-number-of-days-in-a-month-with-javascript
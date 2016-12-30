# React Ultra Date Picker

## 简介

React Ultra Date Picker是一个类iOS日期选择、全面的React日期组件。

如果你想要找一个跨移动平台的React日期选择组件，这个组件是非常不错的选择。浏览GitHub中大部分的React日期选择器后，我发现大部分都是面向PC浏览器的，所以我决定写一个面向移动平台的选择器。这就是[React Ultra Select](https://github.com/swenyang/react-ultra-select)和[React Ultra Date Picker](https://github.com/swenyang/react-date-picker)的起源。

此组件依赖于[React Ultra Select](https://github.com/swenyang/react-ultra-select)，所以滑动选择体验根据版本不同而不同。可以改变React Ultra Select的版本来使用不同的滑动。React Ultra Select 1.0.x系列使用iscroll滑动，1.1.x使用div的滑动。项目默认依赖于iscroll版本的滑动。

## 特性

- **支持4种类型的日期选择**

	- `date`

		默认类型，可以选择年、月、日。

	- `datetime`

		这种类型可以选择年、月、日、时、分。

	- `time`

		这种类型可以选择时、分。

	- `month`

		这种类型可以选择年、月。

- **精确的日期范围限定（即最小、最大日期）**

	所有类型的日期选择都支持全面、精确的范围，也支持超出范围的检测。

- **支持24小时制和12小时制**

	支持两种时间系统。

- **灵活的地区配置**

	提供一个方便的`addLocaleConfig`的API来自定义地区配置。使用此API，你可以设置顺序、年月日时分秒等元素的显示。

- **选择事件**

	跟[React Ultra Select](https://github.com/swenyang/react-ultra-select) 一样，支持6选择事件。

## 如何使用

```  
npm i react-ultra-date-picker --save
```

在你的项目中使用：

```  
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import DatePicker from 'react-ultra-date-picker'

class SomeComponent extends Component {
	render() {
		return <DatePicker></DatePicker>
	}
}
```

## Props

### `dateStringProp`

`dateStringProp`是用来作为Javascript中`Date`类型的构造参数的。它可以是一个数字，一个[RFC2822 Section 3.3](http://tools.ietf.org/html/rfc2822#section-3.3)格式的字符串，一个[ISO-8601](https://www.w3.org/TR/NOTE-datetime)格式的字符串，或者是`dd:dd`格式的字符串。

- 数字

	即距离1970-01-01 00:00:00的毫秒数，可以是正数或者负数。

- [RFC2822 Section 3.3](http://tools.ietf.org/html/rfc2822#section-3.3)格式字符串

	类似于`Sat Jul 30 2016 18:17:37 GMT+0800 (CST)`的字符串，可以通过`Date.toString()`或者`Date.toDateString()`生成。

- [ISO-8601](https://www.w3.org/TR/NOTE-datetime)格式字符串

	类似于`2016-07-30T10:18:43.422Z`的字符串，可以通过`Date.toJSON()`生成. 注意`Date.toJSON()`会返回UTC时区的时间。

- `dd:dd`格式的字符串

	只可在`type=time`时使用，并且`dd:dd`需要是24小时时间系统的值。

### 可选的Props

<table>
    <thead>
        <tr>
            <td><b>Prop名称</b></td>
            <td><b>默认值</b></td>
            <td><b>类型</b></td>
            <td><b>描述</b></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>min</td>
            <td>'01 Jan 1970 00:00'</td>
            <td>dateStringProp</td>
            <td>选择范围的日期下限</td>
        </tr>
        <tr>
            <td>max</td>
            <td>'19 Jan 2038 03:14'</td>
            <td>dateStringProp</td>
            <td>选择范围的日期上限</td>
        </tr>
        <tr>
            <td>defaultDate</td>
            <td>null</td>
            <td>dateStringProp</td>
            <td>指定选定的时间</td>
        </tr>
        <tr>
            <td>type</td>
            <td>'date'</td>
            <td>'date', 'datetime', 'month'和'time'之一</td>
            <td>日期选择器的类型</td>
        </tr>
        <tr>
            <td>locale</td>
            <td>'en'</td>
            <td>'en'或'zh-cn'，或者通过addLocaleConfig添加的地区</td>
            <td>使用何种地区配置</td>
        </tr>
        <tr>
            <td>use24hours</td>
            <td>false</td>
            <td>Boolean</td>
            <td>是否使用24小时时间系统</td>
        </tr>
        <tr>
            <td>title</td>
            <td>null</td>
            <td>String/ReactNode</td>
            <td>选择面板的标题</td>
        </tr>
        <tr>
            <td>outOfRangeLabel</td>
            <td>null</td>
            <td>String/ReactNode</td>
            <td>提示给定的`defaultDate`超出范围的提示文字，如果你不想要使用地区配置里面的提示就传递值给这个属性。</td>
        </tr>
        <tr>
            <td>noneSelectedLabel</td>
            <td>null</td>
            <td>String/ReactNode</td>
            <td>提示未给定defaultDate值，且用户没有选择日期时的提示文字，如果你不想要使用地区配置里面的提示就传递值给这个属性。 </td>
        </tr>
    </tbody>
</table>

### [React Ultra Select](https://github.com/swenyang/react-ultra-select)的Props

因为此组件依赖于[React Ultra Select](https://github.com/swenyang/react-ultra-select)，你可以设置以下的属性值：

- `rowsVisible`
- `rowHeight`
- `rowHeightUnit`
- `backdrop`
- `disabled`
- `useTouchTap`
- `isOpen`

## 事件回调

React Ultra Date Picker与React Ultra Select有相同的事件回调:

- `onOpen(date)`

	当选择面板弹出的时候会调用此函数（如果有），并且会带上当前选择的日期。

- `onClose(date)`

	当选择面板关闭的时候会调用此函数（如果有），并且会带上当前选择的日期。在`onConfirm`和`onCancel`事件之后调用。

- `onConfirm(date)`

	当选择点击确定按钮或者背景遮罩的时候会调用此函数（如果有），并且会带上当前选择的日期。

- `onCancel(date)`

	当选择点击关闭按钮的时候会调用此函数（如果有），并且会带上当前选择的日期。

- `onDidSelect(date)`

	选择面板打开时，用户进行滑动选择，当一次滑动停止（用户停止滑动）时会调用此函数，并带上当前选择的日期。

- `onSelect(date)`

	选择面板打开时，用户进行滑动选择，每次滑动到新的选项时会调用此函数，并带上当前选择的日期。

- `getTitle(fullDate)`

	调用时机同[React Ultra Select](https://github.com/swenyang/react-ultra-select)，但是会带一个`fullDate`对象参数，其带有当前选择的日期、是否超出范围、是否选择等信息，见后。

	`getTitle`属性的优先级比`title`属性要高。

- `getStaticText(fullDate)`

	调用时机同[React Ultra Select](https://github.com/swenyang/react-ultra-select)，但是会带一个`fullDate`对象参数。

## 函数

- `addLocaleConfig(name, config)`

	给日期选择器添加一个地区配置对象，之后你可以使用除了`en`和`zh-cn`之外的地区配置。config可配置内容包括：

	 <table>
	        <thead>
	            <tr>
	                <td><b>键</b></td>
	                <td><b>类型</b></td>
	                <td><b>描述</b></td>
	                <td><b>样例</b></td>
	            </tr>
	        </thead>
	        <tbody>
	            <tr>
	                <td>order</td>
	                <td>Array</td>
	                <td>year, month, date, ampm, hour和`minute`在选择面板中的顺序</td>
	                <td>['month', 'date', 'year', 'hour', 'minute', 'ampm']</td>
	            </tr>
	            <tr>
	                <td>year</td>
	                <td>Function</td>
	                <td>生成`year`字符串的函数</td>
	                <td>year => year</td>
	            </tr>
	            <tr>
	                <td>month</td>
	                <td>Function</td>
	                <td>生成`month`字符串的函数</td>
	                <td>month => month + 1</td>
	            </tr>
	            <tr>
	                <td>date</td>
	                <td>Function</td>
	                <td>生成date字符串的函数</td>
	                <td>date => date</td>
	            </tr>
	            <tr>
	                <td>am</td>
	                <td>String</td>
	                <td>表示早上的字符串</td>
	                <td>'AM'</td>
	            </tr>
	            <tr>
	                <td>pm</td>
	                <td>String</td>
	                <td>表示下午的字符串</td>
	                <td>'PM'</td>
	            </tr>
	            <tr>
	                <td>hour</td>
	                <td>Function</td>
	                <td>生成`hour`字符串的函数</td>
	                <td>(hour, use24hours) => hour</td>
	            </tr>
	            <tr>
	                <td>minute</td>
	                <td>Function</td>
	                <td>生成minute字符串的函数</td>
	                <td>minute => minute</td>
	            </tr>
	            <tr>
	                <td>confirmButton</td>
	                <td>String</td>
	                <td>设置确定按钮字符串</td>
	                <td></td>
	            </tr>
	            <tr>
	                <td>cancelButton</td>
	                <td>String</td>
	                <td>设置取消按钮字符串</td>
	                <td></td>
	            </tr>
	            <tr>
	                <td>dateLabel</td>
	                <td>Function</td>
	                <td>设置静态文本的函数，接受当前选择的fullDate作为参数，返回一个字符串或者React Node。</td>
	                <td>(fullDate, type, use24) => date.toJSON()</td>
	            </tr>
	        </tbody>
	     </table>

	例如，添加一个日本地区(`ja`)的配置代码如下：

	```  
	import DatePicker,{addLocaleConfig, padStartWith0, translateHour} from 'react-ultra-date-picker'

	const jaConfig = {
	    order: ['year', 'month', 'date', 'ampm', 'hour', 'minute'],
	    year: year => `$year年`,
	    month: month => `$month+1月`,
	    date: date => `$date日`,
	    am: '朝',
	    pm: '午後',
	    hour: translateHour,
	    minute: minute => padStartWith0(minute),
	    confirmButton: '決定します',
	    cancelButton: 'キャンセル',
	    dateLabel: (fullDate, type, use24) => {
	        const { date, noneSelected, outOfRange } = fullDate
	        if (noneSelected) {
	            return '日付を選択してください'
	        }
	        if (outOfRange) {
	            return '日付を範囲で選択されていません'
	        }
	        let ampmStr = ''
	        if (!use24) {
	            ampmStr = date.getHours() < 12 ? jaConfig.am : jaConfig.pm
	        }
	        switch (type) {
	        case 'time':
	            return `$ampmStr$jaConfig.hour(date.getHours(), use24):$jaConfig.minute(date.getMinutes())`  
	        case 'month':
	            return `$jaConfig.year(date.getFullYear())$jaConfig.month(date.getMonth())`  
	        case 'datetime':
	            return `$jaConfig.year(date.getFullYear())$jaConfig.month(date.getMonth())$jaConfig.date(date.getDate()) $ampmStr$jaConfig.hour(date.getHours(), use24):$jaConfig.minute(date.getMinutes())`  
	        case 'date':
	            return `$jaConfig.year(date.getFullYear())$jaConfig.month(date.getMonth())$jaConfig.date(date.getDate())`  
	        default:
	            return ''
	        }
	    },
	}
	addLocaleConfig('ja', jaConfig)
	```

- `padStartWith0(num)`

	给小于10的数字左边添加0作对齐。

- `daysInMonth(year, month)`

	计算给定的年、月有多少天。参考自[StackOverflow](http://stackoverflow.com/questions/315760/what-is-the-best-way-to-determine-the-number-of-days-in-a-month-with-javascript)。返回天数。

- `isPm(date)`

	给定的日期是否处于下午，返回一个布尔值。

- `translateHour(hour, use24hours)`

	根据`use24hour`参数，转换一个小时数字，同时给小于10的小时数左边加0对齐。

- `DatePicker.date`

	获取当前选择的日期，返回一个Javascript的`Date`对象。你可以根据需要来调用`getFullYear()`, `getMonth()`, `getDate()`, `getHour()`或者`getMinute()`操作它。要添加`ref`属性到`<DatePicker>`。

	如果给定的`defaultDate`超出范围，或者用户未选择日期，将会返回一个`null`。

	```  
	this.refs.datePicker.date
	```

- `DatePicker.fullDate`

	获取当前选择的日期和是否超出范围、用户是否选择等信息，将返回如下的对象：

	```  
	{
	    date: Date,
	    outOfRange: false,
	    noneSelected: true,
	}
	```

## 样例

- 在线

	打开网址[https://swenyang.github.io/react-date-picker](https://swenyang.github.io/react-date-picker)可以看在线的demo。

- 本地

	复制本仓库，`npm install`安装依赖，然后运行`npm run examples`。在浏览器打开[http://localhost:8080](http://localhost:8080)可以看到样例。

## TODO

- 添加更多的地区配置，并且导出为多个块。

- 实现更多Input标签Date类型的API。

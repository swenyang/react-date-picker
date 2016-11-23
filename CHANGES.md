# Change Logs

## Version 1.1.4

Date: 2016-11-23

- Support none-selected status
- Optimize `getTitle`, `getStaticText` and `dateLabel` calling with `fullDate`

## Version 1.1.3

Date: 2016-10-11

- Bug fixes
- Unified callbacks with `this.date` as the first parameter

## Version 1.1.0

Date: 2016-07-30

### FEATURES

- Support date out of range if defaultDate is not between min and max
- Opt `addLocaleConfig`, add type checking
- Migrate `getStaticText` to `dateLabel` which is locale related
- Export minified dist files
- Opt min/max/defaultDate params to support `00:00` style date string
- Fix bugs on changing props
- Add `shouldComponentUpdate`
- Add cancellation feature

## Version 1.0.7

- Pass `isOpen` and `useTouchTap` props

## Version 1.0.6

- Pass `onOpen` and `onClose` props

## Version 1.0.5

- Fix `calMonth()` returning wrong dates in a month.

## Version 1.0.4

- Pass `disabled` prop to [React Ultra Select][1].

## Version 1.0.3

- Fix date range calculation bug.

## Version 1.0.2

- Pass `rowsVisible`, `rowHeight`, `rowHeightUnit`, `backdrop` props to [React Ultra Select][1].

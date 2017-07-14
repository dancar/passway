import React from 'react'
const withDisplayCondition = Component => ({condition, ...props}) =>
  condition
      ? React.createElement(Component, props)
      : null

export default withDisplayCondition
export const DivWithDisplayCondition = withDisplayCondition('div')

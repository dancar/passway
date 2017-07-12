import React from 'react'
const withDisplayCondition = Component => ({condition, ...props}) =>
  condition
      ? <Component {...props} />
      : null

export default withDisplayCondition
export const DivWithDisplayCondition = withDisplayCondition(props => <div {...props} />)

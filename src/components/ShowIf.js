import React from 'react'

export default function ShowIf ({children, condition}) {
  return condition
    ? <span> { children } </span>
    : null
}

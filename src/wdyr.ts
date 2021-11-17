import React from 'react'

if (process.env.NODE_ENV === 'development') {
  const whyDidyouRender = require('@welldone-software/why-did-you-render')
  whyDidyouRender(React, {
    trackAllPureComponents: false
  })
}

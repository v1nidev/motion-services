import React from 'react'
import { type PropsWithChildren } from 'react'

import { ScrollViewStyleReset } from 'expo-router/html'

import '../unistyles'

// Initialize Unistyles for static rendering

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Motion app" />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  )
}

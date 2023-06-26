import {} from 'styled-components/cssprop'
import * as React from 'react'
import { SimpleInterpolation } from 'styled-components'

declare module 'styled-components' {
  export interface ThemedStyledComponentsModule<T> {
    createGlobalStyle(
      strings: TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ): React.ComponentClass
  }

  export function createGlobalStyle(
    strings: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): React.ComponentClass
}

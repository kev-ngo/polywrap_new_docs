import { Fragment } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from '../../src/styles/prism'

export function Fence({ children, language }) {
  return (
    <Highlight
      {...defaultProps}
      code={children.trimEnd()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre className={className} style={style}>
          <code>
            {tokens.map((line, index) => (
              <Fragment key={index}>
                {line.map((token, index) => (
                  <span key={index} {...getTokenProps({ token })} />
                ))}
                {'\n'}
              </Fragment>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}

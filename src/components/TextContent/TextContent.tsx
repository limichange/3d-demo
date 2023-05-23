import { FC, ReactNode } from 'react'

export interface TextContentProps {
  children?: ReactNode
}

export const TextContent: FC<TextContentProps> = (props) => {
  const { children } = props

  return (
    <div
      style={{
        top: '25vh',
        left: 0,
        right: 0,
        position: 'absolute',
        zIndex: 1,
        textAlign: 'center',
      }}>
      <div>ERROR 404</div>

      <span>Lost your way</span>

      <div style={{ paddingTop: 24, opacity: 0.5 }}>
        content we cant seem to find the page youre looking for
      </div>

      <div
        style={{
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'center',
        }}></div>

      {children}
    </div>
  )
}

import { FC, ReactNode } from 'react'

export interface ButtonContentProps {
  children?: ReactNode
}

export const ButtonContent: FC<ButtonContentProps> = (props) => {
  const { children } = props

  return (
    <div
      style={{
        top: '50vh',
        position: 'absolute',
        zIndex: 1,
        textAlign: 'center',
        left: 0,
        right: 0,
      }}>
      <div
        style={{
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'center',
        }}>
        <button>content__take_me_back_home</button>
      </div>

      {children}
    </div>
  )
}

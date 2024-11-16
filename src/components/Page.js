import { useNavigate } from 'react-router-dom'
import { backButton } from '@telegram-apps/sdk-react'
import { useEffect } from 'react'

const Page = ({ children, back = true }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (back) {
      backButton.show()
      return backButton.onClick(() => {
        navigate(-1)
      })
    }
    backButton.hide()
  }, [back, navigate])

  return (
    <div
      style={{
        height: '100vh', 
        width: '100%', 
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#50255f',
        margin: 0, 
        padding: 0, 
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          width: '100%', 
          margin: 'auto',
          textAlign: 'center',
          wordWrap: 'break-word',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Page
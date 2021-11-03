import { useState } from 'react'
import { RegisterScreen } from './login'
import { LoginScreen } from './register'

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? '注册' : '登录'}
      </button>
    </div>
  )
}

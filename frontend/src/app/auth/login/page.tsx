import { Form } from '@/components/form/Form'
import LoginContainer from './LoginContainer'
import GoogleButton from './oauth/GoogleButton'

export default async function LoginPage() {
  return (
    <LoginContainer>
      <Form type="login" />

      <GoogleButton />
    </LoginContainer>
  )
}

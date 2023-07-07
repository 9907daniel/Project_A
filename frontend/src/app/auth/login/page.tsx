import { Form } from '@/components/form/Form'
import LoginContainer from './LoginContainer'
import LinkButton from './oauth/LinkButton'
import OauthContainer from './oauth/OauthContainer'

export default function LoginPage() {
  return (
    <LoginContainer>
      <Form type="login" />
      <OauthContainer>
        {['google', 'facebook', 'kakao', 'naver'].map((socialType, idx) => {
          return <LinkButton key={idx} socialType={socialType} />
        })}
      </OauthContainer>
    </LoginContainer>
  )
}

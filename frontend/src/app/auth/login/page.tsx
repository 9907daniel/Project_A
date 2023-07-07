import { Form } from '@/components/form/Form'
import LoginContainer from './LoginContainer'
import OauthContainer from './oauth/OauthContainer'

const SOCIAL_TYPES = ['google', 'facebook', 'kakao', 'naver']

export default async function LoginPage() {
  return (
    <LoginContainer>
      <Form type="login" />
      <OauthContainer>
        {SOCIAL_TYPES.map((socialType) => {
          const uri = `'http://localhost:7072/oauth2/authorization/${socialType}?redirect_uri=http://localhost:3000/project/list'`
          return (
            <a className="block border-2 hover:bg-gray-500" href={uri}>
              {socialType}
            </a>
          )
        })}
      </OauthContainer>
    </LoginContainer>
  )
}

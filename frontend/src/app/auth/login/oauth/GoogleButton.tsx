'use client'

const OAUTH_URI = 'http://localhost:7072/oauth2/authorization/google?redirect_uri=http://localhost:3000/project/list'

export default function GoogleButton() {
  return (
    <a href={OAUTH_URI} className="border-2">
      {' '}
      Google{' '}
    </a>
  )
}

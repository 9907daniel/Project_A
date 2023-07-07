'use client'

export default function LinkButton({ socialType }: { socialType: string }) {
  const oauth_uri = `http://localhost:7072/oauth2/authorization/${socialType}?redirect_uri=http://localhost:3000/project/list`
  return (
    <a href={oauth_uri} className="border-2 hover:bg-gray-500">
      {socialType}
    </a>
  )
}

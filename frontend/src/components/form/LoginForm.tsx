async function getUser(url: string) {
  const res = await fetch(url)
  const data = res.json()
  return data
}

export default function LoginForm() {
  function onClickHandler(e: any) {
    e.preventDefault()
    const user = getUser('')
    console.log(user)
  }
  return <button onClick={onClickHandler}> 로그인! </button>
}

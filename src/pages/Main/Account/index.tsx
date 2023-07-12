import { Head } from '../../../components/Head'
import { useUser } from '../../../hooks/useUser'
import { MutableRefObject, useRef, useState } from 'react'
import styles from './styles.module.css'

export default function Account() {
  const userRef = useRef() as MutableRefObject<HTMLInputElement>
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>

  const { getAuthUser, login, logout, signup } = useUser()

  const [showLogin, setShowLogin] = useState(true)

  const authUser = getAuthUser()

  const loginUser = () => {
    login({
      username: userRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
  }

  const signupUser = () => {
    signup({
      username: userRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })

    userRef.current.value = ''
    emailRef.current.value = ''
    passwordRef.current.value = ''
  }

  const logoutUser = () => {
    logout()
  }

  const alternateScreen = () => {
    setShowLogin(!showLogin)
  }

  return (
    <>
      {authUser.username !== '' && (
        <>
          <h2>Bem vindo {authUser.username}</h2>
          <br />
          <br />
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <p className={styles.logout} onClick={logoutUser}>
              Fazer logout e sair da conta
            </p>
          </div>
        </>
      )}
      {authUser.username === '' && showLogin && (
        <>
          <Head title='Conta do Usuário' />
          <div className={styles.loginForm}>
            <h2>Acesso a sua Conta</h2>
            <label htmlFor='username'>Nome de usuário</label>
            <input type='text' id='username' name='username' ref={userRef} />
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' name='email' ref={emailRef} />
            <label htmlFor='password'>Senha</label>
            <input type='password' id='password' name='password' ref={passwordRef} />
            <button type='submit' onClick={loginUser}>
              Login
            </button>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <br />
              <br />
              <h3 onClick={alternateScreen}>Ainda não tenho cadastro</h3>
            </div>
          </div>
        </>
      )}
      {authUser.username === '' && !showLogin && (
        <>
          <Head title='Cadastro de Usuário' />
          <>
            <div className={styles.loginForm}>
              <h2>Cadastro de Usuário</h2>
              <label htmlFor='username'>Nome de usuário</label>
              <input type='text' id='username' name='username' ref={userRef} />
              <label htmlFor='email'>Email</label>
              <input type='text' id='email' name='email' ref={emailRef} />
              <label htmlFor='password'>Senha</label>
              <input type='password' id='password' name='password' ref={passwordRef} />
              <button type='submit' onClick={signupUser}>
                Cadastrar
              </button>
              <div style={{ margin: 'auto', textAlign: 'center' }}>
                <br />
                <br />
                <h3 onClick={alternateScreen}>Já possuo cadastro</h3>
              </div>
            </div>
          </>
        </>
      )}
    </>
  )
}

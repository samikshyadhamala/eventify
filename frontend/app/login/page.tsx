"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "react-toastify"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { signInWithPopup, auth, provider } from "../firebase"
import { useAuth } from "@/context/auth/hooks"

interface InputFieldProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
}

interface Errors {
  email?: string
  password?: string
}

const InputField = ({ id, label, type, value, onChange, error, disabled }: InputFieldProps) => (
  <div className="form-floating mb-3">
    <input
      type={type}
      className={`form-control ${error ? 'is-invalid' : ''}`}
      id={id}
      placeholder={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    <label htmlFor={id}>{label}</label>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
)

const OrDivider = () => (
  <div className="text-center text-secondary mb-2 d-flex align-items-center justify-content-center">
    <hr className="flex-grow-1" />
    <span className="px-2">OR</span>
    <hr className="flex-grow-1" />
  </div>
)

interface GoogleButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  isLoading?: boolean
}

const GoogleButton = ({ onClick, disabled, isLoading }: GoogleButtonProps) => (
  <button
    onClick={onClick}
    className="d-inline-flex align-items-center px-4 py-2 rounded-pill border-0"
    style={{ backgroundColor: '#DEE3E8' }}
    disabled={disabled || isLoading}
  >
    {isLoading ? (
      <div className="spinner-border spinner-border-sm me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    ) : (
      <img src="/images/google_icon.webp" alt="Google" width="32" height="32" className="me-2" />
    )}
    <span>Login with Google</span>
  </button>
)

const FooterLinks = () => (
  <div className="d-flex justify-content-between mt-4">
   
  </div>
)

interface SignInFormProps {
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  errors: Errors
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleGoogleLogin: (e: React.MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
  isGoogleLoading: boolean
}

const SignInForm = ({ email, setEmail, password, setPassword, errors, handleSubmit, handleGoogleLogin, isLoading, isGoogleLoading }: SignInFormProps) => (
  <div className="container shadow border bg-light rounded-2 p-4 my-12" style={{ maxWidth: '30rem', minHeight: '' }}>
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="h3 mb-4 text-center"><b>Please sign in</b></h1>

      {/* <InputField
        id="floatingInput"
        label="Email address"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={errors.email}
        disabled={isLoading || isGoogleLoading}
      />

      <InputField
        id="floatingPassword"
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={errors.password}
        disabled={isLoading || isGoogleLoading}
      />

      <div className="d-flex justify-content-center mb-3">
        <button type="submit" className="btn bg-black text-white" style={{ width: '8rem' }} disabled={isLoading || isGoogleLoading}>
          {isLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            'Sign in'
          )}
        </button>
      </div>

      <OrDivider /> */}

      <div className="text-center">
        <GoogleButton onClick={handleGoogleLogin} disabled={isLoading} isLoading={isGoogleLoading} />
      </div>

      <FooterLinks />
    </form>
  </div>
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const router = useRouter()
  const { axiosInstance } = useAuth()

  const validate = () => {
    const errs: Errors = {}
    if (!email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = 'Invalid email format'

    const pw: string[] = []
    if (!password) pw.push('Password is required')
    else if (password.length < 8)
      pw.push('Password must be at least 8 characters')
    if (pw.length) errs.password = pw.join(', ')

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    try {
      const response = await axiosInstance.post("/api/auth/signin", {email, password})
      console.log(response.data)
      // Add your login logic here
      router.push('/allevent')
    } catch (err) {
      const error = err as Error
      toast.error(error.message || 'Sign-in failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsGoogleLoading(true)
    try {
      const result = await signInWithPopup(auth, provider)
      const firebaseUser = result.user
      const idToken = await firebaseUser.getIdToken()
      const refreshToken = firebaseUser.refreshToken

      try {
        const response = await axiosInstance.post(
          '/api/auth/signin-with-google',
          { authToken: idToken, refreshToken }
        )
        if (response.data?.user?.role === 'admin') {
          router.push('/admin')
        } else if (response.data?.user?.role === 'club') {
          router.push('/club')
        } else {
          router.push('/')
        }
      } catch (error) {
        toast.error("Error during login")
        console.error('Login error:', error)
      }
    } catch (err) {
      toast.error("Google login error")
      console.error('Google login error:', err)
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <>
      <Header placeholder={true}/>
      <main className="py-8">
        <SignInForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          errors={errors}
          handleSubmit={handleSubmit}
          handleGoogleLogin={handleGoogleLogin}
          isLoading={isLoading}
          isGoogleLoading={isGoogleLoading}
        />
      </main>
      <Footer />
    </>
  )
}
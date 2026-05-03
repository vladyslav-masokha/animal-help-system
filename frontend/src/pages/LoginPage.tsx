import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'

const LoginPage = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		setIsLoading(true)

		try {
			const user = await loginUser({ email, password })

			if (user.role === 'Admin') {
				navigate('/admin')
			} else {
				navigate('/')
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError('Сталася невідома помилка')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='page auth-layout'>
			<div className='auth-page'>
				<div className='auth-card'>
					<div className='auth-header'>
						<span className='section-tag'>Вхід</span>
						<h1>Вхід в акаунт</h1>
						<p>Увійдіть, щоб переглядати заявки та допомагати тваринам.</p>
					</div>

					{location.state?.registered && (
						<div className='auth-success'>
							Реєстрація успішна! Тепер увійдіть у свій акаунт.
						</div>
					)}

					<form onSubmit={handleSubmit} className='auth-form'>
						<div className='form-group'>
							<label htmlFor='email'>Email</label>
							<input
								id='email'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder='Введіть email'
								autoComplete='email'
								required
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='password'>Пароль</label>
							<input
								id='password'
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder='Введіть пароль'
								autoComplete='current-password'
								required
							/>
						</div>

						{error && <div className='auth-error'>{error}</div>}

						<button
							type='submit'
							className='btn btn-primary full-width'
							disabled={isLoading}
						>
							{isLoading ? 'Вхід...' : 'Увійти'}
						</button>
					</form>

					<p className='auth-footer-text'>
						Немає акаунта? <Link to='/register'>Зареєструватися</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default LoginPage

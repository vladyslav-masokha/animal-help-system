import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'

const RegisterPage = () => {
	const navigate = useNavigate()

	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phone, setPhone] = useState('')
	const [region, setRegion] = useState('')
	const [role, setRole] = useState('0')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		setIsLoading(true)

		try {
			await registerUser({
				fullName,
				email,
				password,
				phone,
				region,
				role: Number(role),
			})

			navigate('/login', { state: { registered: true } })
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
				<div className='auth-card auth-card-wide'>
					<div className='auth-header'>
						<span className='section-tag'>Реєстрація</span>
						<h1>Створення акаунта</h1>
						<p>
							Зареєструйтеся, щоб допомагати тваринам або створювати заявки.
						</p>
					</div>

					<form onSubmit={handleSubmit} className='auth-form'>
						<div className='form-group'>
							<label htmlFor='fullName'>Повне ім’я</label>
							<input
								id='fullName'
								type='text'
								value={fullName}
								onChange={e => setFullName(e.target.value)}
								placeholder='Введіть ім’я'
								autoComplete='name'
								required
							/>
						</div>

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
								autoComplete='new-password'
								required
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='phone'>Телефон</label>
							<input
								id='phone'
								type='text'
								value={phone}
								onChange={e => setPhone(e.target.value)}
								placeholder='Введіть номер телефону'
								autoComplete='tel'
								required
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='region'>Регіон</label>
							<input
								id='region'
								type='text'
								value={region}
								onChange={e => setRegion(e.target.value)}
								placeholder='Введіть регіон'
								required
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='role'>Роль</label>
							<select
								id='role'
								value={role}
								onChange={e => setRole(e.target.value)}
								required
							>
								<option value='0'>Volunteer</option>
								<option value='1'>Shelter</option>
							</select>
						</div>

						{error && <div className='auth-error'>{error}</div>}

						<button
							type='submit'
							className='btn btn-primary full-width'
							disabled={isLoading}
						>
							{isLoading ? 'Реєстрація...' : 'Зареєструватися'}
						</button>
					</form>

					<p className='auth-footer-text'>
						Уже є акаунт? <Link to='/login'>Увійти</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage

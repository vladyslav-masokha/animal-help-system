import { Link, useNavigate } from 'react-router-dom'
import { getUser, isAdmin, isAuthenticated, logout } from '../utils/auth'

export default function Navbar() {
	const navigate = useNavigate()
	const loggedIn = isAuthenticated()
	const admin = isAdmin()
	const user = getUser()

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	const initials = user?.fullName
		? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
		: '?'

	return (
		<header className='topbar'>
			<div className='container topbar-inner'>
				<Link to='/' className='brand'>
					<span className='brand-icon'>🐾</span>
					AnimalHelp
				</Link>

				<nav className='topbar-nav'>
					<Link to='/'>Головна</Link>
					<Link to='/requests'>Заявки</Link>

					{loggedIn ? (
						<>
							<Link to='/requests/create'>+ Створити</Link>
							{admin && <Link to='/admin'>Адмін</Link>}
							<Link to='/profile' className='nav-profile'>
								<span className='nav-avatar'>{initials}</span>
								{user?.fullName?.split(' ')[0] ?? 'Профіль'}
							</Link>
							<button className='logout-btn' onClick={handleLogout}>
								Вийти
							</button>
						</>
					) : (
						<>
							<Link to='/login'>Увійти</Link>
							<Link to='/register'>Реєстрація</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	)
}

import { Link } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

const HomePage = () => {
	const loggedIn = isAuthenticated()

	return (
		<div style={{
			minHeight: '100vh',
			background: 'radial-gradient(ellipse at top, rgba(79,134,247,0.1) 0%, transparent 55%), linear-gradient(180deg, #060d1f 0%, #08122a 100%)',
		}}>
			<main className='container page-section'>
				<section className='hero-clean'>
					<span className='section-badge'>🐾 Допомога тваринам</span>
					<h1>Платформа для заявок на допомогу тваринам у зоні бойових дій</h1>
					<p>
						Подавайте заявки на порятунок, евакуацію, лікування та забезпечення
						тварин у небезпечних регіонах. Система допомагає швидко
						скоординувати допомогу між волонтерами, притулками та небайдужими.
					</p>

					<div className='hero-actions'>
						{loggedIn ? (
							<>
								<Link to='/requests' className='btn btn-primary'>
									Переглянути заявки →
								</Link>
								<Link to='/requests/create' className='btn btn-secondary'>
									+ Створити заявку
								</Link>
							</>
						) : (
							<>
								<Link to='/login' className='btn btn-primary'>
									Увійти до системи →
								</Link>
								<Link to='/register' className='btn btn-secondary'>
									Зареєструватися
								</Link>
							</>
						)}
					</div>
				</section>

				<section className='cards-grid'>
					<div className='card-clean'>
						<div className='card-icon'>⚡</div>
						<h3>Швидке створення заявок</h3>
						<p>
							Описуйте ситуацію, вказуйте місце перебування тварини та потрібний
							тип допомоги всього за кілька хвилин.
						</p>
					</div>

					<div className='card-clean'>
						<div className='card-icon'>🤝</div>
						<h3>Координація допомоги</h3>
						<p>
							Волонтери та організації можуть швидко знаходити актуальні заявки
							та реагувати на них.
						</p>
					</div>

					<div className='card-clean'>
						<div className='card-icon'>🛡️</div>
						<h3>Підтримка постраждалих тварин</h3>
						<p>
							Платформа об'єднує людей для евакуації, лікування, перетримки та
							забезпечення тварин необхідними ресурсами.
						</p>
					</div>
				</section>

				{/* Stats bar */}
				<div style={{
					marginTop: 28,
					padding: '28px 36px',
					borderRadius: 20,
					background: 'rgba(79,134,247,0.06)',
					border: '1px solid rgba(79,134,247,0.12)',
					display: 'flex',
					justifyContent: 'space-around',
					gap: 20,
					flexWrap: 'wrap',
				}}>
					{[
						{ n: '24/7', label: 'Доступність' },
						{ n: '🇺🇦', label: 'Вся Україна' },
						{ n: '100%', label: 'Безкоштовно' },
					].map(stat => (
						<div key={stat.label} style={{ textAlign: 'center' }}>
							<div style={{
								fontFamily: "'Unbounded', sans-serif",
								fontSize: 28,
								fontWeight: 800,
								marginBottom: 4,
							}}>
								{stat.n}
							</div>
							<div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600 }}>
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	)
}

export default HomePage

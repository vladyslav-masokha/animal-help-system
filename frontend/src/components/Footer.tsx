const Footer = () => {
	return (
		<footer className='footer'>
			<div className='container footer-inner'>
				<div className='footer-brand'>
					<div className='footer-brand-icon'>🐾</div>
					<div className='footer-brand-text'>
						<h3>AnimalHelp</h3>
						<p>Допомога тваринам у зоні бойових дій</p>
					</div>
				</div>

				<div className='footer-links'>
					<a href='/'>Головна</a>
					<a href='/requests'>Заявки</a>
					<a href='/requests/create'>Створити заявку</a>
					<a href='/profile'>Профіль</a>
				</div>
			</div>

			<div className='footer-bottom'>
				© 2026 AnimalHelp. Усі права захищено.
			</div>
		</footer>
	)
}

export default Footer

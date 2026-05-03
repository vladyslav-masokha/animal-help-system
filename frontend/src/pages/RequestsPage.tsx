import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'
import { getAllRequests, type RequestItem } from '../services/requestService'
import './RequestsPage.css'

const formatDate = (value: string) => {
	const date = new Date(value)
	return isNaN(date.getTime()) ? value : date.toLocaleDateString('uk-UA', { day: '2-digit', month: 'short', year: 'numeric' })
}

const statusMap: Record<string, { label: string; cls: string }> = {
	Pending: { label: '🟡 Очікує', cls: 'status-pending' },
	'In Progress': { label: '🔵 В роботі', cls: 'status-in-progress' },
	Completed: { label: '🟢 Виконано', cls: 'status-completed' },
}

const RequestsPage = () => {
	const [requests, setRequests] = useState<RequestItem[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const loggedIn = isAuthenticated()

	useEffect(() => {
		const loadRequests = async () => {
			try {
				setLoading(true)
				const data = await getAllRequests()
				setRequests(data)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Не вдалося завантажити заявки')
			} finally {
				setLoading(false)
			}
		}
		loadRequests()
	}, [])

	return (
		<div className='requests-page'>
			<div className='requests-container'>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
					<div>
						<span className='section-badge'>📋 Всі заявки</span>
						<h1 className='requests-title'>Заявки про допомогу тваринам</h1>
						<p className='requests-subtitle'>
							{loading ? 'Завантаження...' : `Знайдено ${requests.length} заявок`}
						</p>
					</div>
					{loggedIn && (
						<Link to='/requests/create' className='btn btn-primary' style={{ flexShrink: 0 }}>
							+ Нова заявка
						</Link>
					)}
				</div>

				{loading && (
					<div className='requests-loading'>
						<div style={{ fontSize: 40, marginBottom: 12 }}>🐾</div>
						Завантаження заявок...
					</div>
				)}

				{error && <p className='error-text'>{error}</p>}

				{!loading && !error && requests.length === 0 && (
					<div className='requests-empty'>
						<div className='requests-empty-icon'>🐾</div>
						<p>Заявок поки немає</p>
						{loggedIn && (
							<Link to='/requests/create' className='btn btn-primary' style={{ marginTop: 16 }}>
								Створити першу заявку
							</Link>
						)}
					</div>
				)}

				{!loading && requests.length > 0 && (
					<div className='requests-grid'>
						{requests.map(request => {
							const st = statusMap[request.status] ?? { label: request.status, cls: 'status-pending' }
							return (
								<Link to={`/requests/${request.id}`} key={request.id} className='request-card'>
									{request.photoUrl ? (
										<img src={request.photoUrl} alt={request.title} className='request-card-image' />
									) : (
										<div className='request-card-image request-card-no-image' />
									)}

									<div className='request-card-content'>
										<div className='request-card-top'>
											<span className={`status-chip ${st.cls}`}>{st.label}</span>
											<span className='request-card-date'>{formatDate(request.createdAt)}</span>
										</div>

										<h2>{request.title}</h2>
										<p>{request.description || 'Опис відсутній'}</p>

										<div className='request-meta'>
											{request.location && (
												<span className='request-meta-row'>📍 {request.location}</span>
											)}
											{request.animalType && (
												<span className='request-meta-row'>🐾 {request.animalType}</span>
											)}
										</div>
									</div>
								</Link>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default RequestsPage

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
	deleteRequest,
	getRequestById,
	type RequestItem,
	updateRequestStatus,
} from '../services/requestService'
import { isAdmin, isVolunteer } from '../utils/auth'
import './RequestDetailsPage.css'

const formatDate = (value: string) => {
	const date = new Date(value)
	return Number.isNaN(date.getTime()) ? value : date.toLocaleString('uk-UA')
}

const getStatusLabel = (status: string) => {
	switch (status) {
		case 'Pending':
			return 'Очікує'
		case 'In Progress':
			return 'В роботі'
		case 'Completed':
			return 'Виконано'
		default:
			return status
	}
}

const RequestDetailsPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [request, setRequest] = useState<RequestItem | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [actionLoading, setActionLoading] = useState(false)

	useEffect(() => {
		const loadRequest = async () => {
			try {
				setLoading(true)
				setError('')

				if (!id) {
					setError('Некоректний ID заявки')
					return
				}

				const data = await getRequestById(Number(id))
				setRequest(data)
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'Не вдалося завантажити заявку',
				)
			} finally {
				setLoading(false)
			}
		}

		loadRequest()
	}, [id])

	const handleStatusChange = async (status: 'In Progress' | 'Completed') => {
		if (!request) return

		try {
			setActionLoading(true)
			await updateRequestStatus(request.id, status)
			const updated = await getRequestById(request.id)
			setRequest(updated)
		} catch (err) {
			alert(err instanceof Error ? err.message : 'Помилка оновлення статусу')
		} finally {
			setActionLoading(false)
		}
	}

	const handleDelete = async () => {
		if (!request) return
		if (!window.confirm('Точно видалити заявку?')) return

		try {
			setActionLoading(true)
			await deleteRequest(request.id)
			navigate('/requests')
		} catch (err) {
			alert(err instanceof Error ? err.message : 'Помилка видалення заявки')
		} finally {
			setActionLoading(false)
		}
	}

	if (loading) {
		return (
			<div className='request-details-page'>
				<p>Завантаження...</p>
			</div>
		)
	}

	if (error || !request) {
		return (
			<div className='request-details-page'>
				<p className='error-text'>{error || 'Заявку не знайдено'}</p>
				<Link to='/requests' className='back-link'>
					Назад
				</Link>
			</div>
		)
	}

	const canManage = isAdmin() || isVolunteer()
	const statusClass = `status-${request.status.toLowerCase().replace(/\s+/g, '-')}`

	return (
		<div className='request-details-page'>
			<div className='request-details-card'>
				<div className='request-details-header'>
					<span className={`status-badge ${statusClass}`}>
						{getStatusLabel(request.status)}
					</span>

					<div className='request-date'>{formatDate(request.createdAt)}</div>
				</div>

				{request.photoUrl ? (
					<div className='request-image-wrapper'>
						<img
							src={request.photoUrl}
							alt={request.title}
							className='request-main-image'
						/>
					</div>
				) : (
					<div className='request-no-image'>Фото тваринки не додано</div>
				)}

				<h1 className='request-title'>{request.title}</h1>

				<p className='request-description'>
					{request.description || 'Опис заявки поки відсутній.'}
				</p>

				<div className='request-info-grid'>
					<div className='info-card'>
						<span className='info-label'>ЛОКАЦІЯ</span>
						<span className='info-value'>
							{request.location || 'Локацію не вказано'}
						</span>
					</div>

					<div className='info-card'>
						<span className='info-label'>ТИП ТВАРИНИ</span>
						<span className='info-value'>
							{request.animalType || 'Невідомо'}
						</span>
					</div>

					<div className='info-card'>
						<span className='info-label'>РЕГІОН</span>
						<span className='info-value'>{request.region || 'Не вказано'}</span>
					</div>

					<div className='info-card'>
						<span className='info-label'>АВТОР</span>
						<span className='info-value'>
							{request.authorName || request.userName || 'Невідомо'}
						</span>
					</div>
				</div>

				<div className='request-actions'>
					<Link to='/requests' className='btn btn-secondary'>
						Назад
					</Link>

					{canManage && (
						<>
							<button
								className='btn btn-primary'
								onClick={() => handleStatusChange('In Progress')}
								disabled={actionLoading}
							>
								Взяти в роботу
							</button>

							<button
								className='btn btn-danger'
								onClick={() => handleStatusChange('Completed')}
								disabled={actionLoading}
							>
								Позначити як виконану
							</button>

							{isAdmin() && (
								<button
									className='btn btn-secondary'
									onClick={handleDelete}
									disabled={actionLoading}
								>
									Видалити
								</button>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default RequestDetailsPage
